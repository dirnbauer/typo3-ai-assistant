import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  ROUTES,
  cancelTurn,
  describeError,
  fetchConversation,
  fetchStatus,
  isAbort,
  renameConversation,
  runTurn,
  type StreamRoute,
  type ApprovalRequest,
  type InputRequest,
  type TurnRequest,
} from '@/lib/api';
import { readNumber, writeSetting } from '@/lib/storage';
import { initialThreadState, threadReducer, type ThreadState } from '@/state/reducer';
import { useAttachments, type StagedAttachment } from '@/state/use-attachments';
import { useConversations, type ConversationsApi } from '@/state/use-conversations';
import type { ChatStatus, TurnContext } from '@/state/types';

/**
 * Everything a chat surface needs, and the same thing for every surface.
 *
 * The rail, the floating panel and the chat-home app are layouts over ONE
 * controller: same state, same API. The controller composes three concerns —
 * the conversation list, the staged attachments and the turn engine below.
 */

const LAST_CONVERSATION_KEY = 'chat.conversation';

export interface ChatController {
  status: ChatStatus | null;
  statusError: string | null;
  conversations: ConversationsApi;
  conversationUid: number;
  thread: ThreadState;
  attachments: StagedAttachment[];
  busy: boolean;

  select: (uid: number) => void;
  startNew: () => Promise<number | null>;
  send: (text: string) => void;
  answer: (text: string) => void;
  decide: (approved: boolean, remember: boolean) => void;
  stop: () => void;
  dismissError: () => void;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
}

export interface ChatOptions {
  /** The conversation to open first; 0 restores the last one used. */
  initialConversation: number;
  /** Read at every turn, so an app's `setContext()` takes effect immediately. */
  context: () => TurnContext;
  /** Where a rejected file or a failed list write is reported. */
  notify: (message: string) => void;
}

export function useChat({ initialConversation, context, notify }: ChatOptions): ChatController {
  const [status, setStatus] = useState<ChatStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [conversationUid, setConversationUid] = useState(() =>
    initialConversation > 0 ? initialConversation : readNumber(LAST_CONVERSATION_KEY, 0),
  );
  const [busy, setBusy] = useState(false);
  const [thread, dispatch] = useReducer(threadReducer, initialThreadState);
  const conversations = useConversations(notify);

  // One run at a time, and the abort handle for it — a ref, because callbacks
  // must not re-create themselves when a turn starts.
  const inFlight = useRef<AbortController | null>(null);
  const conversationRef = useRef(conversationUid);
  conversationRef.current = conversationUid;
  const contextRef = useRef(context);
  contextRef.current = context;

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        setStatus(await fetchStatus(contextRef.current(), controller.signal));
        setStatusError(null);
      } catch (error) {
        if (!isAbort(error)) {
          setStatusError(describeError(error));
        }
      }
    })();

    return () => controller.abort();
  }, []);

  // Load whichever conversation is selected. 0 means "none yet": the first
  // open, before anything has been created.
  useEffect(() => {
    writeSetting(LAST_CONVERSATION_KEY, String(conversationUid));
    if (conversationUid <= 0) {
      dispatch({ type: 'reset', conversation: null, messages: [] });

      return;
    }
    const controller = new AbortController();
    void (async () => {
      try {
        const result = await fetchConversation(conversationUid, 0, controller.signal);
        dispatch({ type: 'reset', conversation: result.conversation, messages: result.messages });
      } catch (error) {
        if (!isAbort(error)) {
          // A remembered conversation that no longer exists is forgotten, not shown as an error.
          setConversationUid(0);
        }
      }
    })();

    return () => controller.abort();
  }, [conversationUid]);

  useEffect(() => () => inFlight.current?.abort(), []);

  const adopt = useCallback((uid: number) => {
    setConversationUid(uid);
    conversationRef.current = uid;
  }, []);

  const ensureConversation = useCallback(async (): Promise<number> => {
    if (conversationRef.current > 0) {
      return conversationRef.current;
    }
    const turn = contextRef.current();
    const created = await conversations.create({ appName: turn.appName, pageId: turn.pageId });
    if (created === null) {
      throw new Error('The conversation could not be created.');
    }
    adopt(created.uid);
    dispatch({ type: 'reset', conversation: created, messages: [] });

    return created.uid;
  }, [adopt, conversations]);

  const staged = useAttachments(ensureConversation, notify);

  /**
   * Run one turn and refresh what it changed. The refresh is not cosmetic: the
   * conversation row carries the status and the pending decision.
   */
  const drive = useCallback(
    async (route: StreamRoute, body: TurnRequest | ApprovalRequest | InputRequest) => {
      const controller = new AbortController();
      inFlight.current = controller;
      setBusy(true);
      try {
        await runTurn(route, body, (event) => dispatch({ type: 'event', event }), controller.signal);
      } catch (error) {
        dispatch(isAbort(error) ? { type: 'cancelled' } : { type: 'transport-error', message: describeError(error) });
      } finally {
        inFlight.current = null;
        setBusy(false);
        const uid = conversationRef.current;
        const [, refreshed] = await Promise.all([
          conversations.reload(),
          uid > 0 ? fetchConversation(uid).catch(() => null) : Promise.resolve(null),
        ]);
        if (refreshed !== null) {
          dispatch({ type: 'conversation', conversation: refreshed.conversation });
        }
      }
    },
    [conversations],
  );

  const send = useCallback(
    (text: string) => {
      const content = text.trim();
      if (content === '' || busy) {
        return;
      }
      void (async () => {
        let uid: number;
        try {
          uid = await ensureConversation();
        } catch (error) {
          dispatch({ type: 'transport-error', message: describeError(error) });

          return;
        }
        const files = staged.ready();
        dispatch({ type: 'send', content, attachments: files.info });
        staged.clear();
        await drive(ROUTES.conversationTurn, {
          conversation: uid,
          content,
          attachments: files.refs,
          context: contextRef.current(),
        });
      })();
    },
    [busy, drive, ensureConversation, staged],
  );

  const answer = useCallback(
    (text: string) => {
      const input = thread.pendingInput;
      const uid = conversationRef.current;
      const value = text.trim();
      if (input === null || uid <= 0 || busy || value === '') {
        return;
      }
      dispatch({ type: 'answer', answer: value });
      void drive(ROUTES.conversationInput, {
        conversation: uid,
        runUuid: input.runUuid,
        turnDigest: input.turnDigest,
        answer: value,
      });
    },
    [busy, drive, thread.pendingInput],
  );

  const decide = useCallback(
    (approved: boolean, remember: boolean) => {
      const approval = thread.pendingApproval;
      const uid = conversationRef.current;
      if (approval === null || uid <= 0 || busy) {
        return;
      }
      void (async () => {
        if (remember && approved) {
          try {
            // `rename` is where the conversation's flags live; the title travels unchanged.
            await renameConversation(uid, thread.conversation?.title || 'Conversation', true);
          } catch (error) {
            dispatch({ type: 'transport-error', message: describeError(error) });

            return;
          }
        }
        await drive(ROUTES.conversationApproval, { conversation: uid, approved, turnDigest: approval.turnDigest });
      })();
    },
    [busy, drive, thread.conversation?.title, thread.pendingApproval],
  );

  const stop = useCallback(() => {
    const uid = conversationRef.current;
    inFlight.current?.abort();
    if (uid > 0) {
      // Aborting the fetch closes the socket; the cancel route ends the run.
      void cancelTurn(uid).catch(() => undefined);
    }
  }, []);

  const select = useCallback(
    (uid: number) => {
      inFlight.current?.abort();
      adopt(uid);
      staged.clear();
    },
    [adopt, staged],
  );

  const startNew = useCallback(async (): Promise<number | null> => {
    const turn = contextRef.current();
    const created = await conversations.create({ appName: turn.appName, pageId: turn.pageId });
    if (created === null) {
      return null;
    }
    inFlight.current?.abort();
    adopt(created.uid);
    dispatch({ type: 'reset', conversation: created, messages: [] });
    staged.clear();

    return created.uid;
  }, [adopt, conversations, staged]);

  // A deleted conversation that was open leaves the thread empty rather than stale.
  const remove = conversations.remove;
  const conversationsApi = useMemo<ConversationsApi>(
    () => ({
      ...conversations,
      remove: async (uid: number) => {
        const ok = await remove(uid);
        if (ok && uid === conversationRef.current) {
          adopt(0);
        }

        return ok;
      },
      rename: async (uid: number, title: string) => {
        const ok = await conversations.rename(uid, title);
        if (ok && uid === conversationRef.current) {
          const result = await fetchConversation(uid).catch(() => null);
          if (result !== null) {
            dispatch({ type: 'conversation', conversation: result.conversation });
          }
        }

        return ok;
      },
    }),
    [adopt, conversations, remove],
  );

  const dismissError = useCallback(() => dispatch({ type: 'dismiss-error' }), []);

  return useMemo(
    () => ({
      status,
      statusError,
      conversations: conversationsApi,
      conversationUid,
      thread,
      attachments: staged.attachments,
      busy,
      select,
      startNew,
      send,
      answer,
      decide,
      stop,
      dismissError,
      addFiles: staged.addFiles,
      removeFile: staged.removeFile,
    }),
    [answer, busy, conversationUid, conversationsApi, decide, dismissError, select, send, staged, startNew, status, statusError, stop, thread],
  );
}

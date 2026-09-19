import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  archiveConversation,
  createConversation,
  deleteConversation,
  describeError,
  fetchConversations,
  isAbort,
  pinConversation,
  renameConversation,
  type CreateConversationRequest,
} from '@/lib/api';
import type { ConversationSummary } from '@/state/types';

/**
 * The list of conversations this user owns, and the writes that change it.
 *
 * Every mutation ends in a reload rather than a local patch: the server decides
 * the order (pinned first, then newest activity) and the status badges, and a
 * list that guesses is a list nobody trusts after a run suspended.
 */
export interface ConversationsApi {
  conversations: ConversationSummary[];
  includeArchived: boolean;
  setIncludeArchived: (include: boolean) => void;
  reload: () => Promise<ConversationSummary[]>;
  create: (request?: CreateConversationRequest) => Promise<ConversationSummary | null>;
  rename: (uid: number, title: string) => Promise<boolean>;
  setPinned: (uid: number, pinned: boolean) => Promise<boolean>;
  setArchived: (uid: number, archived: boolean) => Promise<boolean>;
  remove: (uid: number) => Promise<boolean>;
}

export function useConversations(onError: (message: string) => void): ConversationsApi {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [includeArchived, setIncludeArchived] = useState(false);
  const report = useRef(onError);
  useEffect(() => {
    report.current = onError;
  }, [onError]);

  const reload = useCallback(
    async (signal?: AbortSignal): Promise<ConversationSummary[]> => {
      try {
        const result = await fetchConversations(includeArchived, signal);
        setConversations(result.conversations);

        return result.conversations;
      } catch (error) {
        if (!isAbort(error)) {
          report.current(describeError(error));
        }

        return [];
      }
    },
    [includeArchived],
  );

  useEffect(() => {
    const controller = new AbortController();
    // The effect only STARTS the load. The state it produces arrives with the
    // response, never in the same tick as the render that scheduled it.
    queueMicrotask(() => {
      void reload(controller.signal);
    });

    return () => controller.abort();
  }, [reload]);

  /** Run one write, report a failure, and refresh the list either way it succeeded. */
  const mutate = useCallback(
    async (action: () => Promise<unknown>): Promise<boolean> => {
      try {
        await action();
      } catch (error) {
        report.current(describeError(error));

        return false;
      }
      await reload();

      return true;
    },
    [reload],
  );

  const create = useCallback(
    async (request: CreateConversationRequest = {}): Promise<ConversationSummary | null> => {
      try {
        const created = await createConversation(request);
        setConversations((current) => [created.conversation, ...current]);

        return created.conversation;
      } catch (error) {
        report.current(describeError(error));

        return null;
      }
    },
    [],
  );

  const rename = useCallback((uid: number, title: string) => mutate(() => renameConversation(uid, title)), [mutate]);
  const setPinned = useCallback((uid: number, pinned: boolean) => mutate(() => pinConversation(uid, pinned)), [mutate]);
  const setArchived = useCallback(
    (uid: number, archived: boolean) => mutate(() => archiveConversation(uid, archived)),
    [mutate],
  );
  const remove = useCallback((uid: number) => mutate(() => deleteConversation(uid)), [mutate]);

  return useMemo(
    () => ({ conversations, includeArchived, setIncludeArchived, reload, create, rename, setPinned, setArchived, remove }),
    [conversations, create, includeArchived, reload, remove, rename, setArchived, setPinned],
  );
}

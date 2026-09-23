import BroadcastService from '@typo3/backend/broadcast-service.js';
import { BroadcastMessage } from '@typo3/backend/broadcast-message.js';
import {
  ApiError,
  ROUTES,
  archiveConversation,
  cancelTurn,
  createConversation,
  deleteConversation,
  fetchConversation,
  fetchConversations,
  fetchStatus,
  isAbort,
  pinConversation,
  renameConversation,
  runTurn,
  uploadFile,
} from './api.js';
import { attachmentRules, checkFile } from './attachments.js';
import { initialThreadState, threadReducer } from './thread-state.js';

/**
 * One chat, whatever shows it.
 *
 * The module and the toolbar panel are layouts over this store: the same
 * status, the same conversation list, the same thread. Elements subscribe to
 * its `change` event and render `store.state`; they never keep a copy.
 *
 * The module lives in the content iframe and the panel in the top document, so
 * they hold separate stores. After every turn and every change to a
 * conversation, the store says so over the backend's BroadcastChannel, and the
 * other surfaces reload what they show — a turn run in the panel appears in an
 * open module without a reload, and vice versa.
 *
 * Problems are reported as `{code, text}`: `text` is what the server wrote, in
 * the user's language; `code` names a label for when it wrote nothing.
 */

const REMEMBERED_CONVERSATION = 'webcon-ai-assistant.conversation';
const BROADCAST_COMPONENT = 'webcon-ai-assistant';
const BROADCAST_EVENT = 'conversation-changed';

/**
 * @typedef {import('./thread-state.js').ThreadState} ThreadState
 * @typedef {import('./attachments.js').AttachmentRules} AttachmentRules
 * @typedef {{code: string, text: string}} Problem
 * @typedef {{id: string, file: File, status: 'uploading'|'ready'|'error', fileUid?: number, problem?: Problem}} StagedAttachment
 * @typedef {{appName?: string, pageId?: number}} TurnContext
 * @typedef {{
 *   status: Record<string, any>|null,
 *   statusProblem: Problem|null,
 *   rules: AttachmentRules,
 *   conversations: Array<Record<string, any>>,
 *   conversationsLoaded: boolean,
 *   includeArchived: boolean,
 *   conversationUid: number,
 *   loading: boolean,
 *   thread: ThreadState,
 *   attachments: StagedAttachment[],
 *   busy: boolean,
 * }} ChatState
 */

/**
 * The label code for a request that failed without a message of its own.
 *
 * @param {unknown} error
 * @returns {Problem}
 */
export function problemOf(error) {
  if (error instanceof ApiError) {
    const codes = { 0: 'offline', 403: 'forbidden', 404: 'notFound', 409: 'conflict', 413: 'tooLarge', 422: 'unreadable', 429: 'limit' };
    const code = codes[error.status] ?? (error.status >= 500 ? 'server' : 'generic');

    return { code: `problem.${code}`, text: error.message };
  }

  return { code: 'problem.generic', text: '' };
}

function readRemembered() {
  try {
    const value = Number.parseInt(window.localStorage.getItem(REMEMBERED_CONVERSATION) ?? '', 10);

    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

/** @param {number} uid */
function remember(uid) {
  try {
    window.localStorage.setItem(REMEMBERED_CONVERSATION, String(uid));
  } catch {
    // A preference that cannot be stored still works for this page.
  }
}

let stagedSequence = 0;

export class ChatStore extends EventTarget {
  /** @type {ChatState} */
  state = {
    status: null,
    statusProblem: null,
    rules: attachmentRules(null),
    conversations: [],
    conversationsLoaded: false,
    includeArchived: false,
    conversationUid: 0,
    loading: false,
    thread: initialThreadState,
    attachments: [],
    busy: false,
  };

  /** @type {AbortController|null} */
  #inFlight = null;

  /** @type {() => TurnContext} */
  #context;

  #started = false;

  /**
   * @param {() => TurnContext} context read at every turn, so it is always where the user is now
   */
  constructor(context = () => ({})) {
    super();
    this.#context = context;
  }

  /**
   * Load status and conversations, then open a conversation: the one asked
   * for, or the one used last. Safe to call again; it runs once.
   *
   * @param {number} [initialConversation]
   */
  async start(initialConversation = 0) {
    if (this.#started) {
      if (initialConversation > 0 && initialConversation !== this.state.conversationUid) {
        await this.select(initialConversation);
      }

      return;
    }
    this.#started = true;

    BroadcastService.listen();
    document.addEventListener(`typo3:${BROADCAST_COMPONENT}:${BROADCAST_EVENT}`, (event) => {
      void this.#onBroadcast(/** @type {CustomEvent} */ (event).detail);
    });

    await Promise.all([this.refreshStatus(), this.reloadConversations()]);
    const uid = initialConversation > 0 ? initialConversation : readRemembered();
    if (uid > 0) {
      await this.select(uid);
    }
  }

  /**
   * @param {(state: ChatState) => void} callback
   * @returns {() => void} unsubscribe
   */
  subscribe(callback) {
    const listener = () => callback(this.state);
    this.addEventListener('change', listener);

    return () => this.removeEventListener('change', listener);
  }

  // ------------------------------------------------------------- reading

  async refreshStatus() {
    try {
      const status = await fetchStatus(this.#context());
      this.#set({ status, statusProblem: null, rules: attachmentRules(status?.attachments) });
    } catch (error) {
      if (!isAbort(error)) {
        this.#set({ statusProblem: problemOf(error) });
      }
    }
  }

  async reloadConversations() {
    try {
      const result = await fetchConversations(this.state.includeArchived);
      this.#set({ conversations: Array.isArray(result?.conversations) ? result.conversations : [], conversationsLoaded: true });
    } catch (error) {
      this.#report(error);
    }
  }

  /** @param {boolean} include */
  async setIncludeArchived(include) {
    this.#set({ includeArchived: include });
    await this.reloadConversations();
  }

  /**
   * Open a conversation. 0 opens none: the empty thread before the first message.
   *
   * @param {number} uid
   */
  async select(uid) {
    this.#inFlight?.abort();
    this.#set({ conversationUid: uid, attachments: [] });
    remember(uid);
    if (uid <= 0) {
      this.#dispatch({ type: 'reset', conversation: null, messages: [] });

      return;
    }
    await this.#load(uid);
  }

  /**
   * @param {number} uid
   */
  async #load(uid) {
    this.#set({ loading: true });
    try {
      const result = await fetchConversation(uid);
      if (uid === this.state.conversationUid) {
        this.#dispatch({ type: 'reset', conversation: result.conversation, messages: result.messages });
      }
    } catch (error) {
      // A remembered conversation that no longer exists is forgotten, not shown as an error.
      if (!isAbort(error) && uid === this.state.conversationUid) {
        this.#set({ conversationUid: 0 });
        remember(0);
        this.#dispatch({ type: 'reset', conversation: null, messages: [] });
      }
    } finally {
      this.#set({ loading: false });
    }
  }

  // ------------------------------------------------------------- the list

  /** @returns {Promise<number>} the new conversation's uid, 0 when it could not be created */
  async startNew() {
    const context = this.#context();
    try {
      const created = await createConversation({ appName: context.appName, pageId: context.pageId });
      this.#inFlight?.abort();
      this.#set({ conversationUid: created.conversation.uid, attachments: [] });
      remember(created.conversation.uid);
      this.#dispatch({ type: 'reset', conversation: created.conversation, messages: [] });
      await this.reloadConversations();
      this.#broadcast(created.conversation.uid);

      return created.conversation.uid;
    } catch (error) {
      this.#report(error);

      return 0;
    }
  }

  /** @param {number} uid @param {string} title */
  rename(uid, title) {
    return this.#mutate(uid, () => renameConversation(uid, title));
  }

  /** @param {number} uid @param {boolean} pinned */
  setPinned(uid, pinned) {
    return this.#mutate(uid, () => pinConversation(uid, pinned));
  }

  /** @param {number} uid @param {boolean} archived */
  setArchived(uid, archived) {
    return this.#mutate(uid, () => archiveConversation(uid, archived));
  }

  /** @param {number} uid */
  async remove(uid) {
    const removed = await this.#mutate(uid, () => deleteConversation(uid));
    if (removed && uid === this.state.conversationUid) {
      await this.select(0);
    }

    return removed;
  }

  /**
   * Run one write against a conversation and refresh what it changed. The
   * server decides the order (pinned first, then newest) and the badges, so
   * the list is reloaded rather than patched.
   *
   * @param {number} uid
   * @param {() => Promise<unknown>} action
   */
  async #mutate(uid, action) {
    try {
      await action();
    } catch (error) {
      this.#report(error);

      return false;
    }
    await this.reloadConversations();
    if (uid === this.state.conversationUid) {
      await this.#refreshConversation(uid);
    }
    this.#broadcast(uid);

    return true;
  }

  // ------------------------------------------------------------- turns

  /** @param {string} text */
  async send(text) {
    const content = text.trim();
    if (content === '' || this.state.busy) {
      return;
    }
    const uid = await this.#ensureConversation();
    if (uid <= 0) {
      return;
    }
    const ready = this.state.attachments.filter((entry) => entry.status === 'ready' && entry.fileUid !== undefined);
    this.#dispatch({
      type: 'send',
      content,
      attachments: ready.map((entry) => ({
        fileUid: /** @type {number} */ (entry.fileUid),
        fileName: entry.file.name,
        fileMimeType: entry.file.type,
        fileSize: entry.file.size,
      })),
    });
    this.#set({ attachments: [] });
    await this.#drive(ROUTES.conversationTurn, {
      conversation: uid,
      content,
      attachments: ready.map((entry) => ({ fileUid: entry.fileUid })),
      context: this.#context(),
    });
  }

  /** @param {string} text */
  async answer(text) {
    const input = this.state.thread.pendingInput;
    const uid = this.state.conversationUid;
    const value = text.trim();
    if (input === null || uid <= 0 || this.state.busy || value === '') {
      return;
    }
    this.#dispatch({ type: 'answer', answer: value });
    await this.#drive(ROUTES.conversationInput, {
      conversation: uid,
      runUuid: input.runUuid,
      turnDigest: input.turnDigest,
      answer: value,
    });
  }

  /**
   * @param {boolean} approved
   * @param {boolean} rememberForConversation also switch on this conversation's auto-approval
   */
  async decide(approved, rememberForConversation) {
    const approval = this.state.thread.pendingApproval;
    const uid = this.state.conversationUid;
    if (approval === null || uid <= 0 || this.state.busy) {
      return;
    }
    if (rememberForConversation && approved) {
      try {
        // `rename` is where the conversation's flags live; the title travels unchanged.
        await renameConversation(uid, this.state.thread.conversation?.title || 'Conversation', true);
      } catch (error) {
        const problem = problemOf(error);
        this.#dispatch({ type: 'transport-error', message: problem.text, code: problem.code });

        return;
      }
    }
    this.#dispatch({ type: 'decide' });
    await this.#drive(ROUTES.conversationApproval, { conversation: uid, approved, turnDigest: approval.turnDigest });
  }

  /** Stop the running turn: close the stream, and tell the server to end the run. */
  stop() {
    const uid = this.state.conversationUid;
    this.#inFlight?.abort();
    if (uid > 0) {
      cancelTurn(uid).catch(() => undefined);
    }
  }

  dismissError() {
    this.#dispatch({ type: 'dismiss-error' });
  }

  /**
   * Run one turn and refresh what it changed. The refresh is not cosmetic: the
   * conversation row carries the status and the pending decision.
   *
   * @param {string} route
   * @param {Record<string, unknown>} body
   */
  async #drive(route, body) {
    const controller = new AbortController();
    this.#inFlight = controller;
    this.#set({ busy: true });
    const uid = this.state.conversationUid;
    try {
      await runTurn(route, body, (event) => this.#dispatch({ type: 'event', event }), controller.signal);
    } catch (error) {
      if (isAbort(error)) {
        this.#dispatch({ type: 'cancelled' });
      } else {
        const problem = problemOf(error);
        this.#dispatch({ type: 'transport-error', message: problem.text, code: problem.code });
      }
    } finally {
      if (this.#inFlight === controller) {
        this.#inFlight = null;
      }
      this.#set({ busy: false });
      await Promise.all([this.reloadConversations(), this.#refreshConversation(uid), this.refreshStatus()]);
      this.#broadcast(uid);
    }
  }

  /** @returns {Promise<number>} */
  async #ensureConversation() {
    if (this.state.conversationUid > 0) {
      return this.state.conversationUid;
    }

    return this.startNew();
  }

  /** @param {number} uid */
  async #refreshConversation(uid) {
    if (uid <= 0 || uid !== this.state.conversationUid) {
      return;
    }
    try {
      const result = await fetchConversation(uid);
      if (uid === this.state.conversationUid) {
        this.#dispatch({ type: 'conversation', conversation: result.conversation });
      }
    } catch {
      // The next load says what happened to it.
    }
  }

  // ------------------------------------------------------------- files

  /** @param {File[]} files */
  async addFiles(files) {
    const accepted = [];
    for (const file of files) {
      const check = checkFile(file, this.state.rules);
      if (check.ok) {
        accepted.push(file);
      } else {
        this.#problem({
          code: check.reason === 'type' ? 'attachment.type' : 'attachment.size',
          text: '',
          arguments: { name: file.name, megabytes: Math.round(check.maxBytes / (1024 * 1024)) },
        });
      }
    }
    if (accepted.length === 0) {
      return;
    }
    const uid = await this.#ensureConversation();
    if (uid <= 0) {
      return;
    }

    await Promise.all(
      accepted.map(async (file) => {
        stagedSequence += 1;
        const id = `a${stagedSequence}`;
        this.#set({ attachments: [...this.state.attachments, { id, file, status: 'uploading' }] });
        try {
          const info = await uploadFile(uid, file);
          this.#patchAttachment(id, { status: 'ready', fileUid: info.fileUid });
        } catch (error) {
          this.#patchAttachment(id, { status: 'error', problem: problemOf(error) });
        }
      }),
    );
  }

  /** @param {string} id */
  removeFile(id) {
    this.#set({ attachments: this.state.attachments.filter((entry) => entry.id !== id) });
  }

  /**
   * @param {string} id
   * @param {Partial<StagedAttachment>} changes
   */
  #patchAttachment(id, changes) {
    this.#set({ attachments: this.state.attachments.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry)) });
  }

  // ------------------------------------------------------------- plumbing

  /** @param {Partial<ChatState>} patch */
  #set(patch) {
    this.state = { ...this.state, ...patch };
    this.dispatchEvent(new Event('change'));
  }

  /** @param {import('./thread-state.js').ThreadAction} action */
  #dispatch(action) {
    this.#set({ thread: threadReducer(this.state.thread, action) });
  }

  /** @param {unknown} error */
  #report(error) {
    if (!isAbort(error)) {
      this.#problem({ ...problemOf(error), arguments: {} });
    }
  }

  /** @param {Problem & {arguments: Record<string, string|number>}} problem */
  #problem(problem) {
    this.dispatchEvent(new CustomEvent('problem', { detail: problem }));
  }

  /** @param {number} uid */
  #broadcast(uid) {
    if (uid > 0) {
      BroadcastService.post(new BroadcastMessage(BROADCAST_COMPONENT, BROADCAST_EVENT, { uid }));
    }
  }

  /** @param {unknown} detail */
  async #onBroadcast(detail) {
    const uid = typeof detail === 'object' && detail !== null ? Number(/** @type {{uid?: unknown}} */ (detail).uid) : 0;
    await this.reloadConversations();
    if (uid > 0 && uid === this.state.conversationUid && !this.state.busy) {
      await this.#load(uid);
    }
  }
}

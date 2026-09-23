import {
  effectOf,
  emptyUsage,
  isRecord,
  num,
  outcomeOf,
  pendingApprovalOf,
  pendingInputOf,
  str,
  usageOf,
  writeTargetOf,
  writeTargetsOf,
} from './decode.js';

/**
 * What the thread is doing, and nothing else.
 *
 * Pure on purpose: every transition is a function of the frames that arrived,
 * so a run can be replayed in a test exactly as it happened. Five phases,
 * because five is what a user can act on:
 *
 *   idle ──send──▶ streaming ──run.finished──▶ idle
 *                     ├─approval.required──▶ awaiting_approval ──decide──▶ streaming
 *                     ├─input.required─────▶ awaiting_input ────answer──▶ streaming
 *                     └─run.error──────────▶ error ──▶ idle (on the next send)
 *
 * The state holds CODES where the user reads a sentence (`notice.cancelled`,
 * `composer.streaming`); the elements turn them into labels. Server text — an
 * error the backend already worded — travels as `text` and wins over a code.
 *
 * Framework-free on purpose: Tests/JavaScript runs it under `node --test`.
 */

/**
 * @typedef {import('./decode.js').ToolEffect} ToolEffect
 * @typedef {import('./decode.js').WriteTarget} WriteTarget
 * @typedef {import('./decode.js').PendingApproval} PendingApproval
 * @typedef {import('./decode.js').PendingInput} PendingInput
 * @typedef {import('./decode.js').TokenUsage} TokenUsage
 * @typedef {'idle'|'streaming'|'awaiting_approval'|'awaiting_input'|'error'} TurnPhase
 * @typedef {{fileUid: number, fileName: string, fileMimeType: string, fileSize: number}} AttachmentInfo
 * @typedef {{uid: number, sequence: number, role: string, content: string, createdAt: number, attachments?: AttachmentInfo[], writeTargets?: WriteTarget[], toolCalls?: unknown[]}} MessageRow
 * @typedef {{uid: number, title: string, status: string, pendingApproval: unknown, pendingInput: unknown, runUuid: string, errorMessage: string}} ConversationSummary
 * @typedef {{isError: boolean, preview: string, durationMs: number, writeTarget: WriteTarget|null}} ToolResult
 * @typedef {{callId: string, name: string, effect: ToolEffect, round: number, arguments: Record<string, unknown>, result?: ToolResult}} ToolCallEntry
 * @typedef {WriteTarget & {toolName: string}} ChangeEntry
 * @typedef {{code: string, text: string}} Problem  a code the view labels, or text the server wrote
 * @typedef {{kind: 'message', key: string, message: MessageRow}
 *   | {kind: 'tool', key: string, call: ToolCallEntry}
 *   | {kind: 'thinking', key: string, round: number, text: string}
 *   | {kind: 'notice', key: string, tone: 'info'|'error', code: string, text: string}} ThreadItem
 * @typedef {{
 *   phase: TurnPhase,
 *   conversation: ConversationSummary|null,
 *   items: ThreadItem[],
 *   draft: string,
 *   runUuid: string,
 *   pendingApproval: PendingApproval|null,
 *   pendingInput: PendingInput|null,
 *   changes: ChangeEntry[],
 *   usage: TokenUsage,
 *   outcome: string|null,
 *   error: Problem|null,
 *   lastEventId: number,
 *   running: boolean,
 * }} ThreadState
 */

/** @type {Readonly<ThreadState>} */
export const initialThreadState = Object.freeze({
  phase: 'idle',
  conversation: null,
  items: [],
  draft: '',
  runUuid: '',
  pendingApproval: null,
  pendingInput: null,
  changes: [],
  usage: emptyUsage,
  outcome: null,
  error: null,
  lastEventId: 0,
  running: false,
});

/** Outcomes that end a turn in the error phase. */
const FAILED_OUTCOMES = new Set(['guardrail_blocked', 'suspend_failed', 'lease_lost', 'failed']);

/** Outcomes the thread marks with a notice line; the tone decides how loudly. */
const NOTICE_TONES = Object.freeze({
  cancelled: 'info',
  requeued: 'info',
  guardrail_blocked: 'error',
  guardrail_approval_required: 'error',
  suspend_failed: 'error',
  lease_lost: 'error',
  failed: 'error',
});

/**
 * @param {string} outcome
 * @returns {'info'|'error'|null}
 */
export function outcomeTone(outcome) {
  return NOTICE_TONES[outcome] ?? null;
}

let syntheticKey = 0;

/** @param {string} prefix */
function nextKey(prefix) {
  syntheticKey += 1;

  return `${prefix}-${syntheticKey}`;
}

/** Only tests need this, so a key asserted in one test does not depend on how many ran before. */
export function resetKeyCounter() {
  syntheticKey = 0;
}

/**
 * @param {MessageRow} message
 * @returns {ThreadItem}
 */
function messageItem(message) {
  return { kind: 'message', key: `m${message.uid || nextKey('local')}`, message };
}

/**
 * @param {string} content
 * @param {AttachmentInfo[]} [attachments]
 * @returns {MessageRow}
 */
function userMessage(content, attachments = []) {
  return {
    uid: 0,
    sequence: 0,
    role: 'user',
    content,
    createdAt: Math.floor(Date.now() / 1000),
    ...(attachments.length > 0 ? { attachments } : {}),
  };
}

/**
 * @param {ThreadItem[]} items
 * @param {'info'|'error'} tone
 * @param {string} code
 * @param {string} [text]
 * @returns {ThreadItem[]}
 */
function withNotice(items, tone, code, text = '') {
  return [...items, { kind: 'notice', key: nextKey('notice'), tone, code, text }];
}

/**
 * @param {ChangeEntry[]} changes
 * @param {WriteTarget|null} target
 * @param {string} toolName
 * @returns {ChangeEntry[]}
 */
function withChange(changes, target, toolName) {
  if (target === null) {
    return changes;
  }
  const seen = changes.some(
    (change) => change.table === target.table && change.uid === target.uid && change.kind === target.kind,
  );

  return seen ? changes : [...changes, { ...target, toolName }];
}

/**
 * Fold the accumulated draft into a real assistant message. `message.final`
 * carries the persisted uid and the authoritative text, so it REPLACES the
 * draft rather than following it.
 *
 * @param {ThreadState} state
 * @param {number} uid
 * @param {string} content
 * @returns {ThreadState}
 */
function commitFinal(state, uid, content) {
  const message = { uid, sequence: 0, role: 'assistant', content, createdAt: Math.floor(Date.now() / 1000) };

  return { ...state, draft: '', items: [...state.items, messageItem(message)] };
}

/**
 * The thread starts a new run: the previous turn's residue is cleared, its transcript is kept.
 *
 * @param {ThreadState} state
 * @param {ThreadItem[]} items
 * @returns {ThreadState}
 */
function startRun(state, items) {
  return {
    ...state,
    phase: 'streaming',
    running: true,
    draft: '',
    error: null,
    outcome: null,
    pendingApproval: null,
    pendingInput: null,
    usage: emptyUsage,
    lastEventId: 0,
    items,
  };
}

/**
 * @param {ConversationSummary|null} conversation
 * @returns {TurnPhase}
 */
function phaseOfStatus(conversation) {
  switch (conversation?.status) {
    case 'awaiting_approval':
      return 'awaiting_approval';
    case 'awaiting_input':
      return 'awaiting_input';
    case 'failed':
      return 'error';
    default:
      return 'idle';
  }
}

/**
 * @typedef {{type: 'reset', conversation: ConversationSummary|null, messages: MessageRow[]}
 *   | {type: 'conversation', conversation: ConversationSummary}
 *   | {type: 'send', content: string, attachments: AttachmentInfo[]}
 *   | {type: 'answer', answer: string}
 *   | {type: 'decide'}
 *   | {type: 'event', event: {event: string, data: unknown, id?: number}}
 *   | {type: 'transport-error', message: string, code?: string}
 *   | {type: 'cancelled'}
 *   | {type: 'dismiss-error'}} ThreadAction
 */

/**
 * @param {ThreadState} state
 * @param {ThreadAction} action
 * @returns {ThreadState}
 */
export function threadReducer(state, action) {
  switch (action.type) {
    case 'reset': {
      const messages = Array.isArray(action.messages) ? action.messages : [];
      const visible = messages.filter(
        (message) => (message.role === 'user' || message.role === 'assistant') && message.content !== '',
      );
      const changes = messages.reduce(
        (all, message) => writeTargetsOf(message.writeTargets).reduce((acc, target) => withChange(acc, target, ''), all),
        /** @type {ChangeEntry[]} */ ([]),
      );
      const conversation = action.conversation;
      const errorMessage = str(conversation?.errorMessage);

      return {
        ...initialThreadState,
        conversation,
        items: visible.map(messageItem),
        changes,
        pendingApproval: pendingApprovalOf(conversation?.pendingApproval),
        pendingInput: pendingInputOf(conversation?.pendingInput, str(conversation?.runUuid)),
        phase: phaseOfStatus(conversation),
        error: errorMessage === '' ? null : { code: '', text: errorMessage },
        runUuid: str(conversation?.runUuid),
      };
    }

    case 'conversation':
      return { ...state, conversation: action.conversation };

    case 'send':
      // The user's own message is shown before the server confirms it; a
      // composer that empties into nothing reads as a lost message.
      return startRun(state, [...state.items, messageItem(userMessage(action.content, action.attachments))]);

    case 'answer':
      return startRun(state, [...state.items, messageItem(userMessage(action.answer))]);

    case 'decide':
      // The decided run continues in a NEW stream, numbered from one again: it
      // is a run start like any other, or its frames would read as replays.
      return startRun(state, state.items);

    case 'event':
      return applyEvent(state, action.event);

    case 'transport-error':
      return {
        ...state,
        phase: 'error',
        running: false,
        error: { code: action.code ?? 'transport', text: action.message },
        draft: '',
      };

    case 'cancelled':
      return {
        ...state,
        phase: 'idle',
        running: false,
        draft: '',
        pendingApproval: null,
        pendingInput: null,
        items: withNotice(state.items, 'info', 'cancelled'),
      };

    case 'dismiss-error':
      return { ...state, error: null, phase: state.phase === 'error' ? 'idle' : state.phase };

    default:
      return state;
  }
}

/**
 * @param {ThreadState} state
 * @param {{event: string, data: unknown, id?: number}} incoming
 * @returns {ThreadState}
 */
function applyEvent(state, incoming) {
  // Ids are monotonic within a stream: a frame at or below the high-water mark
  // has been seen already.
  if (incoming.id !== undefined && incoming.id <= state.lastEventId) {
    return state;
  }

  const advanced = incoming.id === undefined ? state : { ...state, lastEventId: incoming.id };
  const data = isRecord(incoming.data) ? incoming.data : {};

  switch (incoming.event) {
    case 'ping':
      return advanced;

    case 'run.started':
      return {
        ...advanced,
        phase: 'streaming',
        running: true,
        error: null,
        outcome: null,
        runUuid: str(data.runUuid, advanced.runUuid),
      };

    case 'step.llm': {
      const thinking = str(data.thinking);
      const tokens = isRecord(data.tokens) ? data.tokens : {};

      return {
        ...advanced,
        items:
          thinking === ''
            ? advanced.items
            : [...advanced.items, { kind: 'thinking', key: nextKey('think'), round: num(data.round), text: thinking }],
        draft: advanced.draft + str(data.content),
        usage: {
          promptTokens: advanced.usage.promptTokens + num(tokens.prompt),
          completionTokens: advanced.usage.completionTokens + num(tokens.completion),
          totalTokens: advanced.usage.totalTokens + num(tokens.total),
        },
      };
    }

    case 'step.tool.call': {
      /** @type {ToolCallEntry} */
      const call = {
        callId: str(data.callId),
        name: str(data.name),
        effect: effectOf(data.effect),
        round: num(data.round),
        arguments: isRecord(data.arguments) ? data.arguments : {},
      };
      // A call id repeated inside one run is the same call: the JSON transport
      // replays the whole list after a stream that delivered part of it.
      if (call.callId !== '' && advanced.items.some(isSameCall(call.callId))) {
        return advanced;
      }

      return {
        ...advanced,
        running: true,
        items: [...advanced.items, { kind: 'tool', key: `call-${call.callId || nextKey('c')}`, call }],
      };
    }

    case 'step.tool.result': {
      const index = findCallIndex(advanced.items, str(data.callId), str(data.name));
      const item = advanced.items[index];
      if (item === undefined || item.kind !== 'tool') {
        return advanced;
      }
      const result = {
        isError: data.isError === true,
        preview: str(data.preview),
        durationMs: num(data.durationMs),
        writeTarget: writeTargetOf(data.writeTarget),
      };
      const items = advanced.items.slice();
      items[index] = { ...item, call: { ...item.call, result } };

      return { ...advanced, items, changes: withChange(advanced.changes, result.writeTarget, item.call.name) };
    }

    case 'approval.required': {
      const approval = pendingApprovalOf(data);
      if (approval === null) {
        // A digest-less approval cannot be answered — the server refuses it as
        // it refuses a stale one — so it is reported, not drawn with a dead button.
        return { ...advanced, phase: 'error', running: false, error: { code: 'approvalWithoutDigest', text: '' } };
      }

      return {
        ...advanced,
        phase: 'awaiting_approval',
        running: false,
        pendingApproval: approval,
        runUuid: approval.runUuid !== '' ? approval.runUuid : advanced.runUuid,
        draft: '',
      };
    }

    case 'input.required': {
      const input = pendingInputOf(data, advanced.runUuid);
      if (input === null) {
        return { ...advanced, phase: 'error', running: false, error: { code: 'inputWithoutQuestion', text: '' } };
      }

      return { ...advanced, phase: 'awaiting_input', running: false, pendingInput: input, draft: '' };
    }

    case 'message.final': {
      const content = str(data.content);

      return content === '' ? { ...advanced, draft: '' } : commitFinal(advanced, num(data.messageUid), content);
    }

    case 'run.finished':
      return finishRun(advanced, outcomeOf(data.outcome), usageOf(data.usage));

    case 'run.error': {
      const message = str(data.message);

      return {
        ...advanced,
        phase: 'error',
        running: false,
        draft: '',
        error: { code: 'failed', text: message },
        items: withNotice(advanced.items, 'error', 'failed', message),
      };
    }

    default:
      // A frame this client predates. Its id is consumed; nothing else changes.
      return advanced;
  }
}

/**
 * @param {ThreadState} state
 * @param {string} outcome
 * @param {TokenUsage} usage
 * @returns {ThreadState}
 */
function finishRun(state, outcome, usage) {
  // The server's total is authoritative; the per-step sum was a running estimate.
  const withUsage = usage.totalTokens > 0 ? usage : state.usage;
  const suspended =
    (outcome === 'awaiting_approval' && state.pendingApproval !== null) ||
    (outcome === 'awaiting_input' && state.pendingInput !== null);

  // A run that produced prose but no `message.final` would otherwise lose the draft.
  const flushed = state.draft !== '' && !suspended ? commitFinal(state, 0, state.draft) : state;
  const tone = outcomeTone(outcome);
  const failed = FAILED_OUTCOMES.has(outcome);

  let phase = 'idle';
  if (suspended) {
    phase = flushed.phase;
  } else if (failed) {
    phase = 'error';
  }

  return {
    ...flushed,
    outcome,
    usage: withUsage,
    running: false,
    draft: suspended ? flushed.draft : '',
    phase,
    error: failed ? { code: outcome, text: '' } : flushed.error,
    items: tone === null ? flushed.items : withNotice(flushed.items, tone, outcome),
  };
}

/** @param {string} callId */
function isSameCall(callId) {
  return (/** @type {ThreadItem} */ item) => item.kind === 'tool' && item.call.callId === callId;
}

/**
 * Correlation is by id, with one fallback that mirrors the server's recorder: a
 * result whose call id never arrived attaches to the newest unanswered call of
 * the same name.
 *
 * @param {ThreadItem[]} items
 * @param {string} callId
 * @param {string} name
 * @returns {number}
 */
function findCallIndex(items, callId, name) {
  if (callId !== '') {
    const byId = items.findIndex(isSameCall(callId));
    if (byId !== -1) {
      return byId;
    }
  }

  return items.findLastIndex((item) => item.kind === 'tool' && item.call.name === name && item.call.result === undefined);
}

/**
 * Whether the composer may accept a message right now, and — as a label code —
 * why not. One function so the button, the textarea and the hint cannot
 * disagree.
 *
 * @param {TurnPhase} phase
 * @param {boolean} budgetAllowed
 * @param {boolean} available
 * @returns {{disabled: boolean, reason: string}}
 */
export function composerState(phase, budgetAllowed, available) {
  if (!available) {
    return { disabled: true, reason: 'composer.unavailable' };
  }
  if (!budgetAllowed) {
    return { disabled: true, reason: 'composer.budget' };
  }
  switch (phase) {
    case 'streaming':
      return { disabled: true, reason: 'composer.streaming' };
    case 'awaiting_approval':
      return { disabled: true, reason: 'composer.awaitingApproval' };
    case 'awaiting_input':
      return { disabled: true, reason: 'composer.awaitingInput' };
    default:
      return { disabled: false, reason: '' };
  }
}

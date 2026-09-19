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
} from '@/state/decode';
import type {
  AttachmentInfo,
  ConversationSummary,
  MessageRow,
  PendingApproval,
  PendingInput,
  RunOutcome,
  SequencedEvent,
  TokenUsage,
  ToolEffect,
  WriteTarget,
} from '@/state/types';

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
 */

export type TurnPhase = 'idle' | 'streaming' | 'awaiting_approval' | 'awaiting_input' | 'error';

export interface ToolCallEntry {
  callId: string;
  name: string;
  effect: ToolEffect;
  round: number;
  arguments: Record<string, unknown>;
  /** Undefined until `step.tool.result` arrives for this call. */
  result?: { isError: boolean; preview: string; durationMs: number; writeTarget: WriteTarget | null };
}

/** A record the assistant touched in this conversation, and the call that did it. */
export interface ChangeEntry extends WriteTarget {
  toolName: string;
}

export type ThreadItem =
  | { kind: 'message'; key: string; message: MessageRow }
  | { kind: 'tool'; key: string; call: ToolCallEntry }
  | { kind: 'thinking'; key: string; round: number; text: string }
  | { kind: 'notice'; key: string; tone: 'info' | 'error'; text: string };

export interface ThreadState {
  phase: TurnPhase;
  conversation: ConversationSummary | null;
  items: ThreadItem[];
  /** The assistant text accumulating in THIS turn, before `message.final`. */
  draft: string;
  runUuid: string;
  pendingApproval: PendingApproval | null;
  pendingInput: PendingInput | null;
  changes: ChangeEntry[];
  usage: TokenUsage;
  outcome: RunOutcome | null;
  error: string | null;
  /** The highest stream id applied; frames at or below it are duplicates. */
  lastEventId: number;
  /** True from the first frame of a run until it settles, for the shimmer. */
  running: boolean;
}

export type ThreadAction =
  | { type: 'reset'; conversation: ConversationSummary | null; messages: MessageRow[] }
  | { type: 'conversation'; conversation: ConversationSummary }
  | { type: 'send'; content: string; attachments: AttachmentInfo[] }
  | { type: 'answer'; answer: string }
  | { type: 'event'; event: SequencedEvent }
  | { type: 'transport-error'; message: string }
  | { type: 'cancelled' }
  | { type: 'dismiss-error' };

export const initialThreadState: ThreadState = {
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
};

const FAILED_OUTCOMES = new Set<RunOutcome>(['guardrail_blocked', 'suspend_failed', 'lease_lost', 'failed']);

const NOTICES: Partial<Record<RunOutcome, { tone: 'info' | 'error'; text: string }>> = {
  cancelled: { tone: 'info', text: 'Cancelled.' },
  requeued: { tone: 'info', text: 'The run was requeued and will be picked up again.' },
  guardrail_blocked: { tone: 'error', text: 'A guardrail stopped this run.' },
  guardrail_approval_required: { tone: 'error', text: 'A guardrail asked for an approval this client cannot give.' },
  suspend_failed: { tone: 'error', text: 'The run could not be suspended for approval.' },
  lease_lost: { tone: 'error', text: 'The run lost its lease before it finished.' },
  failed: { tone: 'error', text: 'The run failed.' },
};

export function outcomeNotice(outcome: RunOutcome): { tone: 'info' | 'error'; text: string } | null {
  return NOTICES[outcome] ?? null;
}

let syntheticKey = 0;

function nextKey(prefix: string): string {
  syntheticKey += 1;

  return `${prefix}-${syntheticKey}`;
}

/** Only tests need this, so a key asserted in one test does not depend on how many ran before. */
export function resetKeyCounter(): void {
  syntheticKey = 0;
}

function messageItem(message: MessageRow): ThreadItem {
  return { kind: 'message', key: `m${message.uid || nextKey('local')}`, message };
}

function userMessage(content: string, attachments: AttachmentInfo[] = []): MessageRow {
  return {
    uid: 0,
    sequence: 0,
    role: 'user',
    content,
    createdAt: Math.floor(Date.now() / 1000),
    ...(attachments.length > 0 ? { attachments } : {}),
  };
}

function withNotice(items: ThreadItem[], tone: 'info' | 'error', text: string): ThreadItem[] {
  return [...items, { kind: 'notice', key: nextKey('notice'), tone, text }];
}

function withChange(changes: ChangeEntry[], target: WriteTarget | null, toolName: string): ChangeEntry[] {
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
 */
function commitFinal(state: ThreadState, uid: number, content: string): ThreadState {
  const message: MessageRow = { uid, sequence: 0, role: 'assistant', content, createdAt: Math.floor(Date.now() / 1000) };

  return { ...state, draft: '', items: [...state.items, messageItem(message)] };
}

/** The thread starts a new run: the previous turn's residue is cleared, its transcript is kept. */
function startRun(state: ThreadState, items: ThreadItem[]): ThreadState {
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

function phaseOfStatus(conversation: ConversationSummary | null): TurnPhase {
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

export function threadReducer(state: ThreadState, action: ThreadAction): ThreadState {
  switch (action.type) {
    case 'reset': {
      const messages = Array.isArray(action.messages) ? action.messages : [];
      const visible = messages.filter(
        (message) => (message.role === 'user' || message.role === 'assistant') && message.content !== '',
      );
      const changes = messages.reduce<ChangeEntry[]>(
        (all, message) =>
          writeTargetsOf(message.writeTargets).reduce((acc, target) => withChange(acc, target, ''), all),
        [],
      );

      return {
        ...initialThreadState,
        conversation: action.conversation,
        items: visible.map(messageItem),
        changes,
        pendingApproval: pendingApprovalOf(action.conversation?.pendingApproval),
        pendingInput: pendingInputOf(action.conversation?.pendingInput, action.conversation?.runUuid ?? ''),
        phase: phaseOfStatus(action.conversation),
        error: action.conversation?.errorMessage || null,
        runUuid: action.conversation?.runUuid ?? '',
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

    case 'event':
      return applyEvent(state, action.event);

    case 'transport-error':
      return { ...state, phase: 'error', running: false, error: action.message, draft: '' };

    case 'cancelled':
      return {
        ...state,
        phase: 'idle',
        running: false,
        draft: '',
        pendingApproval: null,
        pendingInput: null,
        items: withNotice(state.items, 'info', 'Cancelled.'),
      };

    case 'dismiss-error':
      return { ...state, error: null, phase: state.phase === 'error' ? 'idle' : state.phase };

    default:
      return state;
  }
}

function applyEvent(state: ThreadState, incoming: SequencedEvent): ThreadState {
  // Ids are monotonic within a stream: a frame at or below the high-water mark
  // has been seen (a resumed stream replays, StrictMode double-dispatches).
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
      const call: ToolCallEntry = {
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
        return {
          ...advanced,
          phase: 'error',
          running: false,
          error: 'The run asked for approval without a digest, so it cannot be decided here.',
        };
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
        return {
          ...advanced,
          phase: 'error',
          running: false,
          error: 'The run asked for input without a question, so it cannot be answered here.',
        };
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
      const message = str(data.message, 'The run failed.');

      return {
        ...advanced,
        phase: 'error',
        running: false,
        draft: '',
        error: message,
        items: withNotice(advanced.items, 'error', message),
      };
    }

    default:
      // A frame this bundle predates. Its id is consumed; nothing else changes.
      return advanced;
  }
}

function finishRun(state: ThreadState, outcome: RunOutcome, usage: TokenUsage): ThreadState {
  // The server's total is authoritative; the per-step sum was a running estimate.
  const withUsage = usage.totalTokens > 0 ? usage : state.usage;
  const suspended =
    (outcome === 'awaiting_approval' && state.pendingApproval !== null) ||
    (outcome === 'awaiting_input' && state.pendingInput !== null);

  // A run that produced prose but no `message.final` would otherwise lose the draft.
  const flushed = state.draft !== '' && !suspended ? commitFinal(state, 0, state.draft) : state;
  const notice = outcomeNotice(outcome);
  const failed = FAILED_OUTCOMES.has(outcome);

  return {
    ...flushed,
    outcome,
    usage: withUsage,
    running: false,
    draft: suspended ? flushed.draft : '',
    phase: suspended ? flushed.phase : failed ? 'error' : 'idle',
    error: failed ? (notice?.text ?? 'The run failed.') : flushed.error,
    items: notice === null ? flushed.items : withNotice(flushed.items, notice.tone, notice.text),
  };
}

function isSameCall(callId: string) {
  return (item: ThreadItem): boolean => item.kind === 'tool' && item.call.callId === callId;
}

/**
 * Correlation is by id, with one fallback that mirrors the server's recorder: a
 * result whose call id never arrived attaches to the newest unanswered call of
 * the same name.
 */
function findCallIndex(items: ThreadItem[], callId: string, name: string): number {
  if (callId !== '') {
    const byId = items.findIndex(isSameCall(callId));
    if (byId !== -1) {
      return byId;
    }
  }
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index];
    if (item !== undefined && item.kind === 'tool' && item.call.name === name && item.call.result === undefined) {
      return index;
    }
  }

  return -1;
}

/**
 * Whether the composer may accept a message right now, and why not. One
 * function so the button, the textarea and the hint cannot disagree.
 */
export function composerState(
  phase: TurnPhase,
  budgetAllowed: boolean,
  budgetReason: string | null,
  available: boolean,
): { disabled: boolean; reason: string } {
  if (!available) {
    return { disabled: true, reason: 'The AI chat is not configured on this installation.' };
  }
  if (!budgetAllowed) {
    return { disabled: true, reason: budgetReason ?? 'Your spend budget for this period is used up.' };
  }
  switch (phase) {
    case 'streaming':
      return { disabled: true, reason: 'A turn is running. Wait for it to finish, or cancel it.' };
    case 'awaiting_approval':
      return { disabled: true, reason: 'Decide the pending tool calls before sending another message.' };
    case 'awaiting_input':
      return { disabled: true, reason: 'Answer the question above before sending another message.' };
    default:
      return { disabled: false, reason: '' };
  }
}

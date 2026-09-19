/**
 * The API's vocabulary, in TypeScript — the contract in CONTRACT.md restated
 * for the compiler. Where a field is optional in the PHP it is optional here.
 */

export type ToolEffect = 'read_only' | 'idempotent_write' | 'non_idempotent_write';

export type RunOutcome =
  | 'completed'
  | 'awaiting_approval'
  | 'awaiting_input'
  | 'guardrail_blocked'
  | 'guardrail_approval_required'
  | 'suspend_failed'
  | 'cancelled'
  | 'lease_lost'
  | 'requeued'
  | 'failed';

export type ConversationStatus = 'idle' | 'processing' | 'awaiting_approval' | 'awaiting_input' | 'failed';

export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AttachmentInfo {
  fileUid: number;
  fileName: string;
  fileMimeType: string;
  fileSize: number;
}

/** What a tool did to a record, as nr-llm 0.35 reports it (`ToolResult::withWriteTarget`). */
export type WriteKind = 'created' | 'updated' | 'other';

export interface WriteTarget {
  table: string;
  uid: number;
  kind: WriteKind;
}

export interface PendingCall {
  index: number;
  callId: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface PendingApproval {
  runUuid: string;
  /**
   * nr-llm recomputes this from the run's live state and refuses a mismatch, so
   * it travels back to `conversations/approval` byte for byte.
   */
  turnDigest: string;
  calls: PendingCall[];
}

/** A clarifying question the run stopped to ask (nr-llm `submitInput`). */
export interface PendingInput {
  runUuid: string;
  /** Bound to the turn the question was rendered from (nr-llm ADR-150); echoed back verbatim. */
  turnDigest: string;
  question: string;
  options: string[];
  allowFreeText: boolean;
}

export interface MessageRow {
  uid: number;
  sequence: number;
  role: MessageRole;
  content: string;
  createdAt: number;
  toolCalls?: unknown[];
  toolCallId?: string;
  attachments?: AttachmentInfo[];
  writeTargets?: WriteTarget[];
  runUuid?: string;
  tokens?: { prompt: number; completion: number };
}

export interface ConversationSummary {
  uid: number;
  title: string;
  status: ConversationStatus;
  messageCount: number;
  pinned: boolean;
  archived: boolean;
  autoApproveTools: boolean;
  runUuid: string;
  pendingApproval: PendingApproval | Record<string, never>;
  pendingInput: PendingInput | Record<string, never>;
  errorMessage: string;
  /** The app the conversation was started from, and the page it was on. */
  appName: string;
  pageId: number;
  lastMessageAt: number;
  createdAt: number;
}

export interface ToolDescription {
  name: string;
  mcpName: string | null;
  effect: ToolEffect;
  requiresApproval: boolean;
}

export interface InstructionSummary {
  uid: number;
  title: string;
}

/** What the backend knows about where this shell is. */
export interface StatusContext {
  pageId: number;
  pageTitle: string;
  workspace: string;
  appName: string;
}

export interface ChatStatus {
  available: boolean;
  issues: string[];
  configuration: { identifier: string; name: string; provider: string; model: string } | null;
  tools: ToolDescription[];
  budget: { allowed: boolean; reason: string | null };
  limits: {
    maxMessageLength: number;
    maxIterations: number;
    turnsPerHour: number;
    /** -1 when the installation set no per-hour limit. */
    turnsRemaining: number;
    activeConversations: number;
  };
  suggestions: string[];
  features: { sse: boolean; approvals: boolean; input: boolean; attachments: boolean; writes: boolean };
  instructions: InstructionSummary[];
  context: StatusContext;
}

/** What travels with a turn so "this page" and "this app" mean something. */
export interface TurnContext {
  appName?: string;
  appContext?: Record<string, unknown>;
  pageId?: number;
}

// --------------------------------------------------------------- turn events

export interface RunStartedEvent {
  event: 'run.started';
  data: { runUuid: string; userMessageUid: number };
}

export interface LlmStepEvent {
  event: 'step.llm';
  data: {
    round: number;
    content?: string;
    thinking?: string;
    tokens: { prompt: number; completion: number; total: number };
  };
}

export interface ToolCallEvent {
  event: 'step.tool.call';
  data: { round: number; callId: string; name: string; arguments: Record<string, unknown>; effect: ToolEffect };
}

export interface ToolResultEvent {
  event: 'step.tool.result';
  data: {
    callId: string;
    name: string;
    isError: boolean;
    preview: string;
    durationMs: number;
    writeTarget?: WriteTarget;
  };
}

export interface ApprovalRequiredEvent {
  event: 'approval.required';
  data: PendingApproval;
}

export interface InputRequiredEvent {
  event: 'input.required';
  data: { runUuid?: string; turnDigest: string; question: string; options?: string[]; allowFreeText: boolean };
}

export interface MessageFinalEvent {
  event: 'message.final';
  data: { messageUid: number; content: string };
}

export interface RunFinishedEvent {
  event: 'run.finished';
  data: { outcome: RunOutcome; usage: TokenUsage };
}

export interface RunErrorEvent {
  event: 'run.error';
  data: { message: string };
}

export interface PingEvent {
  event: 'ping';
  data: { at: number };
}

export type TurnEvent =
  | RunStartedEvent
  | LlmStepEvent
  | ToolCallEvent
  | ToolResultEvent
  | ApprovalRequiredEvent
  | InputRequiredEvent
  | MessageFinalEvent
  | RunFinishedEvent
  | RunErrorEvent
  | PingEvent;

/**
 * A turn event as it arrives: the payload plus the stream's monotonic `id:`.
 * The JSON transport has no ids, so the field is optional and "no id" means
 * "cannot be a duplicate".
 */
export interface SequencedEvent {
  id?: number;
  event: TurnEvent['event'];
  data: unknown;
}

/** The non-streaming transport's body: the same event list, in one document. */
export interface TurnJsonResponse {
  runUuid: string;
  outcome: RunOutcome;
  status: ConversationStatus;
  message: string;
  messages: MessageRow[];
  pendingApproval: PendingApproval | Record<string, never>;
  pendingInput: PendingInput | Record<string, never>;
  usage: TokenUsage;
  events: { event: TurnEvent['event']; data: unknown }[];
}

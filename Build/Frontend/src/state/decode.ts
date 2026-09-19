import type {
  PendingApproval,
  PendingCall,
  PendingInput,
  RunOutcome,
  TokenUsage,
  ToolEffect,
  WriteKind,
  WriteTarget,
} from '@/state/types';

/**
 * Payloads off the wire, turned into the typed shapes the reducer holds.
 *
 * Every frame arrives as `unknown` and is read here, once. The reducer never
 * touches a raw payload, so a server that omits or mistypes a field costs one
 * default here rather than a crash mid-run.
 */

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function num(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function effectOf(value: unknown): ToolEffect {
  return value === 'idempotent_write' || value === 'non_idempotent_write' ? value : 'read_only';
}

const OUTCOMES = new Set<RunOutcome>([
  'completed',
  'awaiting_approval',
  'awaiting_input',
  'guardrail_blocked',
  'guardrail_approval_required',
  'suspend_failed',
  'cancelled',
  'lease_lost',
  'requeued',
  'failed',
]);

export function outcomeOf(value: unknown): RunOutcome {
  return typeof value === 'string' && OUTCOMES.has(value as RunOutcome) ? (value as RunOutcome) : 'completed';
}

export const emptyUsage: TokenUsage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };

export function usageOf(value: unknown): TokenUsage {
  if (!isRecord(value)) {
    return emptyUsage;
  }

  return {
    promptTokens: num(value.promptTokens),
    completionTokens: num(value.completionTokens),
    totalTokens: num(value.totalTokens),
  };
}

const WRITE_KINDS = new Set<WriteKind>(['created', 'updated']);

export function writeKindOf(value: unknown): WriteKind {
  return typeof value === 'string' && WRITE_KINDS.has(value as WriteKind) ? (value as WriteKind) : 'other';
}

/** A write target, or null when the tool did not write (or said so incompletely). */
export function writeTargetOf(value: unknown): WriteTarget | null {
  if (!isRecord(value)) {
    return null;
  }
  const table = str(value.table);
  const uid = num(value.uid);
  if (table === '' || uid <= 0) {
    return null;
  }

  return { table, uid, kind: writeKindOf(value.kind) };
}

export function writeTargetsOf(value: unknown): WriteTarget[] {
  return Array.isArray(value) ? value.map(writeTargetOf).filter((target) => target !== null) : [];
}

export function pendingApprovalOf(value: unknown): PendingApproval | null {
  if (!isRecord(value) || typeof value.turnDigest !== 'string' || value.turnDigest === '') {
    return null;
  }
  const calls: PendingCall[] = Array.isArray(value.calls)
    ? value.calls.filter(isRecord).map((call, index) => ({
        index: num(call.index, index),
        callId: str(call.callId),
        name: str(call.name),
        arguments: isRecord(call.arguments) ? call.arguments : {},
      }))
    : [];

  return { runUuid: str(value.runUuid), turnDigest: value.turnDigest, calls };
}

export function pendingInputOf(value: unknown, fallbackRunUuid = ''): PendingInput | null {
  if (!isRecord(value)) {
    return null;
  }
  const question = str(value.question);
  if (question === '') {
    return null;
  }
  const options = Array.isArray(value.options)
    ? value.options.filter((option): option is string => typeof option === 'string' && option !== '')
    : [];

  return {
    runUuid: str(value.runUuid, fallbackRunUuid),
    turnDigest: str(value.turnDigest),
    question,
    options,
    // A question with no options MUST accept free text, whatever the flag says.
    allowFreeText: options.length === 0 || value.allowFreeText !== false,
  };
}

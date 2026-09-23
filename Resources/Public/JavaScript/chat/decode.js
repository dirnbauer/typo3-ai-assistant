/**
 * Payloads off the wire, turned into the shapes the thread state holds.
 *
 * Every frame arrives as `unknown` and is read here, once. The reducer never
 * touches a raw payload, so a server that omits or mistypes a field costs one
 * default here rather than a crash mid-run.
 *
 * Framework-free on purpose: Tests/JavaScript runs it under `node --test`.
 */

/**
 * @typedef {'read_only'|'idempotent_write'|'non_idempotent_write'} ToolEffect
 * @typedef {'created'|'updated'|'other'} WriteKind
 * @typedef {{table: string, uid: number, kind: WriteKind}} WriteTarget
 * @typedef {{index: number, callId: string, name: string, arguments: Record<string, unknown>}} PendingCall
 * @typedef {{runUuid: string, turnDigest: string, calls: PendingCall[]}} PendingApproval
 * @typedef {{runUuid: string, turnDigest: string, question: string, options: string[], allowFreeText: boolean}} PendingInput
 * @typedef {{promptTokens: number, completionTokens: number, totalTokens: number}} TokenUsage
 */

export const OUTCOMES = Object.freeze([
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

const OUTCOME_SET = new Set(OUTCOMES);

/** @type {Readonly<TokenUsage>} */
export const emptyUsage = Object.freeze({ promptTokens: 0, completionTokens: 0, totalTokens: 0 });

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
export function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @param {string} [fallback]
 * @returns {string}
 */
export function str(value, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

/**
 * @param {unknown} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function num(value, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

/**
 * @param {unknown} value
 * @returns {ToolEffect}
 */
export function effectOf(value) {
  return value === 'idempotent_write' || value === 'non_idempotent_write' ? value : 'read_only';
}

/**
 * An outcome this client does not know is read as `completed`: the run is
 * over either way, and the conversation row says what state it settled in.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function outcomeOf(value) {
  return typeof value === 'string' && OUTCOME_SET.has(value) ? value : 'completed';
}

/**
 * @param {unknown} value
 * @returns {TokenUsage}
 */
export function usageOf(value) {
  if (!isRecord(value)) {
    return { ...emptyUsage };
  }

  return {
    promptTokens: num(value.promptTokens),
    completionTokens: num(value.completionTokens),
    totalTokens: num(value.totalTokens),
  };
}

/**
 * @param {unknown} value
 * @returns {WriteKind}
 */
export function writeKindOf(value) {
  return value === 'created' || value === 'updated' ? value : 'other';
}

/**
 * A write target, or null when the tool did not write (or said so incompletely).
 *
 * @param {unknown} value
 * @returns {WriteTarget|null}
 */
export function writeTargetOf(value) {
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

/**
 * @param {unknown} value
 * @returns {WriteTarget[]}
 */
export function writeTargetsOf(value) {
  return Array.isArray(value) ? value.map(writeTargetOf).filter((target) => target !== null) : [];
}

/**
 * An approval card, or null when it carries no digest — the server refuses a
 * digest-less decision just as it refuses a stale one.
 *
 * @param {unknown} value
 * @returns {PendingApproval|null}
 */
export function pendingApprovalOf(value) {
  if (!isRecord(value) || typeof value.turnDigest !== 'string' || value.turnDigest === '') {
    return null;
  }
  const calls = Array.isArray(value.calls)
    ? value.calls.filter(isRecord).map((call, index) => ({
        index: num(call.index, index),
        callId: str(call.callId),
        name: str(call.name),
        arguments: isRecord(call.arguments) ? call.arguments : {},
      }))
    : [];

  return { runUuid: str(value.runUuid), turnDigest: value.turnDigest, calls };
}

/**
 * @param {unknown} value
 * @param {string} [fallbackRunUuid]
 * @returns {PendingInput|null}
 */
export function pendingInputOf(value, fallbackRunUuid = '') {
  if (!isRecord(value)) {
    return null;
  }
  const question = str(value.question);
  if (question === '') {
    return null;
  }
  const options = Array.isArray(value.options)
    ? value.options.filter((option) => typeof option === 'string' && option !== '')
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

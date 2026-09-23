import { html, nothing } from 'lit';
import labels from '~labels/webcon_ai_assistant.chat';
import '@typo3/backend/element/icon-element.js';

/**
 * Small pieces every chat surface draws the same way: icons, badges, problem
 * text and the list of records a conversation changed.
 */

let idSequence = 0;

/**
 * A label from the `webcon_ai_assistant.chat` domain. The core's label
 * provider throws for a key it does not know; a surface must never go blank
 * over one missing translation, so the key itself is the last resort.
 *
 * @param {string} key
 * @param {Record<string, string|number>} [values] named ICU arguments
 * @returns {string}
 */
export function label(key, values = undefined) {
  try {
    return String(labels.get(key, values));
  } catch {
    return key;
  }
}

/** A document-unique id for label/control pairs. @param {string} prefix */
export function uniqueId(prefix) {
  idSequence += 1;

  return `webcon-ai-assistant-${prefix}-${idSequence}`;
}

/**
 * @param {string} identifier
 * @param {'small'|'medium'|'large'} [size]
 */
export function icon(identifier, size = 'small') {
  return html`<typo3-backend-icon identifier=${identifier} size=${size} aria-hidden="true"></typo3-backend-icon>`;
}

/**
 * The sentence for a problem: the server's own text when it wrote one, the
 * label its code names otherwise.
 *
 * @param {{code: string, text: string, arguments?: Record<string, string|number>}|null} problem
 */
export function problemText(problem) {
  if (problem === null) {
    return '';
  }
  if (problem.text !== '') {
    return problem.text;
  }

  const text = label(problem.code, problem.arguments);

  return text === problem.code ? label('problem.generic') : text;
}

const EFFECTS = Object.freeze({
  read_only: { badge: 'badge-default', icon: 'actions-eye' },
  idempotent_write: { badge: 'badge-warning', icon: 'actions-document-edit' },
  non_idempotent_write: { badge: 'badge-danger', icon: 'actions-exclamation-triangle' },
});

/**
 * What a tool call does to this installation, in the runtime's own terms: a
 * badge that reads more comfortably than the gate behaves is worse than none.
 *
 * @param {string} effect
 */
export function effectBadge(effect) {
  const style = EFFECTS[effect] ?? EFFECTS.non_idempotent_write;
  const key = effect in EFFECTS ? effect : 'non_idempotent_write';

  return html`<span class="badge ${style.badge} webcon-ai-assistant-badge" title=${label(`effect.${key}.explanation`)}>
    ${icon(style.icon)}<span>${label(`effect.${key}`)}</span>
  </span>`;
}

/** The same colours as the cards the states show: warning for an approval, info for a question. */
const STATUS_BADGES = Object.freeze({
  processing: 'badge-primary',
  awaiting_approval: 'badge-warning',
  awaiting_input: 'badge-info',
  failed: 'badge-danger',
});

/** A conversation's state, when it is anything but idle. @param {string} status */
export function statusBadge(status) {
  const badge = STATUS_BADGES[status];
  if (badge === undefined) {
    return nothing;
  }

  return html`<span class="badge ${badge}">${label(`status.${status}`)}</span>`;
}

/**
 * `tt_content` reads as "Content element", `pages` as "Page"; a table without
 * a label reads as itself.
 *
 * @param {string} table
 */
export function tableLabel(table) {
  const text = label(`table.${table}`);

  return text === `table.${table}` ? table : text;
}

/**
 * "Changes in this conversation": records a tool reported having written —
 * never what the model SAID it did. Each row opens the record in FormEngine
 * when the surface can.
 *
 * @param {Array<{table: string, uid: number, kind: string, toolName?: string}>} changes
 * @param {((table: string, uid: number) => void)|null} onOpen
 */
export function changeList(changes, onOpen) {
  if (changes.length === 0) {
    return html`<p class="text-variant">${label('changes.empty')}</p>`;
  }

  return html`<ul class="webcon-ai-assistant-changes">
    ${changes.map(
      (change) => html`<li>
        ${icon(change.kind === 'created' ? 'actions-document-add' : 'actions-document-edit')}
        <span class="webcon-ai-assistant-changes-record">
          ${tableLabel(change.table)} <span class="text-variant">#${change.uid}</span>
        </span>
        <span class="badge ${change.kind === 'created' ? 'badge-success' : 'badge-warning'}">${label(`changes.kind.${change.kind}`)}</span>
        ${onOpen === null
          ? nothing
          : html`<button type="button" class="btn btn-link btn-sm" @click=${() => onOpen(change.table, change.uid)}>
              ${icon('actions-open')}<span class="visually-hidden">${label('changes.open', { record: `${tableLabel(change.table)} ${change.uid}` })}</span>
            </button>`}
      </li>`,
    )}
  </ul>`;
}

/**
 * What may be attached to a message, as the status route says.
 *
 * The server extracts text from a fixed set of formats and caps each kind at
 * its own size; it reports both, so the picker offers exactly those and a file
 * over its cap is refused before a byte is uploaded. The server checks again —
 * this is the courtesy, not the gate.
 *
 * Framework-free on purpose: Tests/JavaScript runs it under `node --test`.
 */

/**
 * @typedef {{extensions: string[], mimeTypes: string[], maxBytes: Record<string, number>}} AttachmentRules
 * @typedef {{ok: true, extension: string} | {ok: false, reason: 'type'|'size', maxBytes: number}} FileCheck
 */

/**
 * @param {unknown} raw the status payload's `attachments` object
 * @returns {AttachmentRules}
 */
export function attachmentRules(raw) {
  const value = typeof raw === 'object' && raw !== null ? /** @type {Record<string, unknown>} */ (raw) : {};
  const list = (entry) => (Array.isArray(entry) ? entry.filter((item) => typeof item === 'string' && item !== '') : []);
  const maxBytes = {};
  if (typeof value.maxBytes === 'object' && value.maxBytes !== null) {
    for (const [extension, bytes] of Object.entries(value.maxBytes)) {
      if (typeof bytes === 'number' && bytes > 0) {
        maxBytes[extension.toLowerCase()] = bytes;
      }
    }
  }

  return { extensions: list(value.extensions).map((extension) => extension.toLowerCase()), mimeTypes: list(value.mimeTypes), maxBytes };
}

/**
 * The file input's `accept` attribute.
 *
 * @param {AttachmentRules} rules
 */
export function acceptAttribute(rules) {
  return [...rules.extensions.map((extension) => `.${extension}`), ...rules.mimeTypes].join(',');
}

/**
 * @param {{name: string, size: number}} file
 * @param {AttachmentRules} rules
 * @returns {FileCheck}
 */
export function checkFile(file, rules) {
  const dot = file.name.lastIndexOf('.');
  const extension = dot === -1 ? '' : file.name.slice(dot + 1).toLowerCase();
  if (extension === '' || !rules.extensions.includes(extension)) {
    return { ok: false, reason: 'type', maxBytes: 0 };
  }
  const maxBytes = rules.maxBytes[extension] ?? 0;
  if (maxBytes > 0 && file.size > maxBytes) {
    return { ok: false, reason: 'size', maxBytes };
  }

  return { ok: true, extension };
}

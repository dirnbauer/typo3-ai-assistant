import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

/**
 * Every label the JavaScript asks for exists — in English and in German.
 *
 * The core's label provider THROWS for an unknown key, and the elements fall
 * back to printing the key; neither is something a user should ever see, so a
 * missing label fails here instead.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const language = join(root, 'Resources/Private/Language');

/** @param {string} file */
function keys(file) {
  return new Set([...readFileSync(join(language, file), 'utf8').matchAll(/<trans-unit id="([^"]+)"/g)].map((match) => match[1]));
}

/** @param {string} directory @returns {string[]} */
function sources(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? sources(join(directory, entry.name)) : entry.name.endsWith('.js') ? [join(directory, entry.name)] : [],
  );
}

const english = keys('chat.xlf');
const german = keys('de.chat.xlf');

/** Keys built at run time from a code, spelled out once. */
const DYNAMIC = [
  ...['cancelled', 'requeued', 'guardrail_blocked', 'guardrail_approval_required', 'suspend_failed', 'lease_lost', 'failed'].map((code) => `notice.${code}`),
  ...['transport', 'approvalWithoutDigest', 'inputWithoutQuestion', 'failed', 'guardrail_blocked', 'suspend_failed', 'lease_lost'].map((code) => `error.${code}`),
  ...['processing', 'awaiting_approval', 'awaiting_input', 'failed'].map((status) => `status.${status}`),
  ...['read_only', 'idempotent_write', 'non_idempotent_write'].flatMap((effect) => [`effect.${effect}`, `effect.${effect}.explanation`]),
  ...['created', 'updated', 'other'].map((kind) => `changes.kind.${kind}`),
  ...['running', 'error', 'done'].map((state) => `tool.state.${state}`),
  ...['offline', 'forbidden', 'notFound', 'conflict', 'tooLarge', 'unreadable', 'limit', 'server', 'generic'].map((code) => `problem.${code}`),
  ...['unavailable', 'budget', 'streaming', 'awaitingApproval', 'awaitingInput'].map((reason) => `composer.${reason}`),
  'attachment.type',
  'attachment.size',
];

describe('labels', () => {
  it('has every label the JavaScript uses', () => {
    const used = new Set(DYNAMIC);
    for (const file of sources(join(root, 'Resources/Public/JavaScript'))) {
      const source = readFileSync(file, 'utf8');
      for (const match of source.matchAll(/label\(\s*'([^']+)'/g)) {
        used.add(match[1]);
      }
      for (const match of source.matchAll(/label\([^)]*?\?\s*'([^']+)'\s*:\s*'([^']+)'/g)) {
        used.add(match[1]);
        used.add(match[2]);
      }
    }

    assert.deepEqual([...used].filter((key) => !english.has(key)).sort(), []);
  });

  it('translates every label into German', () => {
    assert.deepEqual([...english].filter((key) => !german.has(key)).sort(), []);
    assert.deepEqual([...german].filter((key) => !english.has(key)).sort(), []);
  });
});

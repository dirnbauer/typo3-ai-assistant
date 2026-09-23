import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { acceptAttribute, attachmentRules, checkFile } from '../../Resources/Public/JavaScript/chat/attachments.js';
import { pendingApprovalOf, pendingInputOf, writeKindOf, writeTargetOf, writeTargetsOf } from '../../Resources/Public/JavaScript/chat/decode.js';
import { formatBytes, formatDuration, formatTimestamp, toolDisplayName } from '../../Resources/Public/JavaScript/chat/format.js';

const rules = attachmentRules({
  extensions: ['txt', 'md', 'csv', 'pdf', 'docx'],
  mimeTypes: ['text/plain', 'application/pdf'],
  maxBytes: { txt: 2 * 1024 * 1024, md: 2 * 1024 * 1024, csv: 2 * 1024 * 1024, pdf: 20 * 1024 * 1024, docx: 15 * 1024 * 1024 },
});

describe('attachments', () => {
  it('accepts what the server can read, by extension, at exactly the limit', () => {
    assert.deepEqual(checkFile({ name: 'notes.TXT', size: 2 * 1024 * 1024 }, rules), { ok: true, extension: 'txt' });
  });

  it('refuses a file larger than its own kind allows, naming the limit', () => {
    assert.deepEqual(checkFile({ name: 'huge.pdf', size: 20 * 1024 * 1024 + 1 }, rules), {
      ok: false,
      reason: 'size',
      maxBytes: 20 * 1024 * 1024,
    });
  });

  it('refuses a kind the server cannot read at all', () => {
    assert.equal(checkFile({ name: 'clip.mp4', size: 10 }, rules).reason, 'type');
    assert.equal(checkFile({ name: 'README', size: 10 }, rules).reason, 'type');
  });

  it('offers the picker every extension and MIME type it accepts', () => {
    const accept = acceptAttribute(rules);

    assert.ok(accept.includes('.docx'));
    assert.ok(accept.includes('application/pdf'));
  });

  it('reads a missing or malformed status as "nothing may be attached"', () => {
    assert.deepEqual(attachmentRules(null), { extensions: [], mimeTypes: [], maxBytes: {} });
    assert.deepEqual(attachmentRules({ extensions: 'pdf', maxBytes: { pdf: -1 } }), { extensions: [], mimeTypes: [], maxBytes: {} });
  });
});

describe('formatting', () => {
  it('states sizes and durations the way a person reads them, in the backend language', () => {
    assert.equal(formatBytes(0, 'en'), '0 B');
    assert.equal(formatBytes(2048, 'en'), '2.0 kB');
    assert.equal(formatBytes(1_572_864, 'en'), '1.5 MB');
    assert.equal(formatBytes(1_572_864, 'de'), '1,5 MB');
    assert.equal(formatDuration(340, 'en'), '340 ms');
    assert.equal(formatDuration(1500, 'en'), '1.5 s');
    assert.equal(formatDuration(1500, 'de'), '1,5 s');
    assert.equal(formatDuration(125_000, 'en'), '2 min 5 s');
  });

  it('shows only the time for today, and the date otherwise', () => {
    const now = new Date(2026, 8, 23, 15, 0, 0);
    const today = Math.floor(new Date(2026, 8, 23, 9, 5, 0).getTime() / 1000);
    const earlier = Math.floor(new Date(2026, 8, 20, 9, 5, 0).getTime() / 1000);

    assert.equal(formatTimestamp(today, 'de', now), '09:05');
    assert.ok(formatTimestamp(earlier, 'de', now).includes('20.09.'));
    assert.equal(formatTimestamp(0, 'de', now), '');
  });

  it('drops the MCP prefix and leaves the name the integrator recognises', () => {
    assert.equal(toolDisplayName('typo3_GetPageTree'), 'GetPageTree');
    assert.equal(toolDisplayName('ask_user'), 'ask_user');
  });
});

describe('decoding what the server sent', () => {
  it('keeps a write target only when it names a real record', () => {
    assert.deepEqual(writeTargetOf({ table: 'pages', uid: 42, kind: 'created' }), { table: 'pages', uid: 42, kind: 'created' });
    assert.equal(writeTargetOf({ table: '', uid: 42 }), null);
    assert.equal(writeTargetOf({ table: 'pages', uid: 0 }), null);
    assert.equal(writeTargetOf('pages:42'), null);
    assert.equal(writeKindOf('renamed'), 'other');
  });

  it('drops the unusable entries of a list instead of the list', () => {
    assert.deepEqual(writeTargetsOf([{ table: 'pages', uid: 1, kind: 'updated' }, null, { table: '', uid: 2 }]), [
      { table: 'pages', uid: 1, kind: 'updated' },
    ]);
    assert.deepEqual(writeTargetsOf('nope'), []);
  });

  it('refuses an approval that carries no digest, because it could not be answered', () => {
    assert.equal(pendingApprovalOf({ runUuid: 'r1', calls: [] }), null);
    assert.deepEqual(pendingApprovalOf({ runUuid: 'r1', turnDigest: 'd1', calls: [{ name: 'typo3_WriteTable' }] }).calls[0], {
      index: 0,
      callId: '',
      name: 'typo3_WriteTable',
      arguments: {},
    });
  });

  it('lets a question with no options be answered in free text, whatever the flag says', () => {
    assert.equal(pendingInputOf({ question: 'Which one?', allowFreeText: false }).allowFreeText, true);
    assert.equal(pendingInputOf({ question: 'Which one?', options: ['a', 'b'], allowFreeText: false }).allowFreeText, false);
    assert.equal(pendingInputOf({ options: ['a'] }), null);
  });

  it('falls back to the run it belongs to when the frame omits the uuid', () => {
    assert.equal(pendingInputOf({ question: 'Which one?' }, 'r9').runUuid, 'r9');
  });
});

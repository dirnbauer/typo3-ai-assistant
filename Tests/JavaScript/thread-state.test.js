import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import {
  composerState,
  initialThreadState,
  outcomeTone,
  resetKeyCounter,
  threadReducer,
} from '../../Resources/Public/JavaScript/chat/thread-state.js';

/**
 * The reducer is the client's whole understanding of a run. Every test here is
 * a stream of frames exactly as the server sends them, so a change to the wire
 * format has to fail here before it can confuse a user.
 */

/** @param {object[]} actions */
function fold(actions, from = initialThreadState) {
  return actions.reduce(threadReducer, from);
}

/** @param {string} name @param {Record<string, unknown>} data @param {number} [id] */
function event(name, data = {}, id = undefined) {
  return { type: 'event', event: id === undefined ? { event: name, data } : { id, event: name, data } };
}

const conversation = {
  uid: 12,
  title: 'Redirects',
  status: 'idle',
  messageCount: 0,
  pinned: false,
  archived: false,
  autoApproveTools: false,
  runUuid: '',
  pendingApproval: {},
  pendingInput: {},
  errorMessage: '',
  appName: '',
  pageId: 0,
  lastMessageAt: 0,
  createdAt: 0,
};

const contents = (state) => state.items.map((item) => (item.kind === 'message' ? item.message.content : item.kind));

beforeEach(resetKeyCounter);

describe('a plain turn', () => {
  it('shows the user message at once and replaces the draft with the final text', () => {
    const state = fold([
      { type: 'send', content: 'How many redirects?', attachments: [] },
      event('run.started', { runUuid: 'r1' }),
      event('step.llm', { content: 'There are ', tokens: { prompt: 10, completion: 2, total: 12 } }),
      event('step.llm', { content: 'three.', tokens: { prompt: 0, completion: 3, total: 3 } }),
      event('message.final', { messageUid: 44, content: 'There are three redirects.' }),
      event('run.finished', { outcome: 'completed', usage: { promptTokens: 10, completionTokens: 5, totalTokens: 15 } }),
    ]);

    assert.equal(state.phase, 'idle');
    assert.equal(state.running, false);
    assert.equal(state.draft, '');
    assert.deepEqual(contents(state), ['How many redirects?', 'There are three redirects.']);
    // run.finished carries the authoritative usage; the per-step sums are a
    // live estimate and must not be added to it.
    assert.deepEqual(state.usage, { promptTokens: 10, completionTokens: 5, totalTokens: 15 });
  });

  it('keeps the draft visible while it streams', () => {
    const state = fold([
      { type: 'send', content: 'Summarise this page.', attachments: [] },
      event('step.llm', { content: 'This page ' }),
      event('step.llm', { content: 'has three elements.' }),
    ]);

    assert.equal(state.draft, 'This page has three elements.');
    assert.equal(state.phase, 'streaming');
  });

  it('drops a message.final with no text rather than adding an empty bubble', () => {
    const state = fold([{ type: 'send', content: 'Hm.', attachments: [] }, event('message.final', { content: '' })]);

    assert.equal(state.items.length, 1);
  });

  it('keeps prose that arrived without a message.final', () => {
    const state = fold([
      { type: 'send', content: 'Go.', attachments: [] },
      event('step.llm', { content: 'Done.' }),
      event('run.finished', { outcome: 'completed' }),
    ]);

    assert.deepEqual(contents(state), ['Go.', 'Done.']);
  });
});

describe('tool calls', () => {
  it('pairs a result with its call and records what it wrote', () => {
    const state = fold([
      { type: 'send', content: 'Rename it.', attachments: [] },
      event('step.tool.call', { callId: 'c1', name: 'typo3_WriteTable', effect: 'non_idempotent_write', round: 1, arguments: { uid: 42 } }),
      event('step.tool.result', {
        callId: 'c1',
        name: 'typo3_WriteTable',
        preview: 'Renamed.',
        durationMs: 12.5,
        writeTarget: { table: 'pages', uid: 42, kind: 'updated' },
      }),
    ]);

    const tool = state.items.find((item) => item.kind === 'tool');
    assert.equal(tool.call.result.preview, 'Renamed.');
    assert.equal(tool.call.effect, 'non_idempotent_write');
    assert.deepEqual(state.changes, [{ table: 'pages', uid: 42, kind: 'updated', toolName: 'typo3_WriteTable' }]);
  });

  it('does not draw the same call twice when the JSON transport replays the list', () => {
    const call = { callId: 'c1', name: 'typo3_GetPage', effect: 'read_only', round: 1, arguments: {} };
    const state = fold([event('step.tool.call', call), event('step.tool.call', call)]);

    assert.equal(state.items.filter((item) => item.kind === 'tool').length, 1);
  });

  it('ignores a result for a call it never saw', () => {
    const state = fold([event('step.tool.result', { callId: 'ghost', name: 'typo3_GetPage', preview: 'x' })]);

    assert.deepEqual(state.items, []);
  });

  it('attaches a result without a call id to the newest open call of that name', () => {
    const state = fold([
      event('step.tool.call', { callId: 'c1', name: 'typo3_GetPage', round: 1 }),
      event('step.tool.result', { callId: '', name: 'typo3_GetPage', preview: 'page 1' }),
    ]);

    assert.equal(state.items[0].call.result.preview, 'page 1');
  });

  it('keeps the full multiline result sent by the server', () => {
    const tree = 'Root\n  - Child 1\n  - Child 2';
    const state = fold([
      event('step.tool.call', { callId: 'tree', name: 'typo3_GetPageTree', round: 1 }),
      event('step.tool.result', { callId: 'tree', name: 'typo3_GetPageTree', preview: 'Root - Child 1', content: tree }),
    ]);

    assert.equal(state.items[0].call.result.content, tree);
  });

  it('lists a record written twice only once', () => {
    const target = { table: 'pages', uid: 42, kind: 'updated' };
    const state = fold([
      event('step.tool.call', { callId: 'c1', name: 'typo3_WriteTable', round: 1 }),
      event('step.tool.result', { callId: 'c1', name: 'typo3_WriteTable', writeTarget: target }),
      event('step.tool.call', { callId: 'c2', name: 'typo3_WriteTable', round: 2 }),
      event('step.tool.result', { callId: 'c2', name: 'typo3_WriteTable', writeTarget: target }),
    ]);

    assert.equal(state.changes.length, 1);
  });
});

describe('pauses', () => {
  it('stops for an approval and carries the digest the decision needs', () => {
    const state = fold([
      { type: 'send', content: 'Delete it.', attachments: [] },
      event('approval.required', {
        runUuid: 'r1',
        turnDigest: 'd1',
        calls: [{ index: 0, callId: 'c1', name: 'typo3_WriteTable', arguments: { action: 'delete' } }],
      }),
    ]);

    assert.equal(state.phase, 'awaiting_approval');
    assert.equal(state.running, false);
    assert.equal(state.pendingApproval.turnDigest, 'd1');
    assert.equal(state.pendingApproval.calls[0].name, 'typo3_WriteTable');
  });

  it('refuses to draw an approval it could never answer', () => {
    const state = fold([event('approval.required', { runUuid: 'r1', calls: [] })]);

    assert.equal(state.phase, 'error');
    assert.equal(state.pendingApproval, null);
    assert.deepEqual(state.error, { code: 'approvalWithoutDigest', text: '' });
  });

  it('stops for a question, and answering starts a new run', () => {
    const asked = fold([
      { type: 'send', content: 'Rename the team page.', attachments: [] },
      event('input.required', { runUuid: 'r1', turnDigest: 'd1', question: 'Which one?', options: ['/a', '/b'] }),
    ]);

    assert.equal(asked.phase, 'awaiting_input');
    assert.equal(asked.pendingInput.question, 'Which one?');
    assert.equal(asked.pendingInput.allowFreeText, true);

    const answered = threadReducer(asked, { type: 'answer', answer: '/a' });

    assert.equal(answered.phase, 'streaming');
    assert.equal(answered.pendingInput, null);
    assert.equal(answered.items.at(-1).message.content, '/a');
  });

  it('applies the frames of the continued run once the decision is made', () => {
    const paused = fold([
      { type: 'send', content: 'Delete it.', attachments: [] },
      event('run.started', { runUuid: 'r1' }, 1),
      event('approval.required', { runUuid: 'r1', turnDigest: 'd1', calls: [{ index: 0, callId: 'c1', name: 'typo3_WriteTable' }] }, 2),
      event('run.finished', { outcome: 'awaiting_approval' }, 3),
    ]);

    // The continued run is a new stream, numbered from one again.
    const continued = fold(
      [
        { type: 'decide' },
        event('run.started', { runUuid: 'r1' }, 1),
        event('message.final', { messageUid: 9, content: 'Deleted.' }, 2),
        event('run.finished', { outcome: 'completed' }, 3),
      ],
      paused,
    );

    assert.equal(continued.phase, 'idle');
    assert.equal(continued.pendingApproval, null);
    assert.equal(continued.items.at(-1).message.content, 'Deleted.');
  });

  it('keeps a paused run paused when run.finished confirms the pause', () => {
    const state = fold([
      { type: 'send', content: 'Delete it.', attachments: [] },
      event('approval.required', { runUuid: 'r1', turnDigest: 'd1', calls: [] }),
      event('run.finished', { outcome: 'awaiting_approval' }),
    ]);

    assert.equal(state.phase, 'awaiting_approval');
    assert.equal(state.outcome, 'awaiting_approval');
  });
});

describe('endings', () => {
  it('reports a failure in the server words, and it can be dismissed', () => {
    const failed = fold([{ type: 'send', content: 'Go.', attachments: [] }, event('run.error', { message: 'The provider refused.' })]);

    assert.equal(failed.phase, 'error');
    assert.deepEqual(failed.error, { code: 'failed', text: 'The provider refused.' });
    const dismissed = threadReducer(failed, { type: 'dismiss-error' });
    assert.equal(dismissed.phase, 'idle');
    assert.equal(dismissed.error, null);
  });

  it('leaves a notice for an outcome the user did not ask for', () => {
    const state = fold([{ type: 'send', content: 'Go.', attachments: [] }, event('run.finished', { outcome: 'lease_lost' })]);

    assert.equal(state.items.at(-1).kind, 'notice');
    assert.equal(state.items.at(-1).tone, 'error');
    assert.equal(state.items.at(-1).code, 'lease_lost');
    assert.deepEqual(state.error, { code: 'lease_lost', text: '' });
    assert.equal(outcomeTone('cancelled'), 'info');
    assert.equal(outcomeTone('completed'), null);
  });

  it('records a cancel as a notice and goes idle', () => {
    const state = fold([{ type: 'send', content: 'Go.', attachments: [] }, { type: 'cancelled' }]);

    assert.equal(state.phase, 'idle');
    assert.equal(state.items.at(-1).kind, 'notice');
    assert.equal(state.items.at(-1).code, 'cancelled');
  });

  it('reports a transport failure without losing the transcript', () => {
    const state = fold([
      { type: 'send', content: 'Go.', attachments: [] },
      { type: 'transport-error', message: 'The connection was lost.', code: 'problem.offline' },
    ]);

    assert.equal(state.phase, 'error');
    assert.deepEqual(state.error, { code: 'problem.offline', text: 'The connection was lost.' });
    assert.equal(state.items.length, 1);
  });
});

describe('replay and resumption', () => {
  it('ignores a frame it has already applied', () => {
    const state = fold([
      { type: 'send', content: 'Go.', attachments: [] },
      event('step.llm', { content: 'one' }, 1),
      event('step.llm', { content: 'two' }, 2),
      event('step.llm', { content: 'two again' }, 2),
      event('step.llm', { content: 'one again' }, 1),
    ]);

    assert.equal(state.draft, 'onetwo');
    assert.equal(state.lastEventId, 2);
  });

  it('reopens a conversation in the state the server left it in', () => {
    const state = threadReducer(initialThreadState, {
      type: 'reset',
      conversation: {
        ...conversation,
        status: 'awaiting_approval',
        runUuid: 'r9',
        pendingApproval: { runUuid: 'r9', turnDigest: 'd9', calls: [{ index: 0, callId: 'c1', name: 'typo3_WriteTable', arguments: {} }] },
      },
      messages: [
        { uid: 1, sequence: 1, role: 'user', content: 'Delete it.', createdAt: 1 },
        { uid: 2, sequence: 2, role: 'assistant', content: '', createdAt: 2 },
        { uid: 3, sequence: 3, role: 'tool', content: 'ok', createdAt: 3, writeTargets: [{ table: 'pages', uid: 42, kind: 'created' }] },
      ],
    });

    assert.equal(state.phase, 'awaiting_approval');
    assert.equal(state.pendingApproval.turnDigest, 'd9');
    // Only what the user can read comes back as a message; the tool row's
    // effect is shown as a change instead.
    assert.equal(state.items.length, 1);
    assert.deepEqual(state.changes, [{ table: 'pages', uid: 42, kind: 'created', toolName: '' }]);
  });

  it('reopens a failed conversation with the reason it failed', () => {
    const state = threadReducer(initialThreadState, {
      type: 'reset',
      conversation: { ...conversation, status: 'failed', errorMessage: 'Invalid schema.' },
      messages: [],
    });

    assert.equal(state.phase, 'error');
    assert.deepEqual(state.error, { code: '', text: 'Invalid schema.' });
  });

  it('reopens the complete tree from persisted assistant calls and tool replies', () => {
    const tree = 'Root\n  - Child 1\n  - Child 2';
    const state = threadReducer(initialThreadState, {
      type: 'reset',
      conversation,
      messages: [
        { uid: 1, sequence: 1, role: 'user', content: 'Show the tree.', createdAt: 1 },
        {
          uid: 2, sequence: 2, role: 'assistant', content: '', createdAt: 2,
          toolCalls: [{ id: 'tree-call', type: 'function', function: { name: 'typo3_GetPageTree', arguments: '{"startPage":1}' } }],
        },
        { uid: 3, sequence: 3, role: 'tool', toolCallId: 'tree-call', content: tree, createdAt: 3 },
        { uid: 4, sequence: 4, role: 'assistant', content: 'Here is the tree.', createdAt: 4 },
      ],
    });

    assert.deepEqual(contents(state), ['Show the tree.', 'tool', 'Here is the tree.']);
    assert.equal(state.items[1].call.name, 'typo3_GetPageTree');
    assert.deepEqual(state.items[1].call.arguments, { startPage: 1 });
    assert.equal(state.items[1].call.result.content, tree);
    assert.equal(state.items[1].call.result.isError, null);
  });

  it('clears the previous turn when a new one starts', () => {
    const failed = fold([{ type: 'send', content: 'Go.', attachments: [] }, event('run.error', { message: 'Boom.' })]);
    const retried = threadReducer(failed, { type: 'send', content: 'Again.', attachments: [] });

    assert.equal(retried.error, null);
    assert.equal(retried.outcome, null);
    assert.equal(retried.phase, 'streaming');
    assert.equal(retried.items.length, 3);
  });
});

describe('the composer', () => {
  it('says why it cannot take a message, as a label code', () => {
    assert.deepEqual(composerState('idle', true, false), { disabled: true, reason: 'composer.unavailable' });
    assert.deepEqual(composerState('idle', false, true), { disabled: true, reason: 'composer.budget' });
    assert.deepEqual(composerState('streaming', true, true), { disabled: true, reason: 'composer.streaming' });
    assert.deepEqual(composerState('awaiting_approval', true, true), { disabled: true, reason: 'composer.awaitingApproval' });
    assert.deepEqual(composerState('awaiting_input', true, true), { disabled: true, reason: 'composer.awaitingInput' });
    assert.deepEqual(composerState('error', true, true), { disabled: false, reason: '' });
  });
});

import { beforeEach, describe, expect, it } from 'vitest';
import {
  initialThreadState,
  outcomeNotice,
  resetKeyCounter,
  threadReducer,
  type ThreadAction,
  type ThreadState,
} from '@/state/reducer';
import type { ConversationSummary, SequencedEvent } from '@/state/types';

/**
 * The reducer is the client's whole understanding of a run. Every test here is
 * a stream of frames exactly as the server sends them, so a change to the wire
 * format has to fail here before it can confuse a user.
 */

function fold(actions: ThreadAction[], from: ThreadState = initialThreadState): ThreadState {
  return actions.reduce(threadReducer, from);
}

function event(name: SequencedEvent['event'], data: Record<string, unknown> = {}, id?: number): ThreadAction {
  return { type: 'event', event: id === undefined ? { event: name, data } : { id, event: name, data } };
}

const conversation: ConversationSummary = {
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

    expect(state.phase).toBe('idle');
    expect(state.running).toBe(false);
    expect(state.draft).toBe('');
    expect(state.items.map((item) => (item.kind === 'message' ? item.message.content : item.kind))).toEqual([
      'How many redirects?',
      'There are three redirects.',
    ]);
    // run.finished carries the authoritative usage; the per-step sums are a
    // live estimate and must not be added to it.
    expect(state.usage).toEqual({ promptTokens: 10, completionTokens: 5, totalTokens: 15 });
  });

  it('keeps the draft visible while it streams', () => {
    const state = fold([
      { type: 'send', content: 'Summarise this page.', attachments: [] },
      event('step.llm', { content: 'This page ' }),
      event('step.llm', { content: 'has three elements.' }),
    ]);

    expect(state.draft).toBe('This page has three elements.');
    expect(state.phase).toBe('streaming');
  });

  it('drops a message.final with no text rather than adding an empty bubble', () => {
    const state = fold([{ type: 'send', content: 'Hm.', attachments: [] }, event('message.final', { content: '' })]);

    expect(state.items).toHaveLength(1);
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
    expect(tool?.kind === 'tool' && tool.call.result?.preview).toBe('Renamed.');
    expect(tool?.kind === 'tool' && tool.call.effect).toBe('non_idempotent_write');
    expect(state.changes).toEqual([{ table: 'pages', uid: 42, kind: 'updated', toolName: 'typo3_WriteTable' }]);
  });

  it('does not draw the same call twice when the JSON transport replays the list', () => {
    const call = { callId: 'c1', name: 'typo3_GetPage', effect: 'read_only', round: 1, arguments: {} };
    const state = fold([event('step.tool.call', call), event('step.tool.call', call)]);

    expect(state.items.filter((item) => item.kind === 'tool')).toHaveLength(1);
  });

  it('ignores a result for a call it never saw', () => {
    const state = fold([event('step.tool.result', { callId: 'ghost', name: 'typo3_GetPage', preview: 'x' })]);

    expect(state.items).toEqual([]);
  });

  it('lists a record written twice only once', () => {
    const target = { table: 'pages', uid: 42, kind: 'updated' };
    const state = fold([
      event('step.tool.call', { callId: 'c1', name: 'typo3_WriteTable', round: 1 }),
      event('step.tool.result', { callId: 'c1', name: 'typo3_WriteTable', writeTarget: target }),
      event('step.tool.call', { callId: 'c2', name: 'typo3_WriteTable', round: 2 }),
      event('step.tool.result', { callId: 'c2', name: 'typo3_WriteTable', writeTarget: target }),
    ]);

    expect(state.changes).toHaveLength(1);
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

    expect(state.phase).toBe('awaiting_approval');
    expect(state.running).toBe(false);
    expect(state.pendingApproval?.turnDigest).toBe('d1');
    expect(state.pendingApproval?.calls[0]?.name).toBe('typo3_WriteTable');
  });

  it('refuses to draw an approval it could never answer', () => {
    const state = fold([event('approval.required', { runUuid: 'r1', calls: [] })]);

    expect(state.phase).toBe('error');
    expect(state.pendingApproval).toBeNull();
    expect(state.error).toContain('digest');
  });

  it('stops for a question, and answering starts a new run', () => {
    const asked = fold([
      { type: 'send', content: 'Rename the team page.', attachments: [] },
      event('input.required', { runUuid: 'r1', turnDigest: 'd1', question: 'Which one?', options: ['/a', '/b'] }),
    ]);

    expect(asked.phase).toBe('awaiting_input');
    expect(asked.pendingInput?.question).toBe('Which one?');
    expect(asked.pendingInput?.allowFreeText).toBe(true);

    const answered = threadReducer(asked, { type: 'answer', answer: '/a' });

    expect(answered.phase).toBe('streaming');
    expect(answered.pendingInput).toBeNull();
    expect(answered.items.at(-1)).toMatchObject({ kind: 'message', message: { content: '/a' } });
  });
});

describe('endings', () => {
  it('reports a failure as an error the user can dismiss', () => {
    const failed = fold([{ type: 'send', content: 'Go.', attachments: [] }, event('run.error', { message: 'The provider refused.' })]);

    expect(failed.phase).toBe('error');
    expect(failed.error).toBe('The provider refused.');
    expect(threadReducer(failed, { type: 'dismiss-error' })).toMatchObject({ phase: 'idle', error: null });
  });

  it('leaves a notice for an outcome the user did not ask for', () => {
    const state = fold([{ type: 'send', content: 'Go.', attachments: [] }, event('run.finished', { outcome: 'lease_lost' })]);

    expect(state.items.at(-1)).toMatchObject({ kind: 'notice', tone: 'error' });
    expect(outcomeNotice('cancelled')).toEqual({ tone: 'info', text: 'Cancelled.' });
    expect(outcomeNotice('completed')).toBeNull();
  });

  it('records a cancel as a notice and goes idle', () => {
    const state = fold([{ type: 'send', content: 'Go.', attachments: [] }, { type: 'cancelled' }]);

    expect(state.phase).toBe('idle');
    expect(state.items.at(-1)).toMatchObject({ kind: 'notice', text: 'Cancelled.' });
  });

  it('reports a transport failure without losing the transcript', () => {
    const state = fold([
      { type: 'send', content: 'Go.', attachments: [] },
      { type: 'transport-error', message: 'The connection was lost.' },
    ]);

    expect(state.phase).toBe('error');
    expect(state.items).toHaveLength(1);
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

    expect(state.draft).toBe('onetwo');
    expect(state.lastEventId).toBe(2);
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

    expect(state.phase).toBe('awaiting_approval');
    expect(state.pendingApproval?.turnDigest).toBe('d9');
    // Only what the user can read comes back as a bubble; the tool row's
    // effect is shown as a change instead.
    expect(state.items).toHaveLength(1);
    expect(state.changes).toEqual([{ table: 'pages', uid: 42, kind: 'created', toolName: '' }]);
  });

  it('clears the previous turn when a new one starts', () => {
    const failed = fold([{ type: 'send', content: 'Go.', attachments: [] }, event('run.error', { message: 'Boom.' })]);
    const retried = threadReducer(failed, { type: 'send', content: 'Again.', attachments: [] });

    expect(retried.error).toBeNull();
    expect(retried.outcome).toBeNull();
    expect(retried.phase).toBe('streaming');
    expect(retried.items).toHaveLength(3);
  });
});

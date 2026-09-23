import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import { SseParser, readEventStream, toTurnEvent } from '../../Resources/Public/JavaScript/chat/sse-parser.js';

describe('SseParser', () => {
  it('yields nothing until a frame is terminated by a blank line', () => {
    const parser = new SseParser();

    assert.deepEqual(parser.push('event: step.llm\ndata: {"round":1}'), []);
    assert.deepEqual(parser.push('\n\n'), [{ event: 'step.llm', data: '{"round":1}' }]);
  });

  it('reassembles a frame split anywhere, including inside a field name', () => {
    const parser = new SseParser();
    const frame = 'event: message.final\ndata: {"content":"Done."}\n\n';

    const frames = frame.split('').flatMap((character) => parser.push(character));

    assert.deepEqual(frames, [{ event: 'message.final', data: '{"content":"Done."}' }]);
  });

  it('accepts CRLF, and waits for the LF of a CR that arrived alone', () => {
    const parser = new SseParser();

    assert.deepEqual(parser.push('event: ping\r'), []);
    assert.deepEqual(parser.push('\ndata: {}\r\n\r\n'), [{ event: 'ping', data: '{}' }]);
  });

  it('treats a trailing CR as a line ending once the body has ended', () => {
    const parser = new SseParser();

    assert.deepEqual(parser.push('event: ping\rdata: {}\r\r', true), [{ event: 'ping', data: '{}' }]);
  });

  it('joins repeated data lines with newlines and ignores comments', () => {
    const parser = new SseParser();

    const [frame] = parser.push(': keep-alive\nevent: run.error\ndata: line one\ndata: line two\n\n');

    assert.deepEqual(frame, { event: 'run.error', data: 'line one\nline two' });
  });

  it('remembers the last id for a caller that wants to resume', () => {
    const parser = new SseParser();

    const frames = parser.push('id: 7\nevent: ping\ndata: {}\n\nid: 8\nevent: ping\ndata: {}\n\n');

    assert.deepEqual(frames.map((frame) => frame.id), [7, 8]);
    assert.equal(parser.lastId, 8);
  });

  it('drops a frame with no event name, because the client dispatches on it', () => {
    assert.deepEqual(new SseParser().push('data: {"orphan":true}\n\n'), []);
  });
});

describe('toTurnEvent', () => {
  it('passes through an event the client knows', () => {
    assert.deepEqual(toTurnEvent({ event: 'run.finished', data: '{"outcome":"completed"}', id: 3 }), {
      id: 3,
      event: 'run.finished',
      data: { outcome: 'completed' },
    });
  });

  it('treats an empty payload as an empty object', () => {
    assert.deepEqual(toTurnEvent({ event: 'ping', data: '' }), { event: 'ping', data: {} });
  });

  it('drops an unknown event name and unparseable JSON rather than ending the run', () => {
    assert.equal(toTurnEvent({ event: 'step.telepathy', data: '{}' }), null);
    assert.equal(toTurnEvent({ event: 'step.llm', data: '{oops' }), null);
  });
});

describe('readEventStream', () => {
  /** @param {...string} chunks */
  function bodyOf(...chunks) {
    const encoder = new TextEncoder();

    return new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    });
  }

  it('reports every frame in order and survives a multi-byte character split across reads', async () => {
    const bytes = new TextEncoder().encode('event: message.final\ndata: {"content":"Fertig – ü"}\n\n');
    const split = 44;
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(bytes.slice(0, split));
        controller.enqueue(bytes.slice(split));
        controller.close();
      },
    });

    const seen = [];
    await readEventStream(body, (event) => seen.push(event));

    assert.deepEqual(seen, [{ event: 'message.final', data: { content: 'Fertig – ü' } }]);
  });

  it('reads a run to its end', async () => {
    const seen = [];

    await readEventStream(
      bodyOf('event: run.started\ndata: {"runUuid":"r1"}\n\n', 'event: run.finished\ndata: {"outcome":"completed"}\n\n'),
      (event) => seen.push(event),
    );

    assert.deepEqual(seen.map((event) => event.event), ['run.started', 'run.finished']);
  });

  it('cancels the body when the caller aborts', async () => {
    const controller = new AbortController();
    const cancel = mock.fn();
    // Deliberately never closed: a stream that ends on its own would prove
    // nothing about the abort.
    const body = new ReadableStream({
      start(streamController) {
        streamController.enqueue(new TextEncoder().encode('event: ping\ndata: {}\n\n'));
      },
      cancel,
    });

    const reading = readEventStream(body, () => undefined, controller.signal);
    await Promise.resolve();
    controller.abort();
    await reading;

    assert.equal(cancel.mock.callCount(), 1);
  });
});

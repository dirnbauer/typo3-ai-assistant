import { describe, expect, it, vi } from 'vitest';
import { SseParser, readEventStream, toSequencedEvent } from '@/lib/sse';
import type { SequencedEvent } from '@/state/types';

describe('SseParser', () => {
  it('yields nothing until a frame is terminated by a blank line', () => {
    const parser = new SseParser();

    expect(parser.push('event: step.llm\ndata: {"round":1}')).toEqual([]);
    expect(parser.push('\n\n')).toEqual([{ event: 'step.llm', data: '{"round":1}' }]);
  });

  it('reassembles a frame split anywhere, including inside a field name', () => {
    const parser = new SseParser();
    const frame = 'event: message.final\ndata: {"content":"Done."}\n\n';

    const frames = frame.split('').flatMap((character) => parser.push(character));

    expect(frames).toEqual([{ event: 'message.final', data: '{"content":"Done."}' }]);
  });

  it('accepts CRLF, and waits for the LF of a CR that arrived alone', () => {
    const parser = new SseParser();

    expect(parser.push('event: ping\r')).toEqual([]);
    expect(parser.push('\ndata: {}\r\n\r\n')).toEqual([{ event: 'ping', data: '{}' }]);
  });

  it('treats a trailing CR as a line ending once the body has ended', () => {
    const parser = new SseParser();

    expect(parser.push('event: ping\rdata: {}\r\r', true)).toEqual([{ event: 'ping', data: '{}' }]);
  });

  it('joins repeated data lines with newlines and ignores comments', () => {
    const parser = new SseParser();

    const [frame] = parser.push(': keep-alive\nevent: run.error\ndata: line one\ndata: line two\n\n');

    expect(frame).toEqual({ event: 'run.error', data: 'line one\nline two' });
  });

  it('remembers the last id for a caller that wants to resume', () => {
    const parser = new SseParser();

    const frames = parser.push('id: 7\nevent: ping\ndata: {}\n\nid: 8\nevent: ping\ndata: {}\n\n');

    expect(frames.map((frame) => frame.id)).toEqual([7, 8]);
    expect(parser.lastId).toBe(8);
  });

  it('drops a frame with no event name, because the client dispatches on it', () => {
    const parser = new SseParser();

    expect(parser.push('data: {"orphan":true}\n\n')).toEqual([]);
  });
});

describe('toSequencedEvent', () => {
  it('passes through an event the client knows', () => {
    expect(toSequencedEvent({ event: 'run.finished', data: '{"outcome":"completed"}', id: 3 })).toEqual({
      id: 3,
      event: 'run.finished',
      data: { outcome: 'completed' },
    });
  });

  it('treats an empty payload as an empty object', () => {
    expect(toSequencedEvent({ event: 'ping', data: '' })).toEqual({ event: 'ping', data: {} });
  });

  it('drops an unknown event name and unparseable JSON rather than ending the run', () => {
    expect(toSequencedEvent({ event: 'step.telepathy', data: '{}' })).toBeNull();
    expect(toSequencedEvent({ event: 'step.llm', data: '{oops' })).toBeNull();
  });
});

describe('readEventStream', () => {
  function bodyOf(...chunks: string[]): ReadableStream<Uint8Array> {
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
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.slice(0, split));
        controller.enqueue(bytes.slice(split));
        controller.close();
      },
    });

    const seen: SequencedEvent[] = [];
    await readEventStream(body, (event) => seen.push(event));

    expect(seen).toEqual([{ event: 'message.final', data: { content: 'Fertig – ü' } }]);
  });

  it('reads a run to its end', async () => {
    const seen: SequencedEvent[] = [];

    await readEventStream(
      bodyOf('event: run.started\ndata: {"runUuid":"r1"}\n\n', 'event: run.finished\ndata: {"outcome":"completed"}\n\n'),
      (event) => seen.push(event),
    );

    expect(seen.map((event) => event.event)).toEqual(['run.started', 'run.finished']);
  });

  it('cancels the body when the caller aborts', async () => {
    const controller = new AbortController();
    const cancel = vi.fn();
    // Deliberately never closed: a stream that ends on its own would prove
    // nothing about the abort.
    const body = new ReadableStream<Uint8Array>({
      start(streamController) {
        streamController.enqueue(new TextEncoder().encode('event: ping\ndata: {}\n\n'));
      },
      cancel,
    });

    const reading = readEventStream(body, () => undefined, controller.signal);
    await Promise.resolve();
    controller.abort();
    await reading;

    expect(cancel).toHaveBeenCalled();
  });
});

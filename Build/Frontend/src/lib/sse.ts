import type { SequencedEvent, TurnEvent } from '@/state/types';

/**
 * A server-sent event reader that works over POST.
 *
 * `EventSource` only issues GET, and a turn is POST because it changes state.
 * So the stream is read off `fetch`'s body, and this is the parser that turns
 * bytes back into frames. It implements the wire format rather than
 * approximating it, because the cases an approximation gets wrong only happen
 * under load: a frame split across two reads, `\r\n` rewritten by a proxy,
 * repeated `data:` lines, comments, and `id:` for resumption and dedupe.
 */

const EVENT_NAMES = new Set<TurnEvent['event']>([
  'run.started',
  'step.llm',
  'step.tool.call',
  'step.tool.result',
  'approval.required',
  'input.required',
  'message.final',
  'run.finished',
  'run.error',
  'ping',
]);

function isKnownEvent(name: string): name is TurnEvent['event'] {
  return EVENT_NAMES.has(name as TurnEvent['event']);
}

export interface Frame {
  event: string;
  data: string;
  id?: number;
}

/** The parser as a value: feed it text, take frames out. */
export class SseParser {
  private buffer = '';

  private lastEventId: number | undefined;

  /**
   * @param final true when the body has ended and nothing more can arrive
   * @returns every complete frame the added text finished, in order
   */
  push(chunk: string, final = false): Frame[] {
    this.buffer += chunk;

    // A `\r\n` can be split across two reads: a lone trailing `\r` might be
    // the first half of one, so it waits for its partner — unless the stream
    // has ended, in which case it was a line ending all along.
    this.buffer = this.buffer.replace(/\r\n/g, '\n');
    const trailingCarriageReturn = !final && this.buffer.endsWith('\r');
    const body = trailingCarriageReturn ? this.buffer.slice(0, -1) : this.buffer;
    const normalised = body.replace(/\r/g, '\n');

    const frames: Frame[] = [];
    let rest = normalised;

    for (;;) {
      const boundary = rest.indexOf('\n\n');
      if (boundary === -1) {
        break;
      }
      const frame = this.parseFrame(rest.slice(0, boundary));
      rest = rest.slice(boundary + 2);
      if (frame !== null) {
        frames.push(frame);
      }
    }

    this.buffer = rest + (trailingCarriageReturn ? '\r' : '');

    return frames;
  }

  /** The last `id:` seen, for a caller that wants to resume. */
  get lastId(): number | undefined {
    return this.lastEventId;
  }

  private parseFrame(raw: string): Frame | null {
    let event = '';
    const data: string[] = [];
    let id: number | undefined;

    for (const line of raw.split('\n')) {
      if (line === '' || line.startsWith(':')) {
        continue;
      }
      const colon = line.indexOf(':');
      const field = colon === -1 ? line : line.slice(0, colon);
      let value = colon === -1 ? '' : line.slice(colon + 1);
      if (value.startsWith(' ')) {
        value = value.slice(1);
      }

      if (field === 'event') {
        event = value;
      } else if (field === 'data') {
        data.push(value);
      } else if (field === 'id') {
        const parsed = Number.parseInt(value, 10);
        if (Number.isFinite(parsed)) {
          id = parsed;
          this.lastEventId = parsed;
        }
      }
    }

    if (event === '') {
      return null;
    }

    return id === undefined ? { event, data: data.join('\n') } : { event, data: data.join('\n'), id };
  }
}

/**
 * A frame the client understands, or nothing. An unknown event name and an
 * unparseable payload are both survivable; dropping one event beats ending the
 * run over it.
 */
export function toSequencedEvent(frame: Frame): SequencedEvent | null {
  if (!isKnownEvent(frame.event)) {
    return null;
  }

  let data: unknown = {};
  if (frame.data !== '') {
    try {
      data = JSON.parse(frame.data);
    } catch {
      return null;
    }
  }

  return frame.id === undefined ? { event: frame.event, data } : { id: frame.id, event: frame.event, data };
}

/**
 * Read a streaming response to its end, reporting every frame as it lands.
 * Throws only for a body that cannot be read at all.
 */
export async function readEventStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (event: SequencedEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const parser = new SseParser();

  const abort = () => {
    void reader.cancel().catch(() => undefined);
  };
  signal?.addEventListener('abort', abort);

  const emit = (frames: Frame[]) => {
    for (const frame of frames) {
      const event = toSequencedEvent(frame);
      if (event !== null) {
        onEvent(event);
      }
    }
  };

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // `stream: true` keeps a multi-byte character split across two reads intact.
      emit(parser.push(decoder.decode(value, { stream: true })));
    }
    emit(parser.push(decoder.decode(), true));
  } finally {
    signal?.removeEventListener('abort', abort);
    reader.releaseLock();
  }
}

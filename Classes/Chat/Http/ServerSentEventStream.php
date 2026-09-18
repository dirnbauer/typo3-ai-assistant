<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Http;

use Closure;
use RuntimeException;
use TYPO3\CMS\Core\Http\SelfEmittableStreamInterface;

/**
 * A response body that IS the turn: the producer runs while the stream is being
 * emitted, and each event reaches the browser as it happens.
 *
 * TYPO3's {@see SelfEmittableStreamInterface} exists for this. Every other
 * stream operation is unsupported on purpose — answering them with plausible
 * lies would let a middleware buffer the stream and undo the streaming.
 */
final class ServerSentEventStream implements SelfEmittableStreamInterface
{
    /**
     * @param Closure(TurnEventSink): void $producer runs the turn, emitting into the sink
     * @param (Closure(): void)|null       $onAbort  called when the client goes away
     */
    public function __construct(
        private readonly Closure $producer,
        private readonly ?Closure $onAbort = null,
    ) {}

    /**
     * `X-Accel-Buffering: no` is for nginx, which otherwise delivers every event
     * at once at the end — the failure that looks like "streaming does not work".
     *
     * @return array<string, string>
     */
    public static function headers(): array
    {
        return [
            'Content-Type' => 'text/event-stream; charset=utf-8',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ];
    }

    public function emit(): void
    {
        // PHP's own output buffers would hold the frames back just as nginx
        // would.
        while (ob_get_level() > 0) {
            ob_end_flush();
        }

        $this->produce(new TurnEventSink(
            writer: static function (SseEvent $event): void {
                echo $event->encode();
                flush();
            },
            abortCheck: static fn(): bool => connection_aborted() === 1,
            onAbort: $this->onAbort,
        ));
    }

    /**
     * The stream's contribution separated from the socket, so a test can watch
     * it through a collecting sink.
     */
    public function produce(TurnEventSink $sink): void
    {
        // An immediate ping opens the stream: until the first byte arrives, a
        // turn that thinks for ten seconds looks like a failed request.
        $sink->send(SseEvent::ping());
        ($this->producer)($sink);
    }

    public function __toString(): string
    {
        return '';
    }

    public function close(): void {}

    public function detach(): mixed
    {
        return null;
    }

    public function getSize(): ?int
    {
        return null;
    }

    public function tell(): int
    {
        return 0;
    }

    public function eof(): bool
    {
        return true;
    }

    public function isSeekable(): bool
    {
        return false;
    }

    public function seek(int $offset, int $whence = SEEK_SET): void
    {
        throw new RuntimeException('A server-sent event stream cannot be seeked.', 1795000301);
    }

    public function rewind(): void
    {
        throw new RuntimeException('A server-sent event stream cannot be rewound.', 1795000302);
    }

    public function isWritable(): bool
    {
        return false;
    }

    public function write(string $string): int
    {
        throw new RuntimeException('A server-sent event stream is written by its producer only.', 1795000303);
    }

    public function isReadable(): bool
    {
        return false;
    }

    public function read(int $length): string
    {
        throw new RuntimeException('A server-sent event stream cannot be read.', 1795000304);
    }

    public function getContents(): string
    {
        throw new RuntimeException('A server-sent event stream has no contents until it has been emitted.', 1795000305);
    }

    public function getMetadata(?string $key = null): mixed
    {
        return $key === null ? [] : null;
    }
}

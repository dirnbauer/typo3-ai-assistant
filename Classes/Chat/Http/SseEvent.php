<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Http;

/**
 * One server-sent event and the rules for putting it on the wire.
 *
 * The format is line-oriented: every line of the payload gets its own `data:`
 * prefix and the browser rejoins them, and the blank line at the end is the
 * frame delimiter — a frame without it is buffered until the next one arrives.
 */
final readonly class SseEvent
{
    /**
     * @param array<string, mixed> $payload
     */
    public function __construct(
        public string $name,
        public array $payload = [],
        public ?int $id = null,
    ) {}

    /**
     * A heartbeat. A named event rather than a comment line, because the client
     * uses it: while a tool runs it is the only proof the turn is alive.
     */
    public static function ping(): self
    {
        return new self('ping', ['at' => time()]);
    }

    public function encode(): string
    {
        return self::frame($this->name, $this->data(), $this->id);
    }

    /**
     * The encoding rule on its own, so the multi-line case — which JSON
     * escaping makes unreachable in production — stays testable.
     */
    public static function frame(string $name, string $data, ?int $id = null): string
    {
        $frame = $id !== null ? 'id: ' . $id . "\n" : '';
        $frame .= 'event: ' . $name . "\n";
        foreach (explode("\n", $data) as $line) {
            $frame .= 'data: ' . rtrim($line, "\r") . "\n";
        }

        return $frame . "\n";
    }

    private function data(): string
    {
        $json = json_encode($this->payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);

        // An unencodable payload must not take the stream down: the client can
        // render an event it does not understand, not a truncated frame.
        return $json !== false ? $json : '{}';
    }
}

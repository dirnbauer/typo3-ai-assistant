<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Api;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UploadedFileInterface;
use Webconsulting\WebconAiAssistant\Chat\Domain\Row;

/**
 * The request as the chat API reads it: one string-keyed body (a parsed form or
 * a JSON document), the query, and typed accessors that never trust a shape.
 * A body value wins over a query value of the same name.
 */
final readonly class ApiRequest
{
    /** @var array<string, mixed> */
    private array $body;

    /** @var array<string, mixed> */
    private array $query;

    public function __construct(
        public ServerRequestInterface $request,
    ) {
        $parsed = $request->getParsedBody();
        $body = is_array($parsed) && $parsed !== [] ? $parsed : json_decode((string)$request->getBody(), true);
        $this->body = is_array($body) ? Row::stringKeyed($body) : [];
        $this->query = Row::stringKeyed($request->getQueryParams());
    }

    public function has(string $key): bool
    {
        return array_key_exists($key, $this->body) || array_key_exists($key, $this->query);
    }

    public function string(string $key, string $default = ''): string
    {
        $value = $this->value($key);

        return is_string($value) ? $value : $default;
    }

    public function int(string $key, int $default = 0): int
    {
        $value = $this->value($key);

        return is_numeric($value) ? (int)$value : $default;
    }

    /**
     * A JSON boolean, or its form-encoded spellings. Null when absent.
     */
    public function bool(string $key): ?bool
    {
        $value = $this->value($key);
        if ($value === null) {
            return null;
        }

        return $value === true || $value === 1 || $value === '1' || $value === 'true';
    }

    /**
     * @return array<string, mixed>
     */
    public function object(string $key): array
    {
        $value = $this->value($key);

        return is_array($value) ? Row::stringKeyed($value) : [];
    }

    /**
     * @return list<mixed>
     */
    public function list(string $key): array
    {
        $value = $this->value($key);

        return is_array($value) ? array_values($value) : [];
    }

    public function conversationUid(): int
    {
        return $this->int('conversation');
    }

    public function wantsEventStream(): bool
    {
        return str_contains(strtolower($this->request->getHeaderLine('Accept')), 'text/event-stream');
    }

    public function uploadedFile(string $key): ?UploadedFileInterface
    {
        $file = $this->request->getUploadedFiles()[$key] ?? null;

        return $file instanceof UploadedFileInterface ? $file : null;
    }

    private function value(string $key): mixed
    {
        return $this->body[$key] ?? $this->query[$key] ?? null;
    }
}

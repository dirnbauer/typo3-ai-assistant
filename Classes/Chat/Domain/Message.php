<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Domain;

/**
 * One row of a transcript.
 *
 * The row is the whole message and nothing more: the run trace (arguments in
 * full, durations, artifacts) stays in nr-llm, joined by `run_uuid`. What IS
 * kept beyond the text is what the next turn must replay — an assistant's tool
 * calls and the tool turn answering them — plus the write targets a tool
 * reported, because those are what the conversation's "changes" view is built
 * from.
 */
final readonly class Message
{
    /**
     * Extracted document text stored on an attachment. It is part of what the
     * model saw, so it is persisted — but never sent to the client, which has
     * the file itself.
     */
    public const ATTACHMENT_TEXT_KEY = 'text';

    /**
     * @param list<array<string, mixed>>                          $toolCalls    assistant tool-call requests, in the provider wire shape
     * @param list<array<string, mixed>>                          $attachments  FAL references carried by a user message
     * @param list<array{table: string, uid: int, kind: string}>  $writeTargets records a tool turn reported having written
     */
    public function __construct(
        public int $uid,
        public int $conversation,
        public int $sequence,
        public MessageRole $role,
        public string $content,
        public array $toolCalls = [],
        public string $toolCallId = '',
        public array $attachments = [],
        public array $writeTargets = [],
        public string $runUuid = '',
        public int $promptTokens = 0,
        public int $completionTokens = 0,
        public int $crdate = 0,
    ) {}

    /**
     * @param array<string, mixed> $row
     */
    public static function fromRow(array $row): self
    {
        return new self(
            uid: Row::int($row, 'uid'),
            conversation: Row::int($row, 'conversation'),
            sequence: Row::int($row, 'sequence'),
            role: MessageRole::tryFrom(Row::string($row, 'role')) ?? MessageRole::User,
            content: Row::string($row, 'content'),
            toolCalls: Row::jsonList($row, 'tool_calls'),
            toolCallId: Row::string($row, 'tool_call_id'),
            attachments: Row::jsonList($row, 'attachments'),
            writeTargets: self::writeTargets(Row::jsonList($row, 'write_targets')),
            runUuid: Row::string($row, 'run_uuid'),
            promptTokens: Row::int($row, 'prompt_tokens'),
            completionTokens: Row::int($row, 'completion_tokens'),
            crdate: Row::int($row, 'crdate'),
        );
    }

    /**
     * The insertable row. `uid`, `sequence` and `crdate` are the repository's to
     * assign. JSON columns carry arrays: Doctrine encodes them.
     *
     * @return array<string, int|string|list<array<string, mixed>>|null>
     */
    public function toRow(): array
    {
        return [
            'pid' => 0,
            'conversation' => $this->conversation,
            'role' => $this->role->value,
            'content' => $this->content,
            'tool_calls' => $this->toolCalls === [] ? null : $this->toolCalls,
            'tool_call_id' => $this->toolCallId,
            'attachments' => $this->attachments === [] ? null : $this->attachments,
            'write_targets' => $this->writeTargets === [] ? null : $this->writeTargets,
            'run_uuid' => $this->runUuid,
            'prompt_tokens' => $this->promptTokens,
            'completion_tokens' => $this->completionTokens,
        ];
    }

    /**
     * The shape the JSON API and the SSE frames hand to the client.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $data = [
            'uid' => $this->uid,
            'sequence' => $this->sequence,
            'role' => $this->role->value,
            'content' => $this->content,
            'createdAt' => $this->crdate,
        ];

        if ($this->toolCalls !== []) {
            $data['toolCalls'] = $this->toolCalls;
        }
        if ($this->toolCallId !== '') {
            $data['toolCallId'] = $this->toolCallId;
        }
        if ($this->attachments !== []) {
            $data['attachments'] = array_map(
                static fn(array $attachment): array => array_diff_key($attachment, [self::ATTACHMENT_TEXT_KEY => true]),
                $this->attachments,
            );
        }
        if ($this->writeTargets !== []) {
            $data['writeTargets'] = $this->writeTargets;
        }
        if ($this->runUuid !== '') {
            $data['runUuid'] = $this->runUuid;
        }
        if ($this->promptTokens > 0 || $this->completionTokens > 0) {
            $data['tokens'] = ['prompt' => $this->promptTokens, 'completion' => $this->completionTokens];
        }

        return $data;
    }

    /**
     * @param list<array<string, mixed>> $raw
     *
     * @return list<array{table: string, uid: int, kind: string}>
     */
    private static function writeTargets(array $raw): array
    {
        $targets = [];
        foreach ($raw as $entry) {
            $table = Row::string($entry, 'table');
            $uid = Row::int($entry, 'uid');
            if ($table !== '' && $uid > 0) {
                $targets[] = ['table' => $table, 'uid' => $uid, 'kind' => Row::string($entry, 'kind', 'updated')];
            }
        }

        return $targets;
    }
}

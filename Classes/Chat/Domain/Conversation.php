<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Domain;

/**
 * A conversation's own state: identity, lifecycle, and whatever decision or
 * answer it is waiting for. Its messages are rows of their own; its tool trace
 * lives in nr-llm under `run_uuid`.
 *
 * Immutable on purpose. Every change is a repository call that names the
 * columns it writes, so there is no in-memory copy that can drift from the row.
 */
final readonly class Conversation
{
    /**
     * @param array<string, mixed> $pendingApproval the approval card, empty unless awaiting approval
     * @param array<string, mixed> $pendingInput    the clarifying question, empty unless awaiting input
     */
    public function __construct(
        public int $uid,
        public int $beUser,
        public string $title,
        public int $messageCount,
        public ConversationStatus $status,
        public string $runUuid,
        public array $pendingApproval,
        public array $pendingInput,
        public string $systemPrompt,
        public bool $autoApproveTools,
        public bool $archived,
        public bool $pinned,
        public string $errorMessage,
        public string $appName,
        public int $pageId,
        public int $lastMessageAt,
        public int $crdate,
    ) {}

    /**
     * @param array<string, mixed> $row
     */
    public static function fromRow(array $row): self
    {
        return new self(
            uid: Row::int($row, 'uid'),
            beUser: Row::int($row, 'be_user'),
            title: Row::string($row, 'title'),
            messageCount: Row::int($row, 'message_count'),
            status: ConversationStatus::tryFrom(Row::string($row, 'status')) ?? ConversationStatus::Idle,
            runUuid: Row::string($row, 'run_uuid'),
            pendingApproval: Row::jsonObject($row, 'pending_approval'),
            pendingInput: Row::jsonObject($row, 'pending_input'),
            systemPrompt: Row::string($row, 'system_prompt'),
            autoApproveTools: Row::bool($row, 'auto_approve_tools'),
            archived: Row::bool($row, 'archived'),
            pinned: Row::bool($row, 'pinned'),
            errorMessage: Row::string($row, 'error_message'),
            appName: Row::string($row, 'app_name'),
            pageId: Row::int($row, 'page_id'),
            lastMessageAt: Row::int($row, 'last_message_at'),
            crdate: Row::int($row, 'crdate'),
        );
    }

    /**
     * The shape the JSON API hands to the client.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'uid' => $this->uid,
            'title' => $this->title,
            'status' => $this->status->value,
            'messageCount' => $this->messageCount,
            'pinned' => $this->pinned,
            'archived' => $this->archived,
            'autoApproveTools' => $this->autoApproveTools,
            'runUuid' => $this->runUuid,
            'pendingApproval' => $this->pendingApproval,
            'pendingInput' => $this->pendingInput,
            'errorMessage' => $this->errorMessage,
            'appName' => $this->appName,
            'pageId' => $this->pageId,
            'lastMessageAt' => $this->lastMessageAt,
            'createdAt' => $this->crdate,
        ];
    }
}

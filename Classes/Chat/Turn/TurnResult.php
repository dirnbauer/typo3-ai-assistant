<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use Webconsulting\ShadcnUi\Chat\Domain\Message;

/**
 * Everything one turn produced, as the API reports it.
 */
final readonly class TurnResult
{
    /**
     * @param list<Message>                                                     $messages        the rows this turn appended
     * @param array<string, mixed>                                              $pendingApproval empty unless the run suspended for approval
     * @param array<string, mixed>                                              $pendingInput    empty unless the run asked a question
     * @param array{promptTokens: int, completionTokens: int, totalTokens: int} $usage
     */
    public function __construct(
        public string $runUuid,
        public TurnOutcome $outcome,
        public array $messages,
        public array $pendingApproval,
        public array $pendingInput,
        public array $usage,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'runUuid' => $this->runUuid,
            'outcome' => $this->outcome->outcome,
            'status' => $this->outcome->status->value,
            'message' => $this->outcome->message,
            'messages' => array_map(static fn(Message $message): array => $message->toArray(), $this->messages),
            'pendingApproval' => $this->pendingApproval,
            'pendingInput' => $this->pendingInput,
            'usage' => $this->usage,
        ];
    }
}

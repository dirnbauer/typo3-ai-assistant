<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;

/**
 * What one turn produced, in this extension's own vocabulary. The translation
 * from nr-llm's outcome enum happens once, in {@see RunOutcomeMapper}.
 */
final readonly class TurnOutcome
{
    /**
     * @param ConversationStatus $status   the state the conversation settles into
     * @param bool               $finished whether the turn is over — false means a human still owes it something
     * @param Outcome            $outcome  what the client sees on `run.finished`
     * @param string             $message  a human-readable reason, already sanitized
     * @param bool               $settles  whether THIS request may write the lifecycle at all; false when the
     *                                     run belongs to another executor
     */
    public function __construct(
        public ConversationStatus $status,
        public bool $finished,
        public Outcome $outcome,
        public string $message = '',
        public bool $settles = true,
    ) {}

    public function isFailure(): bool
    {
        return $this->status === ConversationStatus::Failed;
    }
}

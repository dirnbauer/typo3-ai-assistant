<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Webconsulting\WebconAiAssistant\Chat\ChatException;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;

/**
 * The two ways a run waits for a person, and what goes wrong when someone
 * answers a pause that is not there.
 *
 * Each refusal has its own code, because the code is what names the label the
 * user reads ({@see \Webconsulting\WebconAiAssistant\Chat\UserMessages}).
 */
enum Pause
{
    /** A write tool is waiting for approval. */
    case Approval;

    /** The model asked the user a question. */
    case Input;

    public function status(): ConversationStatus
    {
        return match ($this) {
            self::Approval => ConversationStatus::AwaitingApproval,
            self::Input => ConversationStatus::AwaitingInput,
        };
    }

    public function notWaiting(): ChatException
    {
        return match ($this) {
            self::Approval => new ChatException('This conversation is not waiting for an approval.', 1795000202),
            self::Input => new ChatException('This conversation is not waiting for an answer.', 1795000208),
        };
    }

    public function unnamedTurn(): ChatException
    {
        return match ($this) {
            self::Approval => new ChatException('An approval must name the turn it belongs to. Reload the conversation and try again.', 1795000204),
            self::Input => new ChatException('An answer must name the turn it belongs to. Reload the conversation and try again.', 1795000209),
        };
    }

    /**
     * The loser of a race: another tab decided or answered first.
     */
    public function alreadySettled(): ChatException
    {
        return match ($this) {
            self::Approval => new ChatException('This approval has already been decided.', 1795000206),
            self::Input => new ChatException('This question has already been answered.', 1795000207),
        };
    }
}

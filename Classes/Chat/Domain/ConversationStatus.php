<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Domain;

/**
 * The lifecycle of one conversation row — only the states a user can act on.
 */
enum ConversationStatus: string
{
    /** Nothing is running; the user may send a message. */
    case Idle = 'idle';

    /**
     * A turn is in flight. This IS the per-conversation lock: a second turn is
     * refused while it is set, so one transcript never has two runs writing
     * into it.
     */
    case Processing = 'processing';

    /**
     * The run stopped because the model wants to call a tool that writes. The
     * pending calls and the turn digest live in `pending_approval`.
     */
    case AwaitingApproval = 'awaiting_approval';

    /**
     * The run stopped because the model asked the user a question. The question
     * and the turn digest live in `pending_input`.
     */
    case AwaitingInput = 'awaiting_input';

    /** The last turn ended badly; `error_message` says how. */
    case Failed = 'failed';

    /**
     * Whether a new message may start a turn from this state. A suspended
     * conversation is excluded on purpose: the way forward is a decision or an
     * answer, not another message.
     */
    public function acceptsNewTurn(): bool
    {
        return $this === self::Idle || $this === self::Failed;
    }

    public function isSuspended(): bool
    {
        return $this === self::AwaitingApproval || $this === self::AwaitingInput;
    }
}

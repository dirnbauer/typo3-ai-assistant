<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

/**
 * How a turn ended, as the client reads it on `run.finished`.
 *
 * The vocabulary is this extension's own; {@see RunOutcomeMapper} is the one
 * place that translates nr-llm's outcomes into it.
 */
enum Outcome: string
{
    case Completed = 'completed';
    case AwaitingApproval = 'awaiting_approval';
    case AwaitingInput = 'awaiting_input';
    case GuardrailBlocked = 'guardrail_blocked';
    case GuardrailApprovalRequired = 'guardrail_approval_required';
    case Cancelled = 'cancelled';
    case LeaseLost = 'lease_lost';
    case Requeued = 'requeued';
    case SuspendFailed = 'suspend_failed';
    case Failed = 'failed';
}

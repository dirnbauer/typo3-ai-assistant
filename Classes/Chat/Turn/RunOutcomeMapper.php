<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use Netresearch\NrLlm\Domain\Enum\AgentRunOutcome;
use Netresearch\NrLlm\Service\Agent\AgentRunResult;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationStatus;
use Webconsulting\ShadcnUi\Chat\ErrorMessageSanitizer;

/**
 * The ONE place that names {@see AgentRunOutcome} cases.
 *
 * nr-llm says outcomes may be added in a minor release and consumers must keep
 * a default arm. The default settles the conversation as FAILED with a
 * sanitized reason — the safe direction for an outcome this version has never
 * heard of, since an idle conversation would invite the user to send another
 * message on top of it.
 */
final readonly class RunOutcomeMapper
{
    public function map(AgentRunResult $result): TurnOutcome
    {
        $raw = $result->outcome->value;

        return match ($result->outcome) {
            AgentRunOutcome::COMPLETED => new TurnOutcome(ConversationStatus::Idle, true, 'completed'),
            AgentRunOutcome::AWAITING_APPROVAL => new TurnOutcome(ConversationStatus::AwaitingApproval, false, 'awaiting_approval'),
            AgentRunOutcome::AWAITING_INPUT => new TurnOutcome(ConversationStatus::AwaitingInput, false, 'awaiting_input'),
            AgentRunOutcome::GUARDRAIL_BLOCKED => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                'guardrail_blocked',
                self::reason($result, 'A guardrail blocked this request.'),
            ),
            AgentRunOutcome::GUARDRAIL_APPROVAL_REQUIRED => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                'guardrail_approval_required',
                self::reason($result, 'A guardrail requires this request to be approved before it may run.'),
            ),
            AgentRunOutcome::CANCELLED => new TurnOutcome(ConversationStatus::Idle, true, 'cancelled', 'The turn was cancelled.'),
            // The run belongs to another executor now. This request must not
            // settle it — that would overwrite the state its owner maintains.
            AgentRunOutcome::LEASE_LOST => new TurnOutcome(ConversationStatus::Processing, false, 'lease_lost', 'This run is being executed elsewhere.', false),
            AgentRunOutcome::REQUEUED => new TurnOutcome(ConversationStatus::Processing, false, 'requeued', 'This run was queued for another attempt.', false),
            // An approval was required but could not be stored (nr-llm ADR-092):
            // fail rather than show a card that cannot be answered.
            AgentRunOutcome::SUSPEND_FAILED => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                'suspend_failed',
                self::reason($result, 'The approval for this run could not be recorded, so it was stopped.'),
            ),
            AgentRunOutcome::FAILED => new TurnOutcome(ConversationStatus::Failed, true, 'failed', self::reason($result, 'The turn failed.')),
            default => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                'failed',
                self::reason($result, sprintf('The run ended with an outcome this version does not handle (%s).', $raw)),
            ),
        };
    }

    private static function reason(AgentRunResult $result, string $fallback): string
    {
        $message = $result->error?->getMessage();

        return $message === null || trim($message) === '' ? $fallback : ErrorMessageSanitizer::sanitize($message);
    }
}

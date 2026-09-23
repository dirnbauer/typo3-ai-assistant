<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Netresearch\NrLlm\Domain\Enum\AgentRunOutcome;
use Netresearch\NrLlm\Service\Agent\AgentRunResult;
use UnhandledMatchError;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\ErrorMessageSanitizer;

/**
 * The ONE place that names {@see AgentRunOutcome} cases.
 *
 * Every case this version knows is spelled out, so the compiler and the static
 * analyser both notice when nr-llm adds one. An outcome added in a later minor
 * release lands in the catch below rather than in a silent default arm.
 */
final readonly class RunOutcomeMapper
{
    public function map(AgentRunResult $result): TurnOutcome
    {
        try {
            return self::outcomeOf($result);
        } catch (UnhandledMatchError) {
            // nr-llm may add outcomes in a minor release. FAILED is the safe
            // direction for one this version has never heard of: an idle
            // conversation would invite the user to send another message on
            // top of a turn nobody can account for.
            return new TurnOutcome(
                ConversationStatus::Failed,
                true,
                Outcome::Failed,
                self::reason($result, sprintf('The run ended with an outcome this version does not handle (%s).', $result->outcome->value)),
            );
        }
    }

    private static function outcomeOf(AgentRunResult $result): TurnOutcome
    {
        return match ($result->outcome) {
            AgentRunOutcome::COMPLETED => new TurnOutcome(ConversationStatus::Idle, true, Outcome::Completed),
            AgentRunOutcome::AWAITING_APPROVAL => new TurnOutcome(ConversationStatus::AwaitingApproval, false, Outcome::AwaitingApproval),
            AgentRunOutcome::AWAITING_INPUT => new TurnOutcome(ConversationStatus::AwaitingInput, false, Outcome::AwaitingInput),
            AgentRunOutcome::GUARDRAIL_BLOCKED => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                Outcome::GuardrailBlocked,
                self::reason($result, 'A guardrail blocked this request.'),
            ),
            AgentRunOutcome::GUARDRAIL_APPROVAL_REQUIRED => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                Outcome::GuardrailApprovalRequired,
                self::reason($result, 'A guardrail requires this request to be approved before it may run.'),
            ),
            AgentRunOutcome::CANCELLED => new TurnOutcome(ConversationStatus::Idle, true, Outcome::Cancelled, 'The turn was cancelled.'),
            // The run belongs to another executor now. This request must not
            // settle it — that would overwrite the state its owner maintains.
            AgentRunOutcome::LEASE_LOST => new TurnOutcome(ConversationStatus::Processing, false, Outcome::LeaseLost, 'This run is being executed elsewhere.', false),
            AgentRunOutcome::REQUEUED => new TurnOutcome(ConversationStatus::Processing, false, Outcome::Requeued, 'This run was queued for another attempt.', false),
            // An approval was required but could not be stored (nr-llm ADR-092):
            // fail rather than show a card that cannot be answered.
            AgentRunOutcome::SUSPEND_FAILED => new TurnOutcome(
                ConversationStatus::Failed,
                true,
                Outcome::SuspendFailed,
                self::reason($result, 'The approval for this run could not be recorded, so it was stopped.'),
            ),
            AgentRunOutcome::FAILED => new TurnOutcome(ConversationStatus::Failed, true, Outcome::Failed, self::reason($result, 'The turn failed.')),
        };
    }

    private static function reason(AgentRunResult $result, string $fallback): string
    {
        $message = $result->error?->getMessage();

        return $message === null || trim($message) === '' ? $fallback : ErrorMessageSanitizer::sanitize($message);
    }
}

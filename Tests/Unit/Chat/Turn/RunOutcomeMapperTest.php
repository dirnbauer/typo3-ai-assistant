<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Turn;

use Netresearch\NrLlm\Domain\Enum\AgentRunOutcome;
use Netresearch\NrLlm\Service\Agent\AgentRunResult;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use Throwable;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\Turn\Outcome;
use Webconsulting\WebconAiAssistant\Chat\Turn\RunOutcomeMapper;

/**
 * The mapper is the only place that names an {@see AgentRunOutcome} case, so
 * when nr-llm adds one, this test is where it must be noticed.
 */
final class RunOutcomeMapperTest extends TestCase
{
    #[Test]
    #[DataProvider('outcomes')]
    public function everyOutcomeMapsToAStateAUserCanActOn(
        AgentRunOutcome $outcome,
        ConversationStatus $expectedStatus,
        Outcome $expectedLabel,
        bool $expectedFinished,
        bool $expectedSettles,
    ): void {
        $mapped = new RunOutcomeMapper()->map(self::resultFor($outcome));

        self::assertSame($expectedStatus, $mapped->status);
        self::assertSame($expectedLabel, $mapped->outcome);
        self::assertSame($expectedFinished, $mapped->finished);
        self::assertSame($expectedSettles, $mapped->settles);
    }

    /**
     * @return iterable<string, array{0: AgentRunOutcome, 1: ConversationStatus, 2: Outcome, 3: bool, 4: bool}>
     */
    public static function outcomes(): iterable
    {
        yield 'completed' => [AgentRunOutcome::COMPLETED, ConversationStatus::Idle, Outcome::Completed, true, true];
        yield 'awaiting approval' => [AgentRunOutcome::AWAITING_APPROVAL, ConversationStatus::AwaitingApproval, Outcome::AwaitingApproval, false, true];
        yield 'awaiting input' => [AgentRunOutcome::AWAITING_INPUT, ConversationStatus::AwaitingInput, Outcome::AwaitingInput, false, true];
        yield 'guardrail blocked' => [AgentRunOutcome::GUARDRAIL_BLOCKED, ConversationStatus::Failed, Outcome::GuardrailBlocked, true, true];
        yield 'guardrail approval required' => [AgentRunOutcome::GUARDRAIL_APPROVAL_REQUIRED, ConversationStatus::Failed, Outcome::GuardrailApprovalRequired, true, true];
        yield 'suspend failed' => [AgentRunOutcome::SUSPEND_FAILED, ConversationStatus::Failed, Outcome::SuspendFailed, true, true];
        yield 'cancelled' => [AgentRunOutcome::CANCELLED, ConversationStatus::Idle, Outcome::Cancelled, true, true];
        yield 'failed' => [AgentRunOutcome::FAILED, ConversationStatus::Failed, Outcome::Failed, true, true];
        // Somebody else's executor owns these runs; this request must not settle them.
        yield 'lease lost' => [AgentRunOutcome::LEASE_LOST, ConversationStatus::Processing, Outcome::LeaseLost, false, false];
        yield 'requeued' => [AgentRunOutcome::REQUEUED, ConversationStatus::Processing, Outcome::Requeued, false, false];
    }

    #[Test]
    public function everyEnumCaseIsCoveredByThisTest(): void
    {
        $covered = array_map(static fn(array $case): AgentRunOutcome => $case[0], [...self::outcomes()]);
        $missing = array_filter(AgentRunOutcome::cases(), static fn(AgentRunOutcome $o): bool => !in_array($o, $covered, true));

        self::assertSame(
            [],
            array_map(static fn(AgentRunOutcome $o): string => $o->value, array_values($missing)),
            'nr-llm added an agent run outcome. Decide what it means for a conversation in RunOutcomeMapper.',
        );
    }

    #[Test]
    public function aFailureCarriesTheSanitizedReason(): void
    {
        $mapped = new RunOutcomeMapper()->map(self::resultFor(
            AgentRunOutcome::FAILED,
            new RuntimeException('Provider refused: Bearer sk-abcdefgh12345678 at https://api.example.com/v1'),
        ));

        self::assertStringNotContainsString('sk-abcdefgh12345678', $mapped->message);
        self::assertStringNotContainsString('api.example.com', $mapped->message);
        self::assertStringContainsString('[REDACTED]', $mapped->message);
    }

    #[Test]
    public function aFailureWithoutAnExceptionStillExplainsItself(): void
    {
        self::assertSame('The turn failed.', new RunOutcomeMapper()->map(self::resultFor(AgentRunOutcome::FAILED))->message);
    }

    private static function resultFor(AgentRunOutcome $outcome, ?Throwable $error = null): AgentRunResult
    {
        return new AgentRunResult(outcome: $outcome, runUuid: 'run-1', steps: [], error: $error);
    }
}

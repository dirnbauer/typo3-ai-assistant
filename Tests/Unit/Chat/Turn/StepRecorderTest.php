<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Turn;

use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\Enum\WriteKind;
use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Netresearch\NrLlm\Event\AfterAiRecordWrittenEvent;
use Netresearch\NrLlm\Service\Tool\ToolRegistry;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolEffectLookup;
use Webconsulting\WebconAiAssistant\Chat\Turn\StepRecorder;
use Webconsulting\WebconAiAssistant\Chat\Turn\WriteLedger;

/**
 * Deduplication and call correlation — and the write target a tool step now
 * carries onto the `step.tool.result` frame.
 */
final class StepRecorderTest extends TestCase
{
    #[Test]
    public function aStepSeenTwiceIsRecordedOnce(): void
    {
        $recorder = $this->recorder();
        $step = new RunStep(RunStep::KIND_LLM, 1, 5.0, content: 'Hello');

        $recorder->record($step);
        $recorder->recordAll([$step]);

        self::assertCount(1, $recorder->steps());
        self::assertCount(1, $recorder->drainEvents());
    }

    #[Test]
    public function aToolResultIsCorrelatedToTheCallThatRequestedItInOrder(): void
    {
        $recorder = $this->recorder();
        $recorder->record(new RunStep(RunStep::KIND_LLM, 1, 5.0, requestedToolCalls: [
            ['id' => 'call-a', 'name' => 'typo3_GetPage', 'arguments' => ['uid' => 1]],
            ['id' => 'call-b', 'name' => 'typo3_GetPage', 'arguments' => ['uid' => 2]],
        ]));
        $recorder->drainEvents();

        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 2.0, toolName: 'typo3_GetPage', toolResult: 'first'));
        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 2.0, toolName: 'typo3_GetPage', toolResult: 'second'));

        $events = $recorder->drainEvents();
        self::assertSame('call-a', $events[0][1]['callId']);
        self::assertSame('call-b', $events[1][1]['callId']);
        self::assertSame('first', $events[0][1]['preview']);
    }

    #[Test]
    public function seededCallsFromAnEarlierSegmentAreAnsweredFirst(): void
    {
        $recorder = $this->recorder();
        $recorder->seedOpenCalls(['calls' => [['callId' => 'call-resumed', 'name' => 'typo3_WriteTable']]]);

        $recorder->record(new RunStep(RunStep::KIND_TOOL, 2, 1.0, toolName: 'typo3_WriteTable', toolResult: 'done'));

        self::assertSame('call-resumed', $recorder->drainEvents()[0][1]['callId']);
    }

    #[Test]
    public function aWriteTargetTravelsOntoTheResultFrameWithItsKind(): void
    {
        $ledger = new WriteLedger();
        $ledger->record(new AfterAiRecordWrittenEvent('run-1', new RecordReference('pages', 42), WriteKind::CREATED));
        $recorder = new StepRecorder(new ToolEffectLookup(new ToolRegistry([])), $ledger);

        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 1.0, toolName: 'typo3_WriteTable', toolResult: 'ok', writeTarget: new RecordReference('pages', 42)));

        self::assertSame(['table' => 'pages', 'uid' => 42, 'kind' => 'created'], $recorder->drainEvents()[0][1]['writeTarget']);
    }

    #[Test]
    public function anUnknownRecordDefaultsToUpdated(): void
    {
        self::assertSame(WriteKind::UPDATED, new WriteLedger()->kindOf(new RecordReference('pages', 1)));
    }

    #[Test]
    public function anLlmStepWithoutContentEmitsOnlyTokens(): void
    {
        $recorder = $this->recorder();
        $recorder->record(new RunStep(RunStep::KIND_LLM, 1, 5.0, promptTokens: 11, completionTokens: 7, totalTokens: 18));

        [$name, $payload] = $recorder->drainEvents()[0];
        self::assertSame('step.llm', $name);
        self::assertArrayNotHasKey('content', $payload);
        self::assertSame(['prompt' => 11, 'completion' => 7, 'total' => 18], $payload['tokens']);
    }

    #[Test]
    public function aToolCallFrameNamesTheEffectTheRuntimeWillActOn(): void
    {
        $recorder = $this->recorder();
        $recorder->record(new RunStep(RunStep::KIND_LLM, 1, 5.0, requestedToolCalls: [['id' => 'c', 'name' => 'unknown_tool', 'arguments' => []]]));

        $events = $recorder->drainEvents();
        self::assertSame('step.tool.call', $events[1][0]);
        self::assertSame(ToolEffect::READ_ONLY->value, $events[1][1]['effect'], 'An unregistered name is not offered, so read-only is the honest default.');
    }

    private function recorder(): StepRecorder
    {
        return new StepRecorder(new ToolEffectLookup(new ToolRegistry([])), new WriteLedger());
    }
}

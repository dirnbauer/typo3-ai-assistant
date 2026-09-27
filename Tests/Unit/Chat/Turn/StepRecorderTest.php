<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Turn;

use Hn\McpServer\MCP\ToolRegistry as McpToolRegistry;
use Hn\McpServer\Service\McpToolCatalogService;
use Hn\McpServer\Service\ToolResultNormalizer;
use Mcp\Types\CallToolResult;
use Mcp\Types\TextContent;
use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\Enum\WriteKind;
use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Netresearch\NrLlm\Domain\ValueObject\ToolSpec;
use Netresearch\NrLlm\Event\AfterAiRecordWrittenEvent;
use Netresearch\NrLlm\Service\Tool\RunTrace;
use Netresearch\NrLlm\Service\Tool\ToolRegistry;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Tool\McpCatalogTool;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolEffectLookup;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolResultConverter;
use Webconsulting\WebconAiAssistant\Chat\Turn\StepRecorder;
use Webconsulting\WebconAiAssistant\Chat\Turn\WriteLedger;
use Webconsulting\WebconAiAssistant\Chat\Turn\WriteTargetResolver;

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
    public function aPageTreeResultKeepsItsLinesBeyondThePreviewAndUsesThePersistenceLimit(): void
    {
        $recorder = $this->recorder();
        $tree = "Root\n" . str_repeat("  - Child\n", 50);
        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 1.0, toolName: 'typo3_GetPageTree', toolResult: $tree));

        $payload = $recorder->drainEvents()[0][1];
        self::assertSame($tree, $payload['content']);
        self::assertLessThan(mb_strlen($tree), mb_strlen($payload['preview']));

        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 1.0, toolName: 'typo3_GetPageTree', toolResult: str_repeat('x', 20001)));
        self::assertSame(str_repeat('x', 20000) . "\u{2026} [truncated]", $recorder->drainEvents()[0][1]['content']);
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
        $recorder = $this->recorder($ledger);

        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 1.0, toolName: 'typo3_WriteTable', toolResult: 'ok', writeTarget: new RecordReference('pages', 42)));

        self::assertSame(['table' => 'pages', 'uid' => 42, 'kind' => 'created'], $recorder->drainEvents()[0][1]['writeTarget']);
    }

    /**
     * The resumed segment of an approval, streamed in as TurnRunner wires it:
     * nr-llm records the approved call's step and then, separately, the record
     * it wrote. The one result frame must already name that record, or the
     * details column stays empty after Approve.
     */
    #[Test]
    public function anApprovedWriteNamesItsRecordOnItsOneResultFrame(): void
    {
        $recorder = $this->recorder();
        $recorder->seedOpenCalls(['calls' => [['callId' => 'call-write', 'name' => 'typo3_WriteTable']]]);
        $trace = new RunTrace(onRecord: static function (RunStep $step) use ($recorder): void {
            $recorder->record($step);
        });

        $trace->recordToolResult(2, 12.5, 'typo3_WriteTable', ['action' => 'update', 'table' => 'pages', 'uid' => 1070], new ToolResultConverter()->convert(
            new ToolResultNormalizer()->normalize(new CallToolResult([new TextContent('{"action":"update","table":"pages","uid":1070}')])),
            'typo3_WriteTable',
            ToolEffect::NON_IDEMPOTENT_WRITE,
        ));

        $events = $recorder->drainEvents();
        self::assertSame([RunStep::KIND_TOOL, RunStep::KIND_WRITE], array_map(static fn(RunStep $step): string => $step->kind, $recorder->steps()));
        self::assertSame(['step.tool.result'], array_column($events, 0), 'The tool_write step adds no frame of its own.');
        self::assertSame('call-write', $events[0][1]['callId']);
        self::assertSame(['table' => 'pages', 'uid' => 1070, 'kind' => 'updated'], $events[0][1]['writeTarget']);
    }

    #[Test]
    public function aReadResultFrameClaimsNoRecord(): void
    {
        $recorder = $this->recorder();

        $recorder->record(new RunStep(RunStep::KIND_TOOL, 1, 1.0, toolName: 'typo3_GetPage', toolResult: '{"table":"pages","uid":1070}', toolIsError: false));

        self::assertArrayNotHasKey('writeTarget', $recorder->drainEvents()[0][1]);
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

    /**
     * Over a registry holding the chat's own kind of tools: one MCP write, one read.
     */
    private function recorder(?WriteLedger $ledger = null): StepRecorder
    {
        $effectLookup = new ToolEffectLookup(new ToolRegistry([
            self::catalogTool('WriteTable', ToolEffect::NON_IDEMPOTENT_WRITE),
            self::catalogTool('GetPage', ToolEffect::READ_ONLY),
        ]));

        return new StepRecorder($effectLookup, new WriteTargetResolver($effectLookup, new ToolResultConverter(), $ledger ?? new WriteLedger()));
    }

    private static function catalogTool(string $mcpName, ToolEffect $effect): McpCatalogTool
    {
        return new McpCatalogTool(
            $mcpName,
            new ToolSpec(McpCatalogTool::toolName($mcpName), 'A tool of this installation.', ['type' => 'object', 'properties' => []]),
            $effect,
            ToolDataClass::EDITOR_CONTENT,
            false,
            new McpToolCatalogService(new McpToolRegistry([]), new ToolResultNormalizer()),
            new ToolResultConverter(),
        );
    }
}

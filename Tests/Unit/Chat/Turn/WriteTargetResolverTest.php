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
use Webconsulting\WebconAiAssistant\Chat\Turn\WriteLedger;
use Webconsulting\WebconAiAssistant\Chat\Turn\WriteTargetResolver;

/**
 * Which record a tool step wrote. The steps come from nr-llm's own run trace,
 * recorded as ToolLoopService::resume() records a call — the approved write
 * the chat actually receives, not a step shaped the way a test assumes.
 */
final class WriteTargetResolverTest extends TestCase
{
    private const string UPDATE_ANSWER = '{"action":"update","table":"pages","uid":1070}';

    #[Test]
    public function anApprovedWriteNamesTheRecordItsAnswerNames(): void
    {
        $steps = self::approvedWrite(self::UPDATE_ANSWER);

        self::assertSame([RunStep::KIND_TOOL, RunStep::KIND_WRITE], array_map(static fn(RunStep $step): string => $step->kind, $steps));
        self::assertNull($steps[0]->writeTarget, 'nr-llm records the record on the tool_write step that follows, not on the tool step.');
        self::assertSame(['table' => 'pages', 'uid' => 1070, 'kind' => 'updated'], self::resolver()->describe($steps[0]));
    }

    #[Test]
    public function theKindIsTheOneNrLlmAnnouncedForTheWrite(): void
    {
        $ledger = new WriteLedger();
        $ledger->record(new AfterAiRecordWrittenEvent('run-1', new RecordReference('pages', 1071), WriteKind::CREATED));

        $steps = self::approvedWrite('{"action":"create","table":"pages","uid":1071,"pid":1}');

        self::assertSame(['table' => 'pages', 'uid' => 1071, 'kind' => 'created'], self::resolver($ledger)->describe($steps[0]));
    }

    #[Test]
    public function aReadNeverClaimsTheRecordItsAnswerNames(): void
    {
        $trace = new RunTrace();
        foreach (['typo3_GetPage', 'unknown_tool'] as $name) {
            $trace->recordToolResult(1, 1.0, $name, ['uid' => 1070], new ToolResultConverter()->convert(
                new CallToolResult([new TextContent('{"table":"pages","uid":1070,"title":"Home"}')]),
                $name,
            ));
        }

        foreach ($trace->getSteps() as $step) {
            self::assertSame(RunStep::KIND_TOOL, $step->kind);
            self::assertNull(self::resolver()->describe($step), $step->toolName . ' does not write.');
        }
    }

    #[Test]
    public function aWriteThatFailedOrWasDeniedClaimsNothing(): void
    {
        $trace = new RunTrace();
        // How resume() records a call the operator denied, and a failure whose
        // text still reads like a record.
        $trace->recordToolExecution(2, 0.0, 'typo3_WriteTable', [], 'Error: tool "typo3_WriteTable" was denied by the operator.', true);
        $trace->recordToolExecution(2, 0.0, 'typo3_WriteTable', [], self::UPDATE_ANSWER, true);

        foreach ($trace->getSteps() as $step) {
            self::assertNull(self::resolver()->describe($step));
        }
    }

    #[Test]
    public function aWriteThatAnswersInProseNamesNoRecord(): void
    {
        $steps = self::approvedWrite('Updated pages:1070.');

        self::assertCount(1, $steps, 'Without a record there is no tool_write step either.');
        self::assertNull(self::resolver()->describe($steps[0]));
    }

    #[Test]
    public function aRecordTheToolStepCarriesWinsOverItsAnswer(): void
    {
        $step = new RunStep(RunStep::KIND_TOOL, 2, 1.0, toolName: 'typo3_WriteTable', toolResult: self::UPDATE_ANSWER, toolIsError: false, writeTarget: new RecordReference('tt_content', 5));

        self::assertSame(['table' => 'tt_content', 'uid' => 5, 'kind' => 'updated'], self::resolver()->describe($step));
    }

    #[Test]
    public function onlyAToolStepIsAsked(): void
    {
        $steps = self::approvedWrite(self::UPDATE_ANSWER);

        self::assertNull(self::resolver()->describe($steps[1]), 'The tool_write step is the same change, not a second one.');
        self::assertNull(self::resolver()->describe(new RunStep(RunStep::KIND_LLM, 3, 1.0, content: self::UPDATE_ANSWER)));
    }

    /**
     * The steps an approved call leaves when its tool answers `$answer`, the
     * answer handed over as McpToolCatalogService hands it to the converter.
     *
     * @return list<RunStep>
     */
    private static function approvedWrite(string $answer): array
    {
        $result = new ToolResultConverter()->convert(
            new ToolResultNormalizer()->normalize(new CallToolResult([new TextContent($answer)])),
            'typo3_WriteTable',
            ToolEffect::NON_IDEMPOTENT_WRITE,
        );
        $trace = new RunTrace();
        $trace->recordToolResult(2, 12.5, 'typo3_WriteTable', ['action' => 'update', 'table' => 'pages', 'uid' => 1070], $result);

        return $trace->getSteps();
    }

    private static function resolver(?WriteLedger $ledger = null): WriteTargetResolver
    {
        $registry = new ToolRegistry([self::catalogTool('WriteTable', ToolEffect::NON_IDEMPOTENT_WRITE), self::catalogTool('GetPage', ToolEffect::READ_ONLY)]);

        return new WriteTargetResolver(new ToolEffectLookup($registry), new ToolResultConverter(), $ledger ?? new WriteLedger());
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

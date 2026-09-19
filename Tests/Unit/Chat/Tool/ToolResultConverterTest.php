<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Unit\Chat\Tool;

use Mcp\Types\CallToolResult;
use Mcp\Types\TextContent;
use Netresearch\NrLlm\Domain\Enum\ArtifactType;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\Enum\WriteKind;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\ShadcnUi\Chat\Tool\ToolResultConverter;

/**
 * The MCP and nr-llm result shapes differ exactly where egress matters, and
 * since 0.35 a writing tool also names the record it wrote.
 */
final class ToolResultConverterTest extends TestCase
{
    #[Test]
    public function textContentBecomesTheProviderFacingResult(): void
    {
        $result = (new ToolResultConverter())->convert(new CallToolResult([new TextContent('Page 42 is called "Home".')]), 'typo3_GetPage');

        self::assertFalse($result->isError);
        self::assertSame('Page 42 is called "Home".', $result->content);
        self::assertSame([], $result->artifacts);
        self::assertNull($result->writeTarget);
    }

    #[Test]
    public function anMcpErrorBecomesAnErrorResultWithoutArtifacts(): void
    {
        $result = (new ToolResultConverter())->convert(
            new CallToolResult([new TextContent('You may not edit page 42.')], true, null, ['table' => 'pages', 'uid' => 42]),
            'typo3_WriteTable',
            ToolEffect::NON_IDEMPOTENT_WRITE,
        );

        self::assertTrue($result->isError);
        self::assertSame([], $result->artifacts);
        self::assertNull($result->writeTarget, 'A failed write must not claim a record.');
    }

    #[Test]
    public function uniformRowsBecomeATableArtifact(): void
    {
        $result = (new ToolResultConverter())->convert(new CallToolResult(
            [new TextContent('two rows')],
            false,
            null,
            [['uid' => 1, 'title' => 'Home'], ['uid' => 2, 'title' => 'About']],
        ), 'typo3_ReadTable');

        self::assertCount(1, $result->artifacts);
        self::assertSame(ArtifactType::TABLE, $result->artifacts[0]->type);
        self::assertSame(['uid', 'title'], $result->artifacts[0]->data['columns']);
        self::assertSame([['1', 'Home'], ['2', 'About']], $result->artifacts[0]->data['rows']);
        self::assertSame('two rows', $result->content, 'The wire string is unchanged by the artifact.');
    }

    #[Test]
    public function otherStructureBecomesJson(): void
    {
        $result = (new ToolResultConverter())->convert(
            new CallToolResult([new TextContent('ok')], false, null, ['nested' => ['deep' => true]]),
            'typo3_GetPage',
        );

        self::assertSame(ArtifactType::TEXT, $result->artifacts[0]->type);
        self::assertStringContainsString('"nested"', (string)$result->artifacts[0]->data['text']);
    }

    #[Test]
    public function aWriteThatNamesItsRecordCarriesAWriteTarget(): void
    {
        $result = (new ToolResultConverter())->convert(
            new CallToolResult([new TextContent('created')], false, null, ['action' => 'create', 'table' => 'pages', 'uid' => 77]),
            'typo3_WriteTable',
            ToolEffect::NON_IDEMPOTENT_WRITE,
        );

        self::assertNotNull($result->writeTarget);
        self::assertSame('pages', $result->writeTarget->table);
        self::assertSame(77, $result->writeTarget->uid);
        self::assertSame(WriteKind::CREATED, $result->writeKind);
    }

    #[Test]
    public function anUpdateIsAnUpdateAndAReadNeverClaimsARecord(): void
    {
        $converter = new ToolResultConverter();
        $structured = ['action' => 'update', 'table' => 'tt_content', 'uid' => 5];

        $write = $converter->convert(new CallToolResult([new TextContent('ok')], false, null, $structured), 'typo3_WriteTable', ToolEffect::IDEMPOTENT_WRITE);
        $read = $converter->convert(new CallToolResult([new TextContent('ok')], false, null, $structured), 'typo3_GetPage', ToolEffect::READ_ONLY);

        self::assertSame(WriteKind::UPDATED, $write->writeKind);
        self::assertNull($read->writeTarget);
    }

    #[Test]
    public function aTableNameThatIsNotAnIdentifierYieldsNoTarget(): void
    {
        $result = (new ToolResultConverter())->convert(
            new CallToolResult([new TextContent('ok')], false, null, ['table' => "pages\n", 'uid' => 1]),
            'typo3_WriteTable',
            ToolEffect::NON_IDEMPOTENT_WRITE,
        );

        self::assertNull($result->writeTarget);
        self::assertFalse($result->isError);
    }
}

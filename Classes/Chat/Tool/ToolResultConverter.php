<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Tool;

use Mcp\Types\CallToolResult;
use Mcp\Types\TextContent;
use Netresearch\NrLlm\Domain\Enum\ArtifactType;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\Enum\WriteKind;
use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\ToolArtifact;
use Netresearch\NrLlm\Domain\ValueObject\ToolResult;
use Netresearch\NrLlm\Exception\InvalidArgumentException;

/**
 * Turns an MCP `CallToolResult` into the nr-llm `ToolResult` the loop understands.
 *
 * The two formats differ exactly where egress matters. MCP has one `content`
 * list; nr-llm splits the result: `content` crosses the provider wire,
 * `artifacts` reach the backend and the audit stream only, and `writeTarget`
 * names the record a write produced so the run trace — and this extension's
 * "changes" view — can join against it.
 *
 * - every `TextContent` joins the provider-facing text; other kinds become a
 *   short marker instead of a base64 blob the model cannot read;
 * - `isError` gives an error result, which by construction carries nothing else;
 * - `structuredContent` becomes a run-only artifact: a TABLE for uniform rows,
 *   TEXT carrying JSON otherwise;
 * - a writing tool whose structured result names `table` and `uid` gets a write
 *   target, CREATED when the action was a create, UPDATED otherwise.
 */
final readonly class ToolResultConverter
{
    /** Beyond this many rows a table view is not what an operator wants to read anyway. */
    private const int MAX_TABLE_ROWS = 200;

    public function convert(CallToolResult $result, string $toolName, ToolEffect $effect = ToolEffect::READ_ONLY): ToolResult
    {
        $text = $this->flattenContent($result);

        if ($result->isError === true) {
            return ToolResult::error($text === '' ? sprintf('Tool "%s" reported an error without a message.', $toolName) : $text);
        }

        $structured = is_array($result->structuredContent) ? $result->structuredContent : [];
        $artifact = $this->artifact($structured, $toolName);
        $converted = $artifact === null ? ToolResult::text($text) : ToolResult::text($text, $artifact);

        $target = $effect->isWrite() ? $this->writeTarget($structured) : null;

        return $target === null ? $converted : $converted->withWriteTarget($target[0], $target[1]);
    }

    private function flattenContent(CallToolResult $result): string
    {
        $parts = [];
        foreach ($result->content as $item) {
            $parts[] = $item instanceof TextContent
                ? $item->text
                : sprintf('[%s content omitted]', is_string($item->type ?? null) ? $item->type : 'non-text');
        }

        return trim(implode("\n", $parts));
    }

    /**
     * @param array<array-key, mixed> $structured
     */
    private function artifact(array $structured, string $toolName): ?ToolArtifact
    {
        if ($structured === []) {
            return null;
        }

        $table = $this->asTable($structured);
        if ($table !== null) {
            return new ToolArtifact(ArtifactType::TABLE, $toolName, $table);
        }

        $json = json_encode($structured, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);

        return new ToolArtifact(ArtifactType::TEXT, $toolName, ['text' => $json !== false ? $json : '']);
    }

    /**
     * The record a write reported. MCP's writing tools answer with
     * `{action, table, uid}`; anything that does not fit a database identifier
     * is refused by {@see RecordReference} and reported as no target.
     *
     * @param array<array-key, mixed> $structured
     *
     * @return array{0: RecordReference, 1: WriteKind}|null
     */
    private function writeTarget(array $structured): ?array
    {
        $table = $structured['table'] ?? null;
        $uid = $structured['uid'] ?? null;
        if (!is_string($table) || !is_numeric($uid)) {
            return null;
        }

        try {
            $reference = new RecordReference($table, (int)$uid);
        } catch (InvalidArgumentException) {
            return null;
        }

        $kind = ($structured['action'] ?? null) === 'create' ? WriteKind::CREATED : WriteKind::UPDATED;

        return [$reference, $kind];
    }

    /**
     * A list of associative rows sharing the same keys renders as a table.
     *
     * @param array<array-key, mixed> $structured
     *
     * @return array{columns: list<string>, rows: list<list<string>>}|null
     */
    private function asTable(array $structured): ?array
    {
        if (!array_is_list($structured) || count($structured) > self::MAX_TABLE_ROWS) {
            return null;
        }

        $columns = null;
        $rows = [];
        foreach ($structured as $row) {
            if (!is_array($row) || $row === [] || array_is_list($row)) {
                return null;
            }

            $keys = array_map(strval(...), array_keys($row));
            if ($columns === null) {
                $columns = $keys;
            } elseif ($columns !== $keys) {
                return null;
            }

            $rows[] = array_map($this->scalarise(...), array_values($row));
        }

        return $columns === null || $columns === [] ? null : ['columns' => $columns, 'rows' => $rows];
    }

    private function scalarise(mixed $value): string
    {
        if (is_string($value)) {
            return $value;
        }
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }
        if (is_int($value) || is_float($value)) {
            return (string)$value;
        }
        if ($value === null) {
            return '';
        }

        $json = json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);

        return $json !== false ? $json : '';
    }
}

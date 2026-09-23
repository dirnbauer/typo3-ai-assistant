<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Tool;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolSchema;

/**
 * One tool whose parameters a provider refuses fails the whole request, so the
 * top level of every schema handed over has to be one providers accept.
 */
final class ToolSchemaTest extends TestCase
{
    #[Test]
    public function aOneOfOfRequiredListsBecomesASentenceForTheModel(): void
    {
        // GetPage, as the MCP server describes it.
        $projection = ToolSchema::forProvider([
            'type' => 'object',
            'properties' => [
                'uid' => ['type' => 'integer'],
                'pageId' => ['type' => 'integer'],
                'url' => ['type' => 'string'],
            ],
            'oneOf' => [['required' => ['uid']], ['required' => ['pageId']], ['required' => ['url']]],
        ]);

        self::assertArrayNotHasKey('oneOf', $projection['parameters']);
        self::assertSame(['uid', 'pageId', 'url'], array_keys(self::properties($projection['parameters'])));
        self::assertSame('Provide exactly one of: uid, pageId, url.', $projection['hint']);
    }

    #[Test]
    public function anAnyOfSaysAtLeastOneAndKeepsCombinedAlternativesTogether(): void
    {
        $projection = ToolSchema::forProvider([
            'type' => 'object',
            'properties' => ['table' => ['type' => 'string'], 'uid' => ['type' => 'integer'], 'query' => ['type' => 'string']],
            'anyOf' => [['required' => ['table', 'uid']], ['required' => ['query']]],
        ]);

        self::assertArrayNotHasKey('anyOf', $projection['parameters']);
        self::assertSame('Provide at least one of: table + uid, query.', $projection['hint']);
    }

    #[Test]
    public function anAllOfOfRequiredListsIsMergedIntoRequired(): void
    {
        $projection = ToolSchema::forProvider([
            'type' => 'object',
            'properties' => ['a' => ['type' => 'string'], 'b' => ['type' => 'string']],
            'required' => ['a'],
            'allOf' => [['required' => ['b']], ['required' => ['a']]],
        ]);

        self::assertSame(['a', 'b'], $projection['parameters']['required'] ?? null);
        self::assertArrayNotHasKey('allOf', $projection['parameters']);
        self::assertSame('', $projection['hint']);
    }

    #[Test]
    public function everyOtherTopLevelKeywordAProviderRefusesIsDropped(): void
    {
        $projection = ToolSchema::forProvider([
            '$schema' => 'https://json-schema.org/draft/2020-12/schema',
            'title' => 'Anything',
            'type' => 'object',
            'properties' => ['mode' => ['type' => 'string']],
            'not' => ['required' => ['forbidden']],
            'enum' => [['mode' => 'a']],
            'const' => ['mode' => 'a'],
            // A oneOf that says more than "which fields" cannot become a sentence.
            'oneOf' => [['required' => ['mode'], 'properties' => ['mode' => ['const' => 'a']]]],
            'additionalProperties' => false,
        ]);

        self::assertSame(['type', 'properties', 'additionalProperties'], array_keys($projection['parameters']));
        self::assertSame('', $projection['hint']);
    }

    #[Test]
    public function nestedCombinatorsAreProvidersBusinessAndStay(): void
    {
        $property = ['oneOf' => [['type' => 'integer'], ['type' => 'string']]];

        $projection = ToolSchema::forProvider(['type' => 'object', 'properties' => ['id' => $property]]);

        self::assertSame($property, self::properties($projection['parameters'])['id'] ?? null);
    }

    #[Test]
    public function aSchemaThatSaysNothingIsStillAnObject(): void
    {
        self::assertSame(
            ['parameters' => ['type' => 'object', 'properties' => []], 'hint' => ''],
            ToolSchema::forProvider(['type' => 'array', 'properties' => 'none']),
        );
    }

    /**
     * @param array<string, mixed> $parameters
     *
     * @return array<array-key, mixed>
     */
    private static function properties(array $parameters): array
    {
        $properties = $parameters['properties'] ?? [];
        self::assertIsArray($properties);

        return $properties;
    }
}

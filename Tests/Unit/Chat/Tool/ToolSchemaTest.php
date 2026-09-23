<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Tool;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolSchema;

/**
 * One tool a provider refuses fails the whole request, so every tool definition
 * handed over has to be one providers accept.
 */
final class ToolSchemaTest extends TestCase
{
    #[Test]
    public function aOneOfOfRequiredListsBecomesASentenceForTheModel(): void
    {
        // GetPage, as the MCP server describes it.
        $definition = ToolSchema::forProvider('Get a page.', [
            'type' => 'object',
            'properties' => [
                'uid' => ['type' => 'integer'],
                'pageId' => ['type' => 'integer'],
                'url' => ['type' => 'string'],
            ],
            'oneOf' => [['required' => ['uid']], ['required' => ['pageId']], ['required' => ['url']]],
        ]);

        self::assertArrayNotHasKey('oneOf', $definition['parameters']);
        self::assertSame(['uid', 'pageId', 'url'], array_keys(self::properties($definition['parameters'])));
        self::assertSame('Get a page. Provide exactly one of: uid, pageId, url.', $definition['description']);
    }

    #[Test]
    public function anAnyOfSaysAtLeastOneAndKeepsCombinedAlternativesTogether(): void
    {
        $definition = ToolSchema::forProvider('Find records.', [
            'type' => 'object',
            'properties' => ['table' => ['type' => 'string'], 'uid' => ['type' => 'integer'], 'query' => ['type' => 'string']],
            'anyOf' => [['required' => ['table', 'uid']], ['required' => ['query']]],
        ]);

        self::assertArrayNotHasKey('anyOf', $definition['parameters']);
        self::assertSame('Find records. Provide at least one of: table + uid, query.', $definition['description']);
    }

    #[Test]
    public function anAllOfOfRequiredListsIsMergedIntoRequired(): void
    {
        $definition = ToolSchema::forProvider('Two fields.', [
            'type' => 'object',
            'properties' => ['a' => ['type' => 'string'], 'b' => ['type' => 'string']],
            'required' => ['a'],
            'allOf' => [['required' => ['b']], ['required' => ['a']]],
        ]);

        self::assertSame(['a', 'b'], $definition['parameters']['required'] ?? null);
        self::assertArrayNotHasKey('allOf', $definition['parameters']);
        self::assertSame('Two fields.', $definition['description']);
    }

    #[Test]
    public function everyOtherTopLevelKeywordAProviderRefusesIsDropped(): void
    {
        $definition = ToolSchema::forProvider('Anything.', [
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

        self::assertSame(['type', 'properties', 'additionalProperties'], array_keys($definition['parameters']));
        self::assertSame('Anything.', $definition['description']);
    }

    #[Test]
    public function nestedCombinatorsAreProvidersBusinessAndStay(): void
    {
        $property = ['oneOf' => [['type' => 'integer'], ['type' => 'string']]];

        $definition = ToolSchema::forProvider('Nested.', ['type' => 'object', 'properties' => ['id' => $property]]);

        self::assertSame($property, self::properties($definition['parameters'])['id'] ?? null);
    }

    #[Test]
    public function aSchemaThatSaysNothingIsStillAnObject(): void
    {
        self::assertSame(
            ['description' => 'Nothing.', 'parameters' => ['type' => 'object', 'properties' => []]],
            ToolSchema::forProvider('  Nothing.  ', ['type' => 'array', 'properties' => 'none']),
        );
    }

    #[Test]
    public function aDescriptionTooLongForOpenAiMovesItsRestIntoTheParameters(): void
    {
        // WriteTable's description is nearly twice the limit, and what comes
        // last — how inline relations are replaced — matters most.
        $sentences = [];
        for ($i = 1; $i <= 40; ++$i) {
            $sentences[] = sprintf('Sentence number %02d explains one more rule of this tool.', $i);
        }
        $description = implode(' ', $sentences);

        $definition = ToolSchema::forProvider($description, ['type' => 'object', 'properties' => ['uid' => ['type' => 'integer']]]);

        self::assertLessThanOrEqual(ToolSchema::MAX_DESCRIPTION_LENGTH, mb_strlen($definition['description']));
        self::assertStringEndsWith('(continued in the parameters description)', $definition['description']);
        self::assertStringStartsWith('Sentence number 01', $definition['description']);

        $rest = $definition['parameters']['description'] ?? null;
        self::assertIsString($rest);
        self::assertStringStartsWith('Sentence number', $rest, 'The cut falls between two sentences.');
        self::assertStringEndsWith('Sentence number 40 explains one more rule of this tool.', $rest);

        $kept = mb_substr($definition['description'], 0, -mb_strlen(' (continued in the parameters description)'));
        self::assertSame($description, $kept . ' ' . $rest, 'Nothing is lost between the two halves.');
    }

    #[Test]
    public function aDescriptionWithinTheLimitIsLeftAlone(): void
    {
        $description = str_repeat('x', ToolSchema::MAX_DESCRIPTION_LENGTH);

        $definition = ToolSchema::forProvider($description, ['type' => 'object', 'properties' => []]);

        self::assertSame($description, $definition['description']);
        self::assertArrayNotHasKey('description', $definition['parameters']);
    }

    #[Test]
    public function aDescriptionWithoutSentencesIsCutHard(): void
    {
        $definition = ToolSchema::forProvider(str_repeat('ü', 3000), ['type' => 'object', 'properties' => []]);

        self::assertSame(ToolSchema::MAX_DESCRIPTION_LENGTH, mb_strlen($definition['description']));
        self::assertSame(3000, mb_strlen($definition['description']) - mb_strlen(' (continued in the parameters description)') + mb_strlen((string)($definition['parameters']['description'] ?? '')));
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

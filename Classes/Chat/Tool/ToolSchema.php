<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Tool;

use Webconsulting\WebconAiAssistant\Chat\Domain\Row;

/**
 * The tool definition a provider accepts, made from the one an MCP tool
 * advertises.
 *
 * MCP allows any JSON Schema as a tool's `inputSchema` and any length of
 * description; function calling does not, and a refused tool fails the whole
 * request, not just the call. Two refusals, both seen in practice:
 *
 * - OpenAI and Anthropic refuse `oneOf`, `anyOf`, `allOf`, `not`, `enum` and
 *   `const` at the TOP level of a tool's parameters. `GetPage` ("uid, pageId
 *   or url" as a top-level `oneOf`) silenced the chat entirely. The top level
 *   is reduced to a plain object schema: an `allOf` of `required` lists is
 *   merged into `required`; a `oneOf` / `anyOf` of `required` lists becomes a
 *   sentence in the description, which is where a model reads such rules; any
 *   other top-level combinator is dropped, because the tool validates its own
 *   arguments and says so when they are wrong. Nested schemas are left as they
 *   are: inside a property, providers accept them.
 * - OpenAI refuses a description longer than 1024 characters, and the most
 *   important write tool's is nearly twice that. The description is cut at the
 *   last sentence that fits, and the rest moves into the parameter schema's own
 *   description — the model still reads it there, and nothing is lost.
 */
final class ToolSchema
{
    public const int MAX_DESCRIPTION_LENGTH = 1024;

    /**
     * The top-level keys a provider is handed. Everything else is either an
     * annotation nobody reads (`$schema`, `title`, vendor keys) or one of the
     * combinators the class comment is about.
     *
     * @var list<string>
     */
    private const array RETAINED = ['type', 'description', 'properties', 'required', 'additionalProperties'];

    /** What ends a shortened description, so the model knows there is more. */
    private const string CONTINUED = ' (continued in the parameters description)';

    /**
     * @param string               $description the tool's description
     * @param array<string, mixed> $inputSchema the tool's `inputSchema`
     *
     * @return array{description: string, parameters: array<string, mixed>}
     */
    public static function forProvider(string $description, array $inputSchema): array
    {
        $required = self::names($inputSchema['required'] ?? null);
        foreach (self::requiredAlternatives($inputSchema['allOf'] ?? null) as $names) {
            $required = [...$required, ...$names];
        }

        $hints = [];
        foreach (['oneOf' => 'exactly one of', 'anyOf' => 'at least one of'] as $keyword => $quantity) {
            $alternatives = self::requiredAlternatives($inputSchema[$keyword] ?? null);
            if ($alternatives !== []) {
                $hints[] = sprintf(
                    'Provide %s: %s.',
                    $quantity,
                    implode(', ', array_map(static fn(array $names): string => implode(' + ', $names), $alternatives)),
                );
            }
        }

        $parameters = array_intersect_key($inputSchema, array_flip(self::RETAINED));
        $parameters['type'] = 'object';
        if (!is_array($parameters['properties'] ?? null)) {
            $parameters['properties'] = [];
        }
        unset($parameters['required']);
        if ($required !== []) {
            $parameters['required'] = array_values(array_unique($required));
        }

        return self::fit(trim(implode(' ', array_filter([trim($description), ...$hints], static fn(string $part): bool => $part !== ''))), $parameters);
    }

    /**
     * @param array<string, mixed> $parameters
     *
     * @return array{description: string, parameters: array<string, mixed>}
     */
    private static function fit(string $description, array $parameters): array
    {
        if (mb_strlen($description) <= self::MAX_DESCRIPTION_LENGTH) {
            return ['description' => $description, 'parameters' => $parameters];
        }

        $room = self::MAX_DESCRIPTION_LENGTH - mb_strlen(self::CONTINUED);
        $window = mb_substr($description, 0, $room);
        $cut = 0;
        foreach (['. ', '! ', '? ', ': ', "\n"] as $boundary) {
            $position = mb_strrpos($window, $boundary);
            if ($position !== false) {
                $cut = max($cut, $position + 1);
            }
        }
        // A sentence boundary in the first half would throw away more than it
        // keeps; a hard cut at the limit is the better trade then.
        if ($cut < intdiv($room, 2)) {
            $cut = $room;
        }

        $rest = trim(mb_substr($description, $cut));
        $existing = trim(Row::string($parameters, 'description'));
        $parameters['description'] = $existing === '' ? $rest : $existing . "\n\n" . $rest;

        return [
            'description' => rtrim(mb_substr($description, 0, $cut)) . self::CONTINUED,
            'parameters' => $parameters,
        ];
    }

    /**
     * The alternatives of a combinator whose every branch is nothing but a
     * `required` list, or an empty list when it says anything else.
     *
     * @return list<list<string>>
     */
    private static function requiredAlternatives(mixed $branches): array
    {
        if (!is_array($branches) || $branches === [] || !array_is_list($branches)) {
            return [];
        }

        $alternatives = [];
        foreach ($branches as $branch) {
            $branch = is_array($branch) ? Row::stringKeyed($branch) : [];
            $names = self::names($branch['required'] ?? null);
            if ($names === [] || array_keys($branch) !== ['required']) {
                return [];
            }
            $alternatives[] = $names;
        }

        return $alternatives;
    }

    /**
     * @return list<string>
     */
    private static function names(mixed $required): array
    {
        return is_array($required) ? array_values(array_filter($required, is_string(...))) : [];
    }
}

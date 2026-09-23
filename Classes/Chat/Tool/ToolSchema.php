<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Tool;

use Webconsulting\WebconAiAssistant\Chat\Domain\Row;

/**
 * The parameter schema a provider accepts, made from the one an MCP tool
 * advertises.
 *
 * MCP allows any JSON Schema as a tool's `inputSchema`; function calling does
 * not. OpenAI and Anthropic refuse `oneOf`, `anyOf`, `allOf`, `not`, `enum` and
 * `const` at the TOP level of a tool's parameters — and a refused tool fails
 * the whole request, not just the call, so one such tool silenced the chat
 * entirely (`GetPage` says "uid, pageId or url" with a top-level `oneOf`). The
 * top level is therefore reduced to a plain object schema:
 *
 * - an `allOf` of `required` lists is merged into `required`;
 * - a `oneOf` / `anyOf` of `required` lists — "provide uid or url" — becomes one
 *   sentence for the tool description, which is where a model reads such rules;
 * - any other top-level combinator is dropped, because the tool validates its
 *   own arguments and says so when they are wrong.
 *
 * Nested schemas are left as they are: inside a property, providers accept them.
 */
final class ToolSchema
{
    /**
     * The top-level keys a provider is handed. Everything else is either an
     * annotation nobody reads (`$schema`, `title`, vendor keys) or one of the
     * combinators the class comment is about.
     *
     * @var list<string>
     */
    private const array RETAINED = ['type', 'description', 'properties', 'required', 'additionalProperties'];

    /**
     * @param array<string, mixed> $inputSchema the tool's `inputSchema`
     *
     * @return array{parameters: array<string, mixed>, hint: string}
     */
    public static function forProvider(array $inputSchema): array
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

        return ['parameters' => $parameters, 'hint' => implode(' ', $hints)];
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

<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Localization;

use TYPO3\CMS\Core\Localization\LanguageService;

/**
 * A label in the current backend user's language, or null.
 *
 * Null rather than the key when there is no language service (the CLI, a unit
 * test) or no such label, so every caller states the English it falls back to
 * and nothing reads "error.1795000601" to a person.
 */
final class Label
{
    /**
     * @param string                    $domain    a translation domain, e.g. `webcon_ai_assistant.messages`
     * @param array<string, int|string> $arguments named ICU arguments
     */
    public static function translate(string $key, string $domain, array $arguments = []): ?string
    {
        $languageService = $GLOBALS['LANG'] ?? null;
        if (!$languageService instanceof LanguageService) {
            return null;
        }

        $label = $languageService->translate($key, $domain, $arguments);
        if ($label === null) {
            return null;
        }
        $label = (string)$label;

        return $label === '' ? null : $label;
    }

    /**
     * @param array<string, int|string> $arguments named ICU arguments
     */
    public static function or(string $key, string $domain, string $fallback, array $arguments = []): string
    {
        return self::translate($key, $domain, $arguments) ?? $fallback;
    }
}

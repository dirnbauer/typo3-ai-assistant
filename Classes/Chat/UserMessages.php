<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat;

use Throwable;
use Webconsulting\WebconAiAssistant\Localization\Label;

/**
 * What a user reads when a request goes wrong, in their backend language.
 *
 * A {@see LocalizableException} names its label by its code: `error.<code>` in
 * the `webcon_ai_assistant.messages` domain, formatted with the exception's
 * named arguments. Without a label, or without a language service (the CLI, a
 * unit test), the exception's own English message is the answer — never a
 * blank.
 */
final class UserMessages
{
    public const string DOMAIN = 'webcon_ai_assistant.messages';

    public static function of(Throwable $exception): string
    {
        if (!$exception instanceof LocalizableException || $exception->getCode() <= 0) {
            return $exception->getMessage();
        }

        return self::label('error.' . $exception->getCode(), $exception->labelArguments()) ?? $exception->getMessage();
    }

    /**
     * @param array<string, int|string> $arguments named ICU arguments
     */
    public static function label(string $key, array $arguments = []): ?string
    {
        return Label::translate($key, self::DOMAIN, $arguments);
    }
}

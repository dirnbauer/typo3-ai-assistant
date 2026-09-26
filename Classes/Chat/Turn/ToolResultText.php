<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

/** The same bounded tool text is streamed to the browser and saved for replay. */
final class ToolResultText
{
    private const int MAX_LENGTH = 20000;

    public static function bounded(string $content): string
    {
        return mb_strlen($content) > self::MAX_LENGTH
            ? mb_substr($content, 0, self::MAX_LENGTH) . "\u{2026} [truncated]"
            : $content;
    }
}

<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Unit\Chat;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\ShadcnUi\Chat\ErrorMessageSanitizer;

final class ErrorMessageSanitizerTest extends TestCase
{
    #[Test]
    public function bearerTokensKeysAndUrlsAreRedacted(): void
    {
        $result = ErrorMessageSanitizer::sanitize('Bearer sk-123456 failed at https://api.openai.com/v1/chat with key-abcdefghijklm');

        self::assertStringNotContainsString('sk-123456', $result);
        self::assertStringNotContainsString('api.openai.com', $result);
        self::assertStringNotContainsString('key-abcdefghijklm', $result);
        self::assertStringContainsString('Bearer [REDACTED]', $result);
        self::assertStringContainsString('[URL]', $result);
    }

    #[Test]
    public function aShortMessagePassesThroughUnchanged(): void
    {
        self::assertSame('Connection refused', ErrorMessageSanitizer::sanitize('Connection refused'));
        self::assertSame('', ErrorMessageSanitizer::sanitize(''));
    }

    #[Test]
    public function truncationCountsCharactersNotBytesAndEndsWithAnEllipsis(): void
    {
        $result = ErrorMessageSanitizer::sanitize(str_repeat('ü', 600));

        self::assertSame(500, mb_strlen($result));
        self::assertStringEndsWith("\u{2026}", $result);
        self::assertSame(500, mb_strlen(ErrorMessageSanitizer::sanitize(str_repeat('c', 500))), 'Exactly the limit is not truncated.');
        self::assertSame(50, mb_strlen(ErrorMessageSanitizer::sanitize(str_repeat('a', 600), 50)));
    }
}

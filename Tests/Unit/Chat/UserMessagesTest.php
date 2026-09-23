<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use TYPO3\CMS\Core\Localization\LanguageService;
use Webconsulting\WebconAiAssistant\Chat\Api\ApiException;
use Webconsulting\WebconAiAssistant\Chat\ChatException;
use Webconsulting\WebconAiAssistant\Chat\UserMessages;

/**
 * What a user reads is a label in their language when there is one, and the
 * exception's own English otherwise — never a key, never a blank.
 */
final class UserMessagesTest extends TestCase
{
    protected function tearDown(): void
    {
        unset($GLOBALS['LANG']);
        parent::tearDown();
    }

    #[Test]
    public function withoutALanguageServiceTheEnglishMessageIsTheAnswer(): void
    {
        unset($GLOBALS['LANG']);

        self::assertSame('A message cannot be empty.', UserMessages::of(new ApiException('A message cannot be empty.', 400, 1795000607)));
    }

    #[Test]
    public function aLabelIsLookedUpByTheExceptionCodeWithItsNamedArguments(): void
    {
        $languageService = $this->createMock(LanguageService::class);
        $languageService->expects($this->once())
            ->method('translate')
            ->with('error.1795000608', UserMessages::DOMAIN, ['max' => 10000])
            ->willReturn('Eine Nachricht darf höchstens 10.000 Zeichen lang sein.');
        $GLOBALS['LANG'] = $languageService;

        $exception = new ApiException('A message may be at most 10000 characters long.', 400, 1795000608, ['max' => 10000]);

        self::assertSame('Eine Nachricht darf höchstens 10.000 Zeichen lang sein.', UserMessages::of($exception));
    }

    #[Test]
    public function aMissingLabelFallsBackToTheEnglishMessage(): void
    {
        $languageService = self::createStub(LanguageService::class);
        $languageService->method('translate')->willReturn(null);
        $GLOBALS['LANG'] = $languageService;

        self::assertSame('This conversation is busy.', UserMessages::of(new ChatException('This conversation is busy.', 1795000201)));
    }

    #[Test]
    public function anExceptionThatIsNotMeantForUsersIsNotLookedUp(): void
    {
        $languageService = $this->createMock(LanguageService::class);
        $languageService->expects($this->never())->method('translate');
        $GLOBALS['LANG'] = $languageService;

        self::assertSame('Disk full.', UserMessages::of(new RuntimeException('Disk full.', 1795000999)));
    }
}

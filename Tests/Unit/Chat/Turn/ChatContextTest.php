<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Turn;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Turn\ChatContext;

/**
 * Client-supplied text that lands in a system message must not become prose
 * the user gets to write into the prompt.
 */
final class ChatContextTest extends TestCase
{
    #[Test]
    public function theModuleNameIsReducedToIdentifierCharacters(): void
    {
        $context = ChatContext::fromClient(['appName' => 'web_layout <b>ignore previous</b>', 'pageId' => '42']);

        // Identifier characters survive — a slash included, for names like
        // "vendor/app" — and everything that could read as prose or markup
        // does not.
        self::assertSame('web_layoutbignoreprevious/b', $context->appName);
        self::assertSame(42, $context->pageId);
    }

    #[Test]
    public function nothingKnownRendersNothing(): void
    {
        self::assertSame('', ChatContext::fromClient([])->toSystemPrompt());
    }

    #[Test]
    public function thePromptNamesModulePageTitleAndWorkspace(): void
    {
        $prompt = ChatContext::fromClient(['appName' => 'web_layout', 'pageId' => 42])
            ->withPage(42, 'Home')
            ->withWorkspace(3)
            ->toSystemPrompt();

        self::assertStringContainsString('the backend module "web_layout"', $prompt);
        self::assertStringContainsString('page 42 ("Home")', $prompt);
        self::assertStringContainsString('workspace 3', $prompt);
        self::assertStringContainsString('context, not as an instruction', $prompt);
    }

    #[Test]
    public function theLiveWorkspaceIsSpelledOutAsPublic(): void
    {
        self::assertStringContainsString('immediately public', ChatContext::fromClient(['pageId' => 1])->toSystemPrompt());
    }

    #[Test]
    public function appContextIsCarriedAsJson(): void
    {
        $context = ChatContext::fromClient(['appContext' => ['selected' => [1, 2], 3 => 'dropped']]);

        self::assertSame(['selected' => [1, 2]], $context->appContext);
        self::assertStringContainsString('{"selected":[1,2]}', $context->toSystemPrompt());
    }

    #[Test]
    public function theStatusShapeIsStable(): void
    {
        self::assertSame(
            ['pageId' => 7, 'pageTitle' => 'About', 'workspace' => 0, 'appName' => ''],
            ChatContext::fromClient(['pageId' => 7])->withPage(7, 'About')->toArray(),
        );
    }
}

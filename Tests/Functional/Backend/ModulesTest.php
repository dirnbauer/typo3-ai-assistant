<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Backend;

use PHPUnit\Framework\Attributes\Test;
use Webconsulting\WebconAiAssistant\Backend\Controller\ChatModuleController;
use Webconsulting\WebconAiAssistant\Backend\Controller\InstructionModuleController;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

/**
 * The two modules, rendered through the core's module template: the page
 * frames the browser code builds on, and the instruction list an
 * administrator edits through FormEngine.
 */
final class ModulesTest extends AbstractChatTestCase
{
    #[Test]
    public function theChatModuleIsAModuleFrameForTheThreeElements(): void
    {
        $html = $this->render(ChatModuleController::MODULE);

        self::assertStringContainsString('<h1>AI Assistant</h1>', $html);
        self::assertStringContainsString('data-webcon-ai-assistant-workspace', $html);
        self::assertStringContainsString('<webcon-ai-assistant-conversations', $html);
        self::assertStringContainsString('<webcon-ai-assistant-chat', $html);
        self::assertStringContainsString('variant="module"', $html);
        self::assertStringContainsString('<webcon-ai-assistant-details', $html);
        self::assertStringContainsString('data-webcon-ai-assistant-action="new-conversation"', $html);
        self::assertStringContainsString('@webconsulting/ai-assistant/module.js', $html);
        self::assertStringContainsString('ai-assistant.css', $html);
        self::assertStringContainsString('record-edit-url="', $html);
        self::assertStringNotContainsString('shadcn', $html);
    }

    #[Test]
    public function aConversationInTheUrlOpensWhenItBelongsToTheUser(): void
    {
        $mine = $this->get(ConversationRepository::class)->create(self::BE_USER_UID, 'Mine', '', '', 0);

        $html = $this->render(ChatModuleController::MODULE, ['conversation' => $mine->uid]);

        self::assertStringContainsString('data-conversation="' . $mine->uid . '"', $html);
    }

    #[Test]
    public function aConversationOfSomebodyElseInTheUrlIsNotOpened(): void
    {
        $theirs = $this->get(ConversationRepository::class)->create(self::EDITOR_UID, 'Theirs', '', '', 0);

        $html = $this->render(ChatModuleController::MODULE, ['conversation' => $theirs->uid]);

        self::assertStringContainsString('data-conversation="0"', $html);
        self::assertStringNotContainsString('Theirs', $html);
    }

    #[Test]
    public function theModuleSpeaksTheBackendUsersLanguage(): void
    {
        $html = $this->render(ChatModuleController::MODULE, [], 'de');

        self::assertStringContainsString('<h1>KI-Assistent</h1>', $html);
        self::assertStringContainsString('Neue Unterhaltung', $html);
    }

    #[Test]
    public function theInstructionsModuleListsEveryRecordWithItsScopeAndItsActions(): void
    {
        $this->importCSVDataSet(__DIR__ . '/../Fixtures/instructions.csv');

        $html = $this->render(ChatModuleController::INSTRUCTIONS_MODULE);

        self::assertStringContainsString('House style', $html);
        self::assertStringContainsString('Hidden', $html, 'A switched-off instruction is listed, marked as off.');
        self::assertStringNotContainsString('This one is gone.', $html, 'A deleted one is not.');
        self::assertStringContainsString('Switched off', $html);
        self::assertStringContainsString('Everyone', $html);
        self::assertStringContainsString('t3js-modal-trigger', $html);
        self::assertMatchesRegularExpression('/edit%5Btx_webconaiassistant_instruction%5D%5B1%5D=edit/', $html);
        self::assertMatchesRegularExpression('/edit%5Btx_webconaiassistant_instruction%5D%5B0%5D=new/', $html);
    }

    #[Test]
    public function withoutInstructionsTheModuleOffersToCreateOne(): void
    {
        $html = $this->render(ChatModuleController::INSTRUCTIONS_MODULE);

        self::assertStringContainsString('No instructions yet.', $html);
        self::assertStringContainsString('Create instruction', $html);
    }

    /**
     * @param array<string, mixed> $query
     */
    private function render(string $module, array $query = [], string $language = 'default'): string
    {
        $request = $this->moduleRequest($module, $query, $language);
        $response = $module === ChatModuleController::MODULE
            ? $this->get(ChatModuleController::class)->index($request)
            : $this->get(InstructionModuleController::class)->index($request);
        self::assertSame(200, $response->getStatusCode());

        return (string)$response->getBody();
    }
}

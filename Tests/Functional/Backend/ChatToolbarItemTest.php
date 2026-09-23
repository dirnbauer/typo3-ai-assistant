<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Backend;

use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use Webconsulting\WebconAiAssistant\Backend\Controller\ChatModuleController;
use Webconsulting\WebconAiAssistant\Backend\ToolbarItem\ChatToolbarItem;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

/**
 * The toolbar item as the core renders it: an icon with a title, and a
 * dropdown that holds the chat element until someone opens it.
 */
final class ChatToolbarItemTest extends AbstractChatTestCase
{
    #[Test]
    public function theItemIsAnIconWithATitleAndABadgeForAWaitingTurn(): void
    {
        $item = $this->item();

        self::assertTrue($item->checkAccess());
        self::assertTrue($item->hasDropDown());
        self::assertSame(['class' => 'webcon-ai-assistant-toolbar-item'], $item->getAdditionalAttributes());

        $html = $item->getItem();
        self::assertStringNotContainsString('<html', $html);
        self::assertStringContainsString('toolbar-item-title', $html);
        self::assertStringContainsString('AI Assistant', $html);
        self::assertStringContainsString('data-webcon-ai-assistant-badge', $html);
    }

    #[Test]
    public function theDropDownHoldsThePanelVariantOfTheChat(): void
    {
        $html = $this->item()->getDropDown();

        self::assertStringContainsString('<webcon-ai-assistant-chat variant="panel"', $html);
        self::assertStringContainsString('record-edit-url="', $html);
        self::assertStringNotContainsString('<html', $html, 'The dropdown is a fragment of the toolbar, not a document.');
    }

    #[Test]
    public function anInstallationCanSwitchThePanelOff(): void
    {
        $this->get(ExtensionConfiguration::class)->set('webcon_ai_assistant', ['panelEnabled' => '0']);

        self::assertFalse($this->get(ChatToolbarItem::class)->checkAccess());
    }

    private function item(): ChatToolbarItem
    {
        $item = $this->get(ChatToolbarItem::class);
        $item->setRequest($this->moduleRequest(ChatModuleController::MODULE));

        return $item;
    }
}

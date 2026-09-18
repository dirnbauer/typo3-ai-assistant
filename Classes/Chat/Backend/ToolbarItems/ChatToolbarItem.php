<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Backend\ToolbarItems;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Toolbar\RequestAwareToolbarItemInterface;
use TYPO3\CMS\Backend\Toolbar\ToolbarItemInterface;
use TYPO3\CMS\Core\Page\PageRenderer;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;
use Webconsulting\ShadcnUi\Configuration\ExtensionSettings;

/**
 * The toolbar button that opens the floating chat panel.
 *
 * It loads a LAUNCHER, not the chat: a few lines that put one
 * `<shadcn-ui-shell variant="panel">` into the TOP document and import the
 * runtime on first use. A backend page that never opens the chat pays for
 * nothing, and the panel — living in the top document — survives module
 * navigation.
 */
final readonly class ChatToolbarItem implements ToolbarItemInterface, RequestAwareToolbarItemInterface
{
    /** What the launcher looks for. */
    public const TOGGLE_ATTRIBUTE = 'data-shadcn-ui-chat-toggle';

    public function __construct(
        private ExtensionSettings $settings,
        private PageRenderer $pageRenderer,
        private BackendUserContext $backendUser,
    ) {}

    public function setRequest(ServerRequestInterface $request): void
    {
        // Interface-required; this item does not read the request.
    }

    public function checkAccess(): bool
    {
        return $this->settings->panelEnabled() && $this->backendUser->isAuthenticated();
    }

    public function getItem(): string
    {
        $this->pageRenderer->loadJavaScriptModule('@webconsulting/shadcn-ui/launcher.js');

        return '<span class="toolbar-item-link shadcn-ui-chat-toolbar-btn" role="button" ' . self::TOGGLE_ATTRIBUTE . '="1"'
            . ' aria-label="Open AI Chat" aria-expanded="false" title="AI Chat" tabindex="0">'
            . '<typo3-backend-icon identifier="shadcn-ui-toolbar-chat" size="small"></typo3-backend-icon>'
            . '</span>';
    }

    public function hasDropDown(): bool
    {
        return false;
    }

    public function getDropDown(): string
    {
        return '';
    }

    /**
     * @return array<string, string>
     */
    public function getAdditionalAttributes(): array
    {
        return ['class' => 'toolbar-item shadcn-ui-chat-toolbar'];
    }

    public function getIndex(): int
    {
        return 25;
    }
}

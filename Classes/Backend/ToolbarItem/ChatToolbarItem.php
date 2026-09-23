<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Backend\ToolbarItem;

use Override;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Toolbar\RequestAwareToolbarItemInterface;
use TYPO3\CMS\Backend\Toolbar\ToolbarItemInterface;
use TYPO3\CMS\Backend\View\BackendViewFactory;
use TYPO3\CMS\Core\Page\PageRenderer;
use Webconsulting\WebconAiAssistant\Chat\Security\BackendUserContext;
use Webconsulting\WebconAiAssistant\Configuration\ExtensionSettings;

/**
 * The AI Assistant in the backend toolbar: an icon, and a dropdown holding the
 * chat.
 *
 * The toolbar lives in the top document, so the chat in its dropdown survives
 * module navigation. Its markup is one `<webcon-ai-assistant-chat
 * variant="panel">`; the element and its store are created on first open, so a
 * backend page that never opens the chat pays for one small module and nothing
 * else.
 */
final class ChatToolbarItem implements ToolbarItemInterface, RequestAwareToolbarItemInterface
{
    private const string PACKAGE = 'webconsulting/typo3-ai-assistant';

    private ?ServerRequestInterface $request = null;

    public function __construct(
        private readonly ExtensionSettings $settings,
        private readonly BackendUserContext $backendUser,
        private readonly BackendViewFactory $viewFactory,
        private readonly PageRenderer $pageRenderer,
        private readonly UriBuilder $uriBuilder,
    ) {}

    #[Override]
    public function setRequest(ServerRequestInterface $request): void
    {
        $this->request = $request;
    }

    #[Override]
    public function checkAccess(): bool
    {
        return $this->settings->panelEnabled() && $this->backendUser->isAuthenticated();
    }

    #[Override]
    public function getItem(): string
    {
        $this->pageRenderer->addCssFile('EXT:webcon_ai_assistant/Resources/Public/Css/ai-assistant.css');

        return $this->render('ToolbarItems/ChatToolbarItem');
    }

    #[Override]
    public function hasDropDown(): bool
    {
        return true;
    }

    #[Override]
    public function getDropDown(): string
    {
        return $this->render('ToolbarItems/ChatToolbarItemDropDown', [
            'recordEditUrl' => (string)$this->uriBuilder->buildUriFromRoute('record_edit'),
        ]);
    }

    /**
     * @return array<string, string>
     */
    #[Override]
    public function getAdditionalAttributes(): array
    {
        return ['class' => 'webcon-ai-assistant-toolbar-item'];
    }

    #[Override]
    public function getIndex(): int
    {
        return 25;
    }

    /**
     * Templates are looked up in this package explicitly: the request being
     * rendered is the backend's own, so the view factory would otherwise look
     * in the package that owns that route.
     *
     * @param array<string, mixed> $variables
     */
    private function render(string $template, array $variables = []): string
    {
        if ($this->request === null) {
            return '';
        }

        $view = $this->viewFactory->create($this->request, [self::PACKAGE]);
        $view->assignMultiple($variables);

        return $view->render($template);
    }
}

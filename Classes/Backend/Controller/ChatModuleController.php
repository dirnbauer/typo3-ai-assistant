<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Module\ModuleProvider;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\Components\ComponentFactory;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconSize;
use TYPO3\CMS\Core\Page\PageRenderer;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Security\BackendUserContext;
use Webconsulting\WebconAiAssistant\Localization\Label;

/**
 * Administration → AI Assistant → Chat.
 *
 * The page is a frame: the module layout, the doc header with "New
 * conversation", and three Lit elements the browser fills — the conversation
 * list, the chat, and what the conversation did. They all render one store,
 * so selecting a conversation in the list switches the chat beside it.
 */
#[AsController]
final readonly class ChatModuleController
{
    public const string MODULE = 'tools_webconaiassistant_chat';

    public const string INSTRUCTIONS_MODULE = 'tools_webconaiassistant_instructions';

    public function __construct(
        private ModuleTemplateFactory $moduleTemplateFactory,
        private ComponentFactory $componentFactory,
        private IconFactory $iconFactory,
        private UriBuilder $uriBuilder,
        private PageRenderer $pageRenderer,
        private ModuleProvider $moduleProvider,
        private ConversationRepository $conversations,
        private BackendUserContext $backendUser,
    ) {}

    public function index(ServerRequestInterface $request): ResponseInterface
    {
        // A uid in a URL is a request, not an entitlement: it only survives if it
        // resolves to a conversation this user owns.
        $requested = $request->getQueryParams()['conversation'] ?? null;
        $owned = is_numeric($requested)
            ? $this->conversations->findOneByUidAndBeUser((int)$requested, $this->backendUser->uid())
            : null;

        $title = Label::or('title', 'webcon_ai_assistant.modules.assistant', 'AI Assistant');
        $view = $this->moduleTemplateFactory->create($request);
        $view->setTitle($title, $owned->title ?? '');
        $view->makeDocHeaderModuleMenu();

        $newConversation = Label::or('module.newConversation', 'webcon_ai_assistant.chat', 'New conversation');
        $view->getDocHeaderComponent()->getButtonBar()->addButton(
            $this->componentFactory->createGenericButton()
                ->setTag('button')
                ->setLabel($newConversation)
                ->setTitle($newConversation)
                ->setShowLabelText(true)
                ->setIcon($this->iconFactory->getIcon('actions-plus', IconSize::SMALL))
                ->setAttributes(['type' => 'button', 'data-webcon-ai-assistant-action' => 'new-conversation']),
            ButtonBar::BUTTON_POSITION_LEFT,
            1,
        );
        $view->getDocHeaderComponent()->setShortcutContext(
            self::MODULE,
            $owned === null ? $title : $title . ': ' . $owned->title,
            $owned === null ? [] : ['conversation' => $owned->uid],
        );

        $this->pageRenderer->addCssFile('EXT:webcon_ai_assistant/Resources/Public/Css/ai-assistant.css');
        $this->pageRenderer->loadJavaScriptModule('@webconsulting/ai-assistant/module.js');

        $user = $this->backendUser->user();
        $view->assignMultiple([
            'title' => $title,
            'conversation' => $owned->uid ?? 0,
            'recordEditUrl' => (string)$this->uriBuilder->buildUriFromRoute('record_edit'),
            'instructionsUrl' => $user !== null && $this->moduleProvider->accessGranted(self::INSTRUCTIONS_MODULE, $user)
                ? (string)$this->uriBuilder->buildUriFromRoute(self::INSTRUCTIONS_MODULE)
                : '',
        ]);

        return $view->renderResponse('Chat/Index');
    }
}

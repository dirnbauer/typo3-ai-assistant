<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\Components\ComponentFactory;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconSize;
use TYPO3\CMS\Core\Page\PageRenderer;
use Webconsulting\WebconAiAssistant\Chat\Domain\InstructionRepository;
use Webconsulting\WebconAiAssistant\Localization\Label;

/**
 * Administration → AI Assistant → Instructions: the records administrators
 * write into every conversation's system prompt.
 *
 * Editing is the core's: "New" and "Edit" open FormEngine, switching a record
 * on or off and deleting it go through the DataHandler route, and the page
 * comes back here afterwards. This module only lists what exists and says what
 * each record does — the scope in particular, because an instruction scoped to
 * a group an administrator is not in never reaches the administrator's own
 * chat.
 */
#[AsController]
final readonly class InstructionModuleController
{
    private const string DOMAIN = 'webcon_ai_assistant.instructions';

    public function __construct(
        private ModuleTemplateFactory $moduleTemplateFactory,
        private ComponentFactory $componentFactory,
        private IconFactory $iconFactory,
        private UriBuilder $uriBuilder,
        private PageRenderer $pageRenderer,
        private InstructionRepository $instructions,
    ) {}

    public function index(ServerRequestInterface $request): ResponseInterface
    {
        $title = Label::or('title', 'webcon_ai_assistant.modules.instructions', 'Instructions');
        $returnUrl = (string)$this->uriBuilder->buildUriFromRoute(ChatModuleController::INSTRUCTIONS_MODULE);
        $newUrl = $this->editUrl(['edit' => [InstructionRepository::TABLE => [0 => 'new']]], $returnUrl);

        $view = $this->moduleTemplateFactory->create($request);
        $view->setTitle(Label::or('title', 'webcon_ai_assistant.modules.assistant', 'AI Assistant'), $title);
        $view->makeDocHeaderModuleMenu();
        $createLabel = Label::or('action.create', self::DOMAIN, 'Create instruction');
        $view->getDocHeaderComponent()->getButtonBar()->addButton(
            $this->componentFactory->createLinkButton()
                ->setHref($newUrl)
                ->setTitle($createLabel)
                ->setShowLabelText(true)
                ->setIcon($this->iconFactory->getIcon('actions-plus', IconSize::SMALL)),
            ButtonBar::BUTTON_POSITION_LEFT,
            1,
        );
        $view->getDocHeaderComponent()->setShortcutContext(ChatModuleController::INSTRUCTIONS_MODULE, $title);

        // The delete link asks first, through the core's modal trigger.
        $this->pageRenderer->loadJavaScriptModule('@typo3/backend/modal.js');

        $rows = [];
        foreach ($this->instructions->findAllForAdministration() as $instruction) {
            $uid = $instruction['uid'];
            $rows[] = $instruction + [
                'editUrl' => $this->editUrl(['edit' => [InstructionRepository::TABLE => [$uid => 'edit']]], $returnUrl),
                'toggleUrl' => (string)$this->uriBuilder->buildUriFromRoute('tce_db', [
                    'data' => [InstructionRepository::TABLE => [$uid => ['hidden' => $instruction['hidden'] ? 0 : 1]]],
                    'redirect' => $returnUrl,
                ]),
                'deleteUrl' => (string)$this->uriBuilder->buildUriFromRoute('tce_db', [
                    'cmd' => [InstructionRepository::TABLE => [$uid => ['delete' => 1]]],
                    'redirect' => $returnUrl,
                ]),
            ];
        }

        $view->assignMultiple([
            'title' => $title,
            'instructions' => $rows,
            'newUrl' => $newUrl,
            'recordsUrl' => (string)$this->uriBuilder->buildUriFromRoute('records', ['id' => 0]),
        ]);

        return $view->renderResponse('Instructions/Index');
    }

    /**
     * @param array<string, mixed> $parameters
     */
    private function editUrl(array $parameters, string $returnUrl): string
    {
        return (string)$this->uriBuilder->buildUriFromRoute('record_edit', $parameters + ['returnUrl' => $returnUrl]);
    }
}

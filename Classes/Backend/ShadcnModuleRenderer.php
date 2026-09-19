<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Backend;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Module\ModuleProvider;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\Components\ComponentFactory;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Backend\View\BackendViewFactory;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Messaging\FlashMessageService;
use TYPO3\CMS\Core\Page\PageRenderer;

/**
 * Renders a backend module whose body is one shadcn app inside the shell.
 *
 * The module template is assembled here rather than taken from
 * {@see \TYPO3\CMS\Backend\Template\ModuleTemplateFactory}, for one reason:
 * the factory resolves Fluid templates from the package that owns the
 * REQUESTED route, and that package is the consuming extension, not this one.
 * {@see BackendViewFactory::create()} takes additional package names for
 * exactly this situation, so the shell template is found whichever extension's
 * module is being rendered.
 */
final readonly class ShadcnModuleRenderer
{
    public const RUNTIME_MODULE = '@webconsulting/shadcn-ui/runtime.js';

    private const PACKAGE = 'webconsulting/typo3-shadcn-ui';

    public function __construct(
        private PageRenderer $pageRenderer,
        private IconFactory $iconFactory,
        private UriBuilder $uriBuilder,
        private ModuleProvider $moduleProvider,
        private FlashMessageService $flashMessageService,
        private ExtensionConfiguration $extensionConfiguration,
        private BackendViewFactory $viewFactory,
        private ComponentFactory $componentFactory,
    ) {}

    public function render(ServerRequestInterface $request, ShadcnApp $app): ResponseInterface
    {
        $this->pageRenderer->loadJavaScriptModule(self::RUNTIME_MODULE);
        $this->pageRenderer->loadJavaScriptModule($app->jsModule);

        $moduleTemplate = new ModuleTemplate(
            $this->pageRenderer,
            $this->iconFactory,
            $this->uriBuilder,
            $this->moduleProvider,
            $this->flashMessageService,
            $this->extensionConfiguration,
            $this->viewFactory->create($request, [self::PACKAGE]),
            $this->componentFactory,
            $request,
        );

        if ($app->title !== '') {
            $moduleTemplate->setTitle($app->title);
        }

        $moduleTemplate->assignMultiple([
            'app' => $app->name,
            'layout' => $app->layout->value,
            'propsId' => 'shadcn-props-' . substr(sha1($app->name), 0, 12),
            'propsJson' => self::encodeProps($app->props),
        ]);

        return $moduleTemplate->renderResponse('Backend/Shell');
    }

    /**
     * Props end up inside a `<script type="application/json">`. JSON_HEX_TAG is
     * what keeps a prop containing `</script>` from ending that element early.
     *
     * @param array<string, mixed> $props
     */
    private static function encodeProps(array $props): string
    {
        $json = json_encode(
            $props,
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE,
        );

        return $json !== false ? $json : '{}';
    }
}

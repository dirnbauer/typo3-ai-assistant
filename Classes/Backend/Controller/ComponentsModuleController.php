<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Webconsulting\ShadcnUi\Backend\ShadcnApp;
use Webconsulting\ShadcnUi\Backend\ShadcnModuleRenderer;
use Webconsulting\ShadcnUi\Backend\ShellLayout;

/**
 * The component showcase — and the reference implementation of a module built
 * on the base.
 *
 * Its app is built as an EXTERNAL app: `components-demo.js` imports React and
 * every component from the runtime instead of bundling its own, which is the
 * contract any other extension follows. If this module renders, the contract
 * holds.
 */
final readonly class ComponentsModuleController
{
    public function __construct(
        private ShadcnModuleRenderer $renderer,
    ) {}

    public function index(ServerRequestInterface $request): ResponseInterface
    {
        return $this->renderer->render($request, new ShadcnApp(
            name: 'shadcn_ui/components',
            jsModule: '@webconsulting/shadcn-ui/components-demo.js',
            props: ['groups' => self::groups()],
            layout: ShellLayout::ChatLeft,
            title: 'shadcn/ui Components',
        ));
    }

    /**
     * The showcase's table of contents: which components the runtime ships,
     * grouped the way the shadcn documentation groups them.
     *
     * @return list<array{id: string, title: string, components: list<string>}>
     */
    private static function groups(): array
    {
        return [
            [
                'id' => 'inputs',
                'title' => 'Inputs',
                'components' => ['button', 'input', 'textarea', 'label', 'select', 'checkbox', 'switch', 'input-group', 'field'],
            ],
            [
                'id' => 'display',
                'title' => 'Display',
                'components' => ['badge', 'card', 'avatar', 'table', 'separator', 'skeleton', 'spinner', 'progress', 'kbd', 'item', 'empty'],
            ],
            [
                'id' => 'navigation',
                'title' => 'Navigation',
                'components' => ['tabs', 'breadcrumb', 'accordion', 'collapsible', 'command', 'dropdown-menu'],
            ],
            [
                'id' => 'overlays',
                'title' => 'Overlays',
                'components' => ['dialog', 'sheet', 'popover', 'tooltip', 'alert', 'sonner'],
            ],
            [
                'id' => 'chat',
                'title' => 'Chat',
                'components' => ['message-scroller', 'message', 'bubble', 'attachment', 'marker'],
            ],
            [
                'id' => 'ai',
                'title' => 'AI',
                'components' => ['prompt-input', 'tool', 'reasoning', 'suggestion', 'shimmer'],
            ],
        ];
    }
}

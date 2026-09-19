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
     * The showcase's table of contents — and the props this module exists to
     * demonstrate.
     *
     * Each group names one section of the demo app, which renders its heading,
     * its description and its component badges from exactly this data. The app
     * ships no headings of its own, so what an editor reads is what this
     * controller said.
     *
     * @return list<array{id: string, title: string, description: string, components: list<string>}>
     */
    private static function groups(): array
    {
        return [
            [
                'id' => 'actions',
                'title' => 'Actions',
                'description' => 'Buttons say what happens when they are used. The variants map onto TYPO3\'s own action colours; '
                    . 'the destructive one is reserved for actions that delete.',
                'components' => ['button', 'badge', 'kbd', 'tooltip', 'dropdown-menu', 'spinner'],
            ],
            [
                'id' => 'layout',
                'title' => 'Layout',
                'description' => 'The containers a module is made of. Cards carry one thing each; tabs split a record the way '
                    . 'FormEngine does; items list records with their actions in reach.',
                'components' => ['card', 'tabs', 'accordion', 'collapsible', 'separator', 'scroll-area', 'item', 'empty', 'breadcrumb', 'avatar'],
            ],
            [
                'id' => 'forms',
                'title' => 'Forms',
                'description' => 'Field groups a label, the control, help text and an error so a form reads as one column. '
                    . 'Every control here is a real form element; nothing is faked.',
                'components' => ['input', 'textarea', 'label', 'select', 'checkbox', 'switch', 'field', 'input-group'],
            ],
            [
                'id' => 'data',
                'title' => 'Data and feedback',
                'description' => 'Records in rows, work in progress, and the two messages a module needs: something you should '
                    . 'know, and something that went wrong.',
                'components' => ['table', 'progress', 'skeleton', 'spinner', 'alert'],
            ],
            [
                'id' => 'overlays',
                'title' => 'Overlays',
                'description' => 'Every floating layer renders inside the shell\'s shadow root, so it is styled by this '
                    . 'stylesheet and follows the backend\'s theme — a dialog opened from a module never lands unstyled in '
                    . 'the backend document.',
                'components' => ['dialog', 'sheet', 'popover', 'command', 'sonner'],
            ],
            [
                'id' => 'chat',
                'title' => 'Chat and AI',
                'description' => 'What the assistant rail is built from. An extension writing its own assistant surface gets '
                    . 'the same components from the runtime.',
                'components' => ['message', 'message-scroller', 'bubble', 'marker', 'attachment', 'prompt-input', 'tool', 'reasoning', 'suggestion', 'shimmer'],
            ],
        ];
    }
}

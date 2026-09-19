<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Webconsulting\ShadcnUi\Backend\ShadcnApp;
use Webconsulting\ShadcnUi\Backend\ShadcnModuleRenderer;
use Webconsulting\ShadcnUi\Backend\ShellLayout;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;

/**
 * Admin Tools → AI Chat: the chat rail with the conversation sidebar as its app.
 *
 * The same shell every shadcn module uses — a module that re-implemented the
 * chat would be a second chat to keep in step with the first.
 */
final readonly class ChatModuleController
{
    public const APP = 'shadcn_ui/chat-home';

    public function __construct(
        private ShadcnModuleRenderer $renderer,
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

        return $this->renderer->render($request, new ShadcnApp(
            name: self::APP,
            jsModule: ShadcnModuleRenderer::RUNTIME_MODULE,
            props: ['conversation' => $owned === null ? 0 : $owned->uid],
            layout: ShellLayout::ChatLeft,
            title: 'AI Chat',
        ));
    }
}

<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Type\Bitmask\Permission;
use Webconsulting\ShadcnUi\Chat\Domain\Row;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;

/**
 * Completes a client context with what only the server knows: the page's
 * title — if this user may see the page at all — and the workspace.
 */
final readonly class ChatContextFactory
{
    public function __construct(
        private BackendUserContext $backendUser,
    ) {}

    /**
     * @param array<string, mixed> $raw the client's `context` object
     */
    public function fromClient(array $raw): ChatContext
    {
        $context = ChatContext::fromClient($raw)->withWorkspace($this->backendUser->workspaceId());
        if ($context->pageId <= 0) {
            return $context;
        }

        $page = BackendUtility::getRecord('pages', $context->pageId);
        $user = $this->backendUser->user();
        if ($page === null || $user === null || !$user->doesUserHaveAccess($page, Permission::PAGE_SHOW)) {
            // A uid the user cannot see is not context, it is a probe.
            return $context->withPage(0, '');
        }

        return $context->withPage($context->pageId, Row::string($page, 'title'));
    }
}

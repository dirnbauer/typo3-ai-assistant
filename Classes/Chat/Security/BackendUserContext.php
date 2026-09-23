<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Security;

use Netresearch\NrLlm\Domain\Enum\BackendUserGrant;
use Netresearch\NrLlm\Domain\ValueObject\AiActorContext;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;

/**
 * The one sanctioned place this extension reads `$GLOBALS['BE_USER']`.
 *
 * Everything downstream carries an explicit {@see AiActorContext} instead of
 * re-reading the ambient user (nr-llm ADR-083). The HTTP boundary is where the
 * ambient user genuinely IS the caller, so the read happens here and nowhere
 * else.
 */
final readonly class BackendUserContext
{
    public function user(): ?BackendUserAuthentication
    {
        $user = $GLOBALS['BE_USER'] ?? null;

        return $user instanceof BackendUserAuthentication ? $user : null;
    }

    public function uid(): int
    {
        $user = $this->user();
        $record = $user !== null && is_array($user->user) ? $user->user : [];
        $uid = $record['uid'] ?? 0;

        return is_numeric($uid) ? (int)$uid : 0;
    }

    public function isAuthenticated(): bool
    {
        return $this->uid() > 0;
    }

    public function isAdmin(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    /**
     * @return list<int>
     */
    public function groupIds(): array
    {
        $user = $this->user();
        if ($user === null) {
            return [];
        }

        return array_values(array_filter(
            array_map(static fn(mixed $group): int => is_numeric($group) ? (int)$group : 0, $user->userGroupsUID),
            static fn(int $group): bool => $group > 0,
        ));
    }

    public function workspaceId(): int
    {
        $user = $this->user();

        return $user === null ? 0 : $user->workspace;
    }

    /**
     * The full actor for this request: uid, admin flag, groups and nr-llm
     * grants, frozen now — a revoked grant stops with the next request while an
     * in-flight run keeps the identity it started with.
     */
    public function actor(): AiActorContext
    {
        $user = $this->user();
        $uid = $this->uid();
        if ($user === null || $uid === 0) {
            return AiActorContext::anonymous();
        }

        $grants = array_values(array_filter(
            BackendUserGrant::cases(),
            static fn(BackendUserGrant $grant): bool => (bool)$user->check('custom_options', $grant->permissionValue()),
        ));

        return AiActorContext::backendUser($uid, $user->isAdmin(), $this->groupIds(), $grants);
    }
}

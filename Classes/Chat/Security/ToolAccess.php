<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Security;

use Netresearch\NrLlm\Service\Tool\ToolAvailabilityServiceInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Which tools a turn may offer the model.
 *
 * Two gates, intersected: nr-llm's own tool policy (what an administrator
 * enabled in the Tools module — the runtime enforces it again at call time, so
 * nothing here can widen it), narrowed by user TSconfig
 * `tx_webconaiassistant.tools.allow` / `.deny`. Deny wins over allow, because a
 * narrowing rule that a broader one can cancel is not a narrowing rule.
 *
 * An empty result is a legitimate answer: a chat with no tools still answers
 * questions, it just cannot touch the installation.
 */
final readonly class ToolAccess
{
    private const string TSCONFIG_KEY = 'tx_webconaiassistant.';

    public function __construct(
        private ToolAvailabilityServiceInterface $toolAvailability,
        private BackendUserContext $backendUser,
    ) {}

    /**
     * Always an explicit list, never nr-llm's "null means everything": the
     * status endpoint shows the user which tools this conversation can reach.
     *
     * @return list<string>
     */
    public function allowedToolNames(): array
    {
        if (!$this->backendUser->isAuthenticated()) {
            return [];
        }

        $enabled = $this->toolAvailability->enabledNames();
        [$allow, $deny] = $this->rules();

        if ($allow !== null) {
            $enabled = array_values(array_intersect($enabled, $allow));
        }

        return array_values(array_diff($enabled, $deny));
    }

    /**
     * An ABSENT allow list and an EMPTY one are different answers: absent means
     * "do not narrow", empty means "allow nothing". Collapsing them would make
     * `allow =` silently permissive.
     *
     * @return array{0: list<string>|null, 1: list<string>}
     */
    private function rules(): array
    {
        $tools = $this->backendUser->user()?->getTSConfig()[self::TSCONFIG_KEY]['tools.'] ?? null;
        if (!is_array($tools)) {
            return [null, []];
        }

        $allow = $tools['allow'] ?? null;
        $deny = $tools['deny'] ?? null;

        return [
            is_string($allow) ? GeneralUtility::trimExplode(',', $allow, true) : null,
            is_string($deny) ? GeneralUtility::trimExplode(',', $deny, true) : [],
        ];
    }
}

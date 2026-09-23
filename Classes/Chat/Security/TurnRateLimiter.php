<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Security;

use Symfony\Component\RateLimiter\RateLimiterFactory;
use TYPO3\CMS\Core\RateLimiter\Storage\CachingFrameworkStorage;
use Webconsulting\WebconAiAssistant\Configuration\ExtensionSettings;

/**
 * Caps how many turns one backend user may start per hour.
 *
 * Per USER, not per conversation, because the cost it protects against is per
 * user: every turn is a paid provider call. The per-conversation limit is a
 * different mechanism — the `processing` claim.
 *
 * State lives in the caching framework: the window is an hour, it is worthless
 * after that, and it must not survive a cache flush as a lockout.
 */
final class TurnRateLimiter
{
    private ?RateLimiterFactory $factory = null;

    public function __construct(
        private readonly ExtensionSettings $settings,
        private readonly CachingFrameworkStorage $storage,
    ) {}

    /**
     * Consume one turn. True when it may proceed.
     */
    public function consume(int $beUserUid): bool
    {
        return $this->factory()?->create((string)$beUserUid)->consume()->isAccepted() ?? true;
    }

    /**
     * Turns left in the current window, without consuming one; -1 when the
     * limit is off.
     */
    public function remaining(int $beUserUid): int
    {
        return $this->factory()?->create((string)$beUserUid)->consume(0)->getRemainingTokens() ?? -1;
    }

    public function limit(): int
    {
        return $this->settings->maxTurnsPerHour();
    }

    private function factory(): ?RateLimiterFactory
    {
        $limit = $this->limit();
        if ($limit <= 0) {
            return null;
        }

        // Sliding rather than fixed: a fixed window lets a user spend the whole
        // allowance at 11:59 and again at 12:00.
        return $this->factory ??= new RateLimiterFactory(
            ['id' => 'webcon_ai_assistant_turn', 'policy' => 'sliding_window', 'limit' => $limit, 'interval' => '1 hour'],
            $this->storage,
        );
    }
}

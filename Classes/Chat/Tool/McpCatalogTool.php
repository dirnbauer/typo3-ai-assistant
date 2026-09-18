<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Tool;

use Hn\McpServer\Service\McpToolCatalogService;
use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\ValueObject\ToolResult;
use Netresearch\NrLlm\Domain\ValueObject\ToolSpec;
use Netresearch\NrLlm\Service\Tool\ToolDataClassInterface;
use Netresearch\NrLlm\Service\Tool\ToolEffectInterface;
use Netresearch\NrLlm\Service\Tool\ToolExecutionContext;
use Netresearch\NrLlm\Service\Tool\ToolInterface;
use Throwable;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use Webconsulting\ShadcnUi\Chat\ErrorMessageSanitizer;

/**
 * One MCP tool of this installation, offered to the nr-llm agent loop.
 *
 * `execute()` calls straight into {@see McpToolCatalogService}, so the model
 * reaches exactly the code an external MCP client would — same permission
 * checks, same workspace rules, same capability manifest.
 *
 * AMBIENT-IDENTITY CONTRACT: nr-llm threads the acting user through the
 * execution context; the MCP tools read `$GLOBALS['BE_USER']`. Bridging the two
 * means the ambient user is load-bearing, so this adapter refuses to run
 * whenever the ambient user is not provably the run's actor. It is why a turn
 * runs SYNCHRONOUSLY inside the request and never through a queue worker: there
 * is no ambient user in a worker, and every call would fail closed.
 */
final readonly class McpCatalogTool implements ToolInterface, ToolEffectInterface, ToolDataClassInterface
{
    /** `WriteTable` becomes `typo3_WriteTable`: an installation tool is told apart from an nr-llm builtin at a glance. */
    public const NAME_PREFIX = 'typo3_';

    /** One nr-llm tool group for the whole catalogue, so an operator can switch it as one. */
    public const GROUP = 'typo3_mcp';

    public function __construct(
        private string $mcpName,
        private ToolSpec $spec,
        private ToolEffect $effect,
        private ToolDataClass $dataClass,
        private bool $requiresAdmin,
        private McpToolCatalogService $catalog,
        private ToolResultConverter $converter,
    ) {}

    public static function toolName(string $mcpName): string
    {
        return self::NAME_PREFIX . $mcpName;
    }

    /**
     * The MCP name behind a model-facing name, or null when it is not one of ours.
     */
    public static function mcpName(string $toolName): ?string
    {
        if (!str_starts_with($toolName, self::NAME_PREFIX)) {
            return null;
        }
        $mcpName = substr($toolName, strlen(self::NAME_PREFIX));

        return $mcpName === '' ? null : $mcpName;
    }

    public function getSpec(): ToolSpec
    {
        return $this->spec;
    }

    public function getEffect(): ToolEffect
    {
        return $this->effect;
    }

    /**
     * Declared rather than inherited: nr-llm's default for an unknown group is
     * SECRET_ADJACENT, which would withhold the whole catalogue from every
     * provider that is not maximally trusted.
     */
    public function getDataClass(): ToolDataClass
    {
        return $this->dataClass;
    }

    public function getGroup(): string
    {
        return self::GROUP;
    }

    /**
     * Only reads are offered without an operator decision; a write stays dark
     * until an admin switches it on in nr-llm's Tools module.
     */
    public function isEnabledByDefault(): bool
    {
        return !$this->effect->isWrite();
    }

    public function requiresAdmin(): bool
    {
        return $this->requiresAdmin;
    }

    /**
     * @param array<string, mixed> $arguments
     */
    public function execute(array $arguments, ToolExecutionContext $context): ToolResult
    {
        $denial = $this->denyMismatchedIdentity($context);
        if ($denial !== null) {
            return $denial;
        }

        try {
            $result = $this->catalog->execute($this->mcpName, $arguments);
        } catch (Throwable $exception) {
            return ToolResult::error(sprintf(
                'Tool "%s" could not be executed: %s',
                $this->spec->name,
                ErrorMessageSanitizer::sanitize($exception->getMessage()),
            ));
        }

        return $this->converter->convert($result, $this->spec->name, $this->effect);
    }

    private function denyMismatchedIdentity(ToolExecutionContext $context): ?ToolResult
    {
        $actorUid = $context->actor->backendUserUid;
        if ($actorUid <= 0) {
            return $this->denied('the run has no backend user');
        }

        $acting = $context->actingBackendUser();
        if (!$acting instanceof BackendUserAuthentication || self::uidOf($acting) !== $actorUid) {
            return $this->denied('the acting backend user could not be resolved');
        }

        $ambient = $GLOBALS['BE_USER'] ?? null;
        if (!$ambient instanceof BackendUserAuthentication) {
            return $this->denied('no backend user session is active in this process');
        }
        if (self::uidOf($ambient) !== $actorUid) {
            return $this->denied('the active backend user session belongs to somebody else');
        }
        if ($this->requiresAdmin && !$acting->isAdmin()) {
            return $this->denied('the tool is restricted to administrators');
        }

        return null;
    }

    private function denied(string $reason): ToolResult
    {
        return ToolResult::error(sprintf('Tool "%s" was not executed because %s.', $this->spec->name, $reason));
    }

    private static function uidOf(BackendUserAuthentication $user): int
    {
        $uid = is_array($user->user) ? ($user->user['uid'] ?? null) : null;

        return is_numeric($uid) ? (int)$uid : 0;
    }
}

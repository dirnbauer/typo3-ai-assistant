<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Tool;

use Hn\McpServer\MCP\Tool\Attribute\AdminOnly;
use Hn\McpServer\Service\CapabilityManifestService;
use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use ReflectionClass;

/**
 * Decides what an MCP tool DOES to the installation, from two sources the MCP
 * server already maintains — never from configuration, because an operator
 * must not be able to relabel a write as a read.
 *
 * 1. The tool's own MCP `annotations` (`readOnlyHint` / `destructiveHint` /
 *    `idempotentHint`) win whenever present.
 * 2. Otherwise the capability manifest's subsystems: a tool that needs
 *    `database:write` writes, whatever its schema forgot to say.
 *
 * The fail-safe direction differs per question: an EMPTY declaration is a tool
 * that touches nothing (`GetCapabilities`), an UNKNOWN subsystem is assumed to
 * change something.
 */
final readonly class ToolEffectClassifier
{
    /** Subsystems whose write nature is not in their name (`:write` is caught by suffix). */
    private const WRITE_SUBSYSTEMS = ['cli:safe', 'extension:install', 'project:write', 'scheduler:task', 'site:write', 'cache:write', 'x402:payments'];

    private const READ_SUBSYSTEMS = ['database:read', 'database:schema', 'file:read', 'log:read', 'workspace:read', 'typoscript:provider', 'site:middleware', 'render:frontend'];

    /** Subsystems whose reach is the whole installation or the host. */
    private const ADMIN_SUBSYSTEMS = ['cli:safe', 'extension:install', 'project:write', 'scheduler:task', 'site:write', 'x402:payments'];

    /**
     * How sensitive a subsystem's OUTPUT is, for nr-llm's egress gate. A
     * different axis from the effect: a tool that only writes still echoes the
     * record it wrote.
     *
     * @var array<string, ToolDataClass>
     */
    private const SUBSYSTEM_DATA_CLASSES = [
        'render:frontend' => ToolDataClass::PUBLIC_CONTENT,
        'database:read' => ToolDataClass::EDITOR_CONTENT,
        'database:write' => ToolDataClass::EDITOR_CONTENT,
        'file:read' => ToolDataClass::EDITOR_CONTENT,
        'file:write' => ToolDataClass::EDITOR_CONTENT,
        'workspace:read' => ToolDataClass::EDITOR_CONTENT,
        'workspace:write' => ToolDataClass::EDITOR_CONTENT,
        'database:schema' => ToolDataClass::INTERNAL_CONFIGURATION,
        'typoscript:provider' => ToolDataClass::INTERNAL_CONFIGURATION,
        'site:middleware' => ToolDataClass::INTERNAL_CONFIGURATION,
        'site:write' => ToolDataClass::INTERNAL_CONFIGURATION,
        'cache:write' => ToolDataClass::INTERNAL_CONFIGURATION,
        'scheduler:task' => ToolDataClass::INTERNAL_CONFIGURATION,
        'network:scheduler' => ToolDataClass::INTERNAL_CONFIGURATION,
        'network:package-manager' => ToolDataClass::INTERNAL_CONFIGURATION,
        'x402:payments' => ToolDataClass::INTERNAL_CONFIGURATION,
        'log:read' => ToolDataClass::SYSTEM_DIAGNOSTICS,
        'cli:safe' => ToolDataClass::SECRET_ADJACENT,
        'extension:install' => ToolDataClass::SECRET_ADJACENT,
        'project:write' => ToolDataClass::SECRET_ADJACENT,
    ];

    public function __construct(
        private ?CapabilityManifestService $capabilityManifest = null,
    ) {}

    /**
     * @param array<string, mixed> $schema the MCP tool schema from McpToolCatalogService::describe()
     */
    public function classify(string $mcpToolName, array $schema): ToolEffect
    {
        $annotations = $schema['annotations'] ?? null;
        if (is_array($annotations) && $annotations !== []) {
            return $this->fromAnnotations($annotations);
        }

        return $this->fromSubsystems($this->subsystems($mcpToolName));
    }

    /**
     * The strictest class among the tool's subsystems wins. A tool declaring
     * nothing describes the installation, so INTERNAL_CONFIGURATION; an unknown
     * subsystem falls to SECRET_ADJACENT.
     */
    public function dataClass(string $mcpToolName): ToolDataClass
    {
        $subsystems = $this->subsystems($mcpToolName);
        if ($subsystems === []) {
            return ToolDataClass::INTERNAL_CONFIGURATION;
        }

        $strictest = ToolDataClass::PUBLIC_CONTENT;
        foreach ($subsystems as $subsystem) {
            $class = self::SUBSYSTEM_DATA_CLASSES[$subsystem] ?? ToolDataClass::SECRET_ADJACENT;
            if (self::rank($class) > self::rank($strictest)) {
                $strictest = $class;
            }
        }

        return $strictest;
    }

    /**
     * Whether the tool may only be offered to an administrator: the MCP server's
     * own `#[AdminOnly]` attribute, or a subsystem no editor should reach.
     */
    public function requiresAdmin(string $mcpToolName, ?object $toolInstance = null): bool
    {
        if ($toolInstance !== null && (new ReflectionClass($toolInstance))->getAttributes(AdminOnly::class) !== []) {
            return true;
        }

        return array_intersect($this->subsystems($mcpToolName), self::ADMIN_SUBSYSTEMS) !== [];
    }

    /**
     * @param array<array-key, mixed> $annotations
     */
    private function fromAnnotations(array $annotations): ToolEffect
    {
        if (($annotations['readOnlyHint'] ?? null) === true) {
            return ToolEffect::READ_ONLY;
        }
        if (($annotations['destructiveHint'] ?? null) === true || ($annotations['idempotentHint'] ?? null) === false) {
            return ToolEffect::NON_IDEMPOTENT_WRITE;
        }
        if (($annotations['idempotentHint'] ?? null) === true) {
            return ToolEffect::IDEMPOTENT_WRITE;
        }

        // Writes, and nothing said about idempotency: assume repeating is unsafe.
        return ToolEffect::NON_IDEMPOTENT_WRITE;
    }

    /**
     * @param list<string> $subsystems
     */
    private function fromSubsystems(array $subsystems): ToolEffect
    {
        foreach ($subsystems as $subsystem) {
            if (!in_array($subsystem, self::READ_SUBSYSTEMS, true)) {
                // Named write, `:write` suffix, `network:*`, or unrecognised — all write.
                return ToolEffect::NON_IDEMPOTENT_WRITE;
            }
        }

        return ToolEffect::READ_ONLY;
    }

    /**
     * @return list<string>
     */
    private function subsystems(string $mcpToolName): array
    {
        return $this->capabilityManifest?->getRequiredSubsystemsForTool($mcpToolName) ?? [];
    }

    /**
     * nr-llm's cases are a named set, not a scale, so "strictest" is spelled out.
     */
    private static function rank(ToolDataClass $class): int
    {
        return match ($class) {
            ToolDataClass::PUBLIC_CONTENT => 0,
            ToolDataClass::EDITOR_CONTENT => 1,
            ToolDataClass::INTERNAL_CONFIGURATION => 2,
            ToolDataClass::SOURCE_CODE => 3,
            ToolDataClass::SYSTEM_DIAGNOSTICS => 4,
            ToolDataClass::SECRET_ADJACENT => 5,
        };
    }
}

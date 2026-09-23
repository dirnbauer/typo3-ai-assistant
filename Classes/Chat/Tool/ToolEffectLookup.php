<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Tool;

use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Service\Tool\ToolApprovalRule;
use Netresearch\NrLlm\Service\Tool\ToolEffectInterface;
use Netresearch\NrLlm\Service\Tool\ToolRegistry;

/**
 * What the runtime will do with a tool, asked by name.
 *
 * "Does this change my site?" and "will I be asked first?" are read from
 * nr-llm's own registry and approval rule rather than recomputed: a badge that
 * disagrees with the gate is worse than no badge.
 */
final readonly class ToolEffectLookup
{
    public function __construct(
        private ToolRegistry $toolRegistry,
    ) {}

    public function effectOf(string $toolName): ToolEffect
    {
        $tool = $this->toolRegistry->get($toolName);

        return $tool instanceof ToolEffectInterface ? $tool->getEffect() : ToolEffect::READ_ONLY;
    }

    public function requiresApproval(string $toolName): bool
    {
        return ToolApprovalRule::requiresApproval($this->toolRegistry->get($toolName));
    }

    /**
     * @param list<string> $toolNames
     *
     * @return list<array{name: string, mcpName: string|null, effect: string, requiresApproval: bool}>
     */
    public function describe(array $toolNames): array
    {
        return array_map(fn(string $name): array => [
            'name' => $name,
            'mcpName' => McpCatalogTool::mcpName($name),
            'effect' => $this->effectOf($name)->value,
            'requiresApproval' => $this->requiresApproval($name),
        ], $toolNames);
    }
}

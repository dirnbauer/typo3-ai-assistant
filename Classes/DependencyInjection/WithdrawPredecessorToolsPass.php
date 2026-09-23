<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\DependencyInjection;

use Netresearch\NrLlm\Service\Tool\ToolInterface;
use Netresearch\NrLlm\Service\Tool\ToolProviderInterface;
use Override;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * Lets this extension share an installation with the one it replaces.
 *
 * `webconsulting/typo3-shadcn-ui` registers the same `ask_user` tool and the
 * same MCP catalogue provider. nr-llm's tool registry treats a duplicate
 * builtin tool name as a developer error and throws while it is being built —
 * which would take down every backend page that builds it, not just the chat.
 * So while both extensions are installed, the predecessor's two registrations
 * are withdrawn from nr-llm and this extension's stand in for them. The tool
 * names are identical and so is what the tools do, so the predecessor's own
 * chat keeps working on these instances.
 *
 * Runs before optimisation, after autoconfiguration has applied the tags
 * nr-llm's interfaces declare and before the registry's tagged iterators are
 * resolved.
 */
final class WithdrawPredecessorToolsPass implements CompilerPassInterface
{
    /**
     * The predecessor's service ids, with the nr-llm tag each one carries.
     *
     * @var array<string, string>
     */
    public const array PREDECESSOR_REGISTRATIONS = [
        'Webconsulting\\ShadcnUi\\Chat\\Tool\\AskUserTool' => ToolInterface::TAG_NAME,
        'Webconsulting\\ShadcnUi\\Chat\\Tool\\McpCatalogToolProvider' => ToolProviderInterface::TAG_NAME,
    ];

    #[Override]
    public function process(ContainerBuilder $container): void
    {
        foreach (self::PREDECESSOR_REGISTRATIONS as $serviceId => $tag) {
            if ($container->hasDefinition($serviceId)) {
                $container->getDefinition($serviceId)->clearTag($tag);
            }
        }
    }
}

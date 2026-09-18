<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Tool;

use Hn\McpServer\MCP\ToolRegistry;
use Hn\McpServer\Service\McpToolCatalogService;
use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\ValueObject\ToolSpec;
use Netresearch\NrLlm\Service\Tool\ToolProviderInterface;
use Throwable;
use TYPO3\CMS\Core\Cache\Frontend\FrontendInterface;
use Webconsulting\ShadcnUi\Chat\Domain\Row;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;

/**
 * Projects this installation's MCP tool catalogue into the nr-llm agent runtime.
 *
 * Which tools exist depends on which extensions are installed and what the
 * capability manifest permits — runtime facts, which is what
 * {@see ToolProviderInterface} exists for. The expensive half is the metadata:
 * `describe()` builds every JSON schema and each class is reflected for
 * `#[AdminOnly]`. That is cached, keyed by the registered tool NAMES plus the
 * acting user, because several MCP tools build their schema from what the
 * CURRENT user may reach — a per-user key is what stops one editor's table list
 * from being served to another.
 */
final readonly class McpCatalogToolProvider implements ToolProviderInterface
{
    public function __construct(
        private McpToolCatalogService $catalog,
        private ToolRegistry $mcpToolRegistry,
        private ToolEffectClassifier $effectClassifier,
        private ToolResultConverter $resultConverter,
        private FrontendInterface $cache,
        private BackendUserContext $backendUser,
    ) {}

    /**
     * @return iterable<McpCatalogTool>
     */
    public function tools(): iterable
    {
        foreach ($this->definitions() as $definition) {
            yield new McpCatalogTool(
                $definition['mcpName'],
                new ToolSpec(
                    name: McpCatalogTool::toolName($definition['mcpName']),
                    description: $definition['description'],
                    parameters: $definition['parameters'],
                ),
                ToolEffect::from($definition['effect']),
                ToolDataClass::from($definition['dataClass']),
                $definition['requiresAdmin'],
                $this->catalog,
                $this->resultConverter,
            );
        }
    }

    /**
     * @return list<array{mcpName: string, description: string, parameters: array<string, mixed>, effect: string, dataClass: string, requiresAdmin: bool}>
     */
    private function definitions(): array
    {
        $names = array_values(array_filter(array_keys($this->mcpToolRegistry->getTools()), is_string(...)));
        sort($names, SORT_STRING);
        if ($names === []) {
            return [];
        }

        $cacheIdentifier = 'catalog_' . sha1(implode(',', $names) . '|' . $this->backendUser->uid());
        $cached = $this->cache->get($cacheIdentifier);
        if (is_array($cached)) {
            /** @var list<array{mcpName: string, description: string, parameters: array<string, mixed>, effect: string, dataClass: string, requiresAdmin: bool}> $cached */
            return $cached;
        }

        $definitions = [];
        foreach ($names as $mcpName) {
            $definition = $this->describe($mcpName);
            if ($definition !== null) {
                $definitions[] = $definition;
            }
        }
        $this->cache->set($cacheIdentifier, $definitions);

        return $definitions;
    }

    /**
     * @return array{mcpName: string, description: string, parameters: array<string, mixed>, effect: string, dataClass: string, requiresAdmin: bool}|null
     */
    private function describe(string $mcpName): ?array
    {
        try {
            $schema = $this->catalog->describe($mcpName)['schema'];
        } catch (Throwable) {
            // A tool that cannot describe itself is simply not offered; one
            // broken tool must not cost the run every other tool.
            return null;
        }

        $description = trim(Row::string($schema, 'description'));

        return [
            'mcpName' => $mcpName,
            'description' => $description !== '' ? $description : sprintf('The TYPO3 MCP tool "%s".', $mcpName),
            'parameters' => $this->parameters($schema),
            'effect' => $this->effectClassifier->classify($mcpName, $schema)->value,
            'dataClass' => $this->effectClassifier->dataClass($mcpName)->value,
            'requiresAdmin' => $this->effectClassifier->requiresAdmin($mcpName, $this->mcpToolRegistry->getTool($mcpName)),
        ];
    }

    /**
     * MCP nests the parameter schema under `inputSchema`; nr-llm takes the JSON
     * Schema object directly.
     *
     * @param array<string, mixed> $schema
     *
     * @return array<string, mixed>
     */
    private function parameters(array $schema): array
    {
        $input = $schema['inputSchema'] ?? null;
        if (!is_array($input)) {
            return ['type' => 'object', 'properties' => []];
        }

        return ['type' => 'object', ...Row::stringKeyed($input)];
    }
}

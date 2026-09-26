<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Chat\Tool;

use Hn\McpServer\MCP\ToolRegistry;
use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Cache\CacheManager;
use Webconsulting\WebconAiAssistant\Chat\Tool\McpCatalogToolProvider;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

final class McpCatalogToolProviderTest extends AbstractChatTestCase
{
    #[Test]
    public function everyAdvertisedToolHasAProviderCompatibleRootSchemaEvenAfterACacheHit(): void
    {
        $names = array_keys($this->get(ToolRegistry::class)->getTools());
        sort($names, SORT_STRING);
        $cacheIdentifier = 'catalog_v4_' . sha1(implode(',', $names) . '|' . self::BE_USER_UID);
        $cache = $this->get(CacheManager::class)->getCache('webcon_ai_assistant_tools');

        // A definition created by an older conversion must be regenerated.
        $cache->set($cacheIdentifier, [[
            'mcpName' => 'GetPage',
            'description' => 'Read a page.',
            'parameters' => [
                'type' => 'object',
                'properties' => ['uid' => ['type' => 'integer']],
                'oneOf' => [['required' => ['uid']]],
            ],
            'effect' => 'read_only',
            'dataClass' => 'editor_content',
            'requiresAdmin' => false,
        ]]);
        self::assertIsArray($cache->get($cacheIdentifier));

        $tools = iterator_to_array($this->get(McpCatalogToolProvider::class)->tools(), false);
        self::assertNotEmpty($tools);
        $byName = [];
        foreach ($tools as $tool) {
            $spec = $tool->getSpec();
            $byName[$spec->name] = $spec;
            self::assertSame('object', $spec->parameters['type'] ?? null, $spec->name);
            self::assertLessThanOrEqual(1024, mb_strlen($spec->description), $spec->name);
            foreach (['oneOf', 'anyOf', 'allOf', 'enum', 'const', 'not'] as $keyword) {
                self::assertArrayNotHasKey($keyword, $spec->parameters, $spec->name);
            }
        }

        self::assertArrayHasKey('typo3_GetPage', $byName);
        self::assertArrayHasKey('typo3_ReadFileMetadata', $byName);

        // The repaired catalogue, not the poisoned row, was cached.
        $repaired = $cache->get($cacheIdentifier);
        self::assertIsArray($repaired);
        self::assertGreaterThan(1, count($repaired));
    }
}

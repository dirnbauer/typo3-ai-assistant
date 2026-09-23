<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Tool;

use Hn\McpServer\MCP\Tool\ToolInterface as McpToolInterface;
use Hn\McpServer\MCP\ToolRegistry;
use Hn\McpServer\Service\CapabilityManifestService;
use Hn\McpServer\Service\McpToolCatalogService;
use Hn\McpServer\Service\ToolResultNormalizer;
use Mcp\Types\CallToolResult;
use Mcp\Types\TextContent;
use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\ValueObject\AiActorContext;
use Netresearch\NrLlm\Domain\ValueObject\ToolSpec;
use Netresearch\NrLlm\Service\Tool\ToolExecutionContext;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Yaml\Yaml;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Site\SiteFinder;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use Webconsulting\WebconAiAssistant\Chat\Tool\McpCatalogTool;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolResultConverter;

/**
 * The identity check is what makes the bridge safe at all, and the thing a
 * future refactor is most likely to quietly weaken.
 */
final class McpCatalogToolTest extends TestCase
{
    /** @var list<string> */
    private array $manifestFiles = [];

    protected function tearDown(): void
    {
        unset($GLOBALS['BE_USER']);
        GeneralUtility::purgeInstances();
        foreach ($this->manifestFiles as $path) {
            if (is_file($path)) {
                unlink($path);
            }
        }
        $this->manifestFiles = [];
        parent::tearDown();
    }

    #[Test]
    public function theModelFacingNameIsThePrefixedMcpName(): void
    {
        self::assertSame('typo3_WriteTable', McpCatalogTool::toolName('WriteTable'));
        self::assertSame('WriteTable', McpCatalogTool::mcpName('typo3_WriteTable'));
        self::assertNull(McpCatalogTool::mcpName('read_records'));
        self::assertNull(McpCatalogTool::mcpName('typo3_'));
    }

    #[Test]
    public function aPermittedCallReachesTheMcpToolAndItsResultIsConverted(): void
    {
        self::signIn(7);
        $this->permitTool('WriteTable');

        $result = $this->tool(new CallToolResult([new TextContent('Page 42 is called "Home".')]))->execute([], self::context(7));

        self::assertFalse($result->isError);
        self::assertSame('Page 42 is called "Home".', $result->content);
    }

    #[Test]
    public function executionIsRefusedWhenTheAmbientUserIsSomebodyElse(): void
    {
        self::signIn(9);
        $this->permitTool('WriteTable');

        $result = $this->tool(new CallToolResult([new TextContent('should never run')]))->execute([], self::context(7));

        self::assertTrue($result->isError);
        self::assertStringContainsString('belongs to somebody else', $result->content);
    }

    #[Test]
    public function executionIsRefusedWithoutAnAmbientUser(): void
    {
        unset($GLOBALS['BE_USER']);
        $this->permitTool('WriteTable');

        $result = $this->tool(new CallToolResult([new TextContent('should never run')]))->execute([], self::context(7));

        self::assertTrue($result->isError);
        self::assertStringContainsString('no backend user session is active', $result->content);
    }

    #[Test]
    public function executionIsRefusedForAnAnonymousActor(): void
    {
        self::signIn(7);
        $this->permitTool('WriteTable');

        $result = $this->tool(new CallToolResult([new TextContent('should never run')]))
            ->execute([], new ToolExecutionContext(AiActorContext::anonymous()));

        self::assertTrue($result->isError);
        self::assertStringContainsString('no backend user', $result->content);
    }

    #[Test]
    public function anAdminOnlyToolIsRefusedForANonAdmin(): void
    {
        self::signIn(7);
        $this->permitTool('WriteTable');

        $result = $this->tool(new CallToolResult([new TextContent('should never run')]), requiresAdmin: true)->execute([], self::context(7));

        self::assertTrue($result->isError);
        self::assertStringContainsString('restricted to administrators', $result->content);
    }

    #[Test]
    public function itReportsEffectGroupAndDataClassAndStaysDarkWhenItWrites(): void
    {
        $tool = $this->tool(new CallToolResult([]), effect: ToolEffect::NON_IDEMPOTENT_WRITE);

        self::assertSame(ToolEffect::NON_IDEMPOTENT_WRITE, $tool->getEffect());
        self::assertSame(McpCatalogTool::GROUP, $tool->getGroup());
        self::assertSame('typo3_WriteTable', $tool->getSpec()->name);
        self::assertSame(ToolDataClass::EDITOR_CONTENT, $tool->getDataClass());
        self::assertFalse($tool->isEnabledByDefault(), 'A write must be switched on deliberately.');
        self::assertTrue($this->tool(new CallToolResult([]))->isEnabledByDefault());
    }

    private function tool(CallToolResult $result, ToolEffect $effect = ToolEffect::READ_ONLY, bool $requiresAdmin = false): McpCatalogTool
    {
        return new McpCatalogTool(
            'WriteTable',
            new ToolSpec('typo3_WriteTable', 'Write a record.', ['type' => 'object', 'properties' => []]),
            $effect,
            ToolDataClass::EDITOR_CONTENT,
            $requiresAdmin,
            self::catalogReturning($result),
            new ToolResultConverter(),
        );
    }

    /**
     * The MCP server enforces its capability manifest inside AbstractTool and
     * resolves it through GeneralUtility, which finds nothing in a unit test —
     * so the test supplies a manifest permitting the one tool it uses.
     */
    private function permitTool(string $name): void
    {
        $path = tempnam(sys_get_temp_dir(), 'ai-assistant-manifest-') . '.yaml';
        $this->manifestFiles[] = $path;
        file_put_contents($path, Yaml::dump([
            'capabilities' => ['version' => '1.0', 'extension' => 'mcp_server', 'x-mcp' => ['tools' => [$name => []]]],
        ], 6));

        GeneralUtility::addInstance(CapabilityManifestService::class, new CapabilityManifestService(
            self::createStub(ExtensionConfiguration::class),
            self::createStub(SiteFinder::class),
            null,
            $path,
        ));
    }

    private static function catalogReturning(CallToolResult $result): McpToolCatalogService
    {
        $tool = new class ($result) implements McpToolInterface {
            public function __construct(private readonly CallToolResult $result) {}

            public function getName(): string
            {
                return 'WriteTable';
            }

            public function getSchema(): array
            {
                return ['description' => 'Write a record.', 'inputSchema' => ['type' => 'object']];
            }

            public function execute(array $params): CallToolResult
            {
                return $this->result;
            }
        };

        return new McpToolCatalogService(new ToolRegistry([$tool]), new ToolResultNormalizer());
    }

    private static function context(int $actorUid): ToolExecutionContext
    {
        $user = new BackendUserAuthentication();
        $user->user = ['uid' => $actorUid, 'admin' => 0];

        return new ToolExecutionContext(AiActorContext::backendUser($actorUid), $user);
    }

    private static function signIn(int $uid): void
    {
        $user = new BackendUserAuthentication();
        $user->user = ['uid' => $uid, 'admin' => 0];
        $GLOBALS['BE_USER'] = $user;
    }
}

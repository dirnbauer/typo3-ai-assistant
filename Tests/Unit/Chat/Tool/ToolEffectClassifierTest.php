<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Tool;

use Hn\McpServer\MCP\Tool\Attribute\AdminOnly;
use Hn\McpServer\MCP\Tool\CompatibleToolAdapter;
use Hn\McpServer\MCP\ToolRegistry;
use Hn\McpServer\Service\CapabilityManifestService;
use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Yaml\Yaml;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Site\SiteFinder;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolEffectClassifier;

/**
 * The two places the fail-safe direction differs: an EMPTY declaration means
 * "touches nothing", an UNKNOWN subsystem means "assume it writes".
 */
final class ToolEffectClassifierTest extends TestCase
{
    /** @var list<string> */
    private array $manifestFiles = [];

    protected function tearDown(): void
    {
        foreach ($this->manifestFiles as $path) {
            if (is_file($path)) {
                unlink($path);
            }
        }
        $this->manifestFiles = [];
        parent::tearDown();
    }

    /**
     * @param array<string, mixed> $annotations
     */
    #[Test]
    #[DataProvider('annotationCases')]
    public function annotationsDecideTheEffect(array $annotations, ToolEffect $expected): void
    {
        self::assertSame($expected, new ToolEffectClassifier()->classify('AnyTool', ['annotations' => $annotations]));
    }

    /**
     * @return iterable<string, array{0: array<string, mixed>, 1: ToolEffect}>
     */
    public static function annotationCases(): iterable
    {
        yield 'readOnlyHint wins outright' => [['readOnlyHint' => true, 'destructiveHint' => true], ToolEffect::READ_ONLY];
        yield 'destructive is never repeatable' => [['readOnlyHint' => false, 'destructiveHint' => true, 'idempotentHint' => true], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'explicitly non-idempotent' => [['readOnlyHint' => false, 'idempotentHint' => false], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'idempotent write' => [['readOnlyHint' => false, 'destructiveHint' => false, 'idempotentHint' => true], ToolEffect::IDEMPOTENT_WRITE];
        yield 'writes, idempotency unstated' => [['readOnlyHint' => false], ToolEffect::NON_IDEMPOTENT_WRITE];
    }

    /**
     * @param list<string> $subsystems
     */
    #[Test]
    #[DataProvider('subsystemCases')]
    public function subsystemsDecideWhenThereAreNoAnnotations(array $subsystems, ToolEffect $expected): void
    {
        $classifier = new ToolEffectClassifier($this->manifestFor(['AnyTool' => $subsystems]));

        self::assertSame($expected, $classifier->classify('AnyTool', []));
    }

    /**
     * @return iterable<string, array{0: list<string>, 1: ToolEffect}>
     */
    public static function subsystemCases(): iterable
    {
        yield 'reads only' => [['database:read', 'file:read'], ToolEffect::READ_ONLY];
        yield 'a :write suffix is a write' => [['database:write'], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'cli:safe is a write despite its name' => [['cli:safe'], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'any network:* reaches outside' => [['network:package-manager'], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'one write among reads still writes' => [['database:read', 'file:read', 'database:write'], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'an unknown subsystem is assumed to write' => [['quantum:entangle'], ToolEffect::NON_IDEMPOTENT_WRITE];
        yield 'no subsystems at all touches nothing' => [[], ToolEffect::READ_ONLY];
    }

    #[Test]
    public function annotationsBeatTheManifest(): void
    {
        $classifier = new ToolEffectClassifier($this->manifestFor(['Odd' => ['database:write']]));

        self::assertSame(ToolEffect::READ_ONLY, $classifier->classify('Odd', ['annotations' => ['readOnlyHint' => true]]));
    }

    /**
     * Through the REAL registry, because that is what the provider passes and
     * because mcp_server wraps a non-native tool in a CompatibleToolAdapter:
     * a classifier that reflected what the registry returned would find no
     * attribute on exactly the third-party tools it is meant to restrict.
     */
    #[Test]
    public function theAdminOnlyAttributeMakesAToolAdminOnlyEvenWhenTheRegistryWrappedIt(): void
    {
        $classifier = new ToolEffectClassifier($this->manifestFor(['AdminOnlyFixture' => ['database:read'], 'OrdinaryFixture' => ['database:read']]));
        $registry = new ToolRegistry([new AdminOnlyFixtureTool(), new OrdinaryFixtureTool()]);

        self::assertInstanceOf(CompatibleToolAdapter::class, $registry->getTool('AdminOnlyFixture'));
        self::assertTrue($classifier->requiresAdmin('AdminOnlyFixture', $registry->getTool('AdminOnlyFixture')));
        self::assertFalse($classifier->requiresAdmin('OrdinaryFixture', $registry->getTool('OrdinaryFixture')));
    }

    #[Test]
    public function aToolNobodyHandedOverIsJudgedByItsSubsystemsAlone(): void
    {
        $classifier = new ToolEffectClassifier($this->manifestFor(['Shell' => ['cli:safe'], 'Reader' => ['database:read']]));

        self::assertTrue($classifier->requiresAdmin('Shell'));
        self::assertFalse($classifier->requiresAdmin('Reader'));
    }

    #[Test]
    #[DataProvider('adminSubsystemCases')]
    public function installationWideSubsystemsMakeAToolAdminOnly(string $subsystem, bool $expected): void
    {
        $classifier = new ToolEffectClassifier($this->manifestFor(['Tool' => [$subsystem]]));

        self::assertSame($expected, $classifier->requiresAdmin('Tool'));
    }

    /**
     * @return iterable<string, array{0: string, 1: bool}>
     */
    public static function adminSubsystemCases(): iterable
    {
        yield 'cli:safe' => ['cli:safe', true];
        yield 'extension:install' => ['extension:install', true];
        yield 'site:write' => ['site:write', true];
        yield 'database:write is an editor capability' => ['database:write', false];
        yield 'database:read' => ['database:read', false];
    }

    #[Test]
    public function theStrictestDataClassAmongTheSubsystemsWins(): void
    {
        $classifier = new ToolEffectClassifier($this->manifestFor([
            'Render' => ['render:frontend'],
            'Mixed' => ['database:read', 'log:read'],
            'Shell' => ['cli:safe'],
            'Nothing' => [],
            'Unknown' => ['quantum:entangle'],
        ]));

        self::assertSame(ToolDataClass::PUBLIC_CONTENT, $classifier->dataClass('Render'));
        self::assertSame(ToolDataClass::SYSTEM_DIAGNOSTICS, $classifier->dataClass('Mixed'));
        self::assertSame(ToolDataClass::SECRET_ADJACENT, $classifier->dataClass('Shell'));
        self::assertSame(ToolDataClass::INTERNAL_CONFIGURATION, $classifier->dataClass('Nothing'));
        self::assertSame(ToolDataClass::SECRET_ADJACENT, $classifier->dataClass('Unknown'));
    }

    /**
     * A REAL manifest service over a temporary file: the service is final —
     * right for a security boundary — and takes a path override for this.
     *
     * @param array<string, list<string>> $tools
     */
    private function manifestFor(array $tools): CapabilityManifestService
    {
        $path = tempnam(sys_get_temp_dir(), 'ai-assistant-manifest-') . '.yaml';
        $this->manifestFiles[] = $path;
        file_put_contents($path, Yaml::dump([
            'capabilities' => ['version' => '1.0', 'extension' => 'mcp_server', 'x-mcp' => ['tools' => $tools]],
        ], 6));

        return new CapabilityManifestService(
            self::createStub(ExtensionConfiguration::class),
            self::createStub(SiteFinder::class),
            null,
            $path,
        );
    }
}

#[AdminOnly]
final class AdminOnlyFixtureTool
{
    public function getName(): string
    {
        return 'AdminOnlyFixture';
    }

    /**
     * @param array<string, mixed> $params
     */
    public function execute(array $params): string
    {
        return 'ok';
    }
}

final class OrdinaryFixtureTool
{
    public function getName(): string
    {
        return 'OrdinaryFixture';
    }

    /**
     * @param array<string, mixed> $params
     */
    public function execute(array $params): string
    {
        return 'ok';
    }
}

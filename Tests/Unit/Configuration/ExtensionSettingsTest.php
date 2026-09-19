<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Unit\Configuration;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use Webconsulting\ShadcnUi\Configuration\ExtensionSettings;

/**
 * Every value TYPO3 stores here is a string. The interesting cases are the ones
 * where a wrong cast would be silently PERMISSIVE.
 */
final class ExtensionSettingsTest extends TestCase
{
    #[Test]
    public function valuesAreReadAsTheTypesTheirConsumersNeed(): void
    {
        $settings = self::settings([
            'llmConfiguration' => ' content-assistant ',
            'allowWrites' => '1',
            'maxTurnsPerHour' => '12',
            'attachmentStorage' => '2:/chat',
            'panelEnabled' => '0',
        ]);

        self::assertSame('content-assistant', $settings->llmConfiguration());
        self::assertTrue($settings->allowWrites());
        self::assertSame(12, $settings->maxTurnsPerHour());
        self::assertSame('2:/chat/', $settings->attachmentStorage(), 'Always a trailing slash so callers can append.');
        self::assertFalse($settings->panelEnabled());
    }

    #[Test]
    public function missingKeysFallBackToTheDocumentedDefaults(): void
    {
        $settings = self::settings([]);

        self::assertSame('backend-assistant', $settings->llmConfiguration());
        self::assertFalse($settings->allowWrites(), 'Writes stay gated unless somebody said otherwise.');
        self::assertSame(60, $settings->maxTurnsPerHour());
        self::assertSame('1:/shadcn_ui/', $settings->attachmentStorage());
        self::assertTrue($settings->panelEnabled());
    }

    #[Test]
    public function blanksAndNegativesAreNotPermissive(): void
    {
        $settings = self::settings(['llmConfiguration' => '   ', 'allowWrites' => '', 'maxTurnsPerHour' => '-5', 'attachmentStorage' => '']);

        self::assertSame('backend-assistant', $settings->llmConfiguration());
        self::assertFalse($settings->allowWrites());
        self::assertSame(0, $settings->maxTurnsPerHour(), '0 is the documented "no limit".');
        self::assertSame('1:/shadcn_ui/', $settings->attachmentStorage());
    }

    #[Test]
    public function anUnconfiguredExtensionReadsAsDefaults(): void
    {
        $configuration = self::createStub(ExtensionConfiguration::class);
        $configuration->method('get')->willThrowException(new RuntimeException('not configured'));

        self::assertSame('backend-assistant', (new ExtensionSettings($configuration))->llmConfiguration());
    }

    /**
     * @param array<string, string> $values
     */
    private static function settings(array $values): ExtensionSettings
    {
        $configuration = self::createStub(ExtensionConfiguration::class);
        $configuration->method('get')->willReturn($values);

        return new ExtensionSettings($configuration);
    }
}

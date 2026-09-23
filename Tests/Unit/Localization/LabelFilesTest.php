<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Localization;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use SimpleXMLElement;
use SplFileInfo;

/**
 * The label files are complete: every English file has its German twin with
 * the same keys, and every refusal a user can read has a label.
 */
final class LabelFilesTest extends TestCase
{
    private const string LANGUAGE = __DIR__ . '/../../../Resources/Private/Language';

    private const string CLASSES = __DIR__ . '/../../../Classes';

    /**
     * A refusal whose text is the provider's own words, sanitized — there is
     * nothing to translate.
     */
    private const int UNTRANSLATABLE = 1795000205;

    /**
     * @return iterable<string, array{0: string}>
     */
    public static function englishFiles(): iterable
    {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(self::LANGUAGE));
        foreach ($files as $file) {
            if ($file instanceof SplFileInfo && $file->getExtension() === 'xlf' && !str_starts_with($file->getFilename(), 'de.')) {
                yield substr($file->getPathname(), strlen(self::LANGUAGE) + 1) => [$file->getPathname()];
            }
        }
    }

    #[Test]
    #[DataProvider('englishFiles')]
    public function everyEnglishLabelHasAGermanTranslation(string $english): void
    {
        $german = dirname($english) . '/de.' . basename($english);
        self::assertFileExists($german);

        $source = self::units($english);
        $translated = self::units($german);
        self::assertSame(array_keys($source), array_keys($translated));
        foreach ($translated as $key => $unit) {
            self::assertSame($source[$key]['source'], $unit['source'], sprintf('The German file carries the same English source for "%s".', $key));
            self::assertNotSame('', $unit['target'], sprintf('"%s" is translated.', $key));
        }
    }

    #[Test]
    public function everyRefusalAUserCanReadHasALabel(): void
    {
        $labelled = array_keys(self::units(self::LANGUAGE . '/messages.xlf'));
        $missing = [];
        foreach (self::refusalCodes() as $code) {
            if (!in_array('error.' . $code, $labelled, true)) {
                $missing[] = $code;
            }
        }

        self::assertSame([], $missing);
    }

    /**
     * The codes of every exception that reaches a user: those constructed as
     * ApiException, ChatException or AttachmentRejectedException, and the
     * codes the document extractors hand to theirs.
     *
     * @return list<int>
     */
    private static function refusalCodes(): array
    {
        $codes = [];
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(self::CLASSES));
        foreach ($files as $file) {
            if (!$file instanceof SplFileInfo || $file->getExtension() !== 'php') {
                continue;
            }
            $source = (string)file_get_contents($file->getPathname());
            preg_match_all('/new (?:ApiException|ChatException|AttachmentRejectedException)\((?:[^;]|;(?!\s*$))*?\b(1795\d{6})\b/m', $source, $constructed);
            preg_match_all('/->load\(\$path, (1795\d{6})\)/', $source, $extracted);
            foreach ([...$constructed[1], ...$extracted[1]] as $code) {
                $codes[(int)$code] = true;
            }
        }
        unset($codes[self::UNTRANSLATABLE]);
        ksort($codes);

        return array_keys($codes);
    }

    /**
     * @return array<string, array{source: string, target: string}>
     */
    private static function units(string $file): array
    {
        $xml = new SimpleXMLElement((string)file_get_contents($file));
        $units = [];
        foreach ($xml->file->body->{'trans-unit'} as $unit) {
            $units[(string)$unit['id']] = ['source' => (string)$unit->source, 'target' => (string)$unit->target];
        }

        return $units;
    }
}

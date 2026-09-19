<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Unit\Chat\Attachment;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\DocumentExtractorInterface;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\DocumentExtractorRegistry;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\DocxExtractor;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\PdfExtractor;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\PlainTextExtractor;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\XlsxExtractor;

/**
 * The extractors against real files, and the registry as the allowlist.
 */
final class DocumentExtractorsTest extends TestCase
{
    private const FIXTURES = __DIR__ . '/../../../Fixtures/Documents';

    #[Test]
    public function pdfTextIsExtractedAndBrokenOrEncryptedFilesAreRefused(): void
    {
        $extractor = new PdfExtractor();

        self::assertStringContainsString('Hello PDF', $extractor->extract(self::FIXTURES . '/sample.pdf'));

        try {
            $extractor->validate(self::FIXTURES . '/corrupt.pdf');
            self::fail('A corrupt PDF must be refused.');
        } catch (AttachmentRejectedException) {
            $this->addToAssertionCount(1);
        }

        $this->expectException(AttachmentRejectedException::class);
        $extractor->validate(self::FIXTURES . '/encrypted.pdf');
    }

    #[Test]
    public function docxTextIsExtractedAndACorruptFileIsRefused(): void
    {
        $extractor = new DocxExtractor();

        self::assertStringContainsString('Hello DOCX', $extractor->extract(self::FIXTURES . '/sample.docx'));

        $this->expectException(AttachmentRejectedException::class);
        $extractor->validate(self::FIXTURES . '/corrupt.docx');
    }

    #[Test]
    public function plainTextIsReadVerbatimAndAMissingFileIsRefused(): void
    {
        $extractor = new PlainTextExtractor();

        self::assertSame('Hello TXT', $extractor->extract(self::FIXTURES . '/sample.txt'));

        $this->expectException(AttachmentRejectedException::class);
        $extractor->validate('/nonexistent/file.txt');
    }

    #[Test]
    public function theSpreadsheetExtractorReportsItsAvailabilityHonestly(): void
    {
        $extractor = new XlsxExtractor();

        self::assertSame(class_exists('PhpOffice\PhpSpreadsheet\IOFactory'), $extractor->isAvailable());
        if (!$extractor->isAvailable()) {
            $this->expectException(AttachmentRejectedException::class);
            $extractor->validate(self::FIXTURES . '/corrupt.xlsx');
        }
    }

    #[Test]
    public function theRegistryIsTheAllowlistOfAvailableExtractors(): void
    {
        $registry = new DocumentExtractorRegistry([
            new PlainTextExtractor(),
            self::extractor(['application/x-unavailable'], false, 0),
            self::extractor(['application/x-small'], true, 1024),
        ]);

        self::assertTrue($registry->canExtract('text/plain'));
        self::assertFalse($registry->canExtract('application/x-unavailable'));
        self::assertSame(1024, $registry->maxBytes('application/x-small'));
        self::assertSame(0, $registry->maxBytes('application/x-unavailable'));
        self::assertContains('txt', $registry->extensions());
        self::assertNotContains('application/x-unavailable', $registry->mimeTypes());
    }

    #[Test]
    public function anUnknownTypeIsRefusedByName(): void
    {
        $this->expectException(AttachmentRejectedException::class);
        $this->expectExceptionMessageMatches('/application\/unknown/');

        (new DocumentExtractorRegistry([]))->extract('/path', 'application/unknown');
    }

    /**
     * @param list<string> $mimeTypes
     */
    private static function extractor(array $mimeTypes, bool $available, int $maxBytes): DocumentExtractorInterface
    {
        $stub = self::createStub(DocumentExtractorInterface::class);
        $stub->method('mimeTypes')->willReturn($mimeTypes);
        $stub->method('extensions')->willReturn(['bin']);
        $stub->method('isAvailable')->willReturn($available);
        $stub->method('maxBytes')->willReturn($maxBytes);

        return $stub;
    }
}

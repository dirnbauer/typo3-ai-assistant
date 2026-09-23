<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Attachment\Document;

use Override;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Throwable;
use Webconsulting\WebconAiAssistant\Chat\Attachment\AttachmentRejectedException;

/**
 * Spreadsheets, when phpoffice/phpspreadsheet is installed — a suggested, not
 * required, dependency.
 *
 * {@see DocumentExtractorRegistry} drops an extractor that reports itself
 * unavailable before anything can reach it, so the library is only ever named
 * below the `isAvailable()` gate and may be used directly.
 */
final class XlsxExtractor implements DocumentExtractorInterface
{
    #[Override]
    public function mimeTypes(): array
    {
        return ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    }

    #[Override]
    public function extensions(): array
    {
        return ['xlsx'];
    }

    #[Override]
    public function maxBytes(): int
    {
        return 15 * 1024 * 1024;
    }

    #[Override]
    public function isAvailable(): bool
    {
        return class_exists(IOFactory::class);
    }

    #[Override]
    public function validate(string $path): void
    {
        $this->load($path, 1795000430);
    }

    #[Override]
    public function extract(string $path): string
    {
        $lines = [];
        foreach ($this->load($path, 1795000431)->getWorksheetIterator() as $worksheet) {
            $lines[] = $worksheet->getTitle();
            foreach ($worksheet->toArray(null, true, true, false) as $row) {
                $cells = array_values(array_filter(
                    array_map(static fn(mixed $cell): string => is_scalar($cell) ? trim((string)$cell) : '', is_array($row) ? $row : []),
                    static fn(string $cell): bool => $cell !== '',
                ));
                if ($cells !== []) {
                    $lines[] = implode("\t", $cells);
                }
            }
        }

        return trim(implode("\n", $lines));
    }

    private function load(string $path, int $code): Spreadsheet
    {
        try {
            return IOFactory::load($path);
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException(
                'XLSX could not be read: ' . $exception->getMessage(),
                $code,
                $exception,
                ['reason' => $exception->getMessage()],
            );
        }
    }
}

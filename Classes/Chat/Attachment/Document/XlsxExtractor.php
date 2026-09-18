<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment\Document;

use Throwable;
use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;

/**
 * Spreadsheets, when phpoffice/phpspreadsheet is installed (a suggested, not
 * required, dependency). The library is reached by name so the class loads —
 * and reports itself unavailable — without it.
 */
final class XlsxExtractor implements DocumentExtractorInterface
{
    private const IO_FACTORY = 'PhpOffice\PhpSpreadsheet\IOFactory';

    public function mimeTypes(): array
    {
        return ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    }

    public function extensions(): array
    {
        return ['xlsx'];
    }

    public function maxBytes(): int
    {
        return 15 * 1024 * 1024;
    }

    public function isAvailable(): bool
    {
        return class_exists(self::IO_FACTORY);
    }

    public function validate(string $path): void
    {
        $this->load($path, 1795000430);
    }

    public function extract(string $path): string
    {
        $spreadsheet = $this->load($path, 1795000431);
        $lines = [];
        foreach ($spreadsheet->getWorksheetIterator() as $worksheet) {
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

    /**
     * @return \PhpOffice\PhpSpreadsheet\Spreadsheet
     */
    private function load(string $path, int $code): object
    {
        try {
            $load = [self::IO_FACTORY, 'load'];
            if (!is_callable($load)) {
                throw new AttachmentRejectedException('phpoffice/phpspreadsheet is not installed.', $code);
            }
            $spreadsheet = $load($path);
            if (!is_object($spreadsheet) || !method_exists($spreadsheet, 'getWorksheetIterator')) {
                throw new AttachmentRejectedException('The spreadsheet could not be opened.', $code);
            }

            /** @var \PhpOffice\PhpSpreadsheet\Spreadsheet $spreadsheet */
            return $spreadsheet;
        } catch (AttachmentRejectedException $exception) {
            throw $exception;
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException('XLSX could not be read: ' . $exception->getMessage(), $code, $exception);
        }
    }
}

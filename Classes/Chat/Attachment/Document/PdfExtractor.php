<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment\Document;

use Smalot\PdfParser\Parser;
use Throwable;
use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;

final class PdfExtractor implements DocumentExtractorInterface
{
    public function mimeTypes(): array
    {
        return ['application/pdf'];
    }

    public function extensions(): array
    {
        return ['pdf'];
    }

    public function maxBytes(): int
    {
        return 20 * 1024 * 1024;
    }

    public function isAvailable(): bool
    {
        return class_exists(Parser::class);
    }

    public function validate(string $path): void
    {
        try {
            $details = (new Parser())->parseFile($path)->getDetails();
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException('PDF validation failed: ' . $exception->getMessage(), 1795000410, $exception);
        }

        if (isset($details['Encrypt'])) {
            throw new AttachmentRejectedException('The PDF is encrypted and cannot be read.', 1795000411);
        }
    }

    public function extract(string $path): string
    {
        try {
            return (new Parser())->parseFile($path)->getText();
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException('PDF extraction failed: ' . $exception->getMessage(), 1795000412, $exception);
        }
    }
}

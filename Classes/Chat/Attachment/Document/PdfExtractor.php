<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Attachment\Document;

use Override;
use Smalot\PdfParser\Parser;
use Throwable;
use Webconsulting\WebconAiAssistant\Chat\Attachment\AttachmentRejectedException;

final class PdfExtractor implements DocumentExtractorInterface
{
    #[Override]
    public function mimeTypes(): array
    {
        return ['application/pdf'];
    }

    #[Override]
    public function extensions(): array
    {
        return ['pdf'];
    }

    #[Override]
    public function maxBytes(): int
    {
        return 20 * 1024 * 1024;
    }

    #[Override]
    public function isAvailable(): bool
    {
        return class_exists(Parser::class);
    }

    #[Override]
    public function validate(string $path): void
    {
        try {
            $details = new Parser()->parseFile($path)->getDetails();
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException(
                'PDF validation failed: ' . $exception->getMessage(),
                1795000410,
                $exception,
                ['reason' => $exception->getMessage()],
            );
        }

        if (isset($details['Encrypt'])) {
            throw new AttachmentRejectedException('The PDF is encrypted and cannot be read.', 1795000411);
        }
    }

    #[Override]
    public function extract(string $path): string
    {
        try {
            return new Parser()->parseFile($path)->getText();
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException(
                'PDF extraction failed: ' . $exception->getMessage(),
                1795000412,
                $exception,
                ['reason' => $exception->getMessage()],
            );
        }
    }
}

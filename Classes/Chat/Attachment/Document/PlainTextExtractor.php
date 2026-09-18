<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment\Document;

use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;

final class PlainTextExtractor implements DocumentExtractorInterface
{
    public function mimeTypes(): array
    {
        return ['text/plain', 'text/markdown', 'text/csv'];
    }

    public function extensions(): array
    {
        return ['txt', 'md', 'csv'];
    }

    public function maxBytes(): int
    {
        return 2 * 1024 * 1024;
    }

    public function isAvailable(): bool
    {
        return true;
    }

    public function validate(string $path): void
    {
        if (!is_readable($path)) {
            throw new AttachmentRejectedException('The file is not readable.', 1795000440);
        }
    }

    public function extract(string $path): string
    {
        $content = @file_get_contents($path);
        if ($content === false) {
            throw new AttachmentRejectedException('The file could not be read.', 1795000441);
        }

        return $content;
    }
}

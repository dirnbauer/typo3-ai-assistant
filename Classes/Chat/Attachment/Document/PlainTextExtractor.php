<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Attachment\Document;

use Override;
use Webconsulting\WebconAiAssistant\Chat\Attachment\AttachmentRejectedException;

final class PlainTextExtractor implements DocumentExtractorInterface
{
    #[Override]
    public function mimeTypes(): array
    {
        return ['text/plain', 'text/markdown', 'text/csv'];
    }

    #[Override]
    public function extensions(): array
    {
        return ['txt', 'md', 'csv'];
    }

    #[Override]
    public function maxBytes(): int
    {
        return 2 * 1024 * 1024;
    }

    #[Override]
    public function isAvailable(): bool
    {
        return true;
    }

    #[Override]
    public function validate(string $path): void
    {
        if (!is_readable($path)) {
            throw new AttachmentRejectedException('The file is not readable.', 1795000440);
        }
    }

    #[Override]
    public function extract(string $path): string
    {
        $content = @file_get_contents($path);
        if ($content === false) {
            throw new AttachmentRejectedException('The file could not be read.', 1795000441);
        }

        return $content;
    }
}

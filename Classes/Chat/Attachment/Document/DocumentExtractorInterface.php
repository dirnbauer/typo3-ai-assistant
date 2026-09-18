<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment\Document;

use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;

/**
 * Reads the text out of one kind of document.
 */
interface DocumentExtractorInterface
{
    /** @return list<string> MIME types this extractor handles */
    public function mimeTypes(): array;

    /** @return list<string> file extensions without dot, for the client's accept filter */
    public function extensions(): array;

    /** The largest file of this kind the chat accepts, in bytes. */
    public function maxBytes(): int;

    /** False when a required optional library is not installed. */
    public function isAvailable(): bool;

    /**
     * A lightweight open check — no full extraction.
     *
     * @throws AttachmentRejectedException when the file is corrupt, unreadable or encrypted
     */
    public function validate(string $path): void;

    /**
     * @throws AttachmentRejectedException on extraction failure
     */
    public function extract(string $path): string;
}

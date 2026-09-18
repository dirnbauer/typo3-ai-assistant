<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment\Document;

use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;

/**
 * The attachment allowlist: exactly the MIME types an available extractor
 * handles, each with its own size cap.
 */
final readonly class DocumentExtractorRegistry
{
    /** @var list<DocumentExtractorInterface> */
    private array $extractors;

    /**
     * @param iterable<DocumentExtractorInterface> $extractors
     */
    public function __construct(iterable $extractors)
    {
        $this->extractors = array_values(array_filter(
            [...$extractors],
            static fn(DocumentExtractorInterface $extractor): bool => $extractor->isAvailable(),
        ));
    }

    /**
     * @return list<string>
     */
    public function mimeTypes(): array
    {
        return array_values(array_unique(array_merge(
            ...array_map(static fn(DocumentExtractorInterface $e): array => $e->mimeTypes(), $this->extractors),
        )));
    }

    /**
     * @return list<string>
     */
    public function extensions(): array
    {
        return array_values(array_unique(array_merge(
            ...array_map(static fn(DocumentExtractorInterface $e): array => $e->extensions(), $this->extractors),
        )));
    }

    public function canExtract(string $mimeType): bool
    {
        return $this->find($mimeType) !== null;
    }

    /**
     * 0 when the type is not accepted at all.
     */
    public function maxBytes(string $mimeType): int
    {
        return $this->find($mimeType)?->maxBytes() ?? 0;
    }

    public function validate(string $path, string $mimeType): void
    {
        $this->require($mimeType)->validate($path);
    }

    public function extract(string $path, string $mimeType): string
    {
        return $this->require($mimeType)->extract($path);
    }

    private function find(string $mimeType): ?DocumentExtractorInterface
    {
        foreach ($this->extractors as $extractor) {
            if (in_array($mimeType, $extractor->mimeTypes(), true)) {
                return $extractor;
            }
        }

        return null;
    }

    private function require(string $mimeType): DocumentExtractorInterface
    {
        return $this->find($mimeType)
            ?? throw new AttachmentRejectedException('This file type is not supported: ' . $mimeType, 1795000401);
    }
}

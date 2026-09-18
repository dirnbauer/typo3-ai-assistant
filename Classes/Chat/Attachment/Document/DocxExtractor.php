<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment\Document;

use PhpOffice\PhpWord\Element\AbstractElement;
use PhpOffice\PhpWord\Element\Text;
use PhpOffice\PhpWord\Element\TextRun;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use Throwable;
use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;

final class DocxExtractor implements DocumentExtractorInterface
{
    public function mimeTypes(): array
    {
        return ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    }

    public function extensions(): array
    {
        return ['docx'];
    }

    public function maxBytes(): int
    {
        return 15 * 1024 * 1024;
    }

    public function isAvailable(): bool
    {
        return class_exists(PhpWord::class);
    }

    public function validate(string $path): void
    {
        $this->load($path, 1795000420);
    }

    public function extract(string $path): string
    {
        $paragraphs = [];
        foreach ($this->load($path, 1795000421)->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                $text = self::textOf($element);
                if ($text !== '') {
                    $paragraphs[] = $text;
                }
            }
        }

        return trim(implode("\n", $paragraphs));
    }

    /**
     * phpword raises E_DEPRECATED on PHP 8 for null XML attributes (Google Docs
     * exports); silenced during load so a readable file is not refused for it.
     */
    private function load(string $path, int $code): PhpWord
    {
        $previous = error_reporting(error_reporting() & ~E_DEPRECATED);
        try {
            return IOFactory::load($path);
        } catch (Throwable $exception) {
            throw new AttachmentRejectedException('DOCX could not be read: ' . $exception->getMessage(), $code, $exception);
        } finally {
            error_reporting($previous);
        }
    }

    private static function textOf(AbstractElement $element): string
    {
        if ($element instanceof Text) {
            return $element->getText() ?? '';
        }
        if ($element instanceof TextRun) {
            return implode('', array_map(self::textOf(...), $element->getElements()));
        }

        return '';
    }
}

<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Attachment;

use Override;
use RuntimeException;
use Throwable;
use Webconsulting\WebconAiAssistant\Chat\LocalizableException;

/**
 * A file the chat will not take: wrong type, too large, corrupt, encrypted.
 * The API answers it with 422 and the message in the user's language.
 */
final class AttachmentRejectedException extends RuntimeException implements LocalizableException
{
    /**
     * @param array<string, int|string> $arguments the label's named arguments
     */
    public function __construct(
        string $message,
        int $code,
        ?Throwable $previous = null,
        private readonly array $arguments = [],
    ) {
        parent::__construct($message, $code, $previous);
    }

    #[Override]
    public function labelArguments(): array
    {
        return $this->arguments;
    }
}

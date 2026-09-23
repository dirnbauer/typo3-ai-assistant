<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Api;

use Override;
use RuntimeException;
use Webconsulting\WebconAiAssistant\Chat\LocalizableException;

/**
 * A request the API refuses, with the HTTP status that says why. The message
 * is shown to the user, in their language.
 */
final class ApiException extends RuntimeException implements LocalizableException
{
    /**
     * @param array<string, int|string> $arguments the label's named arguments
     */
    public function __construct(
        string $message,
        public readonly int $status,
        int $code,
        private readonly array $arguments = [],
    ) {
        parent::__construct($message, $code);
    }

    #[Override]
    public function labelArguments(): array
    {
        return $this->arguments;
    }
}

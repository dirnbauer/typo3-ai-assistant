<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat;

use Override;
use RuntimeException;
use Throwable;

/**
 * A request that conflicts with the conversation's state: not configured, busy,
 * not waiting for the decision it was given. The API answers it with 409 and
 * the message in the user's language, so every message here is written for
 * the user.
 */
final class ChatException extends RuntimeException implements LocalizableException
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

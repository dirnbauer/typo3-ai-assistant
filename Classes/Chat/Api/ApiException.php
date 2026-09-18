<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Api;

use RuntimeException;

/**
 * A request the API refuses, with the HTTP status that says why. The message
 * is shown to the user verbatim.
 */
final class ApiException extends RuntimeException
{
    public function __construct(
        string $message,
        public readonly int $status,
    ) {
        parent::__construct($message, $status);
    }
}

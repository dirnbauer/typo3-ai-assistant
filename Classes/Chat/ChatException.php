<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat;

use RuntimeException;

/**
 * A request that conflicts with the conversation's state: not configured, busy,
 * not waiting for the decision it was given. The API answers it with 409 and
 * the message verbatim, so every message here is written for the user.
 */
final class ChatException extends RuntimeException {}

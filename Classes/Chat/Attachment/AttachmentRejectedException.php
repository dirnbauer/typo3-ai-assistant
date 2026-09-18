<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Attachment;

use RuntimeException;

/**
 * A file the chat will not take: wrong type, too large, corrupt, encrypted.
 * The API answers it with 422 and the message verbatim.
 */
final class AttachmentRejectedException extends RuntimeException {}

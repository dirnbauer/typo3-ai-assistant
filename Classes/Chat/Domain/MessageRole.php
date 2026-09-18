<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Domain;

/**
 * The author of one transcript row.
 */
enum MessageRole: string
{
    case System = 'system';
    case User = 'user';
    case Assistant = 'assistant';
    case Tool = 'tool';
}

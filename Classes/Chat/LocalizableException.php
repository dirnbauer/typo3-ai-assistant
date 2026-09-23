<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat;

use Throwable;

/**
 * An exception whose message a user reads.
 *
 * Its code names the label (`error.<code>` in the `webcon_ai_assistant.messages`
 * domain) and these are the named ICU arguments the label is formatted with.
 * The English message stays what the exception says in logs and on the CLI.
 */
interface LocalizableException extends Throwable
{
    /**
     * @return array<string, int|string>
     */
    public function labelArguments(): array;
}

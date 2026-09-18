<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Backend;

/**
 * How a shadcn module divides its space.
 *
 * The value is what the `<shadcn-ui-shell layout="…">` attribute carries, so the
 * enum is the whole contract between PHP and the runtime on this point.
 */
enum ShellLayout: string
{
    /** The AI chat rail on the left, the extension's app on the right. */
    case ChatLeft = 'chat-left';

    /** The app alone, full width. */
    case Full = 'full';
}

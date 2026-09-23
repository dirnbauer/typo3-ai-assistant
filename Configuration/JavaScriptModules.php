<?php

declare(strict_types=1);

/**
 * Plain ES modules, served as they are written: no bundler, no framework of
 * their own. The widgets are Lit elements rendering into the light DOM, so the
 * backend's own stylesheet styles them; Lit, marked and DOMPurify come from the
 * core import map.
 */
return [
    'dependencies' => ['backend', 'core'],
    'tags' => [
        'backend.module',
    ],
    'imports' => [
        '@webconsulting/ai-assistant/' => 'EXT:webcon_ai_assistant/Resources/Public/JavaScript/',
    ],
];

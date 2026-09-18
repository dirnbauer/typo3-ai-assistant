<?php

declare(strict_types=1);

/**
 * The importmap entries other extensions build on.
 *
 * `@webconsulting/shadcn-ui/runtime.js` bundles React 19 ONCE and exports it
 * with every component; an app built on the base imports from there and ships
 * no React of its own. The launcher is the only unbundled file: it puts the
 * floating panel into the top document and loads the runtime on first use.
 */
return [
    'dependencies' => ['backend'],
    'tags' => [
        'backend.module',
    ],
    'imports' => [
        '@webconsulting/shadcn-ui/' => 'EXT:shadcn_ui/Resources/Public/JavaScript/Dist/',
        '@webconsulting/shadcn-ui/launcher.js' => 'EXT:shadcn_ui/Resources/Public/JavaScript/launcher.js',
    ],
];

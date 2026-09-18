<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Backend;

/**
 * One React app a backend module mounts into the shadcn shell.
 *
 * The name must match what the JavaScript module registers with
 * `defineShadcnApp(name, Component)`; the runtime resolves the app by that name
 * once the module has loaded. Props are serialised into a JSON `<script>` next
 * to the shell element and handed to the component untouched.
 */
final readonly class ShadcnApp
{
    /**
     * @param string               $name     vendor-prefixed app name, e.g. `my_ext/dashboard`
     * @param string               $jsModule importmap specifier of the module that calls
     *                                       `defineShadcnApp()`, e.g. `@vendor/my-ext/dashboard.js`
     * @param array<string, mixed> $props    JSON-serialisable props for the component
     */
    public function __construct(
        public string $name,
        public string $jsModule,
        public array $props = [],
        public ShellLayout $layout = ShellLayout::ChatLeft,
        public string $title = '',
    ) {}
}

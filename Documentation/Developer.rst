..  include:: /Includes.rst.txt

=========
Developer
=========

Build your own module on the base
=================================

Two files and a vite config. The result is a backend module with the chat rail
on the left and your React app on the right.

The controller
--------------

..  code-block:: php

    <?php
    declare(strict_types=1);

    namespace MyVendor\MyExt\Controller;

    use Psr\Http\Message\ResponseInterface;
    use Psr\Http\Message\ServerRequestInterface;
    use Webconsulting\ShadcnUi\Backend\ShadcnApp;
    use Webconsulting\ShadcnUi\Backend\ShadcnModuleRenderer;
    use Webconsulting\ShadcnUi\Backend\ShellLayout;

    final readonly class DashboardController
    {
        public function __construct(private ShadcnModuleRenderer $renderer) {}

        public function index(ServerRequestInterface $request): ResponseInterface
        {
            return $this->renderer->render($request, new ShadcnApp(
                name: 'my_ext/dashboard',                        // matches defineShadcnApp()
                jsModule: '@my-vendor/my-ext/dashboard.js',       // an import-map specifier
                props: ['rows' => $this->rows()],                 // JSON-serialisable
                layout: ShellLayout::ChatLeft,                    // or ShellLayout::Full
                title: 'Dashboard',
            ));
        }
    }

Register the controller as :php:`public: true` in :file:`Services.yaml`, point a
module in :file:`Configuration/Backend/Modules.php` at
:php:`DashboardController::index`, and declare the JavaScript module in
:file:`Configuration/JavaScriptModules.php`.

The app
-------

..  code-block:: tsx

    import { defineShadcnApp, ui, type AppProps } from '@webconsulting/shadcn-ui/runtime.js';

    const { Button, Card, CardContent, CardHeader, CardTitle, Table } = ui;

    defineShadcnApp('my_ext/dashboard', ({ props, shell }: AppProps) => {
      const rows = Array.isArray(props.rows) ? props.rows : [];

      return (
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>{/* … */}</Table>
            <Button onClick={shell.openChat}>Ask the assistant</Button>
          </CardContent>
        </Card>
      );
    });

The build
---------

React is **not** bundled: it is external and resolved through TYPO3's import map
to the one copy the runtime ships, so two shadcn modules on one page share one
React.

..  code-block:: ts

    // vite.config.ts
    export default defineConfig({
      build: {
        lib: { entry: 'src/main.tsx', formats: ['es'], fileName: () => 'dashboard.js' },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', '@webconsulting/shadcn-ui/runtime.js'],
          output: {
            paths: {
              react: '@webconsulting/shadcn-ui/react.js',
              'react-dom': '@webconsulting/shadcn-ui/react-dom.js',
              'react/jsx-runtime': '@webconsulting/shadcn-ui/jsx-runtime.js',
            },
          },
        },
      },
    });

:file:`Build/Frontend/vite.demo.config.ts` and :file:`Build/Frontend/demo/` in
this extension are exactly that configuration and exactly that app: the
:guilabel:`shadcn/ui Components` module is built as an external app on purpose,
so a broken contract breaks a module somebody looks at.

The API your app gets
=====================

..  code-block:: ts

    interface AppProps {
      props: Record<string, unknown>;   // what the PHP controller passed
      shell: ShellApi;
    }

    interface ShellApi {
      layout: 'chat-left' | 'full';
      chatOpen: boolean;
      openChat(): void;
      closeChat(): void;
      toggleChat(): void;
      setContext(context: Record<string, unknown>): void;
      openCommandPalette(): void;
      focusComposer(): void;
    }

:ts:`shell.setContext()` is how the chat learns what your app is showing. What
you pass travels with the next message as `appContext`, so "delete the selected
rows" can mean something. It is read at send time and does not re-render
anything.

:ts:`useTypo3()` returns :ts:`{ ajaxUrls, lang, theme, user }`; :ts:`useShell()`
returns the same object your component receives, for a component deeper in the
tree. :ts:`cn()` is the class merger every shadcn component uses.

The full export list, the `ui` namespace and the AJAX contract are in
:file:`Build/Frontend/CONTRACT.md`.

Things that will bite you
=========================

Tailwind v4 in a Shadow DOM
    Tailwind registers its :css:`--tw-*` properties with :css:`@property`, which
    registers into the **document**. A stylesheet adopted only by a shadow root
    never registers them, :css:`var(--tw-border-style)` resolves to nothing, and
    every border, ring, shadow and transform silently disappears.
    :file:`src/styles/shadow-css.ts` removes the :css:`@supports` gate around
    Tailwind's own fallback block so it always applies. If you ship your own
    stylesheet into a shadow root, do the same.

Portals
    Radix renders every floating layer into a portal. The shell gives it a
    container **inside** the shadow root, so a dialog opened from a module is
    styled by this stylesheet instead of landing unstyled in the backend
    document. Use :ts:`ui`'s dialog, sheet, popover and tooltip and this is
    already handled.

Registration order
    The runtime and your app both load through the import map, in no guaranteed
    order. The registry is observable and the outlet subscribes to it, so
    calling :ts:`defineShadcnApp()` late is fine. If the name never arrives, the
    module says which module should have registered it and lists the ones that
    did — the usual cause is a typo in one of the two names.

The chat's own architecture
===========================

One pipeline, three entry points. :php:`TurnRunner::start()`,
:php:`::approve()` and :php:`::answer()` differ only in what they check first
and which runtime call they make; everything after that is shared — claim the
conversation, drive `nr-llm`, record the steps, persist the rows, settle the
conversation into the state the outcome demands.

Turns are **synchronous**, always. The MCP tools read the ambient backend user
and refuse to run when that user is not the run's actor; a queue worker has no
ambient user, so a queued turn would fail closed on every call.

`tx_shadcnui_conversation.status` is the lock. Starting a turn is a
compare-and-swap on it, so two tabs pressing send at the same moment cannot both
run against one transcript — the loser is told the conversation is busy.

Testing
=======

..  code-block:: bash

    composer ci          # phpstan (level 8), php-cs-fixer, unit + functional
    npm run lint         # tsc --noEmit, then eslint
    npm test             # vitest
    npm run build        # must leave Dist/ byte-identical; CI asserts it

:php:`Webconsulting\ShadcnUi\Testing\ScriptedProvider` is an `nr-llm` provider
that says whatever a test told it to say, so a whole turn — suspension, resume,
transcript, settlement — can be exercised without a network. It is registered
only when the application context is Development or Testing **and**
:envvar:`SHADCN_UI_SCRIPTED_PROVIDER=1`; two independent conditions, because
either one alone is the kind of thing that gets turned on by accident.

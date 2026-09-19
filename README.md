# shadcn/ui for the TYPO3 backend

[![CI](https://github.com/dirnbauer/typo3-shadcn-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/dirnbauer/typo3-shadcn-ui/actions/workflows/ci.yml)
[![TYPO3 14.3](https://img.shields.io/badge/TYPO3-14.3-orange.svg)](https://get.typo3.org/version/14)
[![PHP 8.4](https://img.shields.io/badge/PHP-8.4%2B-777bb3.svg)](https://www.php.net/)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)

A shadcn/ui runtime for TYPO3 backend modules — React 19, Tailwind v4, Shadow DOM — and the AI chat
built on it, which answers questions about *this* installation and changes it on request through the
installation's own MCP tools. Reads happen; every write stops and asks first.

## What it is

**The base.** One PHP controller and one TSX file are a backend module: an AI chat rail on the left,
your React app on the right, or full width without the chat. React is bundled once and loaded through
TYPO3's import map, so two shadcn modules on one page share one copy.

**The chat.** The reference implementation of an app on that base, and the only backend chat in this
portfolio. It runs on [nr-llm](https://github.com/netresearch/t3x-nr-llm)'s agent runtime — provider,
model, budget and guardrails all belong there — and calls the MCP tools of
[typo3-mcp-server](https://github.com/dirnbauer/typo3-mcp-server) **in process**, as the signed-in
backend user. No HTTP self-call, no tool server to register.

It appears in three places: the rail of every shadcn module, its own **Admin Tools → AI Chat** module,
and a floating panel from a toolbar button that survives module navigation.

## Requirements

| Requirement            | Version                                   |
| ---------------------- | ----------------------------------------- |
| TYPO3                  | 14.3 LTS                                  |
| PHP                    | 8.4+                                      |
| netresearch/nr-llm     | ^0.35, with one working configuration     |
| hn/typo3-mcp-server    | ^0.8 (the `dirnbauer` fork)               |
| phpoffice/phpspreadsheet | optional — adds XLSX attachments        |

## Install

```bash
composer config repositories.typo3-mcp-server vcs https://github.com/dirnbauer/typo3-mcp-server.git
composer config repositories.typo3-abilities vcs https://github.com/dirnbauer/typo3-abilities.git
composer require webconsulting/typo3-shadcn-ui
vendor/bin/typo3 extension:setup
```

## Configure

**Admin Tools → Settings → Extension Configuration → shadcn_ui**

| Key                 | Default          | What it does                                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------- |
| `llmConfiguration`  | `backend-assistant` | The nr-llm configuration identifier the chat runs under          |
| `allowWrites`       | `0`              | Let a conversation's auto-approve switch skip the approval card      |
| `maxTurnsPerHour`   | `60`             | Turns one backend user may start per hour (0 = no limit)             |
| `attachmentStorage` | `1:/shadcn_ui/`  | FAL folder attachments are stored below                              |
| `panelEnabled`      | `1`              | Offer the floating chat panel from the toolbar                       |

Narrow which tools a group may reach in user TSconfig — intersected with nr-llm's own tool policy,
which nothing here can widen:

```typoscript
tx_shadcnui.tools.deny = typo3_WriteTable, typo3_SafeCli
```

Instruction records (**Records**, root level) are merged into every conversation's system prompt and
can be scoped to backend groups. Schedule retention:

```bash
vendor/bin/typo3 shadcn-ui:chat:cleanup --archive-after=30 --delete-after=90
```

A turn runs inside a request, so a request that dies leaves a conversation claimed — this command is
the only thing that releases it.

## Use

Enter sends, Shift+Enter is a newline, Esc stops a running turn, ⌘/Ctrl+K opens the command palette.
A write stops the turn and shows a card naming the tool and its arguments. The model can ask one
clarifying question of its own. Everything it changed is listed behind **Changes** in the header.
**Admin Tools → shadcn/ui Components** shows every component the runtime ships, in a real module.

## Develop

```php
return $this->renderer->render($request, new ShadcnApp(
    name: 'my_ext/dashboard',                  // matches defineShadcnApp()
    jsModule: '@my-vendor/my-ext/dashboard.js', // an import-map specifier
    props: ['rows' => $rows],
    layout: ShellLayout::ChatLeft,
    title: 'Dashboard',
));
```

```tsx
import { defineShadcnApp, ui, type AppProps } from '@webconsulting/shadcn-ui/runtime.js';

defineShadcnApp('my_ext/dashboard', ({ props, shell }: AppProps) => { /* … */ });
```

Leave `react`, `react-dom`, `react/jsx-runtime` and the runtime external and point them at the
runtime's companion modules — `Build/Frontend/vite.demo.config.ts` is exactly that configuration, and
the Components module is exactly that app.

```bash
composer ci     # phpstan level 8, php-cs-fixer, unit + functional tests
npm run lint    # tsc --noEmit, then eslint
npm test        # vitest
npm run build   # must leave Resources/Public/JavaScript/Dist byte-identical
```

`Build/Frontend/CONTRACT.md` is the full JavaScript and AJAX contract.

## Docs

[`Documentation/`](Documentation/) — Introduction, Installation, Configuration, Usage, Developer.

## License

GPL-2.0-or-later. © webconsulting GmbH.

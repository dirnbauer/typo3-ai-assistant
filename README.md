# AI Assistant for the TYPO3 backend

[![CI](https://github.com/dirnbauer/typo3-ai-assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/dirnbauer/typo3-ai-assistant/actions/workflows/ci.yml)
[![TYPO3 14.3](https://img.shields.io/badge/TYPO3-14.3-orange.svg)](https://get.typo3.org/version/14)
[![PHP 8.4](https://img.shields.io/badge/PHP-8.4%2B-777bb3.svg)](https://www.php.net/)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)

A chat for the TYPO3 v14 backend that answers questions about *this* installation and changes it on
request, through the installation's own MCP tools. Reads happen; every write stops and asks first.

It runs on [nr-llm](https://github.com/netresearch/t3x-nr-llm)'s agent runtime — provider, model,
budget and guardrails all belong there — and calls the MCP tools of
[typo3-mcp-server](https://github.com/dirnbauer/typo3-mcp-server) **in process**, as the signed-in
backend user. No HTTP self-call, no tool server to register.

The interface is built from the backend's own parts: a Fluid module in the core's module layout,
Lit elements rendering the core's buttons, callouts, badges and forms into the light DOM, the core's
modal, notification and AJAX APIs, the core's colour tokens for light and dark mode, and labels in
English and German. No React, no Tailwind, no bundler.

This package replaces the earlier backend chat extension: the same chat engine under new names,
without the shadcn/ui runtime. An upgrade wizard carries existing installations over.

## Where it appears

- **Administration → AI Assistant → Chat** — the conversation list, the chat, and what the
  conversation did: changes, tool calls, usage, limits, the model and the instructions in force.
- **Administration → AI Assistant → Instructions** (administrators) — the instruction records
  written into every conversation's system prompt, edited through FormEngine.
- **The backend toolbar** — the chat as a dropdown that survives module navigation and knows the
  page and module you have open.

## Requirements

| Requirement              | Version                                   |
| ------------------------ | ----------------------------------------- |
| TYPO3                    | 14.3 LTS                                  |
| PHP                      | 8.4+                                      |
| netresearch/nr-llm       | ^0.35, with one working configuration     |
| hn/typo3-mcp-server      | ^0.9 (the `dirnbauer` fork)               |
| phpoffice/phpspreadsheet | optional — adds XLSX attachments          |

## Install

```bash
composer config repositories.typo3-mcp-server vcs https://github.com/dirnbauer/typo3-mcp-server.git
composer config repositories.typo3-abilities vcs https://github.com/dirnbauer/typo3-abilities.git
composer config repositories.typo3-ai-assistant vcs https://github.com/dirnbauer/typo3-ai-assistant.git
composer require webconsulting/typo3-ai-assistant:^2.0
vendor/bin/typo3 extension:setup -e webcon_ai_assistant
```

### Upgrading an existing installation

```bash
vendor/bin/typo3 upgrade:run webconAiAssistantMigrateFromShadcnUi
```

The wizard copies conversations, messages and instructions from the `tx_shadcnui_*` tables (keeping
their uids), the `shadcn_ui` extension configuration, module permissions (`tools_shadcnui_chat` →
`tools_webconaiassistant` + `tools_webconaiassistant_chat`), database TSconfig
(`tx_shadcnui.tools` → `tx_webconaiassistant.tools`), bookmarks and the nr-llm switch of the
`ask_user` tool group (`shadcn_ui` → `webcon_ai_assistant`). Rename `tx_shadcnui.tools` in
TSconfig files and `shadcn-ui:chat:cleanup` → `ai-assistant:chat:cleanup` in your scheduler yourself.
Both packages can be installed side by side during the switch.

## Configure

**Administration → Settings → Extension Configuration → webcon_ai_assistant**

| Key                 | Default                    | What it does                                                    |
| ------------------- | -------------------------- | --------------------------------------------------------------- |
| `llmConfiguration`  | `backend-assistant`        | The nr-llm configuration identifier the chat runs under         |
| `allowWrites`       | `0`                        | Let a conversation approve its write tools in advance           |
| `maxTurnsPerHour`   | `60`                       | Turns one backend user may start per hour (0 = no limit)        |
| `attachmentStorage` | `1:/webcon_ai_assistant/`  | FAL folder attachments are stored below                         |
| `panelEnabled`      | `1`                        | Offer the chat in the backend toolbar                           |

Narrow which tools a group may reach in user TSconfig — intersected with nr-llm's own tool policy,
which nothing here can widen:

```typoscript
tx_webconaiassistant.tools.deny = typo3_WriteTable, typo3_SafeCli
```

Schedule retention:

```bash
vendor/bin/typo3 ai-assistant:chat:cleanup --archive-after=30 --delete-after=90
```

A turn runs inside a request, so a request that dies leaves a conversation claimed — this command is
the only thing that releases it.

## Use

Enter sends, Shift+Enter is a new line, Esc stops a running turn. A write stops the turn and shows a
card naming the tool and its arguments; the model can ask a clarifying question of its own; every
record it changed is listed on the conversation, one click away from FormEngine.

## Develop

```bash
composer ci      # php -l, PHPStan level 8, php-cs-fixer, unit + functional tests (sqlite locally)
npm ci
npm run lint     # ESLint over the ES modules
npm test         # node --test Tests/JavaScript
```

The JavaScript under `Resources/Public/JavaScript/` is served as written. The thread reducer, the SSE
parser and the payload decoders are pure and tested under Node; the elements are Lit, rendering into
the light DOM. See [`Documentation/Developer.rst`](Documentation/Developer.rst) for the API contract.

## Docs

[`Documentation/`](Documentation/) — Introduction, Installation, Configuration, Usage, Developer.

## License

GPL-2.0-or-later. © webconsulting GmbH.

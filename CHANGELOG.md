# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-09-26

### Fixed

- Cached MCP tool definitions are checked before being offered to a model. A
  stale definition with a top-level schema combinator is rebuilt, so one bad
  cache entry cannot reject the whole chat turn.
- Tool results in the chat show their bounded full text with line breaks instead
  of only a 280-character preview. Page trees open automatically, and saved
  tool results remain visible when a conversation is reopened.

## [2.0.0] - 2026-09-23

The successor of `webconsulting/typo3-shadcn-ui` 1.0.1: the same chat engine
under new names, with a user interface rebuilt from the TYPO3 v14 backend's own
parts. Versions 1.0.0 and 1.0.1 were released as `typo3-shadcn-ui`.

### Changed — breaking

- **Renamed.** Composer package `webconsulting/typo3-ai-assistant`, extension
  key `webcon_ai_assistant`, PHP namespace `Webconsulting\WebconAiAssistant`,
  tables `tx_webconaiassistant_conversation`, `_message` and `_instruction`,
  AJAX routes `webcon_ai_assistant_*` under `/ai-assistant/`, nr-llm tool
  group of `ask_user` `webcon_ai_assistant` (the tool name is unchanged), icons
  `webcon-ai-assistant-*`, import-map prefix `@webconsulting/ai-assistant/`,
  user TSconfig `tx_webconaiassistant.tools.allow/deny`, CLI command
  `ai-assistant:chat:cleanup` (was `shadcn-ui:chat:cleanup`), cache
  `webcon_ai_assistant_tools`, default attachment folder
  `1:/webcon_ai_assistant/`, test flags `WEBCON_AI_ASSISTANT_SCRIPTED_PROVIDER`
  and `WEBCON_AI_ASSISTANT_SCRIPT_FILE`.
- **Modules.** Administration → AI Assistant is a container with two
  submodules: *Chat* (`tools_webconaiassistant_chat`, path
  `/module/tools/ai-assistant/chat`, for every permitted user) and
  *Instructions* (`tools_webconaiassistant_instructions`, administrators). It
  replaces `tools_shadcnui_chat`.
- **Native backend UI.** The chat module is a Fluid template in the core's
  `Module` layout with a doc header ("New conversation", module menu, reload,
  bookmark), filled by three Lit elements that render into the light DOM —
  the conversation list, the chat and the details column — using the core's
  buttons, callouts, badges, list groups, dropdowns and forms, the core modal
  for renaming and deleting, and core notifications. Light and dark mode follow
  the core's tokens. Every label is in XLIFF, in English and German, loaded
  through the v14 `~labels/` import.
- **Toolbar.** The floating panel is now a core toolbar item with a dropdown
  holding the chat, created on first open. A badge on the icon shows a running
  turn and, louder, a pending approval or question.
- **Server messages are translated.** Refusals the API returns (empty message,
  busy conversation, unsupported file, …) are looked up by exception code in
  `webcon_ai_assistant.messages`, in the backend user's language.
- Instruction records scope to backend groups through a side-by-side select.

### Removed

- The shadcn/ui runtime for other extensions: `ShadcnModuleRenderer`,
  `ShadcnApp`, `ShellLayout`, `defineShadcnApp()`, the
  `@webconsulting/shadcn-ui/*` import-map entries and the committed React
  bundle.
- React, Tailwind CSS, the Shadow DOM shell, Vite and every npm runtime
  dependency; the only npm packages left are ESLint's.
- The *shadcn/ui Components* module (`tools_shadcnui_components`).

### Added

- **Upgrade wizard** `webconAiAssistantMigrateFromShadcnUi`: copies
  conversations, messages and instructions from `tx_shadcnui_*` (or their
  `zzz_deleted_` remains) keeping their uids, copies the `shadcn_ui`
  extension configuration while this one is still at its defaults, moves
  `tools_shadcnui_chat` in `groupMods`/`userMods` to the new modules and drops
  `tools_shadcnui_components`, rewrites `tx_shadcnui.` in database TSconfig,
  repoints bookmarks, and carries an administrator's nr-llm switch of the
  `ask_user` tool group (`shadcn_ui` → `webcon_ai_assistant`). Repeatable; it
  copies only what is missing.
- **Instructions module** listing every instruction with its scope and state,
  with create and edit through FormEngine and switch-on/off and delete through
  the DataHandler.
- Side-by-side installation with `typo3-shadcn-ui`: its `ask_user` tool and MCP
  catalogue registrations are withdrawn from nr-llm, which would otherwise
  refuse the duplicate tool name while building its registry.
- The status route reports each attachment extension's size cap, so the browser
  refuses an oversized file before uploading it.
- JavaScript tests under `node --test`, a label-completeness test in both
  languages, and functional tests for both modules, the toolbar item and the
  upgrade wizard.

### Fixed

- **MCP tools whose schema has a top-level `oneOf`/`anyOf` broke every turn.**
  OpenAI and Anthropic refuse such a function schema, and one refused tool
  fails the whole request (`GetPage` says "uid, pageId or url" that way). The
  catalogue now reduces the top level to a plain object and states the
  alternatives in the tool description.
- **Enabling `WriteTable` or `CreateSite` would have broken every turn on
  OpenAI**, which refuses a tool description over 1024 characters (theirs are
  1928 and 1792). A longer description is now cut at the last sentence that
  fits, and the rest moves into the parameter schema's description, so the
  model still reads it. Of the lab's 69 MCP tools, the four affected tools now
  pass both checks.
- **Approving a write showed nothing of the continued run.** Its events are
  numbered from one again, and the client dropped them as replays of the paused
  run's, leaving the approval card on screen; a decision now starts a new
  stream, as an answer already did.
- The toolbar button did not open the panel: the launcher looked for a class
  the toolbar item did not render.

### Dependencies

- `hn/typo3-mcp-server` ^0.8 → ^0.9 (0.9.1; its public PHP API is unchanged,
  the chat's tool tests pass against it), `phpoffice/phpword` ^1.0 → ^1.4,
  `smalot/pdfparser` ^2.0 → ^2.12.
- Development: PHPUnit ^13.3, PHPStan ^2.2, `saschaegerer/phpstan-typo3` ^3.1,
  `typo3/testing-framework` ^9.7, `friendsofphp/php-cs-fixer` ^3.95,
  `phpoffice/phpspreadsheet` ^5.10, ESLint ^10.11.

## 1.0.1 - 2026-09-19

### Changed

- `hn/typo3-mcp-server` is now required as `^0.8`. 0.8 hands every tool out as
  an `AbstractTool` and moved the `#[AdminOnly]` / `#[DevSiteOnly]` verdicts
  onto the tool itself, which is the API this release uses.

### Fixed

- **An admin-only third-party MCP tool was offered to every backend user under
  mcp_server 0.8.** The registry wraps a non-native tool in a
  `CompatibleToolAdapter`, whose own class carries no attributes, so
  `ToolEffectClassifier::requiresAdmin()` found nothing when it reflected what
  the registry returned. It now asks the tool through `isAdminOnly()`, which
  the adapter answers from the class it wraps. A unit test drives the real
  registry so the wrapping is part of what is proven.

## 1.0.0 - 2026-09-19

The first release.

### Added — the base

- `<shadcn-ui-shell>`, a custom element that mounts a React 19 application in a
  Shadow DOM with the shadcn/ui component set, a collapsible and resizable AI
  chat rail, and a ⌘K command palette. Light and dark follow the backend.
- `@webconsulting/shadcn-ui/runtime.js`: React, ReactDOM, the `ui` namespace
  (every shadcn component plus the chat and AI sets), `cn`, `defineShadcnApp()`,
  `useTypo3()` and `useShell()` — loaded through TYPO3's import map so two
  modules on one page share one React.
- `ShadcnApp`, `ShellLayout` and `ShadcnModuleRenderer`: a backend module built
  on the base is one PHP controller and one TSX file.
- **shadcn/ui Components**, a kitchen-sink module that is also the reference
  implementation — it is built as an external app, so it only renders if the
  contract holds.

### Added — the chat

- Conversations with a transcript, pinning, archiving and a soft delete.
- Turns streamed over server-sent events, or returned as one JSON document with
  the same event list when the client asks for that instead.
- The installation's own MCP tools (`hn/typo3-mcp-server`), executed in process
  as the signed-in backend user, through nr-llm's agent runtime.
- An approval card in front of every write, bound to the turn it belongs to.
  Optional per-conversation auto-approval, off unless the installation allows it
  and capped at five skipped pauses per turn.
- A clarifying question the model can ask, suspending the run until it is
  answered.
- Attachments — text, Markdown, CSV, PDF, Word and (with
  `phpoffice/phpspreadsheet`) Excel — with server-side text extraction and
  per-kind size caps.
- A per-conversation record of what the assistant changed, rebuilt from the
  transcript rather than the live run.
- Three placements: the rail of every shadcn module, the **AI Chat** module, and
  a floating panel from a toolbar button that survives module navigation.

### Added — operations

- Agent instructions as editable records (`tx_shadcnui_instruction`), merged
  into the system prompt and optionally scoped to backend groups.
- Per-group tool access through user TSconfig `tx_shadcnui.tools.allow/deny`,
  intersected with nr-llm's own tool policy.
- A sliding per-hour turn limit and a single-in-flight-turn lock per
  conversation.
- `shadcn-ui:chat:cleanup`: releases conversations a dead request left claimed,
  applies retention, and removes orphaned rows and files.

[2.0.0]: https://github.com/dirnbauer/typo3-ai-assistant/releases/tag/v2.0.0

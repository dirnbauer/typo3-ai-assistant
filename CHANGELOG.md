# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-09-19

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

## [1.0.0] - 2026-09-19

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

[1.0.1]: https://github.com/dirnbauer/typo3-shadcn-ui/releases/tag/v1.0.1
[1.0.0]: https://github.com/dirnbauer/typo3-shadcn-ui/releases/tag/v1.0.0

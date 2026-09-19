# Frontend contract — `@webconsulting/shadcn-ui`

What `Resources/Public/JavaScript/Dist/` provides and what the PHP side must emit. The
import map (`Configuration/JavaScriptModules.php`) maps `@webconsulting/shadcn-ui/` to
`EXT:shadcn_ui/Resources/Public/JavaScript/Dist/` and `@webconsulting/shadcn-ui/launcher.js`
to `Resources/Public/JavaScript/launcher.js`.

## Built files

| File | Purpose |
| --- | --- |
| `Dist/runtime.js` | The contract module. Defines `<shadcn-ui-shell>`, registers `shadcn_ui/chat-home`. |
| `Dist/react.js`, `Dist/react-dom.js`, `Dist/jsx-runtime.js` | Companions: `react`, `react-dom` and `react/jsx-runtime` re-exported from the one bundled copy, for an app's `output.paths` (below). |
| `Dist/components-demo.js` | The demo app `shadcn_ui/components`, built as an EXTERNAL app (imports the runtime, bundles no React). |
| `Dist/chunks/*.js` | Shared chunks. Never referenced by PHP. |

`npm run build` is reproducible (no hashes, no sourcemaps); CI asserts `git diff --exit-code`.

## `runtime.js` exports

`React`, `ReactDOM`, `jsx`, `jsxs`, `Fragment`, `defineShadcnApp(name, Component)`, `getShadcnApp`, `registeredApps`,
`ui` (namespace, every component below), `cn`, `useTypo3()`, `useShell()`, `ShadcnUiShellElement`, `defineShellElement`,
`OPEN_CHAT_EVENT`, `CLOSED_EVENT`.

- `AppProps = { props: Record<string, unknown>; shell: ShellApi }`
- `useTypo3()` → `{ ajaxUrls, lang, theme: 'light' | 'dark', user: { name } | null }`
- `useShell()` → `{ layout, chatOpen, openChat(), closeChat(), toggleChat(), setContext(obj), openCommandPalette(), focusComposer() }`
- `ui` contains: accordion, alert, attachment, avatar, badge, breadcrumb, bubble, button, card, checkbox, collapsible,
  command, dialog, dropdown-menu, empty, field, input, input-group, item, kbd, label, marker, message, message-scroller,
  popover, progress, scroll-area, select, separator, sheet, skeleton, sonner (`Toaster`, `toast`), spinner, switch, table,
  tabs, textarea, tooltip — plus the AI set: conversation, markdown, prompt-input, reasoning, shimmer, suggestion, tool.

## `<shadcn-ui-shell>`

```html
<shadcn-ui-shell layout="chat-left|full" app="vendor/app" props-id="shadcn-props-1"></shadcn-ui-shell>
<script type="application/json" id="shadcn-props-1">{"…":"…"}</script>

<shadcn-ui-shell variant="panel" open></shadcn-ui-shell>   <!-- floating chat; the launcher creates it in the TOP document -->
```

- The module shell sizes itself to `100dvh` minus its own top offset. Set `--sui-shell-bottom-gap` on it if the module
  body keeps bottom padding. The module body should not add its own scroll container around the shell.
- `data-conversation="12"` on the shell opens that conversation first (the AI Chat module also passes it as
  `props.conversation` to `shadcn_ui/chat-home`).
- The toolbar item must render `<button class="shadcn-ui-toolbar-btn" aria-expanded="false">…</button>` and load
  `@webconsulting/shadcn-ui/launcher.js`.

## Building an external app (the demo is the reference)

```ts
// vite.config.ts of the consuming extension
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
}
```

```tsx
import { defineShadcnApp, ui, useShell, useTypo3 } from '@webconsulting/shadcn-ui/runtime.js';
defineShadcnApp('my_ext/dashboard', ({ props, shell }) => { /* … */ });
```

`tsconfig` path alias for types: `"@webconsulting/shadcn-ui/runtime.js": ["<path to>/Build/Frontend/src/runtime.ts"]`
(or the published `.d.ts` once the package is on npm).

## AJAX routes read from `TYPO3.settings.ajaxUrls`

`shadcn_ui_chat_status`, `…_conversations`, `…_conversation_get`, `…_conversation_events`, `…_file_info`,
`…_conversation_create`, `…_conversation_turn`, `…_conversation_approval`, `…_conversation_input`, `…_conversation_cancel`,
`…_conversation_archive`, `…_conversation_pin`, `…_conversation_rename`, `…_conversation_delete`, `…_file_upload`.

Shapes: `Build/Frontend/src/state/types.ts`. Beyond typo3-ai-chat 2.0.1:

- `GET status?pageId=&appName=` → adds `instructions: [{uid,title}]`, `context: {pageId,pageTitle,workspace,appName}`.
- `POST conversations/create` body `{title, systemPrompt, appName?, pageId?}`.
- `POST conversations/turn` body `{conversation, content, attachments:[{fileUid}], context:{appName?, appContext?, pageId?}}`.
- `POST conversations/input` body `{conversation, runUuid, turnDigest, answer}` — answers `input.required`; same
  event stream as `turn`.
- Conversation rows carry `pendingInput` (`{}` or `{runUuid, turnDigest, question, options, allowFreeText}`) next to
  `pendingApproval`; `status` may be `awaiting_input`. Both cards also carry `calls` (the suspended run's pending tool
  calls) — server bookkeeping the client ignores.
- Message rows may carry `writeTargets: [{table, uid, kind: 'created'|'updated'}]`.
- SSE `step.tool.result` may carry `writeTarget: {table, uid, kind}`; `input.required` carries
  `{runUuid?, turnDigest, question, options?, allowFreeText}`.

Attachments are capped client-side per kind, matching the server's extractors (text 2 MB, PDF 20 MB, DOCX 15 MB, XLSX 15 MB;
`Build/Frontend/src/lib/attachments.ts`); the server stays the authority (413/422 are shown as given).

## Keyboard

Enter sends · Shift+Enter newline · Esc stops a running turn (composer) / closes the panel · ⌘K / Ctrl+K palette while
focus is inside the shell (TYPO3's live search keeps the keys outside it) · A–J pick an option on a clarifying question.

## Storage (`localStorage`, prefix `shadcnUi.`)

`rail.width`, `rail.collapsed`, `panel.width`, `panel.height`, `panel.minimized`, `chat.conversation`.

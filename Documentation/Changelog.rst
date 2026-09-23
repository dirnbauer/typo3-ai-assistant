..  include:: /Includes.rst.txt

=========
Changelog
=========

The full history is in :file:`CHANGELOG.md`.

2.0.0
=====

The successor of `webconsulting/typo3-shadcn-ui` 1.0.1, renamed and rebuilt from
the TYPO3 backend's own parts.

*   New names: `webconsulting/typo3-ai-assistant`, extension key
    `webcon_ai_assistant`, namespace `Webconsulting\WebconAiAssistant`, tables
    `tx_webconaiassistant_*`, modules `tools_webconaiassistant*`, command
    `ai-assistant:chat:cleanup`, TSconfig `tx_webconaiassistant.tools`.
*   A native user interface: Fluid module templates in the core layout, Lit
    elements in the light DOM, core modal, notification and AJAX APIs, core
    tokens for both colour schemes, English and German.
*   Removed: React, Tailwind, the Shadow DOM shell, the bundler, the shadcn/ui
    runtime for other extensions and the Components module.
*   An Instructions module, a toolbar dropdown, localized server messages, an
    upgrade wizard from `shadcn_ui`, and MCP tool schemas reduced to what
    providers accept.

1.0.1
=====

Support for `hn/typo3-mcp-server` 0.8 (as `typo3-shadcn-ui`).

1.0.0
=====

The first release (as `typo3-shadcn-ui`).

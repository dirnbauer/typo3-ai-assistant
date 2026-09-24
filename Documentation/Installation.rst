..  include:: /Includes.rst.txt

============
Installation
============

Requirements
============

..  list-table::
    :header-rows: 1

    *   -   Requirement
        -   Version
    *   -   TYPO3
        -   14.3 LTS
    *   -   PHP
        -   8.4 or newer
    *   -   netresearch/nr-llm
        -   0.35, with one working configuration
    *   -   hn/typo3-mcp-server
        -   0.9 (the `dirnbauer/typo3-mcp-server` fork)

Install
=======

The MCP server comes from a fork and its own dependency is not on Packagist, so
both repositories are declared before the package is required:

..  code-block:: bash

    composer config repositories.typo3-mcp-server vcs https://github.com/dirnbauer/typo3-mcp-server.git
    composer config repositories.typo3-abilities vcs https://github.com/dirnbauer/typo3-abilities.git
    composer config repositories.typo3-ai-assistant vcs https://github.com/dirnbauer/typo3-ai-assistant.git
    composer require webconsulting/typo3-ai-assistant:^2.0
    vendor/bin/typo3 extension:setup -e webcon_ai_assistant

`extension:setup` creates the tables the chat uses:
:sql:`tx_webconaiassistant_conversation`, :sql:`tx_webconaiassistant_message`
and :sql:`tx_webconaiassistant_instruction`, plus the cache table of the MCP
tool catalogue.

Upgrading an existing installation
==================================

This extension replaces `webconsulting/typo3-shadcn-ui` (extension key
`shadcn_ui`). Its chat is the same engine under new names; the shadcn/ui
runtime for backend modules and the Components module are gone.

1.  Require `webconsulting/typo3-ai-assistant` and run
    `vendor/bin/typo3 extension:setup -e webcon_ai_assistant`.
2.  Run the upgrade wizard :guilabel:`AI Assistant: migrate from shadcn/ui`
    (identifier `webconAiAssistantMigrateFromShadcnUi`), in the Install Tool or
    with `vendor/bin/typo3 upgrade:run webconAiAssistantMigrateFromShadcnUi`.
    It copies conversations, messages and instruction records from the
    `tx_shadcnui_*` tables — or their `zzz_deleted_` remains — keeping their
    uids; copies the `shadcn_ui` extension configuration while this
    extension's own is still at its defaults; moves module permissions from
    `tools_shadcnui_chat` to `tools_webconaiassistant` and
    `tools_webconaiassistant_chat`; rewrites `tx_shadcnui.` to
    `tx_webconaiassistant.` in the TSconfig stored on backend users and groups;
    points bookmarks of the old chat module at the new one; and carries an
    administrator's switch of the `ask_user` tool group in nr-llm's Tools module
    (`shadcn_ui`, now `webcon_ai_assistant`). It copies only what is missing,
    so it can run again.
3.  Rename `tx_shadcnui.tools` to `tx_webconaiassistant.tools` in TSconfig kept
    in **files**, and `shadcn-ui:chat:cleanup` to `ai-assistant:chat:cleanup`
    wherever the retention command is scheduled.
4.  Remove `webconsulting/typo3-shadcn-ui` once nothing else requires it. While
    both are installed, the predecessor's tool registrations are withdrawn from
    nr-llm — they would collide with this extension's — and its chat keeps
    working on this extension's tools.

Attachments
===========

Plain text, Markdown, CSV, PDF and Word work out of the box. Excel needs
`phpoffice/phpspreadsheet`, which is suggested, not required:

..  code-block:: bash

    composer require phpoffice/phpspreadsheet

Without it, XLSX simply does not appear in the file picker — the server decides
what may be attached from the extractors that are actually available.

Verify
======

Open :guilabel:`Administration > AI Assistant > Chat`. The details column names
the nr-llm configuration in use and the tools this user may reach; anything
missing is said above the chat instead of failing on the first message.

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

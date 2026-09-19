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
        -   0.7 (the `dirnbauer/typo3-mcp-server` fork)

Install
=======

The MCP server comes from a fork and its own dependency is not on Packagist, so
both repositories are declared before the package is required:

..  code-block:: bash

    composer config repositories.typo3-mcp-server vcs https://github.com/dirnbauer/typo3-mcp-server.git
    composer config repositories.typo3-abilities vcs https://github.com/dirnbauer/typo3-abilities.git
    composer require webconsulting/typo3-shadcn-ui
    vendor/bin/typo3 extension:setup

`extension:setup` creates the three tables the chat uses:
:sql:`tx_shadcnui_conversation`, :sql:`tx_shadcnui_message` and
:sql:`tx_shadcnui_instruction`.

Attachments are optional
========================

Plain text and PDF work out of the box; Word needs `phpoffice/phpword`, which is
a hard dependency, and Excel needs `phpoffice/phpspreadsheet`, which is not:

..  code-block:: bash

    composer require phpoffice/phpspreadsheet

Without it, XLSX simply does not appear in the file picker — the server decides
what may be attached from the extractors that are actually available.

Verify
======

1.  Open :guilabel:`Admin Tools > shadcn/ui Components`. Every component the
    runtime ships renders there; if that module works, the runtime works.
2.  Open :guilabel:`Admin Tools > AI Chat`. The :guilabel:`Setup` tab of the
    right-hand rail names the nr-llm configuration in use, the tools this user
    may reach, and anything that is missing.

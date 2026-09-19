..  include:: /Includes.rst.txt

=========
Changelog
=========

The full history is in :file:`CHANGELOG.md`.

1.0.0
=====

The first release: the shadcn/ui runtime for backend modules and the AI chat
built on it.

*   `<shadcn-ui-shell>`, a custom element that mounts a React 19 app in a Shadow
    DOM with the shadcn component set, the chat rail and the command palette.
*   :php:`ShadcnModuleRenderer` and :php:`ShadcnApp`, the PHP side of that: one
    controller and one TSX file are a backend module.
*   The chat: conversations, streaming turns over server-sent events, in-process
    MCP tools, approval cards for writes, clarifying questions, attachments with
    server-side text extraction, and a record of what was changed.
*   Three placements — the rail of every shadcn module, the
    :guilabel:`AI Chat` module, and a floating panel from the toolbar.
*   Agent instructions as editable records, per-group tool access through user
    TSconfig, a per-hour turn limit, and a retention command.

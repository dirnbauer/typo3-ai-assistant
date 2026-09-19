..  include:: /Includes.rst.txt

============
Introduction
============

What it is
==========

A backend module built on this extension is a React app inside a Shadow DOM,
styled by one Tailwind v4 stylesheet that never meets the backend's own CSS.
The shell around it is always the same, so every module built on the base
behaves the same way: the chat is where the chat is, the palette is on the same
key, and the light/dark choice follows the backend.

The chat is the reference implementation of an app on that base, and the only
backend chat this portfolio ships.

What the chat can do
====================

*   Answer questions about the installation — page trees, records, content
    elements, redirects, the system log — by calling the MCP tools of
    `hn/typo3-mcp-server`, **in process**, as the signed-in backend user. There
    is no HTTP self-call and no tool server to register.
*   Change records, with an approval card in front of every write. The card
    names the tool and its arguments and is bound to the turn it belongs to, so
    a stale browser tab cannot authorise a call nobody looked at.
*   Ask a clarifying question of its own and wait for the answer.
*   Read an attached text, PDF, Word or Excel file.
*   Show what it touched: every record a tool wrote is listed on the
    conversation.

Where it appears
================

..  confval-menu::

Three placements, one component:

*   the left rail of every module built on the base,
*   :guilabel:`Admin Tools > AI Chat`, where the right-hand app is the
    conversation list and the run's activity,
*   a floating panel opened from a toolbar button, which lives in the top
    document and therefore survives module navigation.

What it is not
==============

It is not a frontend chatbot, not a content generator, and not a place to put
an API key: the provider, the model, the budget and the guardrails all belong
to `netresearch/nr-llm` and are configured there.

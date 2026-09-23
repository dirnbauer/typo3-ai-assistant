..  include:: /Includes.rst.txt

============
Introduction
============

What the assistant can do
=========================

*   Answer questions about the installation — page trees, records, content
    elements, redirects, the system log — by calling the MCP tools of
    `hn/typo3-mcp-server`, **in process**, as the signed-in backend user. There
    is no HTTP self-call and no tool server to register.
*   Change records, with an approval card in front of every write. The card
    names the tool and its arguments and is bound to the turn it belongs to, so
    a stale browser tab cannot authorise a call nobody looked at.
*   Ask a clarifying question of its own and wait for the answer.
*   Read an attached text, Markdown, CSV, PDF, Word or Excel file.
*   Show what it touched: every record a tool wrote is listed on the
    conversation, one click away from FormEngine.

Where it appears
================

*   :guilabel:`Administration > AI Assistant > Chat`: the conversation list, the
    chat, and what the conversation did — changes, tool calls, usage, limits,
    the model and the instructions in force.
*   :guilabel:`Administration > AI Assistant > Instructions` (administrators):
    the instruction records written into every conversation's system prompt.
*   The backend toolbar: the chat as a dropdown, which lives in the top document
    and therefore survives module navigation. It knows the page and the module
    you have open.

What it is not
==============

It is not a frontend chatbot, not a content generator, and not a place to put
an API key: the provider, the model, the budget and the guardrails all belong
to `netresearch/nr-llm` and are configured there.

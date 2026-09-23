..  include:: /Includes.rst.txt

=========
Developer
=========

How it is built
===============

The server side is one pipeline with three entry points.
:php:`TurnRunner::start()`, :php:`::approve()` and :php:`::answer()` differ only
in what they check first and which runtime call they make; everything after
that is shared — claim the conversation, drive `nr-llm`, record the steps,
persist the rows, settle the conversation into the state the outcome demands.

Turns are **synchronous**, always. The MCP tools read the ambient backend user
and refuse to run when that user is not the run's actor; a queue worker has no
ambient user, so a queued turn would fail closed on every call.

`tx_webconaiassistant_conversation.status` is the lock. Starting a turn is a
compare-and-swap on it, so two tabs pressing send at the same moment cannot both
run against one transcript — the loser is told the conversation is busy.

MCP tool definitions are reduced to what function-calling providers accept
before they are offered: a top-level `oneOf`/`anyOf` of required fields ("uid
or url") becomes a sentence in the tool description, other top-level
combinators are dropped, and a description longer than OpenAI's 1024
characters is cut at a sentence, its rest moved into the parameter schema's
description. A single tool a provider refuses would otherwise fail every
request.

The browser side
================

Plain ES modules under :file:`Resources/Public/JavaScript/`, served as written
and registered in the import map as `@webconsulting/ai-assistant/`. There is no
bundler and no framework of their own: Lit, marked and DOMPurify come from the
core's import map.

:file:`chat/`
    The logic, free of the DOM where it can be: the SSE parser, the payload
    decoders and the thread reducer are pure and tested under `node --test`;
    :js:`ChatStore` holds one surface's state and talks to the API through the
    core's :js:`AjaxRequest`, streaming a turn off the response body.

:file:`element/`
    Lit elements rendering into the light DOM, so the backend's own stylesheet
    styles them: `<webcon-ai-assistant-chat>` (the conversation),
    `<webcon-ai-assistant-conversations>` and `<webcon-ai-assistant-details>`.

:file:`module.js`, :file:`toolbar-item.js`
    The two entry points. The toolbar creates its store on first open, so a
    backend page that never opens the chat pays for one small module.

Labels come from `~labels/webcon_ai_assistant.chat`; server messages are
translated from `webcon_ai_assistant.messages` by the exception's code.

The API
=======

Backend AJAX routes, published in `TYPO3.settings.ajaxUrls`:

..  list-table::
    :header-rows: 1

    *   -   Route
        -   Method
        -   Purpose
    *   -   `webcon_ai_assistant_status`
        -   GET
        -   Readiness, tools, limits, instructions, attachment rules, context
    *   -   `webcon_ai_assistant_conversations`
        -   GET
        -   The user's conversations (`archived=1` includes archived ones)
    *   -   `webcon_ai_assistant_conversation_get`
        -   GET
        -   One conversation and its messages
    *   -   `webcon_ai_assistant_conversation_events`
        -   GET
        -   The run trace from nr-llm
    *   -   `webcon_ai_assistant_conversation_create`
        -   POST
        -   A new conversation
    *   -   `webcon_ai_assistant_conversation_turn`
        -   POST
        -   A message; answers with server-sent events or one JSON document
    *   -   `webcon_ai_assistant_conversation_approval`
        -   POST
        -   A decision on a pending write, bound by `turnDigest`
    *   -   `webcon_ai_assistant_conversation_input`
        -   POST
        -   An answer to a clarifying question, bound by `turnDigest`
    *   -   `webcon_ai_assistant_conversation_cancel`
        -   POST
        -   Stop the running turn
    *   -   `webcon_ai_assistant_conversation_rename`, `_pin`, `_archive`, `_delete`
        -   POST
        -   Change a conversation
    *   -   `webcon_ai_assistant_file_upload`, `webcon_ai_assistant_file_info`
        -   POST, GET
        -   Attachments

A turn emits `run.started`, `step.llm`, `step.tool.call`, `step.tool.result`,
`approval.required`, `input.required`, `message.final`, `run.finished`,
`run.error` and `ping`. The JSON transport carries the same list under
`events`.

Testing
=======

..  code-block:: bash

    composer ci      # php -l, PHPStan (level 8), php-cs-fixer, unit + functional
    npm run lint     # ESLint
    npm test         # node --test Tests/JavaScript

:php:`Webconsulting\WebconAiAssistant\Testing\ScriptedProvider` is an `nr-llm`
provider that says whatever a test told it to say, so a whole turn —
suspension, resume, transcript, settlement — can be exercised without a
network. It is registered only when the application context is Development or
Testing **and** :envvar:`WEBCON_AI_ASSISTANT_SCRIPTED_PROVIDER=1`; two
independent conditions, because either one alone is the kind of thing that gets
turned on by accident.

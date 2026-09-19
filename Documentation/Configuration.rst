..  include:: /Includes.rst.txt

=============
Configuration
=============

Extension configuration
=======================

:guilabel:`Admin Tools > Settings > Extension Configuration > shadcn_ui`.

..  confval:: llmConfiguration
    :type: string
    :Default: backend-assistant

    The identifier of the `nr-llm` configuration the chat runs under — provider,
    model, system prompt and budget all come from it. While it cannot be
    resolved for the acting user, the chat reports itself unavailable and says
    why instead of failing on the first message.

..  confval:: allowWrites
    :type: boolean
    :Default: 0

    Whether a conversation whose :guilabel:`auto-approve` switch is on may skip
    the approval card for write tools. Off means **every** write stops and asks,
    whatever the conversation says. Both have to agree, so turning this on does
    not silently change any existing conversation.

..  confval:: maxTurnsPerHour
    :type: integer
    :Default: 60

    Turns one backend user may start per hour, across all their conversations,
    as a sliding window. 0 disables the limit.

..  confval:: attachmentStorage
    :type: string
    :Default: 1:/shadcn_ui/

    The FAL folder attachments are stored below, one subfolder per backend user
    and conversation. The folders are created on first use and removed with the
    conversation.

..  confval:: panelEnabled
    :type: boolean
    :Default: 1

    Whether the toolbar button and its floating chat panel are offered at all.

Which tools the chat may use
============================

Two gates, intersected. The first is nr-llm's own tool policy — what an
administrator enabled in its Tools module — which the runtime enforces again at
call time, so nothing here can widen it. The second narrows it per backend
group, in user TSconfig:

..  code-block:: typoscript

    # Everything the installation enables, minus two tools
    tx_shadcnui.tools.deny = typo3_WriteTable, typo3_SafeCli

    # Or: exactly these, and nothing else
    tx_shadcnui.tools.allow = typo3_GetPage, typo3_GetPageTree, typo3_Search

`deny` wins over `allow`. An **absent** `allow` and an **empty** one are
different answers: absent means "do not narrow", empty means "allow nothing".
A chat with no tools still answers questions; it just cannot inspect or change
the installation.

Agent instructions
==================

:guilabel:`Admin Tools > Records` on the root level holds
:sql:`tx_shadcnui_instruction` records: a title, a body, and optionally the
backend groups the instruction applies to. Active instructions are merged into
the system prompt of every conversation, in sorting order.

The group restriction is a **scope**, not a permission. An administrator who is
not in the named group does not receive the instruction either — "editors must
never delete a page without asking" is about editors.

Retention
=========

..  code-block:: bash

    vendor/bin/typo3 shadcn-ui:chat:cleanup --archive-after=30 --delete-after=90

Four passes, in the order they depend on each other: release conversations a
dead request left claimed, archive idle ones, delete archived and deleted ones
with their messages and files, and sweep messages whose conversation is gone.
`--dry-run` reports what each pass would do and changes nothing.

A turn runs inside a request, so a request that died leaves a conversation
claimed forever and nothing else releases that lock: schedule this command.

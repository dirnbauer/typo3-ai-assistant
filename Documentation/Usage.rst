..  include:: /Includes.rst.txt

=====
Usage
=====

Asking
======

Type and press :kbd:`Enter`. :kbd:`Shift+Enter` writes a newline, :kbd:`Esc`
stops a turn that is running, and :kbd:`Ctrl+K` (:kbd:`⌘K` on a Mac) opens a
command palette for "new conversation", "switch conversation" and the modules.

The chat knows where you are: the module you have open, the page you are on and
the workspace you work in travel with the message, which is what lets "rename
this page" mean the page on screen. The chip under the composer says exactly
what is being sent.

Approving a write
=================

When the model wants to change something, the turn stops and an approval card
appears naming the tool and the arguments. :guilabel:`Approve` runs the call and
the turn continues; :guilabel:`Reject` tells the model no, and it carries on
without that call.

:guilabel:`Approve and stop asking in this conversation` turns on the
conversation's auto-approve switch. It only has an effect while the installation
also allows it (:confval:`allowWrites`), and a turn may skip at most five pauses
before it asks again regardless.

Answering a question
====================

The model can ask one question of its own — which of two pages you meant,
whether to overwrite. The run suspends before anything executes, and the
question appears as a card with the sensible answers as buttons (:kbd:`A` to
:kbd:`J` pick one) and a text field when the answer is not in the list.

What it changed
===============

Every record a tool wrote is collected on the conversation and listed behind
:guilabel:`Changes` in the header, with a link that opens the record. The list
survives a reload: it is rebuilt from the write targets stored on the tool
messages, not from the live run.

Attachments
===========

Plain text, Markdown, CSV (2 MB), PDF (20 MB), Word (15 MB) and Excel (15 MB, if
`phpoffice/phpspreadsheet` is installed). The text is extracted on the server
and sent to the model with the message; the file itself stays in FAL, under the
conversation, and is deleted with it.

Conversations
=============

Pin the ones you come back to, archive the rest. Deleting is a soft delete — the
row and its files survive until the cleanup command's retention window passes,
so a deletion made by accident in the morning is still recoverable in the
afternoon.

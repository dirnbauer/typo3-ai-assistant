..  include:: /Includes.rst.txt

=====
Usage
=====

Asking
======

Type and press :kbd:`Enter`. :kbd:`Shift+Enter` writes a new line, and
:kbd:`Esc` stops a turn that is running. When the thread is empty, the chat
offers a few opening questions — only ones whose tools you may actually use.

The toolbar chat knows where you are: the module you have open, the page you
are on and the workspace you work in travel with the message, which is what
lets "rename this page" mean the page on screen. The badge under the message
field says which page is being sent.

Approving a write
=================

When the model wants to change something, the turn stops and an approval card
appears naming each tool and its arguments. :guilabel:`Approve` runs the calls
and the turn continues; :guilabel:`Deny` tells the model no, and it carries on
without them. While the card is open, the toolbar icon shows a badge, so a
closed panel cannot hide a pending decision.

If the installation allows it (:confval:`allowWrites`), the card offers to
approve these tools automatically for the rest of the conversation. A turn may
skip at most five pauses that way before it asks again regardless.

Answering a question
====================

The model can ask a question of its own — which of two pages you meant,
whether to overwrite. The run suspends before anything executes, and the
question appears as a card: the sensible answers as radio buttons, and a text
field when the answer is not in the list.

What it changed
===============

Every record a tool wrote is collected on the conversation: behind the
:guilabel:`changes` button in the chat header, and in the details column of the
module, each with a link that opens the record in FormEngine. The list survives
a reload: it is rebuilt from the write targets stored on the tool messages, not
from the live run.

Attachments
===========

Plain text, Markdown, CSV (2 MB), PDF (20 MB), Word (15 MB) and Excel (15 MB, if
`phpoffice/phpspreadsheet` is installed). Attach with the button or drop files
on the message field. The text is extracted on the server and sent to the model
with the message; the file itself stays in FAL, under the conversation, and is
deleted with it.

Conversations
=============

Pin the ones you come back to, archive the rest. Deleting is a soft delete — the
row and its files survive until the cleanup command's retention window passes.
The module and the toolbar chat show the same conversations and keep each other
up to date.

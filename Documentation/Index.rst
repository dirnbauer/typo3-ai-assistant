:navigation-title: shadcn/ui

..  include:: /Includes.rst.txt
..  _start:

================================
shadcn/ui for the TYPO3 backend
================================

:Extension key:
    shadcn_ui

:Package name:
    webconsulting/typo3-shadcn-ui

:Version:
    1.0.1

:Language:
    en

:Author:
    webconsulting GmbH

:License:
    This document is published under the
    `Creative Commons BY 4.0 <https://creativecommons.org/licenses/by/4.0/>`__
    license.

Two things in one extension.

**The base** is a shadcn/ui runtime for the TYPO3 backend: React 19, Tailwind v4
and the shadcn component set, bundled once and loaded through TYPO3's import
map. Any extension can build a backend module on it in one PHP controller and
one TSX file, and gets the same layout every shadcn module has — an AI chat rail
on the left, the extension's own app on the right, or full width without the
chat.

**The chat** is that assistant. It answers questions about *this* installation
and changes it on request, using the installation's own MCP tools through
nr-llm's agent runtime. Reads happen; every write stops and asks first.

..  toctree::
    :maxdepth: 1
    :titlesonly:

    Introduction
    Installation
    Configuration
    Usage
    Developer
    Changelog

:navigation-title: AI Assistant

..  include:: /Includes.rst.txt
..  _start:

==================================
AI Assistant for the TYPO3 backend
==================================

:Extension key:
    webcon_ai_assistant

:Package name:
    webconsulting/typo3-ai-assistant

:Version:
    2.0.0

:Language:
    en, de

:Author:
    webconsulting GmbH

:License:
    This document is published under the
    `Creative Commons BY 4.0 <https://creativecommons.org/licenses/by/4.0/>`__
    license.

A chat for the TYPO3 v14 backend that answers questions about *this*
installation and changes it on request. It runs on nr-llm's agent runtime and
calls the installation's own MCP tools **in process**, as the signed-in backend
user. Reads happen; every write stops and asks first.

It is built from the backend's own parts: a Fluid module in the core's module
layout, Lit elements rendering the core's buttons, callouts, badges and forms,
the core's modal, notification and AJAX APIs — light and dark mode included,
in English and German.

..  toctree::
    :maxdepth: 1
    :titlesonly:

    Introduction
    Installation
    Configuration
    Usage
    Developer
    Changelog

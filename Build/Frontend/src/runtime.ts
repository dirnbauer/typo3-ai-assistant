/**
 * `@webconsulting/shadcn-ui/runtime.js` — the contract.
 *
 * Everything an extension needs to build a backend module on the base: React
 * itself (bundled once, here), the `ui` namespace, `defineShadcnApp()` to
 * register the app the shell mounts, and the two hooks that reach the shell
 * and the backend. Importing this module also defines `<shadcn-ui-shell>` and
 * registers the built-in `shadcn_ui/chat-home` app.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { ChatHome } from '@/apps/chat-home';
import { defineShellElement } from '@/shell/element';
import { defineShadcnApp } from '@/shell/registry';

export { React, ReactDOM, Fragment, jsx, jsxs };
export * as ui from '@/ui';
export { cn } from '@/lib/utils';
export { defineShadcnApp, getShadcnApp, registeredApps, type AppProps, type ShadcnAppComponent } from '@/shell/registry';
export { useShell, useTypo3, type ShellApi, type ShellLayout, type Typo3Context } from '@/shell/shell-context';
export { ShadcnUiShellElement, defineShellElement, CLOSED_EVENT } from '@/shell/element';
export { OPEN_CHAT_EVENT } from '@/shell/shell';
export type { Theme } from '@/lib/theme';

defineShellElement();
defineShadcnApp('shadcn_ui/chat-home', ChatHome);

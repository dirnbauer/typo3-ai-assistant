import { createContext, useContext } from 'react';
import type { Theme } from '@/lib/theme';
import type { BackendUser } from '@/lib/typo3';

export type ShellLayout = 'chat-left' | 'full';

/**
 * What an app may ask of the shell it is mounted in.
 *
 * `setContext` is how an app tells the chat what it is showing — the current
 * record, filter, or selection — so a question like "why is this hidden?"
 * resolves. It travels with every turn as `context.appContext`.
 */
export interface ShellApi {
  layout: ShellLayout;
  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  setContext: (context: Record<string, unknown>) => void;
  /** Open the ⌘K palette programmatically. */
  openCommandPalette: () => void;
  /** Put the caret in the chat's composer (after `openChat()` when the rail was collapsed). */
  focusComposer: () => void;
}

const ShellContext = createContext<ShellApi | null>(null);

export const ShellProvider = ShellContext.Provider;

export function useShell(): ShellApi {
  const shell = useContext(ShellContext);
  if (shell === null) {
    throw new Error('useShell() must be called inside <shadcn-ui-shell>.');
  }

  return shell;
}

/** The same, for code that may also run outside a shell (a unit test, a story). */
export function useOptionalShell(): ShellApi | null {
  return useContext(ShellContext);
}

/** The backend as the shell sees it: routes, language, resolved theme, user. */
export interface Typo3Context {
  ajaxUrls: Record<string, string>;
  lang: string;
  theme: Theme;
  user: BackendUser | null;
}

const Typo3ContextObject = createContext<Typo3Context | null>(null);

export const Typo3Provider = Typo3ContextObject.Provider;

export function useTypo3(): Typo3Context {
  const typo3 = useContext(Typo3ContextObject);
  if (typo3 === null) {
    throw new Error('useTypo3() must be called inside <shadcn-ui-shell>.');
  }

  return typo3;
}

/**
 * The TYPO3 backend's globals, read defensively.
 *
 * The floating panel lives in the top document and a module shell inside the
 * content iframe; only one of the two is guaranteed to carry `TYPO3.settings`.
 * Asking the other is allowed (same origin) but can still throw if the backend
 * is framed by something else, so every access is guarded.
 */

export interface Typo3Global {
  settings?: {
    ajaxUrls?: Record<string, string>;
    FormEngine?: { moduleUrl?: string };
  };
  configuration?: { username?: string };
  ModuleMenu?: { App?: { showModule?: (name: string, params?: string) => void } };
  Backend?: { ContentContainer?: { setUrl?: (url: string) => void } };
}

declare global {
  interface Window {
    TYPO3?: Typo3Global;
  }
}

/** The local `TYPO3` object first, then the top document's. */
function candidates(): Typo3Global[] {
  const found: Typo3Global[] = [];
  if (window.TYPO3 !== undefined) {
    found.push(window.TYPO3);
  }
  try {
    if (window.top !== null && window.top !== window && window.top.TYPO3 !== undefined) {
      found.push(window.top.TYPO3);
    }
  } catch {
    // Cross-origin top frame: the local object is all there is.
  }

  return found;
}

export function ajaxUrls(): Record<string, string> {
  for (const typo3 of candidates()) {
    const urls = typo3.settings?.ajaxUrls;
    if (urls !== undefined && Object.keys(urls).length > 0) {
      return urls;
    }
  }

  return {};
}

export function backendLanguage(): string {
  const lang = document.documentElement.lang;

  return lang === '' ? 'en' : lang;
}

export interface BackendUser {
  name: string;
}

export function backendUser(): BackendUser | null {
  for (const typo3 of candidates()) {
    const name = typo3.configuration?.username;
    if (typeof name === 'string' && name !== '') {
      return { name };
    }
  }

  return null;
}

export const MODULES = {
  chat: 'tools_shadcnui_chat',
  components: 'tools_shadcnui_components',
} as const;

/**
 * Open a backend module through the module menu. `showModule()` fails silently
 * for an unknown identifier, so identifiers are spelled once in MODULES.
 */
export function openModule(identifier: string, params = ''): boolean {
  for (const typo3 of candidates()) {
    const show = typo3.ModuleMenu?.App?.showModule;
    if (typeof show === 'function') {
      show(identifier, params);

      return true;
    }
  }

  return false;
}

/** The FormEngine URL that edits one record, or null when the backend did not publish one. */
export function recordEditUrl(table: string, uid: number): string | null {
  for (const typo3 of candidates()) {
    const base = typo3.settings?.FormEngine?.moduleUrl;
    if (typeof base === 'string' && base !== '') {
      const url = new URL(base, window.location.href);
      url.searchParams.set(`edit[${table}][${uid}]`, 'edit');

      return url.toString();
    }
  }

  return null;
}

/** Navigate the backend's content frame. */
export function navigateContentFrame(url: string): boolean {
  for (const typo3 of candidates()) {
    const setUrl = typo3.Backend?.ContentContainer?.setUrl;
    if (typeof setUrl === 'function') {
      setUrl(url);

      return true;
    }
  }
  try {
    const frame = window.top?.document.querySelector<HTMLIFrameElement>('iframe[name="list_frame"]');
    if (frame?.contentWindow) {
      frame.contentWindow.location.href = url;

      return true;
    }
  } catch {
    // Cross-origin, or no content frame: nothing to navigate.
  }

  return false;
}

/**
 * The page the editor is looking at, read from the backend's own URL. TYPO3
 * carries the page a module edits in `id`, so the address bar already holds the
 * answer and nothing remembered here could go stale behind a navigation.
 */
export function currentPageId(): number | undefined {
  let search = '';
  try {
    search = window.top?.location.search ?? window.location.search;
  } catch {
    search = window.location.search;
  }
  const id = Number.parseInt(new URLSearchParams(search).get('id') ?? '', 10);

  return Number.isFinite(id) && id > 0 ? id : undefined;
}

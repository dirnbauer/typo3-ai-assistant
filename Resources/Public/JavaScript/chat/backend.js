/**
 * The TYPO3 backend around the chat: which page and module the user has open,
 * and how to take them somewhere else.
 *
 * The chat runs in two documents — the module inside the content iframe, the
 * toolbar panel in the top document — so every lookup goes through the top
 * frame's `TYPO3` object, and every access is guarded: a backend framed by
 * something else must degrade to "no context", never throw.
 */

export const CHAT_MODULE = 'tools_webconaiassistant_chat';

/** @returns {Window} */
function topWindow() {
  try {
    if (window.top !== null && window.top.TYPO3 !== undefined) {
      return window.top;
    }
  } catch {
    // Cross-origin top frame.
  }

  return window;
}

/**
 * The page the editor is looking at. TYPO3 carries it in `id` on the module
 * URL, and the top frame's address bar mirrors the module URL, so nothing
 * remembered here can go stale behind a navigation.
 *
 * @returns {number|undefined}
 */
export function currentPageId() {
  let search;
  try {
    search = topWindow().location.search;
  } catch {
    search = window.location.search;
  }
  const id = Number.parseInt(new URLSearchParams(search).get('id') ?? '', 10);

  return Number.isFinite(id) && id > 0 ? id : undefined;
}

/**
 * The identifier of the module in the content frame, e.g. `web_layout`.
 *
 * @returns {string}
 */
export function currentModule() {
  try {
    const identifier = topWindow().TYPO3?.ModuleMenu?.App?.getCurrentModule?.();

    return typeof identifier === 'string' ? identifier : '';
  } catch {
    return '';
  }
}

/**
 * Open the AI Assistant module, on a conversation when one is given.
 *
 * @param {number} conversation
 * @returns {boolean} false when the module menu is not reachable
 */
export function openChatModule(conversation = 0) {
  try {
    const app = topWindow().TYPO3?.ModuleMenu?.App;
    if (typeof app?.showModule === 'function') {
      app.showModule(CHAT_MODULE, conversation > 0 ? `conversation=${conversation}` : '');

      return true;
    }
  } catch {
    // Fall through.
  }

  return false;
}

/**
 * The FormEngine URL editing one record, returning to where the user came from.
 *
 * @param {string} editBaseUrl the `record_edit` route URL the backend rendered
 * @param {string} table
 * @param {number} uid
 * @param {string} returnUrl
 * @returns {string}
 */
export function recordEditUrl(editBaseUrl, table, uid, returnUrl) {
  const url = new URL(editBaseUrl, window.location.origin);
  url.searchParams.set(`edit[${table}][${uid}]`, 'edit');
  if (returnUrl !== '') {
    url.searchParams.set('returnUrl', returnUrl);
  }

  return url.toString();
}

/**
 * Show a URL where the backend shows modules: this document when it IS the
 * content frame, the content container when the chat lives in the top frame.
 *
 * @param {string} url
 */
export function showInContentFrame(url) {
  const container = topWindow().TYPO3?.Backend?.ContentContainer;
  if (window !== topWindow() || typeof container?.setUrl !== 'function') {
    window.location.href = url;

    return;
  }
  container.setUrl(url);
}

/** The URL the content frame shows right now, as a return target. */
export function contentFrameUrl() {
  try {
    const container = topWindow().TYPO3?.Backend?.ContentContainer;
    if (window === topWindow() && typeof container?.getUrl === 'function') {
      return String(container.getUrl());
    }
  } catch {
    // Fall back to this document.
  }

  return window.location.href;
}

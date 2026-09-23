import Notification from '@typo3/backend/notification.js';
import DocumentService from '@typo3/core/document-service.js';
import { currentModule, currentPageId } from './chat/backend.js';
import { ChatStore } from './chat/chat-store.js';
import './element/chat-element.js';
import { label, problemText } from './element/parts.js';

/**
 * The toolbar item: the AI Assistant as a dropdown of the backend toolbar.
 *
 * It lives in the TOP document, so it survives module navigation, and it costs
 * nothing until it is opened: the store is created and the first request made
 * on first open. Every later open refreshes the status, because "this page"
 * is wherever the user has navigated since.
 *
 * The core turns the item's dropdown into a native popover (light-dismissed,
 * Escape closes it) and gives it menu semantics and arrow-key navigation. A
 * chat is not a menu: the panel becomes a non-modal dialog, and keys typed into
 * its fields stay in its fields.
 */

const ITEM = '.webcon-ai-assistant-toolbar-item';
const NAVIGATION_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End']);

/** @type {ChatStore|null} */
let store = null;

/**
 * @param {HTMLElement} item
 * @param {HTMLElement} chat
 */
function ensureStore(item, chat) {
  if (store !== null) {
    return store;
  }
  store = new ChatStore(() => ({ appName: currentModule(), pageId: currentPageId() }));
  store.addEventListener('problem', (event) => {
    Notification.error(label('problem.title'), problemText(/** @type {CustomEvent} */ (event).detail));
  });
  store.subscribe((state) => updateBadge(item, state));
  /** @type {any} */ (chat).store = store;
  void store.start();

  return store;
}

/**
 * The badge says a turn is running, or — louder — that one is waiting for the
 * user, so a closed panel cannot hide a pending decision.
 *
 * @param {HTMLElement} item
 * @param {import('./chat/chat-store.js').ChatState} state
 */
function updateBadge(item, state) {
  const badge = item.querySelector('[data-webcon-ai-assistant-badge]');
  if (!(badge instanceof HTMLElement)) {
    return;
  }
  const waiting = state.thread.phase === 'awaiting_approval' || state.thread.phase === 'awaiting_input';
  const running = state.thread.running || state.busy;
  badge.classList.toggle('hidden', !waiting && !running);
  badge.classList.toggle('badge-warning', waiting);
  badge.classList.toggle('badge-info', !waiting && running);
  badge.textContent = waiting ? '!' : '…';
  badge.title = waiting ? label('toolbar.waiting') : label('toolbar.running');
}

function initialize() {
  const item = document.querySelector(ITEM);
  const menu = item?.querySelector('.dropdown-menu');
  const chat = item?.querySelector('webcon-ai-assistant-chat');
  if (!(item instanceof HTMLElement) || !(menu instanceof HTMLElement) || !(chat instanceof HTMLElement)) {
    return;
  }

  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', label('panel.title'));
  menu.classList.add('webcon-ai-assistant-panel');

  menu.addEventListener('keydown', (event) => {
    const target = /** @type {HTMLElement} */ (event.target);
    if (NAVIGATION_KEYS.has(event.key) && target.closest('input, textarea, select') !== null) {
      event.stopPropagation();
    }
  });

  // Opening: a native popover announces itself with a `toggle` event.
  menu.addEventListener('toggle', (event) => {
    if (/** @type {ToggleEvent} */ (event).newState !== 'open') {
      return;
    }
    const opened = store !== null;
    const current = ensureStore(item, chat);
    if (opened) {
      void current.refreshStatus();
    }
    requestAnimationFrame(() => {
      /** @type {HTMLTextAreaElement|null} */ (menu.querySelector('.webcon-ai-assistant-composer-input'))?.focus();
    });
  });
}

DocumentService.ready().then(initialize);

import Notification from '@typo3/backend/notification.js';
import DocumentService from '@typo3/core/document-service.js';
import { ChatStore } from './chat/chat-store.js';
import './element/chat-element.js';
import './element/conversations-element.js';
import './element/details-element.js';
import { label, problemText } from './element/parts.js';

/**
 * The AI Assistant module: one store, three views of it — the conversation
 * list, the chat, the details — and the doc header's "New conversation".
 *
 * The module carries no page context of its own: it is the chat, not a place
 * in the page tree. The conversation it opens first is the one the URL names,
 * or the one used last.
 */
function initialize() {
  const root = document.querySelector('[data-webcon-ai-assistant-workspace]');
  if (!(root instanceof HTMLElement)) {
    return;
  }

  const store = new ChatStore(() => ({}));
  for (const element of root.querySelectorAll('webcon-ai-assistant-chat, webcon-ai-assistant-conversations, webcon-ai-assistant-details')) {
    /** @type {any} */ (element).store = store;
  }
  store.addEventListener('problem', (event) => {
    Notification.error(label('problem.title'), problemText(/** @type {CustomEvent} */ (event).detail));
  });

  document.addEventListener('click', (event) => {
    const trigger = /** @type {HTMLElement} */ (event.target).closest('[data-webcon-ai-assistant-action="new-conversation"]');
    if (trigger === null) {
      return;
    }
    event.preventDefault();
    void store.startNew().then(() => {
      /** @type {HTMLTextAreaElement|null} */ (root.querySelector('.webcon-ai-assistant-composer-input'))?.focus();
    });
  });

  void store.start(Number.parseInt(root.dataset.conversation ?? '0', 10) || 0);
}

DocumentService.ready().then(initialize);

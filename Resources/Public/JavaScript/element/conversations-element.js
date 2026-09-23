import { html, nothing } from 'lit';
import { live } from 'lit/directives/live.js';
import { repeat } from 'lit/directives/repeat.js';
import Modal from '@typo3/backend/modal.js';
import { SeverityEnum } from '@typo3/backend/enum/severity.js';
import '@typo3/backend/dropdown.js';
import { formatTimestamp, isoTimestamp } from '../chat/format.js';
import { icon, label, statusBadge, uniqueId } from './parts.js';
import { StoreElement } from './store-element.js';

/**
 * `<webcon-ai-assistant-conversations>`: every conversation this user owns —
 * pinned first, then newest activity — with a filter for when the list
 * outgrows the column. Archived conversations stay hidden until asked for:
 * archiving is how a conversation gets out of the way.
 *
 * Each row's actions sit in the core's popover dropdown; rename and delete
 * ask through the core modal.
 */
export class ConversationsElement extends StoreElement {
  #query = '';

  #ids = {
    heading: uniqueId('conversations'),
    filter: uniqueId('filter'),
    archived: uniqueId('archived'),
  };

  render() {
    if (this.store === null) {
      return nothing;
    }
    const { conversations, conversationsLoaded, includeArchived, conversationUid } = this.store.state;
    const needle = this.#query.trim().toLowerCase();
    const visible = conversations.filter(
      (conversation) => needle === '' || (conversation.title || label('conversation.untitled')).toLowerCase().includes(needle),
    );

    return html`
      <section class="webcon-ai-assistant-conversations" aria-labelledby=${this.#ids.heading}>
        <header class="webcon-ai-assistant-conversations-header">
          <h2 id=${this.#ids.heading}>${label('conversations.title')}</h2>
        </header>
        <div class="webcon-ai-assistant-conversations-filter">
          <label class="visually-hidden" for=${this.#ids.filter}>${label('conversations.filter')}</label>
          <input
            type="search"
            class="form-control form-control-sm"
            id=${this.#ids.filter}
            placeholder=${label('conversations.filterPlaceholder')}
            .value=${live(this.#query)}
            @input=${(event) => {
              this.#query = event.currentTarget.value;
              this.requestUpdate();
            }}
          />
        </div>
        ${conversationsLoaded && visible.length === 0
          ? html`<p class="webcon-ai-assistant-conversations-empty text-variant">
              ${label(needle === '' ? 'conversations.empty' : 'conversations.noMatch')}
            </p>`
          : nothing}
        <ul class="list-group webcon-ai-assistant-conversation-list">
          ${repeat(visible, (conversation) => conversation.uid, (conversation) => this.#renderRow(conversation, conversation.uid === conversationUid))}
        </ul>
        <div class="form-check form-switch webcon-ai-assistant-conversations-footer">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id=${this.#ids.archived}
            .checked=${live(includeArchived)}
            @change=${(event) => this.store.setIncludeArchived(event.currentTarget.checked)}
          />
          <label class="form-check-label" for=${this.#ids.archived}>${label('conversations.showArchived')}</label>
        </div>
      </section>
    `;
  }

  /**
   * @param {Record<string, any>} conversation
   * @param {boolean} active
   */
  #renderRow(conversation, active) {
    const title = conversation.title || label('conversation.untitled');
    const menu = `webcon-ai-assistant-conversation-menu-${conversation.uid}`;
    const time = conversation.lastMessageAt || conversation.createdAt;

    return html`
      <li class="list-group-item webcon-ai-assistant-conversation ${active ? 'active' : ''}">
        <button
          type="button"
          class="webcon-ai-assistant-conversation-select"
          aria-current=${active ? 'true' : nothing}
          @click=${() => this.store.select(conversation.uid)}
        >
          <span class="webcon-ai-assistant-conversation-title">
            ${conversation.pinned ? html`${icon('actions-thumbtack')}<span class="visually-hidden">${label('conversations.pinned')}</span>` : nothing}
            <span>${title}</span>
          </span>
          <span class="webcon-ai-assistant-conversation-meta">
            <time datetime=${isoTimestamp(time)}>${formatTimestamp(time)}</time>
            <span>${label('conversations.messages', { count: Number(conversation.messageCount) || 0 })}</span>
            ${statusBadge(conversation.status)}
            ${conversation.archived ? html`<span class="badge badge-default">${label('conversations.archived')}</span>` : nothing}
          </span>
        </button>
        <div class="dropdown">
          <button
            type="button"
            class="btn btn-default btn-sm dropdown-toggle dropdown-toggle-no-chevron"
            popovertarget=${menu}
            aria-label=${label('conversations.actions', { title })}
            title=${label('conversations.actions', { title })}
          >
            ${icon('actions-options')}
          </button>
          <ul class="dropdown-menu" id=${menu} popover>
            ${this.#item(menu, 'actions-rename', label('conversations.rename'), () => this.#rename(conversation))}
            ${this.#item(
              menu,
              'actions-thumbtack',
              label(conversation.pinned ? 'conversations.unpin' : 'conversations.pin'),
              () => this.store.setPinned(conversation.uid, !conversation.pinned),
            )}
            ${this.#item(
              menu,
              'actions-archive',
              label(conversation.archived ? 'conversations.restore' : 'conversations.archive'),
              () => this.store.setArchived(conversation.uid, !conversation.archived),
            )}
            <li><hr class="dropdown-divider" /></li>
            ${this.#item(menu, 'actions-delete', label('conversations.delete'), () => this.#delete(conversation))}
          </ul>
        </div>
      </li>
    `;
  }

  /**
   * @param {string} menu
   * @param {string} iconIdentifier
   * @param {string} text
   * @param {() => unknown} action
   */
  #item(menu, iconIdentifier, text, action) {
    return html`<li>
      <button
        type="button"
        class="dropdown-item"
        @click=${() => {
          /** @type {HTMLElement|null} */ (this.querySelector(`#${menu}`))?.hidePopover?.();
          void action();
        }}
      >
        <span class="dropdown-item-columns">
          <span class="dropdown-item-column dropdown-item-column-icon">${icon(iconIdentifier)}</span>
          <span class="dropdown-item-column dropdown-item-column-title">${text}</span>
        </span>
      </button>
    </li>`;
  }

  /** @param {Record<string, any>} conversation */
  #rename(conversation) {
    const inputId = uniqueId('rename');
    const modal = Modal.advanced({
      title: label('rename.title'),
      severity: SeverityEnum.notice,
      content: html`
        <p>${label('rename.description')}</p>
        <label class="form-label" for=${inputId}>${label('rename.field')}</label>
        <input class="form-control" id=${inputId} maxlength="255" value=${conversation.title} />
      `,
      buttons: [
        {
          text: label('button.cancel'),
          btnClass: 'btn-default',
          name: 'cancel',
          trigger: (_event, instance) => instance.hideModal(),
        },
        {
          text: label('rename.submit'),
          btnClass: 'btn-primary',
          name: 'rename',
          active: true,
          trigger: (_event, instance) => {
            const input = /** @type {HTMLInputElement|null} */ (instance.querySelector(`#${inputId}`));
            const title = input?.value.trim() ?? '';
            if (title === '') {
              input?.focus();

              return;
            }
            instance.hideModal();
            void this.store.rename(conversation.uid, title);
          },
        },
      ],
    });
    modal.addEventListener('typo3-modal-shown', () => {
      const input = /** @type {HTMLInputElement|null} */ (modal.querySelector(`#${inputId}`));
      input?.focus();
      input?.select();
    });
  }

  /** @param {Record<string, any>} conversation */
  #delete(conversation) {
    Modal.confirm(
      label('delete.title'),
      label('delete.description', { title: conversation.title || label('conversation.untitled') }),
      SeverityEnum.warning,
      [
        {
          text: label('button.cancel'),
          btnClass: 'btn-default',
          name: 'cancel',
          active: true,
          trigger: (_event, instance) => instance.hideModal(),
        },
        {
          text: label('delete.submit'),
          btnClass: 'btn-danger',
          name: 'delete',
          trigger: (_event, instance) => {
            instance.hideModal();
            void this.store.remove(conversation.uid);
          },
        },
      ],
    );
  }
}

if (!customElements.get('webcon-ai-assistant-conversations')) {
  customElements.define('webcon-ai-assistant-conversations', ConversationsElement);
}

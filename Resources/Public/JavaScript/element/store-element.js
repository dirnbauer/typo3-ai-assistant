import { LitElement } from 'lit';

/**
 * A Lit element that renders a {@link import('../chat/chat-store.js').ChatStore}.
 *
 * It renders into the LIGHT DOM, so the backend's own stylesheet — buttons,
 * callouts, badges, forms, both colour schemes — styles it; there is no style
 * island to keep in step with the core. It re-renders whenever the store
 * changes and holds no copy of the store's state.
 */
export class StoreElement extends LitElement {
  static properties = {
    store: { attribute: false },
  };

  /** @type {(() => void)|null} */
  #unsubscribe = null;

  constructor() {
    super();
    // Reactive properties are initialised here, never as class fields: a
    // field would shadow the accessor Lit defines and no change would render.
    /** @type {import('../chat/chat-store.js').ChatStore|null} */
    this.store = null;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#unsubscribe?.();
    this.#unsubscribe = null;
  }

  /** @param {Map<string, unknown>} changed */
  willUpdate(changed) {
    if (changed.has('store')) {
      this.#subscribe();
    }
  }

  #subscribe() {
    this.#unsubscribe?.();
    this.#unsubscribe = this.store === null ? null : this.store.subscribe(() => this.requestUpdate());
  }
}

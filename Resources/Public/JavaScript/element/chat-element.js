import { html, nothing } from 'lit';
import { live } from 'lit/directives/live.js';
import { repeat } from 'lit/directives/repeat.js';
import '../chat/markdown.js';
import { acceptAttribute } from '../chat/attachments.js';
import { contentFrameUrl, openChatModule, recordEditUrl, showInContentFrame } from '../chat/backend.js';
import { formatBytes, formatDuration, formatTimestamp, isoTimestamp, toolDisplayName } from '../chat/format.js';
import { composerState } from '../chat/thread-state.js';
import { changeList, effectBadge, icon, label, problemText, statusBadge, uniqueId } from './parts.js';
import { StoreElement } from './store-element.js';

const TOOL_STATE_ICONS = Object.freeze({
  running: 'spinner-circle',
  waiting: 'actions-exclamation',
  stopped: 'actions-minus',
  error: 'actions-close',
  done: 'actions-check',
});

/**
 * Where one tool call stands: finished (done or failed), held for the user's
 * approval, still running, or — the run ended without it — not run at all.
 *
 * @param {import('../chat/thread-state.js').ToolCallEntry} call
 * @param {import('../chat/thread-state.js').ThreadState} thread
 * @returns {'running'|'waiting'|'stopped'|'error'|'done'}
 */
export function toolState(call, thread) {
  if (call.result !== undefined) {
    return call.result.isError ? 'error' : 'done';
  }
  if (thread.pendingApproval?.calls.some((pending) => pending.callId === call.callId)) {
    return 'waiting';
  }

  return thread.running ? 'running' : 'stopped';
}

/**
 * `<webcon-ai-assistant-chat>`: the conversation — its header, the thread and
 * the composer — wherever it is placed.
 *
 * `variant="module"` is the AI Assistant module's main column: the header
 * carries the conversation's title and the list lives beside it.
 * `variant="panel"` is the toolbar panel: the header carries a conversation
 * picker, "new" and "open in the module", because there is no list beside it.
 *
 * Keyboard: Enter sends, Shift+Enter is a new line, Escape stops a running
 * turn. The thread is an ARIA log, so what arrives is announced; the running
 * line is a status, so a screen reader hears that the turn is alive.
 */
export class ChatElement extends StoreElement {
  static properties = {
    ...StoreElement.properties,
    variant: { type: String },
    recordEditUrl: { type: String, attribute: 'record-edit-url' },
  };

  #text = '';

  #remember = false;

  /** @type {string|null} */
  #choice = null;

  #answerText = '';

  #stickToBottom = true;

  #ids = {
    title: uniqueId('chat-title'),
    message: uniqueId('message'),
    hint: uniqueId('hint'),
    file: uniqueId('file'),
    picker: uniqueId('picker'),
    remember: uniqueId('remember'),
    approval: uniqueId('approval'),
    input: uniqueId('input'),
    answer: uniqueId('answer'),
    changes: uniqueId('changes'),
    actions: uniqueId('actions'),
  };

  /** @type {string} digest of the question the input card was drawn for */
  #inputFor = '';

  constructor() {
    super();
    /** @type {'module'|'panel'} */
    this.variant = 'module';
    /** The `record_edit` route URL; empty when this surface cannot open records. */
    this.recordEditUrl = '';
  }

  render() {
    if (this.store === null) {
      return nothing;
    }
    const { thread } = this.store.state;

    return html`
      <section class="webcon-ai-assistant-chat webcon-ai-assistant-chat-${this.variant}" aria-labelledby=${this.#ids.title}>
        ${this.variant === 'panel' ? this.#renderPanelHeader() : this.#renderModuleHeader()}
        ${this.#renderProblems()}
        <div
          class="webcon-ai-assistant-thread"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label=${label('thread.label')}
          tabindex="0"
          @scroll=${this.#onScroll}
        >
          ${this.#isEmpty() ? this.#renderEmpty() : nothing}
          ${repeat(thread.items, (item) => item.key, (item) => this.#renderItem(item))}
          ${thread.draft === ''
            ? nothing
            : // The draft grows with every frame; announcing each growth would
              // bury the answer. The status line says the assistant is writing,
              // and the finished message is announced once, when it lands.
              this.#renderMessage({ uid: 0, role: 'assistant', content: thread.draft, createdAt: 0 }, false)}
          ${thread.running ? this.#renderRunning() : nothing}
          ${thread.pendingApproval === null ? nothing : this.#renderApproval()}
          ${thread.pendingInput === null ? nothing : this.#renderInput()}
        </div>
        ${this.#renderComposer()}
      </section>
    `;
  }

  updated() {
    const thread = this.querySelector('.webcon-ai-assistant-thread');
    if (thread !== null && this.#stickToBottom) {
      thread.scrollTop = thread.scrollHeight;
    }
  }

  /** @param {Event} event */
  #onScroll(event) {
    const thread = /** @type {HTMLElement} */ (event.currentTarget);
    this.#stickToBottom = thread.scrollHeight - thread.scrollTop - thread.clientHeight < 48;
  }

  #isEmpty() {
    const { thread, loading } = this.store.state;

    return !loading && thread.items.length === 0 && thread.draft === '' && thread.pendingApproval === null && thread.pendingInput === null;
  }

  // ------------------------------------------------------------- header

  #title() {
    const conversation = this.store.state.thread.conversation;

    return conversation === null ? label('conversation.new') : conversation.title || label('conversation.untitled');
  }

  #renderModuleHeader() {
    const { thread } = this.store.state;
    const conversation = thread.conversation;

    return html`
      <header class="webcon-ai-assistant-chat-header">
        <h2 class="webcon-ai-assistant-chat-title" id=${this.#ids.title}>${this.#title()}</h2>
        ${conversation === null ? nothing : statusBadge(conversation.status)}
        ${this.#renderChangesToggle()}
      </header>
    `;
  }

  #renderPanelHeader() {
    const { conversations, conversationUid } = this.store.state;
    const recent = conversations.slice(0, 12);
    const selectedIsListed = recent.some((conversation) => conversation.uid === conversationUid);

    return html`
      <header class="webcon-ai-assistant-chat-header">
        <h2 class="visually-hidden" id=${this.#ids.title}>${label('panel.title')}</h2>
        <label class="visually-hidden" for=${this.#ids.picker}>${label('panel.conversation')}</label>
        <select
          class="form-select form-select-sm webcon-ai-assistant-picker"
          id=${this.#ids.picker}
          @change=${(event) => this.store.select(Number(event.currentTarget.value))}
        >
          <option value="0" ?selected=${conversationUid === 0}>${label('conversation.new')}</option>
          ${selectedIsListed || conversationUid === 0
            ? nothing
            : html`<option value=${conversationUid} selected>${this.#title()}</option>`}
          ${recent.map(
            (conversation) => html`<option value=${conversation.uid} ?selected=${conversation.uid === conversationUid}>
              ${conversation.title || label('conversation.untitled')}
            </option>`,
          )}
        </select>
        ${this.#renderChangesToggle()}
        <button type="button" class="btn btn-default btn-sm" title=${label('conversation.startNew')} @click=${() => this.#startNew()}>
          ${icon('actions-plus')}<span class="visually-hidden">${label('conversation.startNew')}</span>
        </button>
        <button
          type="button"
          class="btn btn-default btn-sm"
          title=${label('panel.openInModule')}
          @click=${() => openChatModule(this.store.state.conversationUid)}
        >
          ${icon('actions-window-open')}<span class="visually-hidden">${label('panel.openInModule')}</span>
        </button>
      </header>
    `;
  }

  #renderChangesToggle() {
    const changes = this.store.state.thread.changes;
    if (changes.length === 0) {
      return nothing;
    }

    return html`
      <button type="button" class="btn btn-default btn-sm webcon-ai-assistant-changes-toggle" popovertarget=${this.#ids.changes}>
        ${icon('actions-database')}<span>${label('changes.count', { count: changes.length })}</span>
      </button>
      <div class="dropdown-menu webcon-ai-assistant-changes-menu" id=${this.#ids.changes} popover>
        <p class="dropdown-headline">${label('changes.title')}</p>
        ${changeList(changes, this.recordEditUrl === '' ? null : (table, uid) => this.#openRecord(table, uid))}
      </div>
    `;
  }

  async #startNew() {
    await this.store.startNew();
    this.querySelector(`#${this.#ids.message}`)?.focus();
  }

  /** @param {string} table @param {number} uid */
  #openRecord(table, uid) {
    showInContentFrame(recordEditUrl(this.recordEditUrl, table, uid, contentFrameUrl()));
  }

  // ------------------------------------------------------------- problems

  #renderProblems() {
    const { status, statusProblem, thread } = this.store.state;
    const issues = Array.isArray(status?.issues) ? status.issues : [];

    return html`
      ${statusProblem === null ? nothing : this.#callout('danger', 'actions-close', problemText(statusProblem))}
      ${issues.map((issue) => this.#callout('warning', 'actions-exclamation', String(issue)))}
      ${thread.error === null
        ? nothing
        : this.#callout('danger', 'actions-close', this.#errorText(thread.error), () => this.store.dismissError())}
    `;
  }

  /**
   * What went wrong with the turn: the server's words when it sent any, the
   * label of a failed request's status, or the label of the run's outcome.
   *
   * @param {{code: string, text: string}} error
   */
  #errorText(error) {
    if (error.text !== '' || error.code.startsWith('problem.')) {
      return problemText(error);
    }

    return label(`error.${error.code}`);
  }

  /**
   * @param {'danger'|'warning'|'info'} severity
   * @param {string} iconIdentifier
   * @param {string} text
   * @param {(() => void)|null} [onDismiss]
   */
  #callout(severity, iconIdentifier, text, onDismiss = null) {
    return html`
      <div class="callout callout-${severity} webcon-ai-assistant-callout" role=${severity === 'danger' ? 'alert' : 'status'}>
        <div class="callout-icon"><span class="icon-emphasized">${icon(iconIdentifier)}</span></div>
        <div class="callout-content"><div class="callout-body">${text}</div></div>
        ${onDismiss === null
          ? nothing
          : html`<button type="button" class="btn btn-default btn-sm webcon-ai-assistant-callout-dismiss" @click=${onDismiss}>
              ${icon('actions-close')}<span class="visually-hidden">${label('problem.dismiss')}</span>
            </button>`}
      </div>
    `;
  }

  // ------------------------------------------------------------- thread

  #renderEmpty() {
    return html`
      <div class="webcon-ai-assistant-empty">
        ${icon('webcon-ai-assistant-module', 'large')}
        <p class="webcon-ai-assistant-empty-title">${label('empty.title')}</p>
        <p class="text-variant">${label('empty.description')}</p>
      </div>
    `;
  }

  /** @param {import('../chat/thread-state.js').ThreadItem} item */
  #renderItem(item) {
    switch (item.kind) {
      case 'message':
        return this.#renderMessage(item.message);
      case 'tool':
        return this.#renderTool(item.call);
      case 'thinking':
        return html`
          <details class="webcon-ai-assistant-reasoning">
            <summary>${icon('actions-lightbulb')} ${label('thread.reasoning', { round: item.round })}</summary>
            <p>${item.text}</p>
          </details>
        `;
      case 'notice':
        return html`
          <p class="webcon-ai-assistant-notice ${item.tone === 'error' ? 'text-danger' : 'text-variant'}">
            ${icon(item.tone === 'error' ? 'actions-exclamation-triangle' : 'actions-info')}
            <span>${item.text !== '' ? item.text : label(`notice.${item.code}`)}</span>
          </p>
        `;
      default:
        return nothing;
    }
  }

  /**
   * @param {{uid: number, role: string, content: string, createdAt: number, attachments?: Array<{fileUid: number, fileName: string, fileSize: number}>}} message
   * @param {boolean} [announced] false keeps a message out of the live region
   */
  #renderMessage(message, announced = true) {
    const mine = message.role === 'user';
    const attachments = Array.isArray(message.attachments) ? message.attachments : [];

    return html`
      <article
        class="webcon-ai-assistant-message webcon-ai-assistant-message-${mine ? 'user' : 'assistant'}"
        aria-hidden=${announced ? nothing : 'true'}
      >
        <header class="webcon-ai-assistant-message-meta">
          <span>${label(mine ? 'message.you' : 'message.assistant')}</span>
          ${message.createdAt > 0
            ? html`<time datetime=${isoTimestamp(message.createdAt)}>${formatTimestamp(message.createdAt)}</time>`
            : nothing}
        </header>
        <div class="webcon-ai-assistant-message-body">
          ${mine
            ? html`<p class="webcon-ai-assistant-plain">${message.content}</p>`
            : html`<webcon-ai-assistant-markdown .source=${message.content}></webcon-ai-assistant-markdown>`}
        </div>
        ${attachments.length === 0
          ? nothing
          : html`<ul class="webcon-ai-assistant-files" aria-label=${label('attachments.sent')}>
              ${attachments.map(
                (file) => html`<li>${icon('actions-file')}<span>${file.fileName}</span> <span class="text-variant">${formatBytes(file.fileSize)}</span></li>`,
              )}
            </ul>`}
      </article>
    `;
  }

  /** @param {import('../chat/thread-state.js').ToolCallEntry} call */
  #renderTool(call) {
    const result = call.result;
    const state = toolState(call, this.store.state.thread);
    const stateIcon = TOOL_STATE_ICONS[state];

    return html`
      <details class="webcon-ai-assistant-tool webcon-ai-assistant-tool-${state}">
        <summary>
          <span class="webcon-ai-assistant-tool-state">${icon(stateIcon)}</span>
          <code class="webcon-ai-assistant-tool-name">${toolDisplayName(call.name)}</code>
          ${effectBadge(call.effect)}
          <span class="visually-hidden">${label(`tool.state.${state}`)}</span>
        </summary>
        <div class="webcon-ai-assistant-tool-body">
          <p class="webcon-ai-assistant-tool-label">${label('tool.arguments')}</p>
          <pre><code>${JSON.stringify(call.arguments, null, 2)}</code></pre>
          ${result === undefined
            ? nothing
            : html`
                <p class="webcon-ai-assistant-tool-label">${label(result.isError ? 'tool.error' : 'tool.result')}</p>
                <pre class=${result.isError ? 'text-danger' : ''}><code>${result.preview}</code></pre>
                ${result.writeTarget === null
                  ? nothing
                  : changeList([result.writeTarget], this.recordEditUrl === '' ? null : (table, uid) => this.#openRecord(table, uid))}
                <p class="text-variant">${label('tool.round', { round: call.round })} · ${formatDuration(result.durationMs)}</p>
              `}
        </div>
      </details>
    `;
  }

  #renderRunning() {
    const { thread } = this.store.state;
    const lastTool = thread.items.findLast((item) => item.kind === 'tool');
    let text = label(thread.draft === '' ? 'running.thinking' : 'running.writing');
    if (lastTool !== undefined && lastTool.kind === 'tool' && lastTool.call.result === undefined) {
      text = label('running.tool', { tool: toolDisplayName(lastTool.call.name) });
    }

    return html`<p class="webcon-ai-assistant-running" role="status">${icon('spinner-circle')}<span>${text}</span></p>`;
  }

  #renderApproval() {
    const { thread, busy, status } = this.store.state;
    const approval = /** @type {import('../chat/decode.js').PendingApproval} */ (thread.pendingApproval);
    const tools = Array.isArray(status?.tools) ? status.tools : [];
    const effectOf = (name) => tools.find((tool) => tool.name === name)?.effect ?? 'non_idempotent_write';
    const count = approval.calls.length;
    const canRemember = status?.features?.writes === true;

    return html`
      <section class="callout callout-warning webcon-ai-assistant-card" aria-labelledby=${this.#ids.approval}>
        <div class="callout-icon"><span class="icon-emphasized">${icon('actions-exclamation')}</span></div>
        <div class="callout-content">
          <h3 class="callout-title" id=${this.#ids.approval}>${label('approval.title', { count })}</h3>
          <div class="callout-body">
            <p>${label('approval.description')}</p>
            <ul class="webcon-ai-assistant-approval-calls">
              ${approval.calls.map(
                (call) => html`<li>
                  <details>
                    <summary><code>${toolDisplayName(call.name)}</code> ${effectBadge(effectOf(call.name))}</summary>
                    <pre><code>${JSON.stringify(call.arguments, null, 2)}</code></pre>
                  </details>
                </li>`,
              )}
            </ul>
            ${canRemember
              ? html`<div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id=${this.#ids.remember}
                    .checked=${live(this.#remember)}
                    ?disabled=${busy}
                    @change=${(event) => {
                      this.#remember = event.currentTarget.checked;
                    }}
                  />
                  <label class="form-check-label" for=${this.#ids.remember}>${label('approval.remember')}</label>
                </div>`
              : nothing}
            <div class="webcon-ai-assistant-actions">
              <button type="button" class="btn btn-default" ?disabled=${busy} @click=${() => this.#decide(false)}>
                ${icon('actions-ban')}<span>${label('approval.deny')}</span>
              </button>
              <button type="button" class="btn btn-warning" ?disabled=${busy} @click=${() => this.#decide(true)}>
                ${icon('actions-check')}<span>${label('approval.approve', { count })}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /** @param {boolean} approved */
  #decide(approved) {
    const remember = this.#remember;
    this.#remember = false;
    void this.store.decide(approved, remember);
  }

  #renderInput() {
    const { thread, busy } = this.store.state;
    const input = /** @type {import('../chat/decode.js').PendingInput} */ (thread.pendingInput);
    if (this.#inputFor !== input.turnDigest) {
      // A new question starts with a clean form.
      this.#inputFor = input.turnDigest;
      this.#choice = null;
      this.#answerText = '';
    }
    const other = input.allowFreeText && input.options.length > 0;
    const typing = input.options.length === 0 || this.#choice === '';
    const answer = typing ? this.#answerText.trim() : (this.#choice ?? '');

    return html`
      <section class="callout callout-info webcon-ai-assistant-card" aria-labelledby=${this.#ids.input}>
        <div class="callout-icon"><span class="icon-emphasized">${icon('actions-question')}</span></div>
        <div class="callout-content">
          <h3 class="callout-title" id=${this.#ids.input}>${label('input.title')}</h3>
          <div class="callout-body">
            <form @submit=${(event) => this.#submitAnswer(event, answer)}>
              <fieldset class="webcon-ai-assistant-question">
                <legend>${input.question}</legend>
                ${input.options.map((option, index) => this.#renderOption(`${this.#ids.answer}-${index}`, option, option, busy))}
                ${other ? this.#renderOption(`${this.#ids.answer}-other`, '', label('input.other'), busy) : nothing}
                ${input.allowFreeText
                  ? html`
                      <label class=${input.options.length === 0 ? 'form-label' : 'visually-hidden'} for=${this.#ids.answer}>
                        ${label('input.answer')}
                      </label>
                      <textarea
                        class="form-control"
                        id=${this.#ids.answer}
                        rows="2"
                        .value=${live(this.#answerText)}
                        ?disabled=${busy || !typing}
                        placeholder=${label('input.placeholder')}
                        @input=${(event) => {
                          this.#answerText = event.currentTarget.value;
                          this.requestUpdate();
                        }}
                        @keydown=${(event) => this.#answerKeydown(event)}
                      ></textarea>
                    `
                  : nothing}
              </fieldset>
              <div class="webcon-ai-assistant-actions">
                <button type="submit" class="btn btn-primary" ?disabled=${busy || answer === ''}>
                  ${icon('actions-arrow-right')}<span>${label('input.submit')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * @param {string} id
   * @param {string} value '' is "type my own"
   * @param {string} text
   * @param {boolean} busy
   */
  #renderOption(id, value, text, busy) {
    return html`
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name=${`${this.#ids.answer}-choice`}
          id=${id}
          .checked=${live(this.#choice === value)}
          ?disabled=${busy}
          @change=${() => {
            this.#choice = value;
            this.requestUpdate();
          }}
        />
        <label class="form-check-label" for=${id}>${text}</label>
      </div>
    `;
  }

  /** @param {KeyboardEvent} event */
  #answerKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      /** @type {HTMLFormElement|null} */ (event.currentTarget.form)?.requestSubmit();
    }
  }

  /** @param {SubmitEvent} event @param {string} answer */
  #submitAnswer(event, answer) {
    event.preventDefault();
    if (answer !== '' && !this.store.state.busy) {
      void this.store.answer(answer);
    }
  }

  // ------------------------------------------------------------- composer

  #renderComposer() {
    const { thread, status, busy, attachments, rules } = this.store.state;
    const { disabled, reason } = composerState(thread.phase, status?.budget?.allowed !== false, status === null || status.available === true);
    const streaming = thread.phase === 'streaming';
    const maxLength = Number(status?.limits?.maxMessageLength ?? 0);
    const suggestions = thread.items.length === 0 && !disabled && Array.isArray(status?.suggestions) ? status.suggestions : [];
    const reasonText = reason === 'composer.budget' && typeof status?.budget?.reason === 'string' && status.budget.reason !== ''
      ? status.budget.reason
      : reason === '' ? '' : label(reason);
    const canAttach = rules.extensions.length > 0;
    const pending = attachments.some((entry) => entry.status === 'uploading');

    return html`
      <form
        class="webcon-ai-assistant-composer"
        @submit=${this.#submit}
        @dragover=${this.#onDragOver}
        @drop=${this.#onDrop}
      >
        ${suggestions.length === 0
          ? nothing
          : html`<div class="webcon-ai-assistant-suggestions" role="group" aria-label=${label('composer.suggestions')}>
              ${suggestions.map(
                (suggestion) => html`<button type="button" class="btn btn-default btn-sm" @click=${() => this.store.send(String(suggestion))}>
                  ${suggestion}
                </button>`,
              )}
            </div>`}
        ${attachments.length === 0 ? nothing : this.#renderStaged(attachments)}
        <label class="visually-hidden" for=${this.#ids.message}>${label('composer.label')}</label>
        <textarea
          class="form-control webcon-ai-assistant-composer-input"
          id=${this.#ids.message}
          rows="2"
          .value=${live(this.#text)}
          maxlength=${maxLength > 0 ? maxLength : nothing}
          placeholder=${disabled ? '' : label('composer.placeholder')}
          aria-describedby=${reasonText === '' ? nothing : this.#ids.hint}
          ?disabled=${disabled && !streaming}
          ?readonly=${streaming}
          @input=${(event) => {
            this.#text = event.currentTarget.value;
          }}
          @keydown=${this.#onKeydown}
        ></textarea>
        <div class="webcon-ai-assistant-composer-bar">
          ${canAttach
            ? html`
                <input
                  type="file"
                  class="visually-hidden"
                  id=${this.#ids.file}
                  multiple
                  tabindex="-1"
                  accept=${acceptAttribute(rules)}
                  @change=${this.#onFilesPicked}
                />
                <button
                  type="button"
                  class="btn btn-default btn-sm"
                  ?disabled=${disabled}
                  @click=${() => /** @type {HTMLInputElement|null} */ (this.querySelector(`#${this.#ids.file}`))?.click()}
                >
                  ${icon('actions-upload')}<span>${label('composer.attach')}</span>
                </button>
              `
            : nothing}
          ${this.#renderContext()}
          <span class="webcon-ai-assistant-composer-spacer"></span>
          ${streaming
            ? html`<button type="button" class="btn btn-default btn-sm" @click=${() => this.store.stop()}>
                ${icon('actions-square')}<span>${label('composer.stop')}</span>
              </button>`
            : html`<button type="submit" class="btn btn-primary btn-sm" ?disabled=${disabled || busy || pending}>
                ${icon('actions-arrow-right')}<span>${label('composer.send')}</span>
              </button>`}
        </div>
        ${reasonText === '' ? nothing : html`<p class="form-text" id=${this.#ids.hint}>${reasonText}</p>`}
      </form>
    `;
  }

  /** What the model is told about where the user is. Quiet, but visible. */
  #renderContext() {
    if (this.variant !== 'panel') {
      return nothing;
    }
    const context = this.store.state.status?.context;
    const pageId = Number(context?.pageId ?? 0);
    if (pageId <= 0) {
      return nothing;
    }
    const title = typeof context?.pageTitle === 'string' && context.pageTitle !== '' ? context.pageTitle : label('context.page', { page: pageId });

    return html`<span class="badge badge-default webcon-ai-assistant-context" title=${label('context.explanation')}>
      ${icon('apps-pagetree-page-default')}<span>${title} · ${pageId}</span>
    </span>`;
  }

  /** @param {import('../chat/chat-store.js').StagedAttachment[]} attachments */
  #renderStaged(attachments) {
    return html`
      <ul class="webcon-ai-assistant-files webcon-ai-assistant-files-staged" aria-label=${label('attachments.staged')}>
        ${attachments.map(
          (entry) => html`<li class=${entry.status === 'error' ? 'text-danger' : ''}>
            ${icon(entry.status === 'uploading' ? 'spinner-circle' : entry.status === 'error' ? 'actions-exclamation-triangle' : 'actions-file')}
            <span>${entry.file.name}</span>
            <span class="text-variant">
              ${entry.status === 'error' && entry.problem !== undefined ? problemText(entry.problem) : formatBytes(entry.file.size)}
            </span>
            <button type="button" class="btn btn-link btn-sm" @click=${() => this.store.removeFile(entry.id)}>
              ${icon('actions-close')}<span class="visually-hidden">${label('attachments.remove', { name: entry.file.name })}</span>
            </button>
          </li>`,
        )}
      </ul>
    `;
  }

  /** @param {SubmitEvent} event */
  #submit(event) {
    event.preventDefault();
    const text = this.#text;
    if (text.trim() === '') {
      return;
    }
    this.#text = '';
    this.#stickToBottom = true;
    this.requestUpdate();
    void this.store.send(text);
  }

  /** @param {KeyboardEvent} event */
  #onKeydown(event) {
    if (event.key === 'Escape' && this.store.state.thread.phase === 'streaming') {
      // Stopping the turn is what Escape means here; it must not also close
      // the toolbar panel around it.
      event.preventDefault();
      event.stopPropagation();
      this.store.stop();

      return;
    }
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      /** @type {HTMLFormElement|null} */ (event.currentTarget.form)?.requestSubmit();
    }
  }

  /** @param {Event} event */
  #onFilesPicked(event) {
    const input = /** @type {HTMLInputElement} */ (event.currentTarget);
    const files = [...(input.files ?? [])];
    input.value = '';
    if (files.length > 0) {
      void this.store.addFiles(files);
    }
  }

  /** @param {DragEvent} event */
  #onDragOver(event) {
    if (event.dataTransfer?.types.includes('Files')) {
      event.preventDefault();
    }
  }

  /** @param {DragEvent} event */
  #onDrop(event) {
    const files = [...(event.dataTransfer?.files ?? [])];
    if (files.length > 0) {
      event.preventDefault();
      void this.store.addFiles(files);
    }
  }
}

if (!customElements.get('webcon-ai-assistant-chat')) {
  customElements.define('webcon-ai-assistant-chat', ChatElement);
}

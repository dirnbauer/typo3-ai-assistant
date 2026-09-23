import { html, nothing } from 'lit';
import { contentFrameUrl, recordEditUrl, showInContentFrame } from '../chat/backend.js';
import { formatDuration, formatNumber, toolDisplayName } from '../chat/format.js';
import { toolState } from './chat-element.js';
import { changeList, effectBadge, icon, label, uniqueId } from './parts.js';
import { StoreElement } from './store-element.js';

/**
 * `<webcon-ai-assistant-details>`: what the conversation did, what it cost,
 * and what the assistant runs on.
 *
 * The thread answers "what did it say"; this answers "what did it touch".
 * Changes come first because they are the consequence an editor is
 * accountable for; the tool calls below are how they came about.
 */
export class DetailsElement extends StoreElement {
  static properties = {
    ...StoreElement.properties,
    recordEditUrl: { type: String, attribute: 'record-edit-url' },
    instructionsUrl: { type: String, attribute: 'instructions-url' },
  };

  #heading = uniqueId('details');

  constructor() {
    super();
    this.recordEditUrl = '';
    this.instructionsUrl = '';
  }

  render() {
    if (this.store === null) {
      return nothing;
    }
    const { thread, status } = this.store.state;
    const calls = thread.items.filter((item) => item.kind === 'tool');
    const writes = calls.filter(
      (item) => item.call.effect !== 'read_only' && item.call.result !== undefined && !item.call.result.isError,
    ).length;

    return html`
      <section class="webcon-ai-assistant-details" aria-labelledby=${this.#heading}>
        <h2 id=${this.#heading} class="visually-hidden">${label('details.title')}</h2>

        ${thread.pendingApproval === null
          ? nothing
          : html`<div class="callout callout-warning">
              <div class="callout-icon"><span class="icon-emphasized">${icon('actions-exclamation')}</span></div>
              <div class="callout-content">
                <div class="callout-title">${label('details.waiting')}</div>
                <div class="callout-body">${label('details.waitingCalls', { count: thread.pendingApproval.calls.length })}</div>
              </div>
            </div>`}

        <h3>${label('changes.title')}</h3>
        ${changeList(
          thread.changes,
          this.recordEditUrl === ''
            ? null
            : (table, uid) => showInContentFrame(recordEditUrl(this.recordEditUrl, table, uid, contentFrameUrl())),
        )}

        <h3>${label('details.toolCalls')}</h3>
        ${calls.length === 0
          ? html`<p class="text-variant">${label('details.noToolCalls')}</p>`
          : html`<ol class="webcon-ai-assistant-call-list">
              ${calls.map(
                (item) => html`<li>
                  <code>${toolDisplayName(item.call.name)}</code> ${effectBadge(item.call.effect)}
                  <span class="text-variant">
                    ${label('tool.round', { round: item.call.round })}
                    ·
                    ${item.call.result === undefined
                      ? label(`tool.state.${toolState(item.call, thread)}`)
                      : html`${formatDuration(item.call.result.durationMs)}${item.call.result.isError ? html` · ${label('tool.state.error')}` : nothing}`}
                  </span>
                </li>`,
              )}
            </ol>`}
        ${writes > 0 ? html`<p class="text-variant">${label('details.writes', { writes, calls: calls.length })}</p>` : nothing}

        <h3>${label('details.usage')}</h3>
        <h4>${label('usage.lastTurn')}</h4>
        <dl class="webcon-ai-assistant-facts">
          ${this.#fact(label('usage.prompt'), formatNumber(thread.usage.promptTokens))}
          ${this.#fact(label('usage.completion'), formatNumber(thread.usage.completionTokens))}
          ${this.#fact(label('usage.total'), formatNumber(thread.usage.totalTokens))}
        </dl>
        ${this.#renderLimits(status)}

        <h3>${label('details.setup')}</h3>
        ${this.#renderSetup(status)}
      </section>
    `;
  }

  /** @param {string} term @param {unknown} value */
  #fact(term, value) {
    return html`<div><dt>${term}</dt><dd>${value}</dd></div>`;
  }

  /** @param {Record<string, any>|null} status */
  #renderLimits(status) {
    if (status === null) {
      return nothing;
    }
    const limits = status.limits ?? {};
    const perHour = Number(limits.turnsPerHour ?? 0);

    return html`
      <h4>${label('limits.title')}</h4>
      <dl class="webcon-ai-assistant-facts">
        ${this.#fact(
          label('limits.turnsLeft'),
          perHour === 0 ? label('limits.unlimited') : label('limits.turnsOf', { remaining: Number(limits.turnsRemaining ?? 0), limit: perHour }),
        )}
        ${this.#fact(label('limits.running'), formatNumber(Number(limits.activeConversations ?? 0)))}
        ${this.#fact(label('limits.rounds'), String(limits.maxIterations ?? ''))}
      </dl>
      <p class="text-variant">${label(status.features?.writes === true ? 'limits.writesAllowed' : 'limits.writesAsk')}</p>
      <p class=${status.budget?.allowed === false ? 'text-danger' : 'text-variant'}>
        ${status.budget?.allowed === false ? status.budget?.reason || label('composer.budget') : label('usage.withinBudget')}
      </p>
    `;
  }

  /** @param {Record<string, any>|null} status */
  #renderSetup(status) {
    if (status === null) {
      return html`<p class="text-variant">${label('details.loading')}</p>`;
    }
    const configuration = status.configuration;
    const instructions = Array.isArray(status.instructions) ? status.instructions : [];
    const tools = Array.isArray(status.tools) ? status.tools : [];

    return html`
      <h4>${label('setup.model')}</h4>
      <p>
        ${configuration === null
          ? html`<span class="text-variant">${label('setup.notConfigured')}</span>`
          : html`${configuration.name}<br /><span class="text-variant">${configuration.provider} · <code>${configuration.model}</code></span>`}
      </p>
      <h4>${label('setup.instructions', { count: instructions.length })}</h4>
      ${instructions.length === 0
        ? html`<p class="text-variant">${label('setup.noInstructions')}</p>`
        : html`<ul class="webcon-ai-assistant-plain-list">
            ${instructions.map((instruction) => html`<li>${instruction.title}</li>`)}
          </ul>`}
      ${this.instructionsUrl === '' || status.user?.admin !== true
        ? nothing
        : html`<p><a class="btn btn-default btn-sm" href=${this.instructionsUrl}>${icon('actions-document-edit')}<span>${label('setup.manageInstructions')}</span></a></p>`}
      <h4>${label('setup.tools', { count: tools.length })}</h4>
      <ul class="webcon-ai-assistant-tool-list">
        ${tools.map(
          (tool) => html`<li>
            <code>${toolDisplayName(String(tool.name))}</code>
            ${tool.requiresApproval ? html`<span class="badge badge-notice">${label('setup.asksFirst')}</span>` : nothing}
            ${effectBadge(String(tool.effect))}
          </li>`,
        )}
      </ul>
    `;
  }
}

if (!customElements.get('webcon-ai-assistant-details')) {
  customElements.define('webcon-ai-assistant-details', DetailsElement);
}

import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { colorSchemeValue, observeScheme, resolveTheme, type ColorScheme, type Theme } from '@/lib/theme';
import { Shell } from '@/shell/shell';
import type { ShellLayout } from '@/shell/shell-context';
import { shadowSafeCss } from '@/styles/shadow-css';
import rawStyles from '@/styles/tailwind.css?inline';

/**
 * `<shadcn-ui-shell>` — the element every shadcn module and the toolbar panel
 * are made of.
 *
 *   <shadcn-ui-shell layout="chat-left" app="my_ext/dashboard" props-id="shadcn-props-1">
 *   <shadcn-ui-shell layout="full"      app="my_ext/report">
 *   <shadcn-ui-shell variant="panel" [open]>                    in the TOP document
 *
 * Everything below it is a React tree inside a shadow root. The shadow root is
 * why the backend's stylesheet and this one cannot fight, and why three things
 * are arranged by hand: the stylesheet (adopted, not linked), the colour scheme
 * (mirrored, not inherited) and the portal container (given to Radix).
 */

const styles = shadowSafeCss(rawStyles);

let sheet: CSSStyleSheet | null = null;

/** One constructed sheet for every instance on the page. */
function styleSheet(): CSSStyleSheet | null {
  if (sheet !== null) {
    return sheet;
  }
  try {
    const constructed = new CSSStyleSheet();
    constructed.replaceSync(styles);
    sheet = constructed;

    return sheet;
  } catch {
    // jsdom has no constructable stylesheets; a <style> element keeps the element mountable there.
    return null;
  }
}

export const CLOSED_EVENT = 'shadcn-ui:chat-closed';

export class ShadcnUiShellElement extends HTMLElement {
  static readonly tagName = 'shadcn-ui-shell';

  static get observedAttributes(): string[] {
    return ['layout', 'variant', 'app', 'props-id', 'open'];
  }

  private root: Root | null = null;

  private mount: HTMLDivElement | null = null;

  private portal: HTMLDivElement | null = null;

  private stopObservingTheme: (() => void) | null = null;

  private scheme: ColorScheme = 'auto';

  connectedCallback(): void {
    if (this.shadowRoot === null) {
      const shadow = this.attachShadow({ mode: 'open' });
      const constructed = styleSheet();
      if (constructed === null) {
        const style = document.createElement('style');
        style.textContent = styles;
        shadow.appendChild(style);
      } else {
        shadow.adoptedStyleSheets = [constructed];
      }

      this.mount = document.createElement('div');
      this.mount.className = 'contents';
      shadow.appendChild(this.mount);

      // Radix mounts every floating layer here: a sibling of the mount, so a
      // dialog is never inside the tree it covers.
      this.portal = document.createElement('div');
      this.portal.className = 'sui-root';
      this.portal.dataset.slot = 'portal';
      shadow.appendChild(this.portal);
    }

    this.stopObservingTheme = observeScheme(this, (scheme) => {
      this.scheme = scheme;
      this.render();
    });
    this.sizeToViewport();
  }

  disconnectedCallback(): void {
    this.stopObservingTheme?.();
    this.stopObservingTheme = null;
    window.removeEventListener('resize', this.sizeToViewport);
    const root = this.root;
    this.root = null;
    // A `connectedCallback` following a move in the DOM would otherwise race an unmount.
    queueMicrotask(() => root?.unmount());
  }

  attributeChangedCallback(): void {
    if (this.isConnected) {
      this.render();
    }
  }

  get theme(): Theme {
    return resolveTheme(this.scheme, this.ownerDocument.defaultView ?? window);
  }

  private get variant(): 'layout' | 'panel' {
    return this.getAttribute('variant') === 'panel' ? 'panel' : 'layout';
  }

  private get layout(): ShellLayout {
    return this.getAttribute('layout') === 'full' ? 'full' : 'chat-left';
  }

  /** The app's props: the JSON in the `<script type="application/json">` that `props-id` names. */
  private readProps(): Record<string, unknown> {
    const id = this.getAttribute('props-id');
    if (id === null || id === '') {
      return {};
    }
    const script = this.ownerDocument.getElementById(id);
    if (script === null) {
      console.warn(`[shadcn_ui] No <script id="${id}"> with the app's props was found.`);

      return {};
    }
    try {
      const parsed: unknown = JSON.parse(script.textContent ?? '{}');

      return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
    } catch (error) {
      console.warn(`[shadcn_ui] The props in <script id="${id}"> are not valid JSON.`, error);

      return {};
    }
  }

  /**
   * A module shell fills the height below its own top edge. The module body
   * has padding and a doc header above it, so "100dvh" is wrong and "100%"
   * needs every ancestor to cooperate; the measured offset needs neither.
   */
  private readonly sizeToViewport = (): void => {
    if (this.variant === 'panel') {
      this.style.display = 'contents';
      this.style.removeProperty('height');

      return;
    }
    window.removeEventListener('resize', this.sizeToViewport);
    window.addEventListener('resize', this.sizeToViewport);
    this.style.display = 'block';
    const top = Math.max(0, Math.round(this.getBoundingClientRect().top));
    this.style.height = `calc(100dvh - ${top}px - var(--sui-shell-bottom-gap, 0px))`;
  };

  /** The backend's light/dark choice, put where `light-dark()` and `dark:` inside the shadow can see it. */
  private applyScheme(): void {
    const theme = this.theme;
    for (const node of [this, this.mount, this.portal]) {
      if (node !== null) {
        node.style.colorScheme = colorSchemeValue(this.scheme);
        node.dataset.theme = theme;
      }
    }
  }

  private render(): void {
    if (this.mount === null) {
      return;
    }
    this.applyScheme();
    this.root ??= createRoot(this.mount);

    if (this.variant === 'panel' && !this.hasAttribute('open')) {
      this.root.render(null);

      return;
    }

    this.root.render(
      <StrictMode>
        <Shell
          appName={this.getAttribute('app') ?? ''}
          appProps={this.readProps()}
          initialConversation={Number.parseInt(this.dataset.conversation ?? '', 10) || 0}
          layout={this.layout}
          onClose={() => this.close()}
          portal={this.portal}
          root={this.shadowRoot}
          theme={this.theme}
          variant={this.variant}
        />
      </StrictMode>,
    );
  }

  /**
   * Close the panel and say so. The toolbar button owns `aria-expanded` and
   * cannot know the panel closed itself unless told; the event is composed so
   * it escapes the shadow root and bubbles to the document.
   */
  close(): void {
    if (!this.hasAttribute('open')) {
      return;
    }
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent(CLOSED_EVENT, { bubbles: true, composed: true }));
  }
}

export function defineShellElement(): void {
  if (customElements.get(ShadcnUiShellElement.tagName) === undefined) {
    customElements.define(ShadcnUiShellElement.tagName, ShadcnUiShellElement);
  }
}

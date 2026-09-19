/**
 * The toolbar launcher.
 *
 * Everything this file does is put one <shadcn-ui-shell variant="panel"> into
 * the TOP document and let it be found. The panel is a custom element defined
 * by Dist/runtime.js; none of its behaviour lives here, because a launcher that
 * knows how the panel works is a second implementation of the panel.
 *
 * It runs in the top document rather than inside a module iframe: the panel
 * has to survive module navigation, and an element inside the iframe is
 * destroyed by every click in the module menu.
 *
 * Loaded by TYPO3 as `@webconsulting/shadcn-ui/launcher.js`; the toolbar item
 * renders `<button class="shadcn-ui-toolbar-btn" aria-expanded="false">`.
 */

// TYPO3 appends a cache-busting query to the module URL it loads. A static
// relative import would drop that query and the browser would keep serving the
// bundle from before the last extension update. Carrying the query across by
// hand keeps the two in step.
const runtimeUrl = new URL('./Dist/runtime.js', import.meta.url);
runtimeUrl.search = new URL(import.meta.url).search;

const ELEMENT = 'shadcn-ui-shell';
const BUTTON = '.shadcn-ui-toolbar-btn';
const OPEN_EVENT = 'shadcn-ui:open-chat';
const CLOSED_EVENT = 'shadcn-ui:chat-closed';

let runtime = null;

async function loadRuntime() {
  runtime ??= import(runtimeUrl.href).then(
    () => true,
    (error) => {
      // "Not built yet" is a real state of a development checkout. Say so
      // once and leave the button inert rather than throwing on every page.
      console.warn('[shadcn_ui] The runtime bundle could not be loaded.', error);
      return false;
    },
  );
  return runtime;
}

function panelElement() {
  const existing = document.querySelector(`${ELEMENT}[variant="panel"]`);
  if (existing) {
    return existing;
  }
  const panel = document.createElement(ELEMENT);
  panel.setAttribute('variant', 'panel');
  document.body.appendChild(panel);
  return panel;
}

function setExpanded(open) {
  document.querySelectorAll(BUTTON).forEach((button) => button.setAttribute('aria-expanded', String(open)));
}

async function openPanel() {
  if (!(await loadRuntime())) {
    return;
  }
  panelElement().setAttribute('open', '');
  setExpanded(true);
}

async function togglePanel() {
  if (!(await loadRuntime())) {
    return;
  }
  const panel = panelElement();
  const open = panel.hasAttribute('open');
  if (open) {
    panel.removeAttribute('open');
  } else {
    panel.setAttribute('open', '');
  }
  setExpanded(!open);
}

function wire() {
  const button = document.querySelector(BUTTON);
  if (!button || button.dataset.shadcnUiWired === '1') {
    return;
  }
  button.dataset.shadcnUiWired = '1';

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    void togglePanel();
  });
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      void togglePanel();
    }
  });

  // A full-width shadcn module has no chat rail; its `useShell().openChat()`
  // asks the top document for the panel through this event.
  document.addEventListener(OPEN_EVENT, () => void openPanel());

  // The panel owns its own closing (Escape, its close button) and announces it,
  // so the toolbar button's aria-expanded stays truthful.
  document.addEventListener(CLOSED_EVENT, () => setExpanded(false));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', wire);
} else {
  wire();
}

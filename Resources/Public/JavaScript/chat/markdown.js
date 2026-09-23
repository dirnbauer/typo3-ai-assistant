import DOMPurify from 'dompurify';
import { Marked } from 'marked';

/**
 * Model output, rendered as Markdown and nothing else — with the parser and
 * the sanitiser the TYPO3 core already ships.
 *
 * Three rules make it safe to put what a model wrote into the backend DOM:
 *
 * - raw HTML is never passed through: marked's `html` token is escaped, so a
 *   `<div>` the model writes stays visible as the characters it typed;
 * - the result is sanitised by a private DOMPurify instance against an
 *   allow-list of the elements Markdown produces, and handed over as a
 *   DocumentFragment — nothing is assigned to `innerHTML` in the page;
 * - every link opens in a new tab with `rel="noopener noreferrer"`, because a
 *   link that navigates the backend away mid-run loses the run, and only
 *   http(s) and mailto links survive at all. Images become links: a picture a
 *   model points at is a request to a server nobody chose.
 *
 * Headings are demoted to bold paragraphs: the module has its own outline, and
 * a model's `#` must not become the page's second `<h1>`.
 */

const SAFE_URL = /^(?:https?:|mailto:)/i;

/** @param {string} text */
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);
}

const markdown = new Marked({
  async: false,
  gfm: true,
  breaks: false,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    heading({ tokens }) {
      return `<p class="webcon-ai-assistant-md-heading"><strong>${this.parser.parseInline(tokens)}</strong></p>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      if (!SAFE_URL.test(href)) {
        return text;
      }
      const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';

      return `<a href="${escapeHtml(href)}"${titleAttribute} target="_blank" rel="noopener noreferrer">${text}</a>`;
    },
    image({ href, text }) {
      const label = escapeHtml(text || href);

      return SAFE_URL.test(href)
        ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : label;
    },
  },
});

const purify = DOMPurify(window);

const SANITIZE = {
  ALLOWED_TAGS: [
    'a', 'blockquote', 'br', 'code', 'del', 'em', 'hr', 'input', 'li', 'ol', 'p', 'pre', 's',
    'strong', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul',
  ],
  ALLOWED_ATTR: ['align', 'checked', 'class', 'disabled', 'href', 'rel', 'start', 'target', 'title', 'type'],
  // Only `href` is a URL here, and only http(s) and mailto survive in it. The
  // other attributes are not URLs and must not be tested as if they were.
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:)/i,
  ADD_URI_SAFE_ATTR: ['align', 'checked', 'disabled', 'rel', 'start', 'target', 'type'],
  RETURN_DOM_FRAGMENT: true,
};

/**
 * @param {string} source Markdown a model wrote
 * @returns {DocumentFragment}
 */
export function renderMarkdown(source) {
  const html = /** @type {string} */ (markdown.parse(source));
  const fragment = /** @type {DocumentFragment} */ (purify.sanitize(html, SANITIZE));

  // Classes survive sanitising only where they are ours or a code language.
  for (const element of fragment.querySelectorAll('[class]')) {
    const keep = [...element.classList].filter(
      (name) => name === 'webcon-ai-assistant-md-heading' || (element.localName === 'code' && name.startsWith('language-')),
    );
    element.className = keep.join(' ');
    if (keep.length === 0) {
      element.removeAttribute('class');
    }
  }
  // Only task-list checkboxes are inputs in Markdown, and they are read-only.
  for (const input of fragment.querySelectorAll('input')) {
    if (input.type !== 'checkbox') {
      input.remove();
      continue;
    }
    input.disabled = true;
  }
  // Tables take the backend's own table style and scroll on their own.
  for (const table of fragment.querySelectorAll('table')) {
    table.className = 'table table-sm table-bordered';
    const wrapper = document.createElement('div');
    wrapper.className = 'table-fit';
    table.replaceWith(wrapper);
    wrapper.append(table);
  }

  return fragment;
}

/**
 * `<webcon-ai-assistant-markdown .source=${text}>` — re-renders only when the
 * source changes, so a thread re-rendering for a new event does not re-parse
 * every message it already shows.
 */
export class MarkdownElement extends HTMLElement {
  #source = '';

  get source() {
    return this.#source;
  }

  set source(value) {
    const next = typeof value === 'string' ? value : '';
    if (next === this.#source && this.childNodes.length > 0) {
      return;
    }
    this.#source = next;
    this.replaceChildren(renderMarkdown(next));
  }
}

if (!customElements.get('webcon-ai-assistant-markdown')) {
  customElements.define('webcon-ai-assistant-markdown', MarkdownElement);
}

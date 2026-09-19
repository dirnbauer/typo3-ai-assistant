/**
 * The backend's colour scheme, mirrored onto the shadow host.
 *
 * TYPO3 writes its light/dark choice as `data-color-scheme` on `<html>` and a
 * rule on `:root` turns that into `color-scheme`. `:root` is the backend's
 * document element, not ours, so every `light-dark()` inside the shadow would
 * resolve against the browser default — a dark backend with a white chat. So
 * the decision is copied onto the host and watched: the user can switch without
 * reloading, and `user-settings-manager.js` rewrites the attribute on both the
 * top document and the module iframe.
 */

export type ColorScheme = 'light' | 'dark' | 'auto';

export type Theme = 'light' | 'dark';

export const SCHEME_ATTRIBUTE = 'data-color-scheme';

export function readScheme(element: Element): ColorScheme {
  const value = element.ownerDocument.documentElement.getAttribute(SCHEME_ATTRIBUTE);

  return value === 'dark' || value === 'light' ? value : 'auto';
}

/** The `color-scheme` value that makes `light-dark()` inside the shadow agree with the outside. */
export function colorSchemeValue(scheme: ColorScheme): string {
  switch (scheme) {
    case 'dark':
      return 'only dark';
    case 'light':
      return 'only light';
    default:
      return 'light dark';
  }
}

/** What the shell paints right now. `auto` asks the platform, like TYPO3's own `light-dark()`. */
export function resolveTheme(scheme: ColorScheme, view: Window): Theme {
  if (scheme !== 'auto') {
    return scheme;
  }
  try {
    return view.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/**
 * Watch the backend's scheme and report every change, including the first.
 * The media-query listener matters as much as the attribute observer: while the
 * setting is `auto`, nothing on the document changes when the OS flips at sunset.
 */
export function observeScheme(element: Element, onChange: (scheme: ColorScheme) => void): () => void {
  const root = element.ownerDocument.documentElement;
  const view = element.ownerDocument.defaultView ?? window;

  const report = () => onChange(readScheme(element));
  report();

  const observer = new MutationObserver(report);
  observer.observe(root, { attributes: true, attributeFilter: [SCHEME_ATTRIBUTE] });

  let media: MediaQueryList | null = null;
  try {
    media = view.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', report);
  } catch {
    media = null;
  }

  return () => {
    observer.disconnect();
    media?.removeEventListener('change', report);
  };
}

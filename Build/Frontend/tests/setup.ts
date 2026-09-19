import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

/**
 * What jsdom does not have and the shell needs.
 *
 * Only the APIs the code actually calls are stubbed, and each stub behaves the
 * way the real one does in the case under test — a stub that lies is worse
 * than a missing feature, because the test then proves the stub.
 */

if (!('matchMedia' in window)) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

if (!('ResizeObserver' in window)) {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    },
  });
}

// jsdom lays nothing out, so scrolling an element into view is a no-op it does
// not implement at all.
Element.prototype.scrollIntoView ??= function scrollIntoView(): void {};

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

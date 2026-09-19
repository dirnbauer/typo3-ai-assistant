import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppOutlet } from '@/shell/app-outlet';
import { defineShadcnApp, getShadcnApp, registeredApps, resetRegistry } from '@/shell/registry';
import { ShadcnUiShellElement, defineShellElement } from '@/shell/element';
import type { AppProps } from '@/shell/registry';
import type { ShellApi } from '@/shell/shell-context';

/**
 * The contract an extension building on the base actually depends on: the app
 * it registers is the app the shell mounts, whichever of the two modules the
 * import map loads first.
 */

const shell: ShellApi = {
  layout: 'chat-left',
  chatOpen: true,
  openChat: () => undefined,
  closeChat: () => undefined,
  toggleChat: () => undefined,
  setContext: () => undefined,
  openCommandPalette: () => undefined,
  focusComposer: () => undefined,
};

beforeEach(() => {
  resetRegistry();
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('defineShadcnApp', () => {
  it('refuses a name that is not vendor-prefixed, because two extensions would collide', () => {
    expect(() => defineShadcnApp('dashboard', () => null)).toThrow('vendor-prefixed');
    expect(() => defineShadcnApp('  ', () => null)).toThrow();
  });

  it('keeps apps by name and lists them in a stable order', () => {
    defineShadcnApp('my_ext/report', () => null);
    defineShadcnApp('a_ext/dashboard', () => null);

    expect(registeredApps()).toEqual(['a_ext/dashboard', 'my_ext/report']);
    expect(getShadcnApp('my_ext/report')).toBeDefined();
    expect(getShadcnApp('nobody/home')).toBeUndefined();
  });
});

describe('AppOutlet', () => {
  it('renders the registered app with its props', () => {
    defineShadcnApp('my_ext/dashboard', ({ props }: AppProps) => <p>Groups: {String(props.groups)}</p>);

    render(<AppOutlet appName="my_ext/dashboard" props={{ groups: 6 }} shell={shell} />);

    expect(screen.getByText('Groups: 6')).toBeInTheDocument();
  });

  it('waits quietly for an app whose module has not loaded yet, then renders it', () => {
    render(<AppOutlet appName="my_ext/late" props={{}} shell={shell} />);

    expect(screen.queryByText(/No app is registered/)).not.toBeInTheDocument();

    act(() => {
      defineShadcnApp('my_ext/late', () => <p>Arrived late.</p>);
    });

    expect(screen.getByText('Arrived late.')).toBeInTheDocument();
  });

  it('names the missing app and the apps that did register, once waiting has failed', () => {
    defineShadcnApp('other_ext/dashboard', () => null);
    render(<AppOutlet appName="my_ext/typo" props={{}} shell={shell} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/No app is registered as “my_ext\/typo”/)).toBeInTheDocument();
    expect(screen.getByText('other_ext/dashboard')).toBeInTheDocument();
  });

  it('fences a throwing app so the chat beside it keeps working', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    defineShadcnApp('my_ext/broken', () => {
      throw new Error('props.rows is undefined');
    });

    render(<AppOutlet appName="my_ext/broken" props={{}} shell={shell} />);

    expect(screen.getByText(/stopped rendering/)).toBeInTheDocument();
    expect(screen.getByText('props.rows is undefined')).toBeInTheDocument();
    consoleError.mockRestore();
  });
});

describe('<shadcn-ui-shell>', () => {
  it('is defined once, however often the runtime module is evaluated', () => {
    defineShellElement();
    defineShellElement();

    expect(customElements.get('shadcn-ui-shell')).toBe(ShadcnUiShellElement);
  });

  it('mounts a shadow root with a mount point and a portal container for Radix', () => {
    defineShellElement();
    const element = document.createElement('shadcn-ui-shell');
    element.setAttribute('layout', 'full');
    document.body.appendChild(element);

    expect(element.shadowRoot).not.toBeNull();
    expect(element.shadowRoot?.querySelector('[data-slot="portal"]')).not.toBeNull();

    element.remove();
  });

  it('closes itself once and says so, so the toolbar button can follow', () => {
    defineShellElement();
    const element = document.createElement('shadcn-ui-shell') as ShadcnUiShellElement;
    element.setAttribute('variant', 'panel');
    element.setAttribute('open', '');
    document.body.appendChild(element);

    const closed = vi.fn();
    document.addEventListener('shadcn-ui:chat-closed', closed);
    element.close();
    element.close();
    document.removeEventListener('shadcn-ui:chat-closed', closed);

    expect(element.hasAttribute('open')).toBe(false);
    expect(closed).toHaveBeenCalledTimes(1);

    element.remove();
  });
});

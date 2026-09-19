import { useSyncExternalStore, type ComponentType } from 'react';
import type { ShellApi } from '@/shell/shell-context';

/**
 * Apps, by name.
 *
 * `runtime.js` and an app's module are both loaded through TYPO3's import map,
 * in no guaranteed order: the shell may upgrade before the app has called
 * `defineShadcnApp()`. So the registry is observable — the outlet subscribes
 * and renders the moment the app arrives — and there is no timing to get right.
 */

export interface AppProps {
  props: Record<string, unknown>;
  shell: ShellApi;
}

export type ShadcnAppComponent = ComponentType<AppProps>;

const apps = new Map<string, ShadcnAppComponent>();
const listeners = new Set<() => void>();

export function defineShadcnApp(name: string, component: ShadcnAppComponent): void {
  if (name.trim() === '' || !name.includes('/')) {
    throw new Error(`defineShadcnApp: "${name}" is not a vendor-prefixed app name like "my_ext/dashboard".`);
  }
  apps.set(name, component);
  for (const listener of listeners) {
    listener();
  }
}

export function getShadcnApp(name: string): ShadcnAppComponent | undefined {
  return apps.get(name);
}

export function registeredApps(): string[] {
  return [...apps.keys()].sort();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

/** The component registered under `name`, re-rendering when it is (re)defined. */
export function useShadcnApp(name: string): ShadcnAppComponent | undefined {
  return useSyncExternalStore(subscribe, () => apps.get(name), () => apps.get(name));
}

/** Only tests need this. */
export function resetRegistry(): void {
  apps.clear();
}

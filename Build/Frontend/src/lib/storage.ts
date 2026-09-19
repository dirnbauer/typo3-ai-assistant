/**
 * `localStorage` that cannot take the shell down with it.
 *
 * Reading it throws in real situations (blocked site data, a partitioned
 * iframe). A remembered rail width is never worth an exception, so every access
 * degrades to the caller's default.
 */

const PREFIX = 'shadcnUi.';

export function readSetting(key: string): string | null {
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

export function writeSetting(key: string, value: string): void {
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    // A preference that cannot be stored still works for this session.
  }
}

export function readNumber(key: string, fallback: number): number {
  const raw = readSetting(key);
  if (raw === null) {
    return fallback;
  }
  const parsed = Number.parseFloat(raw);

  return Number.isFinite(parsed) ? parsed : fallback;
}

export function readBoolean(key: string, fallback: boolean): boolean {
  const raw = readSetting(key);

  return raw === null ? fallback : raw === '1';
}

export function writeBoolean(key: string, value: boolean): void {
  writeSetting(key, value ? '1' : '0');
}

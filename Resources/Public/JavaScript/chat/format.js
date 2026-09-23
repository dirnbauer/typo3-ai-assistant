/**
 * Numbers, sizes, durations and times as a backend user reads them.
 *
 * The locale is the backend's own (`<html lang>`), never the browser's, so a
 * German backend on an English browser still reads "1,5 MB".
 *
 * Framework-free on purpose: Tests/JavaScript runs it under `node --test`.
 */

/**
 * @param {string} [lang]
 * @returns {string|undefined} undefined lets Intl use its default
 */
export function backendLocale(lang = globalThis.document?.documentElement?.lang ?? '') {
  return lang === '' ? undefined : lang;
}

/**
 * @param {number} bytes
 * @param {string} [locale]
 */
export function formatBytes(bytes, locale = backendLocale()) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }
  const units = ['B', 'kB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  const digits = value >= 10 || exponent === 0 ? 0 : 1;

  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)} ${units[exponent]}`;
}

/**
 * A tool run's duration, rounded to what a person can act on.
 *
 * @param {number} milliseconds
 * @param {string} [locale]
 */
export function formatDuration(milliseconds, locale = backendLocale()) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return '';
  }
  if (milliseconds < 1000) {
    return `${Math.round(milliseconds)} ms`;
  }
  if (milliseconds < 60_000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(milliseconds / 1000)} s`;
  }

  return `${Math.floor(milliseconds / 60_000)} min ${Math.round((milliseconds % 60_000) / 1000)} s`;
}

/**
 * @param {number} value
 * @param {string} [locale]
 */
export function formatNumber(value, locale = backendLocale()) {
  return new Intl.NumberFormat(locale).format(Math.round(value));
}

/**
 * A unix timestamp (seconds): the time alone when it is today, date and time otherwise.
 *
 * @param {number} seconds
 * @param {string} [locale]
 * @param {Date} [now]
 */
export function formatTimestamp(seconds, locale = backendLocale(), now = new Date()) {
  if (!seconds) {
    return '';
  }
  const date = new Date(seconds * 1000);
  const sameDay =
    date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

  return sameDay
    ? date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleString(locale, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

/** The ISO form for `<time datetime>`. @param {number} seconds */
export function isoTimestamp(seconds) {
  return seconds ? new Date(seconds * 1000).toISOString() : '';
}

/**
 * `typo3_WriteTable` is the name the runtime knows; `WriteTable` is the name a
 * TYPO3 integrator recognises.
 *
 * @param {string} name
 */
export function toolDisplayName(name) {
  return name.startsWith('typo3_') ? name.slice('typo3_'.length) : name;
}

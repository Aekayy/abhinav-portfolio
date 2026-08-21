/**
 * Page theme. Light is the default; dark is the same gallery in nighttime,
 * opt-in and remembered.
 *
 * A portfolio is usually opened cold from a link, so it starts in daylight
 * unless the visitor has asked for dark on this site.
 */
export type Theme = 'light' | 'dark'
const KEY = 'ak-theme'

export function readTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'light'
  try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light' } catch { return 'light' }
}

export function applyTheme(t: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', t)
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', t === 'dark' ? '#181818' : '#faf4f4')
}

export function storeTheme(t: Theme): void {
  try { localStorage.setItem(KEY, t) } catch { /* storage can be blocked */ }
}

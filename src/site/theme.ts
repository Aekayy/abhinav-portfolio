/**
 * Page theme. Dark is the reference and the default; light is the same
 * gallery in daylight, opt-in and remembered.
 *
 * A portfolio is usually opened cold from a link, so it follows the reference
 * rather than the OS setting — everyone sees the gallery unless they have
 * asked for daylight on this site.
 */
export type Theme = 'light' | 'dark'
const KEY = 'ak-theme'

export function readTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark'
  try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark' } catch { return 'dark' }
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

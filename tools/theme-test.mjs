/**
 * Checks both themes are complete and legible, from the CSS that ships.
 *
 * Dark is the reference verbatim and the default; light is the same gallery
 * translated to daylight. The failure modes this guards: a role token missing
 * from one theme (silently falling back to something nobody designed), the
 * dark palette drifting from the reference, a text pair dipping under 4.5:1,
 * and the default/restore machinery breaking.
 *
 * Reading the built stylesheet rather than the source, because the built file
 * is the thing a visitor gets.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const distDir = fileURLToPath(new URL('../dist/assets', import.meta.url))
if (!existsSync(distDir)) {
  console.error('no build found — run npm run build first')
  process.exit(1)
}
const cssFile = readdirSync(distDir).find((f) => f.endsWith('.css'))
const css = readFileSync(`${distDir}/${cssFile}`, 'utf8')

/** Pull the custom properties out of the first rule matching a selector. */
function tokensFor(selector) {
  const at = css.indexOf(selector)
  if (at < 0) return null
  const open = css.indexOf('{', at)
  const close = css.indexOf('}', open)
  const body = css.slice(open + 1, close)
  const out = {}
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) out[m[1]] = m[2].trim()
  return out
}

const light = tokensFor('[data-theme=light]') ?? tokensFor(':root,[data-theme=light]')
const dark = tokensFor('[data-theme=dark]')

const rows = []
let failed = 0
const check = (name, ok, detail = '') => {
  rows.push({ check: name, result: ok ? 'pass' : 'FAIL', detail })
  if (!ok) failed++
}

check('light theme defined', !!light, light ? `${Object.keys(light).length} tokens` : 'missing')
check('dark theme defined', !!dark, dark ? `${Object.keys(dark).length} tokens` : 'missing')

if (light && dark) {
  // Every role must exist in both, or one theme silently falls back to the
  // other's value and produces something nobody designed.
  const roles = ['--page', '--surface', '--surface-2', '--line', '--line-strong',
    '--ink', '--ink-muted']
  const missingLight = roles.filter((r) => !light[r])
  const missingDark = roles.filter((r) => !dark[r])
  check('every role exists in light', missingLight.length === 0, missingLight.join(' ') || 'all present')
  check('every role exists in dark', missingDark.length === 0, missingDark.join(' ') || 'all present')

  // The dark palette is the reference, verbatim — not approximately.
  const reference = {
    '--page': '#181818', '--surface': '#262626', '--ink': '#fafafa', '--ink-muted': '#a3a3a3',
  }
  for (const [token, want] of Object.entries(reference)) {
    check(`dark ${token} is the reference value`, dark[token] === want, `${dark[token]} (want ${want})`)
  }

  const srgb = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  const lum = (hex) => {
    const h = hex.replace('#', '')
    const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
  }
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
    return (x + 0.05) / (y + 0.05)
  }

  const pairs = [
    ['body text', '--ink', '--page', 4.5],
    ['muted text on page', '--ink-muted', '--page', 4.5],
    ['muted text on surface', '--ink-muted', '--surface', 4.5],
    // Borders are not text, so the non-text bar applies.
    ['hairline on page', '--line', '--page', 1.15],
    // A card has to be perceptible against the page.
    ['a card against the page', '--surface', '--page', 1.15],
    // A control edge has to be visible against the surface it sits on.
    ['a control edge on a card', '--line-strong', '--surface', 1.9],
  ]

  for (const [name, fg, bg, min] of pairs) {
    for (const [themeName, t] of [['light', light], ['dark', dark]]) {
      if (!t[fg] || !t[bg]) continue
      const r = ratio(t[fg], t[bg])
      check(`${themeName}: ${name}`, r >= min, `${r.toFixed(2)}:1 (needs ${min})`)
    }
  }
}

// The gallery opens light. A portfolio is opened cold from a link, usually in
// daylight, so daylight is the honest first impression; dark is the
// reference's identity but it is opt-in, and a returning visitor's choice is
// restored by the inline script before first paint.
//
// This assertion used to read data-theme="dark" and had gone stale against
// both index.html and src/site/theme.ts, which have defaulted to light for a
// while. A test that disagrees with the code it guards is worse than no test.
const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8')
check('site opens light', /<html[^>]*data-theme="light"/.test(html), '')
check('stored preference applied before paint', html.includes("localStorage.getItem('ak-theme')"), '')

console.table(rows)
if (failed) {
  console.error(`\n${failed} theme check(s) failed.`)
  process.exit(1)
}
console.log('\nboth themes are complete, dark is verbatim, and every text pair clears 4.5:1.')

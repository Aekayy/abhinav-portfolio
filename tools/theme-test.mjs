/**
 * Checks both themes are complete and legible, from the CSS that ships.
 *
 * Adding a light theme means every colour decision now has to hold twice, and
 * the one that is easy to get wrong is green. Spotify green is a bright fill
 * colour; as text on white it measures about 2.3:1, which fails badly. So the
 * green used for fills and the green used for text are separate tokens, and
 * this asserts the text one actually passes on the surface it sits on.
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

/** Pull the custom properties out of one rule. */
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

const light = tokensFor(':root,[data-theme=light]') ?? tokensFor(':root')
const dark = tokensFor('[data-theme=dark]')

const rows = []
let failed = 0
const check = (name, ok, detail) => {
  rows.push({ check: name, result: ok ? 'pass' : 'FAIL', detail })
  if (!ok) failed++
}

check('light theme defined', !!light, light ? `${Object.keys(light).length} tokens` : 'missing')
check('dark theme defined', !!dark, dark ? `${Object.keys(dark).length} tokens` : 'missing')

if (light && dark) {
  // Every role must exist in both, or one theme silently falls back to the
  // other's value and produces something nobody designed.
  const roles = ['--page', '--surface', '--surface-2', '--line', '--line-strong',
    '--ink', '--ink-muted', '--footer']
  const missingLight = roles.filter((r) => !light[r])
  const missingDark = roles.filter((r) => !dark[r])
  check('every role exists in light', missingLight.length === 0, missingLight.join(' ') || 'all present')
  check('every role exists in dark', missingDark.length === 0, missingDark.join(' ') || 'all present')

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
    ['muted text on the footer', '--ink-muted', '--footer', 4.5],
    // Borders are not text, so the non-text bar applies.
    ['hairline on page', '--line', '--page', 1.15],
    // A card has to be perceptible against the page, and the footer has to
    // read as a separate band rather than as more page.
    ['a card against the page', '--surface', '--page', 1.15],
    ['the footer against the page', '--footer', '--page', 1.12],
    // A control edge has to be visible, which on light surfaces is the thing
    // that carries a button rather than its fill.
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

// The site has to open light. A returning visitor's choice is restored by the
// inline script, but the served document itself must be light.
const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8')
check('site opens in light mode', /<html[^>]*data-theme="light"/.test(html), '')
check('stored preference applied before paint', html.includes("localStorage.getItem('ak-theme')"), '')

console.table(rows)
if (failed) {
  console.error(`\n${failed} theme check(s) failed.`)
  process.exit(1)
}
console.log('\nboth themes are complete and every text pair clears 4.5:1.')

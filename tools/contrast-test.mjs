/**
 * Fails if any part of the site paints a background that ignores the theme.
 *
 * This exists because of a specific bug. The case study section carried
 * bg-[#0d0d0d] — a near black band, hardcoded, left over from when the site
 * was dark only. Once the page went light, every heading inside it was still
 * being coloured with the light theme's near black ink, on that near black
 * band, so the headings vanished while the body copy underneath stayed
 * readable. It looked like a text colour bug and was actually a background one.
 *
 * A hardcoded surface is the dangerous kind, because text sitting on it is
 * coloured by tokens that know nothing about it. Hardcoded text on a tokenised
 * surface is the same fault the other way round.
 *
 * The mockups are exempt and must say so out loud with data-theme="dark".
 * They are pictures of the Spotify app, which is dark in both themes, and the
 * attribute is what makes the tokens inside them resolve dark to match.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith('.tsx')) out.push(p)
  }
  return out
}

/** Colours that are legitimately fixed, with the reason they are allowed. */
/** Nothing is exempt yet: every colour on this site comes from a token. */
const ALLOWED = []

const rows = []
let failed = 0

for (const file of walk(join(root, 'src', 'site'))) {
  const rel = file.slice(root.length).replace(/\\/g, '/')
  const src = readFileSync(file, 'utf8')

  /*
   * Exemption is something a file states, never something its folder confers.
   *
   * This used to exempt everything under mockups/, which was wrong in a way
   * that took a bug to expose. Walkthrough.tsx lives there but is a section of
   * the marketing page, not a device screen: it painted its own #181818 band
   * and the Pause button on top of it took its colour from the theme, so in
   * light mode the label went near-black on a near-black strip. The file was
   * never checked, because of where it happened to sit.
   *
   * A file is exempt if it renders a dark surface itself, or if it says in one
   * line why it is drawn inside one. Both are visible when reading the file.
   */
  const declaresDark = src.includes('data-theme="dark"') || src.includes('@theme-exempt')

  for (const m of src.matchAll(/\b(bg|text|border|ring|divide)-\[(#[0-9a-fA-F]{3,8})\]/g)) {
    const [, prop, colour] = m
    if (ALLOWED.includes(colour.toLowerCase())) continue

    // Which line, so a failure is actionable rather than a scavenger hunt.
    const line = src.slice(0, m.index).split('\n').length
    const ok = declaresDark
    if (!ok) failed++
    rows.push({
      file: `${rel}:${line}`,
      found: `${prop}-[${colour}]`,
      verdict: ok ? 'exempt (declares a dark surface)' : 'IGNORES THE THEME',
    })
  }

  // Literal white and black are the same hazard as a literal hex, and easier
  // to overlook because they read as neutral rather than as a colour. The seek
  // bar's played portion was bg-white, which is a white bar on a white panel.
  for (const m of src.matchAll(/\b(bg|text|border|ring|divide)-(white|black)(\/\d+)?\b/g)) {
    const [found] = m
    const line = src.slice(0, m.index).split('\n').length
    const ok = declaresDark
    if (!ok) failed++
    rows.push({
      file: `${rel}:${line}`,
      found,
      verdict: ok ? 'exempt (declares a dark surface)' : 'IGNORES THE THEME',
    })
  }

  // Inline backgrounds are the same hazard wearing different clothes, and this
  // is how the hero slipped through. Its scrim is a gradient in a style prop —
  // no bracket class anywhere — so the check above never saw it, while the
  // headline on top of it was being coloured by a token that had no idea it
  // was sitting on a photograph.
  for (const m of src.matchAll(/background(?:Image|Color)?:\s*['"`]([^'"`]*(?:rgba?\([^)]*\)|#[0-9a-fA-F]{3,8})[^'"`]*)/g)) {
    const value = m[1]
    // Colours interpolated from data are the component's own subject matter.
    if (value.includes('${')) continue
    const dark = [...value.matchAll(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)]
      .some(([, r, g, b]) => (Number(r) + Number(g) + Number(b)) / 3 < 90)
    if (!dark) continue

    const line = src.slice(0, m.index).split('\n').length
    const ok = declaresDark
    if (!ok) failed++
    rows.push({
      file: `${rel}:${line}`,
      found: `inline dark background`,
      verdict: ok ? 'exempt (declares a dark surface)' : 'IGNORES THE THEME',
    })
  }
}

// The base layer is easy to forget: it is written once and never looked at
// again, but a fixed white focus ring is invisible on a white page.
const css = readFileSync(join(root, 'src', 'index.css'), 'utf8')
const baseChecks = [
  ['focus ring follows the theme', /:focus-visible\s*{[^}]*var\(--ink\)/.test(css)],
  ['color-scheme is not pinned dark', !/:root\s*{[^}]*color-scheme:\s*dark/.test(css)],
]
for (const [name, ok] of baseChecks) {
  if (!ok) failed++
  rows.push({ file: 'src/index.css', found: name, verdict: ok ? 'ok' : 'FIXED TO ONE THEME' })
}

console.table(rows)
const bad = rows.filter((r) => r.verdict === 'IGNORES THE THEME' || r.verdict === 'FIXED TO ONE THEME')
if (bad.length) {
  console.error(`\n${bad.length} place(s) paint a colour the theme cannot reach.`)
  process.exit(1)
}
console.log(`\n${rows.length} colour sites checked; every one either follows the theme or declares itself dark.`)

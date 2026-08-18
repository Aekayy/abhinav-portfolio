/**
 * Checks nothing is wider than the screen it has to fit on.
 *
 * There is no browser here to lay the page out, so this does the one thing
 * that can be done reliably without one: find every element whose width is
 * pinned in the markup, work out which viewports it is actually rendered at,
 * and compare. That catches the failure that matters — a fixed pixel width
 * larger than a phone, which pushes the whole document sideways and leaves
 * every section scrollable.
 *
 * It cannot catch text wrapping badly or a grid looking cramped. Those need
 * eyes. What it does catch is the two classes of bug that have actually
 * reached a phone here: a fixed pixel width larger than the screen, and an
 * item that refuses to shrink below its own content.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))

/** Viewports, and the content width left after the shell's padding. */
const VIEWPORTS = [
  { name: 'phone',        width: 375,  content: 375 - 32 },
  { name: 'large phone',  width: 430,  content: 430 - 32 },
  { name: 'tablet',       width: 768,  content: 768 - 48 },
  { name: 'laptop',       width: 1280, content: 1200 },
]

/** Tailwind's min-width breakpoints. */
const BP = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }

/** The mockup screens are rendered at a fixed size then scaled down. */
/** No scaled device frames here yet; kept so the check still applies if any land. */
const SCREEN = { BrowserFrame: 1440, PhoneFrame: 402, AnimatedPhone: 402 }

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith('.tsx')) out.push(p)
  }
  return out
}

const rows = []
let failed = 0

for (const file of walk(join(root, 'src'))) {
  const src = readFileSync(file, 'utf8')
  const rel = file.slice(root.length)

  for (const [, comp, scaleRaw] of src.matchAll(/<(BrowserFrame|PhoneFrame|AnimatedPhone)\s+scale=\{([\d.]+)\}/g)) {
    const scale = Number(scaleRaw)
    const width = Math.round(SCREEN[comp] * scale)

    // Which viewports does this instance actually appear at? Read the guard on
    // the wrapper immediately before it.
    const at = src.indexOf(`<${comp} scale={${scaleRaw}}`)
    const before = src.slice(Math.max(0, at - 220), at)
    const guard = (before.match(/className="([^"]*)"[^"]*$/) ?? [])[1] ?? ''

    let min = 0
    let max = Infinity
    for (const [bp, px] of Object.entries(BP)) {
      if (new RegExp(`\\b${bp}:block\\b`).test(guard)) min = Math.max(min, px)
      if (new RegExp(`\\b${bp}:hidden\\b`).test(guard)) max = Math.min(max, px - 1)
    }
    // A bare `hidden` means hidden until some breakpoint turns it on. It must
    // not be confused with `sm:hidden`, which means the opposite, so the match
    // is anchored to a whole class rather than a word boundary.
    if (/(^|\s)hidden(\s|$)/.test(guard) && min === 0) min = BP.sm

    for (const v of VIEWPORTS) {
      if (v.width < min || v.width > max) continue
      const fits = width <= v.content
      if (!fits) failed++
      rows.push({
        file: rel,
        element: `${comp} @ ${scale}`,
        viewport: v.name,
        width: `${width}px`,
        available: `${v.content}px`,
        result: fits ? 'fits' : 'OVERFLOWS',
      })
    }
  }
}

// A pinned minimum width is only safe if something above it can scroll.
for (const file of walk(join(root, 'src'))) {
  const src = readFileSync(file, 'utf8')
  const rel = file.slice(root.length)
  for (const [, px] of src.matchAll(/min-w-\[(\d+)px\]/g)) {
    const w = Number(px)
    if (w <= VIEWPORTS[0].content) continue
    const scrollable = /overflow-x-auto|overflow-auto|overflow-x-scroll/.test(src)
    if (!scrollable) failed++
    rows.push({
      file: rel,
      element: `min-w-[${px}px]`,
      viewport: 'phone',
      width: `${px}px`,
      available: `${VIEWPORTS[0].content}px`,
      result: scrollable ? 'scrolls' : 'OVERFLOWS',
    })
  }
}

/*
 * Items that cannot shrink.
 *
 * The checks above only knew about widths written into the markup, so they
 * passed while a phone was still panning sideways. The cause was a different
 * shape of bug entirely: a grid item's default min-width is auto, meaning it
 * refuses to shrink below its own content. Put a long unbroken filename in a
 * column and the column grows past the viewport, and no amount of truncate on
 * the text inside can help, because it is the item that is expanding.
 *
 * So this looks for the combination that causes it: a grid or flex container
 * holding a child that renders interpolated text, where nothing in the chain
 * allows shrinking.
 */
const shrinkRows = []
for (const file of walk(join(root, 'src'))) {
  const src = readFileSync(file, 'utf8')
  const rel = file.slice(root.length).replace(/\\/g, '/')

  /*
   * Items, not containers. The container is normally a block box that fills
   * its parent and is in no danger; it is the item inside a grid or flex row
   * whose min-width defaults to auto and therefore refuses to shrink.
   *
   * Only repeated items are judged here, because they are the ones this can
   * read reliably: the element opened immediately inside a .map(. Fixed
   * columns are asserted by name in render-test instead, where the intent is
   * unambiguous and a heuristic would only add noise.
   */
  // Screens inside a device frame render at a fixed size and are then scaled,
  // so shrinking does not apply to them.
  

  const itemPattern = /\.map\(\([^)]*\)\s*=>\s*\(?\s*<(?:div|button|li)[^>]*className="([^"]*)"/g

  for (const m of src.matchAll(itemPattern)) {
    const cls = m[1] ?? ''
    const line = src.slice(0, m.index).split('\n').length

    // Only worth checking if the thing inside has a length nobody controls.
    const block = src.slice(m.index, m.index + 700)
    const holdsDynamicText = /\{[a-z][\w.]*\.(title|artist|name|label)\}/.test(block)
    if (!holdsDynamicText) continue

    // A container that pins its own minimum width is deliberately wider than
    // the screen and lives inside something that scrolls, which is a different
    // and already-handled case.
    if (/\bmin-w-\[\d+px\]/.test(cls)) continue

    // The item must be able to shrink, or be told to truncate. Checking the
    // item itself is the point: truncate on a descendant cannot rescue a box
    // whose own min-width is auto.
    const canShrink = /\bmin-w-0\b/.test(cls) || /\btruncate\b/.test(cls)
    shrinkRows.push({
      file: `${rel}:${line}`,
      container: cls.slice(0, 46),
      holds: 'text from data',
      result: canShrink ? 'can shrink' : 'CANNOT SHRINK',
    })
    if (!canShrink) failed++
  }
}
if (shrinkRows.length) {
  console.log('\nlayout items holding text of unknown length:')
  console.table(shrinkRows)
}

// The page must not be able to pan sideways whatever slips through above.
const css = readFileSync(join(root, 'src', 'index.css'), 'utf8')
const guards = [
  ['page cannot scroll sideways', /html,\s*body\s*\{\s*overflow-x:\s*clip/.test(css)],
  // hidden would break the sticky header; clip is the one that does not.
  ['guard does not break sticky', !/html,\s*body\s*\{\s*overflow-x:\s*hidden/.test(css)],
  ['long words wrap', /overflow-wrap:\s*break-word/.test(css)],
]
for (const [name, ok] of guards) {
  rows.push({ file: 'src/index.css', element: name, viewport: 'all', width: '—', available: '—', result: ok ? 'fits' : 'OVERFLOWS' })
  if (!ok) failed++
}

console.table(rows)
const bad = rows.filter((r) => r.result === 'OVERFLOWS')
if (bad.length) {
  console.error(`\n${bad.length} element(s) wider than the viewport they render at.`)
  process.exit(1)
}
console.log(`\n${rows.length} sized elements checked across phone, tablet and laptop; none overflow.`)

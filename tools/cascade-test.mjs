/**
 * Resolves the cascade for the properties that make a button look like one.
 *
 * Every previous check confirmed the rules were present in the stylesheet, and
 * they always were. That is not the same question as whether they win. A bare
 * `button { background: none; border: 0 }` sitting outside any cascade layer
 * beats `.btn-subtle` inside @layer components no matter how specific the
 * class is, so every button on the site rendered as plain text while the CSS
 * looked perfectly correct.
 *
 * It hid for so long because .btn used to be unlayered too and merely came
 * later in the file, so it won on source order. Moving .btn into a layer to
 * fix an unrelated display bug is what handed the win to the reset.
 *
 * So this asks the only question that matters: for a real element, which rule
 * actually sets the background and the border. Layer order first, then
 * specificity, then source order.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const dir = fileURLToPath(new URL('../dist/assets', import.meta.url))
const css = readFileSync(`${dir}/${readdirSync(dir).find((f) => f.endsWith('.css'))}`, 'utf8')

/** Declared layer order. Earlier means weaker; unlayered beats them all. */
const declared = (/@layer ([a-z, ]+);/.exec(css)?.[1] ?? 'theme, base, components, utilities')
  .split(',').map((s) => s.trim())
const rank = (layer) => (layer === null ? Number.MAX_SAFE_INTEGER : declared.indexOf(layer))

/** Walk the sheet, recording each rule with the layer it sits in. */
function rules() {
  const out = []
  const stack = []
  let i = 0
  while (i < css.length) {
    const open = css.indexOf('{', i)
    if (open < 0) break
    const prelude = css.slice(i, open).trim()

    if (prelude.startsWith('@')) {
      const name = /@layer\s+([a-z]+)/.exec(prelude)?.[1]
      stack.push(name ?? (stack.at(-1) ?? null))
      i = open + 1
      continue
    }

    let depth = 1
    let j = open + 1
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++
      else if (css[j] === '}') depth--
      j++
    }
    out.push({ selectors: prelude.split(','), body: css.slice(open + 1, j - 1), layer: stack.at(-1) ?? null, at: open })
    i = j
    while (css[i] === '}') { stack.pop(); i++ }
  }
  return out
}

const all = rules()

/** Crude but sufficient specificity: ids, then classes/attrs, then elements. */
function specificity(sel) {
  const s = sel.trim()
  return [
    (s.match(/#[\w-]+/g) || []).length,
    (s.match(/\.[\w\\().-]+|\[[^\]]+\]|:[a-z-]+\(/g) || []).length,
    (s.match(/(^|[\s>+~])[a-z]+/g) || []).length,
  ]
}

/** Which declaration wins `prop` for an element carrying `classes`. */
function winner(classes, prop) {
  const wanted = new Set(classes)
  let best = null
  for (const r of all) {
    for (const sel of r.selectors) {
      const s = sel.trim()
      if (!s) continue
      // Only the simple forms this sheet actually uses for buttons.
      const isButton = s === 'button'
      const cls = s.startsWith('.') && !/[\s>+~:]/.test(s) ? s.slice(1).replace(/\\/g, '') : null
      if (!isButton && !(cls && wanted.has(cls))) continue

      const decl = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`).exec(r.body)
      if (!decl) continue

      const cand = { layer: rank(r.layer), spec: specificity(s), at: r.at, value: decl[1].trim(), sel: s, layerName: r.layer }
      if (!best) { best = cand; continue }
      const better =
        cand.layer !== best.layer
          ? cand.layer > best.layer
          : cand.spec.join() !== best.spec.join()
            ? cand.spec > best.spec
            : cand.at > best.at
      if (better) best = cand
    }
  }
  return best
}

const rows = []
let failed = 0

const CASES = [
  ['solid button',      ['btn', 'btn-solid'],   'background', 'var(--ink)'],
  ['solid button',      ['btn', 'btn-solid'],   'border-color', 'var(--ink)'],
  ['outline button',    ['btn', 'btn-outline'], 'border-color', 'var(--line-strong)'],
  ['subtle button',     ['btn', 'btn-subtle'],  'background', 'var(--surface)'],
  ['subtle button',     ['btn', 'btn-subtle'],  'border-color', 'var(--line)'],
]

for (const [label, classes, prop, expected] of CASES) {
  const w = winner(classes, prop)
  const ok = !!w && w.value === expected
  if (!ok) failed++
  rows.push({
    element: `${label} (.${classes.join(' .')})`,
    property: prop,
    wins: w ? `${w.sel} in @layer ${w.layerName ?? 'UNLAYERED'}` : 'nothing',
    value: w ? w.value : '—',
    result: ok ? 'pass' : 'FAIL',
  })
}

console.table(rows)
if (failed) {
  console.error(`\n${failed} button style(s) lose the cascade to something else — they exist in the CSS but never paint.`)
  process.exit(1)
}
console.log('\nevery button variant actually wins the cascade for its fill and its edge.')

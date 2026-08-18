/**
 * Server-renders every route and checks the content is actually there.
 *
 * A portfolio fails quietly: a page renders, the layout looks right, and one
 * section is empty because a data key was renamed. Typechecking will not catch
 * an empty array, and nothing else here reads the page. So these assertions are
 * about content being present and reachable, not about markup shape.
 */
import { readFileSync } from 'node:fs'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
// esbuild flattens when there is a single entry point, so this is
// dist-ssr/Site.js rather than dist-ssr/site/Site.js.
import Site from '../dist-ssr/Site.js'

/** Render a route by setting the hash the router reads. */
function at(route) {
  globalThis.location = { hash: route === '/' ? '' : `#${route}` }
  globalThis.window = {
    location: globalThis.location,
    addEventListener() {}, removeEventListener() {}, scrollTo() {},
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  }
  globalThis.document = undefined
  return renderToString(createElement(Site))
}

const routes = ['/', '/about', '/projects', '/blog', '/resume', '/contact',
  '/projects/harmoney', '/projects/vesseli', '/projects/forecash', '/projects/merkle',
  '/projects/spotify-alter']

const pages = Object.fromEntries(routes.map((r) => [r, at(r)]))
const all = Object.values(pages).join('\n')

const rows = []
let failed = 0
const check = (name, ok, detail = '') => {
  rows.push({ check: name, result: ok ? 'pass' : 'FAIL', detail })
  if (!ok) failed++
}

// ── every route renders something substantial
for (const r of routes) {
  check(`${r} renders`, pages[r].length > 2500, `${pages[r].length} chars`)
}

// ── the seven pages exist in the nav, on every page
check('nav lists every page',
  ['About', 'Projects', 'Blog', 'Resume', 'Contact'].every((l) => pages['/'].includes(l)))
check('side quests is gone', !pages['/'].includes('Side Quests'))

// ── identity
check('name and role present', pages['/'].includes('Abhinav Krishnan') && pages['/'].includes('Houston'))
check('email is reachable', all.includes('abhinavdesignerux@gmail.com'))
check('phone is reachable', pages['/contact'].includes('945'))

// ── socials, and the ones that must open off site
for (const [label, host] of [['LinkedIn', 'linkedin.com'], ['Medium', 'medium.com'], ['Behance', 'behance.net']]) {
  check(`${label} links out`, pages['/'].includes(host))
}
check('outbound links are safe', !/target="_blank"(?![^>]*rel="noreferrer)/.test(all),
  'every new-tab link carries rel=noreferrer noopener')

// ── the work
check('every study is in one gallery',
  ['Harmoney', 'Vesseli', 'ForeCash', 'Merkle', 'Spotify Alter'].every((n) => pages['/projects'].includes(n)))
// The gallery is a single scrolling track, never a stacked grid.
check('projects are a horizontal track',
  /snap-x snap-mandatory/.test(pages['/projects']) && /overflow-x-auto/.test(pages['/projects']))
check('Spotify still links to its own build',
  pages['/projects/spotify-alter'].includes('spotify-alter.vercel.app'),
  'separate repo and deployment, linked from inside the study')

// ── case study depth: the thing that makes them case studies rather than cards
for (const slug of ['harmoney', 'vesseli', 'forecash', 'spotify-alter']) {
  const html = pages[`/projects/${slug}`]
  check(`${slug} is a full study`, html.length > 9000, `${html.length} chars`)
  check(`${slug} states role and year`, html.includes('Role') && html.includes('Year'))
  // A study opens over the gallery, so the gallery must still be behind it.
  check(`${slug} opens over the gallery`, html.includes('role="dialog"') && html.includes('aria-modal="true"'))
  check(`${slug} can be dismissed`, html.includes('Close case study'))
}
check('merkle is honest about its gap',
  pages['/projects/merkle'].includes('password protected'),
  'says why the detail is missing rather than padding it')

// ── writing
check('blog lists both posts',
  pages['/blog'].includes('Designing for Culture') && pages['/blog'].includes('Philosophical'))

// ── the numbers match the CV
check('uses the defensible experience figure',
  pages['/about'].includes('4+') && !pages['/about'].includes('10+ Years'),
  'work history starts Nov 2021')

// ── an unknown route must not render a blank page
const missing = at('/nope')
check('unknown route shows a 404', missing.includes('does not exist'))


// ── Harmoney, rebuilt from the Figma case study page
const h = pages['/projects/harmoney']
check('harmoney carries the narrative', h.includes('Danielle') && h.includes('rooftop'),
  'the same ninety seconds, told twice')
check('harmoney shows the intent funnel', h.includes('Intent is at its peak') && h.includes('~8%'))
check('harmoney lists the four personas',
  ['Maya', 'Danielle', 'Marcus', 'Alex'].every((n) => h.includes(n)))
check('harmoney states the five principles',
  h.includes('Protect the gesture') && h.includes('One identity, end to end'))
check('harmoney is honest about accessibility',
  h.includes('In review'), 'unresolved items are named rather than omitted')
check('harmoney names its measures', h.includes('Withdrawal completion rate'))

// ── motion
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
check('study pops in, not from nothing', /panel-in[\s\S]{0,140}scale\(\.96\)/.test(css),
  'scale(0.96), never scale(0)')
const enterMs = Number(/\.panel-enter\s*\{\s*animation:\s*panel-in\s*(\d+)ms/.exec(css)?.[1])
const leaveMs = Number(/\.panel-leave\s*\{\s*animation:\s*panel-out\s*(\d+)ms/.exec(css)?.[1])
check('exit is quicker than entry', enterMs > leaveMs, `${enterMs}ms in, ${leaveMs}ms out`)
check('hover motion is pointer gated',
  /\(hover: hover\) and \(pointer: fine\)/.test(css), 'touch fires a false hover on tap')
check('reduced motion still signals the change',
  /prefers-reduced-motion: reduce[\s\S]{0,700}panel-enter/.test(css),
  'fades without moving, rather than nothing at all')

console.table(rows)
if (failed) {
  console.error(`\n${failed} render check(s) failed.`)
  process.exit(1)
}
console.log(`\n${routes.length} routes render, and every page says what it should.`)

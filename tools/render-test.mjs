/**
 * Server-renders every route and checks the content is actually there.
 *
 * A portfolio fails quietly: a page renders, the layout looks right, and one
 * section is empty because a data key was renamed. Typechecking will not catch
 * an empty array, and nothing else here reads the page. So these assertions are
 * about content being present and reachable, not about markup shape.
 */
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

const routes = ['/', '/about', '/projects', '/side-quests', '/blog', '/resume', '/contact',
  '/projects/harmoney', '/projects/vesseli', '/projects/forecash', '/projects/merkle']

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
check('nav lists all seven pages',
  ['About', 'Projects', 'Side Quests', 'Blog', 'Resume', 'Contact'].every((l) => pages['/'].includes(l)))

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
check('four case studies on Projects',
  ['Harmoney', 'Vesseli', 'ForeCash', 'Merkle'].every((n) => pages['/projects'].includes(n)))
check('side quests holds Spotify', pages['/side-quests'].includes('Spotify Alter'))
check('Spotify is a link, not a page',
  pages['/side-quests'].includes('spotify-alter.vercel.app'),
  'stays its own repo and deployment')

// ── case study depth: the thing that makes them case studies rather than cards
for (const slug of ['harmoney', 'vesseli', 'forecash']) {
  const html = pages[`/projects/${slug}`]
  check(`${slug} is a full study`, html.length > 9000, `${html.length} chars`)
  check(`${slug} states role and year`, html.includes('Role') && html.includes('Year'))
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

console.table(rows)
if (failed) {
  console.error(`\n${failed} render check(s) failed.`)
  process.exit(1)
}
console.log(`\n${routes.length} routes render, and every page says what it should.`)

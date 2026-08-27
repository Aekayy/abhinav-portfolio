/**
 * Server-renders every route and checks the content is actually there.
 *
 * A portfolio fails quietly: a page renders, the layout looks right, and one
 * section is empty because a data key was renamed. Typechecking will not catch
 * an empty array, and nothing else here reads the page. So these assertions are
 * about content being present and reachable, not about markup shape.
 */
import { existsSync, readFileSync } from 'node:fs'
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

const routes = ['/', '/about', '/blog', '/resume', '/contact',
  '/blog/anthemnation', '/blog/designphilosophy', '/blog/spotify-syncro',
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
check('nav has a Home button',
  />Home</.test(pages['/']), 'was dropped by slice(1) before')
check('nav lists every destination',
  ['Home', 'Work', 'About', 'Blog', 'Resume', 'Contact'].every((l) => pages['/'].includes(l)))
check('Work is an anchor on home, not a page',
  pages['/'].includes('#/#work') && pages['/'].includes('id="work"'))
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
// Names, not slugs: the Spotify study is titled "Vibe" while its slug and its
// live build both still read "spotify-alter" (see the note in projects.ts).
check('every study is in one gallery',
  ['Harmoney', 'Vesseli', 'ForeCash', 'Merkle', 'Spotify Vibe'].every((n) => pages['/'].includes(n)))
// The gallery is a single scrolling track, never a stacked grid.
check('work is a horizontal track',
  /snap-x snap-mandatory/.test(pages['/']) && /overflow-x-auto/.test(pages['/']))
check('Spotify still links to its own build',
  pages['/projects/spotify-alter'].includes('spotify-alter.vercel.app'),
  'separate repo and deployment, linked from inside the study')

// ── case study depth: the thing that makes them case studies rather than cards
for (const slug of ['harmoney', 'vesseli', 'forecash', 'merkle', 'spotify-alter']) {
  const html = pages[`/projects/${slug}`]
  check(`${slug} is a full study`, html.length > 9000, `${html.length} chars`)
  check(`${slug} states role and year`, html.includes('Role') && html.includes('Year'))
  // A study opens over the gallery, so the gallery must still be behind it.
  check(`${slug} opens over the gallery`, html.includes('role="dialog"') && html.includes('aria-modal="true"'))
  check(`${slug} can be dismissed`, html.includes('Close case study'))
}
// Posts open the same way studies do.
check('a post opens in place', pages['/blog/anthemnation'].includes('role="dialog"'))
check('a post keeps the original one click away',
  pages['/blog/anthemnation'].includes('Read it on the original site'))

// Company names as Abhinav gave them.
check('SquareResults is named', pages['/about'].includes('SquareResults'))
check('Datamatics is named', pages['/about'].includes('Datamatics'))
check('no placeholder employer names',
  !pages['/about'].includes('Enterprise software') && !pages['/about'].includes('AI job matching platform'))

// Portraits and logos have a slot even before the files arrive.
check('testimonials carry a portrait', pages['/'].includes('rounded-full'))
check('work history carries a logo per company',
  pages['/about'].includes('img/work/sqr.jpg') &&
  pages['/about'].includes('img/work/anthem-nation.jpg') &&
  pages['/about'].includes('img/work/Vesseli.png') &&
  pages['/about'].includes('img/work/Merkle.png') &&
  pages['/about'].includes('img/work/jhf.png') &&
  pages['/about'].includes('img/work/datamatics.jpg')
)
check('resume shows the document itself',
  pages['/resume'].includes('Page 1') && pages['/resume'].includes('Page 2'))
check('about has a sticky image column', pages['/about'].includes('lg:sticky'))

// No dashes anywhere in the rendered copy.
const copy = Object.values(pages).join('\n').replace(/<[^>]*>/g, ' ')
const dashes = (copy.match(/[\u2013\u2014]/g) || []).length
check('no dashes in the copy', dashes === 0, `${dashes} found`)

// ── Merkle, the study that was once behind a password
const m = pages['/projects/merkle']
check('merkle is the full study now',
  m.includes('Fourteen steps to launch one campaign') && m.includes('Sarah’s journey'),
  'the password wall is gone, so the stub is too')
// Named against the screens that actually exist in the current export set.
// This list used to include "Journey Builder", which the redesigned set does
// not contain: a test asserting a screen that was never re-exported passes
// only while the study still describes work it cannot show.
check('merkle names what shipped',
  ['Campaign Library', 'Audience Builder', 'Approval pipeline', 'Live monitoring', 'Asset Library']
    .every((n) => m.includes(n)))

// ── writing
check('blog lists all three posts',
  pages['/blog'].includes('Designing for Culture') && pages['/blog'].includes('Philosophical')
    && pages['/blog'].includes('Spotify Syncro'))
check('spotify syncro is the full article',
  pages['/blog/spotify-syncro'].includes('Creative Mode') && pages['/blog/spotify-syncro'].includes('Group Product Manager'),
  'the piece the old site had and this one missed')

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

// ── the showcases, which are the only animation whose content is data
//
// A showcase pairs each frame with the coordinate the pointer presses to reach
// the next one. Nothing in the type system ties the two arrays to the same
// length, and the failure is silent and specific: add a sixth frame, forget its
// tap, and the cursor falls back to the middle of the screen on that one step
// while everything else still looks right.
const { SHOWCASES, framePaths } = await import('../dist-ssr/screens.mjs')
for (const [slug, s] of Object.entries(SHOWCASES)) {
  check(`${slug} taps every frame`, s.taps.length === s.frames.length,
    `${s.frames.length} frames, ${s.taps.length} taps`)
  const off = s.taps.filter(([x, y]) => x < 0 || x > 100 || y < 0 || y > 100)
  check(`${slug} presses land on the screen`, off.length === 0,
    'percentages of the frame, so 0-100 on both axes')
  const missing = framePaths(slug, s)
    .filter((f) => !existsSync(new URL(`../public/${f}`, import.meta.url)))
  check(`${slug} screens exist on disk`, missing.length === 0, missing.join(', '))
}

// ── the contents nav, which is grouped and measured rather than a flat list
const { PROJECTS: DATA, sectionWords } = await import('../dist-ssr/study.mjs')

for (const p of DATA) {
  if (!p.sections?.length || p.noSectionNav) continue
  // Quick read has to actually be quicker, or the toggle is decoration.
  const quick = p.sections.reduce((n, s) => n + sectionWords(s, 'quick'), 0)
  const full = p.sections.reduce((n, s) => n + sectionWords(s, 'full'), 0)
  check(`${p.slug} quick read is shorter`, quick < full * 0.6, `${quick} words vs ${full}`)
}

check('spotify offers the study and the build together',
  pages['/projects/spotify-alter'].includes('View Full Case Study &amp; Live Build'))

// ── device frames: the screen inside must be the canvas it was drawn on
//
// This is arithmetic, and it was wrong. The shell ratio used to be the screen
// ratio divided by a fudge factor, which put the phone screen 5.2% off — and
// because the image is object-cover, "off" means silently cropped rather than
// visibly broken. Nothing on the page looks wrong when this fails, which is
// exactly why it needs a test.
{
  const { PHONE_SCREEN, WEB_SCREEN, WEB_SCREEN_DEFAULT, webScreenFor, screenRatioIn, ratio } =
    await import('../dist-ssr/study.mjs')

  const exact = (device, screen) =>
    Math.abs(screenRatioIn(device, screen) - ratio(screen)) / ratio(screen) < 0.0001

  check('the phone frame holds an iPhone 17 Pro screen', exact('phone', PHONE_SCREEN),
    `${PHONE_SCREEN}, which is 540x1174 at 1x`)

  for (const [slug, screen] of Object.entries(WEB_SCREEN)) {
    check(`the laptop frame fits ${slug}'s canvas`, exact('web', screen), screen)
  }
  check('the default laptop frame is a real 1440', exact('web', WEB_SCREEN_DEFAULT),
    WEB_SCREEN_DEFAULT)
  check('every desktop screen is 1440 wide',
    [...Object.values(WEB_SCREEN), WEB_SCREEN_DEFAULT].every((s) => s.startsWith('1440')))
  check('an unknown project still gets a laptop',
    webScreenFor('img/work/nothing/screens/x.webp') === WEB_SCREEN_DEFAULT)
}

// ── the showcase stage, where a percentage height was silently the wrong one
//
// The row holding the devices must be out of flow. As `flex h-full` its height
// was a percentage of a grid row that was itself sized by its contents, and the
// contents are phone screenshots with an intrinsic height of 1174px. The cycle
// resolved in the images' favour: measured, the row became 1211px inside a
// 788px stage, every device came out 1.63x too big, and 384px was cut off.
//
// Nothing about that looks like a bug in the markup, which is why it is here.
{
  const hero = pages['/projects/harmoney']
  check('the showcase row is out of flow',
    /class="absolute inset-0 flex items-center justify-center/.test(hero),
    'a percentage height here resolves against a content-sized row')
  check('the showcase row is not a percentage-height flex box',
    !/flex h-full w-full items-center justify-center/.test(hero))
  // Scoped to the phone shells themselves. A page-wide search for "opacity"
  // also catches the read-mode tip and the nav hovers, which are allowed to
  // fade and have nothing to do with this.
  const shells = [...hero.matchAll(/class="([^"]*shrink-0 bg-\[#[0-9a-f]{6}\][^"]*)"/g)].map((m) => m[1])
  // Two flanks, plus the working screen. Counting every shell on the page would
  // also count the gallery cards and the body screenshots behind the panel.
  check('the study hero flanks the working screen',
    shells.filter((c) => c.includes('hidden sm:block')).length === 2,
    `${shells.filter((c) => c.includes('hidden sm:block')).length} flanking phones`)
  check('the flanking screens are at full opacity',
    shells.every((c) => !/\bopacity-/.test(c)),
    'dimming a real screen makes it read as failed to load')
}

/*
 * The bezel has to be measured in container units, not percentages.
 *
 * This is the invariant behind the arithmetic checked further down, and it is
 * the one that actually broke. `screenRatioIn` said the phone screen was
 * exactly 402/874 while the rendered bezel was 9.8% instead of 1.6% and the
 * screen was really 0.4182 — because a CSS percentage resolves against the
 * containing block, and the model assumed it resolved against the frame. The
 * maths test passed the whole time. So assert the units too.
 */
{
  const hero = pages['/projects/harmoney']
  check('the device bezel is in container units',
    /inset:\s*[\d.]+cqw/.test(hero) && /container-type:\s*inline-size/.test(hero),
    'a percentage here measures the row, not the phone')
  check('no percentage padding is left on a device shell',
    !/shrink-0 bg-\[#[0-9a-f]{6}\][^"]*p-\[[\d.]+%\]/.test(hero))
}

// ForeCash shipped on both, so its card and hero show both. Nothing else does,
// because nothing else was drawn twice.
{
  const { SHOWCASES: S2 } = await import('../dist-ssr/screens.mjs')
  check('forecash shows the desktop app too',
    S2.forecash.also?.device === 'web' && S2.forecash.also.frames.length > 1,
    `${S2.forecash.also?.frames.length ?? 0} desktop screens`)
  check('forecash desktop taps every frame',
    S2.forecash.also?.taps.length === S2.forecash.also?.frames.length)
  check('only projects drawn twice claim two devices',
    Object.entries(S2).filter(([, s]) => s.also).map(([k]) => k).join() === 'forecash')
}

/*
 * The shell's own radius must not be in container units.
 *
 * An element is not its own container query container, so cqw written here
 * falls through to the viewport. It does not error, it does not warn, and the
 * number it produces is plausible until you look: 16.52cqw against a 1920px
 * viewport is a 317px corner on a 300px phone.
 */
check('the phone shell sizes its own radius against itself',
  /border-radius:\s*[\d.]+% ?\/ ?[\d.]+%/.test(pages['/projects/harmoney']),
  'a percentage resolves against this box; cqw would resolve against the viewport')
check('no container units on the shell radius',
  !/shrink-0 bg-\[#[0-9a-f]{6}\][^>]*border-radius:\s*[\d.]+cqw/.test(pages['/projects/harmoney']))

check('the device frame is plain, with no rim gradient',
  !/shrink-0 bg-\[#[0-9a-f]{6}\][\s\S]{0,400}linear-gradient\(100deg/.test(pages['/projects/harmoney']),
  'an angled rim light put a pale wedge in two corners and read as a second frame')

check('spotify works the equalizer rather than paging past it',
  (await import('../dist-ssr/screens.mjs')).SHOWCASES['spotify-alter']
    .frames.filter((f) => f === '03-vibe-sheet-advanced').length >= 5,
  'the sliders are the feature, so the pointer stays on that screen and sets them')

check('spotify shows the product, not a landscape gif',
  !pages['/projects/spotify-alter'].includes('spotify-syncro-card.gif'),
  'the study hero plays the phone walkthrough like every other study')

// ── motion
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
check('study pops in, not from nothing', /panel-in[\s\S]{0,140}scale\(\.96\)/.test(css),
  'scale(0.96), never scale(0)')
/**
 * Durations may be written as a literal or as a token from @theme. Resolve the
 * token so this check keeps working either way — it broke once when
 * `.panel-enter` moved from `320ms` to `var(--dur-panel)`, and read NaN rather
 * than saying the duration had become unreadable.
 */
const durOf = (rule, name) => {
  const raw = new RegExp(`\\.${rule}\\s*\\{\\s*animation:\\s*${name}\\s+([^\\s;]+)`).exec(css)?.[1]
  if (!raw) return NaN
  const token = /^var\(\s*(--[\w-]+)\s*\)$/.exec(raw)
  const value = token
    ? new RegExp(`${token[1]}\\s*:\\s*(\\d+)ms`).exec(css)?.[1]
    : /^(\d+)ms$/.exec(raw)?.[1]
  return Number(value)
}
const enterMs = durOf('panel-enter', 'panel-in')
const leaveMs = durOf('panel-leave', 'panel-out')
check('panel durations are readable', Number.isFinite(enterMs) && Number.isFinite(leaveMs),
  'a literal or a var(--dur-*) token defined in @theme')
check('exit is quicker than entry', enterMs > leaveMs, `${enterMs}ms in, ${leaveMs}ms out`)
check('the cursor is a glass disc, not a mouse arrow',
  /\.tap-cursor\s*\{[^}]*border-radius:\s*999px[^}]*backdrop-filter:\s*blur/.test(css),
  'three of the five products are phones; an arrow says mockup')
check('the glass disc survives without backdrop-filter',
  /\.tap-cursor\s*\{[^}]*background:\s*rgb\([^}]*border:\s*[\d.]+px solid/.test(css),
  'a translucent fill and a rim, so it is legible before the blur applies')
check('the tap ripple grows out of the press, not into it',
  /@keyframes tap-ripple[\s\S]{0,160}from\s*\{\s*opacity:\s*\.8[\s\S]{0,60}scale\(\.3\)/.test(css),
  'starts small and opaque, ends wide and gone')
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

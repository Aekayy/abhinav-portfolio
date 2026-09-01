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
// The posts are the articles themselves, not teasers for somewhere else, so
// the link off to the original Framer site is gone from all of them.
check('no post sends the reader elsewhere',
  ['/blog/anthemnation', '/blog/designphilosophy', '/blog/spotify-syncro']
    .every((r) => !pages[r].includes('Read it on the original site')))

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
  pages['/about'].includes('img/work/vesseli-logo.png') &&
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
const { PROJECTS: DATA, sectionWords, quickWords } = await import('../dist-ssr/study.mjs')

/*
 * Quick read is a different document, not a trimmed one.
 *
 * It renders an opener, the beats a section claims, and one deck holding every
 * artifact. So a study has to declare its beats, or the short version silently
 * loses a step of its argument and nothing looks broken — the page just quietly
 * stops explaining itself.
 */
for (const p of DATA) {
  if (!p.sections?.length || p.noSectionNav) continue

  const beats = p.sections.filter((s) => s.beat).map((s) => s.beat)
  check(`${p.slug} tells the short story`,
    ['problem', 'solution', 'reflection'].every((b) => beats.includes(b)),
    beats.join(', ') || 'none')
  check(`${p.slug} claims each beat once`, beats.length === new Set(beats).size, beats.join(', '))
  // Quick read opens on the first section that claims no beat, and falls
  // through to the problem when every section claims one — which is Spotify,
  // where the problem IS the introduction. What must never happen is opening
  // partway through the argument.
  check(`${p.slug} opens at the beginning`,
    !p.sections[0].beat || p.sections[0].beat === 'problem',
    `starts on "${p.sections[0].label}"`)

  // Every beat needs its summary; the short version is nothing but summaries.
  check(`${p.slug} summarizes every beat`,
    p.sections.filter((s) => s.beat).every((s) => (s.tldr?.length ?? 0) > 0))

  const slides = p.sections.reduce((n, s) => n + s.blocks.reduce((m, b) =>
    b.kind === 'figure' ? m + 1 : b.kind === 'screens' ? m + b.items.length : m, 0), 0)
  check(`${p.slug} has a deck to show`, slides >= 5, `${slides} slides`)

  // And it has to actually be quicker, or the toggle is decoration.
  const quick = quickWords(p.sections)
  const full = p.sections.reduce((n, s) => n + sectionWords(s, 'full'), 0)
  check(`${p.slug} quick read is shorter`, quick < full, `${quick} words vs ${full}`)
}

/*
 * The deck is an edit, and the edit is the point.
 *
 * One slide per image meant thirty one clicks on Harmoney for a study sold as a
 * two minute read, which is the long version wearing different controls. These
 * assert the cap and the grouping, because a deck that quietly grows back to
 * thirty one slides still renders perfectly.
 */
{
  const { buildDeck } = await import('../dist-ssr/deck.mjs')
  for (const p of DATA) {
    if (!p.sections?.length || p.noSectionNav) continue
    const deck = buildDeck(p.sections, p.slug)
    check(`${p.slug} deck is at most five slides`, deck.length <= 5, `${deck.length} slides`)
    check(`${p.slug} every slide is named`, deck.every((d) => d.label.trim().length > 0))
    check(`${p.slug} no slide is empty`, deck.every((d) => d.items.length > 0))
    // Product screens travel together; one phone per slide was the old problem.
    const product = deck.find((d) => d.label === 'Product screens')
    check(`${p.slug} groups its product screens`,
      !product || (product.items.length > 1 && product.items.length <= 4),
      product ? `${product.items.length} phones on one slide` : 'desktop only')
    // Phones and laptops never share a slide: they are different claims.
    check(`${p.slug} keeps mobile and desktop apart`,
      deck.every((d) => new Set(d.items.map((i) => i.device ?? 'still')).size === 1))
  }
}

/*
 * A device in a slide must have a definite dimension.
 *
 * The laptop was styled with `max-width` and `max-height` and nothing else. A
 * box with an aspect ratio and only upper bounds has nothing to compute a size
 * from, and its children are absolutely positioned so there is no content to
 * fall back to either: it rendered 0x0 and every desktop slide came up blank
 * with no error anywhere. Height is the definite one, because the slide sets a
 * height and every stage here is wider than it is tall.
 */
{
  const q = pages['/projects/forecash']
  // Class and style together: body frames take their width from `w-full`, deck
  // frames from an inline height. Either counts; neither being present is the
  // bug.
  const frames = [...q.matchAll(/class="(relative shrink-0[^"]*)"(?:\s+style="([^"]*)")?/g)]
    .map((m) => `${m[1]} ${m[2] ?? ''}`)
  // Three ways a frame can be given a size, all legitimate: an inline
  // dimension, a width class, or `.deck-item`, which sets height from the
  // container-query variables alongside it.
  const sized = (f) =>
    /(^|[;\s])(height|width):/.test(f) || /\b[wh]-(full|\[)/.test(f) || /\bdeck-item\b/.test(f)
  check('every device frame is given a size',
    frames.length > 0 && frames.every(sized),
    `${frames.length} frames, ${frames.filter((f) => !sized(f)).length} unsized`)
  check('no frame is sized only by its caps',
    !frames.some((f) => /max-width/.test(f) && !sized(f)))
}

/*
 * Both read modes stay mounted, so five section ids exist twice over.
 *
 * A `display: none` element reports a rect of all zeros, so every hidden copy
 * read as `top: 0` and matched a reading line hundreds of pixels down. In Quick
 * read the hidden Full sections come last in document order, so the anchor scan
 * always ended on the final one and the reader was thrown to the end of the
 * study. Anything resolving a section id has to ask for the rendered copy.
 */
{
  const q = pages['/projects/forecash']
  const ids = [...q.matchAll(/<section id="([^"]+)"/g)].map((m) => m[1])
  const dupes = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))]
  check('both read modes are in the html', dupes.length > 0,
    `${dupes.length} ids appear in both, which is what keeps the prose indexable`)

  const src = readFileSync(new URL('../src/components/StudyOverlay.tsx', import.meta.url), 'utf8')
  check('section lookups take the rendered copy',
    (src.match(/getClientRects\(\)\.length/g) || []).length >= 4,
    'the anchor scan, the anchor lookup, the scroll spy and the contents nav')
  check('no bare querySelector on a section id',
    !/scroller\.current\?\.querySelector\(`#\$\{id\}`\)/.test(src)
    && !/scrollEl\.querySelector\(`#\$\{s\.id\}`\)/.test(src))
}

// Blogs are articles: one length, a byline, and no offer to shorten them.
{
  const b = pages['/blog/spotify-syncro']
  check('a post is bylined', /Author/.test(b) && /Abhinav Krishnan/.test(b))
  check('a post has no read-mode toggle', !/How much of this study to show/.test(b),
    'there is no summary written for an article, so there is nothing to switch to')
  check('a post does not push you off site', !/Read it on the original site/.test(b))
  check('the spotify post shows the current screens',
    !/spotify-syncro-1\.png/.test(b)
    && (b.match(/spotify-alter\/screens\//g) || []).length >= 4)
}

// The one fact in the hero paragraph a recruiter scans for.
check('the hero marks the city',
  /<strong[^>]*>Houston, TX<\/strong>/.test(pages['/']))

/*
 * The deck sizes its devices against the slide in both axes.
 *
 * Height alone was right on a laptop and put four phones at 64px across on a
 * 375px screen — a picture of a phone rather than a screen anyone can read. So
 * each device carries the numbers CSS needs to take whichever of height or
 * width runs out first, and a second pair for the small breakpoint, where the
 * count drops instead of everything shrinking.
 */
{
  const q = pages['/projects/forecash']
  const items = [...q.matchAll(/class="[^"]*deck-item[^"]*"([^>]*)/g)].map((m) => m[1])
  check('the deck sizes its devices', items.length > 0, `${items.length} devices`)
  check('every device carries both sizing pairs',
    items.every((it) => /--cap:/.test(it) && /--k:/.test(it) && /--k-sm:/.test(it) && /--gaps-sm:/.test(it)))
  check('the extras are dropped on a small screen',
    items.some((it) => /data-overflow=""/.test(it)),
    'four phones fit a laptop, two fit a phone')
  const css2 = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
  check('the small-screen swap is in the stylesheet',
    /\.deck-item \{ --gaps: var\(--gaps-sm\); --k: var\(--k-sm\); \}/.test(css2)
    && /\.deck-item\[data-overflow\] \{ display: none; \}/.test(css2))
  check('the slide is a size container',
    /container-type:size/.test(q) || /containerType/.test(q),
    'cqh and cqw both have to mean "of this slide"')
}

/*
 * The gallery deals itself out left to right once the opening panel lifts.
 *
 * Three things have to hold or it plays to nobody, or not at all:
 *
 * - The stagger counts within one copy of the projects. The row holds three so
 *   it can loop, and numbering straight through would give the cards actually
 *   on screen delays of 300ms and up.
 * - It waits for `data-intro='done'`. The panel covers the screen for a second
 *   and a half, and without the gate the sweep finishes underneath it.
 * - `backwards`, never `both`. A finished animation with `both` keeps its final
 *   transform applied, which outranks the hover on `.card-grow` and would
 *   silently kill the card growing under the pointer.
 */
{
  const idx = [...pages['/'].matchAll(/--card-i:(\d+)/g)].map((m) => Number(m[1]))
  check('every card has a stagger position', idx.length > 0, `${idx.length} cards`)
  check('the stagger restarts per copy',
    new Set(idx).size < idx.length && Math.max(...idx) === new Set(idx).size - 1,
    `positions 0 to ${Math.max(...idx)} across ${idx.length} cards`)

  const css3 = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
  check('the sweep waits for the opening panel',
    /\[data-intro='done'\][^{]*\.card-in\s*\{/.test(css3))
  check('the sweep waits until the row is worth watching',
    /\.reveal\.is-visible \.card-in/.test(css3))
  check('the sweep comes in from the left',
    /@keyframes card-in\s*\{[^}]*translateX\(-/.test(css3))
  check('the sweep releases the hover when it ends',
    /animation: card-in[^;]*backwards/.test(css3) && !/animation: card-in[^;]*\bboth\b/.test(css3),
    'both would hold the final transform and outrank .card-grow:hover')
}

// The bar is inset from the edges on a phone rather than running the full width.
check('the nav bar has room at the sides',
  /flex flex-col items-center px-4 pt-4 sm:px-6/.test(pages['/']))

// The deck itself: one scroll container, arrows outside it, and a counter.
{
  const q = pages['/projects/harmoney']
  check('the deck is one snapping strip',
    /snap-x snap-mandatory overflow-x-auto/.test(q))
  check('the deck has arrows', /aria-label="Previous"/.test(q) && /aria-label="Next"/.test(q))
  check('the deck says where you are', /aria-roledescription="carousel"/.test(q))
  // Named chips, not dots: reaching the design system should not mean clicking
  // past everything in front of it.
  check('the deck can be jumped through',
    /role="tablist"/.test(q) && /aria-label="Jump to a slide"/.test(q))
  // Quick read must not repeat the visuals above the deck, or it is a long
  // page again with the prose removed.
  check('quick beats carry no figures',
    !/<section id="the-work"[\s\S]{0,200}<figure[\s\S]{0,80}<figure/.test(q))
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
  // Scoped to the showcase stage rather than searched for page wide. The deck's
  // slides use `h-full` too and are fine, because their parent carries an
  // explicit height — the bug was only ever a percentage height resolving
  // against a grid row that sized itself from its own contents.
  check('the showcase row is not a percentage-height flex box',
    !/place-items-center overflow-hidden[^>]*>\s*<div class="flex h-full/.test(hero))
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
/*
 * The arrow's loop lives on the glyph, not on its span.
 *
 * The span is a `.hero-item`, and `[data-intro='done'] .hero-item` sets an
 * arrival animation. That selector is a class plus an attribute, so it outranks
 * `.hero-arrow` and replaced the loop outright — the arrow carried an infinite
 * bounce and never moved once, because the intro had always run by the time
 * anyone looked. Two animations, two elements.
 */
check('the arrow bounces on its glyph',
  /\.hero-arrow svg\s*\{[^}]*animation:\s*hero-bounce[^}]*infinite/.test(css),
  'on the span it is overridden by the hero arrival rule')
check('the arrow span carries no competing loop',
  !/\.hero-arrow\s*\{[^}]*animation:/.test(css))

// The portrait grows on hover and the words step aside to make room. They can
// only move if they are elements: the text either side used to be a bare node.
check('the hero words can move',
  /hero-word-l/.test(pages['/']) && /hero-word-r/.test(pages['/']))
check('the portrait shakes and grows',
  /\.hero-portrait-wrap:hover\s*\{[^}]*scale\(/.test(css) && /@keyframes hero-shake/.test(css))
check('the words move only for a real pointer',
  /\(hover: hover\) and \(pointer: fine\)[\s\S]{0,700}hero-word-l/.test(css),
  'touch fires a false hover and would leave the headline shoved apart')

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

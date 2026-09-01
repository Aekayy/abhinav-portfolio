import type { Section } from '@/data/projects'
import type { Slide } from '@/components/SlideShow'
import { SHOWCASES, framePaths } from '@/data/screens'

/**
 * Which five things Quick read shows.
 *
 * The deck used to be one slide per image, which for Harmoney was thirty one
 * of them. That is not a short version of anything, so this makes the edit
 * instead of handing it to the reader:
 *
 *   1. Every phone screen on one slide, up to four.
 *   2. The desktop app on the next, where there is one.
 *   3. Up to three more, ranked by what a hiring manager actually asks to see.
 *
 * Five is the ceiling. It is also what keeps the jump nav underneath usable,
 * since named chips only stay on one line while there are a few of them.
 */
const MAX_SLIDES = 5
const MAX_PHONES = 4
const MAX_WEB = 2

/**
 * What gets one of the three remaining slots, best first.
 *
 * Ordered by what gets asked about in an interview rather than by where it sits
 * in the study: a design system and a journey map are evidence of method, while
 * a context photograph is scenery. Matched against the section's label and the
 * image's caption, so it works off the study's own words rather than a list of
 * filenames that would rot the first time one was renamed.
 */
const PRIORITY = [
  'design system',
  'journey',
  'user stor',
  'affinity',
  'usability',
  'testing',
  'persona',
  'who it is for',
  'ideation',
  'wireframe',
  'information architecture',
  'principle',
  'flow',
  'research',
]

function rank(text: string): number {
  const t = text.toLowerCase()
  const i = PRIORITY.findIndex((k) => t.includes(k))
  return i === -1 ? PRIORITY.length : i
}

/** Title case for a label taken from a section's own wording. */
function asLabel(s: string): string {
  const t = s.trim()
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export function buildDeck(sections: Section[], slug?: string): Slide[] {
  const phones: { src: string; caption?: string }[] = []
  const web: { src: string; caption?: string }[] = []
  const figures: { src: string; caption?: string; bg?: string; from: string; rank: number }[] = []

  for (const sec of sections) {
    for (const b of sec.blocks) {
      if (b.kind === 'screens') {
        const into = b.device === 'phone' ? phones : web
        for (const it of b.items) into.push({ src: it.src, caption: it.caption })
      } else if (b.kind === 'figure') {
        figures.push({
          src: b.src,
          caption: b.caption,
          bg: b.bg,
          from: sec.label,
          rank: Math.min(rank(sec.label), rank(b.caption ?? '')),
        })
      }
    }
  }

  /*
   * Where a study's body has no product screens, borrow the hero's.
   *
   * Only three studies carry `screens` blocks in their prose; Harmoney and
   * Vesseli show their app as ordinary figures, so a deck built from blocks
   * alone gave them no product slide at all — a case study about a phone app
   * with no phone in the short version. The hero walkthrough already names the
   * screens that carry each product, so those are the right ones to borrow.
   */
  const show = slug ? SHOWCASES[slug] : undefined
  if (show) {
    const own = framePaths(slug!, show)
    const into = show.device === 'phone' ? phones : web
    if (into.length === 0) for (const src of own) into.push({ src })

    if (show.also && web.length === 0 && show.also.device === 'web') {
      const base = `img/work/${slug}/screens`
      for (const f of show.also.frames) web.push({ src: `${base}/${f}.webp` })
    }
  }

  const slides: Slide[] = []

  if (phones.length > 0) {
    const pick = phones.slice(0, MAX_PHONES)
    slides.push({
      label: 'Product screens',
      caption: pick.length < phones.length
        ? `${pick.length} of ${phones.length} screens from the mobile app`
        : 'The mobile app',
      items: pick.map((p) => ({ src: p.src, device: 'phone' as const })),
    })
  }

  if (web.length > 0) {
    const pick = web.slice(0, MAX_WEB)
    slides.push({
      label: 'On desktop',
      caption: pick[0]?.caption ?? 'The same product on a larger screen',
      items: pick.map((p) => ({ src: p.src, device: 'web' as const })),
    })
  }

  /*
   * One slide per remaining slot, best ranked first, and never two from the
   * same section. A study whose design system section holds six boards would
   * otherwise spend every slot on design system boards and drop the journey map
   * entirely, which is the opposite of what the ranking is for.
   */
  const seen = new Set<string>()
  const rest = [...figures]
    .sort((a, b) => a.rank - b.rank)
    .filter((f) => {
      if (seen.has(f.from)) return false
      seen.add(f.from)
      return true
    })

  for (const f of rest) {
    if (slides.length >= MAX_SLIDES) break
    slides.push({
      label: asLabel(f.from),
      caption: f.caption,
      items: [{ src: f.src, bg: f.bg }],
    })
  }

  return slides
}

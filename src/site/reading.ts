import type { Block, Section } from '@/data/projects'
import type { ReadMode } from '@/site/readmode'

// Re-exported so the test bundle can reach the data and these measurements
// through one entry point, rather than esbuild being pointed at four.
export { PROJECTS } from '@/data/projects'
export {
  PHONE_SCREEN, WEB_SCREEN, WEB_SCREEN_DEFAULT, webScreenFor,
  shellRatio, screenRatioIn, ratio,
} from '@/site/devices'

/**
 * How long each section actually is, so the contents nav can show it.
 *
 * The point is not the number. It is that switching read mode visibly changes
 * the shape of the nav: the bars shorten, the estimate drops, and the reader
 * can see what they just bought themselves before scrolling a single line. A
 * toggle whose only feedback is further down the page asks you to take its
 * word for it.
 *
 * Counted from the content rather than measured from the DOM on purpose. A DOM
 * measurement would be exact and useless here, because it can only be taken
 * after the switch it is supposed to preview, and it changes with the window
 * width. This is stable, runs on the server, and is accurate to about a
 * sentence, which is all a progress bar can express anyway.
 */

/** Words in a block, following only the fields that hold prose. */
function blockWords(b: Block): number {
  const count = (s: string | undefined) => (s ? s.trim().split(/\s+/).length : 0)
  const sum = (xs: (string | undefined)[]) => xs.reduce((n, s) => n + count(s), 0)

  switch (b.kind) {
    case 'text': return sum(b.body)
    case 'list': return count(b.title) + sum(b.items)
    case 'quote': return count(b.body) + count(b.source)
    case 'split': return count(b.title) + sum(b.items.flatMap((i) => [i.label, i.body]))
    case 'ladder': return count(b.title) + sum(b.steps.flatMap((s) => [s.stage, s.note, s.value]))
    case 'compare': return count(b.title) + sum(b.items.flatMap((i) => [i.name, i.good, i.gap]))
    case 'beats': return count(b.title) + count(b.lede) + count(b.close)
      + sum(b.beats.flatMap((x) => [x.at, x.said, x.note]))
    case 'table': return count(b.title) + sum(b.columns) + sum(b.rows.flat())
    case 'principles': return count(b.title) + sum(b.items.flatMap((i) => [i.name, i.body]))
    // A figure is not read, it is looked at, and looking still costs time.
    case 'figure': return 18 + count(b.caption)
    case 'screens': return count(b.title) + b.items.length * 12
  }
}

/** What this section costs to get through, in the given mode. */
export function sectionWords(s: Section, mode: ReadMode): number {
  const heading = s.heading.trim().split(/\s+/).length + s.label.trim().split(/\s+/).length
  if (mode === 'full') {
    return heading + s.blocks.reduce((n, b) => n + blockWords(b), 0)
  }
  // In Quick read a section is its heading and its summary. The visuals are no
  // longer under each section, they are in the deck, and that is counted once
  // for the whole study by `quickWords` rather than five times over here.
  const tldr = (s.tldr ?? []).reduce((n, l) => n + l.trim().split(/\s+/).length, 0)
  return heading + tldr
}

/**
 * What the whole study costs in Quick read.
 *
 * Not the sum of every section, because Quick read does not render every
 * section: it renders the opener, the four beats, and one deck holding all the
 * artifacts. Summing the sections was fine when Quick was Full with the prose
 * trimmed; it is simply the wrong document now, and would quote a reader a
 * number for pages that are not there.
 *
 * The deck is charged per slide rather than per section, at the same rate a
 * figure costs anywhere else. A reader can leave a deck after two slides, so
 * this is the honest ceiling rather than the expected spend.
 */
export function quickWords(sections: Section[]): number {
  const opener = sections.find((s) => !s.beat)
  const beats = (['problem', 'solution', 'decisions', 'reflection'] as const)
    .map((b) => sections.find((s) => s.beat === b))
  const shown = [opener, ...beats].filter((s): s is Section => Boolean(s))

  const slides = sections.reduce((n, s) => n + s.blocks.reduce((m, b) => {
    if (b.kind === 'figure') return m + 1
    if (b.kind === 'screens') return m + b.items.length
    return m
  }, 0), 0)

  return shown.reduce((n, s) => n + sectionWords(s, 'quick'), 0) + slides * 18
}

/**
 * Minutes, rounded to something a person would say out loud.
 *
 * 220wpm is the middle of the range for adults reading on screen. Never zero:
 * "0 min" reads as an error, and the shortest study here is still a minute of
 * someone's attention.
 */
export function readMinutes(words: number): number {
  return Math.max(1, Math.round(words / 220))
}

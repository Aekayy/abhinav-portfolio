import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Beat, Block, Project, Section } from '@/data/projects'
import type { Post } from '@/data/profile'
import { PROFILE } from '@/data/profile'
import { go } from '@/site/router'
import { SHOWCASES } from '@/data/screens'
import { Showcase } from '@/components/Showcase'
import { SlideShow } from '@/components/SlideShow'
import { buildDeck } from '@/site/deck'
import { DeviceFrame, PHONE_SCREEN, webScreenFor } from '@/components/DeviceFrame'
import { sectionWords, quickWords, readMinutes } from '@/site/reading'
import type { ReadMode } from '@/site/readmode'

/**
 * useLayoutEffect, except on the server where it does not exist and React
 * warns about it. The scroll correction has to run before paint or it is a
 * visible jump, so useEffect is not an option on the client.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** CSS.escape is not in the SSR bundle's globals; section ids are simple. */
const cssEscape = (s: string) => s.replace(/["\\]/g, '\\$&')

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#181818' : '#fafafa'
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * A case study opens over the gallery rather than replacing it.
 *
 * It is still a route. #/projects/harmoney opens this, so the study is
 * linkable, the back button closes it, and a refresh lands where you were —
 * everything a modal usually breaks. Opening in place is the presentation;
 * the URL still describes what you are looking at.
 *
 * The three things a dialog has to get right, all here: focus moves in and is
 * restored on close, Escape and the backdrop both dismiss, and the page behind
 * cannot scroll while it is open.
 */
/**
 * A post reuses the study panel rather than getting a second one.
 *
 * Same shape, same motion, same dismissal, so opening either feels like the
 * same gesture. Only the meta column and the body differ.
 */
export function PostOverlay({ post }: { post: Post }) {
  const project: Project = {
    slug: post.slug,
    name: 'Writing',
    title: post.title,
    summary: `${post.date} · ${post.category}`,
    year: '',
    industry: '',
    // The byline, not a job title. The old value read "Role: Author", which
    // says nothing a reader did not already assume.
    role: PROFILE.name,
    roleLabel: 'Author',
    article: true,
    kind: 'project',
    accent: post.accent,
    hero: post.hero?.src,
    sections: post.body.map((b, i) => ({
      id: `s${i}`,
      label: 'Article',
      heading: b.heading,
      blocks: [
        ...(i === 0 && post.hero ? [{ kind: 'figure' as const, ...post.hero }] : []),
        { kind: 'text' as const, body: b.paragraphs },
        ...(b.quote ? [{ kind: 'quote' as const, ...b.quote }] : []),
        ...(b.image ? [{ kind: 'figure' as const, ...b.image }] : []),
        ...(b.screens ? [{ kind: 'screens' as const, ...b.screens }] : []),
      ],
    })),
    noSectionNav: true,
  }
  return <StudyOverlay project={project} backTo="/blog" />
}

export function StudyOverlay({ project, backTo = '/' }: { project: Project; backTo?: string }) {
  const panel = useRef<HTMLDivElement | null>(null)
  const restoreTo = useRef<HTMLElement | null>(null)
  const [leaving, setLeaving] = useState(false)
  const scroller = useRef<HTMLDivElement | null>(null)
  const [activeSection, setActiveSection] = useState<string>(() => project.sections?.[0]?.id ?? '')

  /**
   * Play the exit, then change the route.
   *
   * Without this the panel is unmounted the instant the hash changes and there
   * is nothing left to animate — the study simply vanishes. 180ms is the exit
   * duration; the route change is what actually closes it, so the animation
   * never becomes load-bearing.
   */
  const close = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => go(backTo), 180)
  }

  const scrollToSection = (id: string) => {
    // Again the rendered copy: clicking a contents entry that resolved to the
    // hidden duplicate would scroll to a zero-height element at the top.
    const el = [...(scroller.current?.querySelectorAll(`#${id}`) ?? [])]
      .find((e) => e.getClientRects().length > 0)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement

    /*
     * preventScroll, and then reset the scroller by hand.
     *
     * focus() scrolls the focused element into view, and the panel is taller
     * than the viewport, so focusing it scrolled the overlay down on open —
     * the hero came in clipped and the close button was already off screen.
     * The focus still has to move for the dialog to be usable by keyboard, so
     * the fix is to move it without the scroll and start the scroller at zero.
     */
    panel.current?.focus({ preventScroll: true })
    if (scroller.current) scroller.current.scrollTop = 0

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      if (e.key !== 'Tab') return
      // Keep tabbing inside the dialog; a modal you can tab out of is a modal
      // that has lost the reader behind it.
      const focusable = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    const scrollEl = scroller.current
    const handleScroll = () => {
      if (!project.sections?.length || !scrollEl) return
      // The same reading line the mode switch anchors on. These two disagreeing
      // is its own small bug: the nav would highlight one section while a
      // switch held a different one.
      const line = scrollEl.getBoundingClientRect().top + scrollEl.clientHeight * 0.35
      let current = project.sections[0].id
      for (const s of project.sections) {
        // The rendered copy. Both read modes stay mounted, so an id can match
        // twice and the hidden one reports a rect of zeros.
        const secEl = [...scrollEl.querySelectorAll(`#${s.id}`)]
          .find((el) => el.getClientRects().length > 0)
        if (secEl && secEl.getBoundingClientRect().top <= line) current = s.id
      }
      setActiveSection(current)
    }

    scrollEl?.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('keydown', onKey)
      scrollEl?.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = prevOverflow
      restoreTo.current?.focus?.()
    }
  }, [project.slug])

  /*
   * Every study opens in Full read, every time.
   *
   * The choice used to be remembered across studies, which meant one impatient
   * tap on Harmoney quietly shortened every study opened after it. The full
   * write up is the work; Quick read is a courtesy for someone in a hurry, and
   * it should be asked for rather than inherited. Nothing here outlives the
   * panel, which also means SSR and the client agree without reading storage.
   */
  const [mode, setMode] = useState<ReadMode>('full')

  /**
   * Switching read mode must not move the reader.
   *
   * Quick and Full differ by thousands of pixels, so keeping `scrollTop` the
   * same lands you somewhere unrelated: you fold the Design system section and
   * arrive in Reflection. The reason to switch is almost always "this section
   * is longer than the time I have", which only works if you stay in that
   * section.
   *
   * So: note which section is being read and where it sits, let the content
   * change, then put that same section back at that same offset.
   */
  const anchor = useRef<{ id: string; top: number } | null>(null)
  const spacer = useRef<HTMLDivElement | null>(null)

  /**
   * Where "the section I am reading" is judged from, as a fraction of the
   * scroller's height.
   *
   * This was a flat 140px and that was the whole bug. A heading resting at
   * 144px counted as "not started yet", so the previous section was anchored
   * instead and the reader was moved a few hundred pixels. Measured against
   * Merkle's real section sizes, a fixed line drifted by up to 312px; a line at
   * a third of the viewport holds every position exactly.
   *
   * A fraction is also the correct shape for the rule. Whether a heading near
   * the top counts as the thing you are reading depends on how much screen
   * there is, not on a number of pixels.
   */
  const READING_LINE = 0.35

  const switchMode = (m: ReadMode) => {
    const sc = scroller.current
    if (sc) {
      // The section being read is the last one whose heading has passed the
      // reading line, not the first one merely visible.
      const line = sc.getBoundingClientRect().top + sc.clientHeight * READING_LINE
      let seen: HTMLElement | null = null
      for (const s of sc.querySelectorAll<HTMLElement>('section[id]')) {
        /*
         * Skip the copies that are not rendered, and this is the whole bug.
         *
         * Both read modes stay mounted so the prose is always in the HTML,
         * which means five section ids exist twice over. A `display: none`
         * element reports a rect of all zeros, so every hidden copy read as
         * `top: 0` and matched a reading line of several hundred pixels. In
         * Quick read the hidden Full sections come last in document order, so
         * the scan below always ended on the final one and the reader was
         * thrown to the end of the study.
         *
         * getClientRects() is empty for anything not being rendered, which is
         * exactly the question being asked.
         */
        if (s.getClientRects().length === 0) continue
        if (s.getBoundingClientRect().top <= line) seen = s
      }
      if (seen) anchor.current = { id: seen.id, top: seen.getBoundingClientRect().top }
    }
    setMode(m)
  }

  // Before paint, so the correction is never a visible jump.
  useIsomorphicLayoutEffect(() => {
    const sc = scroller.current
    if (!sc) return

    /*
     * Trailing room, so the last sections can be held too.
     *
     * Quick read is about a third the length of Full, and a short document
     * cannot scroll far enough to put a late section back where it was — the
     * browser clamps at the bottom and the reader is dumped several hundred
     * pixels away. Adding scrollable space past the end removes the clamp.
     *
     * A third of the viewport, measured rather than guessed: against Merkle's
     * real sizes, 0% left up to 312px of drift and 25% left 79px, while 35%
     * held every position exactly and 50% and 100% bought nothing further. So
     * this is the least empty space that actually works.
     */
    if (spacer.current) {
      const all = sc.querySelectorAll<HTMLElement>('section[id]')
      const last = all[all.length - 1]
      spacer.current.style.height = '0px'
      if (last) {
        const room = sc.clientHeight - last.getBoundingClientRect().height
        spacer.current.style.height =
          `${Math.round(Math.max(0, Math.min(room, sc.clientHeight * READING_LINE)))}px`
      }
    }

    const a = anchor.current
    if (!a) return
    anchor.current = null

    /*
     * Quick read does not render every section, so the section being read can
     * simply not exist on the other side — you switch out of Wireframes, which
     * the short version never had.
     *
     * Falling back to the top was wrong: it is the one place guaranteed not to
     * be where the reader was, and switching mode is not a request to start
     * over. So walk backwards through the study to the nearest earlier section
     * that IS in the target mode and hold that. Leaving Wireframes lands on the
     * solution rather than the title, which is the same part of the argument.
     */
    let id = a.id
    // The visible copy, not the first in document order. Both modes are
    // mounted, so `querySelector` alone would happily return the hidden one and
    // measure a rect of zeros.
    const find = () =>
      [...sc.querySelectorAll<HTMLElement>(`section[id="${cssEscape(id)}"]`)]
        .find((el) => el.getClientRects().length > 0) ?? null
    if (!find()) {
      const order = sections.map((x) => x.id)
      for (let n = order.indexOf(a.id) - 1; n >= 0; n--) {
        id = order[n]
        if (find()) break
      }
      // Nothing earlier survives either, so the reader is above the first
      // shared section and the top is genuinely where they were.
      if (!find()) {
        const prev = sc.style.scrollBehavior
        sc.style.scrollBehavior = 'auto'
        sc.scrollTop = 0
        sc.style.scrollBehavior = prev
        return
      }
      // A substituted section cannot hold the original's offset, because it
      // started somewhere further up the page. Put its heading at the reading
      // line instead, which is where a section the reader is inside sits.
      a.top = sc.getBoundingClientRect().top + sc.clientHeight * READING_LINE * 0.35
    }

    // Explicitly a jump. `scroll-behavior` is not inherited, so the smooth
    // scrolling set on :root does not reach this element today — but adding a
    // `scroll-smooth` class here later would silently turn this correction into
    // a visible glide against a layout that has already changed, and the bug
    // would look like the one this whole block exists to fix.
    const jump = () => {
      const el = find()
      if (!el) return
      const drift = el.getBoundingClientRect().top - a.top
      if (Math.abs(drift) < 1) return
      const prev = sc.style.scrollBehavior
      sc.style.scrollBehavior = 'auto'
      sc.scrollTop += drift
      sc.style.scrollBehavior = prev
    }

    jump()
    // One more on the next frame. Blocks that were `hidden` a moment ago can
    // settle a pixel or two as their images decode, and the difference between
    // landing on the heading and landing just under it is the whole point.
    requestAnimationFrame(jump)
  }, [mode])

  const hasSections = Boolean(project.sections && project.sections.length > 1) && !project.article
  const showNav = hasSections && !project.noSectionNav
  const navFg = getContrastColor(project.accent)
  const isLightNav = navFg === '#181818'

  /** Every section, in order, measured in whichever mode is showing. */
  const sections = project.sections ?? []

  /**
   * Quick read: an opening, four beats, and the work in one deck.
   *
   * The opening is the study's first section whatever it is called, because
   * every one of them starts by saying what the thing is. The four beats are
   * whichever sections claimed them. Anything else is Full read's business.
   */
  const opener = sections.find((x) => !x.beat)
  const beatOf = (b: Beat) => sections.find((x) => x.beat === b)
  const quickTop = [opener, beatOf('problem'), beatOf('solution')]
    .filter((x): x is Section => Boolean(x))
  const quickEnd = [beatOf('decisions'), beatOf('reflection')]
    .filter((x): x is Section => Boolean(x))

  /** What the contents nav lists: the beats in Quick, everything in Full. */
  const navItems = mode === 'quick' ? [...quickTop, ...quickEnd] : sections

  /**
   * The deck: five slides, grouped and ranked. See `site/deck.ts` for the edit
   * it makes and why one slide per image was the wrong unit.
   */
  const slides = buildDeck(sections, project.slug)
  const totalWords = mode === 'quick'
    ? quickWords(sections)
    : sections.reduce((n, s) => n + sectionWords(s, 'full'), 0)

  /**
   * The toggle introduces itself each time a study is opened.
   *
   * A two button control with no label is a coin flip: nothing on screen says
   * that one of them is a summary. It used to be shown once per browser and
   * then never again, which is the right instinct for a persistent setting and
   * wrong for this one — the mode resets to Full on every open, so the offer to
   * shorten it is new information every time.
   *
   * Once per opening, not once per render: the panel remounts per study, and
   * the timer is keyed to the slug so switching studies re-arms it.
   */
  const [hint, setHint] = useState(false)
  useEffect(() => {
    if (!hasSections) return
    const t = window.setTimeout(() => setHint(true), 900)
    return () => clearTimeout(t)
  }, [hasSections, project.slug])

  const dismissHint = () => setHint(false)

  return (
    <div
      ref={scroller}
      className={`fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/45 px-0 py-0 sm:px-6 sm:py-10 ${leaving ? 'overlay-leave' : 'overlay-enter'}`}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} case study`}
        tabIndex={-1}
        className={`mx-auto w-full max-w-[1400px] bg-(--page) outline-none
                    sm:rounded-(--radius-card) sm:border sm:border-(--line) ${leaving ? 'panel-leave' : 'panel-enter'}`}
      >
        <div className="relative">
          {/* The real screens, playing, where a study has them. Everything else
              keeps the single hero still — a study with no sequence should not
              get a worse version of one. */}
          {SHOWCASES[project.slug] ? (
            <div className="w-full overflow-hidden sm:rounded-t-(--radius-card)">
              <Showcase
                slug={project.slug}
                accent={project.accent}
                layout="trio"
                className="aspect-[4/3] sm:aspect-[16/9]"
              />
            </div>
          ) : (
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-(--surface) sm:rounded-t-(--radius-card)" aria-hidden="true">
              {(project.hero || project.thumb) && (
                <img
                  src={project.hero || project.thumb}
                  alt=""
                  decoding="async"
                  fetchPriority="high"
                  className="showcase-media h-full w-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>
          )}
          <button
            onClick={close}
            aria-label="Close case study"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full
                       bg-(--page) text-(--ink) shadow-md transition-transform hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-10 sm:px-10 md:px-14">
          <div className="max-w-[840px]">
            <h2 className="t-body text-(--ink-muted)">{project.name}</h2>
            <p className="t-heading mt-2 text-(--ink)">{project.title}</p>
            <p className="t-body mt-4 text-(--ink-muted)">{project.summary}</p>

            {project.external && (
              <a href={project.external.href} target="_blank" rel="noreferrer noopener"
                 className="btn btn-solid mt-6 inline-flex">
                {project.external.label} ↗
              </a>
            )}

          </div>

          {/* Horizontal Role, Client, Year, Industry, Duration metadata */}
          <dl className="my-8 grid grid-cols-2 gap-4 border-y border-(--line) py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[
              [project.roleLabel ?? 'Role', project.role],
              ['Client', project.client ?? ''],
              ['Year', project.year],
              ['Industry', project.industry],
              ...(project.duration ? [['Duration', project.duration]] : []),
            ].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="t-caption text-(--ink-muted)">{k}</dt>
                <dd className="t-body-sm mt-1 text-(--ink)">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Main Content Area with Side Floating Navigation */}
          <div className={`mt-8 grid gap-10 ${showNav ? 'lg:grid-cols-[260px_1fr] lg:gap-16 items-start' : ''}`}>
            {showNav && (
              <aside className="hidden lg:block sticky top-8 min-w-0">
                <nav
                  aria-label="Case study sections"
                  className="card min-w-0 max-h-[calc(100vh-8rem)] overflow-y-auto
                             rounded-(--radius-card) p-4 shadow-lg
                             [scrollbar-width:thin]"
                  style={{ backgroundColor: project.accent, color: navFg }}
                >
                  {/* The estimate is the toggle's receipt.
                      A reader who switches mode should be able to see what they
                      just bought without scrolling to find out, and a number
                      that drops from 14 min to 3 min says it in one glance. */}
                  <div className="mb-3 flex items-baseline justify-between gap-3 px-2">
                    <p className="t-caption font-medium" style={{ color: hexToRgba(navFg, 0.7) }}>
                      Contents
                    </p>
                    <p
                      className="t-caption tabular-nums transition-opacity"
                      style={{ color: hexToRgba(navFg, 0.7) }}
                    >
                      {readMinutes(totalWords)} min
                    </p>
                  </div>

                  {/*
                    A flat list, and every line goes somewhere.

                    This was grouped under four phase headings with a length bar
                    under each item. Both are gone. The headings were the only
                    things in the panel that looked like list items and did
                    nothing when clicked, which is a genuinely confusing thing to
                    put in a navigation control; and between four headings,
                    eighteen labels and eighteen bars, Harmoney's contents had
                    about forty elements in it competing to be read.

                    The read-mode estimate above still moves, so the toggle keeps
                    its feedback without every row needing its own chart.

                    In Quick read it lists the beats and the deck, because those
                    are the only things on the page. Listing all eighteen would
                    put us straight back to rows that do nothing when clicked.
                  */}
                  <ul className="grid gap-0.5">
                    {navItems.map((s) => {
                      const isActive = activeSection === s.id
                      return (
                        <li key={s.id} className="min-w-0">
                          <button
                            type="button"
                            onClick={() => scrollToSection(s.id)}
                            className={`t-body-sm block w-full truncate rounded px-2.5 py-1.5 text-left transition-colors ${
                              isActive
                                ? isLightNav ? 'bg-black/15' : 'bg-white/25'
                                : isLightNav ? 'hover:bg-black/10' : 'hover:bg-white/15'
                            }`}
                            style={{ color: isActive ? navFg : hexToRgba(navFg, 0.72) }}
                          >
                            {s.label || s.heading}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </aside>
            )}

            <div className="min-w-0">
              {/* Read mode, inside the frame and sticky to the scroll.
                  It has to stay reachable eight sections deep, because that is
                  where a reader decides a section is longer than the time they
                  have. A header control would mean scrolling back up to change
                  it, which is the moment they close the tab instead. */}
              {hasSections && (
                <div className="sticky top-3 z-20 mb-8 flex flex-col items-end">
                  <div
                    role="group"
                    aria-label="How much of this study to show"
                    className="inline-flex gap-1 rounded-(--radius-pill) border border-(--line)
                               bg-(--page) p-1 shadow-lg"
                  >
                    {(['quick', 'full'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => { switchMode(m); dismissHint() }}
                        aria-pressed={mode === m}
                        aria-describedby={hint ? 'read-mode-hint' : undefined}
                        title={m === 'quick'
                          ? 'The argument, in two or three lines a section'
                          : 'The full write up, with the reasoning'}
                        className={`t-body-sm rounded-[12px] px-4 py-1.5 transition-colors
                                    ${mode === m
                                      ? 'bg-(--ink) text-(--page)'
                                      : 'text-(--ink-muted) hover:text-(--ink)'}`}
                      >
                        {m === 'quick' ? 'Quick read' : 'Full read'}
                      </button>
                    ))}
                  </div>

                  {/* Sits under the control it describes and points at it, so
                      there is no question which thing is being explained. */}
                  {hint && (
                    <div
                      id="read-mode-hint"
                      role="status"
                      className="hint-in relative mt-2 max-w-[19rem] rounded-(--radius-sm) border border-(--line)
                                 bg-(--ink) px-3.5 py-2.5 text-(--page) shadow-xl"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 right-8 h-2 w-2 rotate-45 border-l border-t border-(--line) bg-(--ink)"
                      />
                      <p className="t-body-sm">
                        Short on time? Quick read gives you the argument of every
                        section. Full read keeps the reasoning behind it.
                      </p>
                      <button
                        onClick={dismissHint}
                        className="t-caption mt-2 underline underline-offset-2 opacity-70 hover:opacity-100"
                      >
                        Got it
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/*
                Two documents, not one document at two lengths.

                Quick read is an opening, the problem, the solution, the work in
                a single deck, then the decisions and what came of it. Full read
                is every section in order. They share the panel and the section
                ids, so switching between them can hold the reader in place, but
                they are not the same page shortened — which is what made the
                old Quick read still eighteen sections long.

                Both stay mounted and the mode only hides one, so the prose that
                makes this a writing sample is always in the HTML a crawler
                reads, and switching is instant rather than a remount. The
                hidden figures cost nothing: a lazy image inside `hidden` is
                never requested.
              */}
              <div hidden={mode !== 'quick'} className="grid gap-14">
                {quickTop.map((s) => (
                  <QuickBeat key={s.id} section={s} />
                ))}

                {slides.length > 0 && (
                  <section id="the-work" className="reveal-in min-w-0 scroll-mt-6">
                    <p className="t-caption mb-3 text-(--ink-muted)">The work</p>
                    <h3 className="t-heading-sm mb-6 max-w-[32ch] text-(--ink)">
                      How it looks, and what it took
                    </h3>
                    <SlideShow slides={slides} accent={project.accent} />
                  </section>
                )}

                {quickEnd.map((s) => (
                  <QuickBeat key={s.id} section={s} />
                ))}
              </div>

              <div hidden={mode !== 'full'} className="grid gap-14">
                {project.sections?.map((s) => (
                  <section id={s.id} key={s.id} className="reveal-in min-w-0 scroll-mt-6">
                    <p className="t-caption mb-3 text-(--ink-muted)">{s.label}</p>
                    <h3 className="t-heading-sm max-w-[32ch] text-(--ink)">{s.heading}</h3>
                    <div hidden={mode !== 'full'}>
                     <div className="mt-6 grid gap-7">
                       {s.blocks.map((b, i) => {
                         if (
                           b.kind === 'figure' &&
                           (b as { layout?: string }).layout === 'horizontal' &&
                           s.blocks[i + 1]?.kind === 'figure' &&
                           (s.blocks[i + 1] as { layout?: string }).layout === 'horizontal'
                         ) {
                           const next = s.blocks[i + 1] as Extract<Block, { kind: 'figure' }>
                           return (
                             <div key={i} className="grid grid-cols-2 gap-4">
                               <FigureBlock block={b} />
                               <FigureBlock block={next} />
                             </div>
                           )
                         }
                         if ((b as { layout?: string }).layout === 'horizontal') return null
                         return <BlockView key={i} block={b} />
                       })}
                     </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky close button for mobile variant */}
      <button
        onClick={close}
        aria-label="Close case study"
        className="sm:hidden fixed bottom-6 right-6 z-[110] flex items-center gap-2 rounded-full border border-(--line-strong) bg-(--page) px-4 py-2.5 text-(--ink) shadow-xl transition-transform active:scale-95"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        <span className="t-body-sm">Close</span>
      </button>
    </div>
  )
}

/**
 * One beat of Quick read: a heading and two or three lines.
 *
 * No figures. Every visual in the study is in the deck a few beats down, and
 * repeating one here would put the reader back to scrolling past pictures to
 * reach the next sentence — which is the thing Quick read exists to avoid.
 *
 * It keeps the section's own id so a reader switching modes stays where they
 * were, and so the contents nav can point at it.
 */
function QuickBeat({ section }: { section: Section }) {
  return (
    <section id={section.id} className="reveal-in min-w-0 scroll-mt-6">
      <p className="t-caption mb-3 text-(--ink-muted)">{section.label}</p>
      <h3 className="t-heading-sm max-w-[32ch] text-(--ink)">{section.heading}</h3>
      {section.tldr && (
        <ul className="mt-6 grid gap-3">
          {section.tldr.map((line) => (
            <li key={line.slice(0, 24)} className="t-body-sm flex gap-3 text-(--ink-muted)">
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-(--ink-muted)" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function FigureBlock({ block }: { block: Extract<Block, { kind: 'figure' }> }) {
  const [fullscreen, setFullscreen] = useState(false)
  const openFullscreen = block.fullscreen ? () => setFullscreen(true) : undefined

  if (block.scrollable) {
    return (
      <figure className="min-w-0">
        <div
          className={`w-full overflow-y-auto overflow-x-hidden rounded-[8px] border border-(--line) ${block.bg ? '' : 'bg-(--surface)'}`}
          style={{
            height: '720px',
            maxHeight: 'calc(100vh - 6rem)',
            ...(block.bg ? { backgroundColor: block.bg } : {}),
            padding: '10px',
          }}
        >
          <img
            src={block.src}
            alt={block.caption ?? ''}
            loading="lazy"
            decoding="async"
            className="settle block w-full"
            style={{ height: 'auto' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        {block.caption && <figcaption className="t-caption mt-3 text-(--ink-muted)">{block.caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="min-w-0">
      <div
        className={`group relative w-full overflow-hidden rounded-[8px] border border-(--line) ${block.bg ? '' : 'bg-(--surface)'}`}
        style={{
          aspectRatio: block.ratio ?? '16/9',
          ...(block.bg ? { backgroundColor: block.bg } : {}),
          padding: '10px',
        }}
      >
        <img
          src={block.src}
          alt={block.caption ?? ''}
          loading="lazy"
          decoding="async"
          className={`settle block h-full w-full ${block.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          onClick={openFullscreen}
          style={openFullscreen ? { cursor: 'zoom-in' } : undefined}
        />
        {block.fullscreen && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setFullscreen(true) }}
            aria-label="View fullscreen"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full
                       bg-black/55 text-white shadow-md ring-1 ring-white/20 backdrop-blur-sm
                       transition-all hover:bg-black/80 hover:scale-105 focus-visible:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
        )}
      </div>
      {block.caption && <figcaption className="t-caption mt-3 text-(--ink-muted)">{block.caption}</figcaption>}
      {block.fullscreen && fullscreen && (
        <FullscreenViewer
          src={block.src}
          alt={block.caption ?? ''}
          onClose={() => setFullscreen(false)}
        />
      )}
    </figure>
  )
}

/**
 * Fullscreen viewer for a single image.
 *
 * Shows the whole image fitted to the viewport. No zoom, no pan, no lens — the
 * point is to give the image the room it was saved for. Escape or the close
 * button dismisses.
 */
function FullscreenViewer({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button
        onClick={onClose}
        aria-label="Close fullscreen view"
        className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-contain select-none"
        draggable={false}
      />
    </div>
  )
}

/**
 * Product screens in the hardware they were drawn for.
 *
 * The frame carried a hardcoded `1512 / 982` for desktop, and not one export is
 * that shape — Merkle is 1440x1024, ForeCash 1440x936, Spotify 1440x900. With
 * object-cover the difference came off the top and bottom of every desktop
 * screen, which is why the Merkle hero looked cropped. The ratio now comes from
 * the file's own project, and `object-contain` means a screen that still does
 * not match letterboxes instead of losing its header.
 */
function ScreensBlock({ block }: { block: Extract<Block, { kind: 'screens' }> }) {
  return (
    <figure className="min-w-0">
      {block.title && <h3 className="t-body mb-5 font-semibold text-(--ink)">{block.title}</h3>}
      <div
        className={`grid gap-5 ${
          block.device === 'phone'
            ? block.items.length === 1
              ? 'max-w-[280px] grid-cols-1'
              : block.items.length === 2
                ? 'grid-cols-2 sm:max-w-[600px]'
                : 'grid-cols-2 sm:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {block.items.map((s) => (
          <figure key={s.src} className="min-w-0">
            <DeviceFrame
              device={block.device}
              className="w-full"
              screen={block.device === 'phone' ? PHONE_SCREEN : webScreenFor(s.src)}
            >
              <img
                src={s.src}
                alt={s.caption ?? ''}
                loading="lazy"
                decoding="async"
                className="settle h-full w-full object-contain"
                style={{
                  aspectRatio: block.device === 'phone' ? PHONE_SCREEN : webScreenFor(s.src),
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </DeviceFrame>
            {s.caption && (
              <figcaption className="t-caption mt-2.5 text-(--ink-muted)">{s.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </figure>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'screens':
      return <ScreensBlock block={block} />

    case 'text':
      return (
        <div className="grid gap-4">
          {block.body.map((p) => <p key={p.slice(0, 24)} className="t-body-sm text-(--ink-muted)">{p}</p>)}
        </div>
      )

    case 'list':
      return (
        <div className="min-w-0">
          {block.title && <h4 className="t-body mb-3 text-(--ink)">{block.title}</h4>}
          <ul className="grid gap-2.5">
            {block.items.map((it) => (
              <li key={it.slice(0, 24)} className="t-body-sm flex gap-3 text-(--ink-muted)">
                <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-(--line-strong)" />
                <span className="min-w-0">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'quote':
      return (
        <figure className="card min-w-0 p-6">
          <blockquote className={`t-body text-(--ink) ${'weight' in block && block.weight === 'bold' ? 'font-semibold' : ''}`}>"{block.body}"</blockquote>
          {block.source && <figcaption className="t-caption mt-3 text-(--ink-muted)">{block.source}</figcaption>}
        </figure>
      )

    case 'split':
      return (
        <div className="min-w-0">
          {block.title && <h4 className="t-body mb-4 text-(--ink)">{block.title}</h4>}
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {block.items.map((it) => (
              <div key={it.label} className="min-w-0 border-t border-(--line) pt-3">
                <div className="t-body-sm text-(--ink)">{it.label}</div>
                <p className="t-body-sm mt-1.5 text-(--ink-muted)">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      )

    /* A funnel reads as loss, so each rung is drawn shorter than the one above
       it. The bar is the argument; the number only confirms it. */
    case 'ladder':
      return (
        <div className="min-w-0">
          {block.title && <h4 className="t-body mb-4 text-(--ink)">{block.title}</h4>}
          <ol className="grid gap-2">
            {block.steps.map((st, i) => {
              const width = 100 - i * (60 / Math.max(1, block.steps.length - 1))
              return (
                <li key={st.stage} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="t-body-sm text-(--ink)">{st.stage}</span>
                    <span className="t-body-sm tabular-nums text-(--ink-muted)">{st.value}</span>
                  </div>
                  <div
                    className="mt-1.5 h-2 rounded-full bg-(--surface-2) transition-[width] duration-700 ease-(--ease-out)"
                    style={{ width: `${width}%` }}
                    aria-hidden="true"
                  />
                  <p className="t-caption mt-1.5 text-(--ink-muted)">{st.note}</p>
                </li>
              )
            })}
          </ol>
        </div>
      )

    case 'compare':
      return (
        <div className="min-w-0">
          {block.title && <h4 className="t-body mb-4 text-(--ink)">{block.title}</h4>}
          <div className="grid gap-3">
            {block.items.map((it) => (
              <div key={it.name} className="card min-w-0 p-5">
                <div className="t-body-sm text-(--ink)">{it.name}</div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <p className="t-body-sm text-(--ink-muted)">{it.good}</p>
                  <p className="t-body-sm text-(--ink-muted)">{it.gap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    /* The narrative beats. The two outcomes are deliberately the same shape, so
       the difference the reader notices is the timeline, not the styling. */
    case 'beats':
      return (
        <div className="min-w-0">
          <h4 className="t-body mb-1 text-(--ink)">{block.title}</h4>
          {block.lede && <p className="t-body-sm mb-4 text-(--ink-muted)">{block.lede}</p>}
          <ol className="mt-4 grid gap-0">
            {block.beats.map((b, i) => (
              <li key={b.at + i} className="grid gap-1 border-l-2 py-4 pl-5"
                  style={{ borderColor: block.tone === 'with' ? 'var(--ink)' : 'var(--line)' }}>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="t-caption tabular-nums text-(--ink-muted)">{b.at}</span>
                  <span className="t-body-sm text-(--ink)">{b.said}</span>
                </div>
                <p className="t-body-sm text-(--ink-muted)">{b.note}</p>
              </li>
            ))}
          </ol>
          {block.close && <p className="t-body-sm mt-4 text-(--ink)">{block.close}</p>}
        </div>
      )

    /* Scrolls sideways inside its own container rather than widening the
       dialog, which is what a wide table would otherwise do on a phone. */
    case 'table':
      return (
        <div className="min-w-0">
          {block.title && <h4 className="t-body mb-4 text-(--ink)">{block.title}</h4>}
          <div className="overflow-x-auto rounded-(--radius-sm) border border-(--line)">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col"
                        className="t-caption border-b border-(--line) bg-(--surface) px-4 py-3 text-(--ink-muted)">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}
                          className={`t-body-sm border-b border-(--line) px-4 py-3 align-top ${
                            i === 0 ? 'text-(--ink)' : 'text-(--ink-muted)'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'principles':
      return (
        <div className="min-w-0">
          {block.title && <h4 className="t-body mb-4 text-(--ink)">{block.title}</h4>}
          <ol className="grid gap-0">
            {block.items.map((it) => (
              <li key={it.no} className="grid gap-1 border-t border-(--line) py-4 sm:grid-cols-[auto_1fr] sm:gap-6">
                <span className="t-caption tabular-nums text-(--ink-muted)">{it.no}</span>
                <div className="min-w-0">
                  <div className="t-body-sm text-(--ink)">{it.name}</div>
                  <p className="t-body-sm mt-1 text-(--ink-muted)">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )

    /* Degrades on purpose. Until the export is dropped into public/img the
       image fails to load and the tinted panel underneath stays visible with
       its caption, so a missing asset reads as "not added yet" rather than as
       a broken page. */
    case 'figure':
      return <FigureBlock block={block} />
  }
}

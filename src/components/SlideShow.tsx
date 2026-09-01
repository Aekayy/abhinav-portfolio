import { useEffect, useRef, useState } from 'react'
import { DeviceFrame, PHONE_SCREEN, webScreenFor } from '@/components/DeviceFrame'
import { shellRatio } from '@/site/devices'

/** One image on a slide. Several sit together when they belong together. */
export type SlideItem = {
  src: string
  /** Set when the image is a product screen, so it gets its hardware. */
  device?: 'phone' | 'web'
  bg?: string
}

/** One slide: a named group of images. */
export type Slide = {
  /** What this is. Doubles as the label in the jump nav. */
  label: string
  caption?: string
  items: SlideItem[]
}

/**
 * The work, in five slides.
 *
 * It was one slide per image, which for Harmoney meant thirty one clicks to see
 * a study advertised as a two minute read — the deck had stopped being a
 * shortcut and become the long version with a different control. So slides are
 * groups now: every phone screen on one, the desktop app on another, and the
 * artifacts that carry the argument on the rest.
 *
 * Five is a deliberate ceiling rather than a coincidence of the data. A deck
 * you can see the whole of is one you will actually finish, and the jump nav
 * underneath only works as a nav while its labels still fit on a line.
 *
 * Built on a native scroll container rather than a JavaScript carousel:
 *
 * - Touch swipe, trackpad and keyboard arrows all work without being written,
 *   and interrupt properly, because native scrolling is interruptible.
 * - The arrows and the nav both scroll the strip rather than setting an index.
 *   There is one source of truth for which slide you are on, and it is the
 *   scroll position, so the controls can never disagree with the view.
 * - With no script at all it degrades to a scrollable row.
 */
export function SlideShow({ slides, accent }: { slides: Slide[]; accent?: string }) {
  const strip = useRef<HTMLDivElement | null>(null)
  const [i, setI] = useState(0)

  // The scroll position is the state. This only mirrors it, for the label, the
  // counter, the disabled arrows and the selected chip.
  useEffect(() => {
    const el = strip.current
    if (!el) return
    const onScroll = () => {
      const w = el.clientWidth
      if (w > 0) setI(Math.round(el.scrollLeft / w))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (n: number) => {
    const el = strip.current
    if (!el) return
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' })
  }

  if (slides.length === 0) return null
  const at = Math.min(i, slides.length - 1)
  const current = slides[at]

  return (
    <figure
      className="min-w-0"
      role="group"
      aria-roledescription="carousel"
      aria-label="The work, in one deck"
    >
      <div className="relative">
        <div
          ref={strip}
          tabIndex={0}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-(--radius-card)
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--ink)"
          style={{
            // The project's own color, well under the contrast floor, so the
            // deck reads as one surface rather than a row of loose pictures.
            backgroundColor: accent
              ? `color-mix(in srgb, ${accent} 10%, var(--surface))`
              : 'var(--surface)',
          }}
        >
          {slides.map((s, n) => (
            <div
              key={s.label + n}
              /* Wider side padding than top and bottom: the arrows are
                 positioned inside this box, and at the old even padding they
                 sat on top of the outermost device rather than beside it. */
              /* A size container, so the devices inside can be measured
                 against this slide in both axes — and so the row's own
                 percentage height stops depending on what is in it. */
              style={{ containerType: 'size' }}
              className="grid h-[min(58vh,500px)] w-full shrink-0 snap-center place-items-center px-12 py-4 sm:px-16 sm:py-8"
              aria-label={`${n + 1} of ${slides.length}: ${s.label}`}
            >
              {/* Phones sit in a row and share the height; a single image gets
                  the whole slide. The row is centred and wraps nothing: four
                  phones at this height always fit a slide this wide. */}
              <div className="flex h-full w-full items-center justify-center gap-[2.5%]">
                {s.items.map((it, k) => (
                  <SlideMedia
                    key={it.src + k}
                    item={it}
                    alt={k === 0 ? s.caption ?? s.label : ''}
                    eager={n === 0}
                    count={s.items.length}
                    index={k}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Outside the strip, so they never scroll away from the reader. */}
        <Arrow side="left" onClick={() => goTo(at - 1)} disabled={at === 0} />
        <Arrow side="right" onClick={() => goTo(at + 1)} disabled={at >= slides.length - 1} />
      </div>

      {/*
        A named nav, not dots.

        Dots tell you how many there are and nothing about what is in them, so
        reaching the design system means clicking through everything before it.
        With five slides the names fit on one line, and a reader who only came
        for the journey map can go straight to it.
      */}
      {slides.length > 1 && (
        <div
          className="mt-3 flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Jump to a slide"
        >
          {slides.map((s, n) => (
            <button
              key={s.label + n}
              type="button"
              role="tab"
              aria-selected={n === at}
              onClick={() => goTo(n)}
              className={`t-caption rounded-(--radius-pill) border px-3 py-1 transition-colors duration-(--dur-quick)
                          ${n === at
                            ? 'border-(--ink) bg-(--ink) text-(--page)'
                            : 'border-(--line) text-(--ink-muted) hover:border-(--line-strong) hover:text-(--ink)'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <figcaption className="mt-3 flex min-w-0 items-baseline justify-between gap-4">
        <span className="t-caption min-w-0 text-(--ink-muted)">{current.caption ?? ''}</span>
        {/* Announced politely, so a screen reader says where you landed without
            interrupting whatever it was reading. */}
        <span className="t-caption shrink-0 tabular-nums text-(--ink-muted)" aria-live="polite">
          {at + 1} / {slides.length}
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * How many of a thing fit on one slide before they stop being readable.
 *
 * Four phones is right on a laptop and gives 64px-wide phones on a 375px
 * screen, which is a picture of a phone rather than a screen you can read. So
 * below the small breakpoint the count drops and the extras are hidden, rather
 * than everything shrinking together.
 */
const ON_SMALL = { phone: 2, web: 1 } as const

function SlideMedia({
  item, alt, eager, count, index,
}: { item: SlideItem; alt: string; eager: boolean; count: number; index: number }) {
  const solo = count === 1
  /**
   * Whether this image is too tall for the slide to show whole.
   *
   * Decided from the loaded image against its own container rather than from a
   * ratio in the data, because it depends on both: the same design system board
   * fits on a wide desktop slide and does not on a phone. Undecided until the
   * image loads, and `contain` is the safe state to be in meanwhile.
   */
  const [tall, setTall] = useState(false)
  const box = useRef<HTMLSpanElement | null>(null)

  const img = (
    <img
      src={item.src}
      alt={alt}
      // Only the first slide is eager. A deck must not cost every image to
      // show one.
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      /*
       * Contained, not covered.
       *
       * The frame is sized from the screenshot's own ratio, so in the normal
       * case these are identical. They differ only when a project's exports
       * drift from the size recorded for it — and then `cover` silently shaves
       * the edges off a dashboard, which is exactly the content a desktop
       * screenshot is being shown for. `contain` shows the whole screen and
       * lets a mismatch appear as a thin band instead of missing UI.
       */
      className={
        item.device ? 'h-full w-full object-contain'
        : tall ? 'w-full'
        : 'max-h-full max-w-full object-contain'
      }
      style={item.bg && !item.device ? { backgroundColor: item.bg } : undefined}
      onLoad={(e) => {
        if (item.device) return
        const el = e.currentTarget
        const c = box.current
        if (!c || !el.naturalWidth) return
        // Proportionally taller than the space it has: contained, it would be
        // shrunk until the labels on it are unreadable, which for a design
        // system board or a journey map is the whole content.
        setTall(el.naturalHeight / el.naturalWidth > c.clientHeight / c.clientWidth * 1.15)
      }}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )

  if (!item.device) {
    return (
      <span
        ref={box}
        /*
         * Scrolls only when it has to.
         *
         * `overflow-y: auto` on a box that is already the height of the slide
         * means a picture that fits shows no scrollbar at all, and one that
         * does not gets its own — the reader scrolls the board rather than the
         * page, and only on the slide where there is something to scroll.
         */
        className={`w-full ${tall
          ? 'h-full overflow-y-auto overscroll-contain rounded-(--radius-sm) [scrollbar-width:thin]'
          : 'grid h-full place-items-center'}`}
      >
        {img}
      </span>
    )
  }

  /*
   * Sized against the slide in both axes.
   *
   * `--cap` is how much of the slide's height this device may take, `--k` is
   * the count multiplied by the shell's aspect ratio, so `100cqw / --k` is the
   * width each one can have. `.deck-item` takes whichever is smaller, and swaps
   * to the `-sm` pair below the small breakpoint, where fewer are shown.
   *
   * Driving by height alone was right on a laptop and gave four 64px phones on
   * a 375px screen. Driving by width alone would leave them small on a wide one.
   */
  const shown = ON_SMALL[item.device]
  const ratio = shellRatio(item.device, item.device === 'phone' ? PHONE_SCREEN : webScreenFor(item.src))
  const GAP = 2.5
  const cap = solo ? '100cqh' : item.device === 'phone' ? '92cqh' : '80cqh'
  const smCount = Math.min(count, shown)

  return (
    <DeviceFrame
      device={item.device}
      screen={item.device === 'phone' ? PHONE_SCREEN : webScreenFor(item.src)}
      className="deck-item"
      // Beyond what fits on a small screen, so CSS can drop it there.
      overflow={index >= shown}
      style={{
        '--cap': cap,
        '--gaps': `${((count - 1) * GAP).toFixed(1)}cqw`,
        '--k': (count * ratio).toFixed(4),
        '--gaps-sm': `${((smCount - 1) * GAP).toFixed(1)}cqw`,
        '--k-sm': (smCount * ratio).toFixed(4),
      } as React.CSSProperties}
    >
      {img}
    </DeviceFrame>
  )
}

function Arrow({
  side, onClick, disabled,
}: { side: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === 'left' ? 'Previous' : 'Next'}
      className={`absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full
                  border border-(--line) bg-(--page) text-(--ink) shadow-lg
                  transition-[opacity,transform] duration-(--dur-quick)
                  hover:scale-105 disabled:pointer-events-none disabled:opacity-0
                  ${side === 'left' ? 'left-3' : 'right-3'}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={side === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

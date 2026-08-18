import { useRef } from 'react'
import type { Project } from '@/data/projects'
import { go } from '@/site/router'

/**
 * The reference's horizontal scroll row.
 *
 * A single track, not a grid — the .md is explicit that cards never stack into
 * multiple rows. Two are visible at a time on a desktop, with the third
 * peeking, because a row that fits exactly two reads as a static pair rather
 * than as something you can scroll. The peek is the affordance.
 *
 * Scroll snapping makes the arrows and a trackpad flick land on a card edge
 * instead of halfway through one. Native scrolling is kept underneath, so a
 * trackpad, a touchscreen, a shift-wheel and the keyboard all work without
 * anything being reimplemented.
 */
export function Gallery({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement | null>(null)

  const page = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    // One card plus its gap, so a press advances by exactly one frame.
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.5
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="shell mb-5 flex justify-end gap-2">
        {([['-1', 'Previous'], ['1', 'Next']] as const).map(([dir, label]) => (
          <button
            key={label}
            onClick={() => page(Number(dir) as 1 | -1)}
            aria-label={`${label} projects`}
            className="grid h-10 w-10 place-items-center rounded-(--radius-pill) border border-(--line)
                       text-(--ink) transition-colors hover:bg-(--surface)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d={dir === '1' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} stroke="currentColor"
                    strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {/* Full bleed: the reference puts no page padding on the track, so the
          row runs to the edges and the first card lines up with the shell. */}
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: 'max(24px, calc((100vw - var(--page-max)) / 2))' }}
      >
        {projects.map((p) => (
          <article
            key={p.slug}
            data-card
            className="w-[78vw] min-w-0 shrink-0 snap-start sm:w-[52vw] lg:w-[calc((var(--page-max)-24px)/2)]"
          >
            <button
              onClick={() => go(`/projects/${p.slug}`)}
              className="group block w-full min-w-0 text-left"
              aria-label={`Open the ${p.name} case study`}
            >
              <div
                className="lift aspect-[4/3] w-full rounded-(--radius-card) border border-(--line)"
                style={{ background: `linear-gradient(150deg, ${p.accent}, ${p.accent}22)` }}
                aria-hidden="true"
              />
              <div className="mt-4 flex min-w-0 items-baseline gap-2">
                <span className="t-body font-medium text-(--ink)">{p.name}</span>
                <span aria-hidden="true" className="text-(--ink-muted)">↗</span>
              </div>
              <p className="t-body-sm mt-1 text-(--ink-muted)">{p.summary}</p>
              <p className="t-caption mt-3 text-(--ink-muted)">{p.year} · {p.industry}</p>
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

import type { Project } from '@/data/projects'
import { go } from '@/site/router'

/**
 * The reference's horizontal scroll row.
 *
 * A single track, not a grid — the .md is explicit that cards never stack
 * into multiple rows, and the row runs edge to edge with no page padding.
 * Cards are the reference's 400×500 shape: a 24px-radius thumbnail, the name
 * with its ↗, and one muted line underneath. No arrows, no dots — a trackpad,
 * a touchscreen, a shift-wheel and the keyboard all scroll natively.
 */
export function Gallery({ projects }: { projects: Project[] }) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-4
                 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {projects.map((p) => (
        <article
          key={p.slug}
          data-card
          className="w-[min(400px,78vw)] min-w-0 shrink-0 snap-start"
        >
          <button
            onClick={() => go(`/projects/${p.slug}`)}
            className="group block w-full min-w-0 text-left"
            aria-label={`Open the ${p.name} case study`}
          >
            <div
              className="lift aspect-[4/5] w-full overflow-hidden rounded-(--radius-card) bg-(--surface)"
              aria-hidden="true"
            >
              {p.thumb && (
                <img
                  src={p.thumb}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>
            <div className="mt-2 flex min-w-0 items-baseline gap-2">
              <span className="t-body-sm text-(--ink)">{p.name}</span>
              <span aria-hidden="true" className="text-(--ink-muted)">↗</span>
            </div>
            <p className="t-body-sm mt-1 line-clamp-2 text-(--ink-muted)">{p.summary}</p>
          </button>
        </article>
      ))}
    </div>
  )
}

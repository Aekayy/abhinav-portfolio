import type { Project } from '@/data/projects'
import { Link } from './Bits'

/**
 * The reference's card stack: a large rounded thumbnail, then a typographic
 * block beneath it with no container of its own.
 *
 * The thumbnail carries the project's own colour because the reference is
 * explicit that the work provides every bit of colour on the page and the
 * chrome stays achromatic. Until real screenshots are dropped in, that colour
 * is the artwork.
 */
export function ProjectCard({ project }: { project: Project }) {
  const external = project.external

  const body = (
    <>
      <div
        className="aspect-[4/3] w-full rounded-(--radius-card) border border-(--line)"
        style={{ background: `linear-gradient(150deg, ${project.accent}, ${project.accent}22)` }}
        aria-hidden="true"
      />
      <div className="mt-4 flex min-w-0 items-baseline gap-2">
        <span className="t-body font-medium text-(--ink)">{project.name}</span>
        <span aria-hidden="true" className="text-(--ink-muted)">↗</span>
      </div>
      <p className="t-body-sm mt-1 text-(--ink-muted)">{project.summary}</p>
      <p className="t-caption mt-3 text-(--ink-muted)">
        {project.year} · {project.industry}
      </p>
    </>
  )

  return external ? (
    <a href={external.href} target="_blank" rel="noreferrer noopener" className="group block min-w-0">
      {body}
    </a>
  ) : (
    <Link to={`/projects/${project.slug}`} className="group block min-w-0">{body}</Link>
  )
}

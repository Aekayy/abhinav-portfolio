import type { Block, Project } from '@/data/projects'
import { CASE_STUDIES } from '@/data/projects'
import { Section, Eyebrow, Link } from '@/components/Bits'

/**
 * One renderer for every case study.
 *
 * The studies differ in content, not in shape, so they share a layout and a
 * small block vocabulary. That keeps them consistent to read and means a new
 * study is a data change rather than a new page.
 */
export function CaseStudy({ project }: { project: Project }) {
  const others = CASE_STUDIES.filter((p) => p.slug !== project.slug).slice(0, 2)

  return (
    <>
      <div className="shell">
        <header className="pt-16 md:pt-24">
          <Link to="/projects" className="t-body-sm text-(--ink-muted) transition-colors hover:text-(--ink)">
            ← All projects
          </Link>
          <p className="t-caption mt-8 uppercase tracking-[0.16em] text-(--ink-muted)">
            Case study — {project.name}
          </p>
          <h1 className="t-display mt-4 max-w-[22ch] text-(--ink)">{project.title}</h1>
          <p className="t-body mt-6 max-w-[62ch] text-(--ink-muted)">{project.summary}</p>
        </header>

        <div
          className="mt-12 aspect-[16/7] w-full rounded-(--radius-card) border border-(--line)"
          style={{ background: `linear-gradient(150deg, ${project.accent}, ${project.accent}22)` }}
          aria-hidden="true"
        />

        <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-(--line) pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Year', project.year],
            ['Role', project.role],
            ['Industry', project.industry],
            [project.duration ? 'Duration' : 'Client', project.duration ?? project.client ?? '—'],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="t-caption uppercase tracking-[0.16em] text-(--ink-muted)">{k}</dt>
              <dd className="t-body-sm mt-2 text-(--ink)">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {project.sections?.map((s) => (
        <Section key={s.id} className="border-t border-(--line)">
          <Eyebrow>{s.label}</Eyebrow>
          <h2 className="t-heading max-w-[26ch] text-(--ink)">{s.heading}</h2>
          <div className="mt-8 grid gap-8">
            {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
          </div>
        </Section>
      ))}

      <Section className="border-t border-(--line)">
        <Eyebrow>Next</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-2">
          {others.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`}
                  className="card min-w-0 p-7 transition-colors hover:border-(--line-strong)">
              <div className="t-sub text-(--ink)">{p.name} ↗</div>
              <p className="t-body-sm mt-2 text-(--ink-muted)">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === 'text') {
    return (
      <div className="grid max-w-[64ch] gap-4">
        {block.body.map((p) => <p key={p.slice(0, 24)} className="t-body text-(--ink-muted)">{p}</p>)}
      </div>
    )
  }

  if (block.kind === 'list') {
    return (
      <div className="min-w-0 max-w-[64ch]">
        {block.title && <h3 className="t-sub mb-4 text-(--ink)">{block.title}</h3>}
        <ul className="grid gap-3">
          {block.items.map((it) => (
            <li key={it.slice(0, 24)} className="t-body-sm flex gap-3 text-(--ink-muted)">
              <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-(--line-strong)" />
              <span className="min-w-0">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (block.kind === 'quote') {
    return (
      <figure className="card min-w-0 max-w-[64ch] p-7">
        <blockquote className="t-sub text-(--ink)">“{block.body}”</blockquote>
        {block.source && (
          <figcaption className="t-caption mt-4 text-(--ink-muted)">{block.source}</figcaption>
        )}
      </figure>
    )
  }

  return (
    <div className="min-w-0">
      {block.title && <h3 className="t-sub mb-5 text-(--ink)">{block.title}</h3>}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {block.items.map((it) => (
          <div key={it.label} className="min-w-0 border-t border-(--line) pt-4">
            <div className="t-body-sm font-medium text-(--ink)">{it.label}</div>
            <p className="t-body-sm mt-2 text-(--ink-muted)">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

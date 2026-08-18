import { useEffect, useRef } from 'react'
import type { Block, Project } from '@/data/projects'
import { go } from '@/site/router'

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
export function StudyOverlay({ project }: { project: Project }) {
  const panel = useRef<HTMLDivElement | null>(null)
  const restoreTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement
    panel.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); go('/projects') }
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

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      restoreTo.current?.focus?.()
    }
  }, [project.slug])

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/45 px-0 py-0 sm:px-6 sm:py-10"
      onClick={(e) => { if (e.target === e.currentTarget) go('/projects') }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} case study`}
        tabIndex={-1}
        className="mx-auto w-full max-w-[900px] overflow-hidden bg-(--page) outline-none
                   sm:rounded-(--radius-card)"
      >
        <div className="relative">
          <div
            className="aspect-[16/9] w-full"
            style={{ background: `linear-gradient(150deg, ${project.accent}, ${project.accent}22)` }}
            aria-hidden="true"
          />
          <button
            onClick={() => go('/projects')}
            aria-label="Close case study"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full
                       bg-(--page) text-(--ink) transition-transform hover:scale-105"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-10 sm:px-10 md:px-14">
          <div className="grid gap-8 md:grid-cols-[180px_1fr] md:gap-12">
            <dl className="grid h-max min-w-0 gap-5">
              {[
                ['Role', project.role],
                ['Client', project.client ?? '—'],
                ['Year', project.year],
                ['Industry', project.industry],
                ...(project.duration ? [['Duration', project.duration]] : []),
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="t-caption text-(--ink-muted)">{k}</dt>
                  <dd className="t-body-sm mt-1 text-(--ink)">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="min-w-0">
              <h2 className="t-body text-(--ink-muted)">{project.name}</h2>
              <p className="t-heading mt-2 max-w-[24ch] text-(--ink)">{project.title}</p>
              <p className="t-body mt-6 text-(--ink-muted)">{project.summary}</p>

              {project.external && (
                <a href={project.external.href} target="_blank" rel="noreferrer noopener"
                   className="btn btn-solid mt-7">
                  {project.external.label} ↗
                </a>
              )}

              <div className="mt-12 grid gap-14">
                {project.sections?.map((s) => (
                  <section key={s.id} className="min-w-0">
                    <p className="t-caption mb-3 uppercase tracking-[0.16em] text-(--ink-muted)">{s.label}</p>
                    <h3 className="t-heading-sm max-w-[26ch] text-(--ink)">{s.heading}</h3>
                    <div className="mt-6 grid gap-7">
                      {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === 'text') {
    return (
      <div className="grid gap-4">
        {block.body.map((p) => <p key={p.slice(0, 24)} className="t-body-sm text-(--ink-muted)">{p}</p>)}
      </div>
    )
  }

  if (block.kind === 'list') {
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
  }

  if (block.kind === 'quote') {
    return (
      <figure className="card min-w-0 p-6">
        <blockquote className="t-body text-(--ink)">“{block.body}”</blockquote>
        {block.source && <figcaption className="t-caption mt-3 text-(--ink-muted)">{block.source}</figcaption>}
      </figure>
    )
  }

  return (
    <div className="min-w-0">
      {block.title && <h4 className="t-body mb-4 text-(--ink)">{block.title}</h4>}
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {block.items.map((it) => (
          <div key={it.label} className="min-w-0 border-t border-(--line) pt-3">
            <div className="t-body-sm font-medium text-(--ink)">{it.label}</div>
            <p className="t-body-sm mt-1.5 text-(--ink-muted)">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

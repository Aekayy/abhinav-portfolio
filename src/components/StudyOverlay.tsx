import { useEffect, useRef, useState } from 'react'
import type { Block, Project } from '@/data/projects'
import type { Post } from '@/data/profile'
import { go } from '@/site/router'

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
    role: 'Author',
    kind: 'project',
    accent: post.accent,
    hero: post.hero?.src,
    external: { href: post.href, label: 'Read it on the original site' },
    sections: post.body.map((b, i) => ({
      id: `s${i}`,
      label: 'Article',
      heading: b.heading,
      blocks: [
        ...(i === 0 && post.hero ? [{ kind: 'figure' as const, ...post.hero }] : []),
        { kind: 'text' as const, body: b.paragraphs },
        ...(b.quote ? [{ kind: 'quote' as const, ...b.quote }] : []),
        ...(b.image ? [{ kind: 'figure' as const, ...b.image }] : []),
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
    const el = scroller.current?.querySelector(`#${id}`)
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
      const containerTop = scrollEl.getBoundingClientRect().top
      let current = project.sections[0].id
      for (const s of project.sections) {
        const secEl = scrollEl.querySelector(`#${s.id}`)
        if (secEl) {
          const rect = secEl.getBoundingClientRect()
          if (rect.top - containerTop <= 160) {
            current = s.id
          }
        }
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

  const hasSections = Boolean(project.sections && project.sections.length > 1)
  const showNav = hasSections && !project.noSectionNav
  const navFg = getContrastColor(project.accent)
  const isLightNav = navFg === '#181818'

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
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-(--surface) sm:rounded-t-(--radius-card)" aria-hidden="true">
            {(project.hero || project.thumb) && (
              <img
                src={project.hero || project.thumb}
                alt=""
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
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
              ['Role', project.role],
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
                  className="card min-w-0 rounded-(--radius-card) p-4 shadow-lg"
                  style={{ backgroundColor: project.accent, color: navFg }}
                >
                  <p className="t-caption mb-3 px-2 font-medium" style={{ color: hexToRgba(navFg, 0.7) }}>Contents</p>
                  <ul className="grid gap-1">
                    {project.sections?.map((s) => {
                      const isActive = activeSection === s.id
                      return (
                        <li key={s.id} className="min-w-0">
                          <button
                            type="button"
                            onClick={() => scrollToSection(s.id)}
                            className={`t-body-sm block w-full truncate rounded px-2.5 py-1.5 text-left transition-colors ${
                              isActive
                                ? isLightNav ? 'bg-black/15' : 'bg-white/30'
                                : isLightNav ? 'hover:bg-black/10' : 'hover:bg-white/20'
                            }`}
                            style={{ color: isActive ? navFg : hexToRgba(navFg, 0.7) }}
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
              <div className="grid gap-14">
                {project.sections?.map((s) => (
                  <section id={s.id} key={s.id} className="reveal-in min-w-0 scroll-mt-6">
                    <p className="t-caption mb-3 text-(--ink-muted)">{s.label}</p>
                    <h3 className="t-heading-sm max-w-[32ch] text-(--ink)">{s.heading}</h3>
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

function FigureBlock({ block }: { block: Extract<Block, { kind: 'figure' }> }) {
  return (
    <figure className="min-w-0">
      <div
        className={`w-full overflow-hidden rounded-(--radius-card) border border-(--line) ${block.bg ? '' : 'bg-(--surface)'}`}
        style={{
          aspectRatio: block.ratio ?? '16/9',
          ...(block.bg ? { backgroundColor: block.bg } : {}),
        }}
      >
        <div className="p-4">
          <img
            src={block.src}
            alt={block.caption ?? ''}
            loading="lazy"
            decoding="async"
            className={`h-full w-full ${block.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>
      {block.caption && <figcaption className="t-caption mt-3 text-(--ink-muted)">{block.caption}</figcaption>}
    </figure>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
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
          <blockquote className="t-body text-(--ink)">“{block.body}”</blockquote>
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

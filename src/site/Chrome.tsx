import { useEffect, useState } from 'react'
import { PROFILE, SOCIALS } from '@/data/profile'
import { applyTheme, readTheme, storeTheme, type Theme } from './theme'
import { go } from './router'
import { cn } from '@/lib/cn'

export const NAV: [string, string][] = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/projects', 'Projects'],
  ['/blog', 'Blog'],
  ['/resume', 'Resume'],
  ['/contact', 'Contact'],
]

/**
 * The floating pill from the reference, doing a portfolio's job.
 *
 * The reference nav holds a name and a hamburger, because it fronts a single
 * page. Seven destinations will not fit that, so the pill keeps its shape and
 * its detachment from the page edge while the links live inside it, collapsing
 * to a sheet once there is no longer room.
 */
export function Nav({ route }: { route: string }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = readTheme()
    setTheme(t)
    applyTheme(t)
  }, [])

  useEffect(() => { setOpen(false) }, [route])

  const flip = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    applyTheme(next)
    storeTheme(next)
  }

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="shell">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-3 rounded-(--radius-pill)
                     border border-(--line) bg-(--page)/92 px-3 py-2 backdrop-blur-md"
        >
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); go('/') }}
            className="flex min-w-0 items-center gap-2.5 pl-1"
          >
            <img src="img/ak-logo.png" alt={PROFILE.name} width={28} height={28}
                 className="h-7 w-7 shrink-0 rounded-[6px] object-cover" />
            <span className="t-body-sm truncate font-medium text-(--ink)">{PROFILE.name}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.slice(1).map(([path, label]) => (
              <a
                key={path}
                href={`#${path}`}
                onClick={(e) => { e.preventDefault(); go(path) }}
                aria-current={route === path ? 'page' : undefined}
                className={cn(
                  't-body-sm rounded-(--radius-pill) px-3 py-2 transition-colors',
                  route === path
                    ? 'bg-(--surface) text-(--ink)'
                    : 'text-(--ink-muted) hover:text-(--ink)',
                )}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={flip}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="grid h-10 w-10 place-items-center rounded-(--radius-pill) border border-(--line)
                         text-(--ink) transition-colors hover:bg-(--surface)"
            >
              {theme === 'light' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
                    <line key={d} x1="12" y1="1.8" x2="12" y2="4.2" stroke="currentColor"
                          strokeWidth="1.7" strokeLinecap="round" transform={`rotate(${d} 12 12)`} />
                  ))}
                </svg>
              )}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-(--radius-pill) border border-(--line)
                         text-(--ink) transition-colors hover:bg-(--surface) lg:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                {open ? (
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <div className="mt-2 grid gap-1 rounded-(--radius-card) border border-(--line) bg-(--page) p-2 lg:hidden">
            {NAV.map(([path, label]) => (
              <a
                key={path}
                href={`#${path}`}
                onClick={(e) => { e.preventDefault(); go(path) }}
                aria-current={route === path ? 'page' : undefined}
                className={cn(
                  't-body rounded-(--radius-pill) px-4 py-3 transition-colors',
                  route === path ? 'bg-(--surface) text-(--ink)' : 'text-(--ink-muted)',
                )}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer data-no-reveal className="mt-24 border-t border-(--line) bg-(--footer) py-14">
      <div className="shell">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="min-w-0 max-w-[36ch]">
            <div className="t-sub text-(--ink)">{PROFILE.name}</div>
            <p className="t-body-sm mt-3 text-(--ink-muted)">
              {PROFILE.role} based in {PROFILE.location}. {PROFILE.available ? 'Open to full time roles in the US.' : ''}
            </p>
            <a href={`mailto:${PROFILE.email}`} className="t-body-sm mt-4 inline-block text-(--ink) underline underline-offset-4">
              {PROFILE.email}
            </a>
          </div>

          <nav aria-label="Footer" className="min-w-0">
            <div className="t-caption mb-3 uppercase tracking-[0.14em] text-(--ink-muted)">Pages</div>
            <ul className="grid gap-2">
              {NAV.map(([path, label]) => (
                <li key={path}>
                  <a href={`#${path}`} onClick={(e) => { e.preventDefault(); go(path) }}
                     className="t-body-sm text-(--ink-muted) transition-colors hover:text-(--ink)">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <div className="t-caption mb-3 uppercase tracking-[0.14em] text-(--ink-muted)">Elsewhere</div>
            <ul className="grid gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener"
                     className="t-body-sm text-(--ink-muted) transition-colors hover:text-(--ink)">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-(--line) pt-6">
          <span className="t-caption text-(--ink-muted)">Made with ☕ in hand</span>
          <span className="t-caption text-(--ink-muted)">{new Date().getFullYear()} · {PROFILE.name}</span>
        </div>
      </div>
    </footer>
  )
}

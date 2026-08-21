import { useEffect, useState } from 'react'
import { PROFILE, SOCIALS } from '@/data/profile'
import { applyTheme, readTheme, storeTheme, type Theme } from './theme'
import { go } from './router'
import { cn } from '@/lib/cn'

/**
 * Work is an anchor on the home page, not a page of its own.
 *
 * The gallery already lives on the home page, so sending Projects somewhere
 * else meant two screens showing the same row. Clicking Work now takes you
 * home and scrolls to it, which is where the case studies actually are.
 */
export const NAV: [string, string][] = [
  ['/', 'Home'],
  ['/#work', 'Work'],
  ['/about', 'About'],
  ['/blog', 'Blog'],
  ['/resume', 'Resume'],
  ['/contact', 'Contact'],
]

/**
 * The floating pill from the reference, exactly as specified: a detached
 * 16px-radius bar holding the name and a hamburger, nothing else.
 *
 * Everything the hamburger opens lives in an overlay that stays in the DOM
 * while closed — hidden, not unmounted — so a reader without JavaScript (or
 * a crawler, or the render test) still sees every destination.
 */
export function Nav({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const t = readTheme()
    setTheme(t)
    applyTheme(t)
  }, [])

  useEffect(() => { setOpen(false) }, [route])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const pick = (t: Theme) => {
    setTheme(t)
    applyTheme(t)
    storeTheme(t)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-6">
      <nav
        aria-label="Primary"
        className="flex items-center gap-4 rounded-(--radius-pill)
                   border border-(--line) bg-(--surface) px-5 py-3"
      >
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); go('/') }}
          className="t-body-sm text-(--ink)"
        >
          {PROFILE.name}
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-overlay"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-8 w-8 place-items-center text-(--ink)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="menu-overlay"
        aria-hidden={!open}
        className={cn('fixed inset-0 -z-10 bg-(--page)', open ? 'grid place-items-center' : 'hidden')}
      >
        <div className="grid gap-5 text-center">
          {NAV.map(([path, label]) => (
            <a
              key={path}
              href={`#${path}`}
              onClick={(e) => { e.preventDefault(); setOpen(false); go(path) }}
              aria-current={route === path ? 'page' : undefined}
              className={cn(
                't-display transition-colors',
                route === path ? 'text-(--ink)' : 'text-(--ink-muted) hover:text-(--ink)',
              )}
            >
              {label}
            </a>
          ))}
          <div className="mt-6 flex justify-center gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener"
                 className="t-body-sm text-(--ink-muted) transition-colors hover:text-(--ink)">
                {s.label} ↗
              </a>
            ))}
          </div>
          <a href={`mailto:${PROFILE.email}`}
             className="t-body-sm mt-2 text-(--ink-muted) transition-colors hover:text-(--ink)">
            {PROFILE.email}
          </a>
          {/* The pill stays pure per the reference; the switch lives here. */}
          <div className="mt-8 flex justify-center gap-1 rounded-(--radius-pill)
                          border border-(--line) p-1 justify-self-center">
            {(['dark', 'light'] as const).map((t) => (
              <button
                key={t}
                onClick={() => pick(t)}
                aria-pressed={theme === t}
                className={cn(
                  't-body-sm rounded-(--radius-pill) px-4 py-1.5 capitalize transition-colors',
                  theme === t ? 'bg-(--surface-2) text-(--ink)' : 'text-(--ink-muted) hover:text-(--ink)',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

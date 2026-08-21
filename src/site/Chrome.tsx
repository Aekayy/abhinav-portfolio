import { useEffect, useState } from 'react'
import { PROFILE, SOCIALS } from '@/data/profile'
import { applyTheme, readTheme, storeTheme, type Theme } from './theme'
import { go } from './router'

export const NAV: [string, string][] = [
  ['/', 'Home'],
  ['/#work', 'Work'],
  ['/about', 'About'],
  ['/blog', 'Blog'],
  ['/resume', 'Resume'],
  ['/contact', 'Contact'],
]

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
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center pt-4 sm:pt-6">
      <div className="relative w-full max-w-[448px]">
        <nav
          aria-label="Primary"
          className={`relative z-50 flex items-center justify-center rounded-[16px] h-[54px] w-full px-6 transition-all duration-300 ${
            open ? 'rounded-b-none border-none' : ''
          } border border-(--line) bg-[#262626]/75`}
        >
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); go('/') }}
            className="t-body-sm font-medium text-white tracking-wide transition-opacity hover:opacity-70"
          >
            {PROFILE.name}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="absolute right-6 grid h-5 w-5 place-items-center text-white"
          >
            <svg width="20" height="16" viewBox="0 0 24 24" aria-hidden="true">
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
          className={`absolute left-0 top-full z-40 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 bg-[#262626]/75 rounded-b-[16px] ${
            open ? 'h-[340px] opacity-100' : 'h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-6 pt-6 pb-2">
            <div style={{ opacity: 1, transform: 'none' }}>
              <div className="grid grid-cols-2 gap-2" style={{ opacity: 1, transform: 'none' }}>
              {NAV.map(([path, label]) => (
                <a
                  key={path}
                  href={`#${path}`}
                  onClick={(e) => { e.preventDefault(); setOpen(false); go(path) }}
                  className="flex h-12 items-center justify-center rounded-2xl bg-white/10 text-center text-[17px] font-medium transition-colors hover:bg-white/20"
                  style={{ color: '#FAF4F4' }}
                >
                  {label}
                </a>
              ))}
            </div>
            </div>
            <div className="mt-6 flex justify-center gap-6">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener"
                   className="text-[17px] transition-colors hover:opacity-70" style={{ color: '#FAF4F4' }}>
                  {s.label} ↗
                </a>
              ))}
            </div>
            <a href={`mailto:${PROFILE.email}`}
               className="text-[17px] mt-2 transition-colors hover:opacity-70 block text-center" style={{ color: '#FAF4F4' }}>
              {PROFILE.email}
            </a>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => pick(theme === 'dark' ? 'light' : 'dark')}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
    </header>
  )
}

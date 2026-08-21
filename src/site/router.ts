import { useEffect, useState } from 'react'

/**
 * Hash routing, on purpose.
 *
 * The site is a static build going onto Vercel, and hash routes need no
 * rewrite rules to survive a refresh or a shared deep link. For a portfolio
 * that trade — a # in the URL against a link that never 404s — is the right
 * way round.
 */
function getBasePage(path: string): string {
  const clean = path.replace(/^#/, '').split('#')[0] || '/'
  if (clean.startsWith('/projects/')) return '/'
  if (clean.startsWith('/blog/')) return '/blog'
  return clean
}

export function useRoute(): string {
  const [route, setRoute] = useState(() =>
    typeof location === 'undefined' ? '/' : location.hash.replace(/^#/, '') || '/')

  useEffect(() => {
    let prevRoute = typeof location === 'undefined' ? '/' : location.hash.replace(/^#/, '') || '/'
    const on = () => {
      const newRoute = location.hash.replace(/^#/, '') || '/'
      const prevBase = getBasePage(prevRoute)
      const newBase = getBasePage(newRoute)
      setRoute(newRoute)
      prevRoute = newRoute

      // Only scroll to top when switching between fundamentally different base pages
      // (e.g., / -> /about), but keep scroll position when opening or closing overlays.
      if (prevBase !== newBase && !location.hash.includes('#')) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  return route
}

/**
 * Navigate, and honour an anchor on the target.
 *
 * "/#work" means the home page scrolled to the work gallery. Splitting it here
 * keeps every caller writing one string rather than juggling a route and a
 * scroll target separately.
 */
export const go = (path: string) => {
  const [route, anchor] = path.split('#')
  const target = route || '/'

  if (location.hash.replace(/^#/, '') === target && anchor) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  location.hash = target
  if (!anchor) return
  // Wait for the route to render before looking for the anchor.
  window.setTimeout(() => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }, 60)
}

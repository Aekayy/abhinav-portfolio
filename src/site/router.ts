import { useEffect, useState } from 'react'

/**
 * Hash routing, on purpose.
 *
 * The site is a static build going onto Vercel, and hash routes need no
 * rewrite rules to survive a refresh or a shared deep link. For a portfolio
 * that trade — a # in the URL against a link that never 404s — is the right
 * way round.
 */
export function useRoute(): string {
  const [route, setRoute] = useState(() =>
    typeof location === 'undefined' ? '/' : location.hash.replace(/^#/, '') || '/')

  useEffect(() => {
    const on = () => {
      setRoute(location.hash.replace(/^#/, '') || '/')
      window.scrollTo({ top: 0, behavior: 'auto' })
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

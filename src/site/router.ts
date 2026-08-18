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

export const go = (path: string) => { location.hash = path }

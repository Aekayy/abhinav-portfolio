import { useEffect, useState } from 'react'

/**
 * History routing.
 *
 * This used to be hash routing, and the reasoning written here was that a
 * static build on Vercel needs no rewrite rules to survive a refresh or a
 * shared deep link: a hash never reaches the server, so /#/projects/harmoney
 * is only ever a request for /, which always exists.
 *
 * That trade was real but it was priced wrong. The cost is not cosmetic. Every
 * URL on the site carries a # that has to be explained, a recruiter pasting
 * abhikrish.us/#/projects/harmoney into a document gets something that reads
 * like a broken link, and search engines treat the fragment as noise, so every
 * page on the site is the same page as far as they are concerned. One rewrite
 * rule in vercel.json buys all of that back, and it is three lines.
 *
 * So: real paths, pushState, and a catch all rewrite serving index.html. The
 * one thing the rewrite cannot do is fix links that already exist, because a
 * fragment is never sent to the server and nothing on Vercel can see it. That
 * is what migrateLegacyHash below is for, and it has to run on the client.
 */

/**
 * Opened straight off the disk, with no server in front of it.
 *
 * portfolio-preview.html is a single committed file meant to be double-clicked,
 * and there real paths cannot work: location.pathname is
 * /Users/.../portfolio-preview.html, which matches no route, so the app renders
 * its chrome and nothing else. There is no server to rewrite anything either.
 *
 * So the file build keeps hash routing, which needs neither. This is the one
 * place the old scheme was actually the right answer, and it costs the hosted
 * site nothing because the branch is decided by the protocol.
 */
const OFFLINE = typeof location !== 'undefined' && location.protocol === 'file:'

/** Trailing slashes off, empty means root. */
function normalise(path: string): string {
  if (!path) return '/'
  const clean = path.replace(/\/+$/, '')
  return clean || '/'
}

/** The current route, without any anchor. */
function read(): string {
  if (typeof location === 'undefined') return '/'
  if (OFFLINE) return normalise(location.hash.replace(/^#/, '').split('#')[0] || '/')
  return normalise(location.pathname)
}

/** Whether the URL carries a scroll target, on either scheme. */
function hasAnchor(): boolean {
  if (typeof location === 'undefined') return false
  return OFFLINE ? location.hash.slice(1).includes('#') : !!location.hash
}

/**
 * Rewrite a legacy /#/route URL to /route, once, before anything renders.
 *
 * Every link shared while the site used hash routing looks like
 * abhikrish.us/#/projects/harmoney. Those still arrive, and the server cannot
 * help: fragments are a client side concept and never leave the browser. So
 * the first thing the app does is swap the URL for the real path using
 * replaceState, which leaves no extra history entry and so does not trap the
 * back button on the page it just cleaned up.
 *
 * Exported rather than hidden so the behaviour is testable and so the reason
 * it exists is discoverable from outside this file.
 */
export function migrateLegacyHash(): string | null {
  if (typeof location === 'undefined' || typeof history === 'undefined') return null
  // Off a file:// page the hash is not a legacy URL, it is the route.
  if (OFFLINE) return null
  const hash = typeof location.hash === 'string' ? location.hash : ''
  if (!hash.startsWith('#/')) return null

  const [route, anchor] = hash.slice(1).split('#')
  const target = normalise(route) + (anchor ? `#${anchor}` : '')
  history.replaceState(null, '', target)
  return target
}

// Run before React reads the route, so the first render already sees the real
// path rather than rendering the home page and then jumping.
migrateLegacyHash()

/**
 * Which page a route belongs to.
 *
 * A study and a post render over the page behind them rather than replacing
 * it, so /projects/harmoney is still the home page as far as scrolling is
 * concerned. Without this, opening a case study would throw the reader to the
 * top of the gallery they were halfway down.
 */
function getBasePage(path: string): string {
  const clean = normalise(path.split('#')[0])
  if (clean.startsWith('/projects/')) return '/'
  if (clean.startsWith('/blog/')) return '/blog'
  return clean
}

/**
 * pushState does not fire popstate, which is the one thing everybody gets
 * caught by when they move off hash routing. hashchange fired for programmatic
 * changes; popstate only fires for the back and forward buttons. So navigation
 * from inside the app announces itself.
 */
const ROUTE_EVENT = 'app:route'

export function useRoute(): string {
  const [route, setRoute] = useState(read)

  useEffect(() => {
    let prev = read()
    const on = () => {
      const next = read()
      const prevBase = getBasePage(prev)
      const nextBase = getBasePage(next)
      setRoute(next)
      prev = next

      // Only jump to the top when the base page actually changes, and never
      // when the URL carries an anchor, because the anchor is a scroll target
      // and scrolling to the top would immediately undo it.
      if (prevBase !== nextBase && !hasAnchor()) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }
    window.addEventListener('popstate', on)
    window.addEventListener(ROUTE_EVENT, on)
    // Off a file:// page the back button changes the hash, not the path.
    window.addEventListener('hashchange', on)
    return () => {
      window.removeEventListener('popstate', on)
      window.removeEventListener(ROUTE_EVENT, on)
      window.removeEventListener('hashchange', on)
    }
  }, [])

  return route
}

/**
 * Navigate, and honour an anchor on the target.
 *
 * "/#work" means the home page scrolled to the work gallery. Splitting it here
 * keeps every caller writing one string rather than juggling a route and a
 * scroll target separately, and every caller kept working unchanged when this
 * moved off hashes.
 */
export const go = (path: string) => {
  const [route, anchor] = path.split('#')
  const target = normalise(route || '/')

  if (read() === target && anchor) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  history.pushState(null, '', OFFLINE ? `#${target}` : target + (anchor ? `#${anchor}` : ''))
  window.dispatchEvent(new Event(ROUTE_EVENT))
  if (!anchor) return
  // Wait for the route to render before looking for the anchor.
  window.setTimeout(() => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }, 60)
}

/**
 * Reveals each section's content as it scrolls into view.
 *
 * The gate, before any of this was written: a marketing page is read once, so
 * this is the rare tier where motion is affordable, and the purpose is
 * explanation — the page is an argument, and letting each block arrive as you
 * reach it gives the argument a rhythm. That is the one purpose on the list
 * that permits motion on something purely presentational. The product itself
 * gets none of this; controls a listener touches repeatedly must be instant.
 *
 * Three decisions worth stating, because each is a failure mode avoided:
 *
 * 1. Nothing is hidden until JavaScript says so. The hidden state lives under
 *    a data-reveal attribute this module sets on the root element. If the
 *    script never runs, never loads, or throws, the page is simply visible
 *    rather than a column of blank space.
 *
 * 2. Anything already on screen at load is shown immediately, with no
 *    transition. Animating what the visitor is already looking at is a stutter
 *    on arrival, not a reveal.
 *
 * 3. It fires once. Re-hiding on the way back up means the page flickers every
 *    time someone scrolls to check something they read a moment ago.
 */

const HIDDEN = 'reveal'
const SHOWN = 'is-visible'

/** Sections whose content should arrive. The hero is deliberately absent. */
const SECTION = 'main section, [role="dialog"] section'

export function startReveal(): () => void {
  if (typeof document === 'undefined') return () => {}

  // Someone who has asked for less motion gets the page, not the choreography.
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) return () => {}

  const targets: HTMLElement[] = []
  for (const section of document.querySelectorAll<HTMLElement>(SECTION)) {
    // The hero is the first thing on screen; it has nothing to arrive from.
    if (section.dataset.noReveal !== undefined) continue
    // Inside the dialog the section itself is the unit; on the page it is the
    // section's children, because a whole page section arriving at once is too
    // large a movement to read as anything but a jump.
    if (section.matches('[role="dialog"] section')) { targets.push(section); continue }
    const shell = section.querySelector<HTMLElement>(':scope > .shell') ?? section
    for (const child of Array.from(shell.children) as HTMLElement[]) {
      if (child.dataset.noReveal !== undefined) continue
      targets.push(child)
    }
  }
  if (targets.length === 0) return () => {}

  document.documentElement.setAttribute('data-reveal', 'on')
  for (const el of targets) el.classList.add(el.matches('[role="dialog"] section') ? 'reveal-in' : HIDDEN)

  const viewportH = window.innerHeight
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        observer.unobserve(el)
        el.classList.add(SHOWN)
      }
    },
    // A little way in, so a block starts moving once it is genuinely being
    // looked at rather than the instant its top edge clears the fold.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  )

  for (const el of targets) {
    // Already visible on load: show it now, and suppress the transition so it
    // does not animate under the reader's eyes on the first paint.
    if (el.getBoundingClientRect().top < viewportH) {
      el.classList.add('reveal-instant', SHOWN)
      continue
    }
    // Siblings arrive in sequence rather than as a block. 60ms is inside the
    // 30–80ms band where a stagger reads as order rather than as a queue.
    const index = Array.from(el.parentElement?.children ?? []).indexOf(el)
    el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 60}ms`)
    observer.observe(el)
  }

  return () => observer.disconnect()
}

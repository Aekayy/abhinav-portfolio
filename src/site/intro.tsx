import { useEffect, useState } from 'react'
import { PROFILE } from '@/data/profile'

/**
 * The opening: the moment the lights come up in the gallery.
 *
 * The gate, before any of this was written. Frequency is once per session, so
 * this sits in the rare tier where a delight budget exists — every other piece
 * of motion on the site is held under 300ms and has to earn its place. The
 * purpose is arrival: the reference is a room, and a room is entered.
 *
 * Four decisions, each a failure mode avoided:
 *
 * 1. It renders nothing on the server and nothing on the first client pass.
 *    A visitor whose JavaScript is slow, blocked, or broken gets the page, not
 *    a permanent blank panel. The intro can only ever be additive.
 *
 * 2. Once per session, not once per page view. Navigating home from About is
 *    not an arrival, and an intro that replays on every visit stops being a
 *    welcome and becomes a toll gate.
 *
 * 3. Reduced motion skips it completely. Elsewhere on this site reduced motion
 *    means gentler; here it means absent, because the whole element is
 *    choreography. There is nothing underneath to make gentler.
 *
 * 4. Any input dismisses it, and a hard timer removes it regardless. Nobody is
 *    ever held behind an animation, including if something above throws.
 */

const KEY = 'ak-intro'
const HOLD = 900   /* mark in, rule across, a beat to read it */
const FADE = 260   /* the fade out; the hero underneath is already arriving */

function seenThisSession(): boolean {
  try { return sessionStorage.getItem(KEY) === '1' } catch { return true }
}
function markSeen(): void {
  try { sessionStorage.setItem(KEY, '1') } catch { /* storage can be blocked */ }
}

/** Tells the hero it may animate. Set only when the intro actually played. */
function finish(): void {
  document.documentElement.setAttribute('data-intro', 'done')
}

export function Intro({ route }: { route: string }) {
  // Never true during SSR or the first client render, so hydration matches and
  // the page is readable even if this component never gets further than here.
  const [playing, setPlaying] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // Only the front door. Someone who followed a link straight to a case
    // study has already arrived somewhere specific, and the study panel sits
    // above this one anyway — a name card underneath it would read as a bug.
    const atFrontDoor = route === '/' || route === ''
    if (reduce || !atFrontDoor || seenThisSession()) return
    markSeen()
    setPlaying(true)
  }, [route])

  useEffect(() => {
    if (!playing) return

    let done = false
    const end = () => {
      if (done) return
      done = true
      finish()
      setPlaying(false)
    }
    const leave = () => {
      if (done) return
      setLeaving(true)
      window.setTimeout(end, FADE)
    }

    const hold = window.setTimeout(leave, HOLD)
    // Nobody waits behind an animation they did not ask for.
    const skip = () => leave()
    window.addEventListener('pointerdown', skip, { once: true })
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('wheel', skip, { once: true, passive: true })
    // Last resort: if a timer is throttled in a background tab or anything
    // above misfires, the panel still leaves.
    const bail = window.setTimeout(end, HOLD + FADE + 1200)

    return () => {
      clearTimeout(hold)
      clearTimeout(bail)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
    }
  }, [playing])

  if (!playing) return null

  return (
    <div
      className={`intro ${leaving ? 'intro-out' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <span className="intro-mark t-display text-(--ink)">{PROFILE.name}</span>
      <span className="intro-rule" />
    </div>
  )
}

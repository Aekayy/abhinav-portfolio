import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '@/data/profile'

/**
 * The opening: the moment the lights come up in the gallery.
 *
 * The gate, before any of this was written. It plays on arrival and nowhere
 * else, which is the rare tier where a delight budget exists — every other
 * piece of motion on this site is held under 300ms and has to earn its place.
 * The purpose is arrival: the reference is a room, and a room is entered.
 *
 * Four decisions, each a failure mode avoided:
 *
 * 1. It renders nothing on the server and nothing on the first client pass.
 *    A visitor whose JavaScript is slow, blocked, or broken gets the page, not
 *    a permanent blank panel. The intro can only ever be additive.
 *
 * 2. Every load of the front door, including a refresh, but never a navigation
 *    inside the site. Arriving is the thing being marked, and a refresh is an
 *    arrival; moving from About back to Home is not, and replaying it there
 *    would turn a welcome into a toll gate on every click.
 *
 * 3. Reduced motion skips it completely. Elsewhere on this site reduced motion
 *    means gentler; here it means absent, because the whole element is
 *    choreography. There is nothing underneath to make gentler.
 *
 * 4. Any input dismisses it, and a hard timer removes it regardless. Nobody is
 *    ever held behind an animation, including if something above throws.
 */

/**
 * Long enough for four beats to land in order: the portrait, the name, the
 * role, and the rule filling underneath them.
 *
 * It was 900ms, which was the right length for a name and a static line and
 * too short for anything that reads as composed — the last two beats were
 * still moving when the panel began to leave. It is skippable on any input,
 * which is what makes the extra half second affordable now that it plays on
 * every load rather than once a session.
 */
const HOLD = 1500
const FADE = 260   /* the fade out; the hero underneath is already arriving */

/** Tells the hero it may animate. Set only when the intro actually played. */
function finish(): void {
  document.documentElement.setAttribute('data-intro', 'done')
}

export function Intro({ route }: { route: string }) {
  // Never true during SSR or the first client render, so hydration matches and
  // the page is readable even if this component never gets further than here.
  const [playing, setPlaying] = useState(false)
  const [leaving, setLeaving] = useState(false)

  /*
   * Empty deps, so this fires on mount and never again.
   *
   * It used to depend on `route`, which was how it stayed out of the way when
   * you navigated home from About — but it also meant the gate had to be a
   * sessionStorage flag, and that flag is what stopped a refresh from replaying
   * it. Reading the route once at mount does the same job with no storage: a
   * refresh mounts, a navigation does not.
   */
  const first = useRef(route)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // Only the front door. Someone who followed a link straight to a case
    // study has already arrived somewhere specific, and the study panel sits
    // above this one anyway — a name card underneath it would read as a bug.
    const atFrontDoor = first.current === '/' || first.current === ''
    if (reduce || !atFrontDoor) return
    setPlaying(true)
  }, [])

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
      {/*
        Read as a gallery placard rather than a splash screen.

        The reference for this whole site is a room with work on the walls, so
        the opening is the card beside the door: who, what, where, and a rule
        that fills while the room lights up. The corners carry the small print
        and the middle carries the name, which is the same hierarchy the hero
        underneath uses — the portrait even lands near where the hero's inline
        portrait will be, so the panel resolves into the page instead of being
        replaced by it.
      */}
      <span className="intro-corner intro-tl">Portfolio</span>
      <span className="intro-corner intro-br">{PROFILE.location}</span>

      <div className="intro-stack">
        <img
          src="img/about/avatar.jpg"
          alt=""
          width={56}
          height={56}
          decoding="async"
          className="intro-face"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />

        {/* The name rises out of a mask rather than fading in place. The mask
            is the parent's overflow, so there is nothing to clean up if the
            animation is cut short. */}
        <span className="intro-mask">
          <span className="intro-name t-display text-(--ink)">{PROFILE.name}</span>
        </span>

        <span className="intro-role t-caption text-(--ink-muted)">{PROFILE.role}</span>

        {/* Under the name rather than pinned to the bottom edge, where it sat
            on the same line as the corner label and read as part of it. Fills
            over exactly the time the panel is held, so it is telling the truth
            about the wait rather than decorating it. */}
        <span className="intro-rule">
          <span className="intro-rule-fill" style={{ animationDuration: `${HOLD}ms` }} />
        </span>
      </div>
    </div>
  )
}

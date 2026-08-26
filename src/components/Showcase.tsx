import { useEffect, useRef, useState } from 'react'
import { SHOWCASES, framePaths, type Showcase as Show, type Tap } from '@/data/screens'
import { DeviceFrame, PHONE_SCREEN, webScreenFor } from '@/components/DeviceFrame'

/**
 * The product, being used.
 *
 * Not a slideshow of screenshots. A pointer travels to a real control, presses
 * it, and the screen it opens appears — which is the difference between "here
 * are five screens" and "here is how this works". The tap coordinates live in
 * `screens.ts`, read off the exports rather than invented.
 *
 * Three compositions, picked from the data rather than passed in:
 *
 * - `duo`, when the project shipped on two devices. A laptop with the phone
 *   standing in front of it, both live. ForeCash is the only one, because it is
 *   the only one drawn at both sizes; faking it elsewhere would make every
 *   thumbnail claim a desktop app that does not exist.
 * - `trio`, the study hero for a phone product: the working screen with a still
 *   either side, so the hero reads as a product rather than one screenshot.
 * - `solo`, a gallery card, where there is no room for more.
 *
 * Decisions worth stating, because each is a failure mode avoided:
 *
 * 1. The press causes the change, rather than accompanying it. The pointer
 *    arrives, waits long enough to read as intent, presses, and only then does
 *    the frame advance. Swap the screen on arrival instead and the whole thing
 *    reads as two unrelated animations sharing a timeline.
 *
 * 2. Nothing is on a fixed beat. Travel time scales with how far the pointer
 *    has to go, every dwell is jittered, and each player starts on a random
 *    screen. Uniform timing is what makes an animation read as a machine: five
 *    cards clicking in unison is a departures board, not five products. It is
 *    also why the two devices in a duo drift apart rather than march together.
 *
 * 3. Cross-fade with a CSS transition, not keyframes. The sequence can be
 *    interrupted at any point — the stage scrolls away, the tab backgrounds —
 *    and a transition retargets from wherever it is. Keyframes restart at zero
 *    and jump. The one exception is the tap ripple, which is fire-and-forget:
 *    it is remounted per press, so there is no interrupted state to retarget.
 *
 * 4. It stops when it is not being watched. One IntersectionObserver on the
 *    stage pauses every player inside it, so five cards in a gallery are never
 *    all animating at once, and a study open on a long page is not burning a
 *    phone battery on something off screen.
 *
 * 5. Reduced motion gets one frame, no timer, and no cursor. Everywhere else on
 *    this site reduced motion means gentler; here it means still, because the
 *    animation IS the content and a slower version of it is no kinder.
 *
 * 6. The pointer is positioned in container units, so one transform expresses a
 *    percentage of the screen. Animating `left`/`top` would work at this scale
 *    but puts position changes on the layout path; `translate3d` stays on the
 *    compositor, and cqw/cqh is what lets it be written as a percentage of the
 *    parent rather than of the cursor itself.
 *
 * 7. Only the first frame loads eagerly. The rest are lazy, so a card paints on
 *    one 30KB image rather than six.
 */

/** One press, in three parts. Travel is computed, not fixed — see `travelMs`. */
const DWELL = 1150 /* the pointer rests on the control, long enough to read */
const PRESS = 240 /* down and up */

/**
 * How long the pointer takes to cross to its next target.
 *
 * Longer for a longer reach, which is the single change that stops the motion
 * reading as a machine: a hand does not cross the whole screen and nudge one
 * tab in the same beat. Clamped at both ends so a tiny hop is still visible and
 * a corner-to-corner sweep does not stall the sequence.
 */
function travelMs(from: Tap, to: Tap): number {
  const d = Math.hypot(to[0] - from[0], to[1] - from[1])
  return Math.min(880, Math.max(380, 300 + d * 7))
}

/**
 * How tall each device stands, as a percentage of the stage.
 *
 * Height, never width, with one exception. Every stage is wider than it is
 * tall, so height is the binding constraint and letting the width follow
 * guarantees the device fits — sizing the laptop by width made it taller than
 * the stage it sat in and clipped the top and bottom off. The exception is the
 * laptop in a duo, which has to share the width with a phone; that one is sized
 * by width and capped by height, so whichever runs out first wins.
 */
const TALL = { center: 92, side: 74, web: 92 } as const
const DUO = { laptop: '66%', laptopMax: '78%', phone: '54%' } as const

/** A device, playing its own walkthrough on its own clock. */
function Walkthrough({
  device,
  screen,
  srcs,
  taps,
  play,
  style,
  className = '',
}: {
  device: 'phone' | 'web'
  screen: string
  srcs: string[]
  taps: Tap[]
  play: boolean
  style?: React.CSSProperties
  className?: string
}) {
  const [i, setI] = useState(0)
  const [pressing, setPressing] = useState(false)

  /*
   * Per-player randomness, generated after mount rather than during render.
   *
   * It has to miss the server: `Math.random()` during render gives the server
   * and the client different numbers, and React calls that a hydration
   * mismatch. Filling this in an effect means the first paint is identical
   * everywhere and the jitter starts a tick later, which no one can see.
   */
  const noise = useRef<number[]>([])
  const rand = (n: number) => noise.current[n % 32] ?? 0.5

  useEffect(() => {
    noise.current = Array.from({ length: 32 }, () => Math.random())
    // Start somewhere different in every player. Without this, five gallery
    // cards mounted in the same frame march through their sequences in step.
    setI(Math.floor(Math.random() * srcs.length))
  }, [srcs.length])

  const n = srcs.length
  const prev = (i - 1 + n) % n
  const from = taps[prev] ?? [50, 50]
  const to = taps[i] ?? [50, 50]
  const travel = travelMs(from, to)
  /*
   * A shorter beat when the screen is not changing.
   *
   * A sequence can hold on one screen and press several controls on it — the
   * Spotify equalizer does exactly that, five bands in a row. Adjusting a
   * slider is not the same act as opening a page, and giving both the same
   * pause makes the fiddling look like navigation. Same jitter either way, so
   * neither settles into a countable rhythm.
   */
  const settling = srcs[prev] === srcs[i]
  const dwell = (settling ? 420 : DWELL) * (0.7 + rand(i) * 0.6)

  // One step per frame: the pointer has already started travelling (the
  // transition below runs the moment `i` changes), so this only has to press at
  // the end of the dwell and advance once the press lands.
  useEffect(() => {
    if (!play) return
    const down = window.setTimeout(() => setPressing(true), travel + dwell)
    const advance = window.setTimeout(() => {
      setPressing(false)
      setI((k) => (k + 1) % n)
    }, travel + dwell + PRESS)
    return () => {
      clearTimeout(down)
      clearTimeout(advance)
    }
  }, [play, i, n, travel, dwell])

  const [tx, ty] = to

  return (
    <DeviceFrame device={device} screen={screen} style={style} className={className}>
      {/* containerType lets the pointer be positioned as a percentage of the
          screen rather than of itself, which is the only way one cursor works
          at both card and hero size. */}
      <div className="relative h-full w-full" style={{ containerType: 'size' }}>
        {/* One <img> per distinct screen, not per step. A sequence may name the
            same screen several times over — see the Spotify equalizer — and
            keying by step would mount that file repeatedly and cross-fade it
            with itself. Keying by file also means React never sees a duplicate
            key. */}
        {[...new Set(srcs)].map((src, k) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading={k === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-[var(--ease-out)]"
            style={{ opacity: src === srcs[i] ? 1 : 0 }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ))}

        {/* The pointer. Present only while the sequence is running, so a still
            frame is a still screenshot with nothing hovering on it. */}
        {play && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 block"
            style={{
              transform: `translate3d(calc(${tx} * 1cqw), calc(${ty} * 1cqh), 0)`,
              // Travel, not arrival, so this is the one place --ease-in-out is
              // right. --ease-out is 96% done a third of the way through:
              // correct for a panel settling into place, wrong for a hand
              // crossing a screen, which starts slow and stops slow.
              transition: `transform ${travel}ms var(--ease-in-out)`,
            }}
          >
            {/* Remounted per press, so the pulse always plays from its start
                rather than retargeting mid-fade. */}
            {pressing && <span key={i} className="tap-ripple" />}
            <span
              className="tap-cursor"
              style={{
                transform: `translate(-50%, -50%) scale(${pressing ? 0.86 : 1})`,
                transition: `transform ${PRESS / 2}ms var(--ease-out)`,
              }}
            />
          </span>
        )}
      </div>
    </DeviceFrame>
  )
}

/**
 * One of the two phones flanking the working screen.
 *
 * A framed div rather than a bare `<img>`, and that is the whole point. These
 * were images with a percentage height, and when that failed to resolve they
 * fell back on the file's intrinsic 1174px, pushed the stage open from the
 * inside and cut the middle phone off at the bottom. A div has no size of its
 * own to fall back to.
 */
function PhoneStill({ src, className = '' }: { src: string; className?: string }) {
  return (
    <DeviceFrame device="phone" className={className} style={{ height: `${TALL.side}%` }}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
    </DeviceFrame>
  )
}

export function Showcase({
  slug,
  accent,
  layout = 'solo',
  className = '',
}: {
  slug: string
  accent?: string
  /** `trio` flanks the working screen with two stills. Phones only. */
  layout?: 'solo' | 'trio'
  className?: string
}) {
  const show: Show | undefined = SHOWCASES[slug]
  const stage = useRef<HTMLDivElement | null>(null)
  const [onScreen, setOnScreen] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    setAllowed(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!show || !allowed) return
    const el = stage.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [show, allowed])

  if (!show) return null
  const play = allowed && onScreen

  /**
   * A wash of the project's own color.
   *
   * Strongest at the top where the device sits and falling away to near the
   * page tone, so the stage reads as a lit room rather than a colored box. The
   * reference gives all color to the work; this is the work's color, borrowed,
   * not a decoration the frame invented.
   */
  const room = accent
    ? `radial-gradient(120% 105% at 50% 0%,
         color-mix(in srgb, ${accent} 26%, var(--surface)) 0%,
         color-mix(in srgb, ${accent} 9%, var(--page)) 72%)`
    : 'var(--surface)'

  const srcs = framePaths(slug, show)
  const stills = show.stills?.map((f) => `img/work/${slug}/screens/${f}.webp`)
  const screenOf = (device: 'phone' | 'web', src: string) =>
    device === 'phone' ? PHONE_SCREEN : webScreenFor(src)

  const also = show.also
  const alsoSrcs = also?.frames.map((f) => `img/work/${slug}/screens/${f}.webp`) ?? []
  const trio = layout === 'trio' && show.device === 'phone' && !also && Boolean(stills)

  const solo =
    // A laptop on a gallery card is the one place width binds rather than
    // height: the card is 4:5 portrait and the laptop is landscape.
    show.device === 'web' && layout !== 'trio'
      ? { width: '92%' }
      : show.device === 'web'
        ? { height: `${TALL.web}%`, maxWidth: '86%' }
        : { height: `${TALL.center}%` }

  return (
    <div
      ref={stage}
      className={`relative grid w-full place-items-center overflow-hidden ${className}`}
      style={{ background: room }}
    >
      {/*
        Absolutely positioned, and that is load bearing.

        This was `flex h-full w-full`, and `h-full` is a percentage: it resolves
        against the grid row, the grid row is sized by its own contents, and its
        contents are these devices. That is a cycle, and the browser breaks it
        by measuring the content first — where a phone screenshot is
        intrinsically 1174px tall. So the row grew to 1211px inside a 788px
        stage, every `height` below resolved against the wrong number, the
        devices came out 1.63x too big, and 384px of them was clipped.

        Out of flow, the row is the stage's size by definition, and nothing
        inside it can push back.
      */}
      <div className="absolute inset-0 flex items-center justify-center gap-[2%]">
        {also ? (
          <>
            <Walkthrough
              device={also.device}
              screen={screenOf(also.device, alsoSrcs[0])}
              srcs={alsoSrcs}
              taps={also.taps}
              play={play}
              style={{ width: DUO.laptop, maxHeight: DUO.laptopMax }}
            />
            {/* Standing in front of the laptop, overlapping it and sitting
                lower, the way a phone photographed on a desk would. */}
            <Walkthrough
              device={show.device}
              screen={screenOf(show.device, srcs[0])}
              srcs={srcs}
              taps={show.taps}
              play={play}
              className="z-10 self-end"
              style={{ height: DUO.phone, marginLeft: '-6%', marginBottom: '7%' }}
            />
          </>
        ) : (
          <>
            {/* The flanks. Smaller than the working screen, which is enough on
                its own to say where to look — they used to be faded too, and
                dimming a real screen to make a point about hierarchy just makes
                it look like it failed to load. */}
            {trio && stills && <PhoneStill src={stills[0]} className="hidden sm:block" />}
            <Walkthrough
              device={show.device}
              screen={screenOf(show.device, srcs[0])}
              srcs={srcs}
              taps={show.taps}
              play={play}
              style={solo}
            />
            {trio && stills && <PhoneStill src={stills[1]} className="hidden sm:block" />}
          </>
        )}
      </div>

      {/* The sequence is decorative; this is what a screen reader gets. */}
      <p className="sr-only">{show.alt}</p>
    </div>
  )
}

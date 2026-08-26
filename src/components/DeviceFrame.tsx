import type { ReactNode } from 'react'

/**
 * The hardware the screens were drawn for.
 *
 * A screenshot floating in a rounded rectangle is ambiguous — it could be a
 * phone, a tablet, a slice of a website. Putting it in the device says what it
 * is before anyone reads a word, and it is also the honest thing: these were
 * designed at iPhone 17 Pro and at 1440, so that is what they should be shown
 * at.
 *
 * Three rules hold this together, and all three were bugs before:
 *
 * 1. Anything INSIDE the frame is measured in container units, so one component
 *    serves a 150px gallery card and a 600px study hero with no breakpoints. A
 *    percentage cannot do that job: it resolves against the CONTAINING BLOCK, so
 *    a bezel written as `p-[2.4%]` measured 2.4% of the row the phone sat in,
 *    which came to 9.8% of the phone.
 *
 * 2. Anything on the frame ITSELF must be a percentage, for the mirror-image
 *    reason. `container-type` makes an element a container for its descendants,
 *    never for itself, so `cqw` written on the shell silently fell through to
 *    the viewport: 16.52cqw became a 317px corner radius on a 300px phone, and
 *    every frame rendered as a black blob.
 *
 * 3. The frame is a div, never a bare img. An `<img>` carries an intrinsic size,
 *    so when a percentage height fails to resolve it silently falls back to the
 *    file's real 1174px and drags the whole stage open with it. A div has no
 *    intrinsic size and simply cannot do that.
 */

// The geometry lives in a plain module so it can be tested without React.
// Re-exported here because every caller already imports it from the component.
import {
  PHONE_SCREEN, WEB_SCREEN, WEB_SCREEN_DEFAULT, webScreenFor, shellRatio,
  PHONE_BEZEL, PHONE_RADIUS, WEB_PAD, WEB_BASE,
} from '@/site/devices'

export { PHONE_SCREEN, WEB_SCREEN, WEB_SCREEN_DEFAULT, webScreenFor, shellRatio }

export function PhoneFrame({
  className = '',
  style,
  screen = PHONE_SCREEN,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  /** The screen's own aspect ratio, which the shell is sized around. */
  screen?: string
  children: ReactNode
}) {
  const pct = (n: number) => `${(n * 100).toFixed(2)}cqw`
  return (
    <div
      className={`relative shrink-0 bg-[#1c1c1e] shadow-lg ${className}`}
      style={{
        aspectRatio: String(shellRatio('phone', screen)),
        // Makes cqw inside this frame mean "percent of this frame". Without it
        // the bezel measured the row instead: 9.8% rather than 2.3%.
        containerType: 'inline-size',
        // Percentage, not cqw: this element is the container, and a container
        // does not resolve its own container units. See PHONE_RADIUS.
        borderRadius: `${(PHONE_RADIUS.shell * 100).toFixed(2)}% / ${(PHONE_RADIUS.shell * shellRatio('phone', screen) * 100).toFixed(2)}%`,
        /*
         * Flat, deliberately.
         *
         * There was a rim-light gradient here, angled at 100deg to look like a
         * polished metal band catching a room. On a box this tall the angle put
         * a pale wedge in the top-left and bottom-right corners, and at hero
         * size that read as a second frame sitting slightly out of register
         * behind the first. A frame's job is to disappear; this one was
         * competing with the screenshots it was supposed to present.
         */
        ...style,
      }}
    >
      <div
        className="absolute overflow-hidden bg-black"
        style={{ inset: pct(PHONE_BEZEL), borderRadius: pct(PHONE_RADIUS.screen) }}
      >
        {children}
        {/* The Dynamic Island, sized off the real one: 125pt wide and 37pt tall
            on a 402x874 screen. It lands in the gap the exports already leave
            between the clock and the status icons, which is why it reads as the
            device rather than as something drawn on top of the screenshot. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.3%] h-[4.2%] w-[31%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  )
}

export function WebFrame({
  className = '',
  style,
  screen = WEB_SCREEN_DEFAULT,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  /** The screen's own aspect ratio. Every project drew to a different one. */
  screen?: string
  children: ReactNode
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        aspectRatio: String(shellRatio('web', screen)),
        // Same reason as the phone: the lid's border is measured against this
        // shell, never against whatever the shell is sitting inside.
        containerType: 'inline-size',
        ...style,
      }}
    >
      {/* The lid. Everything is absolute against the shell, so every length has
          a definite box to resolve against and nothing can be pushed out of
          shape by its own contents. */}
      <div
        className="absolute inset-x-0 top-0 bg-[#1c1c1e] shadow-lg"
        style={{ bottom: `${WEB_BASE * 100}%`, borderRadius: '1.1cqw' }}
      >
        <div
          className="absolute overflow-hidden bg-black"
          style={{ inset: `${(WEB_PAD * 100).toFixed(2)}cqw`, borderRadius: '0.4cqw' }}
        >
          {children}
        </div>
      </div>
      {/* The base, wider than the lid and thin, with a lip cut into it. Enough
          to read as a laptop from across a room, which is all it has to do. */}
      <div
        className="absolute inset-x-[-6%] bottom-0 h-[3.7%] rounded-b-[6px]"
        style={{ backgroundColor: '#2a2a2d' }}
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[26%] w-[14%] -translate-x-1/2 rounded-b-full bg-black/35"
        />
      </div>
    </div>
  )
}

/** The right frame for a device, so callers never branch on it themselves. */
export function DeviceFrame({
  device,
  className = '',
  style,
  screen,
  children,
}: {
  device: 'phone' | 'web'
  className?: string
  style?: React.CSSProperties
  /** Defaults to iPhone 17 Pro, or a 1440 laptop, per device. */
  screen?: string
  children: ReactNode
}) {
  const Frame = device === 'phone' ? PhoneFrame : WebFrame
  return (
    <Frame className={className} style={style} screen={screen}>
      {children}
    </Frame>
  )
}

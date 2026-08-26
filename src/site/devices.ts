/**
 * The geometry of the device frames, with no markup attached.
 *
 * Separate from `DeviceFrame.tsx` so it can be tested directly. The bug this
 * file exists to prevent was pure arithmetic — a shell whose screen came out
 * 5.2% off the ratio the screenshots were drawn at — and a test for that should
 * not have to render React to ask the question.
 */

/**
 * Screen aspect ratios, taken from the exports rather than from spec sheets.
 *
 * The phones are 540x1174, which is 402x874 at 1x — iPhone 17 Pro exactly. The
 * desktop screens are all 1440 wide and three different heights, because each
 * project was drawn to a different canvas. That mismatch is what cropped the
 * Merkle hero: the frame declared one size, the file was another, and
 * object-cover dutifully ate the difference.
 */
export const PHONE_SCREEN = '402 / 874'

export const WEB_SCREEN: Record<string, string> = {
  merkle: '1440 / 1024',
  forecash: '1440 / 936',
  'spotify-alter': '1440 / 900',
}

/** The default is a real 1440 laptop, for any project without its own size. */
export const WEB_SCREEN_DEFAULT = '1440 / 900'

/** Pull the project slug out of `img/work/<slug>/screens/...`. */
export function webScreenFor(src: string): string {
  const slug = /img\/work\/([^/]+)\//.exec(src)?.[1]
  return (slug && WEB_SCREEN[slug]) || WEB_SCREEN_DEFAULT
}

/**
 * The hardware around the screen, as fractions of the shell's width.
 *
 * The phone bezel is measured off the real thing: an iPhone 17 Pro is 71.9mm
 * wide with a border of about 1.15mm, so with a 402pt display the shell is
 * 415pt wide and the border is 1.6% of it. It read as far thicker than that
 * because these were applied as CSS percentage padding, which resolves against
 * the CONTAINING BLOCK's width, not the element's own — inside a 1400px row a
 * "2.4%" bezel measured 33.6px on a 342px phone, which is 9.8%. They are
 * container units now, so the number here is the number on screen.
 */
export const PHONE_BEZEL = 0.023
export const WEB_PAD = 0.007
export const WEB_BASE = 0.037

/**
 * Corner radii, as fractions of the shell's width.
 *
 * Under the real iPhone's 15.5% the corners are so round that they cut visible
 * arcs out of a screenshot — a phone draws its own UI to a rounded display,
 * but these exports are square-cornered rectangles, so the curve eats content
 * instead of following it. 11.5% reads as a phone and leaves the screen alone.
 *
 * The shell's radius must be applied as a PERCENTAGE of its own box, never in
 * container units. `container-type` makes an element a container for its
 * DESCENDANTS, not for itself, so `16.52cqw` on the shell resolved against the
 * viewport instead: 1920px wide gave a 317px radius on a 300px phone, which is
 * what turned every frame into a blob. The screen inside is a descendant, so
 * cqw is correct there.
 */
export const PHONE_RADIUS = { shell: 0.115, screen: 0.095 }

/** '402 / 874' as a number. */
export const ratio = (s: string): number => {
  const [w, h] = s.split('/').map((n) => parseFloat(n))
  return w / h
}

/**
 * The shell's aspect ratio, solved from the screen it has to hold.
 *
 * This was `402 / 874 / 1.0264` — a fudge factor standing in for the bezel —
 * and it was wrong by 5.2%, so `object-cover` quietly shaved the sides off
 * every phone screenshot. The mistake is worth naming because it is easy to
 * repeat: dividing the screen ratio by a constant treats the bezel as if it
 * scaled both dimensions equally, but percentage padding resolves against
 * WIDTH on all four sides. On a phone nine times taller than its padding is
 * wide, the vertical bezel is a far smaller share of the height than the
 * horizontal one is of the width.
 *
 * So solve it instead. With the shell one unit wide, the screen is
 * `1 - 2·bezel` wide, therefore `(1 - 2·bezel) / screen` tall, and the shell is
 * that plus the bezel above and below. Same shape for the laptop, with the base
 * taking its cut off the bottom before the lid gets what is left.
 *
 * Callers size these by height and let the width follow. Sizing by width is
 * what clipped the desktop hero: an 88%-wide laptop in a 2:1 stage is taller
 * than the stage it sits in.
 */
export function shellRatio(device: 'phone' | 'web', screen: string): number {
  const s = ratio(screen)
  if (device === 'phone') {
    const inner = 1 - 2 * PHONE_BEZEL
    return 1 / (inner / s + 2 * PHONE_BEZEL)
  }
  const inner = 1 - 2 * WEB_PAD
  return (1 - WEB_BASE) / (inner / s + 2 * WEB_PAD)
}

/**
 * The ratio the screen actually ends up at, given the shell above.
 *
 * The inverse of `shellRatio`, and only here so a test can assert the round
 * trip lands back on the number the screenshots were drawn at.
 */
export function screenRatioIn(device: 'phone' | 'web', screen: string): number {
  const height = 1 / shellRatio(device, screen)
  if (device === 'phone') {
    return (1 - 2 * PHONE_BEZEL) / (height - 2 * PHONE_BEZEL)
  }
  return (1 - 2 * WEB_PAD) / ((1 - WEB_BASE) * height - 2 * WEB_PAD)
}

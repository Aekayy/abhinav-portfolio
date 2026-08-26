/**
 * The screens each case study shows off, in the order they should play.
 *
 * These are the real Figma exports, converted by `tools/screens.mjs`. The full
 * set lives in `public/img/work/<slug>/screens/` — 157 of them — and what is
 * listed here is the edit: five or six screens that carry the product's
 * argument, not the onboarding it happens to ship with.
 *
 * The edit matters more than the count. A splash screen and four sign-up steps
 * prove nothing; the screen where the idea becomes visible is the one worth
 * playing. Where a study has both a phone and a desktop story, the phone leads,
 * because that is where these products are actually used.
 */

export type Device = 'phone' | 'web'

/**
 * Where the pointer presses on a frame to reach the next one, as a percentage
 * of the frame's own width and height. `[50, 93]` is the middle of a phone's
 * tab bar.
 *
 * These are read off the exports rather than guessed, which is the whole point:
 * a cursor that lands on the Discover tab and produces the Discover screen
 * reads as a recording of the product. A cursor drifting to empty canvas reads
 * as an animation someone put on top of screenshots.
 *
 * Where a sequence's original order made an honest path impossible, the order
 * was changed rather than the coordinate faked. Harmoney's card screen now
 * follows home because home has a CARD button and the payment-links screen
 * does not.
 */
export type Tap = [x: number, y: number]

export type Showcase = {
  device: Device
  /** File stems inside `public/img/work/<slug>/screens/`, in play order. */
  frames: string[]
  /** One press per frame, positioned on the control that opens the next. */
  taps: Tap[]
  /** Read out to screen readers in place of the sequence. */
  alt: string
  /**
   * A second device the product also runs on, played alongside the first.
   *
   * Only where it is true. Most of these are phone products and showing a
   * laptop next to them would be a lie told for the sake of a nicer thumbnail.
   * ForeCash was drawn at both sizes, so ForeCash gets both.
   */
  also?: { device: Device; frames: string[]; taps: Tap[] }
  /**
   * The two screens flanking the playing one on a study hero.
   *
   * Chosen rather than taken from the sequence: the flanks want the two screens
   * that read best at a glance and at three quarters size, which is rarely the
   * two that happen to sit either side of the current step in the walk. They are
   * shown at full opacity, so they have to hold up as screens in their own right.
   */
  stills?: [string, string]
}

const base = (slug: string) => `img/work/${slug}/screens`

/** Full paths for a showcase, resolved against the project's screen folder. */
export function framePaths(slug: string, s: Showcase): string[] {
  return s.frames.map((f) => `${base(slug)}/${f}.webp`)
}

/**
 * ForeCash: safe-to-spend, then the two things that make it move — a goal and
 * the assistant that reshapes it. The sign-up flow is deliberately absent.
 *
 * Tab bar sits at 95% of the height, five items at 11 / 30 / 50 / 69 / 88.
 */
const forecash: Showcase = {
  device: 'phone',
  alt: 'ForeCash on a phone and on a laptop: the safe-to-spend home, a savings goal and its detail, the assistant proposing cuts, the budget and analytics, and the same account on the desktop dashboard.',
  frames: [
    '15-home',
    '16-goals',
    '17-goal-detail',
    '19d-ask-cuts',
    '21-budget',
    '22-analytics',
  ],
  stills: ['21-budget', '22-analytics'],
  // The desktop app, on the same sidebar every one of these presses names.
  // Overview at 13.2% of the height, then Targets, Analytics and Ask ForeCash.
  also: {
    device: 'web',
    frames: ['w1-overview', 'w2-goal-detail', 'w5-analytics', 'w14-ask-applied'],
    taps: [
      [6, 17.3], // Targets
      [6, 29.5], // Analytics
      [6, 57.3], // Ask ForeCash
      [6, 13.2], // Overview, closing the loop
    ],
  },
  taps: [
    [50, 55], // the ongoing goal row on home
    [50, 45], // the first goal card
    [50, 78], // ask about this goal
    [50, 95], // Budget tab
    [30, 95], // Analytics tab
    [11, 95], // Home tab, which closes the loop
  ],
}

/**
 * Harmoney: the tap is the product, everything else is the account it needs.
 *
 * Tab bar at 93.6%, five items at 17 / 33 / 50 / 66 / 83, the middle one the
 * raised tap button. Home's quick-action row is at 40%.
 */
const harmoney: Showcase = {
  device: 'phone',
  alt: 'Harmoney on a phone: the home balance, the card, a live tap-to-pay, requesting money, payment links, and insights.',
  frames: [
    '11-home',
    '23-card',
    '25-tap-active',
    '16-request-money',
    '19-payment-links',
    '28-insights',
  ],
  stills: ['23-card', '28-insights'],
  taps: [
    [84, 40],   // CARD, in the quick-action row
    [50, 93.6], // the raised tap button
    [50, 88],   // done, which returns to the request flow
    [66, 93.6], // Links tab
    [33, 93.6], // Ledger tab, where insights live
    [17, 93.6], // Home tab
  ],
}

/**
 * Merkle: enterprise, so the story is the lifecycle — see it, build it, ship
 * it, approve it, measure it. Every press here is a real sidebar item, which
 * is why this one reads most convincingly of the five.
 */
const merkle: Showcase = {
  device: 'web',
  alt: 'Merkle on desktop: the single pane of glass, building an audience, the email builder, the approval pipeline, and campaign analytics.',
  frames: [
    '01-home-single-pane-of-glass',
    '02-build-audience',
    '14-email-builder',
    '16-approval-pipeline',
    '18-measure-campaign-analytics',
  ],
  taps: [
    [6.6, 16.7], // Build audience
    [6.6, 20.6], // Create campaign
    [6.6, 24.5], // Review and approve
    [6.6, 32.7], // Measure
    [4.6, 8.5],  // Home
  ],
}

/**
 * Spotify Vibe: the whole concept is one sheet, so the sequence is the track
 * before, the sheet, the track after. The opening press is the real "Make it
 * yours" row at the bottom of the now-playing screen.
 */
const spotify: Showcase = {
  device: 'phone',
  alt: 'Spotify Vibe on a phone: a track playing as released, the Vibe sheet, the five band equalizer being set by hand, saving your version, and the same track playing as yours.',
  stills: ['01-now-playing-original', '04-save-your-version'],
  /*
   * The advanced sheet appears six times on purpose.
   *
   * A frame is a screen, not a step, so repeating one lets the pointer stay put
   * and work the controls: it walks the five equalizer bands and then presses
   * Save. Cross-fading a screen into itself is invisible, so what a viewer sees
   * is one screen being adjusted rather than six screens going past. It is also
   * the only part of this product worth watching — the whole feature is those
   * sliders.
   *
   * Handle positions are read off the 540x1174 export: the bands sit at 20.4,
   * 36.9, 53.1, 69.6 and 85.9 percent across, each handle a little higher than
   * the last because the curve is already shaped.
   */
  frames: [
    '01-now-playing-original',
    '02-vibe-sheet-presets',
    '03-vibe-sheet-advanced',
    '03-vibe-sheet-advanced',
    '03-vibe-sheet-advanced',
    '03-vibe-sheet-advanced',
    '03-vibe-sheet-advanced',
    '03-vibe-sheet-advanced',
    '04-save-your-version',
    '08-now-playing-yours',
  ],
  taps: [
    [50, 90],     // Make it yours
    [50, 60],     // Advanced tone
    [20.4, 39.4], // 100 Hz
    [36.9, 38.8], // 250 Hz
    [53.1, 38.1], // 1 kHz
    [69.6, 37.3], // 6 kHz
    [85.9, 36.6], // 14 kHz
    [73, 87.8],   // Save version
    [50, 80],     // confirm
    [50, 90],     // and open it again
  ],
}

/**
 * Vesseli: two audiences in one app, so the edit shows both — finding work and
 * running the fleet.
 *
 * Tab bar at 93.6%, five items at 13 / 31 / 49 / 67 / 86. The quick-action row
 * is at 64%, four items at 15 / 38 / 61 / 84.
 */
const vesseli: Showcase = {
  device: 'phone',
  alt: 'Vesseli on a phone: the home feed, adding a vessel to a fleet, discovering work, the map of vessels, and the following feed.',
  frames: [
    '22-home',
    '20-add-your-vessel',
    '23-discover',
    '24-map',
    '25-feed-following',
  ],
  stills: ['24-map', '25-feed-following'],
  taps: [
    [38, 64],   // My fleet
    [31, 93.6], // Discover tab
    [88, 17],   // the map toggle
    [49, 93.6], // Feed tab
    [13, 93.6], // Home tab
  ],
}

export const SHOWCASES: Record<string, Showcase> = {
  forecash,
  harmoney,
  merkle,
  'spotify-alter': spotify,
  vesseli,
}

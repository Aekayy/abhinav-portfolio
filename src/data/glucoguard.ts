import type { Section } from './projects'

/**
 * GlucoGuard, in full.
 *
 * Written from the GlucoGuard 2.0 working prototype (C:\Users\abhin\Projects\
 * glucoguard): its README, the note card that sits beside every screen, and
 * the "story in one night" on its landing page. Every screen below is a real
 * capture of that build, taken at iPhone 15 and at 1440, not a mockup.
 *
 * Two things are deliberately kept honest. The night is a designed scenario,
 * so its timings are presented as the scenario rather than as measured
 * results. And the prototype has no backend, no real CGM and no PHI, which the
 * study says plainly instead of letting a reader assume otherwise.
 */

const S = 'img/work/glucoguard/screens'

export const GLUCOGUARD_SECTIONS: Section[] = [
  {
    id: 'context',
    label: 'Context',
    heading: 'A glucose alarm is a message to one person',
    tldr: [
      'At Jewish Healthcare Foundation I designed real time glucose monitoring dashboards for faster emergency response.',
      'GlucoGuard 2.0 takes the question further: what happens after the alarm, and who else needs to know.',
    ],
    blocks: [
      {
        kind: 'text',
        body: [
          'GlucoGuard started at Jewish Healthcare Foundation, where I designed real time glucose monitoring dashboards so a care team could respond faster when a patient’s blood sugar went dangerously low.',
          'Working on it, I kept coming back to one gap. A continuous glucose monitor is very good at noticing a low. It is much worse at making sure anyone does something about it. The alarm goes to one phone, held by the one person least able to respond, often at 3 a.m. and often on silent.',
          'GlucoGuard 2.0 is my answer to that gap. It is no longer a dashboard. It is a service that follows one alert through every person who has a part in it, and it ships as a working prototype rather than a deck.',
        ],
      },
      {
        kind: 'quote',
        body: 'How might we make sure every alert is followed through, by the right person, in the right order, without anyone needing to be in the room?',
        weight: 'bold',
      },
    ],
  },

  {
    id: 'problem',
    label: 'The problem',
    heading: 'An alarm that only one sleeping person can hear',
    beat: 'problem',
    tldr: [
      'A night low can turn dangerous in minutes, and the alert only reaches the patient, whose phone is often on silent.',
      'Nobody else knows. The caregiver finds out in the morning; the clinic sees it days later.',
      'Even the follow-up stalls: a sensor reorder bounces between fax, phone and insurer while supplies run out.',
    ],
    blocks: [
      {
        kind: 'split',
        title: 'Where it breaks',
        items: [
          { label: 'One phone, often on silent', body: 'A low at 3 a.m. can turn dangerous in minutes, and the alert only reaches the person having it.' },
          { label: 'Nobody else knows', body: 'The caregiver finds out in the morning. The clinic sees it days later, in a report.' },
          { label: 'Follow-up gets stuck', body: 'The sensor reorder bounces between fax, phone and insurer while the supplies run out.' },
        ],
      },
      {
        kind: 'beats',
        title: 'The same night, without GlucoGuard',
        tone: 'without',
        beats: [
          { at: '3:03 a.m.', said: '58 and falling', note: 'Denise’s sensor notices. Her phone, on silent, buzzes once on the nightstand.' },
          { at: '3:13 a.m.', said: '49', note: 'She is asleep. The alarm repeats to the only person who cannot answer it.' },
          { at: '8:00 a.m.', said: 'Mum, are you OK?', note: 'Maria, twelve minutes away, finds out from her mother over breakfast.' },
          { at: 'Days later', said: 'Lows cluster 2 to 4 a.m.', note: 'The clinic spots the pattern in a report, long after it mattered.' },
        ],
        close: 'Every part worked. The sensor read, the phone alerted. The system just ended at the edge of one person.',
      },
    ],
  },

  {
    id: 'people',
    label: 'Who it is for',
    heading: 'Six people, and the most important one has no app',
    tldr: [
      'One night touches six people across a home, a clinic, a supplier and a payer.',
      'The caregiver, Maria, is a first-class user who never installs anything. She is reached by plain SMS.',
    ],
    blocks: [
      {
        kind: 'text',
        body: [
          'I designed against one story rather than a list of personas: a single 3 a.m. low, followed across everyone it touches. Every screen in the prototype reads the same facts about the same people, so the product never contradicts itself.',
        ],
      },
      {
        kind: 'table',
        columns: ['Person', 'Role', 'Where they meet it', 'What they need'],
        rows: [
          ['Denise Okafor, 67', 'Patient, type 2, on insulin, lives alone', 'iPhone app', 'To be woken, told what to do, and not to cancel help by accident.'],
          ['Maria Okafor', 'Daughter, twelve minutes away', 'SMS only, no app', 'A plain message she can answer in one keystroke.'],
          ['Priya Shah, RN', 'Night coordinator, 214 patients', 'Care Console', 'The one alert that needs her, and why, without digging.'],
          ['Dr. Wen Chen', 'Physician', 'Care Console', 'A record of the night he did not have to reconstruct, and an order that will not be denied.'],
          ['Harbor Home Medical', 'Supplier', 'One order packet', 'Order, prescription, visit note and proof of coverage, together. No fax.'],
          ['Medicare', 'Payer', 'Claims', 'Proof the monitoring happened, so the night shift is paid for.'],
        ],
      },
    ],
  },

  {
    id: 'principles',
    label: 'Design decisions',
    heading: 'Rules for designing the worst five minutes of someone’s night',
    beat: 'decisions',
    tldr: [
      'Escalation is announced before it happens, and automation yields the moment a person responds.',
      'A rescue cannot be cancelled with a tap: it takes a two second hold.',
      'Patients can make alerts stricter, never looser. Clinical limits are locked in the UI, not just in policy.',
    ],
    blocks: [
      {
        kind: 'principles',
        items: [
          { no: '01', name: 'Say who is next, and when', body: 'Every alert names who will be called and at what time. Escalation is never a surprise to the person it is happening to.' },
          { no: '02', name: 'A tap can’t cancel a rescue', body: 'No bare Cancel on an emergency. “I’m OK” is a two second hold with haptic ticks; release and it resets.' },
          { no: '03', name: 'Automation yields to people', body: 'When Maria replies or Priya takes over, the 911 call pauses. The system steps back the moment a human steps in.' },
          { no: '04', name: 'Design for the person without the app', body: 'The caregiver gets an ordinary text with reply codes and a live link. Nothing to install at 3 a.m.' },
          { no: '05', name: 'Stricter, never looser', body: 'Patients can tighten their alert levels but not relax them. The urgent low is locked by the physician, and the stepper stops at the safe limit.' },
          { no: '06', name: 'Colour, shape and word', body: 'Every glucose state carries all three, so nothing depends on colour vision. Data older than 20 minutes is never shown as current.' },
          { no: '07', name: 'One record for everyone', body: 'Denise, Maria, Priya and Dr. Chen see the same event. A note written once lands in the chart, the audit log and the follow-up.' },
        ],
      },
      {
        kind: 'split',
        title: 'Calls I made on purpose',
        items: [
          { label: 'The action lives in the notification', body: 'The 15-15 rule is in the notification body itself, so the right thing to do needs no app open and no unlock.' },
          { label: 'One primary action per screen', body: 'In the worst moments there is exactly one thing to press. Everything else is secondary or gone.' },
          { label: 'Rehearse at noon', body: 'Onboarding ends with a practice alert that reaches Denise and Maria, clearly marked, so 3 a.m. is familiar instead of new.' },
          { label: 'Structured answers, not a blank note', body: 'The post-event check-in is three tap questions. Faster for a shaken patient, and codable for the clinician.' },
          { label: 'Clinical answers never auto-send', body: 'On the approval card, a single choice on the last question waits for Continue, because it becomes part of a medical record.' },
          { label: 'The palette that doesn’t animate', body: 'The console’s ⌘K command palette opens a hundred times a shift, so it appears instantly. Motion there would be a tax.' },
        ],
      },
    ],
  },

  {
    id: 'solution',
    label: 'The solution',
    heading: 'One alert, turned into a shared plan',
    beat: 'solution',
    tldr: [
      'A patient iPhone app and a Care Console, built on one design system and following one night end to end.',
      'Alerts escalate on their own: Denise, then Maria, then the care team, and 911 only if nobody answers.',
      'The follow-up runs through the same system: dose change, sensor order and billing, without a fax.',
    ],
    blocks: [
      {
        kind: 'beats',
        title: 'The same night, with GlucoGuard',
        tone: 'with',
        beats: [
          { at: '3:03 a.m.', said: 'Low · 58 mg/dL', note: 'Denise’s phone alerts her first, with what to do written into the notification.' },
          { at: '3:13 a.m.', said: 'Urgent low · 49', note: 'No reply. A Critical Alert sounds through silent mode and says Maria will be called next.' },
          { at: '3:18 a.m.', said: 'URGENT from GlucoGuard', note: 'Maria gets a call and a text. Priya’s queue puts Denise on top, with the reason. She takes over and 911 pauses.' },
          { at: '3:19 a.m.', said: 'Reply 1 · I’m going', note: 'Maria is on her way. Denise wakes, drinks juice, and holds the button for two seconds.' },
          { at: '3:34 a.m.', said: 'Resolved', note: 'Priya picks what happened. It lands in the chart, the audit log and a follow-up for Dr. Chen.' },
          { at: '10:12 a.m.', said: 'Sensors run out in 6 days', note: 'Dr. Chen reorders. Medicare’s criteria are checked live while he signs, so it won’t be denied weeks later.' },
        ],
        close: 'In the story, Denise is confirmed safe sixteen minutes after the first alert, and 911 never has to come.',
      },
      {
        kind: 'screens', device: 'phone',
        title: '3 a.m.: from the lock screen to “Calls stopped”',
        quickRead: true,
        items: [
          { src: `${S}/a6-lock-critical.webp`, caption: 'A Critical Alert through silent mode, naming who is called next' },
          { src: `${S}/a7-escalating.webp`, caption: 'Escalating: Maria now, care team at 3:23, 911 at 3:33. Hold to confirm' },
          { src: `${S}/a9-safe.webp`, caption: 'Calls stopped, Maria told, and a recheck already scheduled' },
        ],
      },
      {
        kind: 'screens', device: 'web',
        title: 'Priya’s queue, sorted by clinical urgency',
        quickRead: true,
        items: [
          { src: `${S}/w-q1-queue.webp`, caption: 'Every alert in one list, with why it fired: under 54 for 15 minutes, falling fast' },
          { src: `${S}/w-q2-takeover.webp`, caption: 'One key takes over the case. Everyone can see a nurse is on it, and 911 waits' },
          { src: `${S}/w-q3-resolve.webp`, caption: 'Resolving writes the note once, into the chart, the audit log and Dr. Chen’s follow-up' },
        ],
      },
      {
        kind: 'screens', device: 'phone',
        title: 'Maria, who never installed anything',
        items: [
          { src: `${S}/a13-sms.webp`, caption: 'An ordinary text with reply codes and a live status link' },
          { src: `${S}/a10-maria-coming.webp`, caption: 'Maria replied 1, so 911 is paused because a human responded' },
          { src: `${S}/a11-ems.webp`, caption: 'If nobody answers in 30 minutes: exactly what 911 was told, and three things to do now' },
        ],
      },
      {
        kind: 'screens', device: 'phone',
        title: 'The day in between: calm by default',
        items: [
          { src: `${S}/t1-today.webp`, caption: 'Today says it in a sentence first, then the number, its state and its age' },
          { src: `${S}/r1-trends.webp`, caption: 'Time in range by the international consensus bands, and one pattern found' },
          { src: `${S}/a12-summary.webp`, caption: 'The event summary Denise sees is the same record Priya sees' },
        ],
      },
      {
        kind: 'screens', device: 'phone',
        title: 'Onboarding that rehearses the night',
        items: [
          { src: `${S}/o02-welcome.webp`, caption: 'The care circle around “You”: the promise in one picture' },
          { src: `${S}/o08-alert-levels.webp`, caption: 'Alert levels: stricter, never looser, with the urgent low locked' },
          { src: `${S}/o09-invite.webp`, caption: 'Inviting Maria by number, because she won’t have the app' },
          { src: `${S}/o10-critical.webp`, caption: 'Explaining Critical Alerts before the iOS prompt asks' },
          { src: `${S}/o11s-practice-done.webp`, caption: 'A practice alert, with delivery receipts for every step' },
          { src: `${S}/o12-protected.webp`, caption: 'Ending on certainty, not confetti: everything in place, and anything pending' },
        ],
      },
      {
        kind: 'screens', device: 'web',
        title: 'The morning after: chart, order, claim',
        items: [
          { src: `${S}/w-p2-chart.webp`, caption: 'Denise’s chart: the 14 day pattern, every low and who responded' },
          { src: `${S}/w-d1-order-new.webp`, caption: 'The CGM order checks Medicare criteria live, step by step, before it is signed' },
          { src: `${S}/w-b1-billing.webp`, caption: 'Data days and interactive minutes add up to remote monitoring claims' },
        ],
      },
    ],
  },

  {
    id: 'states',
    label: 'Failure states',
    heading: 'Failure is a state, never a dead end',
    tldr: [
      'Every failure names the cause and the fix: the exact Dexcom setting, the card Medicare needs, the signal that dropped.',
      'Consequences are stated in plain words, “we can’t alert you”, never as error codes.',
    ],
    blocks: [
      {
        kind: 'text',
        body: [
          'In a safety product, the failure states are the product. If sharing is off, if the sensor drops, if the insurer wants a new card, the person needs to know what stopped working and the shortest way back.',
          'So the first CGM connection fails on purpose in the prototype. It is the most common real failure, and designing it against the integration constraint, rather than after it, is what keeps someone from quietly going unprotected.',
        ],
      },
      {
        kind: 'screens', device: 'phone',
        items: [
          { src: `${S}/o07f-cgm-failed.webp`, caption: 'Dexcom isn’t sharing: the setting, and the three taps to fix it' },
          { src: `${S}/m2-device-off.webp`, caption: 'Disconnected: the consequence first, then the fix inline' },
          { src: `${S}/c4-supplies-action.webp`, caption: 'Coverage needs a new card: photograph it, sent straight to the supplier' },
        ],
      },
      {
        kind: 'screens', device: 'web',
        title: 'And the parts of the console nobody demos',
        items: [
          { src: `${S}/w-pr-protocols.webp`, caption: 'Escalation protocols as editable steps, versioned and published' },
          { src: `${S}/w-tm-team.webp`, caption: 'On-call, with the uncovered weekend nights flagged before they happen' },
          { src: `${S}/w-au-audit.webp`, caption: 'An audit log of every call, view and message, people and system alike' },
        ],
      },
    ],
  },

  {
    id: 'system',
    label: 'Design system',
    heading: 'Hearth: one system, a phone and a console, and a night mode',
    tldr: [
      'Hearth: one token set from the Figma variables, in Light and Dark, shared by the iPhone app and the Care Console.',
      'Set entirely in San Francisco: SF Pro Text for interface and body, SF Pro Rounded for titles and glucose numbers.',
      'Night mode is the Dark token set. At 3 a.m. the whole phone switches with one class, so an alert never blinds the person it wakes.',
    ],
    blocks: [
      {
        kind: 'text',
        body: [
          'Both surfaces run on Hearth, the design system I built in Figma and carried into code with the same names: neutrals, brand plum, the glucose states, radius, elevation, motion, and a type scale from large title down to the numerals.',
          'The whole product is set in San Francisco, Apple’s system typeface, on the phone and on the laptop alike. SF Pro Text carries every line of interface and body copy. SF Pro Rounded is reserved for titles and glucose numbers, where a softer voice reads as calm rather than clinical. Using the platform’s own face on iOS means Dynamic Type, tabular numerals and optical sizing come for free, and carrying it into the console keeps a nurse and a patient looking at the same product.',
          'Night mode is not a separate theme. It is Hearth’s Dark token set, and the whole phone switches with a single class, so the 3 a.m. screens are dim by construction rather than by a second design.',
          'The brand mark, Held, is an open circle of care around one person. It shows up again on the welcome screen as a care circle that revolves around “You” with a faint heartbeat.',
        ],
      },
      {
        kind: 'figure',
        src: 'img/work/glucoguard/design-system.webp',
        caption: 'Hearth, the GlucoGuard design system: colour in Light and Night, the glucose states, San Francisco type scale for iOS and web, shape and motion tokens, and components captured from the build',
        ratio: '2000/4405',
        bg: '#f3eeea',
        fit: 'contain',
        quickRead: true,
        scrollable: true,
      },
      {
        kind: 'table',
        title: 'The type scale, in San Francisco',
        columns: ['Style', 'Face', 'Size / line', 'Used for'],
        rows: [
          ['Large title', 'SF Pro Rounded Bold', '34 / 41', 'Screen titles in the patient app'],
          ['Title 1 · 2', 'SF Pro Rounded Bold · Semibold', '28 / 34 · 22 / 28', 'Alert headlines, section titles'],
          ['Headline', 'SF Pro Text Semibold', '17 / 22', 'The one instruction on a screen'],
          ['Body · Subhead', 'SF Pro Text Regular', '17 / 22 · 15 / 20', 'Everything a patient reads'],
          ['Footnote · Eyebrow', 'SF Pro Text Regular · Semibold', '13 / 18 · 11 / 13 caps', 'Hints, timestamps, labels'],
          ['Number hero', 'SF Pro Rounded Semibold, tabular', '76 / 76', 'The live glucose reading'],
          ['Web display · H1', 'SF Pro Rounded Bold · Semibold', '30 / 36 · 22 / 28', 'Console page titles'],
          ['Web body · Small', 'SF Pro Text Regular', '14 / 20 · 12 / 16', 'Queue rows, charts, tables'],
        ],
      },
      {
        kind: 'split',
        title: 'Four supplied components, made clinical',
        items: [
          { label: 'One time code', body: 'Added an alphanumeric mode, because clinic codes are printed with letters. A wrong code names the clinic’s phone number.' },
          { label: 'Toast', body: 'Restyled to the Hearth ink pill, three seconds long, and contained inside the phone so it never floats over the page.' },
          { label: 'Sound', body: 'Four clinical cues: a gentle falling third for a low, three rising pulses for an urgent low only, hold ticks, and a heartbeat.' },
          { label: 'Approval card', body: 'Used for the post-event check-in and the coverage fix. The last answer never auto-sends, because it becomes clinical record.' },
        ],
      },
      {
        kind: 'screens', device: 'web',
        items: [
          { src: `${S}/w-l0-landing.webp`, caption: 'The prototype’s front door: both surfaces, and the glucose states as a legend' },
        ],
      },
    ],
  },

  {
    id: 'build',
    label: 'How it was built',
    heading: 'A working prototype, not a clickthrough',
    tldr: [
      'Built in React, TypeScript, Tailwind and Motion, with screen IDs that match the Figma frames one to one.',
      'A narrated, self-playing walkthrough drives the real screens, so a reviewer with no medical background can follow the night in nine chapters.',
      'Honest scope: local state only, no backend, no real CGM, SMS, Medicare or EHR, and no patient data.',
    ],
    blocks: [
      {
        kind: 'text',
        body: [
          'Escalation logic is the kind of thing a static prototype hides. Timers, pauses and who-gets-called-when only prove themselves when they run, so I built it: a patient app in an iPhone frame and a Care Console best viewed at 1440, both on the same local state.',
          'Every screen ID in the code matches its Figma frame, and every screen carries a note card: what happens here, and the decision behind it. The landing page tells the night as a nine-beat animated storyboard, and a narrated walkthrough moves a cursor through the live prototype for anyone who would rather watch than click.',
        ],
      },
      {
        kind: 'split',
        title: 'Motion, where it carries meaning',
        items: [
          { label: 'Hold to confirm', body: 'A two second linear fill, a haptic tick every half second, and a 200ms snap back on release.' },
          { label: 'Screen push', body: '380ms on the iOS drawer curve. Tab switches cross-fade instead of sliding.' },
          { label: 'Reduced motion', body: 'The care circle stops revolving and the heartbeat becomes a soft pulse. The storyboard stops autoplaying.' },
        ],
      },
      {
        kind: 'list',
        title: 'What it is not',
        items: [
          'There is no backend, and no real CGM, SMS, Medicare or EHR integration. No patient data, real or otherwise.',
          'The patient chart builds the Overview tab only; the other tabs say they are designed in Figma.',
          'Time runs faster than life where waiting would stall a demo: the fifteen minute recheck runs in fifteen seconds.',
        ],
      },
    ],
  },

  {
    id: 'outcome',
    label: 'Outcome',
    heading: 'From a dashboard to a service',
    beat: 'reflection',
    tldr: [
      'Version one helped a care team see a low. Version two makes sure someone acts on it, in order, and that the record writes itself.',
      'Next: test the escalation with night coordinators and with caregivers who only ever see the text message.',
    ],
    blocks: [
      {
        kind: 'text',
        body: [
          'The first GlucoGuard was a set of dashboards that helped a care team see a low sooner. Version two is a different kind of product. It decides who should know, in what order, and when to step back, and it carries the night through to the dose change, the sensor order and the claim.',
          'The biggest shift in my thinking was who the user is. The most important person on the worst night has no app, and designing for Maria changed the system more than any screen did.',
          'If I took it further, I would put the escalation in front of night coordinators and caregivers before adding a single feature. The timings, the hold, and the wording of a text received half asleep are all claims that only real people at 3 a.m. can confirm.',
        ],
      },
    ],
  },
]

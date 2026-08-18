import type { Section } from './projects'

/**
 * Harmoney, in full.
 *
 * Taken from the "06 · Case Study · Framer" page of the Harmoney by Ak Figma
 * file — a single 1440 × 19129 frame — and carried over as written. The copy is
 * Abhinav's; the only editing is structural, mapping his bands onto the block
 * vocabulary the renderer understands.
 *
 * Image slots point at public/img/harmoney/. Until an export is dropped in,
 * each renders as a tinted panel with its caption, so the page is never broken
 * and never pretends an artefact exists that does not.
 */
export const HARMONEY_SECTIONS: Section[] = [
  {
    id: 'what',
    label: 'The product',
    heading: 'A physical card that carries your business',
    blocks: [
      {
        kind: 'text',
        body: [
          'Tap it to any phone and your Harmoney profile opens in the browser, ready to take a payment. Nothing to install, nothing to spell out, nothing to remember later.',
        ],
      },
      { kind: 'figure', src: 'img/harmoney/hero.jpg', caption: 'The tapped profile and the seller’s home screen', ratio: '16/9' },
      {
        kind: 'split',
        title: '',
        items: [
          { label: '01 · One tap, one profile', body: 'The card touches a phone and a profile loads in under a second. Payment links, socials, booking and portfolio all sit one tap deep.' },
          { label: '02 · Made for earning in person', body: 'Built for vendors, creators and operators who meet people face to face and want the conversation and the payment to happen in the same moment.' },
          { label: '03 · Simple on purpose', body: 'Ten dollars once, no subscription and no terminal. The payer needs nothing but the phone already in their hand.' },
        ],
      },
    ],
  },

  {
    id: 'opportunity',
    label: 'The opportunity',
    heading: 'Intent is strongest the moment someone says yes',
    blocks: [
      {
        kind: 'text',
        body: [
          'When someone says yes in person, the intent to pay is at its strongest. Today that intent has to travel through several steps before money moves. Every step it survives is value kept, and that is where Harmoney does its work.',
        ],
      },
      {
        kind: 'ladder',
        title: 'How intent travels today · modelled with Tyi',
        steps: [
          { stage: 'Meet', note: 'Intent is at its peak', value: '100%' },
          { stage: 'Exchange', note: 'A card, handle or number is shared', value: '~60%' },
          { stage: 'Remember', note: 'Both people must recall later', value: '~30%' },
          { stage: 'Follow up', note: 'Someone has to send a link', value: '~15%' },
          { stage: 'Pay', note: 'Money moves. This is the moment we designed toward', value: '~8%' },
        ],
      },
      {
        kind: 'compare',
        title: 'What already exists, and the space between',
        items: [
          { name: 'Link in bio', good: 'Holds identity beautifully', gap: 'Sits one step away from the payment itself' },
          { name: 'Card reader', good: 'Takes payment reliably', gap: 'Travels without the profile or the follow up' },
          { name: 'P2P apps', good: 'Move money instantly', gap: 'Work best once two people already know each other' },
          { name: 'Business card', good: 'Opens the conversation', gap: 'Carries the introduction, then hands off' },
        ],
      },
    ],
  },

  {
    id: 'ninety-seconds',
    label: 'The same ninety seconds, twice',
    heading: 'Nothing goes wrong. The booking just evaporates',
    blocks: [
      {
        kind: 'text',
        body: [
          'Harmoney does not remove the payment step. The payer still opens their phone and authorises, and that step should take a deliberate action. What changes is everything that happens before it.',
          'Danielle is a stylist in Brooklyn. Bookings run between ninety and four hundred dollars, and almost all of them start as a conversation somewhere that is not a shop. She has no counter, no card reader and nowhere to put a QR code. Her work is mobile, so her ability to get paid has to be mobile too.',
          'Tonight is a friend’s rooftop birthday. She has just finished touching up her friend’s makeup before they head upstairs.',
        ],
      },
      {
        kind: 'split',
        title: 'The setup',
        items: [
          { label: 'Where', body: 'A rooftop party, not a shop.' },
          { label: 'At stake', body: 'One booking, around $400.' },
          { label: 'On her', body: 'A phone and her pocket.' },
        ],
      },
      {
        kind: 'beats',
        title: 'How it begins · identical either way',
        tone: 'with',
        beats: [
          { at: '6:40 pm', said: 'She has been watching for a while.', note: 'A woman Danielle has never met has been watching her work.' },
          { at: '6:41 pm', said: 'Do you do this professionally? I am getting married in October.', note: 'She leans over and asks the question that everything else follows from.' },
        ],
      },
      {
        kind: 'beats',
        title: 'Without Harmoney · four days, no booking',
        tone: 'without',
        beats: [
          { at: '6:42 pm', said: 'D · A · N · I · E · L · L · E dot…', note: 'Danielle spells her handle. Three near identical accounts come up.' },
          { at: '6:44 pm', said: 'Sure, I will DM you tonight.', note: 'Someone calls them over. The conversation ends there.' },
          { at: 'Four days later', said: 'No reply', note: 'Rates sent the next morning. Opened four days on, after two other artists replied.' },
        ],
        close: 'Nothing went wrong. Nobody was rude. The booking quietly evaporated between “I will DM you” and Thursday.',
      },
      {
        kind: 'beats',
        title: 'With Harmoney · under a minute, deposit taken',
        tone: 'with',
        beats: [
          { at: '6:42 pm', said: 'Her profile opens in a second.', note: 'She takes the card from her pocket and holds it to the phone.' },
          { at: '6:42 pm', said: '$150 to hold a date', note: 'Recent work, her rates, and a deposit already filled in. Nothing to type.' },
          { at: '6:43 pm', said: '+$150 received', note: 'She scrolls for eight seconds, taps Pay, Face ID. Danielle’s phone buzzes.' },
        ],
        close: 'The whole thing took less time than spelling her Instagram handle would have.',
      },
      {
        kind: 'split',
        title: 'What actually changed',
        items: [
          { label: 'Identical in both — the payment step', body: 'Open the phone, authorise, done. That step should take a deliberate action, and Harmoney leaves it alone.' },
          { label: 'Everything ahead of it', body: 'Spelling a handle out loud. Searching, and three similar accounts. “I will send you my rates.” Typing an amount, or guessing it. Four days for someone else to answer first.' },
        ],
      },
      {
        kind: 'quote',
        body: 'It does not make paying faster. It makes paying now possible, where the alternative was meaning to and not getting round to it.',
      },
      {
        kind: 'text',
        body: [
          'At a shop counter with a queue, a customer has already decided to buy and a QR code is perfectly good. Harmoney earns its place where there is no counter and no decision yet.',
        ],
      },
    ],
  },

  {
    id: 'does',
    label: 'What Harmoney does',
    heading: 'Discovery, identity and payment in one gesture',
    blocks: [
      {
        kind: 'split',
        title: '',
        items: [
          { label: '01 · Tap', body: 'The card touches any phone. Nothing to install on their side.' },
          { label: '02 · Open', body: 'A profile loads in the browser in under a second.' },
          { label: '03 · Pay', body: 'Payment, booking, socials and portfolio, all one tap deep.' },
        ],
      },
      {
        kind: 'quote',
        body: 'The card is ten dollars, once. Revenue comes from payments that complete, not from subscription.',
        source: 'The insight that shaped every screen',
      },
      {
        kind: 'text',
        body: [
          'Every screen between the tap and settled money carries the business, so those flows earned the deepest attention. Anything that could slow a payment down was treated as a design problem worth solving early.',
        ],
      },
    ],
  },

  {
    id: 'goals',
    label: 'Project goals',
    heading: 'Agreed before design started',
    blocks: [
      {
        kind: 'text',
        body: ['Agreed with Tyi before design started, and used to settle scope questions quickly later on.'],
      },
      {
        kind: 'split',
        title: '',
        items: [
          { label: 'Convert the gesture', body: 'Turn taps into completed payments, not just profile views.' },
          { label: 'Smooth the onboarding', body: 'Four steps, one decision each, with the lasting step clearly flagged.' },
          { label: 'Make money legible', body: 'Fees, timing and destination visible before every action.' },
          { label: 'Unify the brand', body: 'One identity across marketing, product and the physical card.' },
        ],
      },
    ],
  },

  {
    id: 'who',
    label: 'Who it is for',
    heading: 'Three earner types, plus the person nobody designs for',
    blocks: [
      {
        kind: 'text',
        body: [
          'Built from the founder’s market knowledge and the presale audience, and labelled proto personas because at this stage they are informed models, not validated research.',
        ],
      },
      {
        kind: 'table',
        columns: ['Persona', 'Who they are', 'Ticket', 'In their words'],
        rows: [
          ['The Vendor · Maya Ortiz', 'Ceramics at weekend markets. Twelve to twenty sales a day, hands full.', '$20 – $60', 'If it takes longer than handing over change, I have lost the next customer.'],
          ['The Service Creator · Danielle Reid', 'Studio sessions and styling. Sells credibility before she sells time.', '$90 – $400', 'By the time I send the link, the excitement has gone.'],
          ['The Operator · Marcus Bell', 'Runs a five person event team. Answers to a bank account, not a feeling.', 'Mixed', 'I do not need a dashboard. I need to find the one payment that needs me.'],
          ['The Payer · Alex Nguyen', 'Never heard of Harmoney. Two seconds, and a stranger holding out a card.', '—', 'I have no idea what this is. Why would I put my card details in?'],
        ],
      },
    ],
  },

  {
    id: 'journey',
    label: 'User journey map',
    heading: 'Three of the six stages exist only because payment happens later',
    blocks: [
      {
        kind: 'text',
        body: [
          'The Service Creator, current state against designed state. I mapped all three earner types, and this is the one that offered the most to design for.',
        ],
      },
      {
        kind: 'table',
        columns: ['Stage', 'Today', 'Designed for'],
        rows: [
          ['Meet', 'Intent is at its highest', 'Tap replaces the exchange'],
          ['Exchange', 'Interest lives only in memory', 'Profile opens with proof of work'],
          ['Recall', 'Recall does the work', 'Nothing to recall, payment is now'],
          ['Follow up', 'Following up sits with her', 'Follow up unnecessary'],
          ['Pay', 'The wait is quiet', 'Payer sees amount and pays in place'],
          ['Settle', 'Timing is unclear', 'Timeline and payout date up front'],
        ],
      },
      {
        kind: 'quote',
        body: 'Bring the payment into the moment and three of those stages simply fall away.',
        source: 'The insight that reordered the roadmap',
      },
      {
        kind: 'text',
        body: [
          'That is why the tap and the public profile came first. The dashboard is where the seller lives, and the profile is where the payment is decided.',
        ],
      },
    ],
  },

  {
    id: 'stories',
    label: 'User stories',
    heading: 'Requirements that never left their reason behind',
    blocks: [
      {
        kind: 'text',
        body: [
          'Written as acceptance criteria I could design against and a developer could build against, but held to a person so the requirement never got separated from its reason.',
        ],
      },
      {
        kind: 'list',
        title: 'Maya, the Vendor · P0',
        items: [
          'Take payment without touching a keyboard, so I do not slow the queue.',
          'Show the payer an amount already filled in, so nothing is left to decide.',
          'Confirm a payment landed without opening the app.',
        ],
      },
      {
        kind: 'list',
        title: 'Danielle, the Service Creator · P0',
        items: [
          'Show real work before money is mentioned, so a stranger takes me seriously.',
          'Send a set amount rather than a generic link, so I am not negotiating after.',
          'Stop chasing invoices, because chasing makes me look like I need it.',
        ],
      },
      {
        kind: 'list',
        title: 'Marcus, the Operator · P0',
        items: [
          'See gross, fee and net before I confirm, so I am never surprised after.',
          'Find any payment that needs attention without scrolling, so I can sort it the same day.',
          'Know the date money lands, not just that it is on the way.',
        ],
      },
      {
        kind: 'list',
        title: 'Alex, the Payer · P0',
        items: [
          'Know who I am paying and what for, before I am asked for anything.',
          'Pay without downloading an app or creating an account.',
          'Get a receipt that proves it happened.',
        ],
      },
      {
        kind: 'quote',
        body: 'Three of these people are customers. The fourth is meeting Harmoney for the first time, and everything depends on those few seconds.',
        source: 'The fourth user',
      },
      {
        kind: 'text',
        body: [
          'Every requirement Alex has sits on the public profile, a screen the account holder rarely sees. That is why it was designed first, ahead of the dashboard where the paying customer spends their time.',
        ],
      },
    ],
  },

  {
    id: 'principles',
    label: 'Principles',
    heading: 'Five, agreed before a single screen was drawn',
    blocks: [
      {
        kind: 'principles',
        items: [
          { no: '01', name: 'Protect the gesture', body: 'Nothing may add a step between the tap and the profile loading.' },
          { no: '02', name: 'Money is never a surprise', body: 'Fees, timing and destination before the action, never after.' },
          { no: '03', name: 'Density where it earns it', body: 'A ledger is for scanning. Space is spent on numbers and states.' },
          { no: '04', name: 'Every state is considered', body: 'Empty, loading and offline states are where trust is built.' },
          { no: '05', name: 'One identity, end to end', body: 'Site, app and card match. Discontinuity reads as risk.' },
        ],
      },
    ],
  },

  {
    id: 'ideation',
    label: 'Ideation',
    heading: 'Three structural concepts, one story',
    blocks: [
      {
        kind: 'text',
        body: [
          'Three structural concepts before any pixel was styled, run against the same story: take payment from a stranger in under ten seconds.',
        ],
      },
      {
        kind: 'compare',
        title: '',
        items: [
          { name: 'Wallet first · explored', good: 'Familiar to anyone who has used a banking app.', gap: 'Asks the seller to navigate before they can earn, which suits checking more than selling.' },
          { name: 'Terminal first · explored', good: 'Fastest possible path to a charge.', gap: 'Leads with an amount, where the service creator benefits from showing credibility first.' },
          { name: 'Profile first · chosen', good: 'Matches where money is actually decided.', gap: 'Asks the seller dashboard to sit second, which took some getting used to.' },
        ],
      },
      {
        kind: 'quote',
        body: 'The seller already believes in it. The payer is deciding in the moment. Design effort goes furthest where the decision is still open.',
      },
    ],
  },

  {
    id: 'wireframes',
    label: 'Wireframes and lo-fi',
    heading: 'If a screen does not work in grey, colour will not save it',
    blocks: [
      {
        kind: 'text',
        body: [
          'Structure and hierarchy resolved in greyscale, with the reasoning annotated on the artefact so it survived review without me in the room. Layout and density were then resolved at full detail with colour still withheld.',
        ],
      },
      { kind: 'figure', src: 'img/harmoney/wireframes.jpg', caption: 'Home, ledger, request, links and the public profile, annotated', ratio: '16/9' },
      {
        kind: 'split',
        title: 'Two things greyscale surfaced',
        items: [
          { label: 'It clarified the ledger row', body: 'The name and the amount were carrying equal weight. Seeing it in grey made the fix obvious, and it held once colour arrived.' },
          { label: 'It simplified the home screen', body: 'Without colour to separate them, four primary actions read as one. We reduced it to three.' },
        ],
      },
      {
        kind: 'list',
        title: 'Reasoning annotated on the artefact',
        items: [
          'Creating a link is the primary job, so it sits above the list rather than behind a plus icon.',
          'Conversion data lives on the row, because a link without performance data is unactionable.',
          'Card analytics live with the card, not in a separate insights tab. The object and its performance belong together.',
          'The public profile is seen by a stranger. It is the only screen that must convert with zero prior context.',
          'Freeze is destructive, so it is isolated and colour coded — and it is reversible, so the copy says so.',
        ],
      },
    ],
  },

  {
    id: 'visual',
    label: 'Visual direction',
    heading: 'Colour applied last, on structure already settled',
    blocks: [
      {
        kind: 'text',
        body: [
          'Deep green carries navigation, the card and identity. Lime is held back for the single highest intent action on any screen.',
        ],
      },
      {
        kind: 'table',
        title: 'Palette',
        columns: ['Role', 'Value'],
        rows: [
          ['Deep green', '#2D4A1E'], ['Green', '#4A7A28'], ['Lime', '#8DC63F'],
          ['Sage', '#E8F2D8'], ['Paper', '#F7F5EC'], ['Ink', '#16260F'],
        ],
      },
      {
        kind: 'split',
        title: 'Type',
        items: [
          { label: 'Bebas Neue', body: 'Display and brand moments.' },
          { label: 'Archivo', body: 'Interface and prose.' },
          { label: 'Inconsolata', body: 'Tabular figures for money, so decimals align and amounts do not shift width.' },
        ],
      },
      { kind: 'figure', src: 'img/harmoney/product.jpg', caption: 'Forty six screens across two themes', ratio: '16/9' },
      {
        kind: 'text',
        body: [
          'Both themes are built as a structural property rather than a separate skin, so they come out of the same components.',
        ],
      },
    ],
  },

  {
    id: 'decisions',
    label: 'Decisions',
    heading: 'Four choices, and what each one traded',
    blocks: [
      {
        kind: 'split',
        title: '',
        items: [
          { label: 'Showing fees before the confirm', body: 'In a product that grows on repeat volume, a creator who understands the fee on their first payment is far more likely to come back for the second. Gross, fee and net appear before every action. The tradeoff: a moment of extra reading in exchange for long term confidence.' },
          { label: 'Designing the empty state first', body: 'Every seller starts at zero, so the empty screen is the one they see most in week one. It confirms the card is live, explains what happens next, and offers a way to share the profile. The tradeoff: the most common early state earned real attention.' },
          { label: 'Leading with reassurance', body: 'When a balance will not load, the most useful thing an app can say is that the money is safe. Offline opens with that, shows the last known figure, and mentions connectivity second. The tradeoff: calm first, detail second.' },
          { label: 'Placing friction where it helps', body: 'Claiming a permanent address is the one onboarding step that stays with you. It gets its own screen, a clear note, and a confirmation naming the exact value being set. The tradeoff: a small pause here saves a conversation later.' },
        ],
      },
    ],
  },

  {
    id: 'states',
    label: 'Every state is designed',
    heading: 'The quiet states are where trust is built',
    blocks: [
      {
        kind: 'split',
        title: '',
        items: [
          { label: 'Empty', body: 'Confirms the card is live. “Your card is active and ready. The first person who taps it will show up right here.”' },
          { label: 'Offline', body: 'Reassurance first. “Your money is safe. This is a connection problem, not an account problem.” Last synced balance shown.' },
          { label: 'In progress', body: 'The tap as an event. Ready to tap, hold your card near their phone, amount and item named.' },
          { label: 'Success', body: 'A fee breakdown, not just a tick. Gross, processing fee, net to you, and the date it becomes available.' },
        ],
      },
    ],
  },

  {
    id: 'accessibility',
    label: 'Accessibility',
    heading: 'Considered during design, not audited afterwards',
    blocks: [
      {
        kind: 'text',
        body: ['Where it is not resolved, I have said so.'],
      },
      {
        kind: 'table',
        columns: ['Item', 'Status', 'Detail'],
        rows: [
          ['Never colour alone', 'Resolved', 'Status carries colour, background and a word. Direction carries colour, an arrow and a sign. Verified by designing the whole product in grey first.'],
          ['44pt tap floor', 'Resolved', 'Anything visually smaller sits inside a larger pressable row that carries the target.'],
          ['Tabular figures', 'Resolved', 'Money uses a monospaced face so decimals align and amounts do not shift width as digits change.'],
          ['Contrast on the brightest accent', 'In review', 'The brightest brand green on white sits close to the AA threshold for normal text. Documented with two remedies so the team can pick the right one.'],
          ['Dynamic Type', 'Open', 'Built on a fixed scale. Behaviour at the largest accessibility sizes is the next thing to test, starting with the ledger row.'],
          ['Screen reader semantics', 'Open', 'A transaction row should announce as one clear statement. Specified in handoff and ready to validate on device.'],
        ],
      },
    ],
  },

  {
    id: 'handover',
    label: 'Production readiness',
    heading: 'Finished when a team can build it without asking what I meant',
    blocks: [
      {
        kind: 'split',
        title: '',
        items: [
          { label: 'A system, not a file', body: 'Colour, type, spacing and elevation defined as named roles, so a theme change is a systems change rather than a screen by screen edit.' },
          { label: 'Documented components', body: 'Each carries its variants, content rules and construction reasoning, so intent survives after I leave.' },
          { label: 'Handed over as code', body: 'Tokens exported in a format engineering consumes directly, with written guidance on device targets and theming behaviour.' },
          { label: 'Reviewed for consistency', body: 'Structural checks across the full screen set for spacing, layout behaviour and consistent styling, so the file holds together as it grows.' },
        ],
      },
    ],
  },

  {
    id: 'measures',
    label: 'How I would know it worked',
    heading: 'Measures agreed, and the signals to look again',
    blocks: [
      {
        kind: 'text',
        body: [
          'The product had not launched at handover, so these are the measures Tyi and I agreed on, along with the signals that would tell us to look again.',
        ],
      },
      {
        kind: 'table',
        columns: ['Goal', 'Measure', 'What we would watch for'],
        rows: [
          ['The gesture converts', 'Taps that end in a completed payment', 'Taps growing faster than payments'],
          ['Sellers trust settlement', 'Withdrawal completion rate', 'Hesitation at the fee breakdown'],
          ['Onboarding holds', 'Step level completion', 'A dip at the handle or bank step'],
          ['The ledger is usable', 'Time to find a specific transaction', 'Little benefit at low volume'],
          ['The card earns its place', 'Repeat taps per active seller', 'Taps not repeating month to month'],
        ],
      },
    ],
  },

  {
    id: 'reflection',
    label: 'Reflection',
    heading: 'What I took from it',
    blocks: [
      {
        kind: 'split',
        title: '',
        items: [
          { label: 'The brief opened up into something bigger', body: 'The starting point was a set of screens. Working through it with Tyi, it became clear the more useful contribution was defining what the product was for, who it served, and which moments carried the business. He gave me the room to go there.' },
          { label: 'Holding colour back paid off', body: 'Working in greyscale through wireframes and lo-fi meant every hierarchy question was answered with structure. Two things surfaced there that would have been easy to miss later.' },
          { label: 'What I would add next', body: 'Not more screens. Five conversations with working vendors would test three of the assumptions this work is built on, and I designed those parts to be easy to change for exactly that reason.' },
        ],
      },
      {
        kind: 'quote',
        body: 'The card that makes you money.',
        source: 'Product design by Abhinav Krishnan for Tyi Moncrieffe, Anthem Nation · New York',
      },
    ],
  },
]

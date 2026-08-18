/**
 * The work.
 *
 * Case study prose is Abhinav's own, carried over from the Framer site rather
 * than paraphrased — a portfolio is a writing sample as much as a design one,
 * and rewriting it in my voice would misrepresent him.
 *
 * `sections` is a small vocabulary the renderer understands, so every study
 * reads consistently without each one needing its own layout.
 */

export type Block =
  | { kind: 'text'; body: string[] }
  | { kind: 'list'; title?: string; items: string[] }
  | { kind: 'quote'; body: string; source?: string }
  | { kind: 'split'; title: string; items: { label: string; body: string }[] }

export type Section = { id: string; label: string; heading: string; blocks: Block[] }

export type Project = {
  slug: string
  name: string
  title: string
  summary: string
  year: string
  industry: string
  role: string
  client?: string
  duration?: string
  kind: 'project' | 'side-quest'
  /** Present when the full study lives here. */
  sections?: Section[]
  /** Present when the study lives elsewhere. */
  external?: { href: string; label: string; note?: string }
  accent: string
}

export const PROJECTS: Project[] = [
  // ── Harmoney ───────────────────────────────────────────────────────────
  {
    slug: 'harmoney',
    name: 'Harmoney',
    title:
      'Turns a handshake into a payment, so people who earn in person can get paid in the moment.',
    summary:
      'A tap to pay NFC card and companion app for vendors, creators and operators. Designed end to end with Anthem Nation, from first principles to a production ready product.',
    year: '2026',
    industry: 'Fintech · Payments',
    role: 'Product Designer',
    client: 'Anthem Nation — Tyi Moncrieffe',
    kind: 'project',
    accent: '#1f6f4a',
    sections: [
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
              'Harmoney does not remove the payment step. The payer still opens their phone and authorises, and that step should take a deliberate action. What changes is everything that happens before it.',
            ],
          },
          {
            kind: 'split',
            title: 'The same ninety seconds, twice',
            items: [
              {
                label: 'Without Harmoney · four days, no booking',
                body: 'Nothing went wrong. Nobody was rude. The booking quietly evaporated between “I will DM you” and Thursday.',
              },
              {
                label: 'With Harmoney · under a minute, deposit taken',
                body: 'It collapses discovery, identity and payment into a single physical gesture, performed at the moment intent is highest.',
              },
            ],
          },
        ],
      },
      {
        id: 'goals',
        label: 'Goals',
        heading: 'Agreed before design started',
        blocks: [
          {
            kind: 'text',
            body: [
              'Project goals were agreed with the founder before design started, and used to settle every scope argument after.',
            ],
          },
          {
            kind: 'list',
            title: 'Who it is for',
            items: [
              'Three earner types, plus the person nobody designs for.',
              'Built from the founder’s market knowledge and the presale audience.',
              'Labelled proto personas, because at this stage they are informed models rather than validated research.',
            ],
          },
        ],
      },
      {
        id: 'process',
        label: 'Process',
        heading: 'Journeys, stories and principles',
        blocks: [
          {
            kind: 'text',
            body: [
              'I mapped the Service Creator’s current state against the designed state, along with all three earner types. That was the one that offered the most to design for.',
              'User stories were written as acceptance criteria I could design against and a developer could build against, but held to a person so the requirement never got separated from its reason.',
              'Five principles, agreed with Tyi before a single screen was drawn. They gave us a shared way to settle questions quickly later on.',
            ],
          },
        ],
      },
      {
        id: 'design',
        label: 'Design',
        heading: 'Structure first, colour last',
        blocks: [
          {
            kind: 'text',
            body: [
              'Three structural concepts before any pixel was styled, run against the same story: take payment from a stranger in under ten seconds. The seller already believes in it; the payer is deciding in the moment, and design effort goes furthest where the decision is still open.',
              'Structure and hierarchy were resolved in greyscale, with the reasoning annotated on the artefact so it survived review without me in the room. Layout and density were then resolved at full detail with colour deliberately withheld — if a screen does not work in grey, colour will not save it.',
              'Colour was applied last, on structure already argued and settled. Deep green carries navigation, the card and identity. Lime is held back for the single highest intent action on any screen.',
            ],
          },
          {
            kind: 'text',
            body: [
              'The product came to forty six screens across two themes, covering onboarding, the money flows, links, the card, settings and every state in between.',
              'In a payments product the quieter states are not edge cases. They are where trust is built, so every state is designed. Accessibility was considered during design rather than audited afterwards, and where it is not resolved, I have said so.',
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
              {
                label: 'The brief opened up into something bigger',
                body: 'The starting point was a set of screens. Working through it with Tyi, it became clear the more useful contribution was defining what the product was for, who it served, and which moments carried the business. He gave me the room to go there.',
              },
              {
                label: 'Holding colour back paid off',
                body: 'Working in greyscale through wireframes and lo-fi meant every hierarchy question was answered with structure. Two things surfaced there that would have been easy to miss later.',
              },
              {
                label: 'What I would add next',
                body: 'Not more screens. Five conversations with working vendors would test three of the assumptions this work is built on, and I designed those parts to be easy to change for exactly that reason.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Vesseli ────────────────────────────────────────────────────────────
  {
    slug: 'vesseli',
    name: 'Vesseli',
    title: 'A seamless maritime hiring experience for boat owners and crew',
    summary:
      'A mobile platform helping boat owners hire crew and coordinate maritime work. I worked directly with the CEO to redesign the existing app and improve its usability, structure and overall experience.',
    year: '2025',
    industry: 'Maritime · B2B2C',
    role: 'Product, UX/UI Designer',
    client: 'Vesseli, UK — Laurence McRory',
    duration: '3 months',
    kind: 'project',
    accent: '#2b6c8f',
    sections: [
      {
        id: 'background',
        label: 'Background',
        heading: 'A clear vision without the structure to carry it',
        blocks: [
          {
            kind: 'text',
            body: [
              'Vesseli is a maritime platform designed to help boat owners hire crew, coordinate vessel deliveries and manage short-term maritime work. I collaborated directly with the CEO, Laurence McRory, after reaching out to him when he was looking for design support to improve the existing app.',
              'The original product had a clear vision but lacked usability, structure and engagement. The goal of this redesign was to turn Vesseli into a platform that users not only understand but actually enjoy using.',
            ],
          },
          {
            kind: 'list',
            title: 'The opportunity is significant',
            items: [
              'The global maritime industry is worth hundreds of billions.',
              'Demand for flexible, short-term crew hiring is increasing.',
              'There is a lack of modern, user-friendly digital solutions.',
            ],
          },
        ],
      },
      {
        id: 'problem',
        label: 'The problem',
        heading: 'Users struggled to complete key actions',
        blocks: [
          {
            kind: 'list',
            title: 'The existing app suffered from',
            items: [
              'Unclear navigation and user flows.',
              'Lack of visual hierarchy and consistency.',
              'Low perceived trust due to unstructured profiles.',
              'Minimal engagement from a purely functional interface.',
            ],
          },
          {
            kind: 'list',
            title: 'As a result',
            items: [
              'Users struggled to complete key actions.',
              'Hiring decisions lacked confidence.',
              'The app did not reflect its true potential.',
            ],
          },
        ],
      },
      {
        id: 'goals',
        label: 'Goals',
        heading: 'What the redesign had to achieve',
        blocks: [
          {
            kind: 'list',
            items: [
              'Redesign the app to improve usability and clarity.',
              'Introduce a strong, cohesive visual identity.',
              'Simplify hiring and coordination workflows.',
              'Build trust through structured information.',
              'Create a scalable foundation for future development.',
            ],
          },
          {
            kind: 'split',
            title: 'Prioritising the problem',
            items: [
              { label: 'Core hiring flow', body: 'Ensuring users can discover, evaluate and hire efficiently.' },
              { label: 'Onboarding and role clarity', body: 'Defining user intent early to reduce confusion.' },
              { label: 'Trust and profile structure', body: 'Making it easier to assess credibility.' },
              { label: 'Navigation simplicity', body: 'Reducing friction across key journeys.' },
            ],
          },
        ],
      },
      {
        id: 'research',
        label: 'Research',
        heading: 'Trust is what people are actually judging',
        blocks: [
          {
            kind: 'list',
            title: 'Approach',
            items: [
              'Discussions with the founder.',
              'Analysis of the existing product experience.',
              'Competitive review of maritime and gig platforms.',
            ],
          },
          {
            kind: 'list',
            title: 'Key insights',
            items: [
              'Users rely heavily on trust and reputation.',
              'Lack of structure leads to hesitation in hiring.',
              'Simplicity directly impacts action-taking.',
              'Visual design influences perceived credibility.',
            ],
          },
          {
            kind: 'quote',
            body: 'It’s useful, but I’m not always sure who to trust or how to choose the right person.',
            source: 'Usability test — SeaPeople, a competing maritime hiring platform',
          },
          {
            kind: 'text',
            body: [
              'Testing revealed that while the platform enables hiring, it lacks clear trust indicators and structured profiles. Users struggle to confidently evaluate crew members, which slows decisions. The absence of strong visual hierarchy and credibility signals increases cognitive load and reduces engagement.',
            ],
          },
        ],
      },
      {
        id: 'users',
        label: 'Users',
        heading: 'Four segments, one primary persona',
        blocks: [
          {
            kind: 'split',
            title: 'User segments',
            items: [
              { label: 'Boat owners', body: 'Hire crew and manage operations.' },
              { label: 'Crew members', body: 'Find jobs and build reputation.' },
              { label: 'Delivery skippers', body: 'Manage vessel transport.' },
              { label: 'Service providers', body: 'Offer specialised services.' },
            ],
          },
          {
            kind: 'list',
            title: 'Boat owner — primary persona',
            items: [
              'Goals: find reliable crew quickly, evaluate credibility with confidence, manage hiring without friction.',
              'Pain points: lack of trustworthy information, time-consuming communication, unclear hiring processes.',
              'Needs: clear profiles, a simple hiring flow, strong trust indicators.',
            ],
          },
        ],
      },
      {
        id: 'solution',
        label: 'Solution',
        heading: 'Four moves',
        blocks: [
          {
            kind: 'split',
            title: '',
            items: [
              { label: 'Role-based experience', body: 'Structured onboarding defines user intent early and personalises the experience.' },
              { label: 'Trust-driven profiles', body: 'Profiles redesigned around experience, credentials, availability and a clear hierarchy of information.' },
              { label: 'Simplified hiring flow', body: 'Reduced complexity in searching, evaluating, requesting and confirming jobs.' },
              { label: 'Visual identity revamp', body: 'A beachy, harbour-inspired theme that reflects the maritime context and creates a calmer, more engaging experience.' },
            ],
          },
          {
            kind: 'list',
            title: 'Key design improvements',
            items: [
              'Clear onboarding flow with role selection.',
              'Improved card-based layouts for profiles.',
              'Stronger CTA visibility.',
              'Better spacing and readability.',
              'A consistent design system.',
            ],
          },
        ],
      },
      {
        id: 'conclusion',
        label: 'Outcome',
        heading: 'From functional to trusted',
        blocks: [
          {
            kind: 'text',
            body: [
              'This redesign transformed Vesseli from a functional but underwhelming product into a structured, engaging platform with clear usability and a strong visual identity.',
              'The new experience improves clarity across key workflows, builds trust through structured information, and lays a foundation for future scalability. The redesigned app is currently under development and represents the next evolution of the platform.',
            ],
          },
        ],
      },
    ],
  },

  // ── ForeCash ───────────────────────────────────────────────────────────
  {
    slug: 'forecash',
    name: 'ForeCash',
    title:
      'Helps users forecast savings, plan finances, and track transactions with AI insights.',
    summary:
      'Turning complex cash flow data into actionable insight, so people can make confident financial decisions without spreadsheets or guesswork.',
    year: '2025',
    industry: 'Fintech · AI wealth management',
    role: 'Product Designer',
    client: 'Self-initiated concept',
    duration: '4 months',
    kind: 'project',
    accent: '#8a5a2b',
    sections: [
      {
        id: 'background',
        label: 'Background',
        heading: 'Most finance apps show you the past',
        blocks: [
          {
            kind: 'list',
            title: 'I noticed that most finance apps either',
            items: [
              'Focus heavily on charts and numbers.',
              'Surface problems without guidance.',
              'Assume high financial literacy.',
            ],
          },
          {
            kind: 'quote',
            body: 'How might we help people feel more in control of their money without overwhelming them?',
          },
        ],
      },
      {
        id: 'problem',
        label: 'The problem',
        heading: 'People know what they earn. They struggle to save on purpose',
        blocks: [
          {
            kind: 'text',
            body: [
              'Traditional budgeting tools focus on tracking spending but fail to guide users with purpose or help them stay motivated.',
              'People know what they earn and what they spend, but they struggle with saving intentionally or working toward meaningful milestones like starting a business, paying off student debt, or travelling the world.',
            ],
          },
        ],
      },
      {
        id: 'goals',
        label: 'Goals',
        heading: 'What the work had to move',
        blocks: [
          {
            kind: 'list',
            items: [
              'Increase user engagement and retention.',
              'Reduce drop-offs during onboarding.',
              'Raise goal completion rates.',
              'Strengthen organic growth through clear value communication across web and app.',
            ],
          },
          {
            kind: 'text',
            body: [
              'I focused on the highest-friction moment in the journey: interpreting forecasts and acting on them. That was validated through user interviews, session recordings and funnel drop-off analysis.',
            ],
          },
          {
            kind: 'split',
            title: 'Trade-offs I accepted',
            items: [
              { label: 'Less data upfront', body: 'Reduced visual density to improve clarity, at the cost of showing less at a glance.' },
              { label: 'Progressive disclosure over shortcuts', body: 'Prioritised a guided path over power-user shortcuts.' },
            ],
          },
        ],
      },
      {
        id: 'research',
        label: 'Research',
        heading: 'People want a partner, not a ledger',
        blocks: [
          {
            kind: 'text',
            body: [
              'I analysed financial discussions across communities where people expressed frustration with tools that only track historical spending without helping them anticipate or plan ahead.',
              'Affinity mapping organised those insights into clear themes, revealing financial needs, behaviours and decision-making triggers, which then shaped the customer journey map.',
            ],
          },
          {
            kind: 'quote',
            body: 'I tried asking the AI about my financial goals in my own words, but it only offered a few preset questions to choose from. When I typed anything outside those options, it could not give me an answer.',
            source: 'Usability test #1 — Erica AI, Bank of America',
          },
          {
            kind: 'quote',
            body: 'The AI responds in a friendly and engaging way, but it cannot give me a personalised forecast or plan based on my specific situation. It feels like I am getting generic advice instead of something tailored to me.',
            source: 'Usability test #2 — Cleo AI',
          },
          {
            kind: 'text',
            body: [
              'Together those tests set the bar: financial wellness tools have to accept a question in the user’s own words, and answer it with something specific to them.',
            ],
          },
        ],
      },
      {
        id: 'users',
        label: 'Users',
        heading: 'Young professionals with irregular income',
        blocks: [
          {
            kind: 'list',
            title: 'Primary audience',
            items: [
              'Young professionals (22–35) juggling irregular income.',
              'People who don’t want strict budgets but want clarity and control.',
              'Goal-oriented individuals saving for milestones: debt repayment, travel, business, investments.',
            ],
          },
          {
            kind: 'list',
            title: 'User needs',
            items: [
              'Quick understanding of future cash flow.',
              'Simple visuals that don’t require financial expertise.',
              'Personalised advice and next-step suggestions.',
            ],
          },
        ],
      },
      {
        id: 'solution',
        label: 'Solution',
        heading: 'Guidance instead of raw numbers',
        blocks: [
          {
            kind: 'split',
            title: 'Core design decisions',
            items: [
              { label: 'Progressive disclosure', body: 'Users see summaries first, details on demand.' },
              { label: 'Scenario comparison', body: 'Side-by-side layouts reduce memory load.' },
              { label: 'Explainability', body: 'AI-generated insights explain why a forecast changed.' },
            ],
          },
          {
            kind: 'text',
            body: [
              'Instead of overwhelming users with raw numbers, the design guides them toward actionable understanding. I focused more on flows, assumptions and reasoning than on visual polish, mirroring real-world product problem solving.',
              'The build covers two onboarding directions — a clean authentic version and an illustrated one — plus authentication, dashboard, goals and transactions, profile, security and analytics, and a conversational AI layer that offers suggestions, reminders and nudges.',
            ],
          },
        ],
      },
      {
        id: 'conclusion',
        label: 'Outcome',
        heading: 'From tracker to adaptive partner',
        blocks: [
          {
            kind: 'text',
            body: [
              'Feedback from usability testing shaped the final iteration of ForeCash into a platform that not only forecasts savings but actively motivates users to achieve their biggest financial goals.',
            ],
          },
        ],
      },
    ],
  },

  // ── Merkle ─────────────────────────────────────────────────────────────
  {
    slug: 'merkle',
    name: 'Merkle',
    title: 'Enterprise Campaign Orchestrator',
    summary:
      'A unified enterprise platform that lets marketing teams plan, launch, monitor and optimise omnichannel campaigns from a single workspace.',
    year: '2025',
    industry: 'Enterprise SaaS',
    role: 'Product Designer',
    client: 'Merkle',
    duration: 'Jul 2024 — Aug 2025',
    kind: 'project',
    accent: '#4a4a86',
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        heading: 'A single workspace for omnichannel campaigns',
        blocks: [
          {
            kind: 'text',
            body: [
              'Led end to end UX for an enterprise marketing platform, improving campaign workflows through research, prototyping and usability testing with more than 150 users, driving a 22% increase in engagement.',
              'Collaborated across product, business and engineering to design scalable Figma systems and reusable patterns that simplified complex workflows and improved usability and consistency.',
            ],
          },
          {
            kind: 'list',
            title: 'What this section still needs',
            items: [
              'The full study on the existing site is password protected, so the detail is not reproduced here yet.',
              'Once the content is to hand this page takes the same shape as the three studies beside it: problem, goals, research, users, solution, outcome.',
            ],
          },
        ],
      },
    ],
  },

  // ── Spotify Alter ──────────────────────────────────────────────────────
  {
    slug: 'spotify-alter',
    name: 'Spotify Alter',
    title: 'Change the sound, not the record',
    summary:
      'A concept feature letting listeners change the pitch, speed and tone of a track and keep that version — settings, not a copy, so the artist keeps the stream and the royalty. Designed and built end to end, including a working audio engine.',
    year: '2026',
    industry: 'Concept · Consumer audio',
    role: 'Product Designer, and build',
    client: 'Self-directed',
    kind: 'project',
    accent: '#1db954',
    external: {
      href: 'https://spotify-alter.vercel.app/',
      label: 'Open the live build',
      note: 'Its own repository and deployment, linked rather than folded in.',
    },
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        heading: 'People already alter music. Somewhere else',
        blocks: [
          {
            kind: 'list',
            items: [
              'Sped up and slowed versions pull enormous numbers on video platforms. The demand is settled.',
              'Every one of them is a re-upload, which pays whoever uploaded it rather than the artist who made it.',
              'Spotify already has the tools: an equaliser exists in settings. It is buried, global, and cannot be saved per song.',
            ],
          },
          {
            kind: 'text',
            body: ['The demand is proven. The plumbing is what was missing.'],
          },
        ],
      },
      {
        id: 'constraint',
        label: 'The constraint',
        heading: 'A version is settings, not audio',
        blocks: [
          {
            kind: 'text',
            body: [
              'The whole idea rests on one decision: a saved version stores about forty bytes of settings, not a copy of the recording. Playback changes on the listener’s device and the master is untouched.',
              'That is what makes it something a rights holder could say yes to. There is no new copy to license, no re-upload to police, and the stream still counts for the artist who made it.',
            ],
          },
        ],
      },
      {
        id: 'engine',
        label: 'The build',
        heading: 'Pitch and speed had to move independently',
        blocks: [
          {
            kind: 'text',
            body: [
              'A concept that claims a listener can slow a track without dropping its key has to prove it, so I built the audio engine rather than faking it with a demo video.',
              'It uses WSOLA time-stretching with a separate resampling stage — the same decomposition BASS_FX exposes as two independent attributes. Moving one control cannot move the other, verified offline to within fourteen cents of pitch and 0.4% of duration across eight combinations.',
            ],
          },
          {
            kind: 'split',
            title: 'Two problems worth naming',
            items: [
              {
                label: 'It sounded broken pushed up, muffled pulled down',
                body: 'Both came from reading the buffer with a straight line between samples. Linear interpolation dulls the top end going down and aliases going up. A cubic read plus a guard filter took folded energy from 54% of the reference to 6%.',
              },
              {
                label: 'It played nothing at all once deployed',
                body: 'The worklet was assembled by stringifying a class. At the production build target that class references a helper the worklet scope cannot see, so it died silently. It is a properly bundled module now, with a test that runs the shipped file.',
              },
            ],
          },
        ],
      },
      {
        id: 'outcome',
        label: 'Outcome',
        heading: 'A working thing, not a mockup',
        blocks: [
          {
            kind: 'text',
            body: [
              'The result is a live site with eight cleared sample tracks and the option to load your own file, a full case study covering the process, and mobile and desktop mockups of the feature inside Spotify’s own design language.',
            ],
          },
        ],
      },
    ],
  },
]

export const CASE_STUDIES = PROJECTS
export const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)

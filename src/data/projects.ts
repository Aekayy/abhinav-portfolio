/**
 * The work.
 *
 * Case study prose is Abhinav's own, carried over from the Framer site rather
 * than paraphrased, a portfolio is a writing sample as much as a design one,
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
  /** A funnel: each rung loses some of the one above it. */
  | { kind: 'ladder'; title?: string; steps: { stage: string; note: string; value: string }[] }
  /** What exists today, and the gap each one leaves. */
  | { kind: 'compare'; title?: string; items: { name: string; good: string; gap: string }[] }
  /** A moment told in beats, timestamped. */
  | { kind: 'beats'; title: string; lede?: string; tone: 'without' | 'with'; beats: { at: string; said: string; note: string }[]; close?: string }
  /** Rows against columns, a journey map or a measures table. */
  | { kind: 'table'; title?: string; columns: string[]; rows: string[][] }
  /** Numbered principles, stated flat. */
  | { kind: 'principles'; title?: string; items: { no: string; name: string; body: string }[] }
  /** An image from the Figma file. Falls back to a tinted panel until the
   *  export is dropped into public/img/, so nothing ever renders broken. */
   | { kind: 'figure'; src: string; caption?: string; ratio?: string; bg?: string; fit?: 'cover' | 'contain'; layout?: 'default' | 'horizontal' }

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
  /** Card thumbnail; the accent panel shows until it loads. */
  thumb?: string
  /** High-resolution hero image for the case study header banner. */
  hero?: string
  /** Present when the full study lives here. */
  sections?: Section[]
  /** Present when the study lives elsewhere. */
  external?: { href: string; label: string; note?: string }
  noSectionNav?: boolean
  accent: string
}

import { HARMONEY_SECTIONS } from './harmoney'

export const PROJECTS: Project[] = [
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
    duration: 'Jul 2024, Aug 2025',
    kind: 'project',
    thumb: 'img/work/merkle-card.png',
    hero: 'img/work/merkle/hero.png',
    accent: '#4a4a86',
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        heading: 'One platform, fourteen disconnected screens',
        blocks: [
          {
            kind: 'text',
            body: [
              'A campaign manager at a global retailer needs to reach lapsed customers across email, SMS and push, in four markets, with consent honoured and a budget signed off. ECO is where that happens end to end.',
              'Inconsistent UI patterns, poor information architecture, and cognitive overload slowed every team down, from campaign managers to legal reviewers.',
            ],
          },
          { kind: 'figure', src: 'img/work/merkle/hero.png', caption: 'The Enterprise Campaign Orchestrator dashboard', ratio: '16/9' },
          {
            kind: 'split',
            title: 'Headline numbers',
            items: [
              { label: '22%', body: 'Increase in engagement.' },
              { label: '150+', body: 'Enterprise users researched.' },
              { label: '3', body: 'Agile squads.' },
              { label: 'AA', body: 'WCAG 2.1 compliance.' },
            ],
          },
          {
            kind: 'quote',
            body: 'Transform disconnected marketing tools into one intelligent operating system.',
            source: 'The design vision',
          },
        ],
      },
      {
        id: 'problem',
        label: 'The problem',
        heading: 'Fourteen steps to launch one campaign',
        blocks: [
          {
            kind: 'text',
            body: [
              'Fortune 500 marketing teams relied on fragmented legacy systems to manage complex omnichannel campaigns. Launching a single campaign meant navigating fourteen disconnected screens.',
            ],
          },
          {
            kind: 'list',
            title: 'The fourteen steps',
            items: [
              '01 · Strategy intake', '02 · Campaign brief', '03 · Channel selection', '04 · Audience rules',
              '05 · Suppression lists', '06 · Journey setup', '07 · Content creation', '08 · Personalization',
              '09 · QA', '10 · Legal review', '11 · Business approval', '12 · Launch scheduling',
              '13 · Monitoring', '14 · Analytics',
            ],
          },
          {
            kind: 'split',
            title: 'What that felt like',
            items: [
              { label: '60%', body: 'Lost inside advanced filtering.' },
              { label: 'High', body: 'Support ticket volume.' },
              { label: 'Slow', body: 'Campaign launch speed.' },
              { label: 'Steep', body: 'Learning curve for new users.' },
            ],
          },
          { kind: 'figure', src: 'img/work/merkle/research-1.png', caption: 'Mapping every type of user’s journey, categorised by empathy', ratio: '4960/656' },
          { kind: 'figure', src: 'img/work/merkle/research-2.png', caption: 'The end-to-end orchestration lifecycle', ratio: '4960/948' },
          { kind: 'figure', src: 'img/work/merkle/research-3.png', caption: 'Where the fourteen steps hurt most', ratio: '4960/648' },
        ],
      },
      {
        id: 'users',
        label: 'Six roles',
        heading: 'Six roles, one campaign workspace',
        blocks: [
          {
            kind: 'split',
            title: 'Understanding the business',
            items: [
              { label: 'Strategy · Marketing Manager', body: 'Goal: align channels, timing, and business outcomes. Pain point: low visibility and slow approvals.' },
              { label: 'Execution · Campaign Manager', body: 'Goal: build and launch campaigns accurately. Pain point: duplicate work and fragile handoffs.' },
              { label: 'Data · CRM Specialist', body: 'Goal: create accurate segments and rules. Pain point: advanced filters are hard to trust.' },
              { label: 'Insights · Marketing Analyst', body: 'Goal: explain performance and business impact. Pain point: delayed, contextless analytics.' },
              { label: 'Governance · Director of Marketing', body: 'Goal: oversee portfolio risk and adoption. Pain point: no unified operational view.' },
              { label: 'Compliance · Legal Reviewer', body: 'Goal: review content and approvals. Pain point: unclear audit history.' },
            ],
          },
        ],
      },
      {
        id: 'research',
        label: 'Research',
        heading: 'Grounded in 150+ enterprise conversations',
        blocks: [
          {
            kind: 'text',
            body: [
              'Visualizing the end-to-end orchestration lifecycle for the ECO enterprise platform by mapping out every type of user’s journey. Based on the conversations, I mapped it out categorizing by empathy and what the user felt about using an enterprise campaign orchestrator.',
            ],
          },
          {
            kind: 'list',
            title: 'Methods',
            items: ['Interviews', 'Usability testing', 'Heatmaps', 'Analytics', 'Journey mapping', 'Competitive analysis', 'Affinity mapping'],
          },
          {
            kind: 'list',
            title: 'What the conversations said',
            items: [
              '01 · Marketing managers think in workflows, not features.',
              '02 · Users constantly switch between dashboards.',
              '03 · Users need progressive guidance.',
              '04 · Campaign approvals create unnecessary bottlenecks.',
            ],
          },
          { kind: 'figure', src: 'img/work/merkle/affinity.png', caption: 'Affinity mapping the 150+ conversations', ratio: '4928/4372' },
          {
            kind: 'list',
            title: 'How might we',
            items: [
              'How might we reduce campaign creation time?',
              'How might we simplify audience segmentation?',
              'How might we improve collaboration?',
              'How might we surface insights earlier?',
              'How might we reduce navigation complexity?',
            ],
          },
        ],
      },
      {
        id: 'principles',
        label: 'Principles',
        heading: 'Five rules that filtered every decision',
        blocks: [
          {
            kind: 'principles',
            items: [
              { no: '01', name: 'Progressive Disclosure', body: 'One decision at a time.' },
              { no: '02', name: 'Task-first Navigation', body: 'Users think in outcomes, not modules.' },
              { no: '03', name: 'Single Source of Truth', body: 'Every campaign lives in one workspace.' },
              { no: '04', name: 'Design for Scale', body: 'Enterprise complexity without overwhelm.' },
              { no: '05', name: 'Data with Context', body: 'Every metric answers a business question.' },
            ],
          },
        ],
      },
      {
        id: 'ia',
        label: 'Information architecture',
        heading: 'From feature list to campaign lifecycle',
        blocks: [
          {
            kind: 'compare',
            title: 'The navigation, before and after',
            items: [
              { name: 'Before · feature-based', good: 'Dashboards, Audiences, Journeys, Messages', gap: 'Approvals, Analytics, Assets, Settings · eight modules named for what they contain, not what the user is trying to do' },
              { name: 'After · task-based', good: 'Plan, Build, Review, Launch', gap: 'Monitor, Optimize, Report · seven stages named for where the user is in the campaign’s life' },
            ],
          },
          { kind: 'figure', src: 'img/work/merkle/ia-1.png', caption: 'The sitemap, reorganised around the campaign lifecycle', ratio: '4715/1960' },
          { kind: 'figure', src: 'img/work/merkle/ia-2.png', caption: 'Feature list to lifecycle', ratio: '4960/1274' },
          {
            kind: 'split',
            title: 'Sarah’s journey · Marketing Manager',
            items: [
              { label: '01 · Morning dashboard', body: 'Reviews campaign health and risks.' },
              { label: '02 · Campaign creation', body: 'Captures goal, channel, and timing.' },
              { label: '03 · Audience & journey', body: 'Builds segments and cross-channel flow.' },
              { label: '04 · Content & review', body: 'Previews content, resolves comments.' },
              { label: '05 · Launch & monitor', body: 'Approves, launches, watches delivery.' },
              { label: '06 · Optimize & report', body: 'Tests variants, prepares readouts.' },
            ],
          },
        ],
      },
      {
        id: 'shipped',
        label: 'What shipped',
        heading: 'Twelve screens, one workspace',
        blocks: [
          { kind: 'figure', src: 'img/work/merkle/shipped-1.png', caption: 'The shipped workspace', ratio: '4960/1840' },
          { kind: 'figure', src: 'img/work/merkle/dashboard-1.png', caption: 'Dashboard · KPIs appear first so teams have operational awareness before task execution', ratio: '4080/2537' },
          { kind: 'figure', src: 'img/work/merkle/dashboard-2.png', caption: 'Dashboard, continued', ratio: '3938/2537' },
          { kind: 'figure', src: 'img/work/merkle/campaign-library.png', caption: 'Campaign Library · optimized for scanning: status, owner, channel mix, and pending actions', ratio: '4083/3091' },
          { kind: 'figure', src: 'img/work/merkle/wizard.png', caption: 'Campaign Wizard · progressive disclosure guides setup one decision at a time', ratio: '3950/3312' },
          { kind: 'figure', src: 'img/work/merkle/audience-builder.png', caption: 'Audience Builder · visual filtering makes segmentation logic readable and testable', ratio: '3922/3113' },
          { kind: 'figure', src: 'img/work/merkle/journey-builder.png', caption: 'Journey Builder · drag-and-drop orchestration across Email, SMS, Push, and In-App', ratio: '5120/3146' },
          { kind: 'figure', src: 'img/work/merkle/review.png', caption: 'Review Screen · consolidates content, audience, and approvals for launch confidence', ratio: '3664/2371' },
          { kind: 'figure', src: 'img/work/merkle/monitoring.png', caption: 'Live Monitoring · delivery health and anomalies surfaced for operational awareness', ratio: '4944/2998' },
          { kind: 'figure', src: 'img/work/merkle/analytics.png', caption: 'Analytics · turns performance data into a story that supports optimization', ratio: '3544/2047' },
          { kind: 'figure', src: 'img/work/merkle/experiments.png', caption: 'Experiments · variant comparison and learnings support continuous optimization', ratio: '5120/3281' },
          { kind: 'figure', src: 'img/work/merkle/approvals.png', caption: 'Approvals · owners, deadlines, and audit trail improve governance', ratio: '3163/2009' },
          { kind: 'figure', src: 'img/work/merkle/comments.png', caption: 'Comments · contextual collaboration keeps feedback inside the campaign', ratio: '4056/2443' },
          { kind: 'figure', src: 'img/work/merkle/asset-library.png', caption: 'Asset Library · centralizes reusable marketing assets across teams', ratio: '3708/2885' },
        ],
      },
      {
        id: 'design-system',
        label: 'Design system',
        heading: 'Tokens that kept 12 releases consistent',
        blocks: [
          {
            kind: 'split',
            title: 'Typography',
            items: [
              { label: 'Geist Display', body: 'Headlines.' },
              { label: 'Inter', body: 'Body.' },
              { label: 'JetBrains Mono', body: 'Data.' },
            ],
          },
          {
            kind: 'split',
            title: 'Spacing, colour, accessibility',
            items: [
              { label: 'Spacing', body: '8px base unit, 16px card radius, 96px section.' },
              { label: 'Colour', body: 'Navy, red, teal, orange, purple.' },
              { label: 'Accessibility', body: 'WCAG 2.1 AA, focus states, keyboard nav.' },
            ],
          },
          { kind: 'figure', src: 'img/work/merkle/shipped-2.png', caption: 'The system applied across the workspace', ratio: '4960/1840' },
        ],
      },
      {
        id: 'impact',
        label: 'Impact',
        heading: 'Measurable results across the platform',
        blocks: [
          {
            kind: 'split',
            title: '',
            items: [
              { label: '22%', body: 'Increase in engagement.' },
              { label: 'Faster', body: 'Campaign setup.' },
              { label: 'Fewer', body: 'Support tickets.' },
              { label: 'Higher', body: 'Platform adoption.' },
            ],
          },
          {
            kind: 'quote',
            body: 'The new workspace is calmer, more predictable, and finally matches how we actually plan campaigns.',
            source: 'Director of Marketing, enterprise client',
          },
        ],
      },
      {
        id: 'reflection',
        label: 'Reflection',
        heading: 'Complexity, made trustworthy',
        blocks: [
          {
            kind: 'text',
            body: [
              'This project reinforced that enterprise UX is not about making complexity disappear, it is about making complexity understandable and trustworthy.',
              'Progressive disclosure became the core strategy because it respected both marketers who needed speed and enterprises who needed governance.',
              'Future opportunities include AI-assisted campaign recommendations, predictive audience insights, and intelligent automation for journey optimization.',
            ],
          },
        ],
      },
    ],
  },

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
    client: 'Anthem Nation, with Tyi Moncrieffe',
    kind: 'project',
    thumb: 'img/harmoney/card.png',
    hero: 'img/harmoney/hero.png',
    accent: '#2D4A1E',
    duration: 'Dec 2025, Jun 2026',
    sections: HARMONEY_SECTIONS,
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
    client: 'Vesseli, UK, with Laurence McRory',
    duration: '3 months',
    kind: 'project',
    thumb: 'img/work/vesseli-card.png',
    hero: 'img/work/vesseli/hero.png',
    accent: '#2b6c8f',
    sections: [
      {
        id: 'background',
        label: 'Background',
        heading: 'A clear vision without the structure to carry it',
        blocks: [
          { kind: 'figure', src: 'img/work/vesseli/hero.png', caption: 'The redesigned Vesseli app', ratio: '4/3' },
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
          { kind: 'figure', src: 'img/work/vesseli/opportunity.png', caption: 'Feed and boat screens from the redesign', ratio: '4/3' },
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
          { kind: 'figure', src: 'img/work/vesseli/problem.png', caption: 'The existing app: functional, unstructured, hard to trust', ratio: '4/3' },
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
            source: 'Usability test, SeaPeople, a competing maritime hiring platform',
          },
          {
            kind: 'text',
            body: [
              'Testing revealed that while the platform enables hiring, it lacks clear trust indicators and structured profiles. Users struggle to confidently evaluate crew members, which slows decisions. The absence of strong visual hierarchy and credibility signals increases cognitive load and reduces engagement.',
            ],
          },
          { kind: 'figure', src: 'img/work/vesseli/research-1.png', caption: 'Competitive review across maritime and gig platforms', ratio: '2912/1960' },
          { kind: 'figure', src: 'img/work/vesseli/research-2.png', caption: 'What the review surfaced', ratio: '1230/1141' },
          { kind: 'figure', src: 'img/work/vesseli/seapeople.webp', caption: 'Usability test · SeaPeople, a competing maritime hiring app', ratio: '1200/630' },
          {
            kind: 'list',
            title: 'Requirements, defined by Laurence',
            items: [
              'Enable boat owners to hire crew efficiently.',
              'Allow crew to showcase experience and availability.',
              'Support delivery skippers and service providers.',
              'Keep the experience simple and mobile-first.',
              'Ensure the product feels professional and reliable.',
            ],
          },
          { kind: 'figure', src: 'img/work/vesseli/requirements.png', caption: 'The requirements, agreed with the CEO', ratio: '4/3' },
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
            title: 'Boat owner, primary persona',
            items: [
              'Goals: find reliable crew quickly, evaluate credibility with confidence, manage hiring without friction.',
              'Pain points: lack of trustworthy information, time-consuming communication, unclear hiring processes.',
              'Needs: clear profiles, a simple hiring flow, strong trust indicators.',
            ],
          },
          { kind: 'figure', src: 'img/work/vesseli/persona.png', caption: 'The boat owner, primary persona', ratio: '5024/2408' },
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
          { kind: 'figure', src: 'img/work/vesseli/design-system.png', caption: 'The design system: a beachy, harbour-inspired theme within the client’s main colour', ratio: '2048/2005' },
          { kind: 'figure', src: 'img/work/vesseli/design-1.png', caption: 'Before and after: generic utility to a structured maritime product', ratio: '1459/1063' },
          { kind: 'figure', src: 'img/work/vesseli/design-2.png', caption: 'Role-based onboarding and trust-driven profiles', ratio: '4/3' },
          { kind: 'figure', src: 'img/work/vesseli/design-3.png', caption: 'The simplified hiring flow', ratio: '4/3' },
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
    thumb: 'img/work/forecash-card.png',
    hero: 'img/work/forecash/hero.png',
    accent: '#8a5a2b',
    sections: [
      {
        id: 'background',
        label: 'Background',
        heading: 'Most finance apps show you the past',
        blocks: [
          { kind: 'figure', src: 'img/work/forecash/hero.png', caption: 'ForeCash · forecast, plan and track with AI guidance', ratio: '7680/5364' },
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
          { kind: 'figure', src: 'img/work/forecash/personas.png', caption: 'Jesse and Caitlyn, the early persona sketches', ratio: '5500/4108' },
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
          { kind: 'figure', src: 'img/work/forecash/problem.png', caption: 'Tracking without guidance: the gap the product had to close', ratio: '4800/3092' },
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
            source: 'Usability test #1, Erica AI, Bank of America',
          },
          {
            kind: 'quote',
            body: 'The AI responds in a friendly and engaging way, but it cannot give me a personalised forecast or plan based on my specific situation. It feels like I am getting generic advice instead of something tailored to me.',
            source: 'Usability test #2, Cleo AI',
          },
          {
            kind: 'text',
            body: [
              'Together those tests set the bar: financial wellness tools have to accept a question in the user’s own words, and answer it with something specific to them.',
            ],
          },
          { kind: 'figure', src: 'img/work/forecash/journey.png', caption: 'The customer journey map the themes shaped', ratio: '3778/1940' },
          { kind: 'figure', src: 'img/work/forecash/test-erica.png', caption: 'Usability test #1 · Erica AI, Bank of America', ratio: '794/742', layout: 'horizontal' },
          { kind: 'figure', src: 'img/work/forecash/test-cleo.png', caption: 'Usability test #2 · Cleo AI', ratio: '750/740', layout: 'horizontal' },
          {
            kind: 'list',
            title: 'Requirements, from what users actually asked for',
            items: [
              'An interactive AI to ask for financial advice.',
              'A clear visual of their finances.',
              'Specific targets they can set through the AI chat.',
              'Progress tracking against each goal.',
              'A plan that adjusts when circumstances change.',
              'A clear transaction history.',
              'Who owes them, and who they owe.',
              'A minimal chat, to the point.',
              'A clear, easy onboarding.',
            ],
          },
          { kind: 'figure', src: 'img/work/forecash/requirements.png', caption: 'The requirements list, from the discovery notes', ratio: '3/2' },
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
              'Young professionals (22 to 35) juggling irregular income.',
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
          { kind: 'figure', src: 'img/work/forecash/persona.png', caption: 'Emily · built from usability tests and affinity mapping', ratio: '1829/1313' },
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
              'The build covers two onboarding directions, a clean authentic version and an illustrated one, plus authentication, dashboard, goals and transactions, profile, security and analytics, and a conversational AI layer that offers suggestions, reminders and nudges.',
            ],
          },
          { kind: 'figure', src: 'img/work/forecash/ai-1.png', caption: 'The AI chat creates and adjusts plans while the dashboard tracks the rest', ratio: '3/2' },
          { kind: 'figure', src: 'img/work/forecash/ai-3.png', caption: 'From simple tracker to adaptive partner', ratio: '1/1' },
          { kind: 'figure', src: 'img/work/forecash/design-system.png', caption: 'The ForeCash design system', ratio: '2048/1256', bg: '#FFFFFF' },
          { kind: 'figure', src: 'img/work/forecash/onboarding.png', caption: 'Two onboarding directions: authentic and illustrated', ratio: '3796/2479' },
          { kind: 'figure', src: 'img/work/forecash/dashboard.png', caption: 'Authentication into a dashboard of balance, subscriptions and transactions', ratio: '3735/2593' },
          { kind: 'figure', src: 'img/work/forecash/goals.png', caption: 'Goals with progress tracking, and transaction entry that confirms before it commits', ratio: '3796/2593' },
          { kind: 'figure', src: 'img/work/forecash/profile.png', caption: 'Profile, security and analytics tied back to savings goals', ratio: '3796/2593' },
          { kind: 'figure', src: 'img/work/forecash/ai-interaction.png', caption: 'The AI layer: suggestions, reminders and nudges in the user’s own words', ratio: '5760/2460' },
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

  // ── Spotify Alter ──────────────────────────────────────────────────────
  {
    slug: 'spotify-alter',
    name: 'Spotify Alter',
    title: 'Change the sound, not the record',
    summary:
      'A concept feature letting listeners change the pitch, speed and tone of a track and keep that version, settings, not a copy, so the artist keeps the stream and the royalty. Designed and built end to end, including a working audio engine.',
    year: '2026',
    industry: 'Concept · Consumer audio',
    role: 'Product Designer, and build',
    client: 'Self-directed',
    kind: 'project',
    // Animated Spotify Syncro card GIF
    thumb: 'img/blog/spotify-syncro-card.gif',
    hero: 'img/blog/spotify-syncro-hero.png',
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
              'It uses WSOLA time-stretching with a separate resampling stage, the same decomposition BASS_FX exposes as two independent attributes. Moving one control cannot move the other, verified offline to within fourteen cents of pitch and 0.4% of duration across eight combinations.',
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

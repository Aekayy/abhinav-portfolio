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
  | { kind: 'quote'; body: string; source?: string; weight?: 'normal' | 'bold' }
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
   | { kind: 'figure'; src: string; caption?: string; ratio?: string; bg?: string; fit?: 'cover' | 'contain'; layout?: 'default' | 'horizontal'; quickRead?: boolean; fullscreen?: boolean; scrollable?: boolean }
  /**
   * Real product screens, shown at the size they were drawn.
   *
   * Separate from `figure` because a screen is not a picture. A 402x874 phone
   * dropped into a 16/9 panel is either letterboxed into a stamp or cropped
   * through its own chrome, and both read as carelessness in a portfolio whose
   * whole subject is care. This block knows the device, so the frame follows
   * the artwork instead of the artwork fighting the frame.
   *
   * Phones sit up to three across; a desktop screen takes the full width.
   */
   | { kind: 'screens'; device: 'phone' | 'web'; title?: string; items: { src: string; caption?: string }[]; quickRead?: boolean }

export type Section = {
  id: string
  label: string
  heading: string
  blocks: Block[]
  /**
   * The section in two or three lines, for Quick read.
   *
   * Written alongside the prose rather than extracted from it: a first
   * sentence is an opening, not a summary, and machine-trimming this would
   * produce exactly the "text noise" the short version exists to remove.
   *
   * A section with no `tldr` still appears in Quick read — heading, and its
   * figures — because a missing summary should cost the reader a paragraph,
   * never a whole step of the argument.
   */
  tldr?: string[]
}

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
      'A unified enterprise platform that lets marketing teams plan, launch, monitor and optimize omnichannel campaigns from a single workspace.',
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
        tldr: [
          'ECO is where a campaign manager reaches lapsed customers across email, SMS and push, in four markets, with consent honored and budget signed off.',
          'Inconsistent patterns and poor architecture slowed every role down, from campaign managers to legal reviewers.',
          '150+ enterprise users researched, three agile squads, 22% increase in engagement, WCAG 2.1 AA.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'A campaign manager at a global retailer needs to reach lapsed customers across email, SMS and push, in four markets, with consent honored and a budget signed off. ECO is where that happens end to end.',
              'Inconsistent UI patterns, poor information architecture, and cognitive overload slowed every team down, from campaign managers to legal reviewers.',
            ],
          },
          {
            kind: 'screens', device: 'web',
            items: [
              { src: 'img/work/merkle/screens/01-home-single-pane-of-glass.webp', caption: 'The single pane of glass that replaced fourteen screens' },
            ],
          },
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
        tldr: [
          'Launching one campaign meant crossing fourteen disconnected screens, from strategy intake to analytics.',
          '60% of users got lost inside advanced filtering, support tickets ran high, and new users faced a steep curve.',
        ],
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
          { kind: 'figure', src: 'img/work/merkle/research-1.png', caption: 'Mapping every type of user’s journey, categorized by empathy', ratio: '4960/656' },
          { kind: 'figure', src: 'img/work/merkle/research-2.png', caption: 'The end-to-end orchestration lifecycle', ratio: '4960/948' },
          { kind: 'figure', src: 'img/work/merkle/research-3.png', caption: 'Where the fourteen steps hurt most', ratio: '4960/648' },
        ],
      },
      {
        id: 'users',
        label: 'Who it is for',
        heading: 'Six roles, one campaign workspace',
        tldr: [
          'Six roles share one campaign: marketing manager, campaign manager, CRM specialist, analyst, director and legal reviewer.',
          'Their pain points are different but rhyme: low visibility, fragile handoffs, filters nobody trusts, and no audit history.',
        ],
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
        label: 'What research showed',
        heading: 'Grounded in 150+ enterprise conversations',
        tldr: [
          'Interviews, usability testing, heatmaps, analytics, journey mapping, competitive and affinity analysis across 150+ users.',
          'Four findings drove everything after: marketers think in workflows rather than features, they switch dashboards constantly, they need progressive guidance, and approvals are the bottleneck.',
        ],
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
        label: 'Design principles',
        heading: 'Five rules that filtered every decision',
        tldr: [
          'Progressive disclosure, task-first navigation, a single source of truth, design for scale, and data with context.',
          'Agreed before the screens, so later arguments were settled against the rules rather than against taste.',
        ],
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
        tldr: [
          'Eight modules named for what they contained became seven stages named for where the user is: Plan, Build, Review, Launch, Monitor, Optimize, Report.',
          'That single change is what collapsed the fourteen steps, because the navigation finally matched how a campaign actually moves.',
        ],
        blocks: [
          {
            kind: 'compare',
            title: 'The navigation, before and after',
            items: [
              { name: 'Before · feature-based', good: 'Dashboards, Audiences, Journeys, Messages', gap: 'Approvals, Analytics, Assets, Settings · eight modules named for what they contain, not what the user is trying to do' },
              { name: 'After · task-based', good: 'Plan, Build, Review, Launch', gap: 'Monitor, Optimize, Report · seven stages named for where the user is in the campaign’s life' },
            ],
          },
          { kind: 'figure', src: 'img/work/merkle/ia-1.png', caption: 'The sitemap, reorganized around the campaign lifecycle', ratio: '4715/1960' },
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
        tldr: [
          'Twelve screens covering the whole lifecycle: dashboard, campaign library, wizard, audience and journey builders, review, live monitoring, analytics, experiments, approvals, comments and the asset library.',
          'Each one answers a principle. The wizard discloses one decision at a time; the library is built for scanning; approvals carry owners, deadlines and an audit trail.',
        ],
        blocks: [
          {
            kind: 'screens', device: 'web',
            title: 'Plan and build',
            items: [
              { src: 'img/work/merkle/screens/01-home-single-pane-of-glass.webp', caption: 'Home · KPIs first, so teams have operational awareness before they start executing' },
              { src: 'img/work/merkle/screens/12-campaign-library.webp', caption: 'Campaign Library · built for scanning: status, owner, channel mix and pending actions' },
              { src: 'img/work/merkle/screens/02-build-audience.webp', caption: 'Audience Builder · visual filtering makes segmentation logic readable and testable' },
              { src: 'img/work/merkle/screens/03-create-campaign-content-step.webp', caption: 'Campaign Wizard · progressive disclosure guides setup one decision at a time' },
              { src: 'img/work/merkle/screens/14-email-builder.webp', caption: 'Email Builder · content assembled where the campaign already lives' },
            ],
          },
          {
            kind: 'screens', device: 'web',
            title: 'Review, launch and govern',
            items: [
              { src: 'img/work/merkle/screens/15-pre-flight-review.webp', caption: 'Pre-flight review · content, audience and approvals consolidated for launch confidence' },
              { src: 'img/work/merkle/screens/16-approval-pipeline.webp', caption: 'Approval pipeline · owners, deadlines and an audit trail, which is what unblocked the bottleneck' },
              { src: 'img/work/merkle/screens/04-review-and-approve.webp', caption: 'Review and approve, with the comment thread kept inside the campaign' },
              { src: 'img/work/merkle/screens/05-approve-on-mobile-375px.webp', caption: 'Approve at 375px · approvals were the bottleneck, and reviewers are rarely at a desk' },
            ],
          },
          {
            kind: 'screens', device: 'web',
            title: 'Monitor, measure and optimize',
            items: [
              { src: 'img/work/merkle/screens/17-measure-live-monitoring.webp', caption: 'Live monitoring · delivery health and anomalies surfaced as they happen' },
              { src: 'img/work/merkle/screens/18-measure-campaign-analytics.webp', caption: 'Analytics · performance turned into a story that supports the next decision' },
              { src: 'img/work/merkle/screens/19-experiments.webp', caption: 'Experiments · variant comparison and the learning written down' },
              { src: 'img/work/merkle/screens/23-asset-library.webp', caption: 'Asset Library · reusable marketing assets, centralized across teams' },
            ],
          },
          {
            kind: 'screens', device: 'web',
            title: 'The states nobody demos',
            items: [
              { src: 'img/work/merkle/screens/21-empty-and-system-states.webp', caption: 'Empty and system states, designed rather than inherited' },
              { src: 'img/work/merkle/screens/24-settings-roles-and-permissions.webp', caption: 'Roles and permissions · six roles need six different views of the same campaign' },
            ],
          },
        ],
      },
      {
        id: 'design-system',
        label: 'Design system',
        heading: 'Tokens that kept 12 releases consistent',
        tldr: [
          'Geist Display for headlines, Inter for body, JetBrains Mono for data, on an 8px base unit.',
          'WCAG 2.1 AA with focus states and keyboard navigation built in rather than audited afterwards.',
        ],
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
            title: 'Spacing, color, accessibility',
            items: [
              { label: 'Spacing', body: '8px base unit, 16px card radius, 96px section.' },
              { label: 'Color', body: 'Navy, red, teal, orange, purple.' },
              { label: 'Accessibility', body: 'WCAG 2.1 AA, focus states, keyboard nav.' },
            ],
          },
          {
            kind: 'screens', device: 'web',
            items: [
              { src: 'img/work/merkle/screens/20-notification-centre.webp', caption: 'The system applied: one set of tokens across every surface' },
            ],
          },
        ],
      },
      {
        id: 'impact',
        label: 'Impact',
        heading: 'Measurable results across the platform',
        tldr: [
          '22% increase in engagement, faster campaign setup, fewer support tickets and higher platform adoption.',
          'The client’s own read: calmer, more predictable, and finally matching how they actually plan campaigns.',
        ],
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
        tldr: [
          'Enterprise UX is not making complexity disappear. It is making complexity understandable and trustworthy.',
          'Progressive disclosure won because it served both sides at once: marketers who needed speed, and the enterprise that needed governance.',
        ],
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
        label: 'Context',
        heading: 'A clear vision without the structure to carry it',
        tldr: [
          'Vesseli helps boat owners hire crew, coordinate deliveries and manage short-term maritime work. I worked directly with the CEO after reaching out to him.',
          'The product had a clear vision and lacked usability, structure and engagement.',
          'A large market with rising demand for flexible crew hiring, and almost no modern digital tooling serving it.',
        ],
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
        tldr: [
          'Unclear navigation, no visual hierarchy, and unstructured profiles that gave people nothing to judge.',
          'The cost was hesitation: users could not finish key actions, and hiring decisions were made without confidence.',
        ],
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
        tldr: [
          'Improve usability, give the product a visual identity, simplify hiring, and build trust through structure.',
          'Priority order was set deliberately: the core hiring flow first, then onboarding and role clarity, then profile trust, then navigation.',
        ],
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
            title: 'Prioritizing the problem',
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
        label: 'What research showed',
        heading: 'Trust is what people are actually judging',
        tldr: [
          'Founder conversations, a teardown of the existing product, and a competitive review across maritime and gig platforms.',
          'Testing a competitor surfaced the real blocker: people could hire, but could not tell who to trust or how to choose.',
          'Credibility is carried by structure. Missing hierarchy reads as missing reliability, and hesitation follows.',
        ],
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
        label: 'Who it is for',
        heading: 'Four segments, one primary persona',
        tldr: [
          'Four segments share the app: boat owners, crew, delivery skippers and service providers.',
          'The boat owner is primary. They need to find reliable crew quickly and judge credibility with confidence, which is exactly what the old profiles prevented.',
        ],
        blocks: [
          {
            kind: 'split',
            title: 'User segments',
            items: [
              { label: 'Boat owners', body: 'Hire crew and manage operations.' },
              { label: 'Crew members', body: 'Find jobs and build reputation.' },
              { label: 'Delivery skippers', body: 'Manage vessel transport.' },
              { label: 'Service providers', body: 'Offer specialized services.' },
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
        label: 'Design decisions',
        heading: 'Four moves',
        tldr: [
          'Role-based onboarding that names intent early, so the app can personalize from the first screen.',
          'Profiles rebuilt around experience, credentials and availability, because that is what a hiring decision actually rests on.',
          'A shorter hiring flow, and a harbor-inspired identity that makes the product feel like it belongs to its industry.',
        ],
        blocks: [
          {
            kind: 'split',
            title: 'The four decisions',
            items: [
              { label: 'Role-based experience', body: 'Structured onboarding defines user intent early and personalises the experience.' },
              { label: 'Trust-driven profiles', body: 'Profiles redesigned around experience, credentials, availability and a clear hierarchy of information.' },
              { label: 'Simplified hiring flow', body: 'Reduced complexity in searching, evaluating, requesting and confirming jobs.' },
              { label: 'Visual identity revamp', body: 'A beachy, harbor-inspired theme that reflects the maritime context and creates a calmer, more engaging experience.' },
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
          { kind: 'figure', src: 'img/work/vesseli/design-1.png', caption: 'Before and after: generic utility to a structured maritime product', ratio: '1459/1063' },
          { kind: 'figure', src: 'img/work/vesseli/design-2.png', caption: 'Role-based onboarding and trust-driven profiles', ratio: '4/3' },
          { kind: 'figure', src: 'img/work/vesseli/design-3.png', caption: 'The simplified hiring flow', ratio: '4/3' },
        ],
      },
      {
        id: 'design-system',
        label: 'Design system',
        heading: 'One theme, applied consistently',
        tldr: [
          'A beachy, harbor-inspired palette built inside the client’s existing brand color rather than beside it.',
          'Card layouts, spacing and type were standardized so profiles and listings read the same everywhere.',
        ],
        blocks: [
          { kind: 'figure', src: 'img/work/vesseli/design-system.png', caption: 'The design system: a beachy, harbor-inspired theme within the client’s main color', ratio: '2048/2005' },
        ],
      },
      {
        id: 'conclusion',
        label: 'Outcome',
        heading: 'From functional to trusted',
        tldr: [
          'A structured, engaging platform where the workflows are clear and the information is enough to decide on.',
          'Currently under development as the next version of the product.',
        ],
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
        label: 'Context',
        heading: 'Most finance apps show you the past',
        tldr: [
          'Finance apps lean on charts, surface problems without guidance, and assume you already read balance sheets comfortably.',
          'The opening question: how might we help people feel in control of their money without overwhelming them?',
        ],
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
            weight: 'bold',
          },
          { kind: 'figure', src: 'img/work/forecash/personas.png', caption: 'Dashboard Web Version', ratio: '5500/4108', fit: 'contain', bg: '#FFFFFF' },
        ],
      },
      {
        id: 'problem',
        label: 'The problem',
        heading: 'People know what they earn. They struggle to save on purpose',
        tldr: [
          'Budgeting tools track spending well and guide intent badly.',
          'People know what they earn and what they spend. Saving on purpose, toward something like debt repayment or travel, is where they stall.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'Traditional budgeting tools focus on tracking spending but fail to guide users with purpose or help them stay motivated.',
              'People know what they earn and what they spend, but they struggle with saving intentionally or working toward meaningful milestones like starting a business, paying off student debt, or traveling the world.',
            ],
          },
          { kind: 'figure', src: 'img/work/forecash/problem.png', caption: 'Tracking without guidance: the gap the product had to close', ratio: '4800/3092' },
        ],
      },
      {
        id: 'goals',
        label: 'Goals',
        heading: 'What the work had to move',
        tldr: [
          'Four targets: engagement and retention, onboarding drop-off, goal completion, and clearer value on the marketing site.',
          'The highest-friction moment turned out to be interpreting a forecast and acting on it, confirmed by interviews, session recordings and funnel data.',
          'Trade-off accepted: less on screen at once, and a guided path ahead of power-user shortcuts.',
        ],
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
              { label: 'Progressive disclosure over shortcuts', body: 'Prioritized a guided path over power-user shortcuts.' },
            ],
          },
        ],
      },
      {
        id: 'research',
        label: 'What research showed',
        heading: 'People want a partner, not a ledger',
        tldr: [
          'Two competitor tests set the bar. Erica only accepted preset questions; Cleo answered warmly but gave everyone the same generic advice.',
          'So an assistant here has to take a question in the user’s own words and answer it with something specific to them.',
          'Affinity mapping turned community complaints into themes, which shaped the journey map and a nine-item requirements list.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'I analyzed financial discussions across communities where people expressed frustration with tools that only track historical spending without helping them anticipate or plan ahead.',
              'Affinity mapping organized those insights into clear themes, revealing financial needs, behaviors and decision-making triggers, which then shaped the customer journey map.',
            ],
          },
          {
            kind: 'quote',
            body: 'I tried asking the AI about my financial goals in my own words, but it only offered a few preset questions to choose from. When I typed anything outside those options, it could not give me an answer.',
            source: 'Usability test #1, Erica AI, Bank of America',
          },
          {
            kind: 'quote',
            body: 'The AI responds in a friendly and engaging way, but it cannot give me a personalized forecast or plan based on my specific situation. It feels like I am getting generic advice instead of something tailored to me.',
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
            kind: 'split',
            title: 'Research & Insights',
            items: [
              { label: 'Field & Behavioral Discovery', body: 'I analyzed financial discussions across communities where people expressed frustration with existing financial tools that focus only on tracking historical spending without helping them anticipate or plan ahead.' },
              { label: 'Key Insights', body: 'Users want a partner-like financial experience, not a ledger. They want something that tells them what is likely to happen with their money, and how to reach their goal with simple steps.' },
            ],
          },
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
        label: 'Who it is for',
        heading: 'Young professionals with irregular income',
        tldr: [
          'Young professionals, 22 to 35, on irregular income who want clarity rather than a strict budget.',
          'They need to see where cash flow is heading, in visuals that do not assume financial literacy, with a next step attached.',
        ],
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
              'Personalized advice and next-step suggestions.',
            ],
          },
          { kind: 'figure', src: 'img/work/forecash/persona.png', caption: 'Emily · built from usability tests and affinity mapping', ratio: '1829/1313' },
        ],
      },
      {
        id: 'design-decisions',
        label: 'Design decisions',
        heading: 'Three decisions the rest of the product rests on',
        tldr: [
          'Summaries first and details on demand, so a forecast never opens as a wall of numbers.',
          'Scenarios sit side by side rather than one after another, because comparing two futures from memory is the thing people get wrong.',
          'Every forecast says why it changed, so the assistant is checkable rather than trusted on faith.',
        ],
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
        ],
      },
      {
        id: 'solution',
        label: 'The solution',
        heading: 'Guidance instead of raw numbers',
        tldr: [
          'A conversational assistant creates and adjusts plans in the user’s own words, while the dashboard holds goals, transactions, security and analytics.',
          'Two onboarding directions were built, a clean one and an illustrated one, so the choice could be made against real screens.',
          'Flows, assumptions and reasoning got the attention rather than visual polish.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'Instead of overwhelming users with raw numbers, the design guides them toward actionable understanding. I focused more on flows, assumptions and reasoning than on visual polish, mirroring real-world product problem solving.',
              'The build covers two onboarding directions, a clean authentic version and an illustrated one, plus authentication, dashboard, goals and transactions, profile, security and analytics, and a conversational AI layer that offers suggestions, reminders and nudges.',
            ],
          },
          {
            kind: 'screens', device: 'phone',
            title: 'Safe to spend today, and the goal it is protecting',
            quickRead: true,
            items: [
              { src: 'img/work/forecash/screens/15-home.webp', caption: 'Home leads with what is safe to spend, not the balance' },
              { src: 'img/work/forecash/screens/16-goals.webp', caption: 'Goals, with pace against plan' },
              { src: 'img/work/forecash/screens/17-goal-detail.webp', caption: 'A goal in detail, and what moved its date' },
            ],
          },
          {
            kind: 'screens', device: 'phone',
            title: 'The assistant, in four states',
            quickRead: true,
            items: [
              { src: 'img/work/forecash/screens/19a-ask-empty.webp', caption: 'What it can see, before you ask anything' },
              { src: 'img/work/forecash/screens/19c-ask-thinking.webp', caption: 'Reading the plan, with its sources named' },
              { src: 'img/work/forecash/screens/19d-ask-cuts.webp', caption: 'Three cuts, each with what it frees' },
              { src: 'img/work/forecash/screens/19e-ask-applied.webp', caption: 'Applied, with the new date and an undo' },
            ],
          },
          {
            kind: 'screens', device: 'phone',
            title: 'Budget, analytics and accounts',
            items: [
              { src: 'img/work/forecash/screens/21-budget.webp', caption: 'Budget against pace, not just against limits' },
              { src: 'img/work/forecash/screens/22-analytics.webp', caption: 'Every chart states its finding in words' },
              { src: 'img/work/forecash/screens/23-my-accounts.webp', caption: 'Accounts with 30 day balance and month flow' },
            ],
          },
          {
            kind: 'screens', device: 'phone',
            title: 'Onboarding, one decision per step',
            items: [
              { src: 'img/work/forecash/screens/02-onboarding-tracking.webp', caption: 'Tracking' },
              { src: 'img/work/forecash/screens/03-onboarding-payments.webp', caption: 'Payments' },
              { src: 'img/work/forecash/screens/04-onboarding-insights.webp', caption: 'Insights' },
            ],
          },
          {
            kind: 'screens', device: 'web',
            title: 'The same plan on desktop',
            items: [
              { src: 'img/work/forecash/screens/w1-overview.webp', caption: 'Overview: safe to spend, goals in progress, and the day’s activity' },
              { src: 'img/work/forecash/screens/w5-analytics.webp', caption: 'Analytics, with the reading under every chart' },
              { src: 'img/work/forecash/screens/w14-ask-applied.webp', caption: 'The assistant applying a change, with the plan diff shown' },
            ],
          },
          { kind: 'figure', src: 'img/work/forecash/design-system.png', caption: 'The ForeCash design system', ratio: '2048/1256', bg: '#FFFFFF', quickRead: true, scrollable: true },
        ],
      },
      {
        id: 'conclusion',
        label: 'Outcome',
        heading: 'From tracker to adaptive partner',
        tldr: [
          'Usability feedback moved it from a tracker that reports the past to a partner that adjusts the plan when circumstances change.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'Over four months I took ForeCash from a blank Figma file to a fully built product, end to end. I ran the research, wrote the requirements, designed the flows, built the design system, and shipped the final screens for both mobile and web.',
              'The work covered the full product surface: authentication, onboarding, dashboard, goals, transactions, profile, security, analytics, and the conversational AI layer that ties it all together.',
              'The hardest call was choosing what not to build. I traded density for clarity, shortcuts for a guided path, and visual polish for flows that actually hold up under stress.',
              'Feedback from usability testing shaped the final iteration of ForeCash into a platform that not only forecasts savings but actively motivates users to achieve their biggest financial goals.',
            ],
          },
        ],
      },
    ],
  },

  // ── Spotify Vibe ───────────────────────────────────────────────────────
  // The feature is named Vibe. The slug and the live build's domain both still
  // read "spotify-alter": the slug because shared links to this study should
  // keep working, the domain because it is a separate deployment. Rename both
  // together or not at all — a slug that no longer matches its deployment is
  // worse than one that no longer matches its title.
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
      label: 'View Full Case Study & Live Build',
      note: 'Its own repository and deployment, linked rather than folded in.',
    },
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        heading: 'People already alter music. Somewhere else',
        tldr: [
          'Sped up and slowed versions pull enormous numbers on video platforms, so the demand is settled.',
          'Every one of them is a re-upload, which pays the uploader rather than the artist.',
          'Spotify already has the tools. The equalizer is buried in settings, global, and cannot be saved per song.',
        ],
        blocks: [
          {
            kind: 'list',
            items: [
              'Sped up and slowed versions pull enormous numbers on video platforms. The demand is settled.',
              'Every one of them is a re-upload, which pays whoever uploaded it rather than the artist who made it.',
              'Spotify already has the tools: an equalizer exists in settings. It is buried, global, and cannot be saved per song.',
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
        tldr: [
          'A saved version is about forty bytes of settings, never a copy of the recording. Playback changes on the device; the master is untouched.',
          'That single decision is what makes it licensable: no new copy, no re-upload to police, and the stream still counts for the artist.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'The whole idea rests on one decision: a saved version stores about forty bytes of settings, not a copy of the recording. Playback changes on the listener’s device and the master is untouched.',
              'That is what makes it something a rights holder could say yes to. There is no new copy to license, no re-upload to police, and the stream still counts for the artist who made it.',
            ],
          },
          {
            kind: 'screens', device: 'phone',
            title: 'The track as released, and the sheet that changes how it plays',
            items: [
              { src: 'img/work/spotify-alter/screens/01-now-playing-original.webp', caption: 'Now playing, as the artist released it' },
              { src: 'img/work/spotify-alter/screens/02-vibe-sheet-presets.webp', caption: 'The Vibe sheet · presets for the common cases' },
              { src: 'img/work/spotify-alter/screens/03-vibe-sheet-advanced.webp', caption: 'Advanced · pitch and speed on separate controls' },
            ],
          },
        ],
      },
      {
        id: 'engine',
        label: 'How it was built',
        heading: 'Pitch and speed had to move independently',
        tldr: [
          'A concept claiming you can slow a track without dropping its key has to prove it, so I built the audio engine instead of faking a demo video.',
          'WSOLA time-stretching with a separate resampling stage, verified offline to within fourteen cents of pitch and 0.4% of duration across eight combinations.',
          'Two failures worth naming: linear interpolation was aliasing the top end, and the worklet shipped dead because it was assembled by stringifying a class.',
        ],
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
          {
            kind: 'screens', device: 'phone',
            title: 'Saving a version, and finding it again',
            items: [
              { src: 'img/work/spotify-alter/screens/04-save-your-version.webp', caption: 'Save · forty bytes of settings, not a copy' },
              { src: 'img/work/spotify-alter/screens/05-versions-of-this-song.webp', caption: 'Versions of this song, yours alongside the original' },
              { src: 'img/work/spotify-alter/screens/08-now-playing-yours.webp', caption: 'Now playing, as you set it' },
            ],
          },
        ],
      },
      {
        id: 'outcome',
        label: 'Outcome',
        heading: 'A working thing, not a mockup',
        tldr: [
          'A live site with eight cleared sample tracks and the option to load your own file.',
          'Plus mobile and desktop mockups of the feature inside Spotify’s own design language.',
        ],
        blocks: [
          {
            kind: 'text',
            body: [
              'The result is a live site with eight cleared sample tracks and the option to load your own file, a full case study covering the process, and mobile and desktop mockups of the feature inside Spotify’s own design language.',
            ],
          },
          {
            kind: 'screens', device: 'phone',
            title: 'Onboarding: hear the difference before anything is explained',
            items: [
              { src: 'img/work/spotify-alter/screens/o2-hear-the-difference.webp', caption: 'The demo carries the pitch' },
              { src: 'img/work/spotify-alter/screens/o4-try-it-guided.webp', caption: 'Guided first attempt' },
              { src: 'img/work/spotify-alter/screens/07-your-versions.webp', caption: 'Your versions, collected' },
            ],
          },
          {
            kind: 'screens', device: 'web',
            title: 'And on desktop, inside Spotify’s own design language',
            items: [
              { src: 'img/work/spotify-alter/screens/w2-vibe-customizer-panel.webp', caption: 'The customizer as a panel rather than a sheet' },
              { src: 'img/work/spotify-alter/screens/w3-your-versions.webp', caption: 'Desktop screens' },
            ],
          },
        ],
      },
    ],
  },
]

export const CASE_STUDIES = PROJECTS
export const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)

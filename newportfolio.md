# David Kirschberg — Style Reference
> midnight gallery wall — a darkened room where spotlit work is the only color, and the frame around it is intentionally invisible.

**Theme:** dark

Kirschberg operates as a darkened exhibition space: a near-black canvas (#181818) with a single elevated surface (#262626) hosts colorful project work as the only chromatic event on screen. The interface is deliberately austere — Inter at weight 400 handles all text at 16-17px, while a custom display face (twkLausanne) appears at exactly 32px with aggressive -0.04em tracking for the sole headline. The signature structural shape is the 24px rounded card; there are no shadows, no gradients, and no interface accent color. The portfolio reads as a single horizontal-scroll row where the frame is engineered to disappear so the work is remembered.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Obsidian | `#181818` | `--color-obsidian` | Page canvas, primary background — the dominant surface that recedes so work thumbnails advance |
| Graphite | `#262626` | `--color-graphite` | Elevated surface, card thumbnail backgrounds, and content containers that need to sit one level above the page |
| Bone | `#fafafa` | `--color-bone` | Primary text, hero headlines, card titles — near-white that reads as soft rather than clinical against the dark canvas |
| Ash | `#a3a3a3` | `--color-ash` | Muted secondary text, subtitles, card descriptions — one step quieter than primary text for hierarchy without color |

## Tokens — Typography

### Inter — All body text, subtitles, card titles, UI labels, navigation — single weight (400) across every context, relying on size and color contrast rather than weight shifts for hierarchy · `--font-inter`
- **Substitute:** DM Sans or General Sans
- **Weights:** 400
- **Sizes:** 16px, 17px
- **Line height:** 1.18 / 1.29 / 1.50
- **Letter spacing:** -0.009em
- **Role:** All body text, subtitles, card titles, UI labels, navigation — single weight (400) across every context, relying on size and color contrast rather than weight shifts for hierarchy

### twkLausanne — Sole display face for the hero headline — a custom typeface with tight tracking and unusually compressed line-height that gives the 32px headline editorial gravitas without bold weight. The -0.04em letter-spacing is aggressive for body size but measured for display, pulling characters close enough to read as a unified mark rather than individual letters · `--font-twklausanne`
- **Substitute:** Söhne Breit or Editorial New (both share the tight, wide proportions)
- **Weights:** 400
- **Sizes:** 32px
- **Line height:** 1.10
- **Letter spacing:** -0.04em
- **Role:** Sole display face for the hero headline — a custom typeface with tight tracking and unusually compressed line-height that gives the 32px headline editorial gravitas without bold weight. The -0.04em letter-spacing is aggressive for body size but measured for display, pulling characters close enough to read as a unified mark rather than individual letters

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body-sm | 16px | 1.5 | -0.14px | `--text-body-sm` |
| display | 32px | 1.1 | -1.28px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 24px |
| navPill | 16px |

### Layout

- **Section gap:** 24px
- **Card padding:** 0px
- **Element gap:** 8px

## Components

### Navigation Pill
**Role:** Floating top navigation

Centered floating bar with 16px border-radius, contains brand name in Inter 400 and a hamburger icon. Sits at the top of the viewport with generous margin, appearing as a detached object rather than a full-width header bar.

### Hero Headline
**Role:** Page-level statement

Centered, single block of text at 32px in twkLausanne weight 400 with -1.28px letter-spacing and 1.10 line-height. Color #fafafa. This is the only display-size text on the site and the only use of the custom typeface.

### Hero Subtitle
**Role:** Contextual description below headline

Centered paragraph in Inter 400 at 17px, color #a3a3a3, line-height 1.29. Constrained to a text-width column (approximately 500-600px) centered in the viewport. Separated from the headline by 24px vertical gap.

### Project Card Thumbnail (Dark)
**Role:** Work preview for projects with dark or photographic content

Large rounded container at 24px border-radius, filled with #181818 (same as canvas — the card shape is defined by its content, not a visible background). Contains project artwork, illustration, or product screenshot that fills the container edge-to-edge with the 24px radius masking the corners.

### Project Card Thumbnail (Elevated)
**Role:** Work preview for app/UI projects needing visible surface separation

Same 24px border-radius and dimensions as the dark variant, but filled with #262626 to create subtle contrast against the #181818 canvas. Used for project thumbnails that contain screenshots of digital products where the surface needs to be perceptible.

### Card Title with Arrow Link
**Role:** Project name and navigation indicator

Inter 400 at 16px in #fafafa, followed by a small ↗ arrow icon. The arrow is a typographic character or icon at the same baseline as the text. No underline, no color change — the arrow is the sole affordance signal.

### Card Description
**Role:** One-line project summary

Inter 400 at 16px in #a3a3a3, positioned directly below the card title with minimal vertical gap. Kept to one or two lines, using muted color to recede beneath the title.

### Horizontal Scroll Gallery
**Role:** Full-bleed project showcase

Single row of project cards scrolling horizontally. Full viewport width with no padding constraints. Cards are separated by 8px gaps. The scroll track is the only content section — there is no vertical stacking of project grids or multi-row arrangements.

### Card Stack
**Role:** Thumbnail + meta group

A single project card unit combining the thumbnail (24px radius) and the title + description block below it. The meta block has no visible container or background — it exists as a typographic stack on the dark canvas. Vertical rhythm: 8px between thumbnail and title, 4px between title and description.

## Do's and Don'ts

### Do
- Use #181818 as the sole page background — never introduce lighter or darker canvas variants
- Use 24px border-radius for all card-shaped surfaces; use 16px for the navigation pill only
- Use twkLausanne at exactly 32px with -1.28px letter-spacing for headlines; never use this typeface for body text
- Use Inter weight 400 for all body, UI, and label text — never introduce weight 500, 600, or 700
- Keep all spacing on the 4px grid; use 8px as the default element gap
- Let project artwork and identity work provide all color on the page — the interface itself stays achromatic
- Center the hero text block in the viewport and float the nav as a centered pill, not a full-width bar

### Don't
- Never add drop shadows, inner shadows, or box-shadows to any element — depth comes from surface color contrast only
- Never introduce accent colors, brand colors, or saturated hues into the UI chrome — the palette is locked to four neutrals
- Never use font weights other than 400 — hierarchy is built through size and color (Bone vs Ash), not weight
- Never use sharp corners on containers — all surfaces are rounded (16px or 24px)
- Never stack project cards in a multi-row grid — the gallery is a single horizontal scroll row only
- Never add gradients, textures, patterns, or decorative backgrounds to the interface
- Never use letter-spacing wider than -0.009em on body text — the slight tightening is part of the voice

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Obsidian | `#181818` | Full-bleed page canvas; everything floats on this |
| 1 | Graphite | `#262626` | Elevated card thumbnails and content containers needing subtle separation from the canvas |

## Elevation

No shadows. Depth is communicated exclusively through a two-level surface system (#181818 canvas → #262626 elevated cards). The absence of shadows is a deliberate editorial choice — shadows would introduce warmth and materiality that competes with the work thumbnails, while flat surfaces keep the frame weightless and gallery-like.

## Imagery

The site has no decorative imagery of its own — no photography, no abstract graphics, no textures, no patterns. The only visual content is the project work inside the card thumbnails: vibrant brand illustrations (SPSQ x Collectivo's green/pink/purple figures, Discord Nitro's astronaut), product UI screenshots (Nitro Value's green-gradient app), and black-and-white identity work (ScamSpotter). These are the ONLY color on the entire site. Icons are minimal: a single hamburger menu icon and ↗ arrow characters on card titles. The chrome itself is purely typographic and structural — the design system deliberately delegates all visual expression to the portfolio content.

## Layout

Single-page horizontal-scroll layout with no vertical page sections. The nav pill floats centered at the top of the viewport. Below it, the hero text (headline + subtitle) is centered in a constrained text-width column (~560px) within the full viewport. The remainder of the page is a single full-bleed horizontal scroll row of project cards with 8px gaps. There is no footer, no sidebar, no secondary sections, no grid system, and no page-level navigation beyond the hamburger. The entire spatial structure is: floating pill → centered text → horizontal scroll gallery. Content density is generous — cards are large, the scroll track is the primary real estate, and the chrome occupies minimal vertical space.

## Agent Prompt Guide

**Quick Color Reference**
- text: #fafafa (primary), #a3a3a3 (muted)
- background: #181818 (page), #262626 (elevated)
- border: #fafafa (neutral action border) or #a3a3a3 (subtle)
- accent: none observed
- primary action: no distinct CTA color

**Example Component Prompts**

1. *Build the hero section*: Dark canvas at #181818. Centered headline in twkLausanne weight 400 at 32px, color #fafafa, letter-spacing -1.28px, line-height 1.10. Below it, a subtitle in Inter weight 400 at 17px, color #a3a3a3, line-height 1.29, constrained to ~560px width and centered. 24px vertical gap between headline and subtitle.

2. *Build the navigation pill*: A centered floating bar with 16px border-radius, dark background (#262626 or #181818 with subtle border), padding ~8px 16px. Contains the word "Kirschberg" in Inter weight 400 at 16px #fafafa, and a hamburger icon (three horizontal lines) on the right side. Positioned at top center with ~24px margin from viewport edge.

3. *Build a project card*: 24px border-radius thumbnail filled with #262626 (elevated variant) or #181818 (flat variant), dimensions roughly 400x500px. Below the thumbnail, the project title in Inter 400 at 16px #fafafa followed by a ↗ arrow character. Below that, description text in Inter 400 at 16px #a3a3a3. 8px gap between thumbnail and title, 4px between title and description.

4. *Build the horizontal gallery section*: Full-bleed row of project cards, no left/right page padding. Cards arranged in a single horizontal flex row with 8px column gap. The section scrolls horizontally on overflow. No section header, no background change from the page canvas.

## Similar Brands

- **rauno.me** — Same single-weight Inter on a near-black canvas with no accent color, where project work is the only chromatic element
- **tony.xyz** — Same dark, near-monochrome portfolio with a custom display typeface and flat, shadowless card surfaces
- **linear.app** — Same restraint of four neutrals on a dark canvas, with content (screenshots) providing all visual color and no decorative chrome
- **cobe.io** — Same gallery-wall approach where a near-black background makes portfolio work thumbnails the visual focus

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-obsidian: #181818;
  --color-graphite: #262626;
  --color-bone: #fafafa;
  --color-ash: #a3a3a3;

  /* Typography — Font Families */
  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-twklausanne: 'twkLausanne', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body-sm: 16px;
  --leading-body-sm: 1.5;
  --tracking-body-sm: -0.14px;
  --text-display: 32px;
  --leading-display: 1.1;
  --tracking-display: -1.28px;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;

  /* Layout */
  --section-gap: 24px;
  --card-padding: 0px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-2xl: 16px;
  --radius-3xl: 24px;

  /* Named Radii */
  --radius-cards: 24px;
  --radius-navpill: 16px;

  /* Surfaces */
  --surface-obsidian: #181818;
  --surface-graphite: #262626;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-obsidian: #181818;
  --color-graphite: #262626;
  --color-bone: #fafafa;
  --color-ash: #a3a3a3;

  /* Typography */
  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-twklausanne: 'twkLausanne', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body-sm: 16px;
  --leading-body-sm: 1.5;
  --tracking-body-sm: -0.14px;
  --text-display: 32px;
  --leading-display: 1.1;
  --tracking-display: -1.28px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;

  /* Border Radius */
  --radius-2xl: 16px;
  --radius-3xl: 24px;
}
```

---

# Content — scraped from abhikrish.framer.website (Aug 19, 2026)

Everything below is the site's own copy, transcribed verbatim. Where the
Framer site contradicts itself the conflict is noted, not silently resolved
(it shows two emails: `abhinavdesignerux@gmail.com` in the nav/footer,
`abhinavuxcreative@gmail.com` on the Contact page body; the Contact page's
phone/email links point at template placeholders `tel:+01-0000-2345` and
`mailto:hello@james.com` — the visible text is the real one).

## Site-wide

- **Name:** Abhinav Krishnan
- **Role:** UX / Product Designer
- **Location:** Houston, TX (home page ticker also shows "Dallas")
- **Availability:** "AVAILABLE NOW"
- **Email:** abhinavdesignerux@gmail.com (nav/footer) · abhinavuxcreative@gmail.com (contact page body)
- **Phone:** +1 (945) 249-6036
- **Social:** linkedin.com/in/abhinavux4 · behance.net/abhinavkrish · medium.com/@abhinavkrish.ux
- **Nav:** Home · About · Case Study · Blog · Contact · Resume
- **Meta description:** "Abhinav is a UX/Product Designer currently open to full time opportunities in the US."
- **Footer sign-off:** "Made with ☕ in hand — 2026 | Abhinav's Portfolio"

## Home

**Hero:** "A UX/Product Designer based in Houston, TX" + CONTACT ME button.
Ticker: UI/UX Design · Product Design · UX Research · Branding Design ·
Dallas · AVAILABLE NOW.

**MY WORK:** "These projects reflect the way I think, solve, and care. Each
one began with a real problem and ended with a solution that made someone's
life a little easier. I aim to design with intention, not decoration."

Four project cards, each with year, category, title, summary, SEE PROJECT:

1. **2025 · Enterprise SaaS — Merkle : Enterprise Campaign Orchestrator.** "A
   unified enterprise platform that enables marketing teams to plan, launch,
   monitor, and optimize omnichannel campaigns from a single workspace."
2. **2026 · Fintech | Payments — Harmoney.** "A tap to pay card and companion
   app for people who earn in person. Designed end to end for Anthem Nation,
   from problem definition through to a production ready product."
3. **2025 · Maritime | B2B2C — Vesseli.** "A modern mobile-first platform that
   enables boat owners, crew members, delivery skippers, and marine service
   providers to connect, hire, collaborate, and manage maritime operations
   through one seamless digital ecosystem. Connecting Boat owners & Crew
   members for seamless maritime experience."
4. **2025 · Fintech | AI Wealth Management — ForeCash.** "A proactive
   financial planning platform that helps users forecast expenses, achieve
   savings goals, and make confident financial decisions through personalized
   AI guidance."

**ABOUT teaser:** "I am a strategist, crafting experiences that connect deeply
and spark creativity." + "I specialize in UI/UX design, web and mobile
interfaces, and brand identity. I transform complex ideas into intuitive,
visually striking designs using tools like Figma, Pencil, and Framer. Driven
by research, clarity, and attention to detail, I create interfaces that don't
just look good-they work seamlessly."

**My Career so far..** — "I measure each project not just by numbers, but by
the impact it creates, the brands it strengthens, and the experiences it
shapes." Stats on home (note: differ from About): **20+** Projects Completed ·
**10+** Years of Experience · **95%** Client Satisfaction · **50+** Brands
Transformed · **300+** Design Concepts Explored.

**TESTIMONIAL:** "I value the experiences shared by those I've worked with,
each story reflecting collaboration and impact." (Two quotes — see About.)

**WHAT I CAN DO:** 00-1 Product Design · 00-2 UI/UX Design · 00-3 Web Design ·
00-4 Branding.

**More Case studies & Articles:** "From design trends to creative processes,
these articles offer insights to help you elevate your craft, solve
challenges, and spark new ideas for your projects." Cards: Designing for
Culture, Community, and Impact · A Philosophical Approach to UX Design.

**CONTACT:** "Reach out to start a conversation, share a vision, or create
something impactful." + phone, email, and a Name/Email/Message/Submit form.

## About

**About Me** — "I'm a UX/Product Designer who builds with clarity and
questions with intent. I stay current with design trends but focus on what
truly improves the experience."

**WHO I AM & MY VISION** — "I care about solving real world problems. From
healthcare, enterprise products to B2B2C, SaaS Products, my work centers on
reducing friction and designing systems that feel human."

"My approach follows what I call **The Law of Circle**. It means that no
matter how far I go, I always return to the basics. In a field that
constantly moves forward, I pause, reflect, and revisit the foundation: the
users, the context, the core problem. That loop keeps my work honest and
focused. For me, design isn't about chasing novelty. It's about staying
rooted while growing sharper."

**STATISTICS** — same intro sentence as home; numbers here are the
conservative set: **4+** Years of Professional UX Experience · **50+**
Mentorships Provided · **100%** Client Satisfaction · **100+** Product
Screens and Flows Designed · **20+** Projects Completed · **10+** Validated
UX and Usability Tests.

**WORK EXPERIENCE** — "From curious creator to full-time designer, my path
has been shaped by a passion for crafting purposeful, user-centered digital
experiences blending storytelling, structure, and design into every project."
The page shows logos next to each role; the logo for the glucose-dashboard
role is the **Jewish Healthcare Foundation** (GlucoGuard was the product,
not the employer).

1. **Product Designer — SquareResults · Dec 2025 – Present.** "Owned
   end-to-end product design for an AI-powered job matching platform, taking
   it from concept to an investor-ready MVP in 30 days while designing
   candidate swipe and recruiter dashboard experiences. Built scalable,
   role-based interfaces and a cross-platform Figma system, translating
   complex AI matching logic into intuitive UX while tightly collaborating
   with engineering to ship production-ready screens."
2. **UI/UX Designer — Anthem Nation · Dec 2025 – Jun 2026.** "Led UI design
   for Anthem Nation's education and events platforms, while restructuring
   the overall information architecture to simplify navigation and improve
   consistency across products. Designed Harmoney, a platform for businesses
   to manage payments, payouts, and financial workflows, building its
   website, mobile framework, and scalable design system from scratch."
3. **Freelance UX/UI Product Designer — Vesseli · Oct 2025 – Dec 2025.** "Led
   end-to-end UX design for a maritime platform, improving onboarding through
   research, journey mapping, and iterative testing to help users reach first
   key actions faster. Built a responsive Figma design system and
   collaborated with leadership and engineering to prototype features
   supporting 100+ yacht deliveries annually."
4. **Product Designer — Merkle · Jul 2024 – Aug 2025.** "Led end-to-end UX
   for an enterprise marketing platform, improving campaign workflows through
   research, prototyping, and usability testing with 150+ users, driving a
   22% engagement increase. Collaborated across product, business, and
   engineering teams to design scalable Figma systems and reusable patterns
   that simplified complex workflows and improved usability and consistency."
5. **UI/UX Designer Contributor — Jewish Healthcare Foundation (glucose
   monitoring product) · Jan 2024 – May 2024.** "Designed real-time glucose
   monitoring dashboards to enable faster emergency response and improve
   patient outcomes."
6. **UX Designer Intern — Datamatics · Nov 2021 – Aug 2022.** "Developed
   wireframes and prototypes for enterprise software while supporting
   research and design systems to improve consistency and usability."

**TESTIMONIALS**

> "I had the pleasure of working with Abhinav at Anthem Nation, where he made
> a strong impact across the website, Anthem Academy, and Harmoney. He brings
> a clear, user-centered approach and turns complex ideas into practical
> solutions. Collaborative and proactive, he has strong potential as a
> Product Designer." — **Tyi Moncrieffe, CEO | Anthem Nation**

> "Abhinav did an excellent job leading the UX/UI design for Vesseli's MVP,
> turning a complex maritime platform into a clear, scalable experience. He
> defined key user flows across core segments and built a strong foundation
> for future growth, showcasing strong systems thinking and attention to
> detail." — **Laurence McRory, CEO | Vesseli**

## Case Study index

"I start by uncovering each project's story listening, researching, and
exploring what gives it meaning. Then I shape it with strategy and design to
create experiences that connect and endure."

Cards: Merkle (marked "PASSWORD REQUIRED" in the listing, though the page
itself is public) · Harmoney · Vesseli · ForeCash. The Vesseli and ForeCash
cards also carry a stray template line — "Crafting Orrisé: An Immersive Study
in Fragrance Identity" — that has nothing to do with either project.

## Case Study — Merkle: Enterprise Campaign Orchestrator

**Meta:** Role Product Designer · Company Merkle · Jul 2024 – Aug 2025 ·
Enterprise SaaS · MarTech. Stats: **22%** Increase in engagement · **150+**
Enterprise users researched · **3** Agile squads · **AA** WCAG 2.1
compliance.

"Redesigning a legacy enterprise marketing platform into a modern campaign
operating system that reduced workflow complexity, improved usability, and
enabled teams to launch campaigns significantly faster."

**Executive Summary — One platform, fourteen disconnected screens.** "A
campaign manager at a global retailer needs to reach lapsed customers across
email, SMS and push, in four markets, with consent honoured and a budget
signed off. ECO is where that happens end to end. Inconsistent UI patterns,
poor information architecture, and cognitive overload slowed every team down,
from campaign managers to legal reviewers."

**Design Vision:** "Transform disconnected marketing tools into one
intelligent operating system."

**What the platform actually does.** "Fortune 500 marketing teams relied on
fragmented legacy systems to manage complex omnichannel campaigns. Launching
a single campaign meant navigating fourteen disconnected screens.
Inconsistent UI patterns, poor information architecture, and cognitive
overload slowed every team down, from campaign managers to legal reviewers."

**Understanding the Business — Six roles, one campaign workspace:**
- *Strategy — Marketing Manager.* Goal: Align channels, timing, and business
  outcomes. Pain point: Low visibility and slow approvals.
- *Execution — Campaign Manager.* Goal: Build and launch campaigns
  accurately. Pain point: Duplicate work and fragile handoffs.
- *Data — CRM Specialist.* Goal: Create accurate segments and rules. Pain
  point: Advanced filters are hard to trust.
- *Insights — Marketing Analyst.* Goal: Explain performance and business
  impact. Pain point: Delayed, contextless analytics.
- *Governance — Director of Marketing.* Goal: Oversee portfolio risk and
  adoption. Pain point: No unified operational view.
- *Compliance — Legal Reviewer.* Goal: Review content and approvals. Pain
  point: Unclear audit history.

**The Problem — Fourteen steps to launch one campaign:** 01 Strategy intake ·
02 Campaign brief · 03 Channel selection · 04 Audience rules · 05 Suppression
lists · 06 Journey setup · 07 Content creation · 08 Personalization · 09 QA ·
10 Legal review · 11 Business approval · 12 Launch scheduling · 13 Monitoring
· 14 Analytics. Side stats: **60%** Lost inside advanced filtering · **High**
Support ticket volume · **Slow** Campaign launch speed · **Steep** Learning
curve for new users.

**Research — Grounded in 150+ enterprise conversations.** "Visualizing the
end-to-end orchestration lifecycle for the ECO enterprise platform by mapping
out every type of user's journey. Based on the conversations, I mapped it out
categorizing by empathy and what the user felt about using an enterprise
campaign orchestrator." Methods: Interviews · Usability Testing · Heatmaps ·
Analytics · Journey Mapping · Competitive Analysis · Affinity Mapping.
Findings: 01 Marketing managers think in workflows, not features. · 02 Users
constantly switch between dashboards. · 03 Users need progressive guidance. ·
04 Campaign approvals create unnecessary bottlenecks.

**How Might We:** reduce campaign creation time? · simplify audience
segmentation? · improve collaboration? · surface insights earlier? · reduce
navigation complexity?

**Design Principles — Five rules that filtered every decision:** 01
Progressive Disclosure — One decision at a time. · 02 Task-first Navigation —
Users think in outcomes, not modules. · 03 Single Source of Truth — Every
campaign lives in one workspace. · 04 Design for Scale — Enterprise
complexity without overwhelm. · 05 Data with Context — Every metric answers a
business question.

**Information Architecture — From feature list to campaign lifecycle.**
Before (feature-based): Dashboards, Audiences, Journeys, Messages, Approvals,
Analytics, Assets, Settings. After (task-based): Plan, Build, Review, Launch,
Monitor, Optimize, Report. **Sarah's journey — Marketing Manager:** 01
Morning dashboard — Reviews campaign health and risks. · 02 Campaign creation
— Captures goal, channel, and timing. · 03 Audience & journey — Builds
segments and cross-channel flow. · 04 Content & review — Previews content,
resolves comments. · 05 Launch & monitor — Approves, launches, watches
delivery. · 06 Optimize & report — Tests variants, prepares readouts.

**Final Product — What Shipped** (12 screens): Dashboard — "KPIs appear
first so teams have operational awareness before task execution." · Campaign
Library — "Optimized for scanning: status, owner, channel mix, and pending
actions." · Campaign Wizard — "Progressive disclosure guides setup one
decision at a time." · Audience Builder — "Visual filtering makes
segmentation logic readable and testable." · Journey Builder — "Drag-and-drop
orchestration across Email, SMS, Push, and In-App." · Review Screen —
"Consolidates content, audience, and approvals for launch confidence." ·
Live Monitoring — "Delivery health and anomalies surfaced for operational
awareness." · Analytics — "Turns performance data into a story that supports
optimization." · Experiments — "Variant comparison and learnings support
continuous optimization." · Approvals — "Owners, deadlines, and audit trail
improve governance." · Comments — "Contextual collaboration keeps feedback
inside the campaign." · Asset Library — "Centralizes reusable marketing
assets across teams."

**Design System — Tokens that kept 12 releases consistent.** Typography:
Geist Display · Inter Body · JetBrains Mono Data. Spacing: 8px Base Unit ·
16px Card Radius · 96px Section. Color: Navy · Red · Teal · Orange · Purple.
Accessibility: WCAG 2.1 AA · Focus States · Keyboard Nav.

**Impact — Measurable results across the platform:** 22% Increase in
engagement · Faster Campaign setup · Fewer Support tickets · Higher Platform
adoption. Quote: "The new workspace is calmer, more predictable, and finally
matches how we actually plan campaigns." — Director of Marketing, Enterprise
Client.

**Reflection:** "This project reinforced that enterprise UX is not about
making complexity disappear, it is about making complexity understandable and
trustworthy. Progressive disclosure became the core strategy because it
respected both marketers who needed speed and enterprises who needed
governance. Future opportunities include AI-assisted campaign
recommendations, predictive audience insights, and intelligent automation for
journey optimization."

## Case Study — Harmoney

**Meta:** Client Anthem Nation · Founder Tyi Moncrieffe · Role Product
Designer · Industry FinTech/Payments · 2026.

**Title:** "Harmoney: Turns a handshake into a payment, so people who earn in
person can get paid in the moment." "A tap to pay NFC card and companion app
for vendors, creators and operators. I designed it end to end with Anthem
Nation in New York, from first principles through to a production ready
product."

- **What is it** — "A physical card that carries your business. Tap it to any
  phone and your Harmoney profile opens in the browser, ready to take a
  payment. Nothing to install, nothing to spell out, nothing to remember
  later."
- **The opportunity** — "When someone says yes in person, the intent to pay
  is at its strongest. Today that intent has to travel through several steps
  before money moves. Every step it survives is value kept, and that is where
  Harmoney does its work."
- **What already exists, and the space between** (figure-led section).
- **The same ninety seconds, twice** — "Harmoney does not remove the payment
  step. The payer still opens their phone and authorises, and that step
  should take a deliberate action. What changes is everything that happens
  before it." Tracks "How it begins · identical either way", then two
  outcomes: "Without Harmoney · four days, no booking" — "Nothing went wrong.
  Nobody was rude. The booking quietly evaporated between 'I will DM you' and
  Thursday." — and "With Harmoney · under a minute, deposit taken".
- **What Harmoney does** — "It collapses discovery, identity and payment into
  a single physical gesture, performed at the moment intent is highest."
- **Project goals** — "Agreed with the founder before design started, and
  used to settle every scope argument after."
- **Who it is for** — "Three earner types plus the person nobody designs for.
  Built from the founder market knowledge and the presale audience, and
  labelled proto personas because at this stage they are informed models, not
  validated research."
- **User journey map** — "The Service Creator, current state against designed
  state. I mapped all three earner types, and this is the one that offered
  the most to design for."
- **User stories** — "Written as acceptance criteria I could design against
  and a developer could build against, but held to a person so the
  requirement never got separated from its reason."
- **The principles we agreed on** — "Five principles, agreed with Tyi before
  a single screen was drawn. They gave us a shared way to settle questions
  quickly later on."
- **Ideation** — "Three structural concepts before any pixel was styled, run
  against the same story: take payment from a stranger in under ten seconds.
  The seller already believes in it. The payer is deciding in the moment.
  Design effort goes furthest where the decision is still open."
- **Wireframes** — "Structure and hierarchy resolved in greyscale, with the
  reasoning annotated on the artefact so it survived review without me in the
  room."
- **Lo-fi** — "Layout and density resolved at full detail with colour
  deliberately withheld. If a screen does not work in grey, colour will not
  save it."
- **Visual direction** — "Colour applied last, on structure already argued
  and settled. Deep green carries navigation, the card and identity. Lime is
  held back for the single highest intent action on any screen."
- **The product** — "Forty six screens across two themes, covering
  onboarding, the money flows, links, the card, settings and every state in
  between."
- **Decisions and the thinking behind them** — "A few choices worth
  explaining, along with what each one traded."
- **Every state is designed** — "In a payments product the quieter states are
  not edge cases. They are where trust is built."
- **Accessibility** — "Considered during design, not audited afterwards.
  Where it is not resolved, I have said so."
- **Reflection:** "The brief opened up into something bigger. The starting
  point was a set of screens. Working through it with Tyi, it became clear
  the more useful contribution was defining what the product was for, who it
  served, and which moments carried the business. He gave me the room to go
  there. / Holding colour back paid off. Working in greyscale through
  wireframes and lo fi meant every hierarchy question was answered with
  structure. Two things surfaced there that would have been easy to miss
  later. / What I would add next. Not more screens. Five conversations with
  working vendors would test three of the assumptions this work is built on,
  and I designed those parts to be easy to change for exactly that reason."

(The detail for each section lives in annotated full-bleed figures — see the
image manifest; the existing `src/data/harmoney.ts` already carries the
long-form version of this study, rebuilt from the same Figma source.)

## Case Study — Vesseli

**Meta:** Client Vesseli, UK | Laurence McRory · Role Product, UX/UI Designer
· 3 Months · B2B2C, Maritime · 2025.

**Title:** "Vesseli: A seamless maritime hiring experience for boat owners
and crew." "Vesseli is a mobile platform designed to help boat owners hire
crew and coordinate maritime work. I collaborated directly with the CEO,
Laurence, to redesign the existing app and improve its usability, structure,
and overall experience."

- **Background Information** — "Vesseli is a maritime platform designed to
  help boat owners hire crew, coordinate vessel deliveries, and manage
  short-term maritime work. I collaborated directly with the CEO, Laurence
  McRory, after reaching out to him when he was looking for design support to
  improve the existing app. The original product had a clear vision but
  lacked usability, structure, and engagement. The goal of this redesign was
  to transform Vesseli into a platform that users not only understand but
  actually enjoy using. The opportunity is significant: the global maritime
  industry is worth hundreds of billions; increasing demand for flexible,
  short-term crew hiring; lack of modern, user-friendly digital solutions."
- **Problem Statement** — "The existing Vesseli app suffered from: unclear
  navigation and user flows; lack of visual hierarchy and consistency; low
  perceived trust due to unstructured profiles; minimal engagement due to a
  purely functional interface. As a result: users struggled to complete key
  actions; hiring decisions lacked confidence; the app did not reflect its
  true potential."
- **Project goals** — "Redesign the app to improve usability and clarity;
  introduce a strong, cohesive visual identity; simplify hiring and
  coordination workflows; build trust through structured information; create
  a scalable foundation for future development."
- **Prioritizing the problem** — "Given the early-stage nature of the
  product, I focused on: Core Hiring Flow — ensuring users can discover,
  evaluate, and hire efficiently; Onboarding & Role Clarity — defining user
  intent early to reduce confusion; Trust & Profile Structure — making it
  easier to assess credibility; Navigation Simplicity — reducing friction
  across key journeys."
- **Research & Insights** — "Approach: discussions with the founder; analysis
  of existing product experience; competitive review of maritime and gig
  platforms. Key Insights: users rely heavily on trust and reputation; lack
  of structure leads to hesitation in hiring; simplicity directly impacts
  action-taking; visual design influences perceived credibility."
- **Usability Tests** — "I analyzed the experience of Seapeople app, a
  competing platform in the maritime hiring space." Quote: "It's useful, but
  I'm not always sure who to trust or how to choose the right person."
  "Testing revealed that while the platform enables hiring, it lacks clear
  trust indicators and structured profiles. Users struggle to confidently
  evaluate crew members, leading to hesitation and slower decision-making.
  The absence of strong visual hierarchy and credibility signals increases
  cognitive load and reduces overall engagement."
- **Requirements** — "Core requirements defined by Laurence were to: enable
  boat owners to hire crew efficiently; allow crew to showcase experience and
  availability; support delivery skippers and service providers; keep the
  experience simple and mobile-first; ensure the product feels professional
  and reliable."
- **User Segments Identified** — Boat Owners – hire crew and manage
  operations · Crew Members – find jobs and build reputation · Delivery
  Skippers – manage vessel transport · Service Providers – offer specialized
  services.
- **User Persona** — Boat Owner (primary). Goals: find reliable crew quickly;
  evaluate credibility with confidence; manage hiring without friction. Pain
  points: lack of trustworthy information; time-consuming communication;
  unclear hiring processes. Needs: clear profiles, simple hiring flow, strong
  trust indicators.
- **Solutions** — "1. Role-Based Experience: introduced structured onboarding
  to define user intent early and personalize the experience. 2. Trust-Driven
  Profiles: redesigned profiles to include experience, credentials,
  availability, clear hierarchy of information. 3. Simplified Hiring Flow:
  reduced complexity in searching, evaluating, requesting, confirming jobs.
  4. Visual Identity Revamp: introduced a beachy, harbor-inspired theme to
  reflect the maritime context, create a calm, engaging experience, improve
  emotional connection with the product."
- **Design System** — "I maintained the design system to the range of having
  the beachy vibe and not compromising on the main color as per the client's
  requirement."
- **Design — Before vs After.** Before: generic, utility-driven interface;
  weak visual hierarchy; minimal engagement; confusing navigation. After:
  clean, modern mobile UI; strong typography and spacing; clear navigation
  and structured flows; cohesive maritime-inspired visual system.
- **Key Design Improvements** — clear onboarding flow with role selection;
  improved card-based layouts for profiles; stronger CTA visibility; better
  spacing and readability; consistent design system.
- **Conclusion** — "This redesign transformed Vesseli from a functional but
  underwhelming product into a structured, engaging platform with clear
  usability and strong visual identity. The new experience: improves clarity
  across key workflows; builds trust through structured information; creates
  a more engaging and modern interface; lays the foundation for future
  scalability. The redesigned app is currently under development and
  represents the next evolution of the Vesseli platform."

## Case Study — ForeCash

**Meta:** Role Product Designer · Self Concept · 4 Months · FinTech/AI Wealth
Management · 2025.

**Title:** "ForeCash: Helps users forecast savings, plan finances, and track
transactions with AI insights." "Strengthen financial clarity for individuals
and businesses by transforming complex cash flow data into actionable
insights. Furthermore, streamline forecasting and money management to help
users make confident financial decisions without spreadsheets or guesswork."

- **Background Information** — "This project started as a self-initiated
  exploration. I noticed that most finance apps either: focus heavily on
  charts and numbers; surface problems without guidance; assume high
  financial literacy. As someone interested in human-centered systems, I
  wanted to explore: How might we help people feel more in control of their
  money without overwhelming them?" (Persona images: Jesse, Caitlyn.)
- **Problem Statement** — "Traditional budgeting tools often focus on
  tracking spending but fail to guide users with purpose or help them stay
  motivated. People know what they earn and what they spend, but they
  struggle with saving intentionally or working toward meaningful milestones
  like starting a business, paying off student debt, or travelling the
  world."
- **Project goals** — "To increase user engagement and retention; reduce
  drop-offs during onboarding; raise goal completion rates; strengthen
  organic growth via clear value communication in web + app platforms."
- **Prioritizing the problem** — "I focused on the highest-friction moment in
  the journey (i.e) interpreting forecasts and acting on them. This was
  validated through: user interviews, session recordings, funnel drop-off
  analysis. Trade-offs: reduced visual density to improve clarity (at the
  cost of showing less data upfront); prioritized progressive disclosure over
  power-user shortcuts. Accessibility & Scale: clear contrast ratios;
  readable typography for long data sessions; components designed to scale
  across future forecast types."
- **Affinity Mapping** — "The affinity mapping exercise organized diverse
  user insights into clear themes, revealing key financial needs, behaviors,
  and decision making triggers. These insights shaped ForeCash's Customer
  Journey Map, ensuring each stage addresses real and validated user needs."
- **Research & Insights** — "Field & Behavioral Discovery: I analyzed
  financial discussions across communities where people expressed frustration
  with existing financial tools that focus only on tracking historical
  spending without helping them anticipate or plan ahead. Key insight: users
  want a partner-like financial experience, not a ledger — something that
  tells them 'Here's what's likely to happen with your money' and 'Here's how
  to reach your goal with simple steps.'"
- **Usability Tests** — "I conducted usability tests with target users to
  validate design decisions and identify areas for improvement. The test
  consisted of an interview and completing specific task on an AI chat box in
  banking and financial wellness apps."
  - *Test #1 — Erica AI (Bank of America):* "I tried asking the AI about my
    financial goals in my own words, but it only offered a few preset
    questions to choose from. When I typed anything outside those options, it
    could not give me an answer." → "Limiting user input to predefined
    selections reduces the usefulness of an AI assistant. Financial needs are
    often unique, and users expect the freedom to phrase questions naturally.
    When the system fails to respond to anything beyond its scope, it creates
    frustration and prevents deeper engagement with the tool."
  - *Test #2 — Cleo AI:* "The AI responds in a friendly and engaging way, but
    it cannot give me a personalized forecast or plan based on my specific
    situation. It feels like I am getting generic advice instead of something
    tailored to me." → "While personality and engagement are strengths, the
    absence of personalized forecasting leaves a significant gap for users
    who want actionable, data-driven insights. Financial wellness tools must
    go beyond general tips and provide tailored strategies that help users
    reach their individual goals."
- **Requirements** — "An interactive AI to ask for financial advices; clear
  visual of their finances; set specific targets they want to achieve using
  the AI chat; keep track of their progress of a specific target/goal; adjust
  their plan according to circumstances; show clear data of the user's
  transaction history; show how much they owe and how much they are owed from
  people; keep the chat minimalistic and to the point content/forecasting;
  clear and easy to navigate onboarding experience."
- **User Segments Identified** — Primary audience: young professionals
  (22–35) juggling irregular income; people who don't want strict budgets but
  want clarity and control; goal-oriented individuals saving for milestones
  (debt repayment, travel, business, investments). User needs: quick
  understanding of future cash flow; simple visuals that don't require
  financial expertise; personalized advice and next-step suggestions.
- **User Persona** — "I created Emily based on usability tests and affinity
  mapping, representing busy young professionals who lack time for financial
  planning. She reflects frustrations with generic apps and the need for a
  simple, personalized tool to set and track goals."
- **Solutions** — Core design decisions: Progressive Disclosure (users see
  summaries first, details on demand) · Scenario Comparison (side-by-side
  layouts reduce memory load) · Explainability (AI-generated insights explain
  why a forecast changes). "Instead of overwhelming users with raw numbers,
  the design guides them toward actionable understanding. I focused more on
  flows, assumptions, and reasoning than visual polish, mirroring real-world
  product problem solving."
- **AI-Driven Insights to Empower the User's Finances** — "Boost clarity,
  eases decision making process & most importantly gives the sense of
  trust." Three beats: AI-centered chat to create/adjust plans while a
  dashboard tracks goals, transactions, payments, shared expenses · insights
  consistent across web and mobile · ForeCash evolved from tracker into
  adaptive partner.
- **Design System** — "I created the ForeCash design system to ensure clarity
  and consistency across the platform. I chose a warm, professional color
  palette with clear feedback states, a clean sans-serif type for
  readability, and rounded components with subtle shadows for a modern feel.
  Simple icons, customizable avatars, and a streamlined navigation bar make
  the experience approachable, while progress indicators keep users
  motivated." Links out: "View Full Design System" (Google Slides).
- **Onboarding** — two versions: "Authentic version: clean, minimal screens
  focused on clarity and functionality, guiding the user with simple
  messaging and clear login/permission steps. Illustrated version: flashy
  visuals with playful illustrations and subtle motion design, creating a
  more engaging and expressive experience."
- **Authentication & Dashboard** — "The login, registration, and OTP flows
  are simple and secure, leading into a motivating success screen. The
  dashboard gives users a clear overview of their balance, subscriptions, and
  recent transactions."
- **Goals & Transactions** — "Users can set financial goals with progress
  tracking and edit them anytime. Adding transactions is intuitive with
  categories, payment methods, and confirmation to avoid mistakes."
- **Profile, Security & Analytics** — "Profile settings cover
  personalization, security, and document storage. Analytics provide insights
  into spending patterns and link them back to personal savings goals with
  visual clarity."
- **AI Interaction** — "This AI interaction video demonstrates how
  conversational assistance guides users with smart suggestions, reminders,
  and financial nudges, blending automation with a human-like experience."
- **Conclusion** — "The feedback from usability testing shaped the final
  iteration of ForeCash into a platform that not only forecasts savings but
  actively motivates users to achieve their biggest financial goals."

## Blog index

"Each post is an exploration of ideas, design thinking, and strategies that
inspire smarter decisions and spark creativity-sharing lessons and stories
that go beyond the work itself." Three posts: Designing for Culture,
Community, and Impact · A Philosophical Approach to UX Design · Spotify
Syncro: The idea and execution.

## Blog — Designing for Culture, Community, and Impact

*Jan 1, 2026 · Education & Record Platform*

**UNDERSTANDING THE ECOSYSTEM** — "Anthem Nation and Anthem Academy are two
connected platforms with different roles. Anthem Nation focuses on building
artists, content, and cultural influence. Anthem Academy is a nonprofit that
provides education in music, AI, and creative entrepreneurship. One drives
visibility. The other drives real-world impact."

**MY ROLE IN THE DESIGN PROCESS** — "I designed the anthem academy website
focusing on Anthem Fest, Core programs turning complex ideas into clear,
structured experiences. My work involved: defining user flows and content
structure; designing intuitive, modern layouts; creating a consistent visual
system across both platforms. The goal was simple: make users understand the
product quickly and trust it."

(Embedded quote from Tyi Moncrieffe, CEO | Anthem Nation, The Anthem Academy:
"I had the pleasure of working with Abhinav at Anthem Nation, where he made a
strong impact across the website, Anthem Academy, and Harmoney. He brings a
user-centered approach, simplifies complex ideas, and shows great potential
as a Product Designer.")

**DESIGNING ANTHEM NATION** — "Anthem Nation needed to feel bold and
forward-thinking. I focused on: clear hierarchy to highlight artists and
offerings; strong visuals that reflect energy and movement; messaging that
positions it as more than just a music brand. The experience is designed to
feel fast, confident, and intentional."

**DESIGNING THE ANTHEM ACADEMY** — "Anthem Academy needed clarity and trust.
I focused on: simple structure and easy navigation; accessible and inclusive
design choices; clear messaging around programs and impact. The goal was to
help users instantly understand what the academy offers and how it helps
them."

**REAL WORLD IMPACT** — "The Anthem Academy operates as a real community hub
through its partnership with NYC Parks and Recreation. It helps young
creators: learn music production and AI; build creative and career skills;
access opportunities they wouldn't otherwise have. This is where design
directly supports real-world outcomes."

## Blog — A Philosophical Approach to UX Design

*Oct 12, 2025 · Branding · by Abhinav Krishnan, UX/Product Designer*

**UNDERSTANDING THE CONCEPT** — "Life is inherently unpredictable. If we were
to know the exact moment of our death, the nature of our worries would change
entirely. Rather than being consumed by the daily challenges we face, we
might focus on savoring the fleeting moments we have left. This duality of
unpredictability both daunting and soothing mirrors the intricacies of user
experience (UX) design."

**THE PARADOX OF UNCERTAINTY** — "Uncertainty in life can be unsettling. It
forces us to confront the unknown and often compels us to prepare for the
worst. However, it's this very unpredictability that can also be profoundly
liberating. Without a fixed endpoint, life retains its richness, allowing us
to experience joy, curiosity, and wonder. Similarly, in UX design,
uncertainty can be both a challenge and an opportunity. As designers, we are
tasked with creating experiences that guide users through the unknown. Users
often approach a product or service with a degree of uncertainty like:"

> "How will this work? Will it meet my needs? How do I navigate this
> interface?" These questions are natural, and it's our responsibility as UX
> designers to address them.

**DESIGNING FOR UNCERTAINTY** — "In UX, we don't eliminate uncertainty;
instead, we manage it. A well-designed interface anticipates the user's needs
and provides clear, intuitive guidance. This doesn't mean that everything
needs to be predictable or overly simplistic. On the contrary, a degree of
uncertainty can engage users, prompting exploration and discovery. It's about
striking a balance providing enough structure to make the experience
comfortable while leaving room for the unexpected. For instance, consider the
onboarding process of a new app. A user might initially feel unsure about how
to get started. A thoughtful design will gently guide them through the
initial steps, offering reassurance while encouraging exploration. By
gradually revealing features and providing contextual hints, we help users
build confidence in their ability to navigate the unknown."

**UNCERTAINTY AS A DESIGN PRINCIPLE** — "Philosophically, embracing
uncertainty allows us to appreciate life's unpredictability, finding peace in
the unknown. In UX design, a similar approach can enhance the user
experience. By acknowledging the inherent uncertainty in human-computer
interaction, we can create designs that are not only functional but also
emotionally resonant. Designers should consider unpredictability as a tool.
Not something to be feared, but something to be harnessed. By embracing
uncertainty, we can create experiences that are more engaging, more human,
and ultimately, more satisfying."

**FINAL THOUGHTS** — "Life's unpredictability is a source of both anxiety and
liberation. In UX design, the same principle applies. By understanding and
embracing uncertainty, we can create experiences that are not only
user-friendly but also deeply meaningful. Just as we might find comfort in
the unpredictability of life, users can find joy in the exploration and
discovery that comes with a well-designed product. Embracing uncertainty in
UX design isn't just about solving problems, it is about creating experiences
that resonate with the unpredictable nature of life itself."

## Blog — Spotify Syncro: The idea and execution

*Oct 15, 2025 · Music Technology / Entertainment · by Abhinav Krishnan,
UX/Product Designer*

Lead: "Design is everywhere, but not all design leaves a mark. What separates
the ordinary from the enduring is purpose. For me, design isn't about
decorating an idea—it's about shaping it into an identity that lasts. Purpose
is the thread that connects creativity, strategy, and storytelling into
something timeless."

**Enhancing Music Customization in Spotify** — "During the Summer of 2024,
two college students designed a solution to the Spotify premium problem
here's the story of how we went from an idea to a meeting with multiple
product designers and Group Product Managers. Check out our YouTube video:"
(embeds youtube.com/watch?v=LwSfu3HEof0)

**How it all started** — "I stumbled upon an intriguing remix of a popular
song, sparking the idea of customizable music in our favorite streaming app,
Spotify. Frustrated by the cumbersome process of downloading and uploading
music to third-party applications just to enjoy altered versions, I
envisioned a more seamless solution. I began designing a customizable
interface for Spotify. What started as a casual idea quickly evolved into a
serious project. I realized that many users, like me, craved more control
over their listening experience. To validate my concept, I interviewed fellow
students and gathered their feedback. To my surprise, many were unaware that
Spotify already had an equalizer feature! This revelation solidified my
resolve to incorporate not just pitch and speed changers, but also to
highlight and enhance the existing equalizer function."

> "What if there was a way to customize songs on the go? It would be nice to
> play around with tunes"

**Determined to turn vision into reality** — "Fueled by excitement and
curiosity, I conducted more interviews, surveyed hundreds of students, and
even pitched the concept to multiple product designers and Group Product
Managers. The journey from a simple idea to a comprehensive design concept,
now known as Spotify Syncro, has been nothing short of exhilarating. In the
fast-paced world of music streaming, Spotify has maintained its position as a
market leader, boasting millions of users worldwide. However, a significant
trend has emerged where users increasingly share customized versions of songs
on social media platforms like TikTok and Instagram. While this trend has
enhanced user engagement, it has also led to considerable copyright
challenges for artists and streaming platforms. To tackle these issues and
elevate user experience, 'Syncro' a comprehensive design concept aimed at
revolutionizing music customization in Spotify."

**The Solution** — "Trends come and go, but purposeful design stands the test
of time. By grounding each decision in strategy and story, identities gain
the flexibility to evolve without losing their core. This adaptability is
what makes them not just relevant today, but enduring tomorrow. Spotify
Syncro introduces two distinct modes: Creative Mode lets users alter pitch
and speed to create personalized versions of tracks, then save them to custom
playlists. Altered Mode offers access to pre-customized songs inspired by
trends across TikTok, Instagram, and user data worldwide. A new Trending
section highlights viral edits, and intuitive navigation makes exploring
customizations seamless."

**Customization Features** — "Pitch and Speed Changers: integrate these
features within the app to allow users to customize their listening
experience. Modes: introduce 'Creative Mode' and 'Altered Mode' to cater to
different user preferences."

**Experience & Impact** — "Syncro deepens user engagement through
personalization, encouraging longer sessions and increasing satisfaction.
This added value helps justify a new Premium+ tier at $14.99/month (vs. the
standard $9.99), with unique features driving loyalty and retention."

**Business Objectives** — "We project $200M in added revenue in year one, a
$1.50 ARPU increase, and a 10% bump in subscribers. Copyright concerns will
be addressed through legal reviews and responsible implementation."
*Market Positioning:* "Spotify holds a 15% growth rate YoY and dominates
among users aged 18–34. The music streaming market is on track to hit $45B by
2025, and competitors like Apple Music, Amazon Music, and YouTube Music lag
behind in personalization. Syncro gives Spotify a clear edge." *GTM
Strategy:* "To reach the 18–34 tech-savvy segment, our launch strategy
includes influencer campaigns, social media promotion, and gamified referral
programs. A high-impact launch event and continued updates will keep Syncro
in the spotlight."

**FINAL THOUGHTS** — "To refine our approach, we pitched our idea to Spotify
employees across design, product, and marketing. Through 35–50 outreach
messages, we secured meetings including one with a Group Product Manager and
gained valuable feedbacks. Iterating on these conversations, we evolved our
pitch deck and even partnered with a Senior Product Designer at Spotify to
strengthen our vision."

## Resume

"Here is my official ATS-Friendly resume for your reference! Looking forward
to connecting :)" — effective date Mar 26, 2026, with a Download link to the
PDF (`public/resume.pdf` locally).

## Contact

"Let's build something impactful together whether it's your brand, your
website, or your next big idea. Best way to reach me is via email:
abhinavuxcreative@gmail.com" + phone + Name/Email/Message form.

## Image manifest

All pulled from the Framer CDN (`framerusercontent.com`) into `public/img/`;
figures fetched with `?scale-down-to=2048`. Card thumbnails from the home
gallery; per-study figures in document order of their page.

| Local path | Framer asset | What it is |
|---|---|---|
| `home/hero.jpg` | `q6XRLRjjs69nhmNMotsENHIkYSk` | Abhinav, outdoor portrait (home hero) |
| `about/portrait-1.jpg` | `97UMfXFoIEEVvvbd1vgGdfDrM` | Abhinav portrait (About, upper) |
| `about/portrait-2.jpg` | `911raY9IjX9790YZ8nDWzUeVk` | Abhinav portrait (About, lower) |
| `people/tyi.jpg` | `EWwP38bjGL39roTu77l29saXRFs` | Tyi Moncrieffe photo |
| `people/laurence.jpg` | `uakYglc4TnGfgaQWVvGsdDXuc` | Laurence McRory photo |
| `resume/resume-1.jpg` / `resume-2.jpg` | `g70eHupjlZS7cTD38Ythm6FxcjM` / `iMXCTqaFSUYqDtorS7gj4X9j64` | Resume pages as shown on the site |
| `../resume.pdf` | asset `GL2pkS27p7lI7GZejEvzfz1TJl8` | The ATS resume PDF (Download link) |
| `contact/contact.png` | `sDSqdBU22ImounS8fzlbJtf2HI` | Contact page illustration |
| `work/squareresults.png` | `El7M8kKs8XcEC9ezRHSbPW84` | SquareResults logo |
| `work/anthem-nation.png` | `xWd86bUiNmZIyNFs2Vn7HLns` | Anthem Nation logo |
| `work/vesseli.png` | `bOgCBeZJbZbIqobe6uLwIZJRRTQ` | Vesseli logo |
| `work/merkle.png` | `Jstp4wLJNQ4lXkcXdvCAg05hgg` | Merkle logo |
| `work/jewish-healthcare-foundation.png` | `7BI74VnteoBwzlYwu290oygf1I` | Jewish Healthcare Foundation logo (glucose-dashboard role) |
| `work/datamatics.png` | `vevCRXzMOlLXHEwoPypMczbPKg` | Datamatics logo |
| `work/anthem-academy.png` | `mUWbsqu4tTPElNXvAMjQVW9wWg` | Anthem Academy logo (home marquee) |
| `work/squareresults-dark.png` / `squareresults-green.png` | `XZglUaVHV1efswEx5oJVXgMC0` / `QOqFhgqh48WKBCUzxCu8VK1zRiE` | SquareResults variants (marquee) |
| `work/harmoney-wordmark.png` | `27aRxcs5Fa8g0qAU2qyALiSP9PE` | Harmoney wordmark (marquee) |
| `work/merkle-card.png` / `-alt.png` | `e3hGXKq8Yur5MZw9d135tseJ3Tc` / `Q9JpbJv2IcZrZKgFcreApmhpiY4` | Merkle card (home / case-study index) |
| `harmoney/card.png` | `56dtdmujtCOwNpFW9FhnyyQagc` | Harmoney card — same image as the study hero |
| `work/vesseli-card.png` / `-alt.png` | `SwY2VNPOelMlqXf1u3xHaE7XqU` / `aNlyLlapvjsGGIxfzZXWeH69Vg` | Vesseli card (home / index) |
| `work/forecash-card.png` | `g2sPp6YAGFTIgIZSdNaXbJuiMU` | ForeCash card |
| `harmoney/logo.png` | `HI7eIP3lJGI3tjJYraQvskHAtWY` | Harmoney mark |
| `harmoney/hero.png` | `56dtdmujtCOwNpFW9FhnyyQagc` | Hero — three phones |
| `harmoney/what-is-it.png` | `0yzuMJWBZvaYwLl2Xmhsa2BXug` | What is it |
| `harmoney/opportunity.png` | `aI5jXO8dK7ialBVBijJ8X4ydV0Y` | The opportunity |
| `harmoney/existing.png` | `mXXqRS8LE7r2TBdF87yHCqu69I` | What already exists |
| `harmoney/ninety-seconds.png` | `TAjzMTXsLYdZTiB9SyU8IBeDqs` | The same ninety seconds |
| `harmoney/how-it-begins.png` | `wSna5sqbSen3ygBQgUFtH0xXPU` | How it begins |
| `harmoney/without.png` | `Fc1KOUjDSPuAlzXWNHc0uZXOk4` | Without Harmoney |
| `harmoney/with-1.png` / `with-2.png` | `bLsONw2AoWASAfVKZr1cuaOsPA` / `QQPNWLrQasP3SPrpROQ2GLCKOoA` | With Harmoney |
| `harmoney/changed-1.png` / `-2.png` | `ZEYU07VAivln4y7bsWkR11jXh7A` / `eemmCcm0dmwpBsFJAgujeAgCnU` | What actually changed |
| `harmoney/what-it-does-1.png` / `-2.png` | `et6MMTeUDBoguSF4UvHhaVUjAt8` / `ZM0QVvyZbcPcfqvGxvGsCyb9A` | What Harmoney does |
| `harmoney/goals.png` | `O8BfAsKLhYaDezXuhxBIbFjEF8` | Project goals |
| `harmoney/personas.png` | `GgGmdPjVQ8zL2larIRGh2SjlQSg` | Proto personas |
| `harmoney/journey-1.png` / `-2.png` | `JWvL8HNrwJ3xQexBXAOQ9wbs` / `H8O4ITffoKhVrcNZyLvhVrWmOk` | Journey map |
| `harmoney/stories-1.png` / `-2.png` | `igPqT3tG6vRox42LhMgLJdA7rM` / `thSq7H1e7aZXRek5mbn1XtyDru0` | User stories |
| `harmoney/principles.png` | `3cyCkjTAdQviR5BdtUNkVVVo2E` | The five principles |
| `harmoney/ideation.png` | `vpBK95LBkADc8bYrC5uk3eGWb5I` | Three structural concepts |
| `harmoney/wireframes.png` | `uTmgexvH1juCQIQjETB2G0BZFE` | Wireframes, annotated |
| `harmoney/lofi-1.png` / `-2.png` | `1Nx2XK3A3txJESjf1fdcMbhjYZ4` / `sjuAUyc42pHPqrUAXKREbLYMIw` | Lo-fi |
| `harmoney/visual-direction.png` | `dKEGVWZrbI82l1F2ROV7m6574xY` | Visual direction |
| `harmoney/product.png` / `product-2.png` | `LTMDbMJle9O9FzK2bOLWkhZYc` / `8gtxnYdDHsJ7JNWdMNHORtXK8I` | The product — 46 screens |
| `harmoney/decisions-1.png` / `-2.png` | `dlInlCQg5Mzv7pJa8l6rAZDW30A` / `gnfbyhcjQ0yI0VWv6qXZOLCPlAk` | Decisions |
| `harmoney/states.png` | `BQuYNuCq8czbkIFAYheYGHAFgqM` | Every state is designed |
| `harmoney/accessibility.png` | `KLZC12r34S4QSKY5BHg8AU` | Accessibility |
| `work/merkle/hero.png` | `YYbhI7VrodYkBWfbipPL6chWyE` | ECO dashboard hero |
| `work/merkle/research-1..3.png` | `7B1A96OIdqMWGnvIw06Izj8peQ` `WT0AjMveaXnHB9gng8Pbtn1N7Ec` `nNyVlyv517i3AESp0mUqStI2Vs` | Research strips |
| `work/merkle/affinity.png` | `4ZJ51GFx8oHezRofCrOIoROz4` | Affinity map |
| `work/merkle/ia-1.png` / `ia-2.png` | `hMKBerq73vfMDmndmgK9ozT5OKE` / `5GsGeIWwrvicMvXVVNex1ucbFgQ` | IA diagrams |
| `work/merkle/shipped-1.png` / `-2.png` | `TCpkB3LcRK7hOPfiqih3zUbJhM` / `rcwLE0VTW9wODDEGUt8QrL7k8Uk` | What Shipped boards |
| `work/merkle/dashboard-1.png` / `-2.png` | `p2Ng3k1UDz2ZLlzOjXD7NcBxRDw` / `GQKMgOvcF5mhitPPVeVlVUcPfrM` | Dashboard |
| `work/merkle/campaign-library.png` | `yKKUIWUyRyfhaoG3dNUnSGxFN14` | Campaign Library |
| `work/merkle/wizard.png` | `Ek7UUX90wrCeZsdwcrmsLz91EQ` | Campaign Wizard |
| `work/merkle/audience-builder.png` | `kCI5jTBOxdigDay5HHPdw53Za8U` | Audience Builder |
| `work/merkle/journey-builder.png` | `1OqzCtUULEK2tzkIRmIMeZvhvaY` | Journey Builder |
| `work/merkle/review.png` | `qvtyuA5jQvAEuCvE8aQSy4XWQI` | Review Screen |
| `work/merkle/monitoring.png` | `uEisVNdLXre1z7fhwwOpmzDTU` | Live Monitoring |
| `work/merkle/analytics.png` | `hK59SzB1SupPcgq93tSDtGCOFE` | Analytics |
| `work/merkle/experiments.png` | `BCK2UXctXT4TfijUCdIahikfBk` | Experiments |
| `work/merkle/approvals.png` | `Tk0eN0ESMxwJE8J8Ho2riGAHfFo` | Approvals |
| `work/merkle/comments.png` | `QEHardrHMQu6Cib2T5Vq5gGBC0Y` | Comments |
| `work/merkle/asset-library.png` | `248jaeL9MlW5UbdxjDS4HdRgdI` | Asset Library |
| `work/vesseli/logo.png` | `JKgkb60xU5f6UUVLqtmL8Cr4` | Vesseli mark |
| `work/vesseli/hero.png` | `u1EtSoY75taqHnzsTr527P8k` | Hero |
| `work/vesseli/opportunity.png` | `SwY2VNPOelMlqXf1u3xHaE7XqU` | Opportunity (same as home card) |
| `work/vesseli/problem.png` | `YYtPWDuBxG81FNpXIUnS7RFUuAQ` | Problem |
| `work/vesseli/research-1.png` / `-2.png` | `wwqTx5retuto8hBw73Xw2XkTGc` / `8j27C6aJF9cOCDyn8NWGQWooRrg` | Research |
| `work/vesseli/seapeople.webp` | `ryfHpf0EhFw4jwiwUSq8ZsAz1Ag` | SeaPeople teardown |
| `work/vesseli/requirements.png` | `g8ZGsdTPLuEJa2MVWm6gIzQvvoA` | Requirements |
| `work/vesseli/persona.png` | `TAZOSeS444QBEuY0DY828eny0` | Boat-owner persona |
| `work/vesseli/design-system.png` | `H310F7qFKfDmn4C8u0bW3GnbA` | Design system board |
| `work/vesseli/design-1..3.png` | `okRK9IrSSVu8CgyoScr4p83rXU` `oRSIW83hN5CmsQzhhiwt33go` `l0M2VDHYFVARTtEKBnE9xZDbYM` | Before/after + screens |
| `work/vesseli/screens.png` | `Oq0rCmrYfShSVJIhwlFwJZ9jyGU` | Screen set |
| `work/forecash/logo.png` | `h7Gtz7ooqENuhQXxhKdRRrf3foM` | ForeCash mark |
| `work/forecash/hero.png` | `VjILOJwfEcdu4KqO5zGp96wMlOk` | Hero |
| `work/forecash/personas.png` | `D8mOO5Moim0856OX3oqCIdFWIbM` | Jesse & Caitlyn |
| `work/forecash/problem.png` | `zf2t2zKtnKPMIhBu3zTC2jxv8` | Problem |
| `work/forecash/affinity.png` | `sOdgfumEeluXSp7abLS8PFRYl4` | Affinity map |
| `work/forecash/research-1..3.png` | `WzNSj6Qp71Q72kW9aXtgYv1HTnk` `ljIjENczp6cR5Unxrh9v83e18` `EAMNSHPFanNohHSHxYwqCaHCmTI` | Research |
| `work/forecash/test-erica.png` / `test-cleo.png` | `qK3HYCMH5b6VxuEjGQIWmRN6o` / `ozDHK5xFglh5OiBAZFFizmBVOE` | Usability tests |
| `work/forecash/requirements.png` | `abozi2zOuOf4vDOP9S5IPTSB64` | Requirements |
| `work/forecash/persona.png` | `wiqYCEc7dPbDfL8eBYXSJFL9Bc` | Emily persona |
| `work/forecash/ai-1..3.png` | `lNnAvxKk2PzVfJxN32B411MZHk` `g2sPp6YAGFTIgIZSdNaXbJuiMU` `knLB6JE47kBShT6PSYpfiUmQdA` | AI insights |
| `work/forecash/design-system.png` | `jImTOtzcgDbreMzu6qiP0J4xdmE` | Design system board |
| `work/forecash/board.png` | `pukcgT6R6h6dBQFPsFsqx5E74` | Full design board |
| `work/forecash/journey.png` | `phDcGUhS1q7aNvSAQ2VLj1sp1M` | Journey map |
| `work/forecash/feature-1.png` / `-2.png` | `OxTgmXvIQ7P6UXB60uTDdz0s4` / `lSbh5N36bJl9NABsXTMKv4ALuc` | Feature frames |
| `work/forecash/onboarding.png` | `DzmyKPDxd5iypJEpA0UegfCERnU` | Onboarding, two versions |
| `work/forecash/dashboard.png` | `TVHqmClEWPAkSLrBT8zIlpzFA` | Auth & dashboard |
| `work/forecash/goals.png` | `ZX0Iv0naoeLNJGn8TLLO7WiNF5c` | Goals & transactions |
| `work/forecash/profile.png` | `oyidA5mymU0MOiPjARApypQuA` | Profile & security |
| `work/forecash/ai-interaction.png` | `cbgcsviPTsEizBTNVZlGvXh3eqU` | AI chat interaction |
| `blog/anthemnation-hero.png` | `LCBh6HiuATVUFMWw6R0JgJMnwzg` | Anthem post hero |
| `blog/anthemnation-1.png` | `rYu9UbL6i3zZZG29d6Sppy81LI` | Anthem post in-body |
| `blog/anthemnation-card.png` | `VR0cTGNMbfbrChdFBFIpZgVX3Qs` | Blog index card |
| `blog/designphilosophy-hero.gif` / `-1.gif` | `FhgtH5nJpuNYfytu5on17AK7IE` / `0UNbqRR6IMdrBMXpUBLHeiiPcwg` | Philosophy post hero + in-body |
| `blog/designphilosophy-card.gif` | `sgdK1ToRXZKGO9bzaWZEfQySeg` | Blog index card |
| `blog/designphilosophy-author.jpeg` | `x5ksuiXcOW5dotwUdBij19Z5ag` | Author illustration |
| `blog/spotify-syncro-hero.png` | `UE6J4nODsXXO2dGr1LE7NrjWUeQ` | Syncro post hero |
| `blog/spotify-syncro-1.png` | `64Vt73yuNe54hOuxcL5cN7lhg` | Syncro in-body |
| `blog/spotify-syncro-card.gif` | `NU7wKPWA2Xi6W6IaN0l3YAg6fw` | Blog index card |
| `blog/spotify-syncro-author.jpeg` | `ILc73DVGoBLNlmVb5suE6o` | Author photo |

Deliberately skipped: "James Parker" template logos, the BG Grain texture,
quote-icon/arrow SVGs, and the divider strip — Framer template residue, not
content.

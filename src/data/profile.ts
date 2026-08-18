/**
 * Everything the site says about Abhinav, in one place.
 *
 * Taken from abhikrish.framer.website rather than rewritten, so the new site
 * says what the old one said. Where the old site contradicted itself the
 * conflict is noted at the value, not silently resolved.
 */

export const PROFILE = {
  name: 'Abhinav Krishnan',
  initials: 'AK',
  role: 'UX / Product Designer',
  location: 'Houston, TX',
  available: true,
  email: 'abhinavdesignerux@gmail.com',
  phone: '+1 (945) 249-6036',
  tagline: 'A UX/Product Designer based in Houston, TX',
  metaDescription:
    'Abhinav is a UX/Product Designer currently open to full time opportunities in the US.',
  intro:
    'I am a strategist, crafting experiences that connect deeply and spark creativity.',
  bio:
    'I specialise in UI/UX design, web and mobile interfaces, and brand identity. I turn complex ideas into intuitive, visually striking designs using Figma, pencil and Framer. Driven by research, clarity and attention to detail, I create interfaces that do not just look good, they work.',
  aboutQuote:
    'I’m a UX/Product Designer who builds with clarity and questions with intent. I stay current with design trends but focus on what truly improves the experience.',
  aboutBody:
    'I care about solving real world problems. From healthcare and enterprise products to B2B2C and SaaS, my work centres on reducing friction and designing systems that feel human.',
  philosophyTitle: 'The Law of Circle',
  philosophy: [
    'It means that no matter how far I go, I always return to the basics. In a field that constantly moves forward, I pause, reflect, and revisit the foundation: the users, the context, the core problem.',
    'That loop keeps my work honest and focused. For me, design isn’t about chasing novelty. It’s about staying rooted while growing sharper.',
  ],
} as const

/**
 * Portraits for the About page. They sit in a column that stays with the
 * reader from "Who I am" through "My approach", which is the stretch of the
 * page that is otherwise unbroken prose.
 */
export const ABOUT_IMAGES = [
  { src: 'img/about/portrait-1.jpg', alt: 'Abhinav Krishnan' },
  { src: 'img/about/portrait-2.jpg', alt: 'Abhinav Krishnan at work' },
] as const

/** 6. The ATS resume, one frame per page, stacked. */
export const RESUME_PAGES = [
  { src: 'img/resume/resume-1.jpg', alt: 'Resume, page one' },
  { src: 'img/resume/resume-2.jpg', alt: 'Resume, page two' },
] as const

/** Outbound profiles. Instagram is pending a URL from Abhinav. */
export const SOCIALS: { label: string; href: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhinavux4/' },
  { label: 'Medium', href: 'https://medium.com/@abhinavkrish.ux' },
  { label: 'Behance', href: 'https://www.behance.net/abhinavkrish' },
]

export const SERVICES = [
  { no: '01', name: 'Product Design' },
  { no: '02', name: 'UI/UX Design' },
  { no: '03', name: 'Web Design' },
  { no: '04', name: 'Branding' },
] as const

/**
 * The About page's numbers, not the home page's.
 *
 * The old site ran two different sets. Home claimed "10+ Years of Experience"
 * and "95% Client Satisfaction"; About said "4+ Years of Professional UX
 * Experience" and "100%". The work history starts in Nov 2021, so four is the
 * one that survives a reader checking it against the CV directly below.
 */
export const STATS = [
  { value: '4+', label: 'Years of professional UX experience' },
  { value: '20+', label: 'Projects completed' },
  { value: '100+', label: 'Product screens and flows designed' },
  { value: '50+', label: 'Mentorships provided' },
  { value: '10+', label: 'Validated UX and usability tests' },
  { value: '100%', label: 'Client satisfaction' },
] as const

export const EXPERIENCE = [
  {
    role: 'Product Designer',
    org: 'SquareResults',
    logo: 'img/work/squareresults.png',
    period: 'Dec 2025, Present',
    points: [
      'Owned end to end product design for SquareResults, an AI powered job matching platform, taking it from concept to an investor ready MVP in 30 days, including the candidate swipe and recruiter dashboard experiences.',
      'Built scalable, role based interfaces and a cross platform Figma system, translating complex AI matching logic into intuitive UX alongside engineering.',
    ],
  },
  {
    role: 'UI/UX Designer',
    org: 'Anthem Nation',
    logo: 'img/work/anthem-nation.png',
    period: 'Dec 2025, Jun 2026',
    points: [
      'Led UI design for Anthem Nation’s education and events platforms, restructuring the information architecture to simplify navigation and improve consistency.',
      'Designed Harmoney, a platform for businesses to manage payments, payouts and financial workflows, building its website, mobile framework and design system from scratch.',
    ],
  },
  {
    role: 'Freelance UX/UI Product Designer',
    org: 'Vesseli',
    logo: 'img/work/vesseli.png',
    period: 'Oct 2025, Dec 2025',
    points: [
      'Led end to end UX for a maritime platform, improving onboarding through research, journey mapping and iterative testing so users reached their first key action faster.',
      'Built a responsive Figma design system and prototyped features supporting 100+ yacht deliveries annually.',
    ],
  },
  {
    role: 'Product Designer',
    org: 'Merkle',
    logo: 'img/work/merkle.png',
    period: 'Jul 2024, Aug 2025',
    points: [
      'Led end to end UX for an enterprise marketing platform, improving campaign workflows through research, prototyping and usability testing with 150+ users, driving a 22% engagement increase.',
      'Designed scalable Figma systems and reusable patterns that simplified complex workflows across product, business and engineering.',
    ],
  },
  {
    role: 'UI/UX Designer, Contributor',
    org: 'GlucoGuard',
    logo: 'img/work/glucoguard.png',
    period: 'Jan 2024, May 2024',
    points: [
      'Designed real time glucose monitoring dashboards to enable faster emergency response and improve patient outcomes.',
    ],
  },
  {
    role: 'UX Designer Intern',
    org: 'Datamatics',
    logo: 'img/work/datamatics.png',
    period: 'Nov 2021, Aug 2022',
    points: [
      'Developed wireframes and prototypes for enterprise software, supporting research and design systems to improve consistency and usability.',
    ],
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'I had the pleasure of working with Abhinav at Anthem Nation, where he made a strong impact across the website, Anthem Academy, and Harmoney. He brings a clear, user-centered approach and turns complex ideas into practical solutions. Collaborative and proactive, he has strong potential as a Product Designer.',
    name: 'Tyi Moncrieffe',
    title: 'CEO, Anthem Nation',
    avatar: 'img/people/tyi.jpg',
  },
  {
    quote:
      'Abhinav did an excellent job leading the UX/UI design for Vesseli’s MVP, turning a complex maritime platform into a clear, scalable experience. He defined key user flows across core segments and built a strong foundation for future growth, showcasing strong systems thinking and attention to detail.',
    name: 'Laurence McRory',
    title: 'CEO, Vesseli',
    avatar: 'img/people/laurence.jpg',
  },
] as const

export type Post = {
  slug: string
  title: string
  summary: string
  href: string
  accent: string
  body: { heading: string; paragraphs: string[] }[]
}

/**
 * Posts open in place, the same way a case study does, with the original on
 * Medium one click away. The body here is a précis rather than the full piece:
 * writing Abhinav's article for him would put words in his mouth, so each one
 * says what it covers and then hands off.
 */
export const POSTS: Post[] = [
  {
    slug: 'anthemnation',
    title: 'Designing for Culture, Community, and Impact',
    summary:
      'What it took to design for a community first brand, and why culture had to lead the product rather than decorate it.',
    href: 'https://abhikrish.framer.website/blog/anthemnation',
    accent: '#1f6f4a',
    body: [
      {
        heading: 'Culture is the brief, not the styling',
        paragraphs: [
          'Working across Anthem Nation\u2019s website, Anthem Academy and Harmoney meant designing for a community that already had a voice. The job was to build product around that voice rather than apply it as a layer at the end.',
          'Read the full piece on the original site.',
        ],
      },
    ],
  },
  {
    slug: 'designphilosophy',
    title: 'A Philosophical Approach to UX Design',
    summary:
      'The Law of Circle in practice: returning to the user, the context and the core problem no matter how far the work has travelled.',
    href: 'https://abhikrish.framer.website/blog/designphilosophy',
    accent: '#4a4a86',
    body: [
      {
        heading: 'Going far, and coming back',
        paragraphs: [
          'In a field that constantly moves forward, the discipline is pausing to revisit the foundation: the users, the context, the core problem. That loop is what keeps the work honest.',
          'Read the full piece on the original site.',
        ],
      },
    ],
  },
]

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug)

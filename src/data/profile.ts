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
  role: 'Product Designer | UI/UX Designer',
  location: 'Houston, TX',
  available: true,
  email: 'abhinavdesignerux@gmail.com',
  phone: '+1 (945) 249-6036',
  tagline: 'A UX/Product Designer currently based in Houston, TX',
  metaDescription:
    'Abhinav is a UX/Product Designer currently open to full time opportunities in the US.',
  intro:
    'I am a Product Designer who thrives in the space between an idea and a product.',
  bio:
    'I turn ideas into products, and complexity into clarity. I am a Product Designer/UX Designer based in Houston, TX, connecting product thinking, design, technology, and AI to move ideas from early concepts to real, buildable experiences.',
  aboutQuote:
    'I enjoy taking ambiguous problems, early concepts, and complex workflows and turning them into clear, practical experiences. My work goes beyond designing interfaces. I focus on understanding the problem, exploring possibilities, shaping the right solution, and working through what it takes to make that solution real.',
  aboutBody:
    'I have worked across enterprise SaaS, AI, fintech, healthcare, and B2B2C products, partnering with product managers, engineers, analysts, founders, and stakeholders throughout the design process.',
  philosophyTitle: 'How I bring ideas to life',
  philosophy: [
    'My approach combines product thinking, UX, visual design, and technical understanding.',
    'I can move from research and problem framing to information architecture, user flows, prototypes, and high-fidelity interfaces. Because I understand frontend logic and development constraints, I design with implementation in mind and collaborate closely with engineers to bridge the gap between what is imagined and what gets built.',
    'AI is also becoming an important part of how I work. I use it as a tool to explore ideas faster, prototype interactions, experiment with solutions, and accelerate execution while keeping human judgment at the center.',
  ],
  valueTitle: 'What I bring to a team',
  value: [
    'I bring curiosity at the beginning of a problem and ownership through execution.',
    'I question assumptions, generate possibilities, and look for solutions that balance user needs, business goals, and technical reality.',
    'My goal is simple: turn good ideas into products that create real value.',
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
  { src: 'img/resume/Resume1.jpg', alt: 'Resume, page one' },
  { src: 'img/resume/Resume2.jpg', alt: 'Resume, page two' },
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

export type ExperienceJob = {
  role: string
  org: string
  logo?: string
  logoFit?: 'contain' | 'cover'
  period: string
  points: readonly string[]
}

export const EXPERIENCE: readonly ExperienceJob[] = [
  {
    role: 'Product Designer',
    org: 'SquareResults',
    logo: 'img/work/sqr.jpg',
    period: 'Dec 2025 - Present',
    points: [
      'Owned end to end product design for SquareResults, an AI powered job matching platform, taking it from concept to an investor ready MVP in 30 days, including the candidate swipe and recruiter dashboard experiences.',
      'Built scalable, role based interfaces and a cross platform Figma system, translating complex AI matching logic into intuitive UX alongside engineering.',
    ],
  },
  {
    role: 'UI/UX Designer',
    org: 'Anthem Nation',
    logo: 'img/work/anthem-nation.jpg',
    period: 'Dec 2025 - Jun 2026',
    points: [
      'Led UI design for Anthem Nation’s education and events platforms, restructuring the information architecture to simplify navigation and improve consistency.',
      'Designed Harmoney, a platform for businesses to manage payments, payouts and financial workflows, building its website, mobile framework and design system from scratch.',
    ],
  },
  {
    role: 'UX/UI Designer',
    org: 'Vesseli',
    // A square tile cut from the full lockup. The original is 3375x3002 with
    // the mark floating in the middle of a navy field, so a 36px circle cropped
    // to empty background; and at that size the wordmark under the anchor is a
    // smudge, so the tile is the anchor alone.
    logo: 'img/work/vesseli-logo.png',
    logoFit: 'cover',
    period: 'Oct 2025 - Dec 2025',
    points: [
      'Led end to end UX for a maritime platform, improving onboarding through research, journey mapping and iterative testing so users reached their first key action faster.',
      'Built a responsive Figma design system and prototyped features supporting 100+ yacht deliveries annually.',
    ],
  },
  {
    role: 'Product Designer',
    org: 'Merkle',
    // Already a square brand tile, so it fills the circle the way the others
    // do. Contained, it sat as a small mark on a plain border instead.
    logo: 'img/work/Merkle.png',
    logoFit: 'cover',
    period: 'Jul 2024 - Aug 2025',
    points: [
      'Led end to end UX for an enterprise marketing platform, improving campaign workflows through research, prototyping and usability testing with 150+ users, driving a 22% engagement increase.',
      'Designed scalable Figma systems and reusable patterns that simplified complex workflows across product, business and engineering.',
    ],
  },
  {
    role: 'UI/UX Designer, Contributor',
    // The logo on the old site is the Jewish Healthcare Foundation's;
    // GlucoGuard was the product, not the employer.
    org: 'Jewish Healthcare Foundation',
    logo: 'img/work/jhf.png',
    period: 'Jan 2024 - May 2024',
    points: [
      'Designed real time glucose monitoring dashboards to enable faster emergency response and improve patient outcomes.',
    ],
  },
  {
    role: 'UX Designer Intern',
    org: 'Datamatics',
    logo: 'img/work/datamatics.jpg',
    period: 'Nov 2021 - Aug 2022',
    points: [
      'Developed wireframes and prototypes for enterprise software, supporting research and design systems to improve consistency and usability.',
    ],
  },
]

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

export type PostImage = { src: string; caption?: string; ratio?: string }

export type Post = {
  slug: string
  title: string
  summary: string
  href: string
  accent: string
  date: string
  category: string
  /** Card thumbnail on the blog index; the accent panel shows without it. */
  card?: string
  /** Lead image at the top of the article. */
  hero?: PostImage
  body: {
    heading: string
    paragraphs: string[]
    quote?: { body: string; source?: string }
    image?: PostImage
    /**
     * Product screens, shown in their hardware rather than as a flat picture.
     *
     * A post can hold real screens as well as illustrations, and the Spotify
     * piece is about an interface: a screenshot of one is worth more in a phone
     * than in a rectangle.
     */
    screens?: { device: 'phone' | 'web'; items: { src: string; caption?: string }[] }
  }[]
}

/**
 * Posts open in place, the same way a case study does. The bodies are the
 * full articles as published on the Framer site, carried over verbatim; the
 * original stays linked one click away.
 */
export const POSTS: Post[] = [
  {
    slug: 'anthemnation',
    title: 'Designing for Culture, Community, and Impact',
    summary:
      'Anthem Nation builds artists and cultural influence; Anthem Academy teaches music, AI and entrepreneurship. Designing for both meant culture leading the product, not decorating it.',
    href: 'https://abhikrish.framer.website/blog/anthemnation',
    accent: '#1f6f4a',
    date: 'Jan 1, 2026',
    category: 'Education & Record Platform',
    card: 'img/blog/anthemnation-card.png',
    hero: { src: 'img/blog/anthemnation-hero.png', ratio: '3806/3768' },
    body: [
      {
        heading: 'Understanding the ecosystem',
        paragraphs: [
          'Anthem Nation and Anthem Academy are two connected platforms with different roles.',
          'Anthem Nation focuses on building artists, content, and cultural influence. Anthem Academy is a nonprofit that provides education in music, AI, and creative entrepreneurship.',
          'One drives visibility. The other drives real-world impact.',
        ],
      },
      {
        heading: 'My role in the design process',
        paragraphs: [
          'I designed the anthem academy website focusing on Anthem Fest, Core programs turning complex ideas into clear, structured experiences.',
          'My work involved defining user flows and content structure, designing intuitive, modern layouts, and creating a consistent visual system across both platforms.',
          'The goal was simple: make users understand the product quickly and trust it.',
        ],
        quote: {
          body: 'I had the pleasure of working with Abhinav at Anthem Nation, where he made a strong impact across the website, Anthem Academy, and Harmoney. He brings a user-centered approach, simplifies complex ideas, and shows great potential as a Product Designer.',
          source: 'Tyi Moncrieffe, CEO | Anthem Nation, The Anthem Academy',
        },
      },
      {
        heading: 'Designing Anthem Nation',
        paragraphs: [
          'Anthem Nation needed to feel bold and forward-thinking.',
          'I focused on clear hierarchy to highlight artists and offerings, strong visuals that reflect energy and movement, and messaging that positions it as more than just a music brand.',
          'The experience is designed to feel fast, confident, and intentional.',
        ],
      },
      {
        heading: 'Designing the Anthem Academy',
        paragraphs: [
          'Anthem Academy needed clarity and trust.',
          'I focused on simple structure and easy navigation, accessible and inclusive design choices, and clear messaging around programs and impact.',
          'The goal was to help users instantly understand what the academy offers and how it helps them.',
        ],
        image: { src: 'img/blog/anthemnation-1.png', ratio: '3812/3392' },
      },
      {
        heading: 'Real world impact',
        paragraphs: [
          'The Anthem Academy operates as a real community hub through its partnership with NYC Parks and Recreation.',
          'It helps young creators learn music production and AI, build creative and career skills, and access opportunities they wouldn’t otherwise have.',
          'This is where design directly supports real-world outcomes.',
        ],
      },
    ],
  },
  {
    slug: 'designphilosophy',
    title: 'A Philosophical Approach to UX Design',
    summary:
      'Life is unpredictable, and so is every user’s first session. Uncertainty is not the enemy of design; managed well, it is the material.',
    href: 'https://abhikrish.framer.website/blog/designphilosophy',
    accent: '#4a4a86',
    date: 'Oct 12, 2025',
    category: 'Branding',
    card: 'img/blog/designphilosophy-card.gif',
    hero: { src: 'img/blog/designphilosophy-hero.gif', ratio: '640/356' },
    body: [
      {
        heading: 'Understanding the concept',
        paragraphs: [
          'Life is inherently unpredictable. If we were to know the exact moment of our death, the nature of our worries would change entirely. Rather than being consumed by the daily challenges we face, we might focus on savoring the fleeting moments we have left. This duality of unpredictability, both daunting and soothing, mirrors the intricacies of user experience (UX) design.',
        ],
      },
      {
        heading: 'The paradox of uncertainty',
        paragraphs: [
          'Uncertainty in life can be unsettling. It forces us to confront the unknown and often compels us to prepare for the worst. However, it’s this very unpredictability that can also be profoundly liberating. Without a fixed endpoint, life retains its richness, allowing us to experience joy, curiosity, and wonder.',
          'Similarly, in UX design, uncertainty can be both a challenge and an opportunity. As designers, we are tasked with creating experiences that guide users through the unknown. Users often approach a product or service with a degree of uncertainty.',
        ],
        quote: {
          body: 'How will this work? Will it meet my needs? How do I navigate this interface?',
          source: 'The questions every user arrives with; answering them is the job',
        },
        image: { src: 'img/blog/designphilosophy-1.gif', ratio: '640/358' },
      },
      {
        heading: 'Designing for uncertainty',
        paragraphs: [
          'In UX, we don’t eliminate uncertainty; instead, we manage it. A well-designed interface anticipates the user’s needs and provides clear, intuitive guidance. This doesn’t mean that everything needs to be predictable or overly simplistic. On the contrary, a degree of uncertainty can engage users, prompting exploration and discovery. It’s about striking a balance: providing enough structure to make the experience comfortable while leaving room for the unexpected.',
          'For instance, consider the onboarding process of a new app. A user might initially feel unsure about how to get started. A thoughtful design will gently guide them through the initial steps, offering reassurance while encouraging exploration. By gradually revealing features and providing contextual hints, we help users build confidence in their ability to navigate the unknown.',
        ],
      },
      {
        heading: 'Uncertainty as a design principle',
        paragraphs: [
          'Philosophically, embracing uncertainty allows us to appreciate life’s unpredictability, finding peace in the unknown. In UX design, a similar approach can enhance the user experience. By acknowledging the inherent uncertainty in human-computer interaction, we can create designs that are not only functional but also emotionally resonant.',
          'Designers should consider unpredictability as a tool. Not something to be feared, but something to be harnessed. By embracing uncertainty, we can create experiences that are more engaging, more human, and ultimately, more satisfying.',
        ],
      },
      {
        heading: 'Final thoughts',
        paragraphs: [
          'Life’s unpredictability is a source of both anxiety and liberation. In UX design, the same principle applies. By understanding and embracing uncertainty, we can create experiences that are not only user-friendly but also deeply meaningful. Just as we might find comfort in the unpredictability of life, users can find joy in the exploration and discovery that comes with a well-designed product.',
          'Embracing uncertainty in UX design isn’t just about solving problems, it is about creating experiences that resonate with the unpredictable nature of life itself.',
        ],
      },
    ],
  },
  {
    slug: 'spotify-syncro',
    title: 'Spotify Syncro: The idea and execution',
    summary:
      'Two college students, one remix, and a pitch that ended in a room with Spotify Group Product Managers. The story of Syncro, a customization layer for Spotify.',
    href: 'https://abhikrish.framer.website/blog/spotify-syncro',
    accent: '#1db954',
    date: 'Oct 15, 2025',
    category: 'Music Technology / Entertainment',
    card: 'img/blog/spotify-syncro-card.gif',
    hero: { src: 'img/blog/spotify-syncro-hero.png', ratio: '4220/2392' },
    body: [
      {
        heading: 'Enhancing music customization in Spotify',
        paragraphs: [
          'Design is everywhere, but not all design leaves a mark. What separates the ordinary from the enduring is purpose. For me, design isn’t about decorating an idea; it’s about shaping it into an identity that lasts. Purpose is the thread that connects creativity, strategy, and storytelling into something timeless.',
          'During the Summer of 2024, two college students designed a solution to the Spotify premium problem; here’s the story of how we went from an idea to a meeting with multiple product designers and Group Product Managers.',
          'Check out our YouTube video: youtube.com/watch?v=LwSfu3HEof0',
        ],
      },
      {
        heading: 'How it all started',
        paragraphs: [
          'I stumbled upon an intriguing remix of a popular song, sparking the idea of customizable music in our favorite streaming app, Spotify. Frustrated by the cumbersome process of downloading and uploading music to third-party applications just to enjoy altered versions, I envisioned a more seamless solution.',
          'I began designing a customizable interface for Spotify. What started as a casual idea quickly evolved into a serious project. I realized that many users, like me, craved more control over their listening experience. To validate my concept, I interviewed fellow students and gathered their feedback.',
          'To my surprise, many were unaware that Spotify already had an equalizer feature! This revelation solidified my resolve to incorporate not just pitch and speed changers, but also to highlight and enhance the existing equalizer function.',
        ],
        quote: {
          body: 'What if there was a way to customize songs on the go? It would be nice to play around with tunes.',
        },
        screens: {
          device: 'phone',
          items: [
            { src: 'img/work/spotify-alter/screens/01-now-playing-original.webp', caption: 'The track as released' },
            { src: 'img/work/spotify-alter/screens/02-vibe-sheet-presets.webp', caption: 'Start from a feel' },
            { src: 'img/work/spotify-alter/screens/03-vibe-sheet-advanced.webp', caption: 'Or shape it by hand' },
            { src: 'img/work/spotify-alter/screens/08-now-playing-yours.webp', caption: 'The same track, yours' },
          ],
        },
      },
      {
        heading: 'Determined to turn vision into reality',
        paragraphs: [
          'Fueled by excitement and curiosity, I conducted more interviews, surveyed hundreds of students, and even pitched the concept to multiple product designers and Group Product Managers. The journey from a simple idea to a comprehensive design concept, now known as Spotify Syncro, has been nothing short of exhilarating.',
          'In the fast-paced world of music streaming, Spotify has maintained its position as a market leader, boasting millions of users worldwide. However, a significant trend has emerged where users increasingly share customized versions of songs on social media platforms like TikTok and Instagram. While this trend has enhanced user engagement, it has also led to considerable copyright challenges for artists and streaming platforms. To tackle these issues and elevate user experience, “Syncro”, a comprehensive design concept aimed at revolutionizing music customization in Spotify.',
        ],
      },
      {
        heading: 'The solution',
        paragraphs: [
          'Trends come and go, but purposeful design stands the test of time. By grounding each decision in strategy and story, identities gain the flexibility to evolve without losing their core. This adaptability is what makes them not just relevant today, but enduring tomorrow.',
          'Spotify Syncro introduces two distinct modes: Creative Mode lets users alter pitch and speed to create personalized versions of tracks, then save them to custom playlists. Altered Mode offers access to pre-customized songs inspired by trends across TikTok, Instagram, and user data worldwide.',
          'A new Trending section highlights viral edits, and intuitive navigation makes exploring customizations seamless.',
        ],
      },
      {
        heading: 'Customization features',
        paragraphs: [
          'Pitch and Speed Changers: integrate these features within the app to allow users to customize their listening experience.',
          'Modes: introduce “Creative Mode” and “Altered Mode” to cater to different user preferences.',
        ],
      },
      {
        heading: 'Experience & impact',
        paragraphs: [
          'Syncro deepens user engagement through personalization, encouraging longer sessions and increasing satisfaction. This added value helps justify a new Premium+ tier at $14.99/month (vs. the standard $9.99), with unique features driving loyalty and retention.',
        ],
      },
      {
        heading: 'Business objectives',
        paragraphs: [
          'We project $200M in added revenue in year one, a $1.50 ARPU increase, and a 10% bump in subscribers. Copyright concerns will be addressed through legal reviews and responsible implementation.',
          'Market Positioning: Spotify holds a 15% growth rate YoY and dominates among users aged 18 to 34. The music streaming market is on track to hit $45B by 2025, and competitors like Apple Music, Amazon Music, and YouTube Music lag behind in personalization. Syncro gives Spotify a clear edge.',
          'GTM Strategy: To reach the 18 to 34 tech-savvy segment, our launch strategy includes influencer campaigns, social media promotion, and gamified referral programs. A high-impact launch event and continued updates will keep Syncro in the spotlight.',
        ],
      },
      {
        heading: 'Final thoughts',
        paragraphs: [
          'To refine our approach, we pitched our idea to Spotify employees across design, product, and marketing. Through 35 to 50 outreach messages, we secured meetings including one with a Group Product Manager and gained valuable feedbacks. Iterating on these conversations, we evolved our pitch deck and even partnered with a Senior Product Designer at Spotify to strengthen our vision.',
        ],
      },
    ],
  },
]

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug)

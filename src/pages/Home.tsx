import { PROFILE } from '@/data/profile'
import { CASE_STUDIES } from '@/data/projects'
import { Gallery } from '@/components/Gallery'

/**
 * The reference's whole layout: floating pill (in Chrome), a centered text
 * block, then a single full-bleed horizontal scroll row. No stacked sections,
 * no footer — the work is the page.
 *
 * The hero opens on a large bold heading with the portrait inlined between
 * "Hi," and "I'm Abhinav!" — the cheapest way to make it personal without
 * touching the palette. Below it sits the bio, and at the bottom a bouncing
 * down arrow that scrolls to the work gallery.
 *
 * Its arrival is staggered by --hero-i and gated behind [data-intro='done'],
 * so it plays once on a real arrival and is instant every time the visitor
 * comes back to home from another page.
 */
export function Home() {
  return (
    <>
      <section data-no-reveal className="grid min-h-[70vh] place-items-center px-6 pt-28 pb-10">
        <div className="max-w-[780px] text-center">

          {/* ── The headline with inline portrait ──────────────── */}
          <h1
            className="hero-item hero-headline"
            style={{ '--hero-i': 0 } as React.CSSProperties}
          >
            Hi,{' '}
            <span className="hero-portrait-wrap">
              <img
                src="img/about/avatar.jpg"
                alt=""
                width={64}
                height={64}
                decoding="async"
                className="hero-portrait"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </span>{' '}
            I'm Abhinav!
          </h1>

          {/* ── Sub-line ───────────────────────────────────────── */}
          <p
            className="hero-item t-body mt-6 text-(--ink-muted)"
            style={{ '--hero-i': 1 } as React.CSSProperties}
          >
            {PROFILE.bio}
          </p>

          {/* ── Bouncing down arrow ────────────────────────────── */}
          <span
            className="hero-item hero-arrow"
            style={{ '--hero-i': 2 } as React.CSSProperties}
            aria-hidden="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </span>
        </div>
      </section>

      <section id="work" aria-label="Selected work" className="scroll-mt-28 pb-20">
        <Gallery projects={CASE_STUDIES} />
      </section>
    </>
  )
}


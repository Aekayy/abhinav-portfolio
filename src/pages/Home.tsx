import { PROFILE } from '@/data/profile'
import { CASE_STUDIES } from '@/data/projects'
import { Gallery } from '@/components/Gallery'

/**
 * The reference's whole layout: floating pill (in Chrome), a centered text
 * block, then a single full-bleed horizontal scroll row. No stacked sections,
 * no footer — the work is the page.
 *
 * The hero opens on the portrait. The reference delegates all colour to the
 * work, which leaves the top of the page as pure typography; one human face
 * above the headline is the cheapest way to make it a person's gallery rather
 * than a template, and it costs the palette nothing.
 *
 * Its arrival is staggered by --hero-i and gated behind [data-intro='done'],
 * so it plays once on a real arrival and is instant every time the visitor
 * comes back to home from another page.
 */
export function Home() {
  return (
    <>
      <section data-no-reveal className="grid min-h-[52vh] place-items-center px-6 pt-28 pb-14">
        <div className="max-w-[680px] text-center">
          <img
            src="img/about/avatar.jpg"
            alt=""
            width={72}
            height={72}
            decoding="async"
            className="hero-item mx-auto mb-7 h-[72px] w-[72px] rounded-full border border-(--line)
                       bg-(--surface) object-cover"
            style={{ '--hero-i': 0 } as React.CSSProperties}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />

          {PROFILE.available && (
            <p
              className="hero-item t-caption mb-6 inline-flex items-center gap-2 rounded-(--radius-pill)
                         border border-(--line) px-3 py-1.5 text-(--ink-muted)"
              style={{ '--hero-i': 1 } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
              Available for full time roles
            </p>
          )}

          <h1
            className="hero-item t-display text-(--ink)"
            style={{ '--hero-i': 2 } as React.CSSProperties}
          >
            {PROFILE.tagline}
          </h1>

          <p
            className="hero-item t-body mt-6 text-(--ink-muted)"
            style={{ '--hero-i': 3 } as React.CSSProperties}
          >
            {PROFILE.bio}
          </p>
        </div>
      </section>

      <section id="work" aria-label="Selected work" className="scroll-mt-28 pb-20">
        <Gallery projects={CASE_STUDIES} />
      </section>
    </>
  )
}

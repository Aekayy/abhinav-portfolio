import { PROFILE } from '@/data/profile'
import { CASE_STUDIES } from '@/data/projects'
import { Gallery } from '@/components/Gallery'

/**
 * The reference's whole layout: floating pill (in Chrome), a centered text
 * block, then a single full-bleed horizontal scroll row. No stacked sections,
 * no footer — the work is the page.
 */
export function Home() {
  return (
    <>
      <section data-no-reveal className="grid min-h-[52vh] place-items-center px-6 pt-28 pb-14">
        <div className="max-w-[560px] text-center">
          {PROFILE.available && (
            <p className="t-caption mb-6 inline-flex items-center gap-2 rounded-(--radius-pill)
                          border border-(--line) px-3 py-1.5 text-(--ink-muted)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--ink)" aria-hidden="true" />
              Available for full time roles
            </p>
          )}
          <h1 className="t-display text-(--ink)">{PROFILE.tagline}</h1>
          <p className="t-body mt-6 text-(--ink-muted)">{PROFILE.bio}</p>
        </div>
      </section>

      <section id="work" aria-label="Selected work" className="scroll-mt-28 pb-20">
        <Gallery projects={CASE_STUDIES} />
      </section>
    </>
  )
}

import { PROFILE, STATS, EXPERIENCE, TESTIMONIALS } from '@/data/profile'
import { PageHead, Section, Eyebrow } from '@/components/Bits'

export function About() {
  return (
    <>
      <div className="shell">
        <PageHead eyebrow="About" title="Who I am and how I work" lede={PROFILE.aboutQuote} />
      </div>

      <Section>
        <p className="t-sub max-w-[60ch] text-(--ink)">{PROFILE.intro}</p>
        <p className="t-body mt-6 max-w-[62ch] text-(--ink-muted)">{PROFILE.aboutBody}</p>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>My approach</Eyebrow>
        <h2 className="t-heading text-(--ink)">{PROFILE.philosophyTitle}</h2>
        <div className="mt-6 grid max-w-[62ch] gap-5">
          {PROFILE.philosophy.map((p) => (
            <p key={p.slice(0, 24)} className="t-body text-(--ink-muted)">{p}</p>
          ))}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>By the numbers</Eyebrow>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="min-w-0 border-t border-(--line) pt-5">
              <div className="t-heading text-(--ink)">{s.value}</div>
              <div className="t-body-sm mt-1 text-(--ink-muted)">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>Work experience</Eyebrow>
        <p className="t-body max-w-[62ch] text-(--ink-muted)">
          From curious creator to full time designer, my path has been shaped by a passion for
          crafting purposeful, user-centred digital experiences.
        </p>
        <ol className="mt-12 grid gap-0">
          {EXPERIENCE.map((job) => (
            <li key={job.role + job.period} className="grid gap-3 border-t border-(--line) py-7 md:grid-cols-[1fr_2fr] md:gap-10">
              <div className="min-w-0">
                <div className="t-sub text-(--ink)">{job.role}</div>
                <div className="t-body-sm mt-1 text-(--ink-muted)">{job.org}</div>
                <div className="t-caption mt-2 text-(--ink-muted)">{job.period}</div>
              </div>
              <div className="min-w-0 grid gap-3">
                {job.points.map((pt) => (
                  <p key={pt.slice(0, 24)} className="t-body-sm text-(--ink-muted)">{pt}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>Testimonials</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card min-w-0 p-7">
              <blockquote className="t-body text-(--ink)">“{t.quote}”</blockquote>
              <figcaption className="t-body-sm mt-5 text-(--ink-muted)">{t.name} · {t.title}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  )
}

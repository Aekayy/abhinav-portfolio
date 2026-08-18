import { PROFILE, STATS, EXPERIENCE, TESTIMONIALS, ABOUT_IMAGES } from '@/data/profile'
import { Frame, Avatar } from '@/components/Frame'
import { PageHead, Section, Eyebrow } from '@/components/Bits'

export function About() {
  return (
    <>
      <div className="shell">
        <PageHead eyebrow="About" title="Who I am and how I work" lede={PROFILE.aboutQuote} />
      </div>

      {/* Text on the left, images on the right, and the images stay with the
          reader across both sections. This is the longest unbroken stretch of
          prose on the site, so it is the stretch that most needs something to
          look at. Sticky only where there is a second column to be sticky in. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-16">
          <div className="min-w-0">
            <p className="t-sub max-w-[52ch] text-(--ink)">{PROFILE.intro}</p>
            <p className="t-body mt-6 max-w-[54ch] text-(--ink-muted)">{PROFILE.aboutBody}</p>

            <div className="mt-16">
              <Eyebrow>My approach</Eyebrow>
              <h2 className="t-heading text-(--ink)">{PROFILE.philosophyTitle}</h2>
              <div className="mt-6 grid max-w-[54ch] gap-5">
                {PROFILE.philosophy.map((p) => (
                  <p key={p.slice(0, 24)} className="t-body text-(--ink-muted)">{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:h-max">
            <div className="grid gap-5">
              {ABOUT_IMAGES.map((img) => (
                <Frame key={img.src} src={img.src} alt={img.alt} ratio="4/5" />
              ))}
            </div>
          </div>
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
                <div className="flex items-center gap-3">
                  <Avatar src={job.logo} name={job.org} size={36} />
                  <div className="min-w-0">
                    <div className="t-sub text-(--ink)">{job.role}</div>
                    <div className="t-body-sm mt-0.5 text-(--ink-muted)">{job.org}</div>
                  </div>
                </div>
                <div className="t-caption mt-3 text-(--ink-muted)">{job.period}</div>
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
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar src={t.avatar} name={t.name} size={40} />
                <span className="t-body-sm min-w-0 text-(--ink-muted)">
                  <span className="block text-(--ink)">{t.name}</span>
                  {t.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  )
}

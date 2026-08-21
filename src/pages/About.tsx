import { PROFILE, STATS, EXPERIENCE, TESTIMONIALS, ABOUT_IMAGES } from '@/data/profile'
import { Frame, Avatar } from '@/components/Frame'
import { PageHead, Section, Eyebrow } from '@/components/Bits'

export function About() {
  return (
    <>
      <Section className="!pt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-16 items-start">
          <div className="min-w-0">
            <PageHead eyebrow="About" title="Who I am and how i work" lede={PROFILE.aboutQuote} />
            <p className="t-sub text-(--ink)">{PROFILE.intro}</p>
            <p className="t-body mt-6 text-(--ink-muted)">{PROFILE.aboutBody}</p>
          </div>
          <div className="min-w-0 lg:sticky lg:top-28 lg:h-max pt-16 md:pt-24">
            <Frame src={ABOUT_IMAGES[0].src} alt={ABOUT_IMAGES[0].alt} ratio="4/5" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-16 items-start mt-16">
          <div className="min-w-0">
            <Eyebrow>My approach</Eyebrow>
            <h2 className="t-heading text-(--ink)">{PROFILE.philosophyTitle}</h2>
            <div className="mt-6 grid gap-5">
              {PROFILE.philosophy.map((p) => (
                <p key={p.slice(0, 24)} className="t-body text-(--ink-muted)">{p}</p>
              ))}
            </div>
          </div>
          <div className="min-w-0 lg:sticky lg:top-28 lg:h-max">
            <Frame src={ABOUT_IMAGES[1].src} alt={ABOUT_IMAGES[1].alt} ratio="4/5" />
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
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={job.org}
                      className="h-9 w-9 object-contain"
                    />
                  )}
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

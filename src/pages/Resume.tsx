import { PROFILE, EXPERIENCE, SERVICES, STATS } from '@/data/profile'
import { PageHead, Section, Eyebrow } from '@/components/Bits'

export function Resume() {
  return (
    <>
      <div className="shell">
        <PageHead
          eyebrow="Resume"
          title={PROFILE.role}
          lede={`${PROFILE.location} · ${PROFILE.available ? 'Open to full time roles in the US' : 'Currently engaged'}`}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${PROFILE.email}`} className="btn btn-solid">Email me</a>
          <a href={`tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline">{PROFILE.phone}</a>
        </div>
      </div>

      <Section>
        <Eyebrow>Experience</Eyebrow>
        <ol className="grid gap-0">
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
        <Eyebrow>Focus areas</Eyebrow>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.no} className="min-w-0 border-t border-(--line) pt-4">
              <div className="t-body text-(--ink)">{s.name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>At a glance</Eyebrow>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="min-w-0 border-t border-(--line) pt-4">
              <div className="t-heading-sm text-(--ink)">{s.value}</div>
              <div className="t-body-sm mt-1 text-(--ink-muted)">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

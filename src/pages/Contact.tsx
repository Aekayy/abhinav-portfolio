import { PROFILE, SOCIALS } from '@/data/profile'
import { PageHead, Section, Eyebrow } from '@/components/Bits'

/**
 * No form, deliberately.
 *
 * A static site has nowhere to post one, so a form here would either need a
 * third party endpoint or would silently fail — and a contact form that
 * swallows a message is worse than no form at all. Direct channels instead,
 * every one of which works the moment the page loads.
 */
export function Contact() {
  return (
    <>
      <div className="shell">
        <PageHead
          eyebrow="Contact"
          title="Reach out to start a conversation"
          lede="Share a vision, ask about the work, or talk about a role. The fastest way to me is email."
        />
      </div>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <a href={`mailto:${PROFILE.email}`}
             className="card min-w-0 p-8 transition-colors hover:border-(--line-strong)">
            <div className="t-caption uppercase tracking-[0.16em] text-(--ink-muted)">Email</div>
            <div className="t-sub mt-3 break-all text-(--ink)">{PROFILE.email}</div>
          </a>
          <a href={`tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`}
             className="card min-w-0 p-8 transition-colors hover:border-(--line-strong)">
            <div className="t-caption uppercase tracking-[0.16em] text-(--ink-muted)">Phone</div>
            <div className="t-sub mt-3 text-(--ink)">{PROFILE.phone}</div>
          </a>
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>Elsewhere</Eyebrow>
        <div className="grid gap-4 sm:grid-cols-3">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener"
               className="card min-w-0 p-6 transition-colors hover:border-(--line-strong)">
              <div className="t-body text-(--ink)">{s.label} ↗</div>
            </a>
          ))}
        </div>
        <p className="t-body-sm mt-8 text-(--ink-muted)">
          Based in {PROFILE.location}.
        </p>
      </Section>
    </>
  )
}

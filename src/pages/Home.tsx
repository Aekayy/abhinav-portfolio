import { PROFILE, SERVICES, STATS, TESTIMONIALS, POSTS } from '@/data/profile'
import { CASE_STUDIES, SIDE_QUESTS } from '@/data/projects'
import { Eyebrow, Section, Link } from '@/components/Bits'
import { ProjectCard } from '@/components/ProjectCard'

export function Home() {
  return (
    <>
      {/* The reference centres the hero in a constrained column and lets the
          work below carry the page. Same idea, with the availability line
          doing real work for someone who is hiring. */}
      <section data-no-reveal className="pt-20 md:pt-28">
        <div className="shell text-center">
          {PROFILE.available && (
            <p className="t-caption mb-6 inline-flex items-center gap-2 rounded-(--radius-pill)
                          border border-(--line) px-3 py-1.5 text-(--ink-muted)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--ink)" aria-hidden="true" />
              Available for full time roles
            </p>
          )}
          <h1 className="t-display mx-auto max-w-[16ch] text-(--ink)">{PROFILE.tagline}</h1>
          <p className="t-body mx-auto mt-6 max-w-[54ch] text-(--ink-muted)">{PROFILE.bio}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/projects" className="btn btn-solid">See the work</Link>
            <Link to="/contact" className="btn btn-outline">Contact me</Link>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>My work</Eyebrow>
        <h2 className="t-heading max-w-[24ch] text-(--ink)">
          Each one began with a real problem
        </h2>
        <p className="t-body mt-5 max-w-[60ch] text-(--ink-muted)">
          These projects reflect the way I think, solve and care. Each began with a real problem
          and ended with a solution that made someone’s life a little easier. I aim to design with
          intention, not decoration.
        </p>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {CASE_STUDIES.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>Side quests</Eyebrow>
        <h2 className="t-heading max-w-[24ch] text-(--ink)">Work nobody asked me for</h2>
        <p className="t-body mt-5 max-w-[60ch] text-(--ink-muted)">
          Self-directed projects where I set the brief. They are where I try the things a client
          brief would not pay for.
        </p>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {SIDE_QUESTS.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>What I can do</Eyebrow>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.no} className="min-w-0 border-t border-(--line) pt-5">
              <div className="t-caption text-(--ink-muted)">{s.no}</div>
              <div className="t-sub mt-2 text-(--ink)">{s.name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>My career so far</Eyebrow>
        <p className="t-body max-w-[60ch] text-(--ink-muted)">
          I measure each project not just by numbers, but by the impact it creates, the brands it
          strengthens, and the experiences it shapes.
        </p>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="min-w-0 border-t border-(--line) pt-5">
              <div className="t-heading text-(--ink)">{s.value}</div>
              <div className="t-body-sm mt-1 text-(--ink-muted)">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>Testimonials</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card min-w-0 p-7">
              <blockquote className="t-body text-(--ink)">“{t.quote}”</blockquote>
              <figcaption className="t-body-sm mt-5 text-(--ink-muted)">
                {t.name} · {t.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="border-t border-(--line)">
        <Eyebrow>Writing</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-2">
          {POSTS.map((p) => (
            <a key={p.slug} href={p.href} target="_blank" rel="noreferrer noopener"
               className="card min-w-0 p-7 transition-colors hover:border-(--line-strong)">
              <div className="t-sub text-(--ink)">{p.title} ↗</div>
              <p className="t-body-sm mt-3 text-(--ink-muted)">{p.summary}</p>
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}

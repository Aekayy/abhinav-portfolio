import { SIDE_QUESTS } from '@/data/projects'
import { PageHead, Section } from '@/components/Bits'
import { ProjectCard } from '@/components/ProjectCard'

export function SideQuests() {
  return (
    <>
      <div className="shell">
        <PageHead
          eyebrow="Side Quests"
          title="Work nobody asked me for"
          lede="Self-directed projects where I set the brief, choose the constraints, and follow the problem wherever it goes. This is where I try what a client brief would not pay for."
        />
      </div>
      <Section>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {SIDE_QUESTS.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
        {/* Each side quest is its own site and its own repository. They are
            linked rather than folded in, so neither has to be merged into the
            other to ship. */}
        <p className="t-body-sm mt-14 max-w-[56ch] text-(--ink-muted)">
          Side quests live as their own builds and open in a new tab. Each is a separate project
          with its own code, deployed independently of this site.
        </p>
      </Section>
    </>
  )
}

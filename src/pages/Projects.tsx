import { CASE_STUDIES } from '@/data/projects'
import { PageHead, Section } from '@/components/Bits'
import { ProjectCard } from '@/components/ProjectCard'

export function Projects() {
  return (
    <>
      <div className="shell">
        <PageHead
          eyebrow="Projects"
          title="Work I did for companies"
          lede="Four products, taken from a real problem through to something people use. Each one opens into the full case study."
        />
      </div>
      <Section>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {CASE_STUDIES.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </Section>
    </>
  )
}

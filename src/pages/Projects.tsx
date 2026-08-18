import { CASE_STUDIES } from '@/data/projects'
import { PageHead } from '@/components/Bits'
import { Gallery } from '@/components/Gallery'

export function Projects() {
  return (
    <>
      <div className="shell">
        <PageHead
          eyebrow="Projects"
          title="Work for today, sometimes for tomorrow"
          lede="A collection of selected work spanning product and brand. Some shipped, some still evolving, all part of an ongoing exploration of how digital products should feel."
        />
      </div>
      <section className="py-14 md:py-20">
        <Gallery projects={CASE_STUDIES} />
      </section>
    </>
  )
}

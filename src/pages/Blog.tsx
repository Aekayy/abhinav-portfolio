import { POSTS } from '@/data/profile'
import { PageHead, Section, Link } from '@/components/Bits'

export function Blog() {
  return (
    <>
      <div className="shell">
        <PageHead
          eyebrow="Blog"
          title="Case studies and articles"
          lede="From design trends to creative process, these pieces cover how I think about the craft and what I have learned building products."
        />
      </div>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {POSTS.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`}
                  className="card lift min-w-0 p-7 transition-colors hover:border-(--line-strong)">
              <div className="t-sub text-(--ink)">{p.title} ↗</div>
              <p className="t-body-sm mt-3 text-(--ink-muted)">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}

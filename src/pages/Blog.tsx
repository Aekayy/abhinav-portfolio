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
                  className="card lift min-w-0 overflow-hidden p-0 transition-colors hover:border-(--line-strong)">
              {p.card && (
                <div className="aspect-[4/3] w-full overflow-hidden" aria-hidden="true">
                  <img src={p.card} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-7">
                <div className="t-caption text-(--ink-muted)">{p.date} · {p.category}</div>
                <div className="t-sub mt-2 text-(--ink)">{p.title} ↗</div>
                <p className="t-body-sm mt-3 text-(--ink-muted)">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}

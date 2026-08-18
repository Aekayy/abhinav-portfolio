import { PageHead, Section, Link } from '@/components/Bits'

export function NotFound() {
  return (
    <>
      <div className="shell">
        <PageHead eyebrow="404" title="That page does not exist"
                  lede="The link may be old, or the page may have moved." />
      </div>
      <Section>
        <Link to="/" className="btn btn-solid">Back home</Link>
      </Section>
    </>
  )
}

import type { ReactNode } from 'react'
import { go } from '@/site/router'

/** Small caps label that opens a section. Carried from the reference's voice. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="t-caption mb-4 text-(--ink-muted)">{children}</p>
  )
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <header className="pt-16 md:pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="t-display max-w-[20ch] text-(--ink)">{title}</h1>
      {lede && <p className="t-body mt-6 max-w-[58ch] text-(--ink-muted)">{lede}</p>}
    </header>
  )
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`py-14 md:py-20 ${className}`}><div className="shell">{children}</div></section>
}

/** Internal link that keeps the hash router in charge. */
export function Link({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <a href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to) }} className={className}>
      {children}
    </a>
  )
}

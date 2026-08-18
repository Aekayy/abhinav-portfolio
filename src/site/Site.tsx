import { useEffect } from 'react'
import { useRoute } from './router'
import { startReveal } from './reveal'
import { Nav, Footer } from './Chrome'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Projects } from '@/pages/Projects'
import { SideQuests } from '@/pages/SideQuests'
import { Blog } from '@/pages/Blog'
import { Resume } from '@/pages/Resume'
import { Contact } from '@/pages/Contact'
import { CaseStudy } from '@/pages/CaseStudy'
import { NotFound } from '@/pages/NotFound'
import { bySlug } from '@/data/projects'

export default function Site() {
  const route = useRoute()

  // Restarted per route: each page has its own sections to reveal, and the
  // observer from the previous page has nothing left to watch.
  useEffect(() => startReveal(), [route])

  return (
    <div className="min-h-dvh bg-(--page) text-(--ink)">
      <Nav route={route} />
      <main>{render(route)}</main>
      <Footer />
    </div>
  )
}

function render(route: string) {
  if (route === '/' || route === '') return <Home />
  if (route === '/about') return <About />
  if (route === '/projects') return <Projects />
  if (route === '/side-quests') return <SideQuests />
  if (route === '/blog') return <Blog />
  if (route === '/resume') return <Resume />
  if (route === '/contact') return <Contact />

  const study = route.startsWith('/projects/') && bySlug(route.slice('/projects/'.length))
  if (study && study.sections) return <CaseStudy project={study} />

  return <NotFound />
}

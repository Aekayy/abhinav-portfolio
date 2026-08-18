import { useEffect } from 'react'
import { useRoute } from './router'
import { startReveal } from './reveal'
import { Nav, Footer } from './Chrome'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Projects } from '@/pages/Projects'
import { Blog } from '@/pages/Blog'
import { Resume } from '@/pages/Resume'
import { Contact } from '@/pages/Contact'
import { StudyOverlay } from '@/components/StudyOverlay'
import { NotFound } from '@/pages/NotFound'
import { bySlug } from '@/data/projects'

export default function Site() {
  const route = useRoute()

  // Restarted per route: each page has its own sections to reveal, and the
  // observer from the previous page has nothing left to watch.
  useEffect(() => startReveal(), [route])

  // A study is a route that renders over the gallery rather than replacing it,
  // so the URL still says what you are looking at and the back button closes it.
  const study = route.startsWith('/projects/') ? bySlug(route.slice('/projects/'.length)) : undefined

  return (
    <div className="min-h-dvh bg-(--page) text-(--ink)">
      <Nav route={study ? '/projects' : route} />
      <main>{render(study ? '/projects' : route)}</main>
      <Footer />
      {study && <StudyOverlay project={study} />}
    </div>
  )
}

function render(route: string) {
  if (route === '/' || route === '') return <Home />
  if (route === '/about') return <About />
  if (route === '/projects') return <Projects />
  if (route === '/blog') return <Blog />
  if (route === '/resume') return <Resume />
  if (route === '/contact') return <Contact />

  return <NotFound />
}

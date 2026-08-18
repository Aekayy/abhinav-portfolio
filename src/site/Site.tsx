import { useEffect } from 'react'
import { useRoute } from './router'
import { startReveal } from './reveal'
import { Nav, Footer } from './Chrome'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Blog } from '@/pages/Blog'
import { Resume } from '@/pages/Resume'
import { Contact } from '@/pages/Contact'
import { StudyOverlay, PostOverlay } from '@/components/StudyOverlay'
import { NotFound } from '@/pages/NotFound'
import { bySlug } from '@/data/projects'
import { postBySlug } from '@/data/profile'

export default function Site() {
  const route = useRoute()

  // Restarted per route: each page has its own sections to reveal, and the
  // observer from the previous page has nothing left to watch.
  // Keyed on the full route, so opening a study re-runs it over the sections
  // that just mounted inside the dialog.
  useEffect(() => startReveal(), [route])

  // A study is a route that renders over the gallery rather than replacing it,
  // so the URL still says what you are looking at and the back button closes it.
  const study = route.startsWith('/projects/') ? bySlug(route.slice('/projects/'.length)) : undefined
  const post = route.startsWith('/blog/') ? postBySlug(route.slice('/blog/'.length)) : undefined

  // A study opens over the home page, where the gallery is. There is no
  // separate projects page to go back to.
  const behind = study ? '/' : post ? '/blog' : route

  return (
    <div className="min-h-dvh bg-(--page) text-(--ink)">
      <Nav route={behind} />
      <main>{render(behind)}</main>
      <Footer />
      {study && <StudyOverlay project={study} backTo="/" />}
      {post && <PostOverlay post={post} />}
    </div>
  )
}

function render(route: string) {
  if (route === '/' || route === '') return <Home />
  if (route === '/about') return <About />
  // Kept so old links still land somewhere sensible.
  if (route === '/projects') return <Home />
  if (route === '/blog') return <Blog />
  if (route === '/resume') return <Resume />
  if (route === '/contact') return <Contact />

  return <NotFound />
}

/**
 * A path from the data files, resolved against the site root.
 *
 * Everything in `src/data` is written relative — 'img/work/merkle-card.png' —
 * which is fine on the home page and wrong everywhere else. On /projects/merkle
 * the browser resolves the same string against /projects/, asks for
 * /projects/img/work/merkle-card.png, and gets nothing. It went unnoticed
 * because opening a study from the gallery starts on / and the images are
 * already fetched by the time the URL changes; it only bites the person who
 * follows a shared link straight to a study, which is the person a portfolio
 * link exists for.
 *
 * The fix belongs here rather than in a <base href="/"> tag, which would have
 * been one line and would also have re-pointed the fragment hrefs the nav uses
 * as its no-JS fallback, quietly breaking middle-click on every nav item.
 *
 * Absolute URLs and data URIs are returned untouched, so this is safe to wrap
 * around anything.
 *
 * The exception is portfolio-preview.html, the single file meant to be
 * double-clicked. There a leading slash means the root of the drive, not the
 * root of the site, so every image would point at C:\img\... and none of them
 * would load. Off a file:// page the path stays relative and resolves next to
 * the preview, which is where build-preview.mjs puts the assets.
 */
const OFFLINE = typeof location !== 'undefined' && location.protocol === 'file:'

export function asset(path: string): string
export function asset(path: string | undefined): string | undefined
export function asset(path?: string): string | undefined {
  if (!path) return path
  if (/^([a-z]+:|\/\/)/i.test(path)) return path
  return OFFLINE ? path.replace(/^\/+/, '') : (path.startsWith('/') ? path : '/' + path)
}

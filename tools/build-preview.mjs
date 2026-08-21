/**
 * Rebuilds portfolio-preview.html, the committed single-file build for
 * offline review.
 *
 * vite build first (this script does it), then the JS and CSS are inlined
 * into one HTML file. Images are NOT inlined — 25MB of portfolio work would
 * make an unreadable file — so the preview must stay at the repo root, where
 * the img/ paths resolve against public/.
 */
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync, existsSync, cpSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

execSync('npm run build', { cwd: root, stdio: 'inherit' })

const dist = fileURLToPath(new URL('../dist', import.meta.url))
const assets = readdirSync(`${dist}/assets`)
const js = assets.find((f) => f.endsWith('.js'))
const css = assets.find((f) => f.endsWith('.css'))

let html = readFileSync(`${dist}/index.html`, 'utf8')
if (css) {
  html = html.replace(
    /<link rel="stylesheet"[^>]*>/,
    () => `<style>\n${readFileSync(`${dist}/assets/${css}`, 'utf8')}\n</style>`,
  )
}
html = html.replace(
  /<script type="module"[^>]*><\/script>/,
  () => `<script type="module">\n${readFileSync(`${dist}/assets/${js}`, 'utf8')}\n</script>`,
)

writeFileSync(`${root}/portfolio-preview.html`, html)
console.log(`portfolio-preview.html rebuilt (${(html.length / 1024).toFixed(0)} KB, images linked not inlined)`)

// Ensure image paths resolve when opening the preview file directly.
const srcImg = `${root}/public/img`
const dstImg = `${root}/img`
if (existsSync(srcImg)) {
  cpSync(srcImg, dstImg, { recursive: true })
}

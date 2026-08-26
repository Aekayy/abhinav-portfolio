/**
 * Turns the raw Figma exports into web assets.
 *
 * The exports land at 4x — a mobile screen is 1608x3496, a Merkle web screen
 * is 5760x4096 — which is right for the archive and far too heavy to ship.
 * 183MB of PNG becomes about 6MB of WebP here, at sizes that are still 2x on
 * the largest surface any of them is drawn at.
 *
 * Idempotent: re-run it after re-exporting from Figma and it overwrites.
 * Source folders stay where they are; they are the archive, not the build.
 *
 *   node tools/screens.mjs          convert everything
 *   node tools/screens.mjs forecash convert one project
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

/** Source folder -> the project slug it belongs to in src/data/projects.ts. */
const PROJECTS = [
  ['ForeCash Mobile & Web Screens', 'forecash'],
  ['Harmoney Mobile Screens', 'harmoney'],
  ['Merkle Web screens', 'merkle'],
  ['Spotify Mobile and Web Screens', 'spotify-alter'],
  ['Vesseli Mobile Screens', 'vesseli'],
]

/**
 * Width by shape, not by folder: several projects hold both. A phone screen is
 * drawn at most ~300px inside a device frame, a web screen at most ~760px, so
 * these are 2x on the largest surface and no larger.
 */
const MOBILE_W = 540
const WEB_W = 1440

/** "19a Ask · empty.png" -> "19a-ask-empty". Order survives; punctuation does not. */
function slugify(name) {
  return name
    .replace(/\.[a-z]+$/i, '')
    .normalize('NFKD')
    .replace(/[·•]/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function probe(file) {
  const out = execFileSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file,
  ]).toString().trim()
  const [w, h] = out.split(',').map(Number)
  return { w, h }
}

const only = process.argv[2]
let files = 0
let bytesIn = 0
let bytesOut = 0

for (const [folder, slug] of PROJECTS) {
  if (only && only !== slug) continue
  const src = join(root, folder)
  if (!existsSync(src)) {
    console.warn(`skipped ${slug}: no folder named "${folder}"`)
    continue
  }
  const out = join(root, 'public/img/work', slug, 'screens')
  mkdirSync(out, { recursive: true })

  for (const name of readdirSync(src).sort()) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue
    const from = join(src, name)
    const { w, h } = probe(from)
    // Taller than it is wide is a phone; anything else is a desktop screen.
    const width = h > w ? MOBILE_W : WEB_W
    const to = join(out, `${slugify(name)}.webp`)

    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', from,
      '-vf', `scale=${width}:-2:flags=lanczos`,
      '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6',
      to,
    ])

    files++
    bytesIn += statSync(from).size
    bytesOut += statSync(to).size
  }
  console.log(`${slug}: ${readdirSync(out).length} screens`)
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)}MB`
console.log(`\n${files} screens converted — ${mb(bytesIn)} of PNG into ${mb(bytesOut)} of WebP.`)

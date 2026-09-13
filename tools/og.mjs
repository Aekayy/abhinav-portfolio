/**
 * Renders tools/og-card.html to public/og.png at exactly 1200x630.
 *
 *   node tools/og.mjs
 *
 * Every other script in tools/ is pure Node or shells out to ffmpeg, and the
 * project has no browser dependency on purpose. A social card is typography,
 * though, and typography needs a text renderer — so this borrows a Chrome that
 * is already on the machine rather than pulling Puppeteer into devDependencies
 * for one image that changes about once a year.
 *
 * It looks for Chrome or Edge in the usual places, and takes CHROME_PATH if
 * you would rather point it somewhere yourself. If none is found it says so
 * and stops: open tools/og-card.html and screenshot it, the body is exactly
 * 1200x630 at 1:1 zoom, and that is a perfectly good way to produce this file.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const card = join(root, 'tools', 'og-card.html')
const out = join(root, 'public', 'og.png')

const CANDIDATES = [
  process.env.CHROME_PATH,
  // Windows
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  // macOS
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  // Linux
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const chrome = CANDIDATES.find((p) => existsSync(p))
if (!chrome) {
  console.error(
    'No Chrome or Edge found.\n' +
    'Set CHROME_PATH, or just open tools/og-card.html and screenshot it —\n' +
    'the card is exactly 1200x630 at 1:1 zoom. Save it as public/og.png.',
  )
  process.exit(1)
}

/* --screenshot writes to the working directory under a fixed name on some
   builds, so it runs in a scratch dir and the result is moved into place. */
const scratch = mkdtempSync(join(tmpdir(), 'og-'))
const shot = join(scratch, 'screenshot.png')

try {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    '--allow-file-access-from-files',
    '--window-size=1200,630',
    `--screenshot=${shot}`,
    pathToFileURL(card).href,
  ], { stdio: 'pipe', cwd: scratch })

  if (!existsSync(shot)) throw new Error('chrome produced no screenshot')
  copyFileSync(shot, out)
  console.log('public/og.png written — 1200x630')
  console.log('Re-share any existing link through the X and LinkedIn post')
  console.log('inspectors afterwards; both cache a card for days.')
} finally {
  rmSync(scratch, { recursive: true, force: true })
}

/**
 * Keeps the written content in American spelling.
 *
 * The site is aimed at US hiring managers, and the prose arrived carrying
 * British forms from the original Framer site. This is a mechanical fix, which
 * is exactly why it should be a check rather than a one-time edit: the next
 * paragraph pasted in will carry them again, and a guard catches that where a
 * memory does not.
 *
 * Deliberately narrow. It only rewrites words on the list, only inside the
 * content data, and only as whole words. It does not touch code, class names,
 * or the CSS custom properties that are spelled --colour nowhere but would be
 * silently corrupted by a blind find-and-replace.
 *
 *   node tools/spelling.mjs         report, exit 1 if anything is found
 *   node tools/spelling.mjs --fix   rewrite in place
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

/** Content only. Source that happens to contain these words is not prose. */
const FILES = [
  'src/data/projects.ts',
  'src/data/harmoney.ts',
  'src/data/profile.ts',
  'src/data/screens.ts',
]

const MAP = {
  colour: 'color', colours: 'colors', coloured: 'colored', colourful: 'colorful',
  honour: 'honor', honours: 'honors', honoured: 'honored', honouring: 'honoring',
  favour: 'favor', favours: 'favors', favoured: 'favored', favourite: 'favorite',
  labour: 'labor', laboured: 'labored', neighbour: 'neighbor', neighbours: 'neighbors',
  rumour: 'rumor', endeavour: 'endeavor', savour: 'savor', vigour: 'vigor',
  artefact: 'artifact', artefacts: 'artifacts',
  metre: 'meter', metres: 'meters', litre: 'liter', litres: 'liters',
  fibre: 'fiber', fibres: 'fibers', theatre: 'theater', calibre: 'caliber',
  programme: 'program', programmes: 'programs',
  storey: 'story', storeys: 'stories', kerb: 'curb', tyre: 'tire', tyres: 'tires',
  aluminium: 'aluminum', sceptic: 'skeptic', sceptical: 'skeptical',
  manoeuvre: 'maneuver', manoeuvres: 'maneuvers',
  grey: 'gray', greys: 'grays', greyscale: 'grayscale',
  behaviour: 'behavior', behaviours: 'behaviors', behavioural: 'behavioral',
  centre: 'center', centres: 'centers', centred: 'centered', centring: 'centering',
  harbour: 'harbor', harbours: 'harbors',
  licence: 'license', licences: 'licenses',
  defence: 'defense', practise: 'practice', catalogue: 'catalog',
  travelling: 'traveling', travelled: 'traveled', modelling: 'modeling',
  labelled: 'labeled', labelling: 'labeling', cancelled: 'canceled',
  fulfil: 'fulfill', enrol: 'enroll', judgement: 'judgment',
  whilst: 'while', amongst: 'among',
  analyse: 'analyze', analysed: 'analyzed', analyses: 'analyzes', analysing: 'analyzing',
  organise: 'organize', organised: 'organized', organising: 'organizing',
  organisation: 'organization', organisations: 'organizations',
  prioritise: 'prioritize', prioritised: 'prioritized', prioritising: 'prioritizing',
  personalise: 'personalize', personalised: 'personalized',
  specialise: 'specialize', specialised: 'specialized', specialising: 'specializing',
  reorganise: 'reorganize', reorganised: 'reorganized',
  optimise: 'optimize', optimised: 'optimized', optimising: 'optimizing',
  categorise: 'categorize', categorised: 'categorized', categorising: 'categorizing',
  authorise: 'authorize', authorised: 'authorized',
  realise: 'realize', realised: 'realized', realising: 'realizing',
  recognise: 'recognize', recognised: 'recognized', recognising: 'recognizing',
  summarise: 'summarize', summarised: 'summarized',
  minimise: 'minimize', minimised: 'minimized',
  maximise: 'maximize', maximised: 'maximized',
  utilise: 'utilize', utilised: 'utilized',
  emphasise: 'emphasize', emphasised: 'emphasized',
  standardise: 'standardize', standardised: 'standardized',
  customise: 'customize', customised: 'customized',
  visualise: 'visualize', visualised: 'visualized',
  familiarise: 'familiarize', apologise: 'apologize',
  synchronise: 'synchronize', synchronised: 'synchronized',
  normalise: 'normalize', normalised: 'normalized',
  equalise: 'equalize', equalised: 'equalized', equaliser: 'equalizer', equalisers: 'equalizers',
  criticise: 'criticize', criticised: 'criticized',
  memorise: 'memorize', memorised: 'memorized',
  finalise: 'finalize', finalised: 'finalized',
  formalise: 'formalize', formalised: 'formalized',
  legitimise: 'legitimize', legitimised: 'legitimized',
  modernise: 'modernize', modernised: 'modernized',
  centralise: 'centralize', centralised: 'centralized',
  decentralise: 'decentralize', decentralised: 'decentralized',
  generalise: 'generalize', generalised: 'generalized',
  specialisation: 'specialization', personalisation: 'personalization',
  visualisation: 'visualization', visualisations: 'visualizations',
  optimisation: 'optimization', optimisations: 'optimizations',
  customisation: 'customization', prioritisation: 'prioritization',
}

/** "Colour" -> "Color", "COLOUR" -> "COLOR", "colour" -> "color". */
function matchCase(found, replacement) {
  if (found === found.toUpperCase()) return replacement.toUpperCase()
  if (found[0] === found[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1)
  }
  return replacement
}

const fix = process.argv.includes('--fix')
const rows = []
let total = 0

for (const rel of FILES) {
  const path = root + rel
  let text
  try { text = readFileSync(path, 'utf8') } catch { continue }
  let next = text

  // Asset paths are identifiers, not prose. `20-notification-centre.webp` is
  // the name of a file on disk, exported from a Figma frame that spells it
  // that way; "correcting" it inside a string would point at a file that does
  // not exist.
  //
  // One pass matches either a path or a target word. A path is returned
  // untouched, anything else is rewritten. Alternation does the skipping,
  // which is why there is no separate blank-and-restore step to get wrong.
  const PATH = `'img\\/[^']*'`

  for (const [uk, us] of Object.entries(MAP)) {
    const re = new RegExp(`${PATH}|\\b${uk}\\b`, 'gi')
    let count = 0
    const rewritten = next.replace(re, (m) => {
      if (m.startsWith("'img/")) return m
      count++
      return matchCase(m, us)
    })
    if (!count) continue
    total += count
    rows.push({ file: rel, found: uk, becomes: us, count })
    if (fix) next = rewritten
  }

  if (fix && next !== text) writeFileSync(path, next)
}

if (rows.length) console.table(rows)

if (fix) {
  console.log(`\n${total} spelling(s) rewritten to American forms.`)
} else if (total) {
  console.error(`\n${total} British spelling(s) found. Run: node tools/spelling.mjs --fix`)
  process.exit(1)
} else {
  console.log('\nContent is in American spelling.')
}

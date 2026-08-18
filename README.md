# Abhinav Krishnan — Portfolio

UX / Product Design portfolio. React, TypeScript, Tailwind v4, Vite.

## Run it

```bash
npm install
npm run dev
```

## Pages

Home, About, Projects, Side Quests, Blog, Resume, Contact, plus a case study
page per project. Routing is hash based so a deep link survives a refresh on a
static host without rewrite rules.

## Content

Everything the site says lives in `src/data/`. `profile.ts` is the person,
`projects.ts` is the work. Adding a case study is a data change: give it
`sections`, and the shared renderer in `src/pages/CaseStudy.tsx` lays it out.

## Side quests are separate repositories

Spotify Alter is its own project, its own repo and its own deployment. It is
linked from the Side Quests page rather than folded in, so neither repo ever
has to be merged into the other. Add another the same way: an entry in
`projects.ts` with `kind: 'side-quest'` and an `external` link.

## Themes

Light by default, dark on request, remembered per visitor. Dark is the
`newportfolio.md` gallery palette verbatim. No shadows anywhere — depth comes
from surface contrast, which is what keeps the frame out of the way of the work.

## Tests

```bash
npm test          # routes render, content is present, layout cannot overflow
npm run test:visual   # builds, then checks both themes and the CSS cascade
```

These exist because each one caught a real bug on the previous project:

- `theme-test` — both themes complete, every text pair over 4.5:1, and surfaces
  actually distinguishable. It failed twice on first run here and the palette
  was wrong, not the test.
- `cascade-test` — resolves which rule *wins* each property, not merely which
  rules exist. An unlayered `button` reset once erased every button frame while
  the CSS looked perfect.
- `contrast-test` — fails on any hardcoded colour the theme cannot reach.
- `responsive-test` — nothing wider than the screen it renders at, and the
  sideways-pan guards are present.

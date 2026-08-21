# Abhinav Krishnan — Portfolio

UX / Product Design portfolio. React, TypeScript, Tailwind v4, Vite.

## Run it

```bash
npm install
npm run dev
```

## Pages

Home, About, Blog, Resume, Contact, plus a case study per project. Routing is
hash based so a deep link survives a refresh on a static host without rewrite
rules. Case studies and posts open as overlays over the page behind them, so
the back button closes them.

## Design

The blueprint is Dark is the default and the reference verbatim — Obsidian
`#181818`, Graphite `#262626`, Bone `#fafafa`, Ash `#a3a3a3` — with a light
theme as the same gallery translated to daylight: the four neutrals keep
their roles and relationships, opt-in via the menu and remembered per
visitor. Inter at weight 400 everywhere, one display size (32px at −0.04em),
24px cards, a floating nav pill with a hamburger, and a single
horizontal-scroll gallery on the home page. No shadows, no accent colour in
the chrome; the project artwork carries all colour.

## Content

Everything the site says comes from the owner's existing Framer site,
scraped in full (Aug 19, 2026) and transcribed verbatim into the `Content`
section of `newportfolio.md`. The live copy the renderer reads is data:
`src/data/profile.ts` is the person, `projects.ts` is the work,
`harmoney.ts` is one large study. Adding a case study is a data change: give
it `sections`, and the shared renderer in `src/components/StudyOverlay.tsx`
lays it out.

Images were pulled from the Framer CDN into `public/img/` (~130 files, 25MB);
the source-asset map is the image manifest in `newportfolio.md`.

## Side quests are separate repositories

Spotify Alter is its own project, its own repo and its own deployment. It is
linked from the gallery rather than folded in, so neither repo ever has to be
merged into the other. Add another the same way: an entry in `projects.ts`
with `kind: 'side-quest'` and an `external` link.

## Tests

```bash
npm test                # routes render, content is present, layout cannot overflow
npm run test:visual     # builds, then checks the theme and the CSS cascade
npm run build:preview   # rebuilds portfolio-preview.html, the single-file build
```

These exist because each one caught a real bug on the previous project:

- `theme-test` — both themes complete, dark is the reference verbatim, every
  text pair over 4.5:1, and surfaces actually distinguishable.
- `cascade-test` — resolves which rule *wins* each property, not merely which
  rules exist. An unlayered `button` reset once erased every button frame
  while the CSS looked perfect.
- `contrast-test` — fails on any hardcoded colour the theme cannot reach.
- `responsive-test` — nothing wider than the screen it renders at, and the
  sideways-pan guards are present.

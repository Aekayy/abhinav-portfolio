# AGENTS.md

Portfolio site: React 19, TypeScript, Tailwind v4 (via `@tailwindcss/vite`), Vite. Deployed to Vercel as a static build. The design blueprint is `newportfolio.md` (style reference + all scraped content + image manifest), followed strictly.

## Setup

- `npm install` then everything runs. If `esbuild`/`vite`/`tsc` is "not recognized", node_modules is missing; do not debug anything else first.
- `typescript` is pinned to `^5` because `tsconfig.json` uses `baseUrl`, which TS 7 removed. Do not upgrade TypeScript without dropping `baseUrl`.
- WSL shell on this machine: bare `node` is not on PATH (Windows Node only). Inside npm scripts it resolves fine; interactively use `node.exe tools/foo.mjs`.
- `npm run dev` binds Windows localhost — verify it from PowerShell (`Invoke-WebRequest http://localhost:5173`), not from WSL curl, which cannot see it.

## Commands

- `npm run dev` — Vite dev server.
- `npm test` — esbuild-bundles `src/site/Site.tsx` to `dist-ssr/`, then runs three plain Node scripts (no test framework): `render-test` (SSR every route, assert content present), `responsive-test` (nothing wider than the viewport), `contrast-test` (no hardcoded colours).
- `npm run test:visual` — full `tsc -b && vite build` first, then `theme-test` and `cascade-test`, which read the **built** `dist/assets/*.css`, not source. Running them directly without a fresh build fails with "no build found" or tests stale CSS.
- `npm run build:preview` — rebuilds `portfolio-preview.html` (single-file build; JS/CSS inlined, images linked). Commit the result.
- One check at a time: `npm run test:build && node.exe tools/render-test.mjs`.

## Traps

- `tools/render-test.mjs` hardcodes its route list. A new `/projects/:slug` or `/blog/:slug` route is untested until added there.
- `render-test` also forbids en/em dashes (U+2013/U+2014) in rendered copy. Scraped prose is full of them — scrub to `;` or `·` before pasting into `src/data/`.
- `contrast-test` only scans `src/site/**` and the base layer of `src/index.css`. The no-hardcoded-colour rule still applies to `src/pages` and `src/components` — it is just not policed there.
- `tsconfig.json` `exclude` names four files that do not exist (`Landing.tsx`, `SiteBar.tsx`, `SourcePicker.tsx`, `Trending.tsx`). Creating a `src/site` file with one of those names silently exempts it from `tsc`.

## Architecture (the non-obvious parts)

- **Hash routing is deliberate** (`src/site/router.ts`): deep links survive refresh on a static host with no rewrite rules. Do not add a path router or Vercel rewrites. `go('/#work')` means "home route, scroll to #work".
- **Case studies and blog posts are overlays, not pages.** `/projects/:slug` renders `StudyOverlay` over Home; `/blog/:slug` renders `PostOverlay` over Blog (`src/site/Site.tsx`). There is no projects index — `/projects` redirects to `/`.
- **The nav is the reference's floating pill**: brand + hamburger only, opening a full-screen overlay (`src/site/Chrome.tsx`). The overlay stays in the DOM while closed (`hidden`, never unmounted) so SSR and the render test see every destination. There is no footer, anywhere.
- **Dark is the default, light is the same gallery in daylight.** `:root` is light, `[data-theme='dark']` is the reference palette verbatim (Obsidian/Graphite/Bone/Ash); an inline script in `index.html` restores the stored choice before paint, and `src/site/theme.ts` (`readTheme`/`applyTheme`/`storeTheme`) drives the switch. The toggle lives in the menu overlay, not the pill (the pill stays brand + hamburger, per the md).
- **Type discipline is enforced by the md, not by tooling**: Inter weight 400 only (never `font-medium`/`font-semibold`), sizes 16/17 for text and 32 for the single display voice at −0.04em tracking. Hierarchy comes from Bone vs Ash, not from weight or size steps.
- **Content is data.** `src/data/profile.ts` (the person, and the blog posts in full), `projects.ts` (the work), `harmoney.ts` (one large study). A case study body is a typed `Block[]` vocabulary rendered by the overlay — adding a study is a data entry with `sections`, not a new component. Figure blocks point at `public/img/` and degrade to a tinted panel if the file is missing.
- **Images are scraped from the Framer CDN** into `public/img/` (~130 files); the source-asset map is the "Image manifest" section of `newportfolio.md`. Replace a file to replace the image; no code change needed.
- **Side quests live in separate repos** (`kind: 'side-quest'` + `external` link). Never fold one into this repo.
- `@/` aliases `src/` in both `vite.config.ts` and `tsconfig.json`.

## Conventions

- Strict TS with `noUnusedLocals`/`noUnusedParameters` — delete dead code rather than underscore-prefixing.
- Case-study and blog prose is the owner's own writing, carried over verbatim; do not rewrite it in a different voice. (Exception the test enforces: dashes, see Traps.)
- The About page work history names the **Jewish Healthcare Foundation** for the glucose-dashboard role — GlucoGuard was the product, not the employer. The Framer logo proves it; do not "fix" it back.

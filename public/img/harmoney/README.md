# Harmoney images

Drop exports from the Figma file here. The case study already points at these
filenames, and each one renders as a tinted panel with its caption until the
file exists — so a missing image reads as "not added yet" rather than breaking
the page.

Export from **06 · Case Study · Framer** in *Harmoney by Ak*:

| File            | Figma node | What it is                                        |
|-----------------|------------|---------------------------------------------------|
| `hero.jpg`      | `120:8`    | Hero visual — tapped profile and the home screen  |
| `wireframes.jpg`| `123:428`  | Wireframes, annotated                             |
| `product.jpg`   | `125:725`  | The product — 46 screens across two themes        |

JPG at roughly 1600px wide is plenty; they are displayed at 16/9 inside the
study. Add more by adding a `figure` block in `src/data/harmoney.ts`.

I could not fetch these automatically: Figma's asset CDN is blocked from the
sandbox I run in (HTTP 403 at the proxy), so the export has to come from you.

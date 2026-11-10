# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Emma, first.** The site is a personal record: monthly rewinds, habit experiments, `/now` snapshots, photos, the gear list. It exists for Emma to keep writing and keep a trail of what life looked like at the time. Readers are welcome but secondary.
- **Fellow engineers.** People who arrive from a tech post or a shared link (FHIR, Expo, Next.js, AI coding, the site's own build) and stay to read.

Hiring managers and prospective clients can reach the CV, but they are not who the site is shaped around.

## Product Purpose

A personal website and blog for Emma Campbell: software notes, self-experiments, monthly life updates, and photos, all on one hand-built static site.

Success means **Emma keeps writing**: publishing stays low-friction and the site stays something she enjoys maintaining. Readership is a bonus, not the measure.

## Positioning

A hand-built personal index rather than a template blog. The site is itself one of the projects: it has a public changelog (`/changelog`), a design notes page (`/design`), and posts about its own build (content layer, reading time, metrics, RSS). It mixes technical writing and plain personal life in one place without splitting them into a "professional" and a "personal" site.

## Operating Context

- Content lives as Markdown/MDX/Markdoc files in `content/` (posts, `now/` entries, `cv.md`, `changelog.md`, `photos.md`, settings). Some of it is edited from Obsidian (`content/.obsidian` is ignored).
- Photos are mostly iPhone HDR shots and Fujifilm images, processed by `pnpm images` on a Mac before commit.
- Routes: `/` (index), `/notebook` and `/notebook/[slug]`, `/now`, `/photos`, `/about`, `/cv`, `/uses`, `/changelog`, `/design`, `/rss.xml`.
- Readers on desktop and phone; the responsive and visual Playwright suites cover both.

## Capabilities and Constraints

- SvelteKit with `adapter-static`; every route is prerendered. No server runtime.
- Tooling: pnpm, Vite+ (`vp dev`, `vp build`, `vp fmt`), Tailwind v4, mdsvex, Shiki for code. No Prettier.
- RSS feed must keep working.
- Photos keep their HDR gain maps; never flatten them to SDR. GPS and camera EXIF are stripped from published images, and shooting details are captured from EXIF before stripping.
- Playwright covers pages, links, SEO, responsiveness, performance, and visual regressions (committed snapshot goldens in `tests/visual.spec.ts-snapshots`).
- Pre-commit hooks (lint-staged, image normalizer) are never skipped.
- PostHog analytics is installed.

## Brand Commitments

- **Voice:** casual, first-person, plainspoken, self-deprecating and a bit goofy, as on the about page ("I feel weird writing this. Seems sorta conceited to write about yourself. Bleh, oh well."). Future copy keeps this voice; nothing corporate.
- Name in use: "Emma Campbell" in page titles; "SpookyEmma" / "Spooky Emma" as the site name in settings.
- The current "the occult mundane" tagline and its framing (∴ glyphs, § numbering, lowercase labels) exist in the site today but are **not** a binding commitment; future work may keep or replace them.

## Evidence on Hand

- ~35 real posts in `content/posts/`, monthly rewinds included, plus `/now` entries from 2024-04 to 2026-04.
- A real CV in `content/cv.md`, a gear list on `/uses`, a changelog with dated entries in `content/changelog.md`.
- Photos in `static/` with an image manifest at `src/lib/image-manifest.json`.
- No testimonials, follower counts, or audience metrics are on hand. Do not invent them.

## Product Principles

1. **Writing comes first.** Anything that adds friction to publishing a post or a `/now` update needs a strong reason.
2. **Personal before professional.** The site is a record of a life, with tech in it; it is not a portfolio dressed up as a blog.
3. **The site is a project.** Changes are visible and logged; craft in the build is part of the point.
4. **Keep it static and fast.** Prerendered pages, real images done right (HDR intact, no layout shift), no runtime dependencies that a static host can't serve.

## Accessibility & Inclusion

WCAG 2.1 AA. The axe-core checks in `tests/accessibility.spec.ts` (tags `wcag2a`, `wcag2aa`) must keep passing.

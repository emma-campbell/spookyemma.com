---
name: SpookyEmma
description: Emma Campbell's personal site; glow-in-the-dark stickers on a painted bedroom wall that glow when the lights go off.
colors:
  periwinkle-wall: "#cfd6f0"
  wall-raised: "#dbe0f5"
  wall-sunk: "#c2cae9"
  wall-ink: "#262b52"
  wall-ink-muted: "#464c7d"
  switch-indigo: "#4338a8"
  accent-soft: "rgba(67, 56, 168, 0.32)"
  line: "rgba(38, 43, 82, 0.16)"
  line-strong: "rgba(38, 43, 82, 0.34)"
  unlit-plastic: "#e6f0d4"
  plastic-edge: "#c3d0ac"
  plastic-ink: "#7d8a6a"
  phosphor-glow: "#b9f58c"
  phosphor-edge: "#9ad66f"
  phosphor-ink: "#2c4a1c"
  plate: "#262b52"
  plate-fg: "#e4e7f6"
  plate-rim: "#343a68"
  plate-screw: "#6a72a8"
  type-making: "#5b3a9e"
  type-thinking: "#963866"
  type-log: "#2b6844"
  type-danger: "#8f400a"
  night-ceiling: "#14182b"
  night-raised: "#1c2140"
  night-sunk: "#0f1222"
  night-ink: "#e1e5f7"
  night-ink-muted: "#a3aacd"
  night-plate: "#0c0f1f"
  night-plate-rim: "#1d2244"
  night-type-making: "#cbb8ff"
  night-type-thinking: "#ffb1d2"
  night-type-log: "#9fdcb0"
  night-type-danger: "#ffb07a"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  post-title:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "clamp(2.3rem, 5.5vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title-list:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  wordmark:
    fontFamily: "Bricolage Grotesque Variable, Avenir Next, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 750
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Figtree Variable, Avenir Next, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Figtree Variable, Avenir Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  list-link:
    fontFamily: "Figtree Variable, Avenir Next, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Figtree Variable, Avenir Next, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    letterSpacing: "0em"
  code:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  2xs: "0.125rem"
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  2xl: "4rem"
  gutter: "clamp(1rem, 4vw, 4.5rem)"
  measure: "37rem"
  page-max: "1200px"
components:
  nav-link:
    textColor: "{colors.wall-ink-muted}"
    typography: "{typography.list-link}"
  nav-link-active:
    textColor: "{colors.wall-ink}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.wall-ink-muted}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.95rem"
  filter-chip-active:
    backgroundColor: "{colors.wall-ink}"
    textColor: "{colors.periwinkle-wall}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.95rem"
  type-pill:
    textColor: "{colors.type-log}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  post-nav-card:
    backgroundColor: "transparent"
    textColor: "{colors.wall-ink}"
    rounded: "{rounded.md}"
    padding: "1.25rem 1.4rem"
  post-nav-card-hover:
    backgroundColor: "{colors.wall-raised}"
  raised-note:
    backgroundColor: "{colors.wall-raised}"
    textColor: "{colors.wall-ink}"
    rounded: "{rounded.md}"
    padding: "1rem 1.25rem"
  code-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.plate-fg}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "1.15rem 2rem"
  inline-code:
    backgroundColor: "{colors.wall-raised}"
    textColor: "{colors.wall-ink}"
    rounded: "{rounded.sm}"
    padding: "1px 5px"
---

# Design System: SpookyEmma

## Overview

**Creative North Star: "The Glow-in-the-Dark Ceiling"**

By day the site is a matte periwinkle bedroom wall with pale glow-in-the-dark plastic stickers stuck on it: a crescent moon, a small ghost, a ringed planet, and five-point stars. Switch the light off and the wall becomes a night ceiling, and every sticker charges up and glows phosphor green. The two themes are one room seen at two times of day, not two palettes. Ink is navy on the wall by day and pale lavender on the ceiling by night; everything else follows.

The page itself is calm and plain: a big Bricolage Grotesque name or title, Figtree body text in a real reading measure, quiet dashed rules between sections, lists separated by hairlines. The world lives in a few physical objects: the stickers, the drawn light-switch plate that toggles the theme, and the darker screwed-on plate that holds code. Copy stays Emma's own first-person prose. The site refuses two looks by name: the dark-mode dev blog with mono labels, and the cream editorial serif page.

Density is relaxed and reading-first. Stickers stay decorative (`aria-hidden`) and step aside on reading pages: a cluster beside the hero on home, a few pinned in the outer margins of posts and the notebook, hidden below 1200px.

**Key Characteristics:**

- Two themes as one room: daylight wall (`data-theme` unset) and lights-off ceiling (`:root[data-theme='dark']`), swapped by a drawn light switch.
- Drawn SVG stickers in glow plastic, soft-shadowed by day, glowing by night.
- Bricolage Grotesque for display, Figtree for everything you read, JetBrains Mono only for code.
- Dashed rules between sections, hairline rules between list items, no cards on the page.
- A faint fractal-noise paint texture over the wall colour.

## Colors

A cool, low-chroma wall and ink pair, one glow-plastic material, and four quiet entry-type hues; the only saturated colour on the page is the phosphor glow at night.

### Primary

- **Switch Indigo** (`switch-indigo`): the daylight accent. Link underlines at rest use its soft form (`accent-soft`, 32% alpha) and firm up to full indigo on hover; it also colours focus outlines, sidenote markers and `::selection`. With the lights off the accent becomes Phosphor Glow, so the same roles glow green.

### Secondary

- **Unlit Plastic** (`unlit-plastic`) with **Plastic Edge** (`plastic-edge`) and **Plastic Ink** (`plastic-ink`, ghost eyes): the daylight state of every sticker. Also marks the "current" dot on the about-page path list and CV, favourite markers on interests, `<mark>` highlights, and the hover fill of underline-to-background links.
- **Phosphor Glow** (`phosphor-glow`) with **Phosphor Edge** and **Phosphor Ink**: the same stickers with the lights off, and the lights-off accent.

### Tertiary

- **Entry types**: Making (`type-making`, violet), Thinking (`type-thinking`, plum), Log (`type-log`, forest), Danger/Fixed (`type-danger`, rust). By night they lift to pastel versions (`night-type-*`). They only colour small type markers: the word "log" next to a title, pill outlines, callout labels, filter chips at rest, changelog type pills. They never fill surfaces.

### Neutral

- **Periwinkle Wall** (`periwinkle-wall`): the page background, under the paint texture. **Wall Raised** (`wall-raised`) is for inset notes, the TOC, callouts, inline code, and card hover. **Wall Sunk** (`wall-sunk`) is the darker step.
- **Wall Ink** (`wall-ink`): headings, body text, active nav. **Wall Ink Muted** (`wall-ink-muted`): dates, counts, metadata, nav at rest, ledes.
- **Line** / **Line Strong**: ink at 16% and 34% alpha. Line goes between list items; Line Strong is for dashed section rules, outlined pills and borders.
- **Night Ceiling** (`night-ceiling`), **Night Raised**, **Night Sunk**, **Night Ink**, **Night Ink Muted**: the lights-off counterparts, same roles.
- **Plate** (`plate`, with `plate-fg`, `plate-rim`, `plate-screw`; at night `night-plate`, `night-plate-rim`): the code panel. Always darker than the wall in both themes.

### Named Rules

**The One Room Rule.** Every colour role has a daylight value and a lights-off value under the same custom property. New surfaces use the semantic properties (`--bg`, `--fg`, `--fg-muted`, `--accent`, `--line`, `--sticker`, `--panel`, `--type-*`), never a theme-specific hex, so the switch flips them for free.

**The Plastic Is The Only Glow Rule.** Glow (luminous green, blurred `drop-shadow` halo) belongs to sticker plastic and the lights-off accent. Text, panels and borders never glow.

**The Legacy Alias Rule.** `--ink`, `--parchment`, `--amber`, `--muted`, `--border`, `--red-line`, `--lavender`, `--sage`, `--coral` are deprecated aliases that let older component styles land in this world. Don't use them in new work; their names describe the previous design (`--ink` now resolves to the wall, `--parchment` to the ink).

## Typography

**Display Font:** Bricolage Grotesque Variable (with Avenir Next, sans-serif)
**Body Font:** Figtree Variable (with Avenir Next, system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono), for code only

**Character:** A chunky, tightly tracked grotesque (weights 650 to 800, negative tracking) set against a friendly, open humanist sans for reading. Big and a bit goofy in headings, plain and comfortable in text.

### Hierarchy

- **Display** (800, clamp 3.5–8rem, 0.9): the name "Emma Campbell", on the home hero only.
- **Headline** (800, clamp 2.6–4.5rem, 0.95): static page titles (Notebook, About, Now, Uses, CV, Changelog, Photos).
- **Post Title** (800, clamp 2.3–3.6rem, 1.0): the title of a notebook entry.
- **Title** (750, 1.75rem, 1.15): `h2` inside prose.
- **Title List** (700–750, 1.6rem): home section headers ("Lately", "Worth reading"), notebook feed entry titles, page-body `h2`.
- **Subtitle** (700, 1.3rem): prose `h3`; CV role titles at 1.35rem.
- **Wordmark** (750, 1.3rem): "SpookyEmma" in the top bar, next to a small moon sticker.
- **Lede** (400, 1.15–1.25rem, muted, max 30–52ch): the one-line intro under a title.
- **Body** (400, 1.0625rem, 1.75, max 37rem / about 65–70ch): prose. A post's first paragraph opens at 1.15rem.
- **Label** (500–650, 0.82–0.95rem, sentence or lowercase, no tracking): dates, counts, metadata keys, pills. Dates use `tabular-nums`.
- **Code** (JetBrains Mono, 0.88rem on plates, 0.86em inline).

### Named Rules

**The Mono Is For Code Rule.** JetBrains Mono appears only in code blocks, inline code, `kbd` and code-plate filenames. Labels, dates and metadata are set in Figtree.

**The No Shouting Labels Rule.** Labels are not uppercase and not letter-spaced. Small text stays sentence case or lowercase ("lights", "log", "all 33 entries").

**The Masthead Rule.** "SpookyEmma" is small, in the nav. "Emma Campbell" is set huge only on the home hero. No other page repeats the name as a display heading.

## Layout

One centred column, up to 1200px (`page-max`), with a fluid gutter (`clamp(1rem, 4vw, 4.5rem)`). Static pages use a three-column row grid: a quiet right-aligned label column (150px), content, and an optional aside (220px), with a 3rem column gap and 2.5rem row padding. Dashed rules separate the rows. Reading surfaces (posts, page bodies, prose) are capped at the 37rem measure. Posts are centred in that measure, and stickers stay in the outer margins.

The home page is a two-column hero (name and one-line intro at left, sticker cluster at right), then a dashed rule, then two side-by-side lists ("Lately" by date, "Worth reading" thinking entries) with a 5rem column gap. The notebook is a date-column feed: a big Bricolage day number at left, then the entry, with a sticky filter row.

Spacing tokens step 2xs → 2xl (0.125rem to 4rem). Section-level spacing is generous: 3–4rem above lists and post navigation, 5rem before the footer.

Responsive: at ≤1023px the aside drops under the content and the label column narrows to 120px. At ≤899px the home hero stacks with the stickers first (max 320px). At ≤767px nav collapses into a full-screen overlay with 2rem Bricolage links. At ≤639px rows become a single column with the label above the content, and the notebook date column hides. Margin stickers hide below 1200px. Sidenotes float into the right margin at ≥1180px and sit inline below that.

## Elevation & Depth

The page is flat. Depth only comes from the physical objects stuck to the wall, and each object casts its own shadow. Content surfaces (notes, TOC, callouts) are tonal steps (`wall-raised`) with no shadow.

### Shadow Vocabulary

- **Sticker cast shadow** (`filter: drop-shadow(2px 4px 4px rgba(38, 43, 82, 0.24))`, daylight): a soft, blurred offset shadow under die-cut plastic. Applied as a CSS `filter` so it follows the SVG silhouette.
- **Sticker glow** (`filter: drop-shadow(0 0 10px rgba(185, 245, 140, 0.55))`, lights off): replaces the cast shadow with a phosphor halo.
- **Code plate** (inset 5px rim in `plate-rim`, 1px outer line, a faint top highlight, and `0 6px 14px -8px rgba(15, 18, 40, 0.45)`): a plate screwed to the wall, with two radial-gradient screws at the left and right edges.
- **Light-switch plate** (`0 1px 0 rgba(255,255,255,0.8) inset, 1px 3px 6px rgba(20,24,50,0.25)`): a real switch plate. The toggle inside has its own small shadow.

### Named Rules

**The Objects Cast Shadows, Pages Don't Rule.** Shadows belong to stickers, the switch and the code plate. Cards, notes, chips and nav stay flat; hover is a tonal step (`wall-raised`) and a firmer border, never a lift.

## Shapes

Gently rounded and soft. Content surfaces use 8px (`md`). Inline code, `kbd`, focus outlines and small buttons use 4px (`sm`). Every pill-like thing (type pills, tags, filter chips, skill tags, sidenote refs) is fully round (`pill`) with a 1.5px `currentColor` or `line-strong` outline. Section dividers are 1px dashed `line-strong`; list dividers are 1px solid `line`. Bullets and timeline nodes are small circles (6–11px); the "current" node is filled with sticker plastic. Sticker silhouettes are the only irregular shapes and are always drawn SVG paths, slightly rotated (-14° to +14°).

## Components

### Navigation

- **Top bar:** the "SpookyEmma" wordmark with a 1.6rem moon sticker (thicker 5px edge so it holds at that size) at left. Lowercase Figtree links at 1rem/500 at right, then the light switch.
- **States:** muted ink at rest, full ink on hover. The active link gets a 2px underline at 0.35em offset.
- **Mobile (≤767px):** a hamburger opens a full-screen wall-coloured overlay of centred 2rem Bricolage links.

### Light Switch (signature)

A drawn 30×46px plate with two screws and a slotted toggle, labelled "lights" in 0.95rem/600 muted Figtree. Clicking it flips `data-theme`. The toggle slides down 8px with the lights off (0.18s). On a flip to dark it sets `.lights-charging` on `<html>` for 1.6s. Each sticker then runs `phosphor-charge` over 1.5s with the out-expo easing (`cubic-bezier(0.16, 1, 0.3, 1)`): from unlit grey-green plastic with no halo to full glow. Then it holds. A page that loads already dark shows the stickers glowing, with no animation. The wall and ink cross-fade over 0.6s. `prefers-reduced-motion` turns off the charge, the sticker transitions, the body cross-fade and the toggle slide. `aria-pressed` reflects lights-off once hydrated.

### Stickers (signature)

A drawn SVG set: crescent moon, ghost with two eyes, ringed planet, and five-point stars drawn at their real radius so the shadow isn't scaled. The hero variant is a cluster of seven beside the home name. The margins variant pins a moon and stars left and a ghost and star right of reading pages, and can go right-only with a configurable top offset. Stickers are always `aria-hidden`, with no pointer events in the margins.

### Chips (filters and type pills)

- **Filter chip:** transparent with a 1.5px `line-strong` outline and muted text, pill-shaped, 0.95rem/600. Hover firms the text and border. Active or pressed inverts to an ink fill with wall-coloured text. On the notebook, type chips at rest take their entry-type colour.
- **Type pill / tag:** 0.82–0.85rem/600–650, 1.5px `currentColor` outline, coloured by entry type. Post tags use a muted outline.

### Lists

Home and gear lists are rows: a 1.08rem/500 title link, an optional coloured type word, and a right-aligned tabular date. Rows are split by 1px `line`. On hover the title gets a 2px underline in the accent colour. The changelog is a three-column grid: date, type pill, description.

### Cards / Containers

- **Post navigation card:** 8px radius, 1px `line-strong` border, transparent. On hover it fills with `wall-raised` and the border goes to muted ink. "Previous"/"Next" in a small muted label above a 1.15rem/650 Bricolage title.
- **Raised notes** (callout, TOC, aside, epistemic status, meta block): `wall-raised` fill, 8px radius, 1rem × 1.25rem padding, no border or shadow. A callout's label and icon take the entry-type colour for its kind.

### Code Plate (signature)

Code sits on a dark plate in both themes: `plate`/`night-plate` fill, an 8px radius, an inset rim, a screw at the left and right edges, and 2rem inline padding so text clears the screws. Shiki tokyo-night tokens: `app.css` lifts the five dimmest token colours (`#51597d`, `#646e9c`, `#9d7cd8`, `#5a638c`, `#de5971`) to lighter values so code stays at least 4.5:1 on the plate. An optional filename bar shares the plate colour. The copy button is a translucent white chip.

### Links in prose

Ink-coloured text with a 2px `accent-soft` underline at 0.18em offset. On hover the underline becomes the full accent. Use the same treatment for ledes, page bodies, gear names and interests.

## Do's and Don'ts

### Do:

- **Do** use the semantic custom properties (`--bg`, `--fg`, `--fg-muted`, `--accent`, `--sticker`, `--panel`, `--type-*`) so every new surface flips with the light switch.
- **Do** make any new decorative object a drawn SVG sticker with the `.sticker` class (and `.sticker-eye` for features), so it picks up the cast shadow, glow and phosphor charge.
- **Do** keep reading text in Figtree at the 37rem measure with 1.75 line height.
- **Do** separate sections with 1px dashed `line-strong` rules and list rows with 1px solid `line` rules.
- **Do** honour `prefers-reduced-motion`: theme and sticker changes must be instant.
- **Do** keep text at WCAG 2.1 AA, at least 4.5:1, in both themes, including code tokens on the plate.
- **Do** keep copy in Emma's own first-person voice and use the words she wrote.

### Don't:

- **Don't** add eyebrow or kicker labels, section numbers (§), glyph icons (∴ ✦ ◈ ⌘), third-person quips, jokey stats or self-describing notes.
- **Don't** set labels, dates or metadata in JetBrains Mono, uppercase or wide tracking. This world refuses the mono-labelled dev blog.
- **Don't** drift toward a cream page with an editorial serif.
- **Don't** make text, panels or borders glow. Glow belongs to sticker plastic.
- **Don't** give cards or notes shadows or hover lifts. Use a tonal step instead.
- **Don't** set "Emma Campbell" as a display heading anywhere but the home hero.
- **Don't** use the legacy alias tokens (`--ink`, `--parchment`, `--amber`, `--muted`, `--border`, `--red-line`, `--lavender`, `--sage`, `--coral`) in new work.

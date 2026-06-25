# Blockify Pages — Design Spec

**Date:** 2026-06-25
**Status:** Approved (About pilot)
**Goal:** Make hardcoded page sections editable through the CMS by converting them into reusable Payload `layout` blocks — without risking the current live design. About is the pilot; the recipe here repeats for every other page.

---

## Principles

1. **Reuse-first.** Audit existing blocks before creating new ones. Build a new block only when no existing one fits.
2. **Don't skimp on genuinely-unique sections** — a distinct layout earns its own block rather than being crammed into a generic one.
3. **Fallback pattern, not migration.** Every route keeps its existing static design as the default and *additionally* checks the `pages` collection. If an editor builds that page in the CMS, the blocks render instead. Zero visual-change risk, fully reversible — identical to how the homepage already works.
4. **Generic blocks use generic defaults.** About-specific copy lives in the static fallback and (optionally) a seeded `pages` doc — never baked into a shared block component.
5. Follow the established block pattern exactly: `config.ts` (`Block` export) + `Component.tsx`, registered in `src/blocks/registry.ts` and mapped in `src/blocks/RenderBlocks.tsx`. Use field utilities from `@/lib/payload/fields/media` for media; use `piano-*` Tailwind tokens for styling.

---

## About page → block mapping (reuse audit)

| # | About section | Block | New / reuse |
|---|---|---|---|
| 1 | Hero (bg-image band: eyebrow + headline + subtext + est. label) | **PageHero** | new (generic) |
| 2 | Founding Story (prose + portrait image) | **TwoColumn** (accent = image) | new (generic) |
| 3 | Restoration Philosophy (pull-quote + prose) | **TwoColumn** (accent = pullQuote) | reuse new block |
| 4 | Value Proposition (header + 3 numbered cards + closing line) | **CardGrid** | new (generic) |
| 5 | Expert Rebuilding (prose + feature-row list) | **TwoColumn** (accent = featureList) | reuse new block |
| 6 | Beyond the Sale (header + 3 service cards) | **CardGrid** | reuse new block |
| 7 | Promise (big centered quote + 2 CTAs, burgundy) | **CallToAction** (`style: dark`) | reuse existing |
| — | bottom InquiryCTA (light) | **FinalCta** | reuse existing |

**Net new blocks: 3** — `PageHero`, `TwoColumn`, `CardGrid`. These three are the patterns that recur across every remaining page, so the pilot front-loads nearly all future reuse.

---

## New block specs

### PageHero (`heroPage`)
Top-of-page hero band with a background image and dark gradient.
- `eyebrow` (text) — overline, gold
- `heading` (text) — large Cormorant display
- `headingAccent` (text, optional) — italic gold span appended to the heading
- `subtext` (textarea)
- `backgroundImage` — `imageField`
- `estLabel` (text, optional) — small flanking label (e.g. "Est. 1980")
- `bgStyle` (select: `burgundy` | `charcoal` | `cream` | `black`, default `burgundy`)

### TwoColumn (`twoColumn`)
A prose column paired with a typed "accent" column. One coherent layout, three uses.
- `eyebrow` (text)
- `heading` (text)
- `body` (textarea — paragraphs split on blank line, matching Philosophy/FinalCta convention; keeps seeding trivial)
- `accentSide` (select: `left` | `right`, default `right`)
- `accentType` (select: `image` | `pullQuote` | `featureList`, default `image`)
- `image` — `imageField` (shown when accentType=image)
- `quote` (textarea) + `quoteAttribution` (text) (accentType=pullQuote)
- `features` (array of `{ label, detail }`) (accentType=featureList)
- `bgStyle` (select: `cream` | `charcoal` | `burgundy` | `black`, default `cream`)

Unsupported field types in the on-page editor (e.g. conditional `admin.condition`) degrade gracefully per existing editor behavior; full editing remains available in the Payload admin.

### CardGrid (`cardGrid`)
Optional section header followed by a responsive card grid.
- `eyebrow` (text, optional)
- `heading` (text, optional)
- `intro` (textarea, optional)
- `columns` (select: `2` | `3` | `4`, default `3`)
- `showNumbers` (checkbox, default false) — renders `01/02/03…` numerals
- `cards` (array of `{ title, body }`)
- `closingText` (textarea, optional)
- `bgStyle` (select: `burgundy` | `charcoal` | `cream` | `black`, default `charcoal`)

---

## Route wiring (fallback pattern)

`src/app/(frontend)/about/page.tsx`:
1. Query `pages` for `slug: 'about'` (mirror the homepage's `queryHomePage` helper: `draftMode`, `overrideAccess: draft`, `limit: 1`, `pagination: false`).
2. If a page doc exists → render `<RenderHero {...hero} />` + `<RenderBlocks blocks={layout} />` + `<PageEditButton …>` (as home does).
3. Else → render the existing `<AboutPageContent />` + `<InquiryCTA variant="light" />` unchanged.

No existing component is deleted. `generateMetadata` keeps the static metadata, optionally overridden by the page doc later.

## Seed script

`scripts/seed-about.ts` + `seed:about` package script. Idempotent: finds-or-creates the `about` `pages` doc and sets its `hero`/`layout` to the block composition reproducing the current About design. Safe to re-run. Proves the CMS-driven path end-to-end and lets editors immediately tweak About in the admin.

---

## Execution plan (team)

1. **Parallel:** 3 subagents, one per new block (`PageHero`, `TwoColumn`, `CardGrid`) — isolated folders, no shared-file edits.
2. **Sequential (PM):** wire shared files to avoid conflicts — `registry.ts`, `RenderBlocks.tsx`, `about/page.tsx`, then `bun run generate:types` + `bun run generate:importmap`.
3. **Seed:** write `scripts/seed-about.ts` + package script.
4. **Verify:** `bunx tsc --noEmit` + `bun run lint` must pass. Spot-check the seeded About renders at parity with the static version.

## Out of scope (stays bespoke)

Forms (sell/contact), gallery search UI, dynamic inventory carousels, brand-page hero carousels. These are dynamic/business-specific and not blockified.

## Rollout after pilot

Repeat the mapping for each page; expected heavy reuse of PageHero / TwoColumn / CardGrid. Known quick win: `/european-pianos` already re-implements `BrandRows` + `SectionHeader` + a CTA inline — replace with the existing blocks.

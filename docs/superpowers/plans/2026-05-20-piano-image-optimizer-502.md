# Fix Piano Detail Page Image Optimizer 502s — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the transient 502 Bad Gateway from `/_next/image` on the largest variant of piano gallery images (e.g. `w=3840`), and reduce the simultaneous large-variant request burst that `/pianos/[slug]` triggers.

**Architecture:** Two independent, low-risk changes. (1) Cap Next.js image `deviceSizes` in `next.config.js` so the optimizer never generates the failing 3840-wide variant — piano photography never displays at that pixel density, the variant only existed because of Next.js defaults. (2) In `PianoDetailV2`'s hero gallery, mount only the active image plus immediate neighbors instead of all N images at once, so visiting a piano with many photos doesn't fire N simultaneous Sharp-resize jobs against the image optimizer.

**Tech Stack:** Next.js 15 image optimizer (Sharp), Payload CMS v3 + s3Storage to Cloudflare R2, React 19 client component (`PianoDetailV2.tsx`).

**Root cause recap (from prior analysis):**
- Failing URL: `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2FSteinway%2520A%2520MS%25205.JPG&w=3840&q=75` → 502 (11-byte body)
- Smaller variants (`w=128`, `w=1920`) succeeded; retry of same `w=3840` URL also succeeded.
- Default `deviceSizes` includes `3840`. Sharp resizing a large camera JPEG to 3840 wide is the single most expensive optimizer path and is the failure mode under cold-worker / transient upstream timing.
- `PianoDetailV2.tsx:212-227` renders **every** gallery image into the DOM with the same `sizes="(max-width: 1024px) 100vw, 56vw"`, multiplying the number of large-variant requests by the photo count.

---

## File Structure

**Modified files:**
- `next.config.js` — add `images.deviceSizes` override
- `src/components/piano/PianoDetailV2.tsx` — limit which gallery images mount

**No new files.** No tests added (this codebase has no component unit tests; verification is `bunx tsc --noEmit` + manual browser per `CLAUDE.md`).

---

## Task 1: Cap `images.deviceSizes` in next.config.js

**Why this is the highest-value change:** the 3840 variant only exists because it's a Next.js default. Piano gallery images render inside `lg:w-[56%]` of viewport. On a 4K screen that's ~2150 device px — 2048 covers it. Removing 3840 eliminates the exact request that was 502ing. This is a one-line config change with no UX impact on the screens humans actually use.

**Files:**
- Modify: `next.config.js:14-62` (`images` block)

- [ ] **Step 1: Read current `next.config.js` to confirm shape**

Run: `cat next.config.js | head -70`
Expected: an `images: { remotePatterns: [...] }` block with no `deviceSizes` key (i.e., currently using Next.js defaults).

- [ ] **Step 2: Add `deviceSizes` to the `images` config**

Edit `next.config.js`. Inside the `images: {` block, immediately above `remotePatterns:`, add:

```js
  images: {
    // Cap at 2048. Next.js default includes 3840 which:
    //   (a) is never displayed at full density on piano gallery layouts
    //       (gallery is ~56vw — 2048 covers 4K screens)
    //   (b) is the variant that times out under Sharp+R2 cold-worker load.
    // See docs/superpowers/plans/2026-05-20-piano-image-optimizer-502.md
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      ...
```

(Leave the existing `remotePatterns:` array and everything after it unchanged.)

- [ ] **Step 3: Type-check**

Run: `bunx tsc --noEmit`
Expected: 0 errors. (This config is a `.js` file with a `@type` JSDoc — `tsc` won't validate it, but it will pass through. The check is that no consumer of the config breaks.)

- [ ] **Step 4: Restart dev server and verify in browser**

Run: `bun run dev` (kill any running instance first)
Then in browser DevTools → Network tab → filter for `/_next/image`, load a `/pianos/[slug]` page.
Expected: **no requests** to `/_next/image?...&w=3840&q=...`. Largest `w` value should be `2048`.

If `w=3840` requests still appear: the dev server is serving a stale config — fully stop the process and restart.

- [ ] **Step 5: Commit**

```bash
git add next.config.js
git commit -m "$(cat <<'EOF'
fix(images): cap deviceSizes at 2048 to avoid optimizer 502s

The Next.js default deviceSizes array includes 3840, which produces
the largest and most expensive Sharp resize. Under cold-worker or
upstream R2 latency, that variant intermittently 502s — observed on
the piano detail gallery (PianoDetailV2). Piano gallery images render
at ~56vw of viewport, so 2048 covers every realistic display.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Limit simultaneous gallery image mounts in `PianoDetailV2`

**Why:** `PianoDetailV2.tsx:212-227` currently maps every gallery image into the DOM and toggles opacity. With `<Image fill>` inside a parent that is in-viewport (just `opacity: 0`), Next.js's `IntersectionObserver` considers each child visible and queues a high-resolution fetch. A piano with 8 photos = 8 simultaneous `/_next/image?w=2048` calls on initial load. That burst pattern was the secondary cause of the original 502 (lots of in-flight large-variant Sharp jobs).

The fix: only mount images that are the active slide or directly adjacent to it. Adjacent preloading keeps transitions smooth — the next image is already loaded when the user clicks the next thumbnail.

**Files:**
- Modify: `src/components/piano/PianoDetailV2.tsx` — `useState` import (already present), gallery `.map(...)` at line 212-227

- [ ] **Step 1: Re-read the current gallery block to confirm shape**

Run: `sed -n '30,60p;205,230p' src/components/piano/PianoDetailV2.tsx`
Expected: confirms the existing `const [activeImage, setActiveImage] = useState(0)` at line 37 and the gallery `.map` at line 212.

- [ ] **Step 2: Add a mounted-indices tracker above the JSX**

Edit `src/components/piano/PianoDetailV2.tsx`. Locate this line (around line 37):

```tsx
  const [activeImage, setActiveImage] = useState(0)
```

Immediately below that line, add:

```tsx
  const [activeImage, setActiveImage] = useState(0)

  // Track which gallery indices have ever been "near" the active image.
  // We only mount images that are active or adjacent — this caps the number
  // of simultaneous large-variant <Image> requests to ~3 regardless of how
  // many photos the piano has. Once an image is mounted it stays mounted so
  // opacity transitions back to it remain instant.
  const [mountedIndices, setMountedIndices] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    setMountedIndices((prev) => {
      const next = new Set(prev)
      next.add(activeImage)
      if (activeImage > 0) next.add(activeImage - 1)
      if (activeImage < allImages.length - 1) next.add(activeImage + 1)
      return next.size === prev.size ? prev : next
    })
  }, [activeImage, allImages.length])
```

Note: `allImages` is declared on line 41, before this `useEffect` runs — fine because `useEffect` runs after render.

- [ ] **Step 3: Ensure `useEffect` is imported**

Check the import line at the top of the file:

```tsx
import { useState } from 'react'
```

If `useEffect` is missing, change it to:

```tsx
import { useEffect, useState } from 'react'
```

- [ ] **Step 4: Gate the gallery `.map` on `mountedIndices`**

Locate the gallery block (around line 212-227):

```tsx
          {allImages.map((url, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: activeImage === i ? 1 : 0 }}
            >
              <Image
                src={url}
                alt={`${piano.title} — photo ${i + 1} of ${allImages.length}`}
                fill
                className={cn('object-cover', activeImage === i && 'animate-kenburns')}
                sizes="(max-width: 1024px) 100vw, 56vw"
                priority={i === 0}
              />
            </div>
          ))}
```

Replace with:

```tsx
          {allImages.map((url, i) => {
            if (!mountedIndices.has(i)) return null
            return (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: activeImage === i ? 1 : 0 }}
              >
                <Image
                  src={url}
                  alt={`${piano.title} — photo ${i + 1} of ${allImages.length}`}
                  fill
                  className={cn('object-cover', activeImage === i && 'animate-kenburns')}
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  priority={i === 0}
                />
              </div>
            )
          })}
```

Leave the thumbnail strip below (lines ~255-289) **unchanged** — thumbnails use `sizes="64px"` and don't contribute to the large-variant burst.

- [ ] **Step 5: Type-check**

Run: `bunx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 6: Lint**

Run: `bun run lint`
Expected: 0 errors. (If a `react-hooks/exhaustive-deps` warning appears on the `useEffect`, add the `allImages.length` dep — it's already in the array; double-check.)

- [ ] **Step 7: Verify in browser**

Run: `bun run dev`

Open a piano detail page with 4+ photos. In DevTools → Network → filter `/_next/image`:
- **Initial page load:** expect ~1 large-variant request (for image 0) plus N thumbnail requests at `w=64-128`.
- **Click thumbnail 3:** expect 1 new large-variant request for image 3 (and adjacent prefetch for 2 and 4 if not already loaded). Image 3 fades in.
- **Click back to thumbnail 0:** expect **no new** large-variant request — image 0 is already mounted, transition is instant.

Watch for visual regressions:
- Opacity transitions still smooth between adjacent images? ✓ (both are mounted)
- First click on a non-adjacent image (e.g. thumbnail 5 when only 0/1 mounted) — brief load delay before fade-in is acceptable.
- The active image's `animate-kenburns` class still applies? ✓ (unchanged).
- Counter ("1 / 8") still updates? ✓ (unchanged).

- [ ] **Step 8: Commit**

```bash
git add src/components/piano/PianoDetailV2.tsx
git commit -m "$(cat <<'EOF'
perf(piano-detail): mount only active + adjacent gallery images

PianoDetailV2 previously rendered every gallery image into the DOM
with an opacity toggle. With <Image fill> inside an in-viewport parent,
each one triggered a Sharp resize via /_next/image — visiting a piano
with 8 photos fired 8 simultaneous large-variant optimizer requests,
which contributed to intermittent 502s.

Now: mount only the active image and immediate neighbors. Once an
index is mounted it stays mounted, so transitions back to previously
visited images remain instant. Caps in-flight large-variant requests
to ~3 regardless of gallery size.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: End-to-end verification

**Files:** none modified — verification only.

- [ ] **Step 1: Full type check**

Run: `bunx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Lint**

Run: `bun run lint`
Expected: 0 errors.

- [ ] **Step 3: Cold browser test against the originally-failing image**

Restart dev server (`bun run dev`). Open the piano page whose hero is `Steinway A MS 5.JPG` (the original 502 victim). Hard-reload the page with cache disabled (DevTools → Network → "Disable cache" checked).

Expected:
- No `/_next/image?...&w=3840&...` requests at all.
- The hero image's `<img>` element shows `naturalWidth > 0` and `complete === true` (run in console: `document.querySelector('main img')` to inspect).
- No 502s in the Network tab.

Repeat the hard-reload 3 times to test cold-cache behavior. The 502 was transient before; with `w=3840` removed from the candidate set the worst-case Sharp job is now `w=2048`, which is roughly half the memory/CPU.

- [ ] **Step 4: Network burst check**

On a piano page with ≥5 photos, with cache disabled, count `/_next/image` requests fired in the first second after navigation. Should be roughly: 1 large (active hero) + N thumbnails. **Not** N large + N thumbnails.

- [ ] **Step 5: Smoke-test other image-heavy pages**

Quick visual pass on:
- `/pianos` (the listing grid)
- `/` (home — has hero carousel)
- A brand page (e.g., `/pianos/steinway`)

Expected: no visible image breakage, no `w=3840` requests in Network.

- [ ] **Step 6: Final commit if any incidental fixes were needed**

If steps 1-5 surfaced any small fixes (typos, missing imports), commit them separately. Otherwise no commit needed for this task.

---

## What this plan deliberately does NOT do

- **Does not change Payload `imageSizes`** in `src/collections/Media.ts`. Adding more Payload-side sizes would only help if the source URL passed to `<Image>` pointed at a pre-sized variant, which would require changing `getImageUrl()` in `src/lib/payload/pianos.ts:23`. That's a bigger refactor and unnecessary given Task 1 already eliminates the failing variant.
- **Does not touch `NEXT_PUBLIC_R2_PUBLIC_URL` env setup.** It's set in `.env.local`. If production is missing it, that's a separate operational concern — flag to the user but don't gate this fix on it.
- **Does not add unit tests.** This codebase has only one int spec (`tests/int/api.int.spec.ts`) and one e2e (`tests/e2e/frontend.e2e.spec.ts`); no precedent for React component unit tests. Per `CLAUDE.md` ("For UI or frontend changes, start the dev server and use the feature in a browser"), manual browser verification is the convention.

---

## Self-review checklist

- [x] Spec coverage: both root causes (3840 variant + simultaneous-mount burst) have tasks.
- [x] No placeholders. Every step has the actual code or command.
- [x] Type consistency: `mountedIndices` declared as `Set<number>` and used as such throughout.
- [x] File paths exact. Line numbers given where useful.
- [x] Each step is one action with a verification or expected output.

# UsedSteinways — Branding Guide

**Concept:** A concert hall at night. Warm ivory light sections against deep midnight indigo darks. Burnished gold carries the heat. The tension between warm and cool creates a prestigious, editorial presence.

---

## Color Palette

| Token | Value | Role |
|---|---|---|
| `bg-piano-burgundy` | `hsl(350 62% 26%)` | Dark sections, heroes, headers |
| `bg-piano-indigo-card` | `hsl(350 56% 32%)` | Panels / cards on dark backgrounds |
| `bg-piano-gold` | `hsl(40 72% 52%)` | Accent — overlines, borders, badges |
| `bg-piano-cream` | `hsl(36 18% 97%)` | Light section backgrounds |
| `bg-piano-linen` | `hsl(36 20% 91%)` | Subtle dividers, light borders |
| `bg-piano-stone` | `hsl(25 4% 44%)` | Secondary / muted body text |
| `bg-piano-black` | `hsl(25 6% 9%)` | Image containers and overlays only |

**Rule:** Pages alternate between cream and indigo. Never use `bg-piano-black` as a section background — that's what `bg-piano-burgundy` is for.

---

## Typography

### Display — Cormorant Garamond
The headline voice. Always `font-light`. Never bold.

```tsx
className="font-cormorant font-light"
// or
style={{ fontFamily: "'Cormorant Garamond', serif" }}
```

| Role | Size |
|---|---|
| Hero h1 | `clamp(3.6rem, 7vw, 8.5rem)` |
| Section h2 | `clamp(3rem, 5vw, 5.5rem)` |
| Subsection h3 | `clamp(2.2rem, 3.5vw, 3.4rem)` |
| Card title | `text-4xl` |
| Quote / inline | `text-2xl` |

### UI Labels — Syne
Small, wide-tracked, all-caps. Used for overlines, nav, and buttons.

```tsx
className="font-display"
```

| Role | Size | Tracking |
|---|---|---|
| Overlines | `text-[11px]` | `tracking-[0.45em]` |
| Nav / Buttons | `text-[11px]` | `tracking-[0.3em]` |
| Captions / meta | `text-[10px]` | `tracking-[0.35em]` |

### Body — Geist Sans
Default font. No special classes needed.

| Role | Class |
|---|---|
| Primary body | `text-lg` |
| Secondary | `text-base` |
| Fine print | `text-sm` |

---

## Layout Rhythm

- **Section padding:** `py-36 px-8`
- **Section header margin:** `mb-20`
- **Overline → headline gap:** `mb-5`
- **Headline → body gap:** `mb-10` to `mb-12`
- **Card inner padding:** `p-8` to `p-10`
- **Primary button padding:** `px-10 py-4` (min) · `px-12 py-4` (hero)
- **Max content width:** `max-w-7xl mx-auto`

---

## Cards

Piano cards use a lifted treatment — white background, 4px gold top border, cool indigo shadow.

```tsx
style={{
  borderTop: '4px solid hsl(40 72% 52%)',
  boxShadow: '0 4px 28px hsl(350 62% 26% / 0.14), 0 1px 4px hsl(350 62% 26% / 0.09)',
}}
className="group block bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
```

Cards on dark indigo backgrounds get a cool shadow that creates depth:
```tsx
style={{ boxShadow: '0 2px 20px hsl(350 62% 26% / 0.45)' }}
```

---

## Buttons

### On a light (cream) background
```tsx
// Primary
className="bg-piano-black text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:opacity-80 transition-opacity"

// Secondary / outline
className="border border-piano-linen text-piano-black px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
```

### On a dark (indigo) background
```tsx
// Primary
className="bg-piano-cream text-piano-burgundy px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"

// Secondary / outline
className="border border-piano-gold/40 text-piano-gold px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold transition-colors"
```

---

## Section Patterns

### Light section (ivory)
```tsx
<section className="py-36 px-8" style={{ backgroundColor: 'hsl(36, 22%, 96%)' }}>
  // or className="bg-piano-cream py-36 px-8"
```

### Dark section (indigo)
```tsx
<section className="bg-piano-burgundy py-36 px-8">
```

### Hero (dark, full-width)
```tsx
<section className="bg-piano-burgundy py-28 px-8">
  <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
    Overline Label
  </p>
  <h1 className="font-cormorant font-light text-white leading-none" style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}>
    Page Title
  </h1>
```

### Overline + Headline (standard section header)
```tsx
<span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
  Category Label
</span>
<h2 className="font-cormorant font-light text-piano-black leading-tight" style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>
  Section Headline
</h2>
```

---

## Hover Interactions

| Element | Interaction |
|---|---|
| Piano cards | `-translate-y-1.5` lift over `500ms` |
| Guide cards | `-translate-y-1` lift over `300ms` |
| Brand grid rows | Left gold bar `w-0 → w-[3px]` slides in over `300ms` |
| Image inside card | `scale(1.04)` over `700ms` |
| Text links / nav | `opacity` or `color` shift over `200ms` |

---

## Page Entry Animation

Elements stagger in on load using `animate-fade-up` with inline delays:

```tsx
className="animate-fade-up"
style={{ animationDelay: '0.15s', opacity: 0 }}
```

Stagger steps: `0.05s` · `0.15s` · `0.25s` · `0.35s` · `0.45s`

Keyframe defined in `globals.css`:
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## Key Files

| File | Purpose |
|---|---|
| `src/app/(frontend)/globals.css` | All design tokens (`@theme`, `:root`, animations) |
| `src/app/(frontend)/variant/_components/UsedSteinwaysVariantPage.tsx` | Homepage — source of truth for section patterns |
| `src/components/piano/PianoCardFeatured.tsx` | Standard piano card component |
| `src/components/piano/InquiryCTA.tsx` | Reusable CTA section (`variant="dark"` or `"light"`) |
| `src/components/piano/BrandPageV2.tsx` | Template for all brand pages |
| `src/components/piano/ModelPageTemplate.tsx` | Template for Steinway model pages |
| `src/components/layout/PianoLogo.tsx` | Logo — `theme="dark"` or `"light"`, `size="sm/md/lg"` |

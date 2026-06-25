/**
 * Seed (or re-seed) the Home page as a CMS-driven Pages document built from the
 * homepage blocks, reproducing the hand-built homepage. Idempotent — safe to re-run.
 *
 *   bun run seed:home
 *
 * Once seeded, `/` renders from the CMS (editable in the admin / on-page editor).
 * Deleting the `home` Pages doc reverts to the static <UsedSteinwaysHomePage/>.
 *
 * Static editorial blocks are populated with their real copy so editors see and
 * can edit actual content. Dynamic blocks (brandRows, featuredPianos, newsSection,
 * showroomGallery, locations) are left empty on purpose so they keep their live
 * database-driven behaviour exactly as the static homepage does.
 *
 * Note newline conventions differ by block: the homepage blocks (philosophy,
 * finalCta) split headings on a LITERAL "\n" (backslash-n) — written here as '\\n'.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../src/payload-types'

const layout: Page['layout'] = [
  // 1. HERO — wordmark hero (images come from the live media query)
  {
    blockType: 'heroHomepage',
    eyebrow: 'Est. 1980 · Massachusetts',
    heading: 'UsedSteinways',
    subLabel: 'Quality Instruments · Expert Hands',
    tagline:
      'Every piano personally evaluated by Roger, a master piano technician with over 45 years of experience.',
    primaryCta: { label: 'Browse Collection', href: '/pianos' },
    secondaryCta: { label: 'Get in Touch', href: '/contact' },
    stats: [
      { number: '45+', label: 'Years' },
      { number: '20+', label: 'Steinways' },
    ],
  },
  // 2. TICKER — empty items → default brand list
  {
    blockType: 'ticker',
    style: 'dark',
  },
  // 3. NEWS — live recent posts
  {
    blockType: 'newsSection',
    limit: 6,
  },
  // 4. "OUR PIANOS" header
  {
    blockType: 'sectionHeader',
    eyebrow: 'The Collection',
    heading: 'Our Pianos',
    tagline: "From the world's finest makers — Each with its unique tone and touch",
    style: 'dark',
  },
  // 5. BRAND ROWS — empty → auto-derived from the Brands collection (live)
  {
    blockType: 'brandRows',
  },
  // 6. FEATURED PIANOS — live query
  {
    blockType: 'featuredPianos',
  },
  // 7. SHOWROOM GALLERY — live media query
  {
    blockType: 'showroomGallery',
  },
  // 8. PHILOSOPHY (heading/body split on literal "\n")
  {
    blockType: 'philosophy',
    eyebrow: 'Our Philosophy',
    heading: 'People + Pianos\\n= Music',
    body:
      'Over 45 years of expertise.\\nA trade-up policy that lets you grow.\\nTwo showrooms with over two hundred pianos to match individual preferences.',
    primaryCta: { label: 'Our Story', href: '/about' },
    secondaryCta: { label: 'Browse Pianos', href: '/pianos' },
  },
  // 9. FINAL CTA (heading split on literal "\n"; phone from Site Settings)
  {
    blockType: 'finalCta',
    eyebrow: 'Burlington & Natick Showrooms',
    heading: 'Begin Your\\nSearch',
    body:
      "Tell us what you're looking for — or come hear the pianos yourself. Every conversation starts with listening.",
    primaryCta: { label: 'Get in Touch', href: '/contact' },
    secondaryCta: { label: 'Browse Inventory', href: '/pianos' },
    phoneSource: 'siteSettings',
  },
  // 10. LOCATIONS — live Site Settings
  {
    blockType: 'locations',
    eyebrow: 'Our Locations',
  },
]

// Top-level await so `payload run` waits for the writes before exiting.
const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  limit: 1,
  pagination: false,
})

const data = {
  title: 'Home',
  slug: 'home',
  _status: 'published' as const,
  hero: { type: 'none' as const },
  layout,
}

// disableRevalidate: Next's revalidatePath() can't run outside a request context.
const context = { disableRevalidate: true }

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
  console.log(`✓ Updated Home page (id: ${existing.docs[0].id})`)
} else {
  const created = await payload.create({ collection: 'pages', data, context })
  console.log(`✓ Created Home page (id: ${created.id})`)
}

process.exit(0)

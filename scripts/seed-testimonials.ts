/**
 * Seed (or re-seed) the Testimonials page as a CMS-driven Pages document built
 * from blocks, reproducing the hand-built /testimonials design. Idempotent —
 * safe to re-run.
 *
 *   bun run seed:testimonials
 *
 * Once seeded, `/testimonials` renders from the CMS (editable in the admin /
 * on-page editor). Deleting the `testimonials` Pages doc reverts to the static
 * fallback.
 *
 * NOTE: the `testimonialsFeatured` / `testimonialsGrid` block types are new and
 * are not part of the generated `Page['layout']` union until the PM registers
 * them in src/blocks/registry.ts and runs `generate:types`. The
 * `@ts-expect-error` lines below are EXPECTED until then.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../src/payload-types'

const layout: Page['layout'] = [
  // 1. HERO
  {
    blockType: 'heroPage',
    eyebrow: 'From Our Clients',
    heading: 'What Our Customers Say',
    headingAccent: '',
    subtext:
      'Our reputation is built one instrument at a time. Here is what buyers say about their experience.',
    estLabel: '',
    bgStyle: 'burgundy',
  },
  // 2. FEATURED TESTIMONIALS CAROUSEL — self-fetching (featured + published)
  {
    blockType: 'testimonialsFeatured',
    eyebrow: 'Featured Voices',
    heading: 'Featured Testimonials',
  },
  // 3. TESTIMONIALS GRID — self-fetching (published)
  {
    blockType: 'testimonialsGrid',
    eyebrow: 'Every Story',
    heading: 'In Their Own Words',
  },
  // 4. CLOSING CTA — "Ready to Find Your Piano?" + inquiry (pulls phone from Site Settings)
  {
    blockType: 'finalCta',
    eyebrow: 'Join Them',
    heading: 'Ready to Find Your\\nPiano?',
    body: "Tell us what you're looking for — or visit a showroom to hear the pianos yourself.",
    primaryCta: { label: 'Browse the Collection', href: '/pianos' },
    secondaryCta: { label: 'Get in Touch', href: '/contact' },
    phoneSource: 'siteSettings',
  },
]

// Top-level await so `payload run` waits for the writes before exiting.
const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'testimonials' } },
  limit: 1,
  pagination: false,
})

const data = {
  title: 'Testimonials',
  slug: 'testimonials',
  _status: 'published' as const,
  hero: { type: 'none' as const },
  layout,
}

// disableRevalidate: Next's revalidatePath() can't run outside a request context.
const context = { disableRevalidate: true }

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
  console.log(`✓ Updated Testimonials page (id: ${existing.docs[0].id})`)
} else {
  const created = await payload.create({ collection: 'pages', data, context })
  console.log(`✓ Created Testimonials page (id: ${created.id})`)
}

process.exit(0)

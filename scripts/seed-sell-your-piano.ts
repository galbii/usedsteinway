/**
 * Seed (or re-seed) the Sell Your Piano page as a CMS-driven Pages document
 * built from blocks, reproducing the hand-built /sell-your-piano design.
 * Idempotent — safe to re-run.
 *
 *   bun run seed:sell-your-piano
 *
 * Once seeded, `/sell-your-piano` renders from the CMS (editable in the admin /
 * on-page editor). Deleting the doc reverts to the static fallback.
 *
 * NOTE: the `sellForm` block must be registered (src/blocks/registry.ts +
 * RenderBlocks.tsx) and types regenerated before this page renders correctly.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../src/payload-types'

const layout: Page['layout'] = [
  // 1. HERO
  {
    blockType: 'heroPage',
    eyebrow: 'Private Acquisitions',
    heading: 'Sell Your Piano',
    headingAccent: '',
    subtext:
      'We will consider for purchase or by consignment your STEINWAY, Shigeru Kawai, Bösendorfer, and C. Bechstein pianos. Tell us about your piano for sale.',
    estLabel: '',
    bgStyle: 'burgundy',
  },
  // 2. SELL FORM — wrapper block embedding the bespoke SellPianoForm
  {
    blockType: 'sellForm',
    eyebrow: 'Piano Inquiry',
    heading: 'Please provide information about your piano',
    intro:
      'Please note: Due to the high volume of inquiries, we will consider pianos submitted here over phone calls. We will endeavor to respond as quickly as time allows.',
  },
  // 3. CLOSING — FinalCta (light, pulls phone from Site Settings)
  {
    blockType: 'finalCta',
    eyebrow: 'Prefer to call?',
    heading: 'Begin the\\nConversation',
    body: "Tell us about your piano for sale — or reach us directly. We'll respond as quickly as time allows.",
    primaryCta: { label: 'Get in Touch', href: '/contact' },
    secondaryCta: { label: 'Browse Inventory', href: '/pianos' },
    phoneSource: 'siteSettings',
  },
]

// Top-level await so `payload run` waits for the writes before exiting.
const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'sell-your-piano' } },
  limit: 1,
  pagination: false,
})

const data = {
  title: 'Sell Your Piano',
  slug: 'sell-your-piano',
  _status: 'published' as const,
  hero: { type: 'none' as const },
  layout,
}

// disableRevalidate: Next's revalidatePath() can't run outside a request context.
const context = { disableRevalidate: true }

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
  console.log(`✓ Updated Sell Your Piano page (id: ${existing.docs[0].id})`)
} else {
  const created = await payload.create({ collection: 'pages', data, context })
  console.log(`✓ Created Sell Your Piano page (id: ${created.id})`)
}

process.exit(0)

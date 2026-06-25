/**
 * Seed (or re-seed) the Financing page as a CMS-driven Pages document built from
 * blocks, reproducing the hand-built Financing design. Idempotent — safe to re-run.
 *
 *   bun run seed:financing
 *
 * Once seeded, `/financing` renders from the CMS (editable in the admin / on-page
 * editor). Deleting the `financing` Pages doc reverts to the static fallback.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../src/payload-types'

const layout: Page['layout'] = [
  // 1. HERO
  {
    blockType: 'heroPage',
    eyebrow: 'Payment Options',
    heading: 'Flexible Financing',
    subtext:
      "The right piano shouldn't wait for the right moment. We work with music-specialized lenders to help qualified buyers finance their instrument.",
    bgStyle: 'burgundy',
  },
  // 2. THREE WAYS TO OWN — numbered options
  {
    blockType: 'cardGrid',
    eyebrow: 'Your Options',
    heading: 'Three Ways to Own',
    columns: '3',
    showNumbers: true,
    bgStyle: 'cream',
    cards: [
      {
        title: 'Direct Purchase',
        body: 'Full payment at time of sale. We accept wire transfer, cash, and credit cards. Simplest process. No interest. Delivery generally within 1–2 weeks for in-stock pianos.',
      },
      {
        title: 'Music Lending Programs',
        body: 'We work with lending institutions that specialize in musical instruments. These lenders understand piano ownership and offer favorable terms compared to generic personal loans. Credit check is required. Terms typically range from 3 months up to 12 years.',
      },
      {
        title: 'Private Payment Plans',
        body: 'You may arrange financing with your preferred financial institution.',
      },
    ],
  },
  // 3. WHAT AFFECTS YOUR TERMS — factor cards
  {
    blockType: 'cardGrid',
    eyebrow: 'Key Factors',
    heading: 'What Affects Your Terms',
    columns: '4',
    showNumbers: false,
    bgStyle: 'charcoal',
    cards: [
      {
        title: 'Credit Profile',
        body: 'Strong credit typically secures rates from 6.9–9.9% APR',
      },
      {
        title: 'Down Payment',
        body: 'Larger down payment (20–30%) reduces rate and improves approval odds',
      },
      {
        title: 'Instrument Value',
        body: 'Higher-value instruments from major makers qualify for better programs',
      },
      {
        title: 'Loan Term',
        body: 'Shorter terms carry lower rates; 5-year terms typically outperform 10-year',
      },
    ],
  },
  // 4. IS FINANCING RIGHT FOR YOU? — full-width prose
  {
    blockType: 'twoColumn',
    eyebrow: 'Honest Advice',
    heading: 'Is Financing Right for You?',
    body:
      "Financing makes sense when: the total interest cost is acceptable relative to the instrument's value appreciation potential, your cash position benefits from being preserved for other uses, or a lease-to-own structure offers tax advantages for professional musicians.\n\nFinancing rarely makes sense when: the monthly payment would create financial stress, the instrument is being purchased speculatively, or a shorter savings period would allow direct purchase at better terms.\n\nWe're happy to discuss the financial dimensions of any purchase openly. We have no incentive to push financing — our only goal is for you to end up with the right piano through the right process.",
    accentType: 'none',
    accentSide: 'right',
    bgStyle: 'cream',
  },
  // 5. CLOSING — FinalCta (pulls phone from Site Settings)
  {
    blockType: 'finalCta',
    eyebrow: 'Begin the Conversation',
    heading: 'Discuss Your\\nOptions',
    body:
      "We have no incentive to push financing — our only goal is for you to end up with the right piano through the right process. Tell us what you're looking for.",
    primaryCta: { label: 'Discuss Financing Options', href: '/contact?subject=Financing+Inquiry' },
    secondaryCta: { label: 'Browse the Collection', href: '/pianos' },
    phoneSource: 'siteSettings',
  },
]

// Top-level await so `payload run` waits for the writes before exiting.
const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'financing' } },
  limit: 1,
  pagination: false,
})

const data = {
  title: 'Financing',
  slug: 'financing',
  _status: 'published' as const,
  hero: { type: 'none' as const },
  layout,
}

// disableRevalidate: Next's revalidatePath() can't run outside a request context.
const context = { disableRevalidate: true }

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
  console.log(`✓ Updated Financing page (id: ${existing.docs[0].id})`)
} else {
  const created = await payload.create({ collection: 'pages', data, context })
  console.log(`✓ Created Financing page (id: ${created.id})`)
}

process.exit(0)

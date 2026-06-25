/**
 * Seed (or re-seed) the Visit page as a CMS-driven Pages document built from
 * blocks, reproducing the hand-built Visit design. Idempotent — safe to re-run.
 *
 *   bun run seed:visit
 *
 * Once seeded, `/visit` renders from the CMS (editable in the admin / on-page
 * editor). Deleting the `visit` Pages doc reverts to the static fallback.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '../src/payload-types'

const layout: Page['layout'] = [
  // 1. HERO
  {
    blockType: 'heroPage',
    eyebrow: 'Plan Your Visit',
    heading: 'Come Hear Them Yourself',
    subtext:
      'No piano purchase should be made without playing the instrument. Our showrooms are designed to let you hear each piano at its best.',
    bgStyle: 'burgundy',
  },
  // 2. SHOWROOM HOURS (prose) + HOW TO MAXIMIZE YOUR VISIT (feature list)
  {
    blockType: 'twoColumn',
    eyebrow: 'Showroom Hours',
    heading: 'How to Maximize\nYour Visit',
    body: 'By appointment. Walk-in welcome but not guaranteed.',
    accentType: 'featureList',
    accentSide: 'right',
    bgStyle: 'cream',
    features: [
      {
        label: 'Be On Time',
        detail:
          'Please be on time. We allow at least 60 minutes per appointment. We want you to have as much time with the pianos as possible.',
      },
      {
        label: 'Share Your Criteria',
        detail:
          'Tell us your search criteria. The more we understand your needs, the better we can match you with the right piano.',
      },
      {
        label: 'Request Ahead',
        detail:
          "If you have a specific piano you'd like to try, please tell us in advance of your visit so we can prep it.",
      },
      {
        label: 'Ask Questions',
        detail:
          'During your visit, feel free to ask questions. We want you to know how each piano may fit your preferences and understand what you will be purchasing.',
      },
      {
        label: 'Bring Music',
        detail:
          'We suggest that you prepare 2 or 3 pieces of music to try on all pianos. This allows you to better compare the tone and touch of the different pianos.',
      },
      {
        label: 'Take Your Time',
        detail: 'We are happy to extend your visit if no other appointment is expected.',
      },
    ],
  },
  // 3. LOCATION SELECTOR + MAP — live data from Site Settings
  {
    blockType: 'locations',
    eyebrow: 'Visit Us',
    heading: '',
  },
  // 4. APPOINTMENT CTA — pulls phone from Site Settings
  {
    blockType: 'finalCta',
    eyebrow: 'Schedule a Visit',
    heading: 'Book an\\nAppointment',
    body:
      'Please call or send a message to book your appointment. We will confirm the location, date and time.',
    primaryCta: { label: 'Get in Touch', href: '/contact' },
    secondaryCta: { label: 'Browse Inventory', href: '/pianos' },
    phoneSource: 'siteSettings',
  },
  // 5. CLOSING CTA — pulls phone from Site Settings
  {
    blockType: 'finalCta',
    eyebrow: 'Ready to move forward?',
    heading: 'Begin Your\\nPiano Search',
    body:
      "Every conversation starts with listening. Tell us what you're looking for — or come see us at the showroom — and we'll find the right instrument for you.",
    primaryCta: { label: 'Get in Touch', href: '/contact' },
    secondaryCta: { label: 'Learn About Us', href: '/about' },
    phoneSource: 'siteSettings',
  },
]

// Top-level await so `payload run` waits for the writes before exiting.
const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'visit' } },
  limit: 1,
  pagination: false,
})

const data = {
  title: 'Visit',
  slug: 'visit',
  _status: 'published' as const,
  hero: { type: 'none' as const },
  layout,
}

// disableRevalidate: Next's revalidatePath() can't run outside a request context.
const context = { disableRevalidate: true }

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
  console.log(`✓ Updated Visit page (id: ${existing.docs[0].id})`)
} else {
  const created = await payload.create({ collection: 'pages', data, context })
  console.log(`✓ Created Visit page (id: ${created.id})`)
}

process.exit(0)

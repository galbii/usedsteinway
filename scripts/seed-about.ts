/**
 * Seed (or re-seed) the About page as a CMS-driven Pages document built from
 * blocks, reproducing the hand-built About design. Idempotent — safe to re-run.
 *
 *   bun run seed:about
 *
 * Once seeded, `/about` renders from the CMS (editable in the admin / on-page
 * editor). Deleting the `about` Pages doc reverts to the static fallback.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { CallToActionBlock, Page } from '../src/payload-types'

// Minimal Lexical richText value (heading + paragraph) for the CallToAction block.
function ctaRichText(heading: string, paragraph: string): NonNullable<CallToActionBlock['richText']> {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          children: [
            { type: 'text', text: heading, version: 1, detail: 0, format: 0, mode: 'normal', style: '' },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          textFormat: 0,
          children: [
            { type: 'text', text: paragraph, version: 1, detail: 0, format: 0, mode: 'normal', style: '' },
          ],
        },
      ],
    },
  }
}

const layout: Page['layout'] = [
  // 1. HERO
  {
    blockType: 'heroPage',
    eyebrow: 'Since 1980 — New England',
    heading: "New England's Destination",
    headingAccent: 'for Rebuilt Steinway Excellence.',
    subtext:
      'For over 40 years, a trusted source for fine pianos — specializing in the rebuilding and restoration of vintage Steinway & Sons instruments.',
    estLabel: 'Est. 1980',
    bgStyle: 'burgundy',
  },
  // 2. FOUNDING STORY — prose + image
  {
    blockType: 'twoColumn',
    eyebrow: 'Our Story',
    heading: 'More than a showroom.\nA full-service piano center.',
    body:
      "Founded in 1980 by master technician Roger Shaffer, Roger's Piano quickly earned a reputation for meticulous Steinway rebuilding and deep technical expertise. What began as a singular commitment to craftsmanship has grown into New England's most trusted destination for fine pianos.\n\nThat tradition continues today. Partner Carol Wu brings pianistic insight and exceptional customer care — guiding customers to instruments that best match their musical needs and long-term goals.\n\nToday, Roger's Piano operates two showrooms and provides comprehensive services: tuning, maintenance, full restorations, player-piano system installations, and a rental program for those beginning their musical journey.",
    accentType: 'image',
    accentSide: 'right',
    bgStyle: 'cream',
  },
  // 3. RESTORATION PHILOSOPHY — pull-quote + prose
  {
    blockType: 'twoColumn',
    eyebrow: 'Our Philosophy',
    heading: 'Where Heritage\nMeets Craftsmanship',
    body:
      'Our rebuilt Steinway pianos offer a compelling alternative to buying new — delivering legendary performance and prestige at significantly greater value.\n\nWe follow a restoration philosophy that emphasizes authenticity over replacement, preserving original components whenever possible to retain the tonal character and musical maturity that define classic Steinways.',
    accentType: 'pullQuote',
    accentSide: 'left',
    quote: 'Authenticity over replacement — preserving what makes a great Steinway great.',
    quoteAttribution: 'Restoration Philosophy',
    bgStyle: 'charcoal',
  },
  // 4. VALUE PROPOSITION — numbered cards
  {
    blockType: 'cardGrid',
    eyebrow: 'The Value Proposition',
    heading: 'A Smarter Way\nto Own a Steinway.',
    columns: '3',
    showNumbers: true,
    bgStyle: 'burgundy',
    cards: [
      { title: 'Luxury\nWithin Reach', body: 'Exceptional value compared to new instruments.' },
      { title: 'Proven\nMusical Maturity', body: 'Richer tone and more responsive touch.' },
      { title: 'Sustainable\nChoice', body: 'Extending the life of a world-class piano.' },
    ],
    closingText:
      'We are not just a retailer, but a strategic partner in piano ownership — helping customers make informed, long-term investments in music.',
  },
  // 5. EXPERT REBUILDING — prose + feature list
  {
    blockType: 'twoColumn',
    eyebrow: 'The Process',
    heading: 'Expert Rebuilding,\nGlobal Craftsmanship',
    body:
      "Roger's Piano may collaborate with highly skilled restoration specialists worldwide — known for their precision and respect for traditional methods.\n\nWhether it's a classic Model A grand or a vintage upright, each rebuilt Steinway undergoes a meticulous process designed to bring it back to life — visually, structurally, and musically.",
    accentType: 'featureList',
    accentSide: 'right',
    bgStyle: 'cream',
    features: [
      { label: 'Performance', detail: 'Meets or exceeds performance expectations.' },
      { label: 'Design Integrity', detail: 'Retains the design integrity of the original build.' },
      { label: 'Concert Quality', detail: 'Delivers a refined, concert-quality playing experience.' },
    ],
  },
  // 6. BEYOND THE SALE — service cards
  {
    blockType: 'cardGrid',
    eyebrow: 'A Lifetime Resource',
    heading: 'Beyond the Sale',
    intro:
      "What truly differentiates Roger's Piano is our long-term commitment to customers. This end-to-end capability ensures that every piano continues to perform at its best for years to come.",
    columns: '3',
    showNumbers: false,
    bgStyle: 'charcoal',
    cards: [
      { title: 'Tuning &\nMaintenance', body: 'Precision tuning and ongoing maintenance.' },
      { title: 'Full\nRestorations', body: 'Full restorations and rebuilding.' },
      { title: 'Player Piano\nSystems', body: 'Player-piano system installations.' },
    ],
  },
  // 7. PROMISE — CallToAction (dark)
  {
    blockType: 'cta',
    style: 'dark',
    richText: ctaRichText(
      "Authentic craftsmanship, enduring value, and a deeper connection to the instrument's legacy.",
      "Roger's Piano has earned its reputation as New England's authority on rebuilt Steinway pianos by combining decades of experience with a clear philosophy: preserve what makes great instruments exceptional.",
    ),
    links: [
      { link: { type: 'custom', url: '/pianos', label: 'Browse the Collection', newTab: false } },
      { link: { type: 'custom', url: '/contact', label: 'Get in Touch', newTab: false } },
    ],
  },
  // 8. CLOSING — FinalCta (light, pulls phone from Site Settings)
  {
    blockType: 'finalCta',
    eyebrow: 'Begin the Conversation',
    heading: 'Find Your\nInstrument',
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
  where: { slug: { equals: 'about' } },
  limit: 1,
  pagination: false,
})

const data = {
  title: 'About',
  slug: 'about',
  _status: 'published' as const,
  hero: { type: 'none' as const },
  layout,
}

// disableRevalidate: Next's revalidatePath() can't run outside a request context.
const context = { disableRevalidate: true }

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
  console.log(`✓ Updated About page (id: ${existing.docs[0].id})`)
} else {
  const created = await payload.create({ collection: 'pages', data, context })
  console.log(`✓ Created About page (id: ${created.id})`)
}

process.exit(0)

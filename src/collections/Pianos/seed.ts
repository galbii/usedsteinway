import type { Payload } from 'payload'

const SAMPLE_PIANOS = [
  {
    title: '2015 Steinway Model B — Satin Ebony',
    slug: 'steinway-model-b-2015-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model B',
    year: 2015,
    serialNumber: '608421',
    finish: 'Satin Ebony',
    condition: 'used' as const,
    price: 89500,
    retailPrice: 116900,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "6'10\" (211 cm)",
      length: "6'10\"",
      width: '58"',
      stringLength: 'Bass: 77.5" | Treble: 6.4"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — light bench scuffs on underside. Action: 10/10 — recently regulated. Soundboard: 10/10 — no cracks or separations. Strings: 10/10 — original, bright tone. Finish: 9.5/10 — showroom quality.',
    restorationHistory: 'Full regulation and voicing completed 2024 by Steinway-certified technician. New hammer felt installed 2022.',
    tags: [{ tag: 'featured' }, { tag: 'concert-quality' }, { tag: 'single-owner' }],
  },
  {
    title: '1998 Steinway Model D — Polished Ebony',
    slug: 'steinway-model-d-1998-concert-ebony',
    brandSlug: 'steinway',
    model: 'Model D',
    year: 1998,
    serialNumber: '519874',
    finish: 'Polished Ebony',
    condition: 'rebuilt' as const,
    price: 185000,
    retailPrice: 227000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "8'11¾\" (274 cm)",
      length: "8'11¾\"",
      width: '61.75"',
      stringLength: 'Bass: 95.5" | Treble: 8.1"',
      keys: 88,
    },
    conditionReport:
      'Full concert rebuild completed 2021 by piano technician with 30+ years experience. New Renner action, Mapes strings, Abel hammers. Cabinet refinished in polished ebony. Concert-ready.',
    restorationHistory: 'Comprehensive rebuild 2021 — new strings, hammers, dampers, action parts. Fully refinished cabinet. Concert-grade regulation.',
    tags: [{ tag: 'concert-grand' }, { tag: 'rebuilt' }, { tag: 'stage-ready' }],
  },
  {
    title: '2010 Bösendorfer 225 — Polished Ebony',
    slug: 'bosendorfer-225-2010-vienna',
    brandSlug: 'bosendorfer',
    model: '225',
    year: 2010,
    serialNumber: '47821',
    finish: 'Polished Ebony',
    condition: 'used' as const,
    price: 98000,
    retailPrice: 175000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "7'4\" (225 cm)",
      length: "7'4\"",
      width: '59"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — excellent original finish. Action: 9.5/10 — recently serviced. Soundboard: 10/10 — no cracks, superb resonance. Strings: 9/10 — original Viennese wire, warm tone.',
    tags: [{ tag: 'european' }, { tag: 'austrian' }],
  },
  {
    title: '2018 C. Bechstein B 212 — Polished White',
    slug: 'bechstein-b212-2018-white',
    brandSlug: 'bechstein',
    model: 'B 212',
    year: 2018,
    serialNumber: '203145',
    finish: 'Polished White',
    condition: 'used' as const,
    price: 72000,
    retailPrice: 118000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'11\" (212 cm)",
      length: "6'11\"",
      width: '58"',
      keys: 88,
    },
    conditionReport:
      'Stunning polished white cabinet in near-new condition. Action is precise and expressive — characteristic Bechstein touch. No marks or blemishes on the finish.',
    tags: [{ tag: 'european' }, { tag: 'german' }, { tag: 'white-piano' }],
  },
]

export async function seedPianos(payload: Payload): Promise<{ created: number; skipped: number }> {
  let created = 0
  let skipped = 0

  for (const piano of SAMPLE_PIANOS) {
    // Skip if slug already exists
    const existing = await payload.find({
      collection: 'pianos',
      where: { slug: { equals: piano.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Piano "${piano.slug}" already exists — skipping.`)
      skipped++
      continue
    }

    // Look up brand by slug
    const brandResult = await payload.find({
      collection: 'brands',
      where: { slug: { equals: piano.brandSlug } },
      limit: 1,
    })

    const brandId = brandResult.docs[0]?.id

    const { brandSlug: _b, ...pianoData } = piano

    await payload.create({
      collection: 'pianos',
      draft: true,
      data: {
        ...pianoData,
        ...(brandId ? { brand: brandId } : {}),
        _status: 'draft',
      },
    })

    payload.logger.info(`Created piano: ${piano.title}`)
    created++
  }

  return { created, skipped }
}

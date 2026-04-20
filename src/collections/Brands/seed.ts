import { getBrand, STEINWAY_MODELS } from '@/lib/piano-data'
import type { Payload } from 'payload'

type ModelSpec = {
  name: string
  slug: string
  type: 'Grand' | 'Upright' | 'Concert Grand'
  size?: string
  sizeInches?: string
  weight?: string
  stringLength?: string
  yearRange?: string
  description: string
  highlights: Array<{ text: string }>
  priceGuide: Array<{ era: string; condition: string; priceRange: string }>
  adjacentModels: Array<{ adjacentSlug: string; adjacentName: string }>
  order: number
}

// ─── BÖSENDORFER ──────────────────────────────────────────────
const BOSENDORFER_MODELS: ModelSpec[] = [
  {
    name: '214 CS',
    slug: '214-cs',
    type: 'Grand',
    size: "7'1\" (214 cm)",
    sizeInches: '85"',
    weight: '785 lbs (356 kg)',
    yearRange: '2007 – present',
    description:
      "The 214 CS (Concert Studio) is Bösendorfer's most versatile professional instrument. At 7'1\", it delivers full Viennese warmth in a size that suits large home music rooms and professional studios. Built in Vienna with Austrian spruce and uninterrupted craftsmanship traditions.",
    highlights: [
      { text: 'The ideal Bösendorfer for serious performers and institutions' },
      { text: 'Full Viennese warmth and orchestral depth in a versatile format' },
      { text: 'Austrian spruce soundboard for exceptional resonance' },
      { text: 'Outstanding value compared to new pricing ($100,000+)' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$90,000 – $115,000' },
      { era: '2010–2014', condition: 'Excellent', priceRange: '$75,000 – $92,000' },
      { era: '2007–2009', condition: 'Very Good', priceRange: '$60,000 – $80,000' },
    ],
    adjacentModels: [{ adjacentSlug: '225', adjacentName: "225 (7'4\")" }],
    order: 0,
  },
  {
    name: '225',
    slug: '225',
    type: 'Grand',
    size: "7'4\" (225 cm)",
    sizeInches: '88"',
    weight: '793 lbs (360 kg)',
    yearRange: '1964 – present',
    description:
      "The Bösendorfer 225 occupies a singular position in the piano world. At 7'4\", it delivers the full orchestra of the Viennese sound — extraordinarily warm bass, a singing midrange, and a crystalline treble that no other maker achieves. Pre-Yamaha acquisition examples (pre-2007) are especially prized.",
    highlights: [
      { text: 'The quintessential Bösendorfer for professional performance' },
      {
        text: 'Unmatched orchestral warmth — a fundamentally different character from Steinway',
      },
      { text: 'Ideal for large home music rooms and recording studios' },
      { text: 'Pre-2007 Vienna-only production examples especially prized by collectors' },
    ],
    priceGuide: [
      { era: '2010–present', condition: 'Excellent', priceRange: '$100,000 – $130,000' },
      { era: '2000–2009', condition: 'Excellent', priceRange: '$80,000 – $100,000' },
      { era: '1990–1999', condition: 'Rebuilt', priceRange: '$65,000 – $85,000' },
    ],
    adjacentModels: [{ adjacentSlug: '214-cs', adjacentName: "214 CS (7'1\")" }],
    order: 1,
  },
]

// ─── C. BECHSTEIN ─────────────────────────────────────────────
const BECHSTEIN_MODELS: ModelSpec[] = [
  {
    name: 'B 212',
    slug: 'b-212',
    type: 'Grand',
    size: "7'0\" (212 cm)",
    sizeInches: '83"',
    weight: '790 lbs (358 kg)',
    yearRange: '1985 – present',
    description:
      "The C. Bechstein B 212 is a flagship professional instrument — the model that defines Bechstein's position at the top of the piano world. At 7'0\", it delivers characteristic Bechstein clarity, analytical transparency, and extraordinary touch sensitivity.",
    highlights: [
      { text: "The pinnacle of Bechstein's professional lineup" },
      { text: 'Analytically transparent sound — ideal for complex polyphonic repertoire' },
      { text: 'Touch sensitivity unmatched by any other production instrument' },
      { text: 'German precision engineering built for 60+ years of performance' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$80,000 – $110,000' },
      { era: '2005–2014', condition: 'Excellent', priceRange: '$60,000 – $80,000' },
      { era: '1990–2004', condition: 'Very Good', priceRange: '$45,000 – $62,000' },
    ],
    adjacentModels: [],
    order: 0,
  },
]

// ─── BLÜTHNER ─────────────────────────────────────────────────
const BLUTHNER_MODELS: ModelSpec[] = [
  {
    name: 'Model 2',
    slug: 'model-2',
    type: 'Grand',
    size: "6'3\" (193 cm)",
    sizeInches: '76"',
    weight: '650 lbs (295 kg)',
    yearRange: '1900 – present',
    description:
      "The Blüthner Model 2 is the quintessential Blüthner grand — substantial enough to project the full aliquot-enriched tone, yet practical for serious home and studio use. The patented aliquot stringing adds a fourth sympathetically vibrating string in the treble register, creating harmonic warmth no other maker replicates.",
    highlights: [
      { text: 'Aliquot stringing creates harmonic richness unique to Blüthner' },
      { text: 'Warm, singing tone ideal for Romantic and Impressionist repertoire' },
      { text: 'Leipzig craftsmanship since 1853 — each instrument hand-built' },
      { text: 'Outstanding value versus comparable Steinway and Bechstein models' },
    ],
    priceGuide: [
      { era: '2010–present', condition: 'Excellent', priceRange: '$55,000 – $75,000' },
      { era: '2000–2009', condition: 'Excellent', priceRange: '$40,000 – $58,000' },
      { era: '1980–1999', condition: 'Rebuilt', priceRange: '$35,000 – $50,000' },
    ],
    adjacentModels: [],
    order: 0,
  },
]

// ─── SHIGERU KAWAI ────────────────────────────────────────────
const SHIGERU_KAWAI_MODELS: ModelSpec[] = [
  {
    name: 'SK-2',
    slug: 'sk-2',
    type: 'Grand',
    size: "5'11\" (180 cm)",
    sizeInches: '71"',
    weight: '600 lbs (272 kg)',
    yearRange: '2000 – present',
    description:
      "The Shigeru Kawai SK-2 is the entry point to the world's finest Japanese grand piano series. At 5'11\", it delivers world-class performance — Renner hammers, premium European spruce soundboard, and extraordinary craftsmanship — in a size suitable for home music rooms.",
    highlights: [
      { text: 'Renner hammers and premium European materials throughout' },
      { text: 'Japanese master craftsmanship at 40–50% of new pricing' },
      { text: 'World-class alternative to Steinway M at significant savings' },
      { text: "Kawai's legendary touch precision in the Shigeru series" },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$35,000 – $48,000' },
      { era: '2007–2014', condition: 'Excellent', priceRange: '$28,000 – $38,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'sk-3', adjacentName: "SK-3 (6'2\")" }],
    order: 0,
  },
  {
    name: 'SK-3',
    slug: 'sk-3',
    type: 'Grand',
    size: "6'2\" (188 cm)",
    sizeInches: '74"',
    weight: '638 lbs (290 kg)',
    yearRange: '2000 – present',
    description:
      "The Shigeru Kawai SK-3 provides the ideal balance between home suitability and professional performance capability. At 6'2\", it competes directly with the Steinway Model A at a considerably more accessible price point, with comparable or superior craftsmanship.",
    highlights: [
      { text: 'Direct competitor to Steinway Model A at substantially lower cost' },
      { text: 'Renner action and premium spruce soundboard' },
      { text: 'Extraordinarily musical — preferred by many professional pianists' },
      { text: 'Exceptional value in the used market' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$45,000 – $62,000' },
      { era: '2007–2014', condition: 'Excellent', priceRange: '$35,000 – $48,000' },
    ],
    adjacentModels: [
      { adjacentSlug: 'sk-2', adjacentName: "SK-2 (5'11\")" },
      { adjacentSlug: 'sk-6', adjacentName: "SK-6 (7'0\")" },
    ],
    order: 1,
  },
  {
    name: 'SK-6',
    slug: 'sk-6',
    type: 'Grand',
    size: "7'0\" (212 cm)",
    sizeInches: '83"',
    weight: '760 lbs (345 kg)',
    yearRange: '2000 – present',
    description:
      "The Shigeru Kawai SK-6 is a world-class professional instrument that challenges the finest European grands at a fraction of the price. At 7'0\", it produces concert-level authority with Renner hammers and a premium spruce soundboard.",
    highlights: [
      { text: 'Concert-level professional instrument at a fraction of European pricing' },
      { text: 'Renner hammers — the same used in Hamburg Steinway' },
      { text: 'Unparalleled value proposition in the professional market' },
      { text: 'Preferred by many concert pianists who compare it favorably to Steinway' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$65,000 – $85,000' },
      { era: '2007–2014', condition: 'Excellent', priceRange: '$50,000 – $68,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'sk-3', adjacentName: "SK-3 (6'2\")" }],
    order: 2,
  },
]

// ─── PETROF ───────────────────────────────────────────────────
const PETROF_MODELS: ModelSpec[] = [
  {
    name: 'P173 Breeze',
    slug: 'p173-breeze',
    type: 'Grand',
    size: "5'8\" (173 cm)",
    sizeInches: '68"',
    weight: '555 lbs (252 kg)',
    yearRange: '2005 – present',
    description:
      "The Petrof P173 Breeze is the ideal home grand from Central Europe's finest piano maker. At 5'8\", it delivers genuine Czech craftsmanship — Czech spruce soundboard, warm singing tone — in a size that works beautifully in most home environments.",
    highlights: [
      { text: 'Czech spruce soundboard — warm, resonant tone' },
      { text: 'Family-owned Petrof craftsmanship since 1864' },
      { text: 'European quality at a fraction of Steinway or Bechstein pricing' },
      { text: 'Ideal for serious home performers and teaching studios' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$25,000 – $35,000' },
      { era: '2005–2014', condition: 'Excellent', priceRange: '$18,000 – $28,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'p194-storm', adjacentName: "P194 Storm (6'4\")" }],
    order: 0,
  },
  {
    name: 'P194 Storm',
    slug: 'p194-storm',
    type: 'Grand',
    size: "6'4\" (194 cm)",
    sizeInches: '76"',
    weight: '640 lbs (290 kg)',
    yearRange: '2005 – present',
    description:
      "The Petrof P194 Storm is a serious professional instrument from Hradec Králové — substantial enough for recital use, refined enough for the finest home music rooms. Czech craftsmanship at its finest, with a warm singing tone that rivals instruments costing twice as much.",
    highlights: [
      { text: 'Recital-capable instrument with genuine professional specifications' },
      { text: 'Czech spruce soundboard and traditional Petrof craftsmanship' },
      { text: 'Extraordinary value for a European professional grand' },
      { text: "Petrof's own unique tone — warm, dark, and orchestral" },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$35,000 – $48,000' },
      { era: '2005–2014', condition: 'Excellent', priceRange: '$25,000 – $38,000' },
    ],
    adjacentModels: [
      { adjacentSlug: 'p173-breeze', adjacentName: "P173 Breeze (5'8\")" },
      { adjacentSlug: 'p210-pasat', adjacentName: "P210 Pasat (6'10\")" },
    ],
    order: 1,
  },
  {
    name: 'P210 Pasat',
    slug: 'p210-pasat',
    type: 'Grand',
    size: "6'10\" (210 cm)",
    sizeInches: '82"',
    weight: '695 lbs (315 kg)',
    yearRange: '2005 – present',
    description:
      "The Petrof P210 Pasat is the jewel of the Petrof grand lineup — a 6'10\" instrument that delivers concert-hall authority with distinctive warm Czech character. At its price point the Pasat offers extraordinary value for professional musicians and serious collectors.",
    highlights: [
      { text: 'Concert-level performance at European professional pricing' },
      { text: 'The finest expression of Czech piano craftsmanship' },
      { text: 'Warm, dark, orchestral tone characteristic of Central European pianos' },
      { text: 'Excellent alternative to Steinway B at substantial savings' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$48,000 – $65,000' },
      { era: '2005–2014', condition: 'Excellent', priceRange: '$35,000 – $50,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'p194-storm', adjacentName: "P194 Storm (6'4\")" }],
    order: 2,
  },
]

// ─── KAYSERBURG ───────────────────────────────────────────────
const KAYSERBURG_MODELS: ModelSpec[] = [
  {
    name: 'KA160',
    slug: 'ka160',
    type: 'Grand',
    size: "5'3\" (160 cm)",
    sizeInches: '63"',
    weight: '510 lbs (231 kg)',
    yearRange: '2010 – present',
    description:
      "The Kayserburg KA160 is Pearl River's artist-level compact grand — built with Renner actions, Sitka spruce soundboard, and Röslau strings. At 5'3\", it offers world-class components in a practical footprint, representing extraordinary value for the serious musician.",
    highlights: [
      { text: 'Renner action — the same quality found in Hamburg Steinway' },
      { text: 'Röslau strings — standard in European premium pianos' },
      { text: 'Pearl River artist-line quality at an accessible price point' },
      { text: 'Growing collector interest as quality recognition increases' },
    ],
    priceGuide: [
      { era: '2018–present', condition: 'Excellent', priceRange: '$20,000 – $28,000' },
      { era: '2010–2017', condition: 'Excellent', priceRange: '$14,000 – $22,000' },
    ],
    adjacentModels: [],
    order: 0,
  },
]

// ─── YAMAHA ───────────────────────────────────────────────────
const YAMAHA_MODELS: ModelSpec[] = [
  {
    name: 'C7',
    slug: 'c7',
    type: 'Grand',
    size: "7'6\" (227 cm)",
    sizeInches: '90"',
    weight: '828 lbs (376 kg)',
    yearRange: '1967 – present',
    description:
      "The Yamaha C7 is one of the most important professional pianos ever built — used in recording studios and concert halls worldwide. At 7'6\", it delivers Yamaha's characteristic clarity and brilliance with the power of a near-concert grand. The definitive choice for recording engineers, studio pianists, and professional performers.",
    highlights: [
      { text: 'The most recorded piano in history — studio standard worldwide' },
      { text: "Yamaha's legendary consistency and reliability" },
      { text: 'Concert-level projection and tonal clarity' },
      { text: 'Outstanding value versus comparable Steinway or Bechstein models' },
    ],
    priceGuide: [
      { era: '2010–present', condition: 'Excellent', priceRange: '$42,000 – $62,000' },
      { era: '2000–2009', condition: 'Excellent', priceRange: '$30,000 – $45,000' },
      { era: '1985–1999', condition: 'Very Good', priceRange: '$22,000 – $35,000' },
    ],
    adjacentModels: [],
    order: 0,
  },
]

// ─── WENDL & LUNG ─────────────────────────────────────────────
const WENDL_LUNG_MODELS: ModelSpec[] = [
  {
    name: 'W162',
    slug: 'w162',
    type: 'Grand',
    size: "5'4\" (162 cm)",
    sizeInches: '64"',
    weight: '515 lbs (234 kg)',
    yearRange: '1990 – present',
    description:
      "The Wendl & Lung W162 brings authentic Viennese tonal character to a compact, practical format. At 5'4\", it is ideal for apartments, smaller music rooms, and studios where the warm, lyrical Viennese sound is desired without the spatial demands of larger instruments.",
    highlights: [
      { text: 'Authentic Viennese tonal character at an accessible size' },
      { text: 'Austrian materials and craftsmanship throughout' },
      { text: 'Bösendorfer character at a fraction of the price' },
      { text: "Undervalued in the North American market — an insider's choice" },
    ],
    priceGuide: [
      { era: '2010–present', condition: 'Excellent', priceRange: '$24,000 – $35,000' },
      { era: '2000–2009', condition: 'Excellent', priceRange: '$16,000 – $26,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'w218', adjacentName: "W218 (7'2\")" }],
    order: 0,
  },
  {
    name: 'W218',
    slug: 'w218',
    type: 'Grand',
    size: "7'2\" (218 cm)",
    sizeInches: '86"',
    weight: '800 lbs (363 kg)',
    yearRange: '1990 – present',
    description:
      "The Wendl & Lung W218 is a serious professional instrument with full Viennese character. At 7'2\", it delivers the warmth and lyrical quality of the Viennese school in a size that suits large home music rooms and professional studios. Substantially undervalued compared to comparable Bösendorfer models.",
    highlights: [
      { text: 'Full Viennese character in a professional concert-capable format' },
      { text: 'Warm, lyrical tone from genuine Austrian craftsmanship' },
      { text: 'Significantly undervalued versus comparable Bösendorfer instruments' },
      { text: 'Limited production ensures individual quality attention' },
    ],
    priceGuide: [
      { era: '2010–present', condition: 'Excellent', priceRange: '$48,000 – $68,000' },
      { era: '2000–2009', condition: 'Excellent', priceRange: '$35,000 – $50,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'w162', adjacentName: "W162 (5'4\")" }],
    order: 1,
  },
]

// ─── BRODMANN ─────────────────────────────────────────────────
const BRODMANN_MODELS: ModelSpec[] = [
  {
    name: 'PE162',
    slug: 'pe162',
    type: 'Grand',
    size: "5'4\" (162 cm)",
    sizeInches: '64"',
    weight: '505 lbs (229 kg)',
    yearRange: '2003 – present',
    description:
      "The Brodmann PE162 is the entry-level grand in the Professional Edition series — designed by Austrian master craftsmen with genuine musical character. At 5'4\", it offers Viennese design heritage and a warm, responsive voice at a price accessible to advancing students and budget-conscious professionals.",
    highlights: [
      { text: 'Austrian design heritage — genuine Viennese character' },
      { text: 'Professional-quality instrument at consumer pricing' },
      { text: 'Excellent choice for advancing students and home musicians' },
      { text: 'Strong value retention for the price category' },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$15,000 – $22,000' },
      { era: '2003–2014', condition: 'Excellent', priceRange: '$10,000 – $18,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'pe187', adjacentName: "PE187 (6'2\")" }],
    order: 0,
  },
  {
    name: 'PE187',
    slug: 'pe187',
    type: 'Grand',
    size: "6'2\" (187 cm)",
    sizeInches: '74"',
    weight: '638 lbs (290 kg)',
    yearRange: '2003 – present',
    description:
      "The Brodmann PE187 is the step-up Professional Edition grand — a substantial instrument with genuine musical capability. At 6'2\", it provides the longer string scale necessary for real bass authority, making it suitable for serious home performance and teaching studios.",
    highlights: [
      { text: 'A genuine alternative to entry-level European grands' },
      { text: 'Austrian design DNA — warm, musical character' },
      { text: 'String length sufficient for real bass authority' },
      { text: "Outstanding value for a 6'2\" grand piano" },
    ],
    priceGuide: [
      { era: '2015–present', condition: 'Excellent', priceRange: '$20,000 – $30,000' },
      { era: '2003–2014', condition: 'Excellent', priceRange: '$14,000 – $22,000' },
    ],
    adjacentModels: [{ adjacentSlug: 'pe162', adjacentName: "PE162 (5'4\")" }],
    order: 1,
  },
]

// ─── SEED HELPER ──────────────────────────────────────────────
async function seedBrand(
  payload: Payload,
  brandSlug: string,
  models: ModelSpec[],
): Promise<boolean> {
  const existing = await payload.find({
    collection: 'brands',
    where: { slug: { equals: brandSlug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    payload.logger.info(`${brandSlug} already seeded — skipping.`)
    return false
  }

  const brand = getBrand(brandSlug)
  if (!brand) throw new Error(`getBrand("${brandSlug}") returned undefined`)

  await payload.create({
    collection: 'brands',
    data: {
      name: brand.name,
      slug: brand.slug,
      country: brand.country,
      founded: brand.founded,
      category: brand.category as 'steinway' | 'european' | 'shigeru-kawai' | 'other',
      tagline: brand.tagline,
      description: brand.description,
      whyBuyPreowned: brand.whyBuyPreowned.map((text) => ({ text })),
      priceRange: brand.priceRange,
      prestige: brand.prestige as 'Ultra Premium' | 'Premium' | 'Professional',
      models,
    },
  })

  payload.logger.info(`${brand.name} seeded.`)
  return true
}

// ─── MAIN EXPORT ──────────────────────────────────────────────
export async function seedAllBrands(
  payload: Payload,
): Promise<{ created: number; skipped: number }> {
  let created = 0
  let skipped = 0

  const brandSeeds: Array<{ slug: string; models: ModelSpec[] }> = [
    {
      slug: 'steinway',
      models: STEINWAY_MODELS.map((m, i) => ({
        name: m.name,
        slug: m.slug,
        type: m.type as 'Grand' | 'Upright' | 'Concert Grand',
        size: m.size,
        sizeInches: m.sizeInches,
        weight: m.weight,
        stringLength: m.stringLength,
        yearRange: m.yearRange,
        description: m.description,
        highlights: m.highlights.map((text) => ({ text })),
        priceGuide: m.priceGuide.map((p) => ({
          era: p.era,
          condition: p.condition,
          priceRange: p.priceRange,
        })),
        adjacentModels: m.adjacentModels.map((a) => ({
          adjacentSlug: a.slug,
          adjacentName: a.name,
        })),
        order: i,
      })),
    },
    { slug: 'bosendorfer', models: BOSENDORFER_MODELS },
    { slug: 'bechstein', models: BECHSTEIN_MODELS },
    { slug: 'bluthner', models: BLUTHNER_MODELS },
    { slug: 'shigeru-kawai', models: SHIGERU_KAWAI_MODELS },
    { slug: 'petrof', models: PETROF_MODELS },
    { slug: 'kayserburg', models: KAYSERBURG_MODELS },
    { slug: 'yamaha', models: YAMAHA_MODELS },
    { slug: 'wendl-lung', models: WENDL_LUNG_MODELS },
    { slug: 'brodmann', models: BRODMANN_MODELS },
  ]

  for (const { slug, models } of brandSeeds) {
    const wasCreated = await seedBrand(payload, slug, models)
    if (wasCreated) created++
    else skipped++
  }

  return { created, skipped }
}

// Backward-compat alias (referenced by existing API route)
export async function seedSteinwayBrand(payload: Payload): Promise<void> {
  await seedAllBrands(payload)
}

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Brand } from '@/payload-types'
import type { Brand as DomainBrand, PianoModel } from '@/types/piano'
import { getBrand } from '@/lib/piano-data'

export type BrandRow = {
  id: string
  name: string
  slug: string
  country: string | null
  founded: number | null
  category: string | null
  prestige: string | null
  tagline: string | null
  description: string | null
  priceRange: string | null
  accentColor: string | null
  heroImageUrl: string | null
  models: { name: string; slug: string; type: string }[]
}

/**
 * Builds the centered-hero eyebrow line shown on brand landing pages,
 * e.g. "Germany · Est. 1853 · Ultra Premium". Omits any missing piece.
 */
export function brandHeroEyebrow(brand: {
  country?: string | null
  founded?: number | null
  prestige?: string | null
}): string {
  return [brand.country, brand.founded ? `Est. ${brand.founded}` : null, brand.prestige]
    .filter(Boolean)
    .join('  ·  ')
}

function adaptBrand(doc: Brand): BrandRow {
  let heroImageUrl: string | null = null
  if (doc.heroImage && typeof doc.heroImage !== 'string') {
    heroImageUrl = doc.heroImage.url ?? doc.heroImage.thumbnailURL ?? null
  }

  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    country: doc.country ?? null,
    founded: doc.founded ?? null,
    category: doc.category ?? null,
    prestige: doc.prestige ?? null,
    tagline: doc.tagline ?? null,
    description: doc.description ?? null,
    priceRange: doc.priceRange ?? null,
    accentColor: doc.accentColor ?? null,
    heroImageUrl,
    models: (doc.models ?? [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((m) => ({ name: m.name, slug: m.slug, type: m.type })),
  }
}

export const queryBrandBySlug = cache(async (slug: string): Promise<Brand | null> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'brands',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
    depth: 1,
  })
  return result.docs[0] ?? null
})

export function adaptPayloadBrandToDomain(doc: Brand): DomainBrand {
  let heroImageUrl = ''
  if (doc.heroImage && typeof doc.heroImage !== 'string') {
    heroImageUrl = doc.heroImage.url ?? doc.heroImage.thumbnailURL ?? ''
  }
  return {
    slug: doc.slug,
    name: doc.name,
    country: doc.country ?? '',
    founded: doc.founded ?? 0,
    category: (doc.category as DomainBrand['category']) ?? 'other',
    tagline: doc.tagline ?? '',
    description: doc.description ?? '',
    whyBuyPreowned: (doc.whyBuyPreowned ?? []).map((w) => w.text),
    heroImageUrl,
    models: (doc.models ?? []).map((m) => m.name),
    priceRange: doc.priceRange ?? '',
    prestige: (doc.prestige as DomainBrand['prestige']) ?? 'Professional',
    accentColor: doc.accentColor ?? undefined,
  }
}

export function adaptPayloadBrandModels(doc: Brand): PianoModel[] {
  return (doc.models ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((m) => ({
      slug: m.slug,
      brandSlug: doc.slug,
      name: m.name,
      type: m.type as PianoModel['type'],
      size: m.size ?? '',
      sizeInches: m.sizeInches ?? '',
      weight: m.weight ?? '',
      stringLength: m.stringLength ?? '',
      yearRange: m.yearRange ?? '',
      description: m.description,
      highlights: (m.highlights ?? []).map((h) => h.text),
      priceGuide: (m.priceGuide ?? []).map((p) => ({
        era: p.era,
        condition: p.condition,
        priceRange: p.priceRange,
      })),
      adjacentModels: (m.adjacentModels ?? []).map((a) => ({
        slug: a.adjacentSlug,
        name: a.adjacentName,
      })),
      imageUrl: typeof m.image === 'object' && m.image?.url ? m.image.url : '',
    }))
}

export const queryModelFromBrand = cache(
  async (brandSlug: string, modelSlug: string): Promise<PianoModel | null> => {
    const brandDoc = await queryBrandBySlug(brandSlug)
    if (!brandDoc?.models) return null
    const modelDoc = brandDoc.models.find((m) => m.slug === modelSlug)
    if (!modelDoc) return null
    return {
      slug: modelDoc.slug,
      brandSlug,
      name: modelDoc.name,
      type: modelDoc.type as PianoModel['type'],
      size: modelDoc.size ?? '',
      sizeInches: modelDoc.sizeInches ?? '',
      weight: modelDoc.weight ?? '',
      stringLength: modelDoc.stringLength ?? '',
      yearRange: modelDoc.yearRange ?? '',
      description: modelDoc.description,
      highlights: (modelDoc.highlights ?? []).map((h) => h.text),
      priceGuide: (modelDoc.priceGuide ?? []).map((p) => ({
        era: p.era,
        condition: p.condition,
        priceRange: p.priceRange,
      })),
      adjacentModels: (modelDoc.adjacentModels ?? []).map((a) => ({
        slug: a.adjacentSlug,
        name: a.adjacentName,
      })),
      imageUrl:
        typeof modelDoc.image === 'object' && modelDoc.image?.url ? modelDoc.image.url : '',
    }
  },
)

// Field-level merge for a single model: hardcoded model spec is the baseline,
// any value filled in on the CMS model overrides it. Mirrors the brand merge so
// a sparsely-populated CMS model (e.g. missing stringLength/yearRange/priceGuide)
// still renders complete specs from the hardcoded fallback.
function mergeModel(base: PianoModel, cms: PianoModel): PianoModel {
  return {
    slug: base.slug,
    brandSlug: cms.brandSlug || base.brandSlug,
    name: cms.name || base.name,
    type: cms.type || base.type,
    size: cms.size || base.size,
    sizeInches: cms.sizeInches || base.sizeInches,
    weight: cms.weight || base.weight,
    stringLength: cms.stringLength || base.stringLength,
    yearRange: cms.yearRange || base.yearRange,
    description: cms.description || base.description,
    highlights: cms.highlights.length ? cms.highlights : base.highlights,
    priceGuide: cms.priceGuide.length ? cms.priceGuide : base.priceGuide,
    adjacentModels: cms.adjacentModels.length ? cms.adjacentModels : base.adjacentModels,
    imageUrl: cms.imageUrl || base.imageUrl,
  }
}

/**
 * Model detail page data with field-level fallback to hardcoded specs.
 *
 * - CMS model present + hardcoded fallback present → field-level merge (CMS wins
 *   per non-empty field).
 * - Only one present → that one.
 * - Neither → null.
 */
export const getModelPageData = cache(
  async (
    brandSlug: string,
    modelSlug: string,
    fallbackModels: PianoModel[] = [],
  ): Promise<PianoModel | null> => {
    const cms = await queryModelFromBrand(brandSlug, modelSlug)
    const base = fallbackModels.find((m) => m.slug === modelSlug) ?? null
    if (cms && base) return mergeModel(base, cms)
    return cms ?? base
  },
)

// Field-level merge: hardcoded brand copy is the baseline; any field actually
// filled in on the CMS document overrides it. Reads raw doc fields (not the
// defaulted adapter output) so blank CMS fields fall through to hardcoded copy
// rather than clobbering it with adapter defaults.
function mergeBrandFromDoc(base: DomainBrand, doc: Brand): DomainBrand {
  let cmsHeroImageUrl: string | null = null
  if (doc.heroImage && typeof doc.heroImage !== 'string') {
    cmsHeroImageUrl = doc.heroImage.url ?? doc.heroImage.thumbnailURL ?? null
  }

  return {
    slug: base.slug,
    name: doc.name || base.name,
    country: doc.country || base.country,
    founded: doc.founded || base.founded,
    category: (doc.category as DomainBrand['category']) || base.category,
    tagline: doc.tagline || base.tagline,
    description: doc.description || base.description,
    whyBuyPreowned: doc.whyBuyPreowned?.length
      ? doc.whyBuyPreowned.map((w) => w.text)
      : base.whyBuyPreowned,
    heroImageUrl: cmsHeroImageUrl || base.heroImageUrl,
    models: doc.models?.length ? doc.models.map((m) => m.name) : base.models,
    priceRange: doc.priceRange || base.priceRange,
    prestige: (doc.prestige as DomainBrand['prestige']) || base.prestige,
    accentColor: doc.accentColor || base.accentColor,
  }
}

/**
 * Brand listing page data with field-level fallback to hardcoded copy.
 *
 * - Brand identity: hardcoded baseline (`getBrand`) overridden field-by-field
 *   by any value filled in on the CMS brand document.
 * - Models grid: CMS models when the document has any, otherwise `fallbackModels`.
 * - Missing document: fully hardcoded baseline.
 */
export const getBrandPageData = cache(
  async (
    brandSlug: string,
    fallbackModels: PianoModel[] = [],
  ): Promise<{ brand: DomainBrand | null; models: PianoModel[] }> => {
    const base = getBrand(brandSlug) ?? null
    const doc = await queryBrandBySlug(brandSlug)

    if (!doc) {
      return { brand: base, models: fallbackModels }
    }

    const brand = base ? mergeBrandFromDoc(base, doc) : adaptPayloadBrandToDomain(doc)
    const cmsModels = adaptPayloadBrandModels(doc)
    const models = cmsModels.length > 0 ? cmsModels : fallbackModels

    return { brand, models }
  },
)

export const queryBrands = cache(async (): Promise<BrandRow[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'brands',
    limit: 50,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    sort: 'name',
  })

  return result.docs.map(adaptBrand)
})

import type { Field } from 'payload'
import { Brands } from '@/collections/Brands'
import { serializeFields, type EditorFieldSchema } from './editorSchema'

// Fields excluded from on-page editing:
// - `slug` drives routing/static params — changing it from the frontend would
//   break the very page you're on. Edit it in full admin if ever needed.
// - `models` is edited from the individual model pages, not the brand page.
const BRAND_EXCLUDED = new Set(['slug', 'models'])
const MODEL_EXCLUDED = new Set(['slug'])

// Brand-level identity fields (tagline, description, whyBuyPreowned, heroImage,
// etc.) — derived from the live Brands collection config so new fields appear
// automatically, matching the blocks-registry single-source-of-truth pattern.
export function brandEditFieldSchemas(): EditorFieldSchema[] {
  return serializeFields(Brands.fields).filter((f) => !BRAND_EXCLUDED.has(f.name))
}

function modelArrayFields(): Field[] {
  for (const field of Brands.fields) {
    if (field.type === 'array' && field.name === 'models') return field.fields
  }
  return []
}

// The sub-fields of a single entry in the brand's `models[]` array — specs,
// description, highlights, priceGuide, adjacentModels, image, etc.
export function modelEditFieldSchemas(): EditorFieldSchema[] {
  return serializeFields(modelArrayFields()).filter((f) => !MODEL_EXCLUDED.has(f.name))
}

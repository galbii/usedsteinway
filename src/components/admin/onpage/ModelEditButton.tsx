'use client'
import { useRef } from 'react'
import { DocumentEditButton } from './DocumentEditButton'
import { pickEditableValues, type EditorFieldSchema } from './editorSchema'
import { fetchBrandBySlug, patchBrandModels, type BrandDoc } from './brandEditClient'

type ModelRow = NonNullable<BrandDoc['models']>[number]

export function ModelEditButton({
  brandSlug,
  modelSlug,
  modelName,
  fieldSchemas,
}: {
  brandSlug: string
  modelSlug: string
  modelName: string
  fieldSchemas: EditorFieldSchema[]
}) {
  // The model is one entry in the brand's models[] array, so saving means
  // replacing that entry and PATCHing the whole array back. Hold the loaded
  // doc id + array between load and save.
  const state = useRef<{ docId: string; models: ModelRow[] } | null>(null)

  const load = async () => {
    const doc = await fetchBrandBySlug(brandSlug)
    if (!doc) return null
    const models: ModelRow[] = Array.isArray(doc.models) ? doc.models : []
    state.current = { docId: doc.id, models }
    const model = models.find((m) => m.slug === modelSlug)
    if (!model) return null
    return pickEditableValues(model, fieldSchemas)
  }

  const save = async (value: Record<string, unknown>) => {
    if (!state.current) throw new Error('Model not loaded')
    const { docId, models } = state.current
    const index = models.findIndex((m) => m.slug === modelSlug)
    if (index === -1) throw new Error('Model not found')
    const nextModels = models.map((m, i) => (i === index ? { ...m, ...value } : m))
    await patchBrandModels(docId, nextModels)
  }

  return (
    <DocumentEditButton
      buttonLabel="Edit Model"
      eyebrow="Edit Model"
      title={modelName}
      fieldSchemas={fieldSchemas}
      load={load}
      save={save}
      adminHref="/admin/collections/brands"
    />
  )
}

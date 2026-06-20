'use client'
import { useRef } from 'react'
import { DocumentEditButton } from './DocumentEditButton'
import { pickEditableValues, type EditorFieldSchema } from './editorSchema'
import { fetchBrandBySlug, patchBrand } from './brandEditClient'

export function BrandEditButton({
  brandSlug,
  brandName,
  fieldSchemas,
}: {
  brandSlug: string
  brandName: string
  fieldSchemas: EditorFieldSchema[]
}) {
  const docId = useRef<string | null>(null)

  const load = async () => {
    const doc = await fetchBrandBySlug(brandSlug)
    if (!doc) return null
    docId.current = doc.id
    return pickEditableValues(doc, fieldSchemas)
  }

  const save = async (value: Record<string, unknown>) => {
    if (!docId.current) throw new Error('Brand not loaded')
    await patchBrand(docId.current, value)
  }

  return (
    <DocumentEditButton
      buttonLabel="Edit Brand"
      eyebrow="Edit Brand"
      title={brandName}
      fieldSchemas={fieldSchemas}
      load={load}
      save={save}
      adminHref="/admin/collections/brands"
    />
  )
}

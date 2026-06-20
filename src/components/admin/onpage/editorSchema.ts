import type { Block, Field } from 'payload'

// A serializable description of a single editable field, derived from a Payload
// Field config. This strips everything non-serializable (functions, custom
// components, the Lexical editor instance) so it can be handed from a Server
// Component to the client drawer. The renderer switches on `kind`.
export type EditorFieldSchema =
  | {
      kind: 'text' | 'textarea' | 'number' | 'checkbox'
      name: string
      label: string
      description?: string
      required?: boolean
    }
  | {
      kind: 'select'
      name: string
      label: string
      description?: string
      required?: boolean
      options: { label: string; value: string }[]
    }
  | {
      kind: 'group'
      name: string
      label: string
      description?: string
      fields: EditorFieldSchema[]
    }
  | {
      kind: 'array'
      name: string
      label: string
      description?: string
      minRows?: number
      maxRows?: number
      fields: EditorFieldSchema[]
    }
  | {
      kind: 'upload'
      name: string
      label: string
      description?: string
      required?: boolean
      mimeFilter?: string
    }
  | {
      kind: 'richText'
      name: string
      label: string
      description?: string
    }
  | {
      // Any field type the editor doesn't render yet (relationship, date, etc.).
      // The renderer shows a "edit in full admin" note instead of dropping it.
      kind: 'unsupported'
      name: string
      label: string
      fieldType: string
    }

export interface EditorBlockSchema {
  slug: string
  label: string
  fields: EditorFieldSchema[]
}

function prettify(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim()
}

function labelOf(field: { name?: string; label?: unknown }): string {
  if (typeof field.label === 'string') return field.label
  return prettify(field.name ?? '')
}

function descriptionOf(field: { admin?: { description?: unknown } }): string | undefined {
  const d = field.admin?.description
  return typeof d === 'string' ? d : undefined
}

function normalizeOptions(
  options: unknown,
): { label: string; value: string }[] {
  if (!Array.isArray(options)) return []
  return options
    .map((opt) => {
      if (typeof opt === 'string') return { label: prettify(opt), value: opt }
      if (opt && typeof opt === 'object' && 'value' in opt) {
        const o = opt as { label?: unknown; value: unknown }
        const value = String(o.value)
        return { label: typeof o.label === 'string' ? o.label : prettify(value), value }
      }
      return null
    })
    .filter((o): o is { label: string; value: string } => o !== null)
}

function mimeFilterOf(field: { filterOptions?: unknown }): string | undefined {
  const fo = field.filterOptions
  if (fo && typeof fo === 'object' && 'mimeType' in fo) {
    const contains = (fo as { mimeType?: { contains?: unknown } }).mimeType?.contains
    if (typeof contains === 'string') return `${contains}/`
  }
  return undefined
}

// Walks a Payload field and emits zero or more editor field schemas. Returns an
// array so presentational/layout field types (row, collapsible, tabs) can be
// flattened — their child fields are hoisted to the parent level.
function serializeField(field: Field): EditorFieldSchema[] {
  switch (field.type) {
    case 'row':
    case 'collapsible':
      return field.fields.flatMap(serializeField)

    case 'tabs':
      return field.tabs.flatMap((tab) =>
        'fields' in tab ? tab.fields.flatMap(serializeField) : [],
      )

    case 'ui':
      return []

    case 'text':
    case 'textarea':
    case 'number':
    case 'checkbox':
      if (!field.name) return []
      return [
        {
          kind: field.type,
          name: field.name,
          label: labelOf(field),
          description: descriptionOf(field),
          required: field.required,
        },
      ]

    case 'select':
      return [
        {
          kind: 'select',
          name: field.name,
          label: labelOf(field),
          description: descriptionOf(field),
          required: field.required,
          options: normalizeOptions(field.options),
        },
      ]

    case 'group':
      // Unnamed groups add no data key — hoist their children like a row.
      if (!('name' in field) || !field.name) {
        return field.fields.flatMap(serializeField)
      }
      return [
        {
          kind: 'group',
          name: field.name,
          label: labelOf(field),
          description: descriptionOf(field),
          fields: field.fields.flatMap(serializeField),
        },
      ]

    case 'array':
      return [
        {
          kind: 'array',
          name: field.name,
          label: labelOf(field),
          description: descriptionOf(field),
          minRows: field.minRows,
          maxRows: field.maxRows,
          fields: field.fields.flatMap(serializeField),
        },
      ]

    case 'upload':
      return [
        {
          kind: 'upload',
          name: field.name,
          label: labelOf(field),
          description: descriptionOf(field),
          required: field.required,
          mimeFilter: mimeFilterOf(field),
        },
      ]

    case 'richText':
      return [
        {
          kind: 'richText',
          name: field.name,
          label: labelOf(field),
          description: descriptionOf(field),
        },
      ]

    default: {
      const f = field as { type: string; name?: string; label?: unknown }
      const name = f.name ?? f.type
      return [
        {
          kind: 'unsupported',
          name,
          label: typeof f.label === 'string' ? f.label : prettify(name),
          fieldType: f.type,
        },
      ]
    }
  }
}

function blockLabel(block: Block): string {
  const singular = block.labels?.singular
  if (typeof singular === 'string') return singular
  return prettify(block.slug)
}

export function serializeBlock(block: Block): EditorBlockSchema {
  return {
    slug: block.slug,
    label: blockLabel(block),
    fields: block.fields.flatMap(serializeField),
  }
}

export function serializeBlocks(blocks: Block[]): EditorBlockSchema[] {
  return blocks.map(serializeBlock)
}

// Serialize an arbitrary set of Payload fields (e.g. a collection's top-level
// fields, or an array field's sub-fields) into editor schemas. Layout-only types
// (row/collapsible/tabs) are flattened, so the result is a flat editable list.
export function serializeFields(fields: Field[]): EditorFieldSchema[] {
  return fields.flatMap(serializeField)
}

// Pull just the editable values named in `schemas` out of a loaded document (or
// array row). Used to seed the document drawer from a depth=0 fetch — fields not
// in the schema (slug, ids, etc.) are left untouched so they round-trip on save.
export function pickEditableValues(
  source: Record<string, unknown> | null | undefined,
  schemas: EditorFieldSchema[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const field of schemas) out[field.name] = source?.[field.name]
  return out
}

// Produces an empty value object for a freshly-added block instance, seeded with
// the blockType discriminator Payload requires.
export function defaultValueForBlock(
  schema: EditorBlockSchema,
): Record<string, unknown> {
  return { blockType: schema.slug, ...buildDefaults(schema.fields) }
}

// Empty value object for a set of fields — used for new array rows and groups.
export function buildDefaults(fields: EditorFieldSchema[]): Record<string, unknown> {
  const value: Record<string, unknown> = {}
  for (const field of fields) Object.assign(value, defaultValueForField(field))
  return value
}

function defaultValueForField(field: EditorFieldSchema): Record<string, unknown> {
  switch (field.kind) {
    case 'text':
    case 'textarea':
      return { [field.name]: '' }
    case 'number':
      return {}
    case 'checkbox':
      return { [field.name]: false }
    case 'select':
      return { [field.name]: field.options[0]?.value ?? '' }
    case 'upload':
    case 'richText':
      return { [field.name]: null }
    case 'array':
      return { [field.name]: [] }
    case 'group': {
      const inner: Record<string, unknown> = {}
      for (const sub of field.fields) Object.assign(inner, defaultValueForField(sub))
      return { [field.name]: inner }
    }
    case 'unsupported':
      return {}
  }
}

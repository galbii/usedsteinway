'use client'
import { useState } from 'react'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import type { SerializedEditorState } from 'lexical'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'
import type { EditorFieldSchema } from './editorSchema'
import { buildDefaults } from './editorSchema'
import { Field, CheckField, INPUT_CLASS, SELECT_TRIGGER_CLASS } from './fields'
import { MediaField, type MediaFieldValue } from './MediaField'
import { RichTextField } from './RichTextField'

type Obj = Record<string, unknown>

export function BlockFieldRenderer({
  fields,
  value,
  onChange,
}: {
  fields: EditorFieldSchema[]
  value: Obj
  onChange: (next: Obj) => void
}) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FieldInput
          key={field.name}
          schema={field}
          value={value[field.name]}
          onChange={(v) => onChange({ ...value, [field.name]: v })}
        />
      ))}
    </div>
  )
}

function FieldInput({
  schema,
  value,
  onChange,
}: {
  schema: EditorFieldSchema
  value: unknown
  onChange: (v: unknown) => void
}) {
  switch (schema.kind) {
    case 'text':
      return (
        <Field label={schema.label} hint={schema.description}>
          <Input
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={INPUT_CLASS}
          />
        </Field>
      )

    case 'textarea':
      return (
        <Field label={schema.label} hint={schema.description}>
          <Textarea
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="bg-white border-piano-stone/25 text-piano-black text-sm placeholder:text-piano-stone/40 focus-visible:border-piano-burgundy focus-visible:ring-1 focus-visible:ring-piano-burgundy/15 focus-visible:ring-offset-0"
          />
        </Field>
      )

    case 'number':
      return (
        <Field label={schema.label} hint={schema.description}>
          <Input
            type="number"
            value={value === undefined || value === null ? '' : String(value)}
            onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
            className={INPUT_CLASS}
          />
        </Field>
      )

    case 'checkbox':
      return (
        <CheckField
          id={schema.name}
          label={schema.label}
          checked={Boolean(value)}
          onChange={onChange}
        />
      )

    case 'select':
      return (
        <Field label={schema.label} hint={schema.description}>
          <Select value={(value as string) ?? ''} onValueChange={onChange}>
            <SelectTrigger className={SELECT_TRIGGER_CLASS}>
              <SelectValue placeholder="— select —" />
            </SelectTrigger>
            <SelectContent>
              {schema.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )

    case 'upload':
      return (
        <Field label={schema.label} hint={schema.description}>
          <MediaField
            value={(value as MediaFieldValue) ?? null}
            onChange={onChange}
            label={schema.label}
            mimeFilter={schema.mimeFilter}
          />
        </Field>
      )

    case 'richText':
      return (
        <Field label={schema.label} hint={schema.description}>
          <RichTextField
            value={(value as SerializedEditorState | null) ?? null}
            onChange={onChange}
          />
        </Field>
      )

    case 'group':
      return (
        <GroupInput
          schema={schema}
          value={(value as Obj) ?? {}}
          onChange={onChange}
        />
      )

    case 'array':
      return (
        <ArrayInput
          schema={schema}
          value={Array.isArray(value) ? (value as Obj[]) : []}
          onChange={onChange}
        />
      )

    case 'unsupported':
      return (
        <Field label={schema.label}>
          <p className="text-[11px] text-piano-stone/55 leading-snug border border-dashed border-piano-stone/25 bg-white/50 px-3 py-2">
            This field type ({schema.fieldType}) isn&apos;t editable here yet — use{' '}
            <span className="text-piano-burgundy">Open Full Admin</span> to edit it.
          </p>
        </Field>
      )
  }
}

function GroupInput({
  schema,
  value,
  onChange,
}: {
  schema: Extract<EditorFieldSchema, { kind: 'group' }>
  value: Obj
  onChange: (v: Obj) => void
}) {
  return (
    <div className="border-l-2 border-piano-burgundy/15 pl-4 space-y-3">
      <p className="font-display text-[9px] tracking-[0.5em] uppercase text-piano-stone/50">
        {schema.label}
      </p>
      <BlockFieldRenderer fields={schema.fields} value={value} onChange={onChange} />
    </div>
  )
}

function ArrayInput({
  schema,
  value,
  onChange,
}: {
  schema: Extract<EditorFieldSchema, { kind: 'array' }>
  value: Obj[]
  onChange: (v: Obj[]) => void
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const atMax = schema.maxRows !== undefined && value.length >= schema.maxRows

  const addRow = () => {
    if (atMax) return
    onChange([...value, buildDefaults(schema.fields)])
  }

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateRow = (index: number, next: Obj) => {
    onChange(value.map((row, i) => (i === index ? next : row)))
  }

  const handleDrop = (target: number) => {
    if (dragIndex === null || dragIndex === target) {
      setDragIndex(null)
      return
    }
    const next = [...value]
    const [moved] = next.splice(dragIndex, 1)
    if (moved) next.splice(target, 0, moved)
    onChange(next)
    setDragIndex(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone/60">
            {schema.label}
          </p>
          {schema.description && (
            <p className="text-[11px] text-piano-stone/55 leading-snug mt-1">
              {schema.description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={addRow}
          disabled={atMax}
          className="shrink-0 flex items-center gap-1.5 bg-piano-black text-piano-cream px-3 py-1.5 font-display text-[9px] tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors disabled:opacity-40"
        >
          <Plus size={12} />
          Add
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-[11px] text-piano-stone/50 border border-dashed border-piano-stone/25 bg-white/40 px-3 py-3 text-center">
          No items yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {value.map((row, i) => (
            <li
              key={i}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => setDragIndex(null)}
              className={cn(
                'bg-white border border-piano-stone/15 p-3',
                dragIndex === i ? 'opacity-50' : 'opacity-100',
              )}
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-1 text-piano-stone/35 cursor-grab active:cursor-grabbing shrink-0"
                  aria-hidden="true"
                >
                  <GripVertical size={15} />
                </span>
                <div className="flex-1 min-w-0">
                  <BlockFieldRenderer
                    fields={schema.fields}
                    value={row}
                    onChange={(next) => updateRow(i, next)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="shrink-0 text-piano-stone/40 hover:text-piano-burgundy p-1.5 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

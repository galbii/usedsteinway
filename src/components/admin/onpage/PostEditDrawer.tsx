'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, GripVertical, Loader2, Plus, Trash2, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { EditorBlockSchema, EditorFieldSchema } from './editorSchema'
import { defaultValueForBlock, pickEditableValues } from './editorSchema'
import { BlockFieldRenderer } from './BlockFieldRenderer'
import { fetchPost, patchPost, type PostBlock } from './postEditClient'

type Obj = Record<string, unknown>
type Tab = 'details' | 'content'

interface PostEditDrawerProps {
  postId: string
  postTitle: string
  /** Scalar field schemas for the Details tab. */
  fieldSchemas: EditorFieldSchema[]
  /** Block schemas for the Content (layout) tab. */
  blockSchemas: EditorBlockSchema[]
  open: boolean
  onClose: () => void
}

/**
 * Tabbed on-page editor for a single Post. Combines the schema-driven scalar
 * fields (Details) with the layout block editor (Content) and saves both in one
 * publish-live PATCH — mirroring the DocumentEditDrawer + PageEditDrawer pattern.
 */
export function PostEditDrawer({
  postId,
  postTitle,
  fieldSchemas,
  blockSchemas,
  open,
  onClose,
}: PostEditDrawerProps) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('details')
  const [details, setDetails] = useState<Obj | null>(null)
  const [blocks, setBlocks] = useState<PostBlock[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [showPicker, setShowPicker] = useState(false)

  // Load the post at depth=0 so every relation/upload is a plain id that
  // round-trips on save. fieldSchemas/blockSchemas are stable server props, so
  // the effect depends only on open/postId (matching PageEditDrawer).
  useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setSaved(false)
    fetchPost(postId)
      .then((doc) => {
        if (cancelled) return
        if (!doc) {
          setError('Could not find this post to edit.')
          return
        }
        setDetails(pickEditableValues(doc, fieldSchemas))
        setBlocks(Array.isArray(doc.layout) ? doc.layout : [])
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Load failed')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, postId])

  const schemaFor = (blockType?: string) => blockSchemas.find((s) => s.slug === blockType)

  const updateBlock = (index: number, next: PostBlock) => {
    setBlocks((prev) => prev?.map((b, i) => (i === index ? next : b)) ?? prev)
  }

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev?.filter((_, i) => i !== index) ?? prev)
    setExpanded(null)
  }

  const addBlock = (schema: EditorBlockSchema) => {
    setBlocks((prev) => {
      const next = [...(prev ?? []), defaultValueForBlock(schema) as PostBlock]
      setExpanded(next.length - 1)
      return next
    })
    setShowPicker(false)
  }

  const handleDrop = (target: number) => {
    if (dragIndex === null || dragIndex === target) {
      setDragIndex(null)
      return
    }
    setBlocks((prev) => {
      if (!prev) return prev
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      if (moved) next.splice(target, 0, moved)
      return next
    })
    setExpanded(null)
    setDragIndex(null)
  }

  const handleSave = async () => {
    if (!details || !blocks) return
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      await patchPost(postId, { ...details, layout: blocks, _status: 'published' })
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Edit post"
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[560px] max-w-[100vw] bg-piano-cream shadow-[-8px_0_48px_rgba(0,0,0,0.12)] flex flex-col transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-black/[0.07] shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="h-px w-5 bg-piano-burgundy/70" />
              <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-burgundy">
                Edit Post
              </p>
            </div>
            <p
              className="font-cormorant text-piano-black font-light truncate"
              style={{ fontSize: '1.25rem' }}
            >
              {postTitle || 'Untitled'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 text-piano-stone/40 hover:text-piano-black transition-colors p-1"
            aria-label="Close edit panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 border-b border-black/[0.07]">
          {(['details', 'content'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 px-4 py-3 font-display text-[10px] tracking-[0.4em] uppercase transition-colors',
                tab === t
                  ? 'text-piano-burgundy border-b-2 border-piano-burgundy'
                  : 'text-piano-stone/50 hover:text-piano-black border-b-2 border-transparent',
              )}
            >
              {t === 'details' ? 'Details' : 'Content'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center py-16 text-piano-stone/50">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}

          {/* Details tab */}
          {!loading && details && tab === 'details' && (
            <BlockFieldRenderer fields={fieldSchemas} value={details} onChange={setDetails} />
          )}

          {/* Content (layout blocks) tab */}
          {!loading && blocks && tab === 'content' && (
            <div className="space-y-3">
              {blocks.length === 0 && (
                <p className="text-sm text-piano-stone/55 text-center py-8">
                  This post has no content blocks yet. Add one below.
                </p>
              )}

              {blocks.map((block, i) => {
                const schema = schemaFor(block.blockType)
                const isOpen = expanded === i
                return (
                  <div
                    key={block.id ?? `new-${i}`}
                    draggable={!isOpen}
                    onDragStart={() => setDragIndex(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(i)}
                    onDragEnd={() => setDragIndex(null)}
                    className={cn(
                      'border border-piano-stone/15 bg-white/60',
                      dragIndex === i ? 'opacity-50' : 'opacity-100',
                    )}
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5">
                      <span
                        className="text-piano-stone/35 cursor-grab active:cursor-grabbing shrink-0"
                        aria-hidden="true"
                      >
                        <GripVertical size={15} />
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : i)}
                        className="flex-1 flex items-center justify-between min-w-0 text-left"
                      >
                        <span className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-black truncate">
                          {schema?.label ?? block.blockType ?? 'Unknown block'}
                        </span>
                        <ChevronDown
                          size={15}
                          className={cn(
                            'text-piano-stone/40 transition-transform shrink-0',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(i)}
                        className="shrink-0 text-piano-stone/40 hover:text-piano-burgundy p-1 transition-colors"
                        aria-label="Remove block"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 border-t border-piano-stone/10">
                        {schema ? (
                          <BlockFieldRenderer
                            fields={schema.fields}
                            value={block}
                            onChange={(next) => updateBlock(i, next as PostBlock)}
                          />
                        ) : (
                          <p className="text-[11px] text-piano-stone/55 py-2">
                            No editor schema for this block type.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Add block */}
              <div className="pt-2">
                {showPicker ? (
                  <div className="border border-piano-stone/15 bg-white">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-piano-stone/10">
                      <p className="font-display text-[9px] tracking-[0.4em] uppercase text-piano-burgundy/80">
                        Add a block
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowPicker(false)}
                        className="text-piano-stone/40 hover:text-piano-black p-0.5"
                        aria-label="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                      {blockSchemas.map((schema) => (
                        <li key={schema.slug}>
                          <button
                            type="button"
                            onClick={() => addBlock(schema)}
                            className="w-full text-left px-3 py-2.5 text-sm text-piano-black hover:bg-piano-cream transition-colors border-b border-piano-stone/5"
                          >
                            {schema.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPicker(true)}
                    className="w-full flex items-center justify-center gap-2 border border-dashed border-piano-stone/30 py-3 text-piano-stone/60 hover:border-piano-burgundy hover:text-piano-burgundy transition-colors font-display text-[10px] tracking-[0.4em] uppercase"
                  >
                    <Plus size={14} />
                    Add Block
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-black/[0.07] shrink-0 space-y-3">
          {error && <p className="text-[11px] font-display tracking-wide text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || saved || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-piano-black text-piano-cream px-6 py-3.5 font-display text-xs tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors duration-200 disabled:opacity-60"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {saved ? 'Published!' : saving ? 'Publishing…' : 'Publish Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 border border-piano-stone/20 text-piano-stone/60 font-display text-xs tracking-[0.3em] uppercase hover:border-piano-burgundy hover:text-piano-burgundy transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          <a
            href={`/admin/collections/posts/${postId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-piano-stone/35 font-display text-[10px] tracking-[0.35em] uppercase hover:text-piano-burgundy transition-colors"
          >
            Open Full Admin →
          </a>
        </div>
      </aside>
    </>
  )
}

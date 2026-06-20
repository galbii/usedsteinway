'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { EditorFieldSchema } from './editorSchema'
import { BlockFieldRenderer } from './BlockFieldRenderer'

type DocValue = Record<string, unknown>

interface DocumentEditDrawerProps {
  open: boolean
  onClose: () => void
  eyebrow: string
  title: string
  fieldSchemas: EditorFieldSchema[]
  /** Fetch the document's current editable values (or null if not found). */
  load: () => Promise<DocValue | null>
  /** Persist the edited values. Should throw with a readable message on failure. */
  save: (value: DocValue) => Promise<void>
  adminHref?: string
}

export function DocumentEditDrawer({
  open,
  onClose,
  eyebrow,
  title,
  fieldSchemas,
  load,
  save,
  adminHref,
}: DocumentEditDrawerProps) {
  const router = useRouter()
  const [value, setValue] = useState<DocValue | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Keep latest callbacks in refs so the load effect can depend only on `open`
  // (the closures change identity every render in the wrapper components).
  const loadRef = useRef(load)
  loadRef.current = load
  const saveRef = useRef(save)
  saveRef.current = save

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setSaved(false)
    loadRef
      .current()
      .then((doc) => {
        if (cancelled) return
        if (doc === null) setError('Could not find this document to edit.')
        setValue(doc ?? {})
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
  }, [open])

  const handleSave = async () => {
    if (!value) return
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      await saveRef.current(value)
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
        aria-label={eyebrow}
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
                {eyebrow}
              </p>
            </div>
            <p
              className="font-cormorant text-piano-black font-light truncate"
              style={{ fontSize: '1.25rem' }}
            >
              {title || 'Untitled'}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center py-16 text-piano-stone/50">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}

          {!loading && value && (
            <BlockFieldRenderer fields={fieldSchemas} value={value} onChange={setValue} />
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
              {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 border border-piano-stone/20 text-piano-stone/60 font-display text-xs tracking-[0.3em] uppercase hover:border-piano-burgundy hover:text-piano-burgundy transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          {adminHref && (
            <a
              href={adminHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-piano-stone/35 font-display text-[10px] tracking-[0.35em] uppercase hover:text-piano-burgundy transition-colors"
            >
              Open Full Admin →
            </a>
          )}
        </div>
      </aside>
    </>
  )
}

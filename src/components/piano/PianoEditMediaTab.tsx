'use client'
import { useCallback, useEffect, useState } from 'react'
import { GripVertical, Loader2, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMediaManager } from '@/components/admin/media-manager/MediaManagerProvider'
import type { MediaItem } from '@/components/admin/media-manager/types'

interface Props {
  pianoId: string
}

// Each row in the piano.images array is `{ image: <media doc | id> }`.
// We track the populated MediaItem so we can render thumbnails without an extra fetch.
type ImageRow = { id: string; media: MediaItem }

export function PianoEditMediaTab({ pianoId }: Props) {
  const router = useRouter()
  const { openModal } = useMediaManager()
  const [rows, setRows] = useState<ImageRow[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dirty, setDirty] = useState(false)

  // Load current images on mount
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/pianos/${pianoId}?depth=1`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Load failed'))))
      .then((doc: { images?: Array<{ id?: string; image: MediaItem | string }> }) => {
        if (cancelled) return
        const next: ImageRow[] = (doc.images ?? [])
          .map((row, i) => {
            if (typeof row.image === 'string') return null
            return {
              id: row.id ?? `${row.image.id}-${i}`,
              media: row.image,
            }
          })
          .filter((r): r is ImageRow => r !== null)
        setRows(next)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [pianoId])

  const handleAdd = useCallback(() => {
    openModal({
      mode: 'select',
      allowMultiple: true,
      filterMimeType: 'image/',
      onSelectMultiple: (items) => {
        setRows((prev) => {
          const existing = prev ?? []
          const existingIds = new Set(existing.map((r) => r.media.id))
          const additions = items
            .filter((m) => !existingIds.has(m.id))
            .map((m, i) => ({ id: `${m.id}-new-${i}`, media: m }))
          return [...existing, ...additions]
        })
        setDirty(true)
      },
    })
  }, [openModal])

  const handleDelete = useCallback((index: number) => {
    setRows((prev) => prev?.filter((_, i) => i !== index) ?? null)
    setDirty(true)
  }, [])

  const handleDrop = useCallback(
    (target: number) => {
      if (dragIndex === null || dragIndex === target) {
        setDragIndex(null)
        return
      }
      setRows((prev) => {
        if (!prev) return prev
        const next = [...prev]
        const [moved] = next.splice(dragIndex, 1)
        if (moved) next.splice(target, 0, moved)
        return next
      })
      setDirty(true)
      setDragIndex(null)
    },
    [dragIndex],
  )

  const handleSave = useCallback(async () => {
    if (!rows) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/pianos/${pianoId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: rows.map((r) => ({ image: r.media.id })),
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          errors?: { message?: string }[]
        }
        throw new Error(data?.errors?.[0]?.message ?? `Save failed (${res.status})`)
      }
      setDirty(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }, [pianoId, rows, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-piano-stone/50">
        <Loader2 className="animate-spin" size={20} />
      </div>
    )
  }

  if (error && !rows) {
    return (
      <div className="text-center py-12 text-sm text-piano-burgundy">
        Failed to load images: {error}
      </div>
    )
  }

  const list = rows ?? []

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-burgundy/80">
            Photos
          </p>
          <p className="text-[11px] text-piano-stone/55 mt-1">
            {list.length} {list.length === 1 ? 'photo' : 'photos'} · drag to reorder · first is
            the thumbnail
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-piano-black text-piano-cream px-3.5 py-2 font-display text-[10px] tracking-[0.35em] uppercase hover:bg-piano-burgundy transition-colors"
        >
          <Plus size={13} />
          Add Photos
        </button>
      </div>

      {list.length === 0 ? (
        <div className="border border-dashed border-piano-stone/25 bg-white/50 py-12 px-6 text-center">
          <p className="text-sm text-piano-stone/60 mb-4">No photos yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-piano-burgundy font-display text-[10px] tracking-[0.4em] uppercase hover:underline"
          >
            Open Media Library
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((row, i) => (
            <li
              key={row.id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => setDragIndex(null)}
              className={`flex items-center gap-3 bg-white border border-piano-stone/15 px-2 py-2 transition-opacity ${
                dragIndex === i ? 'opacity-50' : 'opacity-100'
              } cursor-grab active:cursor-grabbing`}
            >
              <GripVertical size={16} className="text-piano-stone/40 shrink-0" />
              <div className="relative w-14 h-14 shrink-0 bg-piano-linen overflow-hidden">
                {row.media.url && (
                  <Image
                    src={row.media.url}
                    alt={row.media.alt || row.media.filename}
                    fill
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-piano-black truncate">
                  {row.media.alt || row.media.filename}
                </p>
                <p className="text-[10px] font-display tracking-[0.3em] uppercase text-piano-stone/45 mt-0.5">
                  {i === 0 ? 'Thumbnail · ' : ''}
                  {row.media.width && row.media.height
                    ? `${row.media.width}×${row.media.height}`
                    : row.media.mimeType}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(i)}
                className="shrink-0 text-piano-stone/40 hover:text-piano-burgundy p-2 transition-colors"
                aria-label="Remove photo"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-[11px] font-display tracking-wide text-red-600">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty || saving}
          className="flex-1 flex items-center justify-center gap-2 bg-piano-black text-piano-cream px-6 py-3 font-display text-xs tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving && <Loader2 size={13} className="animate-spin" />}
          {saving ? 'Saving…' : dirty ? 'Save Photos' : 'No Changes'}
        </button>
      </div>
    </div>
  )
}

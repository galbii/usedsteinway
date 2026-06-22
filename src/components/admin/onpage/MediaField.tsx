'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, RefreshCw, X } from 'lucide-react'
import { useMediaManager } from '@/components/admin/media-manager/MediaManagerProvider'
import type { MediaItem } from '@/components/admin/media-manager/types'

export type MediaFieldValue =
  | string
  | { id: string; url?: string | null; alt?: string | null }
  | null

export interface MediaFieldProps {
  value: MediaFieldValue
  onChange: (id: string | null) => void
  label?: string
  mimeFilter?: string
}

function resolveDisplay(
  value: MediaFieldValue,
  justPicked: MediaItem | null,
): { url?: string | null; alt?: string | null; id: string } | null {
  if (justPicked && (value === justPicked.id || (typeof value === 'object' && value?.id === justPicked.id))) {
    return { url: justPicked.url, alt: justPicked.alt, id: justPicked.id }
  }
  if (typeof value === 'string') return { id: value }
  if (value && typeof value === 'object') return { url: value.url, alt: value.alt, id: value.id }
  return null
}

export function MediaField({ value, onChange, label, mimeFilter }: MediaFieldProps) {
  const { openModal } = useMediaManager()
  const [justPicked, setJustPicked] = useState<MediaItem | null>(null)
  const [resolved, setResolved] = useState<{ id: string; url: string | null; alt: string | null } | null>(null)

  const display = resolveDisplay(value, justPicked)
  const displayId = display?.id ?? null
  const displayUrl = display?.url ?? null

  // The on-page editor loads documents at depth=0, so an already-set image
  // arrives as a bare id with no url. Fetch the media doc once to show its
  // current thumbnail instead of an opaque "id:" chip. Picking a new image
  // (justPicked) already carries a url, so this only runs for pre-existing ones.
  useEffect(() => {
    if (!displayId || displayUrl) return
    let cancelled = false
    fetch(`/api/media/${displayId}?depth=0`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((doc: { url?: string | null; thumbnailURL?: string | null; alt?: string | null } | null) => {
        if (cancelled || !doc) return
        setResolved({ id: displayId, url: doc.url ?? doc.thumbnailURL ?? null, alt: doc.alt ?? null })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [displayId, displayUrl])

  const thumbUrl = displayUrl ?? (resolved?.id === displayId ? resolved.url : null)
  const thumbAlt = display?.alt ?? (resolved?.id === displayId ? resolved.alt : null)

  const browse = () => {
    openModal({
      mode: 'select',
      filterMimeType: mimeFilter,
      onSelect: (media) => {
        setJustPicked(media)
        onChange(media.id)
      },
    })
  }

  const clear = () => {
    setJustPicked(null)
    onChange(null)
  }

  if (!display) {
    return (
      <button
        type="button"
        onClick={browse}
        className="w-full flex flex-col items-center justify-center gap-2 border border-dashed border-piano-stone/30 bg-white/50 py-7 px-4 text-piano-stone/60 hover:border-piano-burgundy hover:text-piano-burgundy transition-colors"
      >
        <ImageIcon size={20} />
        <span className="font-display text-[10px] tracking-[0.4em] uppercase">
          {label ? `Add ${label}` : 'Browse Media Library'}
        </span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3 bg-white border border-piano-stone/15 p-2">
      <div className="relative w-16 h-16 shrink-0 bg-piano-linen overflow-hidden">
        {thumbUrl ? (
          <Image
            src={thumbUrl}
            alt={thumbAlt || ''}
            fill
            className="object-cover"
            sizes="64px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-piano-stone/40">
            <ImageIcon size={18} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-piano-black truncate">{thumbAlt || 'Image selected'}</p>
        {!thumbUrl && (
          <p className="text-[10px] font-display tracking-[0.25em] uppercase text-piano-stone/40 mt-0.5 truncate">
            id: {display.id}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={browse}
        className="shrink-0 text-piano-stone/50 hover:text-piano-burgundy p-2 transition-colors"
        aria-label="Replace image"
        title="Replace"
      >
        <RefreshCw size={15} />
      </button>
      <button
        type="button"
        onClick={clear}
        className="shrink-0 text-piano-stone/50 hover:text-piano-burgundy p-2 transition-colors"
        aria-label="Remove image"
        title="Remove"
      >
        <X size={16} />
      </button>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { PianoEditDrawer } from './PianoEditDrawer'
import { MediaManagerProvider } from '@/components/admin/media-manager/MediaManagerProvider'
import { MediaManagerModal } from '@/components/admin/media-manager/MediaManagerModal'
import type { Piano } from '@/types/piano'

export function PianoEditButton({ piano }: { piano: Piano }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/users/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setIsAdmin(Boolean(data?.user))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  if (!isAdmin) return null

  return (
    <MediaManagerProvider>
      <button
        onClick={() => setEditOpen(true)}
        className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 bg-piano-black text-piano-cream px-4 py-2.5 font-display text-[10px] tracking-[0.35em] uppercase shadow-lg hover:bg-piano-burgundy transition-colors duration-200"
        aria-label="Edit this piano"
      >
        <Pencil size={13} />
        Edit
      </button>
      <PianoEditDrawer
        piano={piano}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <MediaManagerModal />
    </MediaManagerProvider>
  )
}

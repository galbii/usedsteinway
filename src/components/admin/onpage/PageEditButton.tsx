'use client'
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { MediaManagerProvider } from '@/components/admin/media-manager/MediaManagerProvider'
import { MediaManagerModal } from '@/components/admin/media-manager/MediaManagerModal'
import { PageEditDrawer } from './PageEditDrawer'
import type { EditorBlockSchema } from './editorSchema'

export function PageEditButton({
  pageId,
  blockSchemas,
}: {
  pageId: string
  blockSchemas: EditorBlockSchema[]
}) {
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
        aria-label="Edit this page"
      >
        <Pencil size={13} />
        Edit Page
      </button>
      <PageEditDrawer
        pageId={pageId}
        blockSchemas={blockSchemas}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <MediaManagerModal />
    </MediaManagerProvider>
  )
}

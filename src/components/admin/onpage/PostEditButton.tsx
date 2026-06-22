'use client'
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { MediaManagerProvider } from '@/components/admin/media-manager/MediaManagerProvider'
import { MediaManagerModal } from '@/components/admin/media-manager/MediaManagerModal'
import { PostEditDrawer } from './PostEditDrawer'
import type { EditorBlockSchema, EditorFieldSchema } from './editorSchema'

/**
 * Admin-gated floating edit button + tabbed drawer for a single Post.
 * Visibility is client-gated by `/api/users/me`; the real enforcement is the
 * Posts collection access control on the PATCH the drawer performs.
 */
export function PostEditButton({
  postId,
  postTitle,
  fieldSchemas,
  blockSchemas,
}: {
  postId: string
  postTitle: string
  fieldSchemas: EditorFieldSchema[]
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
        aria-label="Edit this post"
      >
        <Pencil size={13} />
        Edit Post
      </button>
      <PostEditDrawer
        postId={postId}
        postTitle={postTitle}
        fieldSchemas={fieldSchemas}
        blockSchemas={blockSchemas}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <MediaManagerModal />
    </MediaManagerProvider>
  )
}

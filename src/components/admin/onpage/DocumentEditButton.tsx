'use client'
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { MediaManagerProvider } from '@/components/admin/media-manager/MediaManagerProvider'
import { MediaManagerModal } from '@/components/admin/media-manager/MediaManagerModal'
import { DocumentEditDrawer } from './DocumentEditDrawer'
import type { EditorFieldSchema } from './editorSchema'

type DocValue = Record<string, unknown>

interface DocumentEditButtonProps {
  buttonLabel: string
  eyebrow: string
  title: string
  fieldSchemas: EditorFieldSchema[]
  load: () => Promise<DocValue | null>
  save: (value: DocValue) => Promise<void>
  adminHref?: string
}

/**
 * Admin-gated floating edit button + drawer for a single collection document.
 * Visibility is client-gated by `/api/users/me`; the real enforcement is the
 * collection's access control on the PATCH the wrapper performs.
 */
export function DocumentEditButton({
  buttonLabel,
  eyebrow,
  title,
  fieldSchemas,
  load,
  save,
  adminHref,
}: DocumentEditButtonProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [open, setOpen] = useState(false)

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
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 bg-piano-black text-piano-cream px-4 py-2.5 font-display text-[10px] tracking-[0.35em] uppercase shadow-lg hover:bg-piano-burgundy transition-colors duration-200"
        aria-label={buttonLabel}
      >
        <Pencil size={13} />
        {buttonLabel}
      </button>
      <DocumentEditDrawer
        open={open}
        onClose={() => setOpen(false)}
        eyebrow={eyebrow}
        title={title}
        fieldSchemas={fieldSchemas}
        load={load}
        save={save}
        adminHref={adminHref}
      />
      <MediaManagerModal />
    </MediaManagerProvider>
  )
}

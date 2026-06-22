// Client-side helpers for fetching/patching a post document from the on-page
// edit drawer. Loaded at depth=0 so relationships/uploads come back as plain
// ids that round-trip on save without normalization (same approach as the
// brand and page drawers).

export type PostBlock = Record<string, unknown> & { blockType?: string; id?: string }

export type PostDoc = Record<string, unknown> & {
  id: string
  title?: string
  layout?: PostBlock[]
}

export async function fetchPost(id: string): Promise<PostDoc | null> {
  const res = await fetch(`/api/posts/${id}?depth=0`, { credentials: 'include' })
  if (!res.ok) throw new Error(`Load failed (${res.status})`)
  return (await res.json()) as PostDoc
}

export async function patchPost(id: string, value: Record<string, unknown>): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  })
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { errors?: { message?: string }[] }
    throw new Error(data?.errors?.[0]?.message ?? `Save failed (${res.status})`)
  }
}

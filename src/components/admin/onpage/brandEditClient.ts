// Client-side helpers for fetching/patching a brand document from the on-page
// edit buttons. Loaded at depth=0 so relationships/uploads come back as plain
// ids that round-trip on save without normalization.

export type BrandDoc = Record<string, unknown> & {
  id: string
  slug?: string
  models?: (Record<string, unknown> & { slug?: string })[]
}

export async function fetchBrandBySlug(slug: string): Promise<BrandDoc | null> {
  const res = await fetch(
    `/api/brands?where[slug][equals]=${encodeURIComponent(slug)}&depth=0&limit=1`,
    { credentials: 'include' },
  )
  if (!res.ok) throw new Error(`Load failed (${res.status})`)
  const data = (await res.json()) as { docs?: BrandDoc[] }
  return data.docs?.[0] ?? null
}

async function patch(id: string, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`/api/brands/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { errors?: { message?: string }[] }
    throw new Error(data?.errors?.[0]?.message ?? `Save failed (${res.status})`)
  }
}

export async function patchBrand(id: string, value: Record<string, unknown>): Promise<void> {
  await patch(id, value)
}

export async function patchBrandModels(
  id: string,
  models: Record<string, unknown>[],
): Promise<void> {
  await patch(id, { models })
}

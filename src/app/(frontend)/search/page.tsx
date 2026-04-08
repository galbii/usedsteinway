import type { Metadata } from 'next'
import PageClient from './page.client'
import { SearchPageClient } from '@/components/piano/SearchPageClient'
import { queryAvailablePianos, querySearchPianos } from '@/lib/payload/pianos'

type Args = {
  searchParams: Promise<{ q?: string }>
}

export const metadata: Metadata = {
  title: 'Search Pianos | UsedSteinways.com',
  description:
    'Search our curated inventory of pre-owned Steinway, Bösendorfer, Shigeru Kawai, and world-class pianos by brand, model, size, finish, year, or condition.',
}

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise

  // When a text query is present, run a targeted Payload search for faster
  // initial results. Otherwise fetch the full available inventory. Either way
  // the client component performs real-time client-side filtering on top.
  const pianos = query?.trim()
    ? await querySearchPianos(query.trim())
    : await queryAvailablePianos()

  return (
    <div>
      <PageClient />
      <SearchPageClient pianos={pianos} initialQuery={query ?? ''} />
    </div>
  )
}

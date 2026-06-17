import type { Search } from '@/payload-types'

const collectionPrefixMap: Record<string, string> = {
  posts: '/posts',
  testimonials: '/testimonials',
  pianos: '/pianos',
  pages: '',
}

export function getCollectionPrefix(relationTo: string): string {
  return collectionPrefixMap[relationTo] ?? ''
}

export function getSearchResultHref(result: Pick<Search, 'doc' | 'slug'>): string {
  if (!result.slug) return '/'
  return `${getCollectionPrefix(result.doc.relationTo)}/${result.slug}`
}

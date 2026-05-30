export interface Piano {
  id: string
  slug: string
  title: string
  brand: string
  brandSlug: string
  model: string
  modelSlug?: string
  year: number
  serialNumber?: string
  price: number | null
  priceDisplay: string
  showPrice?: boolean
  /** Optional: original new retail price — shown on detail page for value contrast */
  retailPrice?: number
  condition: 'new' | 'used' | 'reconditioned' | 'rebuilt' | 'rebuilt-partial' | 'work-in-progress' | 'display' | 'Excellent' | 'Very Good' | 'Good' | 'Fair'
  finish: string
  /** Showroom location — 'Natick', 'Burlington', 'Incoming', or undefined */
  location?: string | null
  isAvailable: boolean
  isFeatured: boolean
  priority: number
  imageUrls: string[]
  stockImageUrl?: string
  videoUrl?: string
  description: string
  /** Lexical rich text state from CMS — rendered by RichText component on detail page */
  richTextDescription?: import('@payloadcms/richtext-lexical').DefaultTypedEditorState
  conditionReport?: string
  specs: Record<string, string>
  tags: string[]
  /** Admin-set SEO overrides from the CMS meta tab */
  meta?: {
    title?: string
    description?: string
    imageUrl?: string
  }
}

export type CategorySlug = 'steinway' | 'european' | 'shigeru-kawai' | 'other'

export interface Brand {
  slug: string
  name: string
  country: string
  founded: number
  category: CategorySlug
  tagline: string
  description: string
  whyBuyPreowned: string[]
  heroImageUrl: string
  models: string[]
  priceRange: string
  prestige: 'Ultra Premium' | 'Premium' | 'Professional'
  accentColor?: string
}

export interface PianoModel {
  slug: string
  brandSlug: string
  name: string
  type: 'Grand' | 'Upright' | 'Concert Grand'
  size: string
  sizeInches: string
  weight: string
  stringLength: string
  yearRange: string
  description: string
  highlights: string[]
  priceGuide: {
    era: string
    condition: string
    priceRange: string
  }[]
  adjacentModels: { slug: string; name: string }[]
  imageUrl: string
}

export interface Guide {
  slug: string
  title: string
  description: string
  readTime: string
  category: 'Buying Guide' | 'Comparison' | 'Maintenance' | 'Education'
  imageUrl: string
  publishedDate: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  piano: string
  quote: string
  rating: number
  date: string
}

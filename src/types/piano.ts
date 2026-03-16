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
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair'
  finish: string
  size: string
  isAvailable: boolean
  isFeatured: boolean
  imageUrls: string[]
  videoUrl?: string
  description: string
  provenance?: string
  restorationHistory?: string
  conditionReport?: string
  specs: Record<string, string>
  tags: string[]
}

export interface Brand {
  slug: string
  name: string
  country: string
  founded: number
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

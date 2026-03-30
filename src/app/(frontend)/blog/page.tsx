import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Piano Journal | UsedSteinways.com',
  description: 'News, insights, and stories from the world of fine pre-owned pianos.',
}

const BLOG_POSTS = [
  {
    slug: 'why-1970s-steinways-are-so-good',
    title: "Why 1970s Steinways Are Among the Best Ever Made",
    excerpt:
      "Contrary to popular belief, the Hamburg factory's output in the 1970s represents some of the finest piano building in Steinway's history.",
    date: 'February 28, 2026',
    readTime: '6 min',
    imageUrl:
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80',
    category: 'Expertise',
  },
  {
    slug: 'record-sale-bosendorfer-imperial',
    title: "A Bösendorfer Imperial at Auction: What It Tells Us About the Market",
    excerpt:
      'A recent auction result for a 1968 Bösendorfer Imperial reveals how the premium piano market is evolving.',
    date: 'February 14, 2026',
    readTime: '4 min',
    imageUrl:
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=80',
    category: 'Market',
  },
  {
    slug: 'piano-in-the-living-room',
    title: "The Piano as Furniture: Why the Room Matters as Much as the Instrument",
    excerpt:
      "Acoustics, aesthetics, humidity — how your room affects your piano's voice and longevity.",
    date: 'January 30, 2026',
    readTime: '5 min',
    imageUrl:
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80',
    category: 'Lifestyle',
  },
  {
    slug: 'shigeru-kawai-underrated',
    title: 'The Most Underrated Piano in the World',
    excerpt:
      'Shigeru Kawai builds instruments that compete with anything from Hamburg or Vienna. Why does almost nobody talk about them?',
    date: 'January 18, 2026',
    readTime: '7 min',
    imageUrl:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    category: 'Expertise',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-piano-gold mb-5">
            From the Showroom
          </p>
          <h1
            className="text-5xl md:text-6xl font-medium text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Piano Journal
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            News, market insights, and stories from three decades in the world of fine pianos.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Featured post */}
          <Link
            href={`/blog/${BLOG_POSTS[0]?.slug}`}
            className="group grid lg:grid-cols-2 gap-0 bg-white border border-gray-100 hover:border-piano-gold/30 hover:shadow-lg transition-all duration-300 mb-8 overflow-hidden"
          >
            {BLOG_POSTS[0]?.imageUrl && (
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
                <Image
                  src={BLOG_POSTS[0].imageUrl}
                  alt={BLOG_POSTS[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="p-10 flex flex-col justify-center">
              <span className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">
                {BLOG_POSTS[0]?.category}
              </span>
              <h2
                className="text-3xl font-medium text-piano-black mb-4 leading-snug group-hover:text-piano-burgundy transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {BLOG_POSTS[0]?.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{BLOG_POSTS[0]?.excerpt}</p>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>{BLOG_POSTS[0]?.date}</span>
                <span>·</span>
                <span>{BLOG_POSTS[0]?.readTime} read</span>
              </div>
            </div>
          </Link>

          {/* Remaining posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-gray-100 hover:border-piano-gold/30 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {post.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <span className="font-display text-xs tracking-[0.15em] uppercase text-piano-burgundy mb-3 block">
                    {post.category}
                  </span>
                  <h3
                    className="text-base font-medium text-piano-black mb-3 leading-snug group-hover:text-piano-burgundy transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-gray-400 text-xs mt-4">
                    {post.date} · {post.readTime} read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}

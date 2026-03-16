import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'
import { ConditionBadge } from './ConditionBadge'

interface PianoDetailV1Props {
  piano: Piano
}

export function PianoDetailV1({ piano }: PianoDetailV1Props) {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 font-display tracking-wide">
            <Link href="/pianos" className="hover:text-gray-900">Pianos</Link>
            <span>/</span>
            <Link href={`/pianos/${piano.brandSlug}`} className="hover:text-gray-900">{piano.brand}</Link>
            <span>/</span>
            <span className="text-gray-900">{piano.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              {piano.imageUrls[0] && (
                <Image
                  src={piano.imageUrls[0]}
                  alt={piano.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            {/* Thumbnail strip */}
            {piano.imageUrls.length > 1 && (
              <div className="flex gap-2 mt-3">
                {piano.imageUrls.slice(0, 5).map((url, i) => (
                  <div key={i} className="relative w-16 h-12 bg-gray-100 shrink-0 overflow-hidden">
                    <Image src={url} alt={`${piano.title} ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 font-display tracking-widest uppercase mb-1">{piano.brand}</p>
                <h1 className="text-2xl font-semibold text-gray-900">{piano.title}</h1>
              </div>
              <ConditionBadge condition={piano.condition} />
            </div>

            <p className="text-2xl font-bold text-gray-900 mb-6">{piano.priceDisplay}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{piano.description}</p>

            {/* Specs */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 font-display tracking-widest uppercase mb-3">Specifications</h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(piano.specs).map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-500 w-1/2">{key}</td>
                      <td className="py-2.5 font-medium text-gray-900">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <Link
                href={`/contact?subject=${encodeURIComponent(`Schedule Viewing: ${piano.title}`)}`}
                className="w-full text-center bg-gray-900 text-white py-3 font-display text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
              >
                Schedule a Viewing
              </Link>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Request Details: ${piano.title}`)}`}
                className="w-full text-center border border-gray-300 text-gray-900 py-3 font-display text-sm tracking-widest uppercase hover:border-gray-900 transition-colors"
              >
                Request More Details
              </Link>
              <a
                href="tel:+16035550123"
                className="w-full text-center border border-gray-300 text-gray-700 py-3 font-display text-sm tracking-widest uppercase hover:border-gray-900 transition-colors"
              >
                Call (603) 555-0123
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

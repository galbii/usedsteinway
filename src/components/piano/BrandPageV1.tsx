/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import type { Brand, Piano, PianoModel } from '@/types/piano'
import { PianoCard } from './PianoCard'

interface BrandPageV1Props {
  brand: Brand
  pianos: Piano[]
  models?: PianoModel[]
}

export function BrandPageV1({ brand, pianos, models: _models }: BrandPageV1Props) {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-sm text-gray-500 font-display tracking-widest uppercase mb-2">
            {brand.country} · Est. {brand.founded}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">{brand.name}</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">{brand.tagline}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* About */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About {brand.name}</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">{brand.description}</p>
        </section>

        {/* Why Buy Pre-Owned */}
        <section className="mb-12 bg-gray-50 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Why Buy a Pre-Owned {brand.name}?
          </h2>
          <ul className="space-y-3">
            {brand.whyBuyPreowned.map((reason, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-gray-400 mt-0.5">—</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Current Inventory */}
        {pianos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Available {brand.name} Pianos ({pianos.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pianos.map((piano) => (
                <PianoCard key={piano.id} piano={piano} />
              ))}
            </div>
          </section>
        )}

        {pianos.length === 0 && (
          <section className="mb-12 py-12 border border-gray-200 text-center">
            <p className="text-gray-500 mb-4">
              No {brand.name} pianos currently in inventory.
            </p>
            <p className="text-sm text-gray-400">
              We source instruments continuously. Contact us to be notified.
            </p>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-gray-200 pt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Inquire About {brand.name} Pianos
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl">
            Tell us what you're looking for and we'll help you find the right instrument.
          </p>
          <Link
            href={`/contact?subject=${encodeURIComponent(`Inquiry About ${brand.name} Pianos`)}`}
            className="inline-block bg-gray-900 text-white px-8 py-3 font-display text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

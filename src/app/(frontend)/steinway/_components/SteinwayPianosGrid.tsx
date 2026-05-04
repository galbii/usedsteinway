import Link from 'next/link'
import { PianoCard } from '@/components/piano/PianoCard'
import type { Piano } from '@/types/piano'

interface Props {
  pianos: Piano[]
}

export function SteinwayPianosGrid({ pianos }: Props) {
  return (
    <section className="bg-piano-cream py-28 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
              Available Now
            </span>
            <h2
              className="font-cormorant font-light text-piano-black leading-none"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5rem)' }}
            >
              Current Inventory
            </h2>
          </div>
          {pianos.length > 0 && (
            <p className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone">
              {pianos.length} instrument{pianos.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {pianos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pianos.map((piano) => (
              <PianoCard key={piano.id} piano={piano} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-piano-linen">
            <p className="text-piano-stone text-lg mb-4">
              No Steinway pianos in current inventory.
            </p>
            <p className="text-piano-stone/60 text-base max-w-md mx-auto leading-relaxed mb-10">
              We source and curate instruments continuously. Contact us and we will notify you
              when a Steinway becomes available.
            </p>
            <Link
              href="/contact?subject=Waiting%20List%3A%20Steinway"
              className="inline-block px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase border border-piano-gold text-piano-gold hover:bg-piano-gold hover:text-piano-black transition-colors"
            >
              Join the Waiting List
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

import Link from 'next/link'
import type { PianoModel } from '@/types/piano'

interface Props {
  models: PianoModel[]
}

export function SteinwayModelsGrid({ models }: Props) {
  if (models.length === 0) return null

  return (
    <section className="bg-piano-burgundy py-28 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
            The Collection
          </span>
          <h2
            className="font-cormorant font-light text-piano-cream leading-none"
            style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5rem)' }}
          >
            Steinway Models
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-piano-gold/10">
          {models.map((model) => (
            <Link
              key={model.slug}
              href={`/steinway/${model.slug}`}
              className="group relative flex flex-col p-8 bg-piano-burgundy hover:bg-piano-black/30 transition-colors duration-300"
            >
              {/* Left accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-piano-gold transition-all duration-300 ease-out" />

              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-gold block mb-4">
                {model.type} · {model.size}
              </span>

              <h3
                className="font-cormorant font-light text-white leading-none mb-4"
                style={{ fontSize: 'clamp(2rem, 2.5vw, 2.8rem)' }}
              >
                {model.name}
              </h3>

              <p className="text-piano-cream/70 text-sm leading-relaxed flex-1 line-clamp-3 mb-6">
                {model.description}
              </p>

              {model.yearRange && (
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-cream/40 mb-5">
                  {model.yearRange}
                </p>
              )}

              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-gold group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                View Model
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

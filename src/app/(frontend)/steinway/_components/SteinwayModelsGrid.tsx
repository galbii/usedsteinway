import Link from 'next/link'
import type { PianoModel } from '@/types/piano'

interface Props {
  models: PianoModel[]
}

export function SteinwayModelsGrid({ models }: Props) {
  if (models.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-piano-cream py-28 px-8">
      {/* Soft glass backdrop — gives the frosted cards something to blur against */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-piano-burgundy/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-[24rem] w-[24rem] rounded-full bg-piano-gold/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-[22rem] w-[22rem] rounded-full bg-piano-burgundy/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
            The Collection
          </span>
          <h2
            className="font-cormorant font-light text-piano-black leading-none"
            style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5rem)' }}
          >
            Steinway Models
          </h2>
        </div>

        {/* Grid — centered flex-wrap so a partial last row sits in the middle */}
        <div className="flex flex-wrap justify-center gap-6">
          {models.map((model) => (
            <Link
              key={model.slug}
              href={`/steinway/${model.slug}`}
              className="group relative flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)] p-8 rounded-2xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(89,25,42,0.07)] transition-all duration-300 hover:bg-piano-burgundy/85 hover:border-piano-burgundy/40 hover:shadow-[0_20px_50px_rgba(89,25,42,0.28)]"
            >
              {/* Left accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-piano-gold transition-all duration-300 ease-out" />

              <span className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-gold block mb-4">
                {model.type} · {model.size}
              </span>

              <h3
                className="font-cormorant font-light text-piano-black group-hover:text-white leading-none mb-4 transition-colors duration-300"
                style={{ fontSize: 'clamp(2rem, 2.5vw, 2.8rem)' }}
              >
                {model.name}
              </h3>

              <p className="text-piano-stone group-hover:text-piano-cream/70 text-sm leading-relaxed flex-1 line-clamp-3 mb-6 transition-colors duration-300">
                {model.description}
              </p>

              {model.yearRange && (
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone/60 group-hover:text-piano-cream/40 mb-5 transition-colors duration-300">
                  {model.yearRange}
                </p>
              )}

              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone group-hover:text-piano-gold transition-colors duration-300 inline-flex items-center gap-1.5">
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

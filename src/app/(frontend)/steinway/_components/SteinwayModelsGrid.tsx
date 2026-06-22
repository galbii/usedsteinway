import type { PianoModel } from '@/types/piano'
import { SteinwayModelCard } from './SteinwayModelCard'

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
            <SteinwayModelCard key={model.slug} model={model} />
          ))}
        </div>
      </div>
    </section>
  )
}

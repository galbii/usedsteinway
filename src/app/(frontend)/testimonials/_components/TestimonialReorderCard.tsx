import type { Testimonial } from '@/payload-types'

interface TestimonialReorderCardProps {
  testimonial: Testimonial
}

export function TestimonialReorderCard({ testimonial }: TestimonialReorderCardProps) {
  return (
    <>
      {testimonial.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className="font-display uppercase block"
            style={{
              fontSize: '9px',
              letterSpacing: '0.42em',
              padding: '0.35rem 0.7rem',
              backgroundColor: 'hsl(40, 72%, 52%)',
              color: 'hsl(25, 6%, 9%)',
              fontWeight: 600,
            }}
          >
            Featured
          </span>
        </div>
      )}

      <div style={{ padding: '3rem 1.5rem 1.4rem' }}>
        <h3
          className="font-cormorant font-light text-piano-black line-clamp-3"
          style={{ fontSize: '1.3rem', lineHeight: 1.2, minHeight: '4.2em' }}
        >
          {testimonial.title}
        </h3>

        <div
          className="mt-4 pt-4"
          style={{ borderTop: '1px solid hsl(36 18% 90%)' }}
        >
          <p className="font-medium text-piano-black text-sm">
            {testimonial.customerName}
          </p>
          {testimonial.location && (
            <p className="text-piano-stone/70 text-xs mt-0.5">{testimonial.location}</p>
          )}
          <p
            className="mt-2 font-display"
            style={{
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'hsl(25, 4%, 50%)',
            }}
          >
            Saved priority: #{testimonial.priority ?? '—'}
          </p>
        </div>
      </div>
    </>
  )
}

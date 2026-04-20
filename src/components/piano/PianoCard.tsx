import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Piano } from '@/types/piano'

interface PianoCardProps {
  piano: Piano
  variant?: 'default' | 'featured'
  className?: string
}

export function PianoCard({ piano, variant = 'default', className }: PianoCardProps) {
  // stockImageUrl is the primary source (brand reference photo); fall back to actual media
  const primaryImage = piano.stockImageUrl || piano.imageUrls[0]

  if (variant === 'featured') {
    return <FeaturedCard piano={piano} primaryImage={primaryImage} className={className} />
  }
  return <DefaultCard piano={piano} primaryImage={primaryImage} className={className} />
}

// ── Default (catalog grid) card ──────────────────────────────────────────────

function DefaultCard({
  piano,
  primaryImage,
  className,
}: {
  piano: Piano
  primaryImage: string | undefined
  className?: string
}) {
  return (
    <>
      <style>{`
        .pcard {
          box-shadow: 0 1px 4px hsla(25, 6%, 9%, 0.05), 0 2px 12px hsla(25, 6%, 9%, 0.04);
          transition: box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.2, 0, 0, 1);
        }
        .pcard:hover {
          box-shadow: 0 8px 48px hsla(25, 6%, 9%, 0.13), 0 2px 10px hsla(25, 6%, 9%, 0.07);
          transform: translateY(-4px);
        }
        .pcard-img { transition: transform 0.85s cubic-bezier(0.2, 0, 0, 1); }
        .pcard:hover .pcard-img { transform: scale(1.045); }

        .pcard-brand-bar {
          display: inline-block;
          width: 0;
          height: 1px;
          background: hsl(40 72% 52%);
          vertical-align: middle;
          margin-right: 0;
          transition: width 0.32s ease, margin-right 0.32s ease;
        }
        .pcard:hover .pcard-brand-bar { width: 20px; margin-right: 8px; }

        .pcard-arrow {
          transition: transform 0.25s ease, color 0.25s ease;
          display: inline-block;
        }
        .pcard:hover .pcard-arrow {
          transform: translateX(4px);
          color: hsl(40 72% 52%);
        }
      `}</style>

      <Link
        href={`/pianos/${piano.slug}`}
        className={cn('pcard block bg-white overflow-hidden', className)}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-piano-black" style={{ aspectRatio: '3 / 2' }}>
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={piano.title}
              fill
              className="pcard-img object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-end"
              style={{ padding: '1.5rem', background: 'hsl(25 6% 11%)' }}
            >
              <p
                className="font-display uppercase"
                style={{ fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.18)' }}
              >
                Photography forthcoming
              </p>
            </div>
          )}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 45%)' }}
          />

          {/* Year */}
          {piano.year > 0 && (
            <div className="absolute top-4 right-4">
              <span
                className="font-display tabular-nums"
                style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.55)' }}
              >
                {piano.year}
              </span>
            </div>
          )}

          {/* Featured ribbon — top-left corner */}
          {piano.isFeatured && (
            <div className="absolute top-0 left-0">
              <span
                className="font-display uppercase block"
                style={{
                  fontSize:        '10px',
                  letterSpacing:   '0.5em',
                  padding:         '0.45rem 1.1rem',
                  backgroundColor: 'hsl(40 72% 52%)',
                  color:           'hsl(25 6% 9%)',
                  fontWeight:      600,
                }}
              >
                Featured
              </span>
            </div>
          )}

          {/* Condition badge — bottom-left, only if not featured */}
          {!piano.isFeatured && piano.condition && (
            <div className="absolute bottom-4 left-4">
              <span
                className="font-display uppercase block"
                style={{
                  fontSize:        '10px',
                  letterSpacing:   '0.35em',
                  padding:         '0.4rem 0.9rem',
                  backgroundColor: 'rgba(255,255,255,0.84)',
                  backdropFilter:  'blur(8px)',
                  color:           'hsl(25 5% 28%)',
                }}
              >
                {piano.condition}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(1.8rem, 2.8vw, 2.5rem) clamp(1.8rem, 2.8vw, 2.5rem) clamp(1.5rem, 2.2vw, 2rem)' }}>

          {/* Brand with animated leading bar */}
          <p
            className="font-display uppercase"
            style={{
              fontSize:      '11px',
              letterSpacing: '0.5em',
              color:         'hsl(40 72% 52%)',
              marginBottom:  '0.75rem',
            }}
          >
            <span className="pcard-brand-bar" />
            {piano.brand}
          </p>

          {/* Model */}
          <h3
            className="font-cormorant font-light text-piano-black"
            style={{
              fontSize:      'clamp(1.8rem, 2.4vw, 2.4rem)',
              lineHeight:    1.12,
              letterSpacing: '-0.01em',
              marginBottom:  piano.finish ? '0.55rem' : 'clamp(1.2rem, 2vw, 1.8rem)',
            }}
          >
            {piano.model || piano.title}
          </h3>

          {/* Finish */}
          {piano.finish && (
            <p
              className="font-display uppercase"
              style={{
                fontSize:      '12px',
                letterSpacing: '0.2em',
                color:         'hsl(25 4% 52%)',
                marginBottom:  'clamp(1.2rem, 2vw, 1.8rem)',
              }}
            >
              {piano.finish}
            </p>
          )}

          {/* Footer */}
          <div
            className="flex items-center justify-between"
            style={{ paddingTop: 'clamp(1rem, 1.5vw, 1.3rem)', borderTop: '1px solid hsl(36 18% 90%)' }}
          >
            <p
              className="font-display uppercase"
              style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'hsl(25 4% 58%)' }}
            >
              {piano.size || '—'}
            </p>
            <div className="flex items-center gap-2.5">
              <span
                className="font-cormorant font-light text-piano-black"
                style={{ fontSize: 'clamp(1.55rem, 2.1vw, 2.1rem)', lineHeight: 1 }}
              >
                {piano.priceDisplay}
              </span>
              <span
                className="pcard-arrow font-display"
                style={{ fontSize: '1rem', color: 'hsl(25 4% 72%)' }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

// ── Featured (full-width horizontal) card ────────────────────────────────────

function FeaturedCard({
  piano,
  primaryImage,
  className,
}: {
  piano: Piano
  primaryImage: string | undefined
  className?: string
}) {
  return (
    <>
      <style>{`
        .pcard-feat {
          box-shadow: 0 2px 10px hsla(25, 6%, 9%, 0.07);
          transition: box-shadow 0.5s ease;
        }
        .pcard-feat:hover {
          box-shadow: 0 16px 72px hsla(25, 6%, 9%, 0.14);
        }
        .pcard-feat-img { transition: transform 1s cubic-bezier(0.2, 0, 0, 1); }
        .pcard-feat:hover .pcard-feat-img { transform: scale(1.03); }
        .pcard-feat-cta {
          transition: transform 0.3s ease, color 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .pcard-feat:hover .pcard-feat-cta {
          transform: translateX(5px);
          color: hsl(40 72% 52%);
        }
      `}</style>

      <Link
        href={`/pianos/${piano.slug}`}
        className={cn('pcard-feat block bg-white overflow-hidden', className)}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image — left 54% */}
          <div
            className="relative overflow-hidden bg-piano-black md:w-[54%] flex-shrink-0"
            style={{ aspectRatio: '16 / 10', minHeight: '260px' }}
          >
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={piano.title}
                fill
                className="pcard-feat-img object-cover"
                sizes="(max-width: 768px) 100vw, 54vw"
                priority
              />
            ) : (
              <div className="absolute inset-0" style={{ background: 'hsl(25 6% 11%)' }} />
            )}

            {/* Right-side gradient to blend into content panel */}
            <div
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{ background: 'linear-gradient(to right, transparent 65%, rgba(255,255,255,0.08) 100%)' }}
            />

            {/* Year */}
            {piano.year > 0 && (
              <div className="absolute top-5 right-5">
                <span
                  className="font-display tabular-nums"
                  style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.55)' }}
                >
                  {piano.year}
                </span>
              </div>
            )}
          </div>

          {/* Content — right 46% */}
          <div
            className="flex flex-col justify-between md:w-[46%]"
            style={{ padding: 'clamp(2.5rem, 4vw, 4rem) clamp(2.5rem, 4.5vw, 4.5rem)' }}
          >
            <div>
              {/* Featured eyebrow */}
              <p
                className="font-display uppercase"
                style={{
                  fontSize:      '10px',
                  letterSpacing: '0.55em',
                  color:         'hsl(40 72% 52%)',
                  marginBottom:  '1.6rem',
                }}
              >
                ◆ Featured Instrument
              </p>

              {/* Brand */}
              <p
                className="font-display uppercase"
                style={{
                  fontSize:      '12px',
                  letterSpacing: '0.48em',
                  color:         'hsl(40 72% 52%)',
                  marginBottom:  '0.65rem',
                }}
              >
                {piano.brand}
              </p>

              {/* Model */}
              <h3
                className="font-cormorant font-light text-piano-black"
                style={{
                  fontSize:      'clamp(2.4rem, 3.5vw, 3.5rem)',
                  lineHeight:    1.08,
                  letterSpacing: '-0.01em',
                  marginBottom:  '1.3rem',
                }}
              >
                {piano.model || piano.title}
              </h3>

              {/* Spec row: condition · finish · size */}
              <div
                className="flex items-center flex-wrap gap-x-3 gap-y-1"
                style={{ marginBottom: '1.6rem' }}
              >
                {[piano.condition, piano.finish, piano.size]
                  .filter(Boolean)
                  .map((val, i, arr) => (
                    <span key={val} className="flex items-center gap-3">
                      <span
                        className="font-display uppercase"
                        style={{ fontSize: '12px', letterSpacing: '0.3em', color: 'hsl(25 4% 52%)' }}
                      >
                        {val}
                      </span>
                      {i < arr.length - 1 && (
                        <span style={{ color: 'hsl(36 18% 85%)', fontSize: '13px' }}>·</span>
                      )}
                    </span>
                  ))}
              </div>

              {/* Description excerpt */}
              {piano.description && (
                <p
                  className="line-clamp-3"
                  style={{
                    fontSize:     '1rem',
                    lineHeight:   1.75,
                    color:        'hsl(25 4% 42%)',
                    marginBottom: '2rem',
                  }}
                >
                  {piano.description}
                </p>
              )}
            </div>

            {/* Price + CTA */}
            <div
              className="flex items-center justify-between"
              style={{ paddingTop: '1.75rem', borderTop: '1px solid hsl(36 18% 90%)' }}
            >
              <span
                className="font-cormorant font-light text-piano-black"
                style={{ fontSize: 'clamp(2rem, 2.8vw, 2.7rem)', lineHeight: 1 }}
              >
                {piano.priceDisplay}
              </span>
              <span
                className="pcard-feat-cta font-display uppercase text-piano-stone"
                style={{ fontSize: '12px', letterSpacing: '0.4em' }}
              >
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

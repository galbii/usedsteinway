import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Piano } from '@/types/piano'

interface PianoCardProps {
  piano: Piano
  className?: string
}

export function PianoCard({ piano, className }: PianoCardProps) {
  return (
    <>
      <style>{`
        .piano-card {
          box-shadow: 0 1px 3px hsl(350 62% 26% / 0.06), 0 4px 16px hsl(350 62% 26% / 0.04);
          transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.2, 0, 0, 1);
        }
        .piano-card:hover {
          box-shadow: 0 10px 48px hsl(350 62% 26% / 0.14), 0 2px 10px hsl(350 62% 26% / 0.07);
          transform: translateY(-4px);
        }
        .piano-card-img {
          transition: transform 0.7s cubic-bezier(0.2, 0, 0, 1);
        }
        .piano-card:hover .piano-card-img {
          transform: scale(1.045);
        }
        .piano-card-arrow {
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .piano-card:hover .piano-card-arrow {
          color: hsl(40 72% 52%);
          transform: translateX(3px);
        }
      `}</style>

      <Link
        href={`/pianos/${piano.slug}`}
        className={cn('piano-card group block bg-white overflow-hidden', className)}
      >
        {/* ── Image ─────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden bg-piano-black"
          style={{ aspectRatio: '16 / 10' }}
        >
          {piano.imageUrls[0] ? (
            <Image
              src={piano.imageUrls[0]}
              alt={piano.title}
              fill
              className="piano-card-img object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-end"
              style={{ padding: '1.5rem', background: 'hsl(25 6% 11%)' }}
            >
              <p
                className="font-display uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.18)' }}
              >
                Photography forthcoming
              </p>
            </div>
          )}

          {/* Bottom fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 45%)' }}
          />

          {/* Year — top right */}
          {piano.year > 0 && (
            <div className="absolute top-5 right-5">
              <span
                className="font-display tabular-nums"
                style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}
              >
                {piano.year}
              </span>
            </div>
          )}

          {/* Featured — top left (takes priority over condition) */}
          {piano.isFeatured ? (
            <div className="absolute top-5 left-5">
              <span
                className="font-display uppercase block"
                style={{
                  fontSize:        '8px',
                  letterSpacing:   '0.4em',
                  padding:         '0.35rem 0.7rem',
                  backgroundColor: 'hsl(40 72% 52%)',
                  color:           'hsl(25 6% 9%)',
                }}
              >
                Featured
              </span>
            </div>
          ) : (
            /* Condition — bottom left */
            <div className="absolute bottom-5 left-5">
              <span
                className="font-display uppercase block"
                style={{
                  fontSize:        '8px',
                  letterSpacing:   '0.38em',
                  padding:         '0.32rem 0.65rem',
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  color:           'hsl(25 5% 30%)',
                  backdropFilter:  'blur(6px)',
                }}
              >
                {piano.condition}
              </span>
            </div>
          )}
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div style={{ padding: 'clamp(1.8rem, 2.8vw, 2.5rem) clamp(1.8rem, 2.8vw, 2.5rem) clamp(1.6rem, 2.2vw, 2.1rem)' }}>

          {/* Brand */}
          <p
            className="font-display uppercase"
            style={{
              fontSize:      '10px',
              letterSpacing: '0.48em',
              color:         'hsl(40 72% 52%)',
              marginBottom:  '0.75rem',
            }}
          >
            {piano.brand}
          </p>

          {/* Model — primary headline */}
          <h3
            className="font-cormorant font-light text-piano-black"
            style={{
              fontSize:     'clamp(1.7rem, 2.2vw, 2.2rem)',
              lineHeight:   1.15,
              letterSpacing: '-0.01em',
              marginBottom: piano.finish ? '0.6rem' : 'clamp(1.3rem, 2vw, 1.7rem)',
            }}
          >
            {piano.model || piano.title}
          </h3>

          {/* Finish */}
          {piano.finish && (
            <p
              className="font-display uppercase"
              style={{
                fontSize:      '11px',
                letterSpacing: '0.22em',
                color:         'hsl(25 4% 52%)',
                marginBottom:  'clamp(1.3rem, 2vw, 1.7rem)',
              }}
            >
              {piano.finish}
            </p>
          )}

          {/* Footer: size · price · arrow */}
          <div
            className="flex items-center justify-between"
            style={{ paddingTop: 'clamp(1rem, 1.5vw, 1.3rem)', borderTop: '1px solid hsl(36 18% 91%)' }}
          >
            <p
              className="font-display uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'hsl(25 4% 55%)' }}
            >
              {piano.size || '—'}
            </p>

            <div className="flex items-center gap-2.5">
              <span
                className="font-cormorant font-light text-piano-black"
                style={{ fontSize: 'clamp(1.45rem, 2vw, 1.9rem)', lineHeight: 1 }}
              >
                {piano.priceDisplay}
              </span>
              <span
                className="piano-card-arrow font-display"
                style={{ fontSize: '0.8rem', color: 'hsl(25 4% 74%)' }}
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

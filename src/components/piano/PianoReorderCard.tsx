import type { Piano } from '@/types/piano'

interface PianoReorderCardProps {
  piano: Piano
}

export function PianoReorderCard({ piano }: PianoReorderCardProps) {
  const primaryImage = piano.stockImageUrl || piano.imageUrls[0]

  return (
    <>
      {piano.isFeatured && (
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

      <div
        style={{
          aspectRatio: '4 / 3',
          backgroundColor: 'hsl(25, 6%, 12%)',
          overflow: 'hidden',
        }}
      >
        {primaryImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImage}
            alt={piano.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-display uppercase"
              style={{
                fontSize: '9px',
                letterSpacing: '0.42em',
                color: 'rgba(255,255,255,0.38)',
              }}
            >
              No photo
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '1.1rem 1.2rem 1.2rem' }}>
        <p
          className="font-display uppercase"
          style={{
            fontSize: '10px',
            letterSpacing: '0.42em',
            color: 'hsl(40, 72%, 38%)',
            marginBottom: '0.5rem',
          }}
        >
          {piano.brand}
        </p>
        <h3
          className="font-cormorant font-light text-piano-black line-clamp-2"
          style={{ fontSize: '1.25rem', lineHeight: 1.15 }}
        >
          {piano.title || piano.model}
        </h3>
        <p
          className="mt-2 font-display"
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'hsl(25, 4%, 50%)',
          }}
        >
          Saved priority: #{piano.priority}
        </p>
      </div>
    </>
  )
}

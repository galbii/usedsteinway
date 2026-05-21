import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { SellPianoForm } from './_components/SellPianoForm'

export const metadata: Metadata = {
  title: 'Sell Your Piano | UsedSteinways.com',
  description:
    'We will consider for purchase or by consignment your Steinway, Shigeru Kawai, Bösendorfer, and C. Bechstein pianos.',
}

export default async function SellYourPianoPage() {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const rawPhone = siteSettings?.contactInfo?.phone ?? '508-545-0766'
  const telHref = `tel:+1${rawPhone.replace(/\D/g, '')}`

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Header */}
      <section className="bg-piano-burgundy py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Private Acquisitions
          </p>
          <h1
            className="font-light text-white leading-tight mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
          >
            Sell Your Piano
          </h1>
          <p className="text-piano-cream/75 text-lg leading-relaxed max-w-2xl">
            We will consider for purchase or by consignment your{' '}
            <span className="text-piano-cream font-medium">STEINWAY</span>,{' '}
            <span className="text-piano-cream font-medium">Shigeru Kawai</span>,{' '}
            <span className="text-piano-cream font-medium">Bösendorfer</span>, and{' '}
            <span className="text-piano-cream font-medium">C. Bechstein</span> pianos.
            Tell us about your piano for sale.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <div className="bg-piano-warm-white px-10 py-14">
          <div className="flex items-center gap-5 mb-4">
            <p className="font-display text-sm tracking-[0.45em] uppercase text-piano-gold shrink-0">
              Piano Inquiry
            </p>
            <div className="flex-1 h-px bg-piano-linen" />
          </div>
          <p
            className="text-piano-black mb-12 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
          >
            Please provide information about your piano
          </p>

          <p className="text-piano-stone text-base leading-relaxed mb-12 border-l-2 border-piano-gold/40 pl-5">
            <span className="font-medium text-piano-black">Please note:</span> Due to the high volume of
            inquiries, we will consider pianos submitted here over phone calls. We will endeavor to respond
            as quickly as time allows.
          </p>

          <SellPianoForm />
        </div>

        {/* Phone fallback */}
        <div className="mt-10 text-center">
          <p className="text-piano-stone/60 text-sm font-display tracking-widest uppercase mb-3">
            Prefer to call?
          </p>
          <a
            href={telHref}
            className="text-piano-black text-xl font-light hover:text-piano-burgundy transition-colors duration-200"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {rawPhone}
          </a>
        </div>
      </section>
    </main>
  )
}

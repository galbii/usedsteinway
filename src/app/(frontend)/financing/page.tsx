import type { Metadata } from 'next'
import { cache } from 'react'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageEditButton } from '@/components/admin/onpage/PageEditButton'
import { serializeBlocks } from '@/components/admin/onpage/editorSchema'
import { editableBlocks } from '@/blocks/registry'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Piano Financing Options | UsedSteinways.com',
  description:
    'Flexible payment options for serious piano buyers. We work with specialized music lenders to help qualified buyers finance the right instrument.',
}

const queryFinancingPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: 'financing' } },
  })
  return result.docs?.[0] ?? null
})

export default async function FinancingPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryFinancingPage()

  // CMS-driven: if an editor has built the Financing page out of blocks, render it.
  if (page) {
    const { hero, layout } = page
    return (
      <article className={hero?.type === 'none' ? '' : 'pt-16'}>
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
        <PageEditButton pageId={page.id} blockSchemas={serializeBlocks(editableBlocks)} />
      </article>
    )
  }

  // Fallback: the original hand-built Financing page (default until a CMS page exists).
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Payment Options
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Flexible Financing
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            The right piano shouldn&apos;t wait for the right moment. We work with music-specialized
            lenders to help qualified buyers finance their instrument.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-24 space-y-16">
        {/* Three Options */}
        <section>
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
            Your Options
          </p>
          <h2
            className="font-cormorant font-light text-piano-black mb-10"
            style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
          >
            Three Ways to Own
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Direct Purchase',
                desc: 'Full payment at time of sale. We accept wire transfer, cash, and credit cards.',
                detail: 'Simplest process. No interest. Delivery generally within 1–2 weeks for in-stock pianos.',
              },
              {
                number: '02',
                title: 'Music Lending Programs',
                desc: 'We work with lending institutions that specialize in musical instruments. These lenders understand piano ownership and offer favorable terms compared to generic personal loans.',
                detail:
                  'Credit check is required. Terms typically range from 3 months up to 12 years.',
              },
              {
                number: '03',
                title: 'Private Payment Plans',
                desc: 'You may arrange financing with your preferred financial institution.',
                detail: undefined,
              },
            ].map(({ number, title, desc, detail }) => (
              <div
                key={number}
                className="bg-piano-cream border border-piano-linen p-8 hover:border-piano-gold/30 transition-colors"
              >
                <p className="text-piano-gold/30 font-display text-4xl font-bold mb-4">{number}</p>
                <h3 className="font-cormorant font-light text-piano-black text-3xl mb-3">
                  {title}
                </h3>
                <p className="text-piano-stone text-base leading-relaxed mb-5">{desc}</p>
                {detail && (
                  <p className="text-piano-gold text-xs font-display tracking-wide border-t border-piano-linen pt-4 leading-relaxed">
                    {detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What Affects Financing */}
        <section className="bg-piano-indigo-card p-10">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
            Key Factors
          </p>
          <h2 className="font-cormorant font-light text-piano-cream text-3xl mb-8">
            What Affects Your Terms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                factor: 'Credit Profile',
                detail: 'Strong credit typically secures rates from 6.9–9.9% APR',
              },
              {
                factor: 'Down Payment',
                detail: 'Larger down payment (20–30%) reduces rate and improves approval odds',
              },
              {
                factor: 'Instrument Value',
                detail: 'Higher-value instruments from major makers qualify for better programs',
              },
              {
                factor: 'Loan Term',
                detail:
                  'Shorter terms carry lower rates; 5-year terms typically outperform 10-year',
              },
            ].map(({ factor, detail }) => (
              <div key={factor} className="border border-piano-gold/15 p-5">
                <p className="font-display text-xs tracking-widest uppercase text-piano-gold mb-3">
                  {factor}
                </p>
                <p className="text-piano-silver text-base leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Honest Guidance */}
        <section className="max-w-3xl">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
            Honest Advice
          </p>
          <h2
            className="font-cormorant font-light text-piano-black mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
          >
            Is Financing Right for You?
          </h2>
          <div className="space-y-4 text-piano-stone leading-loose">
            <p className="text-lg leading-relaxed">
              Financing makes sense when: the total interest cost is acceptable relative to the
              instrument&apos;s value appreciation potential, your cash position benefits from being
              preserved for other uses, or a lease-to-own structure offers tax advantages for
              professional musicians.
            </p>
            <p className="text-lg leading-relaxed">
              Financing rarely makes sense when: the monthly payment would create financial stress,
              the instrument is being purchased speculatively, or a shorter savings period would
              allow direct purchase at better terms.
            </p>
            <p className="text-lg leading-relaxed">
              We&apos;re happy to discuss the financial dimensions of any purchase openly. We have
              no incentive to push financing — our only goal is for you to end up with the right
              piano through the right process.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/contact?subject=Financing+Inquiry"
              className="inline-block bg-piano-black text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
            >
              Discuss Financing Options
            </Link>
          </div>
        </section>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}

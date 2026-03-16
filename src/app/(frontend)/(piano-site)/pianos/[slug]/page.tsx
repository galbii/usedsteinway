import type { Metadata } from 'next'
import { PianoDetailV2 } from '@/components/piano/PianoDetailV2'
import { getPiano, PIANOS } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PIANOS.map((piano) => ({ slug: piano.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const piano = getPiano(slug)
  if (!piano) return { title: 'Piano Not Found' }
  return {
    title: `${piano.title} | UsedSteinways.com`,
    description: `${piano.brand} ${piano.model} (${piano.year}) — ${piano.finish}, ${piano.size}. ${piano.priceDisplay}. ${piano.description.slice(0, 100)}...`,
  }
}

export default async function PianoDetailPage({ params }: Props) {
  const { slug } = await params
  const piano = getPiano(slug)
  if (!piano) notFound()
  return <PianoDetailV2 piano={piano} />
}

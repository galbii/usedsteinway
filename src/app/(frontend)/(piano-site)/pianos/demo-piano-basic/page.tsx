import type { Metadata } from 'next'
import { PianoDetailV1 } from '@/components/piano/PianoDetailV1'
import { getPiano } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Piano Detail — Basic View | UsedSteinways.com',
  description: 'Design preview: bare-bones individual piano page.',
}

export default function DemoPianoBasicPage() {
  const piano = getPiano('steinway-model-b-2015-satin-ebony')
  if (!piano) notFound()
  return <PianoDetailV1 piano={piano} />
}

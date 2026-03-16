import { PianoHeader } from '@/components/layout/PianoHeader'
import { PianoFooter } from '@/components/layout/PianoFooter'

export default function PianoSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PianoHeader />
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <PianoFooter />
    </>
  )
}

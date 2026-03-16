import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export async function POST() {
  const payload = await getPayload({ config: configPromise })

  // Header nav links (matches PianoHeader.tsx)
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { type: 'custom', url: '/pianos', label: 'Pianos', newTab: false } },
        { link: { type: 'custom', url: '/guides', label: 'Guides', newTab: false } },
        { link: { type: 'custom', url: '/about', label: 'About', newTab: false } },
        { link: { type: 'custom', url: '/visit', label: 'Visit', newTab: false } },
        { link: { type: 'custom', url: '/sell-your-piano', label: 'Sell Your Piano', newTab: false } },
        { link: { type: 'custom', url: '/contact', label: 'Contact', newTab: false } },
      ],
    },
  })

  // Footer nav links (matches PianoFooter.tsx bottom bar + key pages)
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        { link: { type: 'custom', url: '/pianos', label: 'All Pianos', newTab: false } },
        { link: { type: 'custom', url: '/guides', label: 'Guides', newTab: false } },
        { link: { type: 'custom', url: '/about', label: 'About', newTab: false } },
        { link: { type: 'custom', url: '/sell-your-piano', label: 'Sell Your Piano', newTab: false } },
        { link: { type: 'custom', url: '/contact', label: 'Contact', newTab: false } },
        { link: { type: 'custom', url: '/blog', label: 'Blog', newTab: false } },
      ],
    },
  })

  return NextResponse.json({ success: true, message: 'Header and footer seeded.' })
}

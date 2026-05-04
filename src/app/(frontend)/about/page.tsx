import type { Metadata } from 'next'
import { AboutPageContent } from './_components/AboutPageContent'

export const metadata: Metadata = {
  title: "About Roger's Piano | New England's Rebuilt Steinway Destination",
  description:
    "Founded in 1980 by master technician Roger Shaffer, Roger's Piano is New England's trusted destination for rebuilt and restored vintage Steinway instruments — combining 40+ years of craftsmanship with enduring musical heritage.",
}

export default function AboutPage() {
  return <AboutPageContent />
}

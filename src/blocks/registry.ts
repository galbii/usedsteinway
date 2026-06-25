import type { Block } from 'payload'

import { CallToAction } from './CallToAction/config'
import { Content } from './Content/config'
import { MediaBlock } from './MediaBlock/config'
import { Archive } from './ArchiveBlock/config'
import { FormBlock } from './Form/config'
import { HeroHomepage } from './HeroHomepage/config'
import { Ticker } from './Ticker/config'
import { BrandRows } from './BrandRows/config'
import { ShowroomGallery } from './ShowroomGallery/config'
import { Philosophy } from './Philosophy/config'
import { FeaturedPianos } from './FeaturedPianos/config'
import { NewsSection } from './NewsSection/config'
import { Locations } from './Locations/config'
import { FinalCta } from './FinalCta/config'
import { SectionHeader } from './SectionHeader/config'
import { PageHero } from './PageHero/config'
import { TwoColumn } from './TwoColumn/config'
import { CardGrid } from './CardGrid/config'
import { SellForm } from './SellForm/config'
import { TestimonialsFeatured } from './TestimonialsFeatured/config'
import { TestimonialsGrid } from './TestimonialsGrid/config'

// Single source of truth for the Pages `layout` blocks. Consumed by both the
// Payload collection config (admin) and the on-page block editor (frontend
// drawer), so the two can never drift. Add a new block here once and it shows
// up in both places.
export const editableBlocks: Block[] = [
  CallToAction,
  Content,
  MediaBlock,
  Archive,
  FormBlock,
  HeroHomepage,
  Ticker,
  BrandRows,
  ShowroomGallery,
  Philosophy,
  FeaturedPianos,
  NewsSection,
  Locations,
  FinalCta,
  SectionHeader,
  PageHero,
  TwoColumn,
  CardGrid,
  SellForm,
  TestimonialsFeatured,
  TestimonialsGrid,
]

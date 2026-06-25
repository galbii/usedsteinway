import React, { Fragment } from 'react'

import type { Page, Post } from '@/payload-types'

import { ScrollReveal } from '@/components/ScrollReveal'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ExpertBlock } from '@/blocks/Expert/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroHomepageBlock } from '@/blocks/HeroHomepage/Component'
import { TickerBlock } from '@/blocks/Ticker/Component'
import { BrandRowsBlock } from '@/blocks/BrandRows/Component'
import { ShowroomGalleryBlock } from '@/blocks/ShowroomGallery/Component'
import { PhilosophyBlock } from '@/blocks/Philosophy/Component'
import { FeaturedPianosBlock } from '@/blocks/FeaturedPianos/Component'
import { NewsSectionBlock } from '@/blocks/NewsSection/Component'
import { LocationsBlock } from '@/blocks/Locations/Component'
import { FinalCtaBlock } from '@/blocks/FinalCta/Component'
import { SectionHeaderBlock } from '@/blocks/SectionHeader/Component'
import { PageHeroBlock } from '@/blocks/PageHero/Component'
import { TwoColumnBlock } from '@/blocks/TwoColumn/Component'
import { CardGridBlock } from '@/blocks/CardGrid/Component'
import { SellFormBlock } from '@/blocks/SellForm/Component'
import { TestimonialsFeaturedBlock } from '@/blocks/TestimonialsFeatured/Component'
import { TestimonialsGridBlock } from '@/blocks/TestimonialsGrid/Component'

// Registry: blockType slug → React component.
// To add a new block: create src/blocks/YourBlock/Component.tsx,
// add the config to the relevant collection's layout field,
// then add an entry here.
const blockComponents = {
  archive:        ArchiveBlock,
  banner:         BannerBlock,
  content:        ContentBlock,
  cta:            CallToActionBlock,
  expert:         ExpertBlock,
  formBlock:      FormBlock,
  mediaBlock:     MediaBlock,
  heroHomepage:   HeroHomepageBlock,
  ticker:         TickerBlock,
  brandRows:      BrandRowsBlock,
  showroomGallery: ShowroomGalleryBlock,
  philosophy:     PhilosophyBlock,
  featuredPianos: FeaturedPianosBlock,
  newsSection:    NewsSectionBlock,
  locations:      LocationsBlock,
  finalCta:       FinalCtaBlock,
  sectionHeader:  SectionHeaderBlock,
  heroPage:       PageHeroBlock,
  twoColumn:      TwoColumnBlock,
  cardGrid:       CardGridBlock,
  sellForm:       SellFormBlock,
  testimonialsFeatured: TestimonialsFeaturedBlock,
  testimonialsGrid: TestimonialsGridBlock,
}

// Union of all block types that any collection's layout field may contain.
// Extend this union when adding a new collection with layout blocks.
type PageBlock = Page['layout'][0]
type PostLayout = NonNullable<Post['layout']>
type PostBlock = PostLayout[number]
type AnyBlock = PageBlock | PostBlock

export const RenderBlocks: React.FC<{
  blocks: AnyBlock[]
}> = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <Fragment>
      <ScrollReveal />
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]

          if (Block) {
            return (
              <div key={index}>
                {/* @ts-expect-error union type mismatch between block variants */}
                <Block {...block} disableInnerContainer />
              </div>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}

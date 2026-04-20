import React, { Fragment } from 'react'

import type { Page, Post } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ExpertBlock } from '@/blocks/Expert/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Registry: blockType slug → React component.
// To add a new block: create src/blocks/YourBlock/Component.tsx,
// add the config to the relevant collection's layout field,
// then add an entry here.
const blockComponents = {
  archive:    ArchiveBlock,
  content:    ContentBlock,
  cta:        CallToActionBlock,
  expert:     ExpertBlock,
  formBlock:  FormBlock,
  mediaBlock: MediaBlock,
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

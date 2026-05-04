import type { Block } from 'payload'
import { contentLexical } from '@/fields/contentLexical'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: contentLexical,
      label: false,
    },
  ],
}

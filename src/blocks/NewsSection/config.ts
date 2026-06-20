import type { Block } from 'payload'

export const NewsSection: Block = {
  slug: 'newsSection',
  interfaceName: 'NewsSectionBlock',
  labels: {
    singular: 'News / Posts Carousel',
    plural: 'News / Posts Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Label',
      defaultValue: 'Latest News',
      admin: {
        description: "Internal label (e.g. 'Latest News')",
        position: 'sidebar',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 6,
      min: 1,
      max: 8,
      admin: {
        description: 'How many recent published posts to display',
        position: 'sidebar',
      },
    },
  ],
}

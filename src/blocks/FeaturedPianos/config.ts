import type { Block } from 'payload'

export const FeaturedPianos: Block = {
  slug: 'featuredPianos',
  interfaceName: 'FeaturedPianosBlock',
  labels: {
    singular: 'Featured Pianos Carousel',
    plural: 'Featured Pianos Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Label',
      admin: {
        description: "Internal label for this block (e.g. 'Featured Instruments')",
        position: 'sidebar',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Pianos',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        description:
          'Caps how many pinned pianos are shown. Only applies when specific pianos are pinned below — the automatic fallback always matches the static homepage carousel.',
        position: 'sidebar',
      },
    },
    {
      name: 'pianos',
      type: 'array',
      label: 'Pin Specific Pianos (optional)',
      admin: {
        description:
          'Leave empty to render the exact same featured-pianos carousel as the static homepage. Add rows to pin specific instruments and override the default selection.',
      },
      fields: [
        {
          name: 'piano',
          type: 'relationship',
          relationTo: 'pianos',
          label: 'Piano',
        },
      ],
    },
  ],
}

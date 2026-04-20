import type { Block } from 'payload'
import { imageField } from '@/lib/payload/fields/media'

export const ExpertBlock: Block = {
  slug: 'expert',
  interfaceName: 'ExpertBlock',
  labels: {
    singular: 'Expert Insight',
    plural: 'Expert Insights',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote / Insight',
      admin: {
        description: 'The expert quote or key insight to highlight',
      },
    },
    {
      name: 'expertName',
      type: 'text',
      required: true,
      label: 'Expert Name',
    },
    {
      name: 'expertRole',
      type: 'text',
      label: 'Role / Title',
      admin: {
        description: 'e.g. "Registered Piano Technician · 30 Years"',
      },
    },
    imageField('image', {
      label: 'Expert Photo',
      admin: {
        description: 'Optional headshot or portrait',
      },
    }),
    {
      name: 'style',
      type: 'select',
      label: 'Display Style',
      defaultValue: 'pullquote',
      options: [
        { label: 'Pull Quote (minimal — quote + attribution)', value: 'pullquote' },
        { label: 'Profile Card (quote + photo + bio)', value: 'profile' },
      ],
      admin: {
        description: 'Controls how the block renders on the page',
      },
    },
  ],
}

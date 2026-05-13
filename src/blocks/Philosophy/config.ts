import type { Block } from 'payload'
import { imageField } from '@/lib/payload/fields/media'

export const Philosophy: Block = {
  slug: 'philosophy',
  interfaceName: 'PhilosophyBlock',
  labels: {
    singular: 'Philosophy Section',
    plural: 'Philosophy Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      admin: {
        description: "Small label above the heading (e.g. 'Our Philosophy')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Large display heading — use \\n for line breaks',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body Text',
      admin: {
        description: 'Body paragraph beneath the heading',
      },
    },
    imageField('backgroundImage', {
      label: 'Background Image',
      admin: {
        description: 'Full-bleed image shown with a dark overlay behind the text',
      },
    }),
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        { name: 'label', type: 'text', label: 'Label' },
        { name: 'href', type: 'text', label: 'URL' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        { name: 'label', type: 'text', label: 'Label' },
        { name: 'href', type: 'text', label: 'URL' },
      ],
    },
  ],
}

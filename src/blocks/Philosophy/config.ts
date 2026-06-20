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
      defaultValue: 'Our Philosophy',
      admin: {
        description: "Small label above the heading (e.g. 'Our Philosophy')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'People + Pianos\\n= Music',
      admin: {
        description: 'Large display heading — use \\n for line breaks',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body Text',
      defaultValue:
        'Over 45 years of expertise.\\nA trade-up policy that lets you grow.\\nTwo showrooms with over two hundred pianos to match individual preferences.',
      admin: {
        description: 'Body paragraph beneath the heading — use \\n for line breaks',
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
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Our Story' },
        { name: 'href', type: 'text', label: 'URL', defaultValue: '/about' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Browse Pianos' },
        { name: 'href', type: 'text', label: 'URL', defaultValue: '/pianos' },
      ],
    },
  ],
}

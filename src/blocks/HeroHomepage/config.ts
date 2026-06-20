import type { Block } from 'payload'
import { imageField, mediaArrayField } from '@/lib/payload/fields/media'

export const HeroHomepage: Block = {
  slug: 'heroHomepage',
  interfaceName: 'HeroHomepageBlock',
  labels: {
    singular: 'Hero — Homepage',
    plural: 'Hero — Homepage',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Overline',
      defaultValue: 'Est. 1980 · Massachusetts',
      admin: {
        description: "Small text above the wordmark (e.g. 'Est. 1980 · Massachusetts')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading / Wordmark',
      defaultValue: 'UsedSteinways',
      admin: {
        description: "Main heading displayed in large italic Cormorant Garamond (e.g. 'UsedSteinways')",
      },
    },
    {
      name: 'subLabel',
      type: 'text',
      label: 'Gold Sub-Label',
      defaultValue: 'Quality Instruments · Expert Hands',
      admin: {
        description: "Small gold uppercase label below the heading (e.g. 'Quality Instruments · Expert Hands')",
      },
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      defaultValue:
        'Every piano personally evaluated by Roger, a master piano technician with over 45 years of experience.',
      admin: {
        description: 'Body paragraph shown below the sub-label',
      },
    },
    imageField('logoImage', {
      label: 'Logo / Monogram',
      admin: {
        description: 'Monogram badge displayed above the heading (recommended: 110×110px)',
      },
    }),
    mediaArrayField('heroImages', {
      maxRows: 12,
      admin: {
        description: 'Images that cycle in the right panel (min 2 recommended for crossfade)',
      },
    }),
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      maxRows: 4,
      admin: {
        description: 'Key numbers displayed below the CTAs',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number',
          admin: { description: "e.g. '45+'" },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          admin: { description: "e.g. 'Years'" },
        },
      ],
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Browse Collection', admin: { description: "e.g. 'Browse Collection'" } },
        { name: 'href', type: 'text', label: 'URL', defaultValue: '/pianos', admin: { description: "e.g. '/pianos'" } },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Get in Touch', admin: { description: "e.g. 'Get in Touch'" } },
        { name: 'href', type: 'text', label: 'URL', defaultValue: '/contact', admin: { description: "e.g. '/contact'" } },
      ],
    },
  ],
}

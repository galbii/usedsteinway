import type { Block } from 'payload'

export const FinalCta: Block = {
  slug: 'finalCta',
  interfaceName: 'FinalCtaBlock',
  labels: {
    singular: 'Final CTA',
    plural: 'Final CTAs',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Burlington & Natick Showrooms',
      admin: {
        description: "Small label above the heading (e.g. 'Burlington & Natick Showrooms')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Begin Your\\nSearch',
      admin: {
        description: 'Large display heading — use \\n for line breaks',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body Text',
      defaultValue:
        "Tell us what you're looking for — or come hear the pianos yourself. Every conversation starts with listening.",
      admin: {
        description: 'Body paragraph beneath the heading',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      admin: {
        description: 'Filled primary call-to-action button',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Get in Touch',
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      admin: {
        description: 'Outline secondary call-to-action button',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Browse Inventory',
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          defaultValue: '/pianos',
        },
      ],
    },
    {
      name: 'phoneSource',
      type: 'select',
      label: 'Phone Number Source',
      defaultValue: 'siteSettings',
      admin: {
        description: 'Where to pull the inline phone number from',
      },
      options: [
        { label: 'Site Settings (recommended)', value: 'siteSettings' },
        { label: 'Custom Override', value: 'custom' },
      ],
    },
    {
      name: 'phoneOverride',
      type: 'text',
      label: 'Phone Override',
      admin: {
        description: 'Custom phone number to display (used only when Phone Number Source is set to Custom Override)',
        condition: (_, siblingData) => siblingData?.phoneSource === 'custom',
      },
    },
  ],
}

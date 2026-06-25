import type { Block } from 'payload'

export const SellForm: Block = {
  slug: 'sellForm',
  interfaceName: 'SellFormBlock',
  labels: {
    singular: 'Sell Form Section',
    plural: 'Sell Form Sections',
  },
  admin: {
    group: 'Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Piano Inquiry',
      admin: {
        description: "Small uppercase label above the heading (e.g. 'Piano Inquiry').",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Please provide information about your piano',
      admin: {
        description: 'Large display heading shown above the form.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro Note',
      defaultValue:
        'Please note: Due to the high volume of inquiries, we will consider pianos submitted here over phone calls. We will endeavor to respond as quickly as time allows.',
      admin: {
        description: 'Short note rendered above the form, beside a gold accent rule.',
      },
    },
  ],
}

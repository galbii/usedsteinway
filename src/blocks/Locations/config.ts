import type { Block } from 'payload'

export const Locations: Block = {
  slug: 'locations',
  interfaceName: 'LocationsBlock',
  labels: {
    singular: 'Locations Section',
    plural: 'Locations Sections',
  },
  admin: {
    group: 'Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Our Locations',
      admin: {
        description: "Small uppercase label above the tabs (e.g. 'Our Locations').",
        position: 'sidebar',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: '',
      admin: {
        description:
          'Optional large heading rendered above the location tabs. Leave blank to omit.',
        position: 'sidebar',
      },
    },
  ],
}

import type { Block } from 'payload'
import { imageField } from '@/lib/payload/fields/media'

export const PageHero: Block = {
  slug: 'heroPage',
  interfaceName: 'PageHeroBlock',
  labels: {
    singular: 'Page Hero',
    plural: 'Page Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Since 1980 — New England',
      admin: {
        description: 'Small uppercase label above the headline, preceded by a gold rule',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: "New England's Destination",
      admin: {
        description: 'Main headline line (large Cormorant display)',
      },
    },
    {
      name: 'headingAccent',
      type: 'text',
      label: 'Heading Accent',
      defaultValue: 'for Rebuilt Steinway Excellence.',
      admin: {
        description: 'Optional italic gold span appended to the headline on its own line',
      },
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
      defaultValue:
        'For over 40 years, a trusted source for fine pianos — specializing in the rebuilding and restoration of vintage Steinway & Sons instruments.',
      admin: {
        description: 'Supporting paragraph beneath the headline',
      },
    },
    imageField('backgroundImage', {
      label: 'Background Image',
      admin: {
        description: 'Full-bleed hero image shown behind a bottom-heavy dark gradient',
      },
    }),
    {
      name: 'estLabel',
      type: 'text',
      label: 'Est. Label',
      defaultValue: 'Est. 1980',
      admin: {
        description: 'Optional small flanking label beside the subtext (e.g. "Est. 1980")',
      },
    },
    {
      name: 'bgStyle',
      type: 'select',
      label: 'Background Style',
      defaultValue: 'burgundy',
      options: [
        { label: 'Burgundy', value: 'burgundy' },
        { label: 'Charcoal', value: 'charcoal' },
        { label: 'Cream', value: 'cream' },
        { label: 'Black', value: 'black' },
      ],
      admin: {
        description: 'Base background color shown behind/around the image',
        position: 'sidebar',
      },
    },
  ],
}

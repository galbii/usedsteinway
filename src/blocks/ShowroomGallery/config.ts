import type { Block } from 'payload'
import { mediaArrayField } from '@/lib/payload/fields/media'

export const ShowroomGallery: Block = {
  slug: 'showroomGallery',
  interfaceName: 'ShowroomGalleryBlock',
  labels: {
    singular: 'Showroom Gallery',
    plural: 'Showroom Galleries',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'The Showroom',
      admin: {
        description: 'Overline label above the heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Inside Our\nCollection',
      admin: {
        description: 'Section heading — use \\n for line breaks',
      },
    },
    mediaArrayField('images', {
      maxRows: 20,
      admin: {
        description: 'Gallery images for the bento grid (min 6 recommended)',
      },
    }),
    {
      name: 'galleryHref',
      type: 'text',
      label: 'Gallery Link URL',
      defaultValue: '/gallery',
      admin: {
        description: 'URL for the "View Full Gallery" button',
      },
    },
    {
      name: 'showroomHref',
      type: 'text',
      label: 'Showroom Link URL',
      defaultValue: '/contact',
      admin: {
        description: 'URL for the "Visit Our Showroom" button',
      },
    },
  ],
}

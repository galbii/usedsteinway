import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'contactInfo',
      label: 'Contact Information',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '508-545-0766',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          defaultValue: 'info@usedsteinways.com',
        },
        {
          name: 'hoursOfOperation',
          type: 'text',
          label: 'Hours of Operation',
          defaultValue: 'By appointment. Walk-in may be possible but not guaranteed.',
          admin: {
            description: 'Displayed in the footer and on the contact/visit pages.',
          },
        },
      ],
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Store Locations',
      minRows: 1,
      admin: {
        description: 'Add one entry per physical location.',
      },
      defaultValue: [
        {
          name: 'Natick',
          streetAddress: '12 Worcester Street',
          city: 'Natick',
          state: 'MA',
          zip: '01760',
          googleMapsUrl: 'https://maps.google.com/?q=12+Worcester+Street,+Natick,+MA+01760',
        },
        {
          name: 'Burlington',
          streetAddress: '135 Cambridge Street',
          city: 'Burlington',
          state: 'MA',
          zip: '01803',
          googleMapsUrl: 'https://maps.google.com/?q=135+Cambridge+Street,+Burlington,+MA+01803',
        },
      ],
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Location Name',
          required: true,
          admin: {
            description: 'e.g. "Natick" or "Burlington"',
          },
        },
        {
          name: 'streetAddress',
          type: 'text',
          label: 'Street Address',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          label: 'State',
          required: true,
        },
        {
          name: 'zip',
          type: 'text',
          label: 'ZIP Code',
          required: true,
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
          label: 'Google Maps URL',
          admin: {
            description: 'Full Google Maps link for the "Get Directions" button.',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'GitHub', value: 'github' },
            { label: 'Discord', value: 'discord' },
            { label: 'Threads', value: 'threads' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (optional override)',
          admin: {
            description: 'Overrides the platform name when displayed as link text',
          },
        },
      ],
    },
  ],
}

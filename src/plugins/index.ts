import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  // Cloudflare R2 storage via S3-compatible API.
  // Activated whenever R2_BUCKET is present in the environment.
  // Upload/delete go to the private S3 endpoint; files are served from
  // NEXT_PUBLIC_R2_PUBLIC_URL (enable "Public access" on the bucket in
  // the Cloudflare dashboard to obtain this URL, then set the env var).
  s3Storage({
    enabled: Boolean(process.env.R2_BUCKET),
    collections: {
      media: {
        // When the public R2 URL is configured, bypass Payload's proxy and serve files
        // directly from R2. Without it, Payload proxies requests through its built-in
        // /api/media/file/:filename endpoint — slower but correct. Do NOT provide a
        // custom generateFileURL in that case; the wrong fallback (/media/*) points to
        // local disk which doesn't exist when using S3 storage.
        ...(process.env.NEXT_PUBLIC_R2_PUBLIC_URL
          ? ({
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
                const key = prefix ? `${prefix}/${filename}` : filename
                return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`
              },
            } as const)
          : {}),
      },
    },
    bucket: process.env.R2_BUCKET ?? '',
    config: {
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
      },
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      // Required for Cloudflare R2 — uses path-style URLs instead of virtual-hosted
      forcePathStyle: true,
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'pianos'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]

'use client'

import React from 'react'
import {
  $createUploadNode,
  createClientFeature,
  toolbarAddDropdownGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
} from 'lexical'
import { $wrapNodeInElement } from '@lexical/utils'

/**
 * Window-level bridge installed by AdminRootProvider. The Lexical toolbar API
 * only exposes plain function callbacks (no hooks), so we cross the React
 * boundary with a function set on `window` while the provider is mounted.
 */
declare global {
  interface Window {
    __orcaOpenMediaLibrary?: (options: {
      mode?: 'select'
      filterMimeType?: string
      onSelect?: (media: { id: string }) => void
    }) => void
  }
}

function MediaLibraryIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

export const MediaLibraryClientFeature = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: MediaLibraryIcon,
          key: 'mediaLibrary',
          label: () => 'Media Library',
          onSelect: ({ editor }) => {
            const open =
              typeof window !== 'undefined' ? window.__orcaOpenMediaLibrary : undefined
            if (!open) {
              // eslint-disable-next-line no-console
              console.warn(
                '[MediaLibraryFeature] window.__orcaOpenMediaLibrary is not mounted — make sure AdminRootProvider wraps the admin tree.',
              )
              return
            }
            open({
              mode: 'select',
              filterMimeType: 'image/',
              onSelect: (item) => {
                editor.update(() => {
                  const node = $createUploadNode({
                    data: {
                      fields: {},
                      relationTo: 'media',
                      value: item.id,
                    },
                  })
                  $insertNodes([node])
                  const parent = node.getParentOrThrow()
                  if ($isRootOrShadowRoot(parent)) {
                    $wrapNodeInElement(node, $createParagraphNode).selectEnd()
                  }
                })
              },
            })
          },
        },
      ]),
    ],
  },
})

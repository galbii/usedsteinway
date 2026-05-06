'use client'

import React from 'react'
import { useField, useForm } from '@payloadcms/ui'
import { useMediaManager } from './media-manager/MediaManagerProvider'
import type { MediaItem } from './media-manager/types'

/**
 * Button that opens the media manager in multi-select mode and appends all
 * chosen images (in selection order) as new rows in a sibling array field.
 *
 * Uses `addFieldRow` from `useForm()` — the correct Payload v3 API for
 * programmatically adding rows (raw `setValue` bypasses the array field's
 * internal row state and only applies the last row).
 *
 * Usage in collection config — add as a `ui` field before the target array:
 * ```typescript
 * {
 *   type: 'ui',
 *   name: 'bulkImageSelector',
 *   admin: {
 *     components: {
 *       Field: '/components/admin/BulkMediaSelectorButton#BulkMediaSelectorButton',
 *     },
 *   },
 * }
 * ```
 */
export const BulkMediaSelectorButton: React.FC = () => {
  // Read-only: show how many images are currently in the gallery
  const { value } = useField<Array<{ image: string }>>({ path: 'images' })
  // useForm().addFieldRow is the correct Payload v3 way to append array rows
  const { addFieldRow } = useForm()
  const { openModal } = useMediaManager()

  const currentCount = Array.isArray(value) ? value.length : 0

  const handleOpenLibrary = () => {
    openModal({
      mode: 'select',
      allowMultiple: true,
      onSelectMultiple: (items: MediaItem[]) => {
        // Add each selected item as its own row — Payload assigns the row ID internally.
        // subFieldState pre-populates the `image` upload field in each new row.
        items.forEach((item) => {
          addFieldRow({
            path: 'images',
            schemaPath: 'pianos.images',
            subFieldState: {
              image: {
                value: item.id,
                initialValue: item.id,
                valid: true,
              },
            },
          })
        })
      },
    })
  }

  return (
    <div
      style={{
        marginBottom: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <button
        type="button"
        onClick={handleOpenLibrary}
        className="btn btn--style-secondary btn--size-medium"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.625rem',
          padding: '0.75rem 1.25rem',
        }}
      >
        {/* Gallery / stack icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>Add Multiple from Media Library</span>
        {currentCount > 0 && (
          <span
            style={{
              marginLeft: '0.25rem',
              padding: '0.125rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: 'var(--theme-elevation-200)',
              color: 'var(--theme-text)',
            }}
          >
            {currentCount} in gallery
          </span>
        )}
      </button>
      <p
        style={{
          margin: 0,
          fontSize: '0.8125rem',
          color: 'var(--theme-elevation-500)',
          textAlign: 'center',
        }}
      >
        Select multiple photos at once and they will be added in order. Use the individual row buttons below to replace a specific photo.
      </p>
    </div>
  )
}

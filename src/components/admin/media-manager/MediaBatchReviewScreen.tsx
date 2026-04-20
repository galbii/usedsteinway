'use client'

import { useState, useEffect } from 'react'
import { useMediaManager } from './MediaManagerProvider'

const colors = {
  backdrop: 'rgba(0, 0, 0, 0.92)',
  modalBg: '#0a0e1a',
  headerBg: '#0f1422',
  cardBg: '#151b2b',
  inputBg: '#1a2234',
  hoverBg: '#1e2739',
  border: '#1e2739',
  borderLight: '#2d3748',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  success: '#10b981',
  error: '#ef4444',
  white: '#ffffff',
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function FileTypeIcon({ mimeType }: { mimeType: string }) {
  const isVideo = mimeType.startsWith('video/')
  const isAudio = mimeType.startsWith('audio/')
  const isPdf = mimeType === 'application/pdf'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: colors.inputBg,
      }}
    >
      {isVideo && (
        <svg style={{ width: '36px', height: '36px', color: colors.textMuted }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      )}
      {isAudio && (
        <svg style={{ width: '36px', height: '36px', color: colors.textMuted }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )}
      {isPdf && (
        <svg style={{ width: '36px', height: '36px', color: colors.textMuted }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )}
      {!isVideo && !isAudio && !isPdf && (
        <svg style={{ width: '36px', height: '36px', color: colors.textMuted }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
    </div>
  )
}

export function MediaBatchReviewScreen() {
  const { batchReviewFiles, uploadBatchFiles, clearBatchReview, isUploading } = useMediaManager()
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [previews, setPreviews] = useState<(string | null)[]>([])

  // Initialize: all selected, generate object URL previews
  useEffect(() => {
    setSelected(new Set(batchReviewFiles.map((_, i) => i)))
    const urls = batchReviewFiles.map((file) =>
      file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    )
    setPreviews(urls)
    return () => {
      urls.forEach((url) => url && URL.revokeObjectURL(url))
    }
  }, [batchReviewFiles])

  const toggleOne = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(batchReviewFiles.map((_, i) => i)))
  const deselectAll = () => setSelected(new Set())

  const handleUpload = () => {
    const filesToUpload = batchReviewFiles.filter((_, i) => selected.has(i))
    void uploadBatchFiles(filesToUpload)
  }

  const selectedCount = selected.size
  const allSelected = selectedCount === batchReviewFiles.length
  const noneSelected = selectedCount === 0

  if (batchReviewFiles.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000002,
        backgroundColor: colors.backdrop,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          padding: '28px 40px 24px',
          backgroundColor: colors.headerBg,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 700,
              color: colors.textPrimary,
              lineHeight: 1.2,
            }}
          >
            Review {batchReviewFiles.length} files
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: colors.textMuted }}>
            All files are selected by default. Uncheck any you don&apos;t want to upload.
          </p>
        </div>

        {/* Select all / deselect all toggle */}
        <button
          onClick={allSelected ? deselectAll : selectAll}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            border: `1px solid ${colors.borderLight}`,
            backgroundColor: 'transparent',
            color: colors.textSecondary,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.primary
            e.currentTarget.style.color = colors.primary
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.borderLight
            e.currentTarget.style.color = colors.textSecondary
          }}
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      {/* File grid */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 40px',
          backgroundColor: colors.modalBg,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
          }}
        >
          {batchReviewFiles.map((file, i) => {
            const isSelected = selected.has(i)
            return (
              <div
                key={i}
                onClick={() => toggleOne(i)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: `2px solid ${isSelected ? colors.primary : colors.border}`,
                  backgroundColor: colors.cardBg,
                  transition: 'border-color 0.15s ease, transform 0.1s ease',
                  transform: isSelected ? 'scale(1)' : 'scale(0.97)',
                  opacity: isSelected ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.opacity = '0.75'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = isSelected ? '1' : '0.5'
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  {previews[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previews[i]!}
                      alt={file.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <FileTypeIcon mimeType={file.type} />
                  )}

                  {/* Checkbox overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      backgroundColor: isSelected ? colors.primary : 'rgba(0,0,0,0.5)',
                      border: `2px solid ${isSelected ? colors.primary : 'rgba(255,255,255,0.4)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {isSelected && (
                      <svg style={{ width: '13px', height: '13px', color: colors.white }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* File info */}
                <div style={{ padding: '10px 12px' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      fontWeight: 600,
                      color: colors.textPrimary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={file.name}
                  >
                    {file.name}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: colors.textMuted }}>
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          flexShrink: 0,
          padding: '20px 40px',
          backgroundColor: colors.headerBg,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', color: colors.textMuted }}>
          {selectedCount === 0
            ? 'No files selected'
            : `${selectedCount} of ${batchReviewFiles.length} file${batchReviewFiles.length !== 1 ? 's' : ''} selected`}
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={clearBatchReview}
            disabled={isUploading}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '10px',
              border: `1px solid ${colors.border}`,
              backgroundColor: 'transparent',
              color: colors.textSecondary,
              cursor: isUploading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isUploading) {
                e.currentTarget.style.borderColor = colors.borderLight
                e.currentTarget.style.color = colors.textPrimary
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border
              e.currentTarget.style.color = colors.textSecondary
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={noneSelected || isUploading}
            style={{
              padding: '12px 28px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '10px',
              border: 'none',
              background:
                noneSelected || isUploading
                  ? colors.cardBg
                  : `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
              color: noneSelected || isUploading ? colors.textMuted : colors.white,
              cursor: noneSelected || isUploading ? 'not-allowed' : 'pointer',
              boxShadow: noneSelected || isUploading ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!noneSelected && !isUploading) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.45)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = noneSelected || isUploading ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.35)'
            }}
          >
            {isUploading
              ? 'Uploading...'
              : `Upload ${selectedCount} file${selectedCount !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}

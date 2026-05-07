'use client'

import { useCallback, useState, useRef, useEffect, type DragEvent } from 'react'
import Image from 'next/image'
import { useMediaManager } from './MediaManagerProvider'
import { MediaGrid } from './MediaGrid'
import { FolderTree } from './FolderTree'
import { ToastContainer } from './Toast'
import { ImageEditor } from './ImageEditor'
import { MediaUploadMetadataForm } from './MediaUploadMetadataForm'
import { MediaEditPanel } from './MediaEditPanel'
import { MediaBatchReviewScreen } from './MediaBatchReviewScreen'

// Dark theme color palette - Modern, sleek, professional
const colors = {
  // Backgrounds
  backdrop: 'rgba(0, 0, 0, 0.85)',
  modalBg: '#0a0e1a',
  headerBg: '#0f1422',
  sidebarBg: '#0d1117',
  contentBg: '#0a0e1a',
  cardBg: '#151b2b',
  inputBg: '#1a2234',
  hoverBg: '#1e2739',

  // Borders
  border: '#1e2739',
  borderLight: '#2d3748',
  borderFocus: '#3b82f6',

  // Text
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textAccent: '#60a5fa',

  // Brand colors
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: '#60a5fa',
  success: '#10b981',
  successBg: '#064e3b',
  error: '#ef4444',
  errorBg: '#7f1d1d',
  warning: '#f59e0b',
  warningBg: '#78350f',

  // Accents
  accent: '#8b5cf6',
  accentHover: '#7c3aed',
  gold: '#f59e0b',

  // UI elements
  white: '#ffffff',
  black: '#000000',
}

/**
 * Modal dialog for the media manager with folder navigation and drag-drop upload
 * Rebuilt for proper upload flow handling
 */
export function MediaManagerModal() {
  const {
    isOpen,
    closeModal,
    handleFilesSelected,
    isUploading,
    error,
    searchQuery,
    setSearchQuery,
    selectedMedia,
    copyPublicUrl,
    totalDocs,
    toasts,
    dismissToast,
    editingFile,
    metadataEditingFile,
    editingMedia,
    editingMediaId,
    setEditingFile,
    setMetadataEditingFile,
    setEditingMedia,
    moveToMetadataEditing,
    uploadWithMetadata,
    uploadEditedFile,
    skipEditing,
    pendingFiles,
    currentFolder,
    folders,
    moveMediaToFolder,
    modalOptions,
    updateMedia,
    batchReviewFiles,
    selectedMediaItems,
    clearMediaSelection,
    selectedTags,
    setSelectedTags,
    availableTags,
  } = useMediaManager()

  const [isDragging, setIsDragging] = useState(false)
  const [showMoveMenu, setShowMoveMenu] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const tagFilterRef = useRef<HTMLDivElement>(null)
  const dragCounterRef = useRef(0)

  // Footer tag state
  const [footerTags, setFooterTags] = useState<string[]>([])
  const [footerTagInput, setFooterTagInput] = useState('')
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null)
  const [editingTagValue, setEditingTagValue] = useState('')
  const [isSavingTags, setIsSavingTags] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log('🎨 [MODAL STATE]', {
      isOpen,
      editingFile: editingFile?.name,
      metadataEditingFile: metadataEditingFile?.name,
      editingMedia: editingMedia?.filename,
      pendingFiles: pendingFiles.length,
    })
  }, [isOpen, editingFile, metadataEditingFile, editingMedia, pendingFiles])

  // Handle keyboard escape - only close modal, not editors
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If editing, close editor first
        if (editingFile) {
          setEditingFile(null)
        } else if (metadataEditingFile) {
          setMetadataEditingFile(null)
        } else if (editingMedia) {
          setEditingMedia(null)
        } else if (isOpen) {
          closeModal()
        }
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, editingFile, metadataEditingFile, editingMedia, closeModal, setEditingFile, setMetadataEditingFile, setEditingMedia])

  // Prevent body scroll when modal or editors are open
  useEffect(() => {
    if (isOpen || editingFile || metadataEditingFile || editingMedia) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, editingFile, metadataEditingFile, editingMedia])

  // Sync footer tags when selected media changes. Intentionally depend only on the ID so
  // we don't re-sync from server state after our own optimistic tag updates.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setFooterTags(selectedMedia?.tags ?? [])
    setFooterTagInput('')
    setEditingTagIndex(null)
  }, [selectedMedia?.id])
  /* eslint-enable react-hooks/exhaustive-deps */

  // Footer tag handlers (auto-save on every mutation)
  const addFooterTag = useCallback(async () => {
    const trimmed = footerTagInput.trim().toLowerCase()
    if (!trimmed || footerTags.includes(trimmed) || !selectedMedia) return
    const next = [...footerTags, trimmed]
    setFooterTags(next)
    setFooterTagInput('')
    setIsSavingTags(true)
    await updateMedia(selectedMedia.id, { tags: next })
    setIsSavingTags(false)
  }, [footerTagInput, footerTags, selectedMedia, updateMedia])

  const removeFooterTag = useCallback(async (index: number) => {
    if (!selectedMedia) return
    const next = footerTags.filter((_, i) => i !== index)
    setFooterTags(next)
    setIsSavingTags(true)
    await updateMedia(selectedMedia.id, { tags: next })
    setIsSavingTags(false)
  }, [footerTags, selectedMedia, updateMedia])

  const startEditTag = useCallback((index: number, value: string) => {
    setEditingTagIndex(index)
    setEditingTagValue(value)
  }, [])

  const commitEditTag = useCallback(async (index: number) => {
    const trimmed = editingTagValue.trim().toLowerCase()
    setEditingTagIndex(null)
    if (!trimmed || trimmed === footerTags[index] || footerTags.includes(trimmed) || !selectedMedia) return
    const next = footerTags.map((t, i) => (i === index ? trimmed : t))
    setFooterTags(next)
    setIsSavingTags(true)
    await updateMedia(selectedMedia.id, { tags: next })
    setIsSavingTags(false)
  }, [editingTagValue, footerTags, selectedMedia, updateMedia])

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounterRef.current = 0

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      console.log('📥 [DROP] Files dropped:', files.length)
      handleFilesSelected(files)
    }
  }, [handleFilesSelected])

  // File input handler
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log('📥 [FILE INPUT] Files selected:', files.length)
      handleFilesSelected(files)
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [handleFilesSelected])

  // Close tag filter dropdown on outside click
  useEffect(() => {
    if (!showTagFilter) return
    const handleOutside = (e: MouseEvent) => {
      if (tagFilterRef.current && !tagFilterRef.current.contains(e.target as Node)) {
        setShowTagFilter(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [showTagFilter])

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag],
    )
  }, [selectedTags, setSelectedTags])

  // Handle move to folder
  const handleMoveToFolder = useCallback(async (folderId: string | null) => {
    if (selectedMedia) {
      await moveMediaToFolder(selectedMedia.id, folderId)
      setShowMoveMenu(false)
    }
  }, [selectedMedia, moveMediaToFolder])

  // Handle select in selection mode
  const handleSelect = useCallback(() => {
    if (selectedMedia && modalOptions?.onSelect) {
      modalOptions.onSelect(selectedMedia)
      closeModal()
    }
  }, [selectedMedia, modalOptions, closeModal])

  // Handle multi-select confirm
  const handleConfirmMultiple = useCallback(() => {
    if (selectedMediaItems.length > 0 && modalOptions?.onSelectMultiple) {
      modalOptions.onSelectMultiple(selectedMediaItems)
      closeModal()
    }
  }, [selectedMediaItems, modalOptions, closeModal])

  // Determine if we're in selection mode
  const isSelectionMode = modalOptions?.mode === 'select'
  const isMultiSelectMode = isSelectionMode && modalOptions?.allowMultiple === true

  return (
    <>
      {/* Main Media Library Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.backdrop,
              backdropFilter: 'blur(8px)',
              zIndex: 1,
            }}
          />

          {/* Modal Container */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1280px',
              height: '92vh',
              backgroundColor: colors.modalBg,
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            {/* Header */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 32px',
                backgroundColor: colors.headerBg,
                borderBottom: `1px solid ${colors.border}`,
                background: `linear-gradient(135deg, ${colors.headerBg} 0%, ${colors.modalBg} 100%)`,
                position: 'relative',
                zIndex: 1000002,
              }}
            >
              {/* Left: Title & Info */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <h2
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      margin: 0,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {isSelectionMode ? 'Select Media' : 'Media Library'}
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: colors.textSecondary,
                      marginTop: '6px',
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{totalDocs.toLocaleString()} items</span>
                    {currentFolder && (
                      <>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg
                            style={{ width: '16px', height: '16px', color: colors.gold }}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 7V17a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6.586a1 1 0 01-.707-.293L10 5H5a2 2 0 00-2 2z" />
                          </svg>
                          <span style={{ color: colors.textAccent }}>{currentFolder.name}</span>
                        </span>
                      </>
                    )}
                    {isSelectionMode && (
                      <>
                        <span>•</span>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: isMultiSelectMode ? colors.success : colors.primary,
                            color: colors.white,
                          }}
                        >
                          {isMultiSelectMode ? 'Multi-Select Mode' : 'Selection Mode'}
                        </span>
                        {isMultiSelectMode && selectedMediaItems.length > 0 && (
                          <>
                            <span>•</span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: colors.success }}>
                              {selectedMediaItems.length} selected
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Search, Upload, Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1000003 }}>
                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                  <svg
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '20px',
                      height: '20px',
                      color: colors.textMuted,
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '320px',
                      paddingLeft: '48px',
                      paddingRight: '20px',
                      paddingTop: '14px',
                      paddingBottom: '14px',
                      fontSize: '14px',
                      backgroundColor: colors.inputBg,
                      color: colors.textPrimary,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.borderFocus
                      e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Tag Guide */}
                <div style={{ position: 'relative' }} className="tag-guide-wrapper">
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.inputBg,
                      color: colors.textMuted,
                      cursor: 'default',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primary
                      e.currentTarget.style.color = colors.primary
                      const tip = e.currentTarget.nextElementSibling as HTMLElement | null
                      if (tip) tip.style.opacity = '1'
                      if (tip) tip.style.pointerEvents = 'auto'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border
                      e.currentTarget.style.color = colors.textMuted
                      const tip = e.currentTarget.nextElementSibling as HTMLElement | null
                      if (tip) tip.style.opacity = '0'
                      if (tip) tip.style.pointerEvents = 'none'
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  {/* Tooltip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      zIndex: 9999999,
                      width: '300px',
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.borderLight}`,
                      borderRadius: '14px',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
                      padding: '18px 20px',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.18s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <svg style={{ width: '14px', height: '14px', color: colors.primary, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: colors.textSecondary }}>
                        Using Tags
                      </span>
                    </div>
                    <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <li style={{ fontSize: '13px', lineHeight: '1.6', color: colors.textSecondary }}>
                        Tag a media item{' '}
                        {(['showroom', 'burlington', 'steinway', 'natick'] as const).map((t, i, arr) => (
                          <span key={t}>
                            <span style={{ padding: '1px 7px', borderRadius: '5px', backgroundColor: `${colors.primary}22`, color: colors.primaryLight, fontWeight: 600, fontSize: '12px', fontFamily: 'monospace' }}>{t}</span>
                            {i < arr.length - 1 && <span style={{ color: colors.textMuted }}>, </span>}
                          </span>
                        ))}{' '}
                        and it will appear in the <span style={{ color: colors.textPrimary, fontWeight: 600 }}>homepage hero</span>.
                      </li>
                      <li style={{ fontSize: '13px', lineHeight: '1.6', color: colors.textSecondary }}>
                        Tag a media item{' '}
                        <span style={{ padding: '1px 7px', borderRadius: '5px', backgroundColor: `${colors.accent}22`, color: colors.accent, fontWeight: 600, fontSize: '12px', fontFamily: 'monospace' }}>piano</span>{' '}
                        and it will appear in the <span style={{ color: colors.textPrimary, fontWeight: 600 }}>homepage gallery</span>.
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Tag Filter */}
                <div ref={tagFilterRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowTagFilter(v => !v)}
                    title="Filter by tag"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 18px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: `1px solid ${selectedTags.length > 0 ? colors.accent : colors.border}`,
                      backgroundColor: selectedTags.length > 0 ? `${colors.accent}18` : colors.inputBg,
                      color: selectedTags.length > 0 ? colors.accent : colors.textSecondary,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent
                      e.currentTarget.style.color = colors.accent
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = selectedTags.length > 0 ? colors.accent : colors.border
                      e.currentTarget.style.color = selectedTags.length > 0 ? colors.accent : colors.textSecondary
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Tags</span>
                    {selectedTags.length > 0 && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '20px',
                          height: '20px',
                          padding: '0 6px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: colors.accent,
                          color: colors.white,
                          lineHeight: 1,
                        }}
                      >
                        {selectedTags.length}
                      </span>
                    )}
                    <svg
                      style={{
                        width: '14px',
                        height: '14px',
                        flexShrink: 0,
                        transform: showTagFilter ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Tag Dropdown */}
                  {showTagFilter && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        zIndex: 9999999,
                        minWidth: '220px',
                        maxWidth: '280px',
                        maxHeight: '320px',
                        overflowY: 'auto',
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.borderLight}`,
                        borderRadius: '14px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                        padding: '8px',
                      }}
                    >
                      {/* Header row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px 10px',
                        }}
                      >
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: colors.textMuted }}>
                          Filter by tag
                        </span>
                        {selectedTags.length > 0 && (
                          <button
                            onClick={() => setSelectedTags([])}
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: colors.error,
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      {availableTags.length === 0 ? (
                        <p style={{ fontSize: '13px', color: colors.textMuted, padding: '8px 12px 12px', margin: 0 }}>
                          No tags found
                        </p>
                      ) : (
                        availableTags.map(tag => {
                          const isActive = selectedTags.includes(tag)
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '9px 12px',
                                fontSize: '13px',
                                fontWeight: isActive ? 600 : 400,
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: isActive ? `${colors.accent}20` : 'transparent',
                                color: isActive ? colors.accent : colors.textSecondary,
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.backgroundColor = colors.hoverBg
                                  e.currentTarget.style.color = colors.textPrimary
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.backgroundColor = 'transparent'
                                  e.currentTarget.style.color = colors.textSecondary
                                }
                              }}
                            >
                              {/* Checkbox */}
                              <span
                                style={{
                                  flexShrink: 0,
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  border: `2px solid ${isActive ? colors.accent : colors.borderLight}`,
                                  backgroundColor: isActive ? colors.accent : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {isActive && (
                                  <svg style={{ width: '10px', height: '10px', color: colors.white }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </span>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {tag}
                              </span>
                            </button>
                          )
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <button
                  onClick={() => {
                    console.log('📤 [UPLOAD BUTTON] Clicked')
                    fileInputRef.current?.click()
                  }}
                  disabled={isUploading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '12px',
                    border: 'none',
                    background: isUploading
                      ? colors.textMuted
                      : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                    color: colors.white,
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    boxShadow: isUploading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.2s ease',
                    opacity: isUploading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isUploading) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {isUploading ? (
                    <>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          border: `2px solid ${colors.white}`,
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Upload</span>
                    </>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,application/pdf"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: colors.cardBg,
                    color: colors.textMuted,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.error
                    e.currentTarget.style.color = colors.white
                    e.currentTarget.style.transform = 'rotate(90deg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg
                    e.currentTarget.style.color = colors.textMuted
                    e.currentTarget.style.transform = 'rotate(0deg)'
                  }}
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div
                style={{
                  flexShrink: 0,
                  padding: '16px 24px',
                  backgroundColor: colors.errorBg,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.error }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>{error}</p>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
              {/* Folder Sidebar */}
              <div
                style={{
                  flexShrink: 0,
                  width: sidebarCollapsed ? 0 : '288px',
                  backgroundColor: colors.sidebarBg,
                  borderRight: `1px solid ${colors.border}`,
                  overflow: 'visible',
                  transition: 'width 0.3s ease',
                  position: 'relative',
                }}
              >
                <div style={{ overflow: sidebarCollapsed ? 'hidden' : 'visible', height: '100%' }}>
                  <FolderTree />
                </div>

                {/* Sidebar Toggle */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-18px',
                    transform: 'translateY(-50%)',
                    zIndex: 20,
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary
                    e.currentTarget.style.borderColor = colors.primary
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg
                    e.currentTarget.style.borderColor = colors.border
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                  }}
                >
                  <svg
                    style={{
                      width: '16px',
                      height: '16px',
                      color: colors.textSecondary,
                      transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      pointerEvents: 'none',
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {/* Main Content */}
              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  backgroundColor: colors.contentBg,
                  overflow: 'hidden',
                }}
              >
                <MediaGrid />

                {/* Drag & Drop Overlay */}
                {isDragging && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      backdropFilter: 'blur(4px)',
                      border: `3px dashed ${colors.primary}`,
                      zIndex: 10,
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '96px',
                          height: '96px',
                          margin: '0 auto 24px',
                          borderRadius: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                          animation: 'bounce 1s infinite',
                        }}
                      >
                        <svg
                          style={{ width: '48px', height: '48px', color: colors.white }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
                        Drop files to upload
                      </p>
                      <p style={{ fontSize: '14px', color: colors.textSecondary, marginTop: '8px' }}>
                        {currentFolder ? `Uploading to "${currentFolder.name}"` : 'Images will open in editor for cropping'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Multi-Select Confirmation */}
            {isMultiSelectMode && (
              <div
                style={{
                  flexShrink: 0,
                  padding: '20px 32px',
                  backgroundColor: colors.headerBg,
                  borderTop: `1px solid ${colors.border}`,
                  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                {/* Left: thumbnails + count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Thumbnail strip */}
                  {selectedMediaItems.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {selectedMediaItems.slice(0, 6).map((item, idx) => (
                        <div
                          key={item.id}
                          style={{
                            position: 'relative',
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: `2px solid ${colors.success}`,
                            flexShrink: 0,
                          }}
                        >
                          {item.mimeType?.startsWith('image/') ? (
                            <Image
                              unoptimized
                              src={item.sizes?.thumbnail?.url || item.url || ''}
                              alt={item.alt}
                              width={48}
                              height={48}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: colors.cardBg,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              color: colors.textMuted,
                            }}>
                              {idx + 1}
                            </div>
                          )}
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: colors.white,
                            lineHeight: 1,
                          }}>
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                      {selectedMediaItems.length > 6 && (
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          border: `2px solid ${colors.borderLight}`,
                          backgroundColor: colors.cardBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: colors.textSecondary,
                          flexShrink: 0,
                        }}>
                          +{selectedMediaItems.length - 6}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
                      {selectedMediaItems.length === 0
                        ? 'No images selected'
                        : `${selectedMediaItems.length} image${selectedMediaItems.length !== 1 ? 's' : ''} selected`}
                    </p>
                    <p style={{ fontSize: '13px', color: colors.textSecondary, margin: '2px 0 0' }}>
                      {selectedMediaItems.length === 0
                        ? 'Click images to select them'
                        : 'Images will be added in selection order'}
                    </p>
                  </div>
                </div>

                {/* Right: actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  {selectedMediaItems.length > 0 && (
                    <button
                      onClick={clearMediaSelection}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '10px',
                        border: `1px solid ${colors.border}`,
                        backgroundColor: colors.cardBg,
                        color: colors.textSecondary,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.error
                        e.currentTarget.style.color = colors.error
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = colors.border
                        e.currentTarget.style.color = colors.textSecondary
                      }}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={handleConfirmMultiple}
                    disabled={selectedMediaItems.length === 0}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 28px',
                      fontSize: '15px',
                      fontWeight: 700,
                      borderRadius: '12px',
                      border: 'none',
                      background: selectedMediaItems.length === 0
                        ? colors.textMuted
                        : `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
                      color: colors.white,
                      cursor: selectedMediaItems.length === 0 ? 'not-allowed' : 'pointer',
                      opacity: selectedMediaItems.length === 0 ? 0.5 : 1,
                      boxShadow: selectedMediaItems.length === 0 ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.4)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedMediaItems.length > 0) {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.5)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = selectedMediaItems.length === 0 ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {selectedMediaItems.length === 0
                      ? 'Select images first'
                      : `Add ${selectedMediaItems.length} to Gallery`}
                  </button>
                </div>
              </div>
            )}

            {/* Footer - Selected Media (single-select mode) */}
            {!isMultiSelectMode && selectedMedia && (
              <div
                style={{
                  flexShrink: 0,
                  padding: '24px 32px',
                  backgroundColor: colors.headerBg,
                  borderTop: `1px solid ${colors.border}`,
                  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onDoubleClick={() => setEditingMedia(selectedMedia)}
                  title="Double-click to edit metadata"
                >
                  {/* Left: Thumbnail + Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {selectedMedia.mimeType?.startsWith('image/') && (
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          backgroundColor: colors.cardBg,
                          border: `2px solid ${colors.primary}`,
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                        }}
                      >
                        <Image
                          unoptimized
                          src={selectedMedia.sizes?.thumbnail?.url || selectedMedia.url || ''}
                          alt={selectedMedia.alt}
                          width={80}
                          height={80}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
                        {selectedMedia.filename}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '14px',
                          color: colors.textSecondary,
                          marginTop: '4px',
                        }}
                      >
                        {selectedMedia.width && selectedMedia.height && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                              />
                            </svg>
                            {selectedMedia.width} × {selectedMedia.height}px
                          </span>
                        )}
                        {selectedMedia.filesize > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            {formatFileSize(selectedMedia.filesize)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Select Button (Selection Mode) */}
                    {isSelectionMode && (
                      <button
                        onClick={handleSelect}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 32px',
                          fontSize: '16px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          border: 'none',
                          background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
                          color: colors.white,
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)'
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)'
                        }}
                      >
                        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Select This Media
                      </button>
                    )}

                    {/* Move to Folder (Browse Mode) */}
                    {!isSelectionMode && (
                      <div style={{ position: 'relative' }}>
                        <button
                          onClick={() => setShowMoveMenu(!showMoveMenu)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 20px',
                            fontSize: '14px',
                            fontWeight: 600,
                            borderRadius: '12px',
                            backgroundColor: colors.cardBg,
                            border: `1px solid ${colors.border}`,
                            color: colors.textSecondary,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.hoverBg
                            e.currentTarget.style.borderColor = colors.gold
                            e.currentTarget.style.color = colors.gold
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.cardBg
                            e.currentTarget.style.borderColor = colors.border
                            e.currentTarget.style.color = colors.textSecondary
                          }}
                        >
                          <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                          </svg>
                          Move
                        </button>

                        {/* Move Menu */}
                        {showMoveMenu && (
                          <>
                            <div
                              onClick={() => setShowMoveMenu(false)}
                              style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 10,
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                bottom: '100%',
                                right: 0,
                                marginBottom: '12px',
                                width: '288px',
                                borderRadius: '16px',
                                backgroundColor: colors.cardBg,
                                border: `1px solid ${colors.border}`,
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                                padding: '8px',
                                zIndex: 20,
                                maxHeight: '320px',
                                overflowY: 'auto',
                              }}
                            >
                              <button
                                onClick={() => handleMoveToFolder(null)}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  padding: '14px 20px',
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  borderRadius: '8px',
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: colors.textSecondary,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = colors.hoverBg
                                  e.currentTarget.style.color = colors.textPrimary
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent'
                                  e.currentTarget.style.color = colors.textSecondary
                                }}
                              >
                                <svg
                                  style={{ width: '20px', height: '20px', color: colors.textMuted }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                Root (No folder)
                              </button>
                              <div style={{ height: '1px', backgroundColor: colors.border, margin: '8px 0' }} />
                              {folders.map((folder) => (
                                <button
                                  key={folder.id}
                                  onClick={() => handleMoveToFolder(folder.id)}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 20px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    borderRadius: '8px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: colors.textSecondary,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = colors.hoverBg
                                    e.currentTarget.style.color = colors.gold
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent'
                                    e.currentTarget.style.color = colors.textSecondary
                                  }}
                                >
                                  <svg style={{ width: '20px', height: '20px', color: colors.gold }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 7V17a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6.586a1 1 0 01-.707-.293L10 5H5a2 2 0 00-2 2z" />
                                  </svg>
                                  {folder.name}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Edit Metadata */}
                    <button
                      onClick={() => setEditingMedia(selectedMedia)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        border: 'none',
                        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentHover} 100%)`,
                        color: colors.white,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Metadata
                    </button>

                    {/* Copy URL */}
                    <button
                      onClick={() => copyPublicUrl(selectedMedia.url)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        color: colors.textSecondary,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.hoverBg
                        e.currentTarget.style.borderColor = colors.primary
                        e.currentTarget.style.color = colors.primaryLight
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.cardBg
                        e.currentTarget.style.borderColor = colors.border
                        e.currentTarget.style.color = colors.textSecondary
                      }}
                    >
                      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy URL
                    </button>

                    {/* Open in New Tab */}
                    <a
                      href={selectedMedia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        textDecoration: 'none',
                        background: `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.hoverBg} 100%)`,
                        border: `1px solid ${colors.border}`,
                        color: colors.textPrimary,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`
                        e.currentTarget.style.borderColor = colors.primary
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.background = `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.hoverBg} 100%)`
                        e.currentTarget.style.borderColor = colors.border
                      }}
                    >
                      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Open
                    </a>
                  </div>
                </div>

                {/* Tags Row */}
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: `1px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    minHeight: '32px',
                  }}
                >
                  {/* Label */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: colors.textMuted,
                      flexShrink: 0,
                      marginRight: '4px',
                    }}
                  >
                    <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Tags
                    </span>
                  </div>

                  {/* Tag pills */}
                  {footerTags.map((tag, i) =>
                    editingTagIndex === i ? (
                      <input
                        key={i}
                        value={editingTagValue}
                        onChange={(e) => setEditingTagValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); void commitEditTag(i) }
                          if (e.key === 'Escape') setEditingTagIndex(null)
                        }}
                        onBlur={() => void commitEditTag(i)}
                        autoFocus
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: `1px solid ${colors.primary}`,
                          backgroundColor: colors.inputBg,
                          color: colors.textPrimary,
                          outline: 'none',
                          width: `${Math.max(60, editingTagValue.length * 8)}px`,
                          minWidth: '60px',
                          maxWidth: '160px',
                        }}
                      />
                    ) : (
                      <div
                        key={i}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 6px 3px 8px',
                          borderRadius: '6px',
                          backgroundColor: colors.cardBg,
                          border: `1px solid ${colors.borderLight}`,
                          fontSize: '12px',
                          fontWeight: 500,
                          color: colors.textSecondary,
                        }}
                      >
                        <span
                          onClick={() => startEditTag(i, tag)}
                          title="Click to edit"
                          style={{ cursor: 'text', userSelect: 'none' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = colors.textPrimary }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary }}
                        >
                          {tag}
                        </span>
                        <button
                          onClick={() => void removeFooterTag(i)}
                          title="Remove tag"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '14px',
                            height: '14px',
                            borderRadius: '3px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: colors.textMuted,
                            cursor: 'pointer',
                            padding: 0,
                            lineHeight: 1,
                            fontSize: '13px',
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.errorBg
                            e.currentTarget.style.color = colors.error
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = colors.textMuted
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}

                  {/* Add tag input */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      value={footerTagInput}
                      onChange={(e) => setFooterTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); void addFooterTag() }
                      }}
                      placeholder={footerTags.length === 0 ? 'Add a tag...' : 'Add tag...'}
                      style={{
                        fontSize: '12px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${footerTagInput ? colors.borderFocus : colors.border}`,
                        backgroundColor: 'transparent',
                        color: colors.textPrimary,
                        outline: 'none',
                        width: footerTagInput ? `${Math.max(80, footerTagInput.length * 8)}px` : '90px',
                        transition: 'border-color 0.15s ease, width 0.1s ease',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = colors.borderFocus }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = footerTagInput ? colors.borderFocus : colors.border }}
                    />
                    {footerTagInput.trim() && (
                      <button
                        onClick={() => void addFooterTag()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: colors.primary,
                          color: colors.white,
                          cursor: 'pointer',
                          fontSize: '16px',
                          lineHeight: 1,
                          flexShrink: 0,
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primaryHover }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.primary }}
                        title="Add tag"
                      >
                        +
                      </button>
                    )}
                  </div>

                  {/* Saving indicator */}
                  {isSavingTags && (
                    <span style={{ fontSize: '11px', color: colors.textMuted, marginLeft: '4px' }}>
                      Saving...
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Editor - Always rendered when editingFile exists, independent of modal */}
      {editingFile && (
        <ImageEditor
          file={editingFile}
          onSave={(editedFile) => {
            // If editing existing media, update it directly (skip metadata form)
            if (editingMediaId) {
              console.log('✅ [IMAGE EDITOR] Updating existing media item:', editingMediaId)
              uploadEditedFile(editedFile)
            } else {
              // New upload - go through metadata form
              console.log('✅ [IMAGE EDITOR] Save clicked, moving to metadata')
              moveToMetadataEditing(editedFile)
            }
          }}
          onCancel={() => {
            console.log('❌ [IMAGE EDITOR] Cancel clicked')
            if (pendingFiles.length > 1) {
              skipEditing()
            } else {
              setEditingFile(null)
            }
          }}
        />
      )}

      {/* Metadata Form - Always rendered when metadataEditingFile exists, independent of modal */}
      {metadataEditingFile && (
        <MediaUploadMetadataForm
          file={metadataEditingFile}
          onUpload={(metadata) => {
            console.log('✅ [METADATA FORM] Upload clicked')
            uploadWithMetadata(metadataEditingFile, metadata)
          }}
          onCancel={() => {
            console.log('❌ [METADATA FORM] Cancel clicked')
            if (pendingFiles.length > 1) {
              skipEditing()
            } else {
              setMetadataEditingFile(null)
            }
          }}
        />
      )}

      {/* Media Edit Panel - Always rendered when editingMedia exists, independent of modal */}
      {editingMedia && <MediaEditPanel key={editingMedia.id} media={editingMedia} onClose={() => setEditingMedia(null)} />}

      {/* Batch Review Screen - shown when multiple files are selected for upload */}
      {batchReviewFiles.length > 0 && <MediaBatchReviewScreen />}

      {/* Toast Notifications - Always rendered */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Keyframes for animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  )
}

/**
 * Format file size in human readable format
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

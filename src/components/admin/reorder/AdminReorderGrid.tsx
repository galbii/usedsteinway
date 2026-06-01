'use client'

import { useState, type ReactNode } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { SortableItemShell } from './SortableItemShell'

export interface ReorderItem {
  id: string | number
  priority?: number | null
}

interface AdminReorderGridProps<T extends ReorderItem> {
  items: T[]
  collection: string
  priorityField?: string
  renderCardBody: (item: T) => ReactNode
  onSaved: (updated: T[]) => void
  onCancel: () => void
  title?: string
  description?: string
  gridClassName?: string
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export function AdminReorderGrid<T extends ReorderItem>({
  items: initialItems,
  collection,
  priorityField = 'priority',
  renderCardBody,
  onSaved,
  onCancel,
  title = 'Drag cards to set display order',
  description = 'Filters are disabled while reordering. Click Save to apply or Cancel to discard.',
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6',
}: AdminReorderGridProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  const isDirty = items.some((item, idx) => initialItems[idx]?.id !== item.id)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = items.findIndex((item) => item.id === active.id)
    const newIdx = items.findIndex((item) => item.id === over.id)
    if (oldIdx < 0 || newIdx < 0) return
    setItems((prev) => arrayMove(prev, oldIdx, newIdx))
  }

  async function handleSave() {
    if (!isDirty) {
      onCancel()
      return
    }
    setSaveState('saving')
    try {
      const updates = items
        .map((item, idx) => ({ item, newPriority: idx + 1 }))
        .filter(({ item, newPriority }) => item.priority !== newPriority)

      const responses = await Promise.all(
        updates.map(({ item, newPriority }) =>
          fetch(`/api/${collection}/${item.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [priorityField]: newPriority }),
          }),
        ),
      )

      if (responses.some((r) => !r.ok)) throw new Error('Some updates failed')

      const updated = items.map((item, idx) => ({ ...item, [priorityField]: idx + 1 })) as T[]
      setItems(updated)
      setSaveState('saved')
      onSaved(updated)
    } catch {
      setSaveState('error')
    }
  }

  return (
    <section className="bg-piano-cream min-h-screen">
      <div className="max-w-7xl mx-auto" style={{ padding: '2.5rem 2.5rem 8rem' }}>
        <div className="mb-6">
          <p
            className="font-display uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.42em',
              color: 'hsl(40, 72%, 38%)',
              marginBottom: '0.5rem',
            }}
          >
            Reorder Mode
          </p>
          <h2
            className="font-cormorant font-light text-piano-black"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', lineHeight: 1.1 }}
          >
            {title}
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'hsl(25, 4%, 42%)' }}>
            {description}
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'hsl(25, 4%, 42%)' }}>
            Nothing to reorder.
          </p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
              <div className={gridClassName}>
                {items.map((item, idx) => (
                  <SortableItemShell key={item.id} id={item.id} position={idx + 1}>
                    {renderCardBody(item)}
                  </SortableItemShell>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-piano-black"
        style={{
          borderTop: '1px solid rgba(184, 134, 57, 0.35)',
          boxShadow: '0 -8px 24px rgba(0,0,0,0.18)',
        }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between gap-4"
          style={{ padding: '1rem 2.5rem' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-display uppercase"
              style={{
                fontSize: '10px',
                letterSpacing: '0.4em',
                color: 'rgba(245, 235, 220, 0.6)',
              }}
            >
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
            {isDirty && saveState === 'idle' && (
              <span style={{ fontSize: '12px', color: 'hsl(40, 72%, 60%)' }}>
                · Unsaved changes
              </span>
            )}
            {saveState === 'saved' && (
              <span style={{ fontSize: '12px', color: 'hsl(142, 55%, 60%)' }}>
                ✓ Order saved
              </span>
            )}
            {saveState === 'error' && (
              <span style={{ fontSize: '12px', color: 'hsl(0, 70%, 65%)' }}>
                Save failed — try again
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={saveState === 'saving'}
              className="font-display uppercase px-4 py-2.5 transition-colors"
              style={{
                fontSize: '11px',
                letterSpacing: '0.32em',
                color: 'rgba(245, 235, 220, 0.7)',
                border: '1px solid rgba(245, 235, 220, 0.18)',
                cursor: saveState === 'saving' ? 'default' : 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === 'saving' || !isDirty}
              className="font-display uppercase px-5 py-2.5 transition-colors"
              style={{
                fontSize: '11px',
                letterSpacing: '0.32em',
                color: 'hsl(25, 6%, 9%)',
                backgroundColor:
                  saveState === 'saving' || !isDirty
                    ? 'hsla(40, 72%, 52%, 0.5)'
                    : 'hsl(40, 72%, 52%)',
                cursor: saveState === 'saving' || !isDirty ? 'default' : 'pointer',
              }}
            >
              {saveState === 'saving' ? 'Saving…' : 'Save Order'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

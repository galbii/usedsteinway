'use client'

import { type ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface SortableItemShellProps {
  id: string | number
  position: number
  children: ReactNode
}

export function SortableItemShell({ id, position, children }: SortableItemShellProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging
          ? '0 12px 40px rgba(0,0,0,0.22)'
          : '0 1px 4px hsla(25, 6%, 9%, 0.05), 0 2px 12px hsla(25, 6%, 9%, 0.04)',
        backgroundColor: 'white',
        border: isDragging ? '1px solid hsl(40, 72%, 52%)' : '1px solid transparent',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        position: 'relative',
        zIndex: isDragging ? 10 : 'auto',
      }}
      {...attributes}
      {...listeners}
    >
      <div
        className="absolute top-3 left-3 z-10 flex items-center gap-1.5 font-display"
        style={{
          fontSize: '10px',
          letterSpacing: '0.28em',
          padding: '0.35rem 0.65rem',
          backgroundColor: 'rgba(25, 6%, 9%, 0.78)',
          backdropFilter: 'blur(8px)',
          color: 'hsl(40, 72%, 70%)',
        }}
      >
        <GripVertical size={11} />#{position}
      </div>
      {children}
    </div>
  )
}

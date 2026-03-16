import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      className={clsx(className)}
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '1.15rem',
        fontWeight: 400,
        letterSpacing: '0.04em',
        color: 'hsl(40 33% 99%)',
      }}
    >
      UsedSteinways
      <span style={{ color: 'hsl(40 46% 56%)' }}>.com</span>
    </span>
  )
}

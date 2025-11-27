import * as React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: number | string
  className?: string
}

export default function ResponsiveGrid({
  children,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className
}: ResponsiveGridProps) {
  const getGridCols = () => {
    const classes = []
    
    if (cols.default) classes.push(`grid-cols-${cols.default}`)
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`)
    
    return classes.join(' ')
  }

  const gapClass = typeof gap === 'number' ? `gap-${gap}` : gap

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      gapClass,
      className
    )}>
      {children}
    </div>
  )
}
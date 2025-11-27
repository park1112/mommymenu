import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonGroupOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  color?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[]
  value?: string
  onChange?: (value: string) => void
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export default function ButtonGroup({
  options,
  value,
  onChange,
  columns = 'auto',
  size = 'md',
  className,
  disabled = false
}: ButtonGroupProps) {
  const gridCols = columns === 'auto' 
    ? options.length <= 2 ? 'grid-cols-2' 
    : options.length <= 3 ? 'grid-cols-3'
    : 'grid-cols-2 md:grid-cols-4'
    : `grid-cols-${columns}`

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  }

  const colorClasses = {
    default: 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300',
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    red: 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
    yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
    purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
  }

  return (
    <div className={cn(`grid ${gridCols} gap-2`, className)}>
      {options.map((option) => {
        const isSelected = value === option.value
        const selectedColor = option.color || 'default'
        
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            className={cn(
              'border rounded-lg text-center transition-all duration-200',
              'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2',
              sizeClasses[size],
              isSelected
                ? cn('border-2', colorClasses[selectedColor])
                : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800',
              disabled && 'opacity-50 cursor-not-allowed hover:shadow-none',
              'focus:ring-primary-500'
            )}
            onClick={() => !disabled && onChange?.(option.value)}
          >
            {option.icon && (
              <div className="flex justify-center mb-2">
                {option.icon}
              </div>
            )}
            <div className="font-medium">
              {option.label}
            </div>
            {option.description && (
              <div className="text-xs mt-1 opacity-75">
                {option.description}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
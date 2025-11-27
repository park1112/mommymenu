'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  onChange?: (value: string) => void  // Alternative prop name for compatibility
  children?: React.ReactNode
  className?: string
  placeholder?: string
  options?: Array<{ value: string; label: string }>  // Allow passing options directly
}

export function SimpleSelect({ 
  value, 
  onValueChange,
  onChange, 
  children,
  className,
  placeholder = "Select an option",
  options: propOptions
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  // Use provided options or extract from children
  const options = propOptions || React.Children.toArray(children)
    .filter((child): child is React.ReactElement => 
      React.isValidElement(child) && child.type === SimpleSelectOption
    )
    .map(child => ({
      value: (child as any).props?.value || '',
      label: (child as any).props?.children || ''
    }))

  const selectedOption = options.find(opt => opt.value === value)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    if (onValueChange) {
      onValueChange(optionValue)
    }
    if (onChange) {
      onChange(optionValue)
    }
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "dark:border-gray-600 dark:bg-gray-800"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md",
          "border border-gray-200 bg-white shadow-lg",
          "dark:border-gray-700 dark:bg-gray-800"
        )}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative cursor-pointer px-3 py-2 text-sm",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                value === option.value && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface SimpleSelectOptionProps {
  value: string
  children: React.ReactNode
}

export function SimpleSelectOption({ children }: SimpleSelectOptionProps) {
  return <>{children}</>
}

export default SimpleSelect
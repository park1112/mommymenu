'use client'

import * as React from 'react'
import { Search, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'

interface SearchableSelectProps<T> {
  items: T[]
  value: T | null
  onChange: (value: T | null) => void
  getLabel: (item: T) => string
  getKey: (item: T) => string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode
}

export default function SearchableSelect<T>({
  items,
  value,
  onChange,
  getLabel,
  getKey,
  placeholder = "선택하세요",
  searchPlaceholder = "검색...",
  emptyMessage = "검색 결과가 없습니다",
  className,
  disabled = false,
  renderItem
}: SearchableSelectProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // 외부 클릭 감지
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 검색 필터링
  const filteredItems = React.useMemo(() => {
    if (!searchTerm) return items
    
    const term = searchTerm.toLowerCase()
    return items.filter(item => 
      getLabel(item).toLowerCase().includes(term)
    )
  }, [items, searchTerm, getLabel])

  const handleSelect = (item: T) => {
    onChange(item)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setSearchTerm('')
  }

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* 선택 버튼 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 text-left",
          "bg-white dark:bg-neutral-800",
          "border border-neutral-200 dark:border-neutral-700",
          "rounded-lg",
          "hover:border-neutral-300 dark:hover:border-neutral-600",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
          "transition-all duration-200",
          "flex items-center justify-between",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className={cn(
          "truncate",
          value ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400"
        )}>
          {value ? getLabel(value) : placeholder}
        </span>
        <div className="flex items-center gap-2">
          {value && !disabled && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          )}
          <Search className="w-4 h-4 text-neutral-400" />
        </div>
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div className={cn(
          "absolute z-50 w-full mt-2",
          "bg-white dark:bg-neutral-800",
          "border border-neutral-200 dark:border-neutral-700",
          "rounded-lg shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}>
          {/* 검색 입력 */}
          <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className={cn(
                  "w-full pl-10 pr-4 py-2",
                  "bg-neutral-50 dark:bg-neutral-900",
                  "border border-neutral-200 dark:border-neutral-700",
                  "rounded-lg",
                  "text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
                  "placeholder:text-neutral-400"
                )}
              />
            </div>
          </div>

          {/* 아이템 목록 */}
          <div className="max-h-60 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                {emptyMessage}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => {
                  const key = getKey(item)
                  const isSelected = value && getKey(value) === key
                  
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "w-full px-3 py-2.5 text-left",
                        "rounded-lg",
                        "transition-all duration-200",
                        "flex items-center justify-between",
                        isSelected
                          ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                      )}
                    >
                      {renderItem ? (
                        renderItem(item, !!isSelected)
                      ) : (
                        <>
                          <span className="truncate">{getLabel(item)}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 flex-shrink-0 ml-2" />
                          )}
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
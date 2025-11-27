'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface ThemeSwitcherProps {
  variant?: 'default' | 'compact' | 'expanded'
  showLabel?: boolean
  className?: string
}

export default function ThemeSwitcher({ 
  variant = 'default',
  showLabel = false,
  className 
}: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const themes = [
    { value: 'light', label: '라이트', icon: Sun, color: 'text-amber-500' },
    { value: 'dark', label: '다크', icon: Moon, color: 'text-blue-500' },
    { value: 'system', label: '시스템', icon: Monitor, color: 'text-gray-500' }
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[0]

  if (variant === 'compact') {
    return (
      <button
        onClick={() => {
          const nextTheme = theme === 'dark' ? 'light' : 'dark'
          setTheme(nextTheme)
        }}
        className={cn(
          "relative group p-2 rounded-lg",
          "bg-gray-100 dark:bg-gray-800",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "transition-all duration-200",
          "border border-gray-200 dark:border-gray-700",
          className
        )}
        aria-label="테마 변경"
      >
        <div className="relative w-5 h-5">
          <Sun className={cn(
            "absolute inset-0 h-5 w-5 transition-all",
            "text-amber-500",
            resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
          )} />
          <Moon className={cn(
            "absolute inset-0 h-5 w-5 transition-all",
            "text-blue-500",
            resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
          )} />
        </div>
        {showLabel && (
          <span className="sr-only">
            {resolvedTheme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
          </span>
        )}
      </button>
    )
  }

  if (variant === 'expanded') {
    return (
      <div className={cn(
        "flex items-center gap-1 p-1",
        "bg-gray-100 dark:bg-gray-800",
        "rounded-lg border border-gray-200 dark:border-gray-700",
        className
      )}>
        {themes.map((t) => {
          const Icon = t.icon
          const isActive = theme === t.value
          return (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md",
                "transition-all duration-200",
                "text-sm font-medium",
                isActive ? [
                  "bg-white dark:bg-gray-900",
                  "text-gray-900 dark:text-gray-100",
                  "shadow-sm"
                ] : [
                  "text-gray-600 dark:text-gray-400",
                  "hover:text-gray-900 dark:hover:text-gray-100"
                ]
              )}
            >
              <Icon className={cn("h-4 w-4", t.color)} />
              {showLabel && <span>{t.label}</span>}
            </button>
          )
        })}
      </div>
    )
  }

  // Default dropdown variant
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2",
          "bg-gray-100 dark:bg-gray-800",
          "hover:bg-gray-200 dark:hover:bg-gray-700",
          "rounded-lg transition-all duration-200",
          "border border-gray-200 dark:border-gray-700",
          "text-gray-700 dark:text-gray-300"
        )}
      >
        <currentTheme.icon className={cn("h-4 w-4", currentTheme.color)} />
        {showLabel && (
          <span className="text-sm font-medium">{currentTheme.label}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={cn(
            "absolute right-0 mt-2 w-36 z-50",
            "bg-white dark:bg-gray-800",
            "rounded-lg shadow-lg",
            "border border-gray-200 dark:border-gray-700",
            "py-1 overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}>
            {themes.map((t) => {
              const Icon = t.icon
              const isActive = theme === t.value
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2",
                    "text-sm transition-colors",
                    isActive ? [
                      "bg-gray-100 dark:bg-gray-700",
                      "text-gray-900 dark:text-gray-100"
                    ] : [
                      "text-gray-600 dark:text-gray-400",
                      "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                      "hover:text-gray-900 dark:hover:text-gray-100"
                    ]
                  )}
                >
                  <Icon className={cn("h-4 w-4", t.color)} />
                  <span>{t.label}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-green-500" />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
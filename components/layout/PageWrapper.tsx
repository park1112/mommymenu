'use client'

import * as React from 'react'
import { useDevice } from '@/hooks/useDevice'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export default function PageWrapper({ 
  children, 
  title, 
  subtitle, 
  actions,
  className 
}: PageWrapperProps) {
  const { isMobile, isTablet, isDesktop } = useDevice()

  // Mobile layout
  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        {(title || subtitle) && (
          <div className="space-y-1">
            {title && (
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        )}
        {actions && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {actions}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    )
  }

  // Tablet layout
  if (isTablet) {
    return (
      <div className={cn("space-y-6", className)}>
        {(title || subtitle || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && (
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex gap-3">
                {actions}
              </div>
            )}
          </div>
        )}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div className={cn("space-y-8", className)}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex gap-4">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="space-y-8">
        {children}
      </div>
    </div>
  )
}
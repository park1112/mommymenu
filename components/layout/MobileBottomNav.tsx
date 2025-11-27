'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, TruckIcon, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/products', icon: Package, label: '제품' },
    { href: '/shipments', icon: TruckIcon, label: '출고' },
    { href: '/inventory', icon: BarChart3, label: '재고' },
    { href: '/settings', icon: Settings, label: '설정' }
  ]

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-40",
      "bg-white dark:bg-gray-800",
      "border-t border-gray-200 dark:border-gray-700",
      "lg:hidden",
      "safe-area-bottom" // For iOS safe area
    )}>
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                "transition-all duration-200",
                "relative group",
                isActive ? [
                  "text-blue-600 dark:text-blue-400"
                ] : [
                  "text-gray-600 dark:text-gray-400",
                  "hover:text-blue-600 dark:hover:text-blue-400"
                ]
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
              
              <Icon className={cn(
                "h-5 w-5 mb-1",
                "transition-transform duration-200",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{item.label}</span>
              
              {/* Touch feedback ripple effect */}
              <div className={cn(
                "absolute inset-0",
                "bg-gray-100 dark:bg-gray-700",
                "opacity-0 group-active:opacity-20",
                "transition-opacity duration-150"
              )} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
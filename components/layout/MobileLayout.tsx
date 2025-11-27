'use client'

import * as React from 'react'
import { Menu, Search, Bell, User, Home, Package, TruckIcon, BarChart3, Plus, Layers, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from '@/components/ui/theme-switcher/ThemeSwitcher'
import { cn } from '@/lib/utils'

interface MobileLayoutProps {
  children: React.ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname()
  const [showSearch, setShowSearch] = React.useState(false)
  const [showNotifications, setShowNotifications] = React.useState(false)

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/products', icon: Package, label: '제품' },
    { href: '/shipments', icon: TruckIcon, label: '출고' },
    { href: '/inventory', icon: BarChart3, label: '재고' },
    { href: '/docs', icon: BookOpen, label: '문서' },
    { href: '/components', icon: Layers, label: '컴포넌트' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 dark:bg-primary-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              📦
            </div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">재고관리</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher variant="compact" />
            
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </button>
            
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="p-4 pt-0 animate-slide-down">
            <input
              type="text"
              placeholder="검색..."
              className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3373BA]"
              autoFocus
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 relative",
                  "transition-all duration-200",
                  isActive ? [
                    "text-primary-500 dark:text-primary-400"
                  ] : [
                    "text-neutral-600 dark:text-neutral-400",
                    "active:scale-95"
                  ]
                )}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-500 dark:bg-primary-400 rounded-full" />
                )}
                
                <div className={cn(
                  "p-1 rounded-lg transition-all duration-200",
                  isActive && "bg-primary-500/10 dark:bg-primary-400/20"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    isActive && "scale-110"
                  )} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <Link
        href="/shipments/new"
        className="fixed bottom-24 right-4 z-30 w-14 h-14 bg-primary-500 dark:bg-primary-400 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
      >
        <Plus className="w-6 h-6" />
      </Link>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowNotifications(false)}
          />
          <div className="fixed top-16 right-4 left-4 z-50 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 animate-slide-down">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">알림</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">재고 부족 경고</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">노트북 스탠드 재고 부족</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">5분 전</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
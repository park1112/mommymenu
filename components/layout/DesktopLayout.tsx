'use client'

import * as React from 'react'
import { Package, TruckIcon, BarChart3, Home, Settings, Bell, Search, ChevronLeft, ChevronDown, Calendar, Download, Filter, Layers, BookOpen, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from '@/components/ui/theme-switcher/ThemeSwitcher'
import { cn } from '@/lib/utils'

interface DesktopLayoutProps {
  children: React.ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const [showNotifications, setShowNotifications] = React.useState(false)

  const navItems = [
    { href: '/', icon: Home, label: '대시보드', badge: null },
    { href: '/products', icon: Package, label: '제품 관리', badge: '152' },
    { href: '/shipments', icon: TruckIcon, label: '출고 관리', badge: '8' },
    { href: '/settlements', icon: DollarSign, label: '정산 관리', badge: null },
    { href: '/inventory', icon: BarChart3, label: '재고 현황', badge: null },
    { href: '/docs', icon: BookOpen, label: '사용 설명서', badge: 'New' },
    { href: '/components', icon: Layers, label: '컴포넌트', badge: null },
    { href: '/settings', icon: Settings, label: '설정', badge: null },
  ]

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className={cn(
        "relative flex flex-col transition-all duration-300 ease-in-out",
        "bg-white dark:bg-neutral-800",
        "border-r border-neutral-200 dark:border-neutral-700",
        "shadow-xl",
        sidebarCollapsed ? "w-20" : "w-72"
      )}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-500 dark:bg-primary-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              📦
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  재고관리
                </h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Inventory</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ChevronLeft className={cn(
              "w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform",
              sidebarCollapsed && "rotate-180"
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "relative group",
                    isActive ? [
                      "bg-primary-500/10 dark:bg-primary-400/20",
                      "text-primary-600 dark:text-primary-400",
                      "shadow-sm"
                    ] : [
                      "text-neutral-700 dark:text-neutral-300",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      "hover:text-neutral-900 dark:hover:text-neutral-100"
                    ]
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 dark:bg-primary-400 rounded-r-full" />
                  )}
                  
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive && "scale-110"
                  )} />
                  
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          "bg-neutral-100 dark:bg-neutral-800",
                          "text-neutral-600 dark:text-neutral-400"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Section */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-500 dark:bg-primary-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  관
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">관리자</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">admin@company.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="h-full flex items-center justify-between px-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색 (제품명, SKU, 카테고리...)"
                  className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-8">
              {/* Theme Switcher - Now Visible! */}
              <ThemeSwitcher variant="expanded" showLabel />

              {/* Quick Actions */}
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <button className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 animate-slide-down">
                    <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">알림</h3>
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-full">3 새로운</span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                              ⚠️
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">재고 부족 경고</p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">노트북 스탠드의 재고가 최소 수량 이하입니다.</p>
                              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">{i * 5}분 전</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                      <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        모든 알림 보기
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    관
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 animate-slide-down overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          관
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">관리자</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">admin@company.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        프로필 설정
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        계정 설정
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-800" />
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
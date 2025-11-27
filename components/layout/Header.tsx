'use client'

import * as React from 'react'
import { Bell, User, Search, Menu } from 'lucide-react'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import ThemeSwitcher from '@/components/ui/theme-switcher/ThemeSwitcher'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuClick?: () => void
  className?: string
}

export default function Header({ onMenuClick, className }: HeaderProps) {
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)

  return (
    <header className={cn(
      'h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6',
      'flex items-center justify-between',
      className
    )}>
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색 (제품명, SKU, 카테고리...)"
              className="w-64 lg:w-96 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <div className="hidden sm:block">
          <ThemeSwitcher variant="expanded" />
        </div>
        <div className="sm:hidden">
          <ThemeSwitcher variant="compact" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">알림</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">재고 부족 경고</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">노트북 스탠드의 재고가 최소 수량 이하입니다.</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">5분 전</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">새 출고 요청</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ABC 회사에서 제품 출고를 요청했습니다.</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1시간 전</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="sm" fullWidth>
                  모든 알림 보기
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              관
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">관리자</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@company.com</p>
            </div>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                  프로필
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                  설정
                </button>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
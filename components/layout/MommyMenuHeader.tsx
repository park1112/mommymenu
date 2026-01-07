'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Settings, User, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NotificationCenter } from '@/components/notifications/NotificationCenter'
import { ThemeToggle } from '@/components/ui/theme-toggle/ThemeToggle'
import { usePregnancy } from '@/components/providers'

interface MommyMenuHeaderProps {
  isMobile?: boolean
  onMenuClick?: () => void
}

interface ProfileData {
  name: string
  avatarUrl: string
}

export function MommyMenuHeader({ isMobile, onMenuClick }: MommyMenuHeaderProps) {
  const router = useRouter()
  const { pregnancyInfo } = usePregnancy()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({ name: '', avatarUrl: '' })
  const menuRef = useRef<HTMLDivElement>(null)

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('mommymenu-profile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        setProfile({
          name: parsed.name || '',
          avatarUrl: parsed.avatarUrl || ''
        })
      } catch (e) {
        // Use defaults
      }
    }

    // Listen for profile updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mommymenu-profile' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setProfile({
            name: parsed.name || '',
            avatarUrl: parsed.avatarUrl || ''
          })
        } catch (e) {
          // Ignore
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    // Clear auth-related data (keep user preferences)
    localStorage.removeItem('mommymenu-auth')
    setShowProfileMenu(false)
    router.push('/login')
  }

  const handleNavigateToProfile = () => {
    setShowProfileMenu(false)
    router.push('/dashboard/profile')
  }

  const handleNavigateToSettings = () => {
    router.push('/dashboard/settings')
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="flex items-center space-x-2">
          <div className="text-2xl">🤱</div>
          <span className="font-semibold text-xl text-pink-600 dark:text-pink-400">MommyMenu</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {!isMobile && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            임신 <span className="font-semibold text-pink-600 dark:text-pink-400">{pregnancyInfo.currentWeek}주 {pregnancyInfo.currentDay}일</span>
          </div>
        )}

        <ThemeToggle />

        <NotificationCenter />

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile.avatarUrl || undefined} />
              <AvatarFallback className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400">
                {profile.name?.[0] || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            {!isMobile && (
              <>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[80px] truncate">
                  {profile.name || '사용자'}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {profile.name || '사용자'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  임신 {pregnancyInfo.currentWeek}주차
                </p>
              </div>

              <button
                onClick={handleNavigateToProfile}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <User className="h-4 w-4 mr-3" />
                내 프로필
              </button>

              <button
                onClick={handleNavigateToSettings}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="h-4 w-4 mr-3" />
                설정
              </button>

              <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
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

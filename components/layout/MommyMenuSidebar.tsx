'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  UtensilsCrossed, 
  BarChart3, 
  Users, 
  User, 
  Baby,
  BookOpen,
  Settings,
  X,
  Sparkles,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface MommyMenuSidebarProps {
  onClose?: () => void
}

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: Home, color: 'from-pink-500 to-rose-500' },
  { name: '식단 관리', href: '/dashboard/meals', icon: UtensilsCrossed, color: 'from-orange-500 to-amber-500' },
  { name: '영양 분석', href: '/dashboard/nutrition', icon: BarChart3, color: 'from-emerald-500 to-green-500' },
  { name: '커뮤니티', href: '/dashboard/community', icon: Users, color: 'from-purple-500 to-indigo-500' },
  { name: '컴포넌트', href: '/dashboard/components', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
  { name: '내 프로필', href: '/dashboard/profile', icon: User, color: 'from-pink-500 to-purple-500' },
  { name: '설정', href: '/dashboard/settings', icon: Settings, color: 'from-gray-500 to-slate-500' },
]

export function MommyMenuSidebar({ onClose }: MommyMenuSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gradient-to-b from-rose-50/30 via-pink-50/20 to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-r border-pink-200/40 dark:border-gray-700 flex flex-col backdrop-blur-sm relative overflow-hidden transition-colors">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-4 w-16 h-16 bg-gradient-to-br from-pink-200/20 to-rose-200/10 dark:from-pink-900/20 dark:to-rose-900/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-4 w-12 h-12 bg-gradient-to-br from-orange-200/15 to-amber-200/10 dark:from-orange-900/15 dark:to-amber-900/10 rounded-full blur-lg" />
      
      {/* Header with close button for mobile */}
      {onClose && (
        <div className="p-4 border-b border-pink-200/40 dark:border-gray-700 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 flex items-center justify-center">
                <Baby className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-pulse" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
              MommyMenu
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2 hover:bg-pink-100/50 dark:hover:bg-pink-900/50">
            <X className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3 relative z-10">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-400" />
            <span className="text-xs font-semibold text-pink-700 dark:text-pink-300 uppercase tracking-wide">메뉴</span>
          </div>
        </div>

        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 organic-rounded text-sm font-medium transition-all duration-300',
                'relative overflow-hidden',
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white organic-shadow-md`
                  : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100 hover:organic-shadow'
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 shimmer" />
              )}

              <div className="relative z-10 flex items-center gap-3 w-full">
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-all duration-300 group-hover:scale-110',
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                  )}
                />
                <span className="flex-1">{item.name}</span>

                {isActive && (
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Enhanced Stats Footer */}
      <div className="p-4 border-t border-pink-200/40 dark:border-gray-700 relative z-10">
        <div className="bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-orange-50/40 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-700/40 organic-rounded p-4 border border-pink-200/40 dark:border-gray-600 organic-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-pink-500 dark:text-pink-400 heartbeat" />
            <span className="text-sm font-semibold text-pink-700 dark:text-pink-300">오늘의 영양 점수</span>
          </div>

          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-pink-600 dark:text-pink-400 tabular-nums">87</span>
            <span className="text-sm text-pink-500 dark:text-pink-400 mb-1">점</span>
          </div>

          <Progress
            value={87}
            variant="feminine"
            size="sm"
            animated={true}
            glow={true}
            className="mb-2"
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-pink-600 dark:text-pink-400">목표까지</span>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">13점</span>
          </div>

          {/* Motivational message */}
          <div className="mt-3 p-2 bg-white/50 dark:bg-gray-700/50 organic-rounded border border-pink-100/50 dark:border-gray-600">
            <p className="text-xs text-pink-700 dark:text-pink-300 leading-relaxed">
              💕 오늘도 잘 하고 있어요! 조금만 더 힘내세요~
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
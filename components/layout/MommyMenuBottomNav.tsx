'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UtensilsCrossed, BarChart3, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '홈', href: '/dashboard', icon: Home },
  { name: '식단', href: '/dashboard/meals', icon: UtensilsCrossed },
  { name: '분석', href: '/dashboard/nutrition', icon: BarChart3 },
  { name: '커뮤니티', href: '/dashboard/community', icon: Users },
  { name: '내정보', href: '/dashboard/profile', icon: User },
]

export function MommyMenuBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-h-[64px] px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <item.icon 
                className={cn(
                  'h-6 w-6 mb-1',
                  isActive ? 'text-pink-600' : 'text-gray-400'
                )} 
              />
              <span className={cn(
                'text-xs font-medium',
                isActive ? 'text-pink-600' : 'text-gray-500'
              )}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-pink-600 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
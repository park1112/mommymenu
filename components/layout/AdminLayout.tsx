'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Package, Users, Settings, Database,
  Shield, Activity, AlertCircle, ChevronLeft,
  Lock, Bell, Key
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button/Button'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)

  const adminMenuItems = [
    {
      title: '대시보드',
      href: '/admin',
      icon: LayoutDashboard,
      description: '시스템 전체 현황'
    },
    {
      title: '제품 관리',
      href: '/admin/products',
      icon: Package,
      description: '제품 설정 및 카테고리'
    },
    {
      title: '사용자 관리',
      href: '/admin/users',
      icon: Users,
      description: '사용자 및 권한'
    },
    {
      title: '시스템 설정',
      href: '/admin/system',
      icon: Settings,
      description: '시스템 구성'
    },
    {
      title: '데이터베이스',
      href: '/admin/database',
      icon: Database,
      description: '데이터 관리'
    },
    {
      title: '보안',
      href: '/admin/security',
      icon: Shield,
      description: '보안 설정'
    },
    {
      title: '활동 로그',
      href: '/admin/logs',
      icon: Activity,
      description: '시스템 활동 기록'
    },
    {
      title: 'API 관리',
      href: '/admin/api',
      icon: Key,
      description: 'API 키 및 연동'
    }
  ]

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Admin Sidebar */}
      <aside className={cn(
        "bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Admin Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              <span className="font-bold text-lg">관리자 모드</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <ChevronLeft className={cn(
              "w-5 h-5 transition-transform",
              collapsed && "rotate-180"
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {adminMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
                           (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-red-600 dark:text-red-400" : "text-neutral-500"
                )} />
                {!collapsed && (
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Admin Actions */}
        {!collapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-700">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ChevronLeft className="w-4 h-4 mr-2" />
                일반 모드로 돌아가기
              </Button>
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Admin Top Bar */}
        <div className="h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold rounded">
                ADMIN
              </span>
              <span className="text-sm text-neutral-500">
                관리자 권한으로 접속 중
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
              <AlertCircle className="w-5 h-5" />
            </button>
            <div className="ml-3 pl-3 border-l border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <div className="text-sm font-medium">관리자</div>
                  <div className="text-xs text-neutral-500">admin@example.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
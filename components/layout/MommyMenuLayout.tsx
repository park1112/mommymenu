'use client'

import { useState } from 'react'
import { useDevice } from '@/hooks/useDevice'
import { MommyMenuHeader } from './MommyMenuHeader'
import { MommyMenuSidebar } from './MommyMenuSidebar'
import { MommyMenuBottomNav } from './MommyMenuBottomNav'
import { cn } from '@/lib/utils'

interface MommyMenuLayoutProps {
  children: React.ReactNode
}

export function MommyMenuLayout({ children }: MommyMenuLayoutProps) {
  const { isMobile } = useDevice()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <MommyMenuHeader 
          isMobile={true}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-auto pb-20 p-4">
          {children}
        </main>
        
        <MommyMenuBottomNav />
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-64 bg-white">
              <MommyMenuSidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <MommyMenuSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MommyMenuHeader />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
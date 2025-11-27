'use client'

import { Menu, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NotificationCenter } from '@/components/notifications/NotificationCenter'
import { usePregnancy } from '@/components/providers'

interface MommyMenuHeaderProps {
  isMobile?: boolean
  onMenuClick?: () => void
}

export function MommyMenuHeader({ isMobile, onMenuClick }: MommyMenuHeaderProps) {
  const { pregnancyInfo } = usePregnancy()
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
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
          <span className="font-semibold text-xl text-pink-600">MommyMenu</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {!isMobile && (
          <div className="text-sm text-gray-600">
            임신 <span className="font-semibold text-pink-600">{pregnancyInfo.currentWeek}주 {pregnancyInfo.currentDay}일</span>
          </div>
        )}
        
        <NotificationCenter />
        
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-pink-100 text-pink-600">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
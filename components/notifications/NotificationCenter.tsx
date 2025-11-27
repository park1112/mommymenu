'use client'

import { useState, useEffect } from 'react'
import { Bell, X, Check, Settings, Clock, Droplet, Pill, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  notificationManager, 
  Notification, 
  NotificationSchedule,
  generateSampleNotifications 
} from '@/lib/notifications'

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications')
  const [schedules, setSchedules] = useState<NotificationSchedule[]>([])

  useEffect(() => {
    // 알림 구독
    const unsubscribe = notificationManager.subscribe((newNotifications) => {
      setNotifications(newNotifications)
      setUnreadCount(notificationManager.getUnreadCount())
    })

    // 초기 샘플 알림 생성
    const sampleNotifications = generateSampleNotifications()
    sampleNotifications.forEach(notification => {
      notificationManager.addNotification(notification)
    })

    // 스케줄 로드
    setSchedules(notificationManager.getSchedules())

    // 1분마다 스케줄 체크 (실제로는 서비스 워커에서 처리)
    const interval = setInterval(() => {
      notificationManager.checkScheduledNotifications()
    }, 60000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const handleMarkAsRead = (notificationId: string) => {
    notificationManager.markAsRead(notificationId)
  }

  const handleMarkAllAsRead = () => {
    notificationManager.markAllAsRead()
  }

  const handleDelete = (notificationId: string) => {
    notificationManager.deleteNotification(notificationId)
  }

  const handleScheduleToggle = (scheduleId: string, enabled: boolean) => {
    notificationManager.updateSchedule(scheduleId, { enabled })
    setSchedules(notificationManager.getSchedules())
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'meal': return '🍽️'
      case 'water': return '💧'
      case 'supplement': return '💊'
      case 'appointment': return '📅'
      case 'health': return '❤️'
      case 'alert': return '🚨'
      default: return '📢'
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000) // 초 단위

    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
    return `${Math.floor(diff / 86400)}일 전`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="relative">
      {/* 알림 벨 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* 알림 패널 */}
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 알림 드롭다운 */}
          <Card className="absolute right-0 mt-2 w-96 max-h-[600px] shadow-xl z-50">
            {/* 헤더 */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">알림</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* 탭 */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    activeTab === 'notifications' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  알림 ({notifications.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Settings className="h-4 w-4 inline mr-1" />
                  설정
                </button>
              </div>
            </div>

            {/* 내용 */}
            <div className="overflow-y-auto max-h-[450px]">
              {activeTab === 'notifications' ? (
                <>
                  {notifications.length > 0 && unreadCount > 0 && (
                    <div className="p-2 border-b">
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-pink-600 hover:text-pink-700"
                      >
                        모두 읽음 처리
                      </button>
                    </div>
                  )}
                  
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>새로운 알림이 없습니다</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 transition-colors ${
                            !notification.isRead ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${
                                    !notification.isRead ? 'text-gray-900' : 'text-gray-600'
                                  }`}>
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {getTimeAgo(new Date(notification.time))}
                                  </p>
                                  {notification.action && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="mt-2 text-xs"
                                    >
                                      {notification.action.label}
                                    </Button>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1 ml-2">
                                  {!notification.isRead && (
                                    <button
                                      onClick={() => handleMarkAsRead(notification.id)}
                                      className="p-1 hover:bg-gray-200 rounded"
                                      title="읽음 처리"
                                    >
                                      <Check className="h-3 w-3" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDelete(notification.id)}
                                    className="p-1 hover:bg-gray-200 rounded"
                                    title="삭제"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4">
                  <h4 className="font-medium mb-3">알림 설정</h4>
                  <div className="space-y-3">
                    {schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">
                            {schedule.type === 'meal' && '🍽️'}
                            {schedule.type === 'water' && '💧'}
                            {schedule.type === 'supplement' && '💊'}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{schedule.title}</p>
                            <p className="text-xs text-gray-500">{schedule.time}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={schedule.enabled}
                            onChange={(e) => handleScheduleToggle(schedule.id, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      💡 알림을 받으려면 브라우저 알림 권한을 허용해주세요.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
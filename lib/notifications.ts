// 알림 시스템
export interface Notification {
  id: string
  type: 'meal' | 'water' | 'supplement' | 'appointment' | 'health' | 'alert'
  title: string
  message: string
  time: Date
  priority: 'low' | 'medium' | 'high'
  isRead: boolean
  action?: {
    label: string
    link?: string
    callback?: () => void
  }
}

export interface NotificationSchedule {
  id: string
  type: 'meal' | 'water' | 'supplement'
  title: string
  time: string // HH:MM format
  days: string[] // ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  enabled: boolean
}

// 기본 알림 스케줄
export const defaultNotificationSchedules: NotificationSchedule[] = [
  // 식사 알림
  {
    id: 'breakfast',
    type: 'meal',
    title: '아침 식사 시간입니다 🌅',
    time: '08:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  {
    id: 'morning-snack',
    type: 'meal',
    title: '오전 간식 시간입니다 🥛',
    time: '10:30',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  {
    id: 'lunch',
    type: 'meal',
    title: '점심 식사 시간입니다 ☀️',
    time: '12:30',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  {
    id: 'afternoon-snack',
    type: 'meal',
    title: '오후 간식 시간입니다 🍎',
    time: '15:30',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  {
    id: 'dinner',
    type: 'meal',
    title: '저녁 식사 시간입니다 🌙',
    time: '18:30',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  // 수분 섭취 알림
  {
    id: 'water-morning',
    type: 'water',
    title: '물 한 잔 마실 시간입니다 💧',
    time: '09:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  {
    id: 'water-afternoon',
    type: 'water',
    title: '수분 섭취를 잊지 마세요 💧',
    time: '14:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  {
    id: 'water-evening',
    type: 'water',
    title: '오늘의 수분 섭취량을 확인하세요 💧',
    time: '20:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  },
  // 영양제 알림
  {
    id: 'supplement-morning',
    type: 'supplement',
    title: '영양제 복용 시간입니다 💊',
    time: '08:30',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    enabled: true
  }
]

// 알림 관리 클래스
export class NotificationManager {
  private notifications: Notification[] = []
  private schedules: NotificationSchedule[] = defaultNotificationSchedules
  private subscribers: ((notifications: Notification[]) => void)[] = []

  constructor() {
    // 브라우저 알림 권한 요청
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.requestPermission()
    }
  }

  // 브라우저 알림 권한 요청
  private async requestPermission() {
    if (Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  // 알림 구독
  subscribe(callback: (notifications: Notification[]) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  // 구독자에게 알림
  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.notifications))
  }

  // 알림 추가
  addNotification(notification: Omit<Notification, 'id'>) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString()
    }
    
    this.notifications.unshift(newNotification)
    this.notifySubscribers()
    
    // 브라우저 알림 표시
    this.showBrowserNotification(newNotification)
    
    return newNotification
  }

  // 브라우저 알림 표시
  private showBrowserNotification(notification: Notification) {
    if (typeof window !== 'undefined' && 
        'Notification' in window && 
        Notification.permission === 'granted') {
      
      const icon = this.getNotificationIcon(notification.type)
      
      new Notification(notification.title, {
        body: notification.message,
        icon: icon,
        badge: icon,
        tag: notification.id,
        requireInteraction: notification.priority === 'high'
      })
    }
  }

  // 알림 아이콘 가져오기
  private getNotificationIcon(type: string): string {
    // 실제로는 아이콘 파일 경로를 반환해야 함
    switch (type) {
      case 'meal': return '/icons/meal.png'
      case 'water': return '/icons/water.png'
      case 'supplement': return '/icons/supplement.png'
      case 'appointment': return '/icons/appointment.png'
      case 'health': return '/icons/health.png'
      case 'alert': return '/icons/alert.png'
      default: return '/icons/default.png'
    }
  }

  // 알림 읽음 처리
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.isRead = true
      this.notifySubscribers()
    }
  }

  // 모든 알림 읽음 처리
  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true)
    this.notifySubscribers()
  }

  // 알림 삭제
  deleteNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId)
    this.notifySubscribers()
  }

  // 알림 목록 가져오기
  getNotifications(unreadOnly = false): Notification[] {
    if (unreadOnly) {
      return this.notifications.filter(n => !n.isRead)
    }
    return this.notifications
  }

  // 읽지 않은 알림 개수
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length
  }

  // 스케줄 업데이트
  updateSchedule(scheduleId: string, updates: Partial<NotificationSchedule>) {
    const schedule = this.schedules.find(s => s.id === scheduleId)
    if (schedule) {
      Object.assign(schedule, updates)
    }
  }

  // 스케줄 가져오기
  getSchedules(): NotificationSchedule[] {
    return this.schedules
  }

  // 스케줄에 따른 알림 생성 (실제로는 백그라운드 작업이나 서비스 워커에서 실행)
  checkScheduledNotifications() {
    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    const currentDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()]

    this.schedules.forEach(schedule => {
      if (schedule.enabled && 
          schedule.time === currentTime && 
          schedule.days.includes(currentDay)) {
        
        this.addNotification({
          type: schedule.type,
          title: schedule.title,
          message: this.getScheduleMessage(schedule.type),
          time: now,
          priority: 'medium',
          isRead: false
        })
      }
    })
  }

  // 스케줄 타입별 메시지 생성
  private getScheduleMessage(type: string): string {
    switch (type) {
      case 'meal':
        return '균형 잡힌 영양 섭취를 위해 규칙적인 식사가 중요합니다.'
      case 'water':
        return '하루 2.5L 이상의 수분 섭취를 권장합니다.'
      case 'supplement':
        return '정해진 시간에 영양제를 복용하세요.'
      default:
        return '건강한 임신을 위해 규칙적인 생활 습관을 유지하세요.'
    }
  }
}

// 싱글톤 인스턴스
export const notificationManager = new NotificationManager()

// 샘플 알림 생성 함수
export function generateSampleNotifications(): Notification[] {
  const now = new Date()
  
  return [
    {
      id: '1',
      type: 'meal',
      title: '점심 식사를 기록하세요',
      message: '오늘 점심은 드셨나요? 영양 섭취를 기록해주세요.',
      time: new Date(now.getTime() - 30 * 60000), // 30분 전
      priority: 'medium',
      isRead: false,
      action: {
        label: '기록하기',
        link: '/dashboard/meals'
      }
    },
    {
      id: '2',
      type: 'appointment',
      title: '산부인과 검진 예약',
      message: '내일 오후 2시 서울대병원 산부인과',
      time: new Date(now.getTime() - 60 * 60000), // 1시간 전
      priority: 'high',
      isRead: false,
      action: {
        label: '일정 확인',
        link: '/dashboard/profile'
      }
    },
    {
      id: '3',
      type: 'health',
      title: '철분 섭취 부족',
      message: '오늘 철분 섭취량이 목표의 60%입니다. 시금치나 소고기를 추천드려요.',
      time: new Date(now.getTime() - 120 * 60000), // 2시간 전
      priority: 'medium',
      isRead: true,
      action: {
        label: '추천 식품 보기',
        link: '/dashboard/nutrition'
      }
    },
    {
      id: '4',
      type: 'water',
      title: '수분 섭취 알림',
      message: '오늘 1.5L를 마셨어요. 목표까지 1L 더 필요해요.',
      time: new Date(now.getTime() - 180 * 60000), // 3시간 전
      priority: 'low',
      isRead: true
    }
  ]
}
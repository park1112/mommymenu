'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import {
  Settings, User, Bell, Shield, Database, Palette,
  Globe, Key, Download, Upload, Package, ChevronRight,
  Moon, Sun, Monitor
} from 'lucide-react'

type SettingItem = {
  title: string
  description: string
} & (
  | { href: string; badge?: string; toggle?: never; enabled?: never; action?: never; value?: never }
  | { toggle: true; enabled: boolean; href?: never; badge?: never; action?: never; value?: never }
  | { action: string; href?: never; badge?: never; toggle?: never; enabled?: never; value?: never }
  | { value: string; href?: never; badge?: never; toggle?: never; enabled?: never; action?: never }
)

type SettingSection = {
  title: string
  icon: React.ReactNode
  items: SettingItem[]
}

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showToast, setShowToast] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    stockAlert: true,
    orderAlert: true,
    emailAlert: false,
    smsAlert: false
  })

  // localStorage에서 설정 로드
  useEffect(() => {
    setMounted(true)
    const savedSettings = localStorage.getItem('mommymenu-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        if (parsed.notifications) {
          setNotifications(parsed.notifications)
        }
      } catch (e) {
        // 기본값 사용
      }
    }
    setIsLoaded(true)
  }, [])

  // 설정 변경시 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mommymenu-settings', JSON.stringify({
        notifications
      }))
    }
  }, [notifications, isLoaded])

  // 토글 핸들러
  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // 데이터 백업
  const handleBackup = () => {
    const allData: Record<string, string | null> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('mommymenu-')) {
        allData[key] = localStorage.getItem(key)
      }
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mommymenu-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShowToast('백업이 완료되었습니다')
    setTimeout(() => setShowToast(null), 3000)
  }

  // 데이터 복원
  const handleRestore = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string)
            Object.entries(data).forEach(([key, value]) => {
              if (key.startsWith('mommymenu-') && typeof value === 'string') {
                localStorage.setItem(key, value)
              }
            })
            setShowToast('복원이 완료되었습니다. 페이지를 새로고침합니다.')
            setTimeout(() => window.location.reload(), 1500)
          } catch (err) {
            setShowToast('파일 형식이 올바르지 않습니다.')
            setTimeout(() => setShowToast(null), 3000)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  // 데이터 내보내기 (CSV)
  const handleExport = () => {
    // 식사 데이터 CSV로 내보내기
    const mealsData = localStorage.getItem('mommymenu-meals')
    if (mealsData) {
      try {
        const meals = JSON.parse(mealsData)
        const csv = [
          ['날짜', '시간', '식사유형', '음식명', '칼로리', '단백질', '탄수화물', '지방'].join(','),
          ...meals.map((meal: any) => [
            new Date(meal.createdAt).toLocaleDateString('ko-KR'),
            meal.time,
            meal.mealType,
            `"${meal.name}"`,
            meal.calories,
            meal.nutrients?.protein || 0,
            meal.nutrients?.carbs || 0,
            meal.nutrients?.fat || 0
          ].join(','))
        ].join('\n')

        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `mommymenu-meals-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
        setShowToast('내보내기가 완료되었습니다')
      } catch (e) {
        setShowToast('내보낼 데이터가 없습니다')
      }
    } else {
      setShowToast('내보낼 데이터가 없습니다')
    }
    setTimeout(() => setShowToast(null), 3000)
  }

  // 액션 핸들러
  const handleAction = (action: string) => {
    switch (action) {
      case 'backup':
        handleBackup()
        break
      case 'restore':
        handleRestore()
        break
      case 'export':
        handleExport()
        break
    }
  }

  const settingSections: SettingSection[] = [
    {
      title: '계정 설정',
      icon: <User className="w-5 h-5" />,
      items: [
        {
          title: '프로필 수정',
          description: '이름, 이메일, 연락처 정보 변경',
          href: '/dashboard/profile'
        },
        {
          title: '비밀번호 변경',
          description: '계정 보안을 위한 비밀번호 업데이트',
          href: '#'
        }
      ]
    },
    {
      title: '알림 설정',
      icon: <Bell className="w-5 h-5" />,
      items: [
        {
          title: '재고 부족 알림',
          description: '최소 재고 수준 이하시 자동 알림',
          toggle: true,
          enabled: notifications.stockAlert
        },
        {
          title: '주문 접수 알림',
          description: '새로운 주문 발생시 즉시 알림',
          toggle: true,
          enabled: notifications.orderAlert
        },
        {
          title: '이메일 알림',
          description: '중요 알림을 이메일로 수신',
          toggle: true,
          enabled: notifications.emailAlert
        }
      ]
    },
    {
      title: '시스템 설정',
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          title: '언어 설정',
          description: '시스템 표시 언어 선택',
          value: '한국어'
        },
        {
          title: '날짜 형식',
          description: '날짜 표시 형식 설정',
          value: 'YYYY-MM-DD'
        },
        {
          title: '통화 설정',
          description: '기본 통화 단위',
          value: 'KRW (₩)'
        }
      ]
    },
    {
      title: '보안',
      icon: <Shield className="w-5 h-5" />,
      items: [
        {
          title: '2단계 인증',
          description: '계정 보안 강화를 위한 추가 인증',
          href: '#'
        },
        {
          title: 'API 키 관리',
          description: '외부 연동을 위한 API 키 생성 및 관리',
          href: '#'
        }
      ]
    },
    {
      title: '데이터 관리',
      icon: <Database className="w-5 h-5" />,
      items: [
        {
          title: '데이터 백업',
          description: '전체 데이터 백업 생성',
          action: 'backup'
        },
        {
          title: '데이터 복원',
          description: '백업된 데이터 복원',
          action: 'restore'
        },
        {
          title: '데이터 내보내기',
          description: 'Excel/CSV 형식으로 데이터 내보내기',
          action: 'export'
        }
      ]
    }
  ]

  // 토글 키 매핑
  const getToggleKey = (title: string): keyof typeof notifications | null => {
    switch (title) {
      case '재고 부족 알림': return 'stockAlert'
      case '주문 접수 알림': return 'orderAlert'
      case '이메일 알림': return 'emailAlert'
      default: return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-pulse">
          {showToast}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">설정</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          시스템 설정 및 사용자 환경을 관리합니다
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-pink-500" />
            <CardTitle>테마 설정</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {mounted ? (
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  theme === 'light'
                    ? 'border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700 bg-white dark:bg-gray-800'
                }`}
              >
                <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400'}`} />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">라이트 모드</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">밝은 테마</p>
                </div>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-gray-800'
                }`}
              >
                <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-500' : 'text-gray-500 dark:text-gray-400'}`} />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">다크 모드</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">어두운 테마</p>
                </div>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  theme === 'system'
                    ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
                }`}
              >
                <Monitor className={`w-5 h-5 ${theme === 'system' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">시스템 설정</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">기기 설정 따름</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 animate-pulse">
                  <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="text-left">
                    <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
                    <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Access Card (개발 환경용) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-red-600" />
                <CardTitle className="text-red-700 dark:text-red-400">관리자 모드</CardTitle>
              </div>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-bold rounded">
                개발용
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              시스템 전체 설정 및 사용자 관리를 위한 관리자 페이지로 이동합니다.
            </p>
            <Link href="/admin">
              <Button variant="danger" className="w-full">
                <Key className="w-4 h-4 mr-2" />
                관리자 페이지로 이동
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Settings Sections */}
      <div className="grid gap-6">
        {settingSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {section.icon}
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            {item.title}
                          </p>
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-400" />
                    </Link>
                  ) : item.toggle ? (
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const key = getToggleKey(item.title)
                          if (key) handleToggle(key)
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.enabled ? 'bg-pink-500' : 'bg-neutral-300 dark:bg-neutral-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                            item.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ) : item.action ? (
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleAction(item.action)}>
                        {item.action === 'backup' && <Download className="w-4 h-4 mr-2" />}
                        {item.action === 'restore' && <Upload className="w-4 h-4 mr-2" />}
                        {item.action === 'export' && <Download className="w-4 h-4 mr-2" />}
                        실행
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      {item.value && (
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {item.value}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
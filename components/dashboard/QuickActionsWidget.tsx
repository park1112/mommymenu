'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Camera, 
  UtensilsCrossed, 
  Thermometer, 
  Pill, 
  MessageSquare, 
  BookOpen,
  ShoppingCart,
  Settings
} from 'lucide-react'
import { MealRecorder } from '@/components/meals/MealRecorder'

export function QuickActionsWidget() {
  const [showMealRecorder, setShowMealRecorder] = useState(false)
  const quickActions = [
    {
      icon: <Camera className="h-5 w-5" />,
      label: '식사 기록',
      description: '사진으로 쉽게',
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => setShowMealRecorder(true)
    },
    {
      icon: <UtensilsCrossed className="h-5 w-5" />,
      label: '식단 생성',
      description: 'AI 맞춤 추천',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Thermometer className="h-5 w-5" />,
      label: '증상 입력',
      description: '컨디션 체크',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Pill className="h-5 w-5" />,
      label: '영양제',
      description: '복용 기록',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: '전문가 상담',
      description: '질문하기',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: '교육 자료',
      description: '임신 가이드',
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: '장보기',
      description: '리스트 보기',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: '설정',
      description: '개인화',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-gray-900 dark:text-gray-100">빠른 실행</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-16 flex flex-col items-center justify-center text-white border-0 transition-all hover:scale-105 ${action.color}`}
                onClick={action.onClick}
              >
                <div className="mb-1">
                  {action.icon}
                </div>
                <div className="text-xs font-medium">{action.label}</div>
                <div className="text-xs opacity-80">{action.description}</div>
              </Button>
            ))}
          </div>

          {/* Emergency contact */}
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 dark:text-red-400">🚨</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-red-700 dark:text-red-300">응급상황</div>
                <div className="text-xs text-red-600 dark:text-red-400">24시간 상담 가능</div>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                전화하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Recorder Modal */}
      {showMealRecorder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <MealRecorder onClose={() => setShowMealRecorder(false)} />
        </div>
      )}
    </>
  )
}
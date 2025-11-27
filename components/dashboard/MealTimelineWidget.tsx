'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Clock, CheckCircle, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MealTimelineWidget() {
  const meals = [
    {
      time: '07:30',
      type: '아침',
      status: 'completed',
      foods: ['현미밥', '된장찌개', '나물반찬'],
      calories: 420
    },
    {
      time: '12:30',
      type: '점심',
      status: 'in-progress',
      foods: ['연어구이', '아스파라거스', '현미밥'],
      calories: 580
    },
    {
      time: '18:30',
      type: '저녁',
      status: 'pending',
      foods: ['닭가슴살 샐러드', '견과류'],
      calories: 450
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-orange-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'in-progress':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍽️</span>
            <span>오늘의 식단</span>
          </div>
          <div className="text-sm text-gray-500">
            총 1,450 kcal
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Timeline */}
          <div className="flex items-center justify-between relative">
            {meals.map((meal, index) => (
              <div key={meal.type} className="flex flex-col items-center relative z-10">
                <div className="flex items-center mb-2">
                  {getStatusIcon(meal.status)}
                </div>
                <div className="text-xs text-gray-500 mb-1">{meal.time}</div>
                <div className="text-sm font-medium text-gray-700">{meal.type}</div>
              </div>
            ))}
            {/* Timeline line */}
            <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
          </div>

          {/* Meal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <div 
                key={meal.type}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all',
                  getStatusColor(meal.status)
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{meal.type}</span>
                  <span className="text-xs">{meal.calories} kcal</span>
                </div>
                
                <div className="space-y-1 mb-3">
                  {meal.foods.map((food, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      • {food}
                    </div>
                  ))}
                </div>

                {meal.status === 'in-progress' && (
                  <Button size="sm" className="w-full bg-pink-600 hover:bg-pink-700">
                    <Camera className="h-4 w-4 mr-2" />
                    식사 기록하기
                  </Button>
                )}

                {meal.status === 'pending' && (
                  <Button variant="outline" size="sm" className="w-full">
                    알림 설정
                  </Button>
                )}

                {meal.status === 'completed' && (
                  <div className="text-xs text-green-600 text-center">
                    기록 완료 ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
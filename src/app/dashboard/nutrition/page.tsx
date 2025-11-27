'use client'

import { useState } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, Search, Filter, Utensils, Apple, Droplets,
  Zap, Shield, Target, TrendingUp, Calendar, Camera
} from 'lucide-react'

interface NutrientProgress {
  name: string
  current: number
  target: number
  unit: string
  color: string
  icon: any
}

const nutrientData: NutrientProgress[] = [
  { name: '칼로리', current: 1850, target: 2200, unit: 'kcal', color: 'bg-blue-500', icon: Zap },
  { name: '단백질', current: 65, target: 80, unit: 'g', color: 'bg-red-500', icon: Apple },
  { name: '탄수화물', current: 220, target: 280, unit: 'g', color: 'bg-yellow-500', icon: Utensils },
  { name: '지방', current: 45, target: 70, unit: 'g', color: 'bg-purple-500', icon: Droplets },
  { name: '엽산', current: 350, target: 400, unit: 'mcg', color: 'bg-green-500', icon: Shield },
  { name: '철분', current: 18, target: 27, unit: 'mg', color: 'bg-orange-500', icon: Target }
]

const recentMeals = [
  {
    time: '아침 7:30',
    name: '현미밥 + 미역국 + 계란찜',
    calories: 450,
    nutrients: { protein: 18, carbs: 65, fat: 8 }
  },
  {
    time: '간식 10:30',
    name: '바나나 + 견과류',
    calories: 180,
    nutrients: { protein: 4, carbs: 25, fat: 8 }
  },
  {
    time: '점심 12:30',
    name: '닭가슴살 샐러드 + 통곡물빵',
    calories: 520,
    nutrients: { protein: 35, carbs: 45, fat: 12 }
  }
]

const safetyAlerts = [
  { type: 'warning', message: '카페인 섭취량이 권장량을 초과했습니다. (일일 권장: 200mg 이하)' },
  { type: 'info', message: '오늘 칼슘 섭취가 부족합니다. 유제품이나 잎채소를 추가해보세요.' },
  { type: 'success', message: '엽산 섭취 목표를 달성했습니다! 👏' }
]

export default function NutritionPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">영양 관리</h1>
          <p className="text-gray-600 mt-1">임신 23주 3일 • 오늘의 영양 상태를 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <Button icon={<Camera className="w-4 h-4" />} variant="outline">
            음식 촬영
          </Button>
          <Button icon={<Plus className="w-4 h-4" />}>
            식사 추가
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {(['today', 'week', 'month'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === 'today' ? '오늘' : period === 'week' ? '이번 주' : '이번 달'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Alerts */}
      {safetyAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              안전 알림
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {safetyAlerts.map((alert, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' 
                    ? 'bg-amber-50 border-amber-400 text-amber-800'
                    : alert.type === 'success'
                    ? 'bg-green-50 border-green-400 text-green-800'
                    : 'bg-blue-50 border-blue-400 text-blue-800'
                }`}
              >
                {alert.message}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Daily Nutrition Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-500" />
            오늘의 영양소 섭취 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nutrientData.map((nutrient, index) => {
              const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100)
              const IconComponent = nutrient.icon
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">{nutrient.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {nutrient.current}/{nutrient.target} {nutrient.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{percentage.toFixed(0)}% 달성</span>
                    <span className={percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                      {percentage >= 80 ? '좋음' : percentage >= 50 ? '보통' : '부족'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Meals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-green-500" />
              오늘의 식사 기록
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMeals.map((meal, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-sm text-gray-500">{meal.time}</span>
                    <h4 className="font-medium text-gray-900">{meal.name}</h4>
                  </div>
                  <span className="text-sm font-semibold text-pink-600">{meal.calories}kcal</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>단백질 {meal.nutrients.protein}g</span>
                  <span>탄수화물 {meal.nutrients.carbs}g</span>
                  <span>지방 {meal.nutrients.fat}g</span>
                </div>
              </div>
            ))}
            <Button fullWidth variant="outline" icon={<Plus className="w-4 h-4" />}>
              식사 추가하기
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              주간 영양 트렌드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800 font-medium">평균 칼로리 섭취</span>
                <span className="text-green-600 font-semibold">2,150kcal</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800 font-medium">단백질 목표 달성률</span>
                <span className="text-blue-600 font-semibold">87%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-800 font-medium">필수 영양소 균형</span>
                <span className="text-yellow-600 font-semibold">좋음</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-800 font-medium">수분 섭취량</span>
                <span className="text-purple-600 font-semibold">2.1L/일</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Search className="w-6 h-6" />
              <span className="text-sm">식품 검색</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">식단 계획</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Filter className="w-6 h-6" />
              <span className="text-sm">영양소 분석</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">진행 리포트</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
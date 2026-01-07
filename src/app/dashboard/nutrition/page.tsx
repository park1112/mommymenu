'use client'

import { useState, useEffect } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { Progress } from '@/components/ui/progress'
import {
  Plus, Search, Filter, Utensils, Apple, Droplets,
  Zap, Shield, Target, TrendingUp, Calendar, Camera,
  X, Clock, Trash2
} from 'lucide-react'

interface NutrientProgress {
  name: string
  current: number
  target: number
  unit: string
  color: string
  icon: any
}

interface Meal {
  id: string
  time: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  calories: number
  nutrients: { protein: number; carbs: number; fat: number }
  createdAt: string
}

const defaultMeals: Meal[] = [
  {
    id: '1',
    time: '07:30',
    mealType: 'breakfast',
    name: '현미밥 + 미역국 + 계란찜',
    calories: 450,
    nutrients: { protein: 18, carbs: 65, fat: 8 },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    time: '10:30',
    mealType: 'snack',
    name: '바나나 + 견과류',
    calories: 180,
    nutrients: { protein: 4, carbs: 25, fat: 8 },
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    time: '12:30',
    mealType: 'lunch',
    name: '닭가슴살 샐러드 + 통곡물빵',
    calories: 520,
    nutrients: { protein: 35, carbs: 45, fat: 12 },
    createdAt: new Date().toISOString()
  }
]

const nutrientTargets = {
  calories: 2200,
  protein: 80,
  carbs: 280,
  fat: 70,
  folate: 400,
  iron: 27
}

const safetyAlerts = [
  { type: 'warning', message: '카페인 섭취량이 권장량을 초과했습니다. (일일 권장: 200mg 이하)' },
  { type: 'info', message: '오늘 칼슘 섭취가 부족합니다. 유제품이나 잎채소를 추가해보세요.' },
  { type: 'success', message: '엽산 섭취 목표를 달성했습니다! 👏' }
]

export default function NutritionPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today')
  const [meals, setMeals] = useState<Meal[]>([])
  const [showAddMeal, setShowAddMeal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // 새 식사 입력 상태
  const [newMeal, setNewMeal] = useState({
    name: '',
    mealType: 'breakfast' as Meal['mealType'],
    time: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  })

  // LocalStorage에서 데이터 로드
  useEffect(() => {
    const savedMeals = localStorage.getItem('mommymenu-meals')
    if (savedMeals) {
      try {
        setMeals(JSON.parse(savedMeals))
      } catch (e) {
        setMeals(defaultMeals)
      }
    } else {
      setMeals(defaultMeals)
    }
    setIsLoaded(true)
  }, [])

  // 식사 데이터 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mommymenu-meals', JSON.stringify(meals))
    }
  }, [meals, isLoaded])

  // 오늘 날짜 식사만 필터링
  const todayMeals = meals.filter(meal => {
    const mealDate = new Date(meal.createdAt).toDateString()
    return mealDate === new Date().toDateString()
  })

  // 총 영양소 계산
  const totalNutrients = todayMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.nutrients.protein,
      carbs: acc.carbs + meal.nutrients.carbs,
      fat: acc.fat + meal.nutrients.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  // 영양소 데이터 동적 생성
  const nutrientData: NutrientProgress[] = [
    { name: '칼로리', current: totalNutrients.calories, target: nutrientTargets.calories, unit: 'kcal', color: 'bg-blue-500', icon: Zap },
    { name: '단백질', current: totalNutrients.protein, target: nutrientTargets.protein, unit: 'g', color: 'bg-red-500', icon: Apple },
    { name: '탄수화물', current: totalNutrients.carbs, target: nutrientTargets.carbs, unit: 'g', color: 'bg-yellow-500', icon: Utensils },
    { name: '지방', current: totalNutrients.fat, target: nutrientTargets.fat, unit: 'g', color: 'bg-purple-500', icon: Droplets },
    { name: '엽산', current: 350, target: nutrientTargets.folate, unit: 'mcg', color: 'bg-green-500', icon: Shield },
    { name: '철분', current: 18, target: nutrientTargets.iron, unit: 'mg', color: 'bg-orange-500', icon: Target }
  ]

  const getMealTypeLabel = (type: Meal['mealType']) => {
    switch (type) {
      case 'breakfast': return '아침'
      case 'lunch': return '점심'
      case 'dinner': return '저녁'
      case 'snack': return '간식'
    }
  }

  const handleAddMeal = () => {
    if (!newMeal.name.trim() || !newMeal.time) return

    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      mealType: newMeal.mealType,
      time: newMeal.time,
      calories: Number(newMeal.calories) || 0,
      nutrients: {
        protein: Number(newMeal.protein) || 0,
        carbs: Number(newMeal.carbs) || 0,
        fat: Number(newMeal.fat) || 0
      },
      createdAt: new Date().toISOString()
    }

    setMeals(prev => [...prev, meal])
    setNewMeal({
      name: '',
      mealType: 'breakfast',
      time: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    })
    setShowAddMeal(false)
  }

  const handleDeleteMeal = (mealId: string) => {
    setMeals(prev => prev.filter(m => m.id !== mealId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">영양 관리</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">임신 23주 3일 • 오늘의 영양 상태를 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <Button
            icon={<Camera className="w-4 h-4" />}
            variant="outline"
            onClick={() => alert('카메라 기능은 모바일 앱에서 지원됩니다.')}
          >
            음식 촬영
          </Button>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddMeal(true)}>
            식사 추가
          </Button>
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>식사 추가</CardTitle>
              <button
                onClick={() => setShowAddMeal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 식사 종류 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  식사 종류
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewMeal(prev => ({ ...prev, mealType: type }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        newMeal.mealType === type
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {getMealTypeLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 시간 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  시간
                </label>
                <input
                  type="time"
                  value={newMeal.time}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* 음식 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  음식 이름
                </label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="예: 현미밥 + 미역국"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                />
              </div>

              {/* 영양 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    칼로리 (kcal)
                  </label>
                  <input
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    단백질 (g)
                  </label>
                  <input
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, protein: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    탄수화물 (g)
                  </label>
                  <input
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, carbs: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    지방 (g)
                  </label>
                  <input
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, fat: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowAddMeal(false)}
                >
                  취소
                </Button>
                <Button
                  fullWidth
                  onClick={handleAddMeal}
                  disabled={!newMeal.name.trim() || !newMeal.time}
                >
                  추가
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-amber-800 dark:text-amber-200'
                    : alert.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-800 dark:text-green-200'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-800 dark:text-blue-200'
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
                      <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{nutrient.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {nutrient.current}/{nutrient.target} {nutrient.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{percentage.toFixed(0)}% 달성</span>
                    <span className={percentage >= 80 ? 'text-green-600 dark:text-green-400' : percentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}>
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
            {todayMeals.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Utensils className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>오늘 기록된 식사가 없습니다.</p>
                <p className="text-sm">식사 추가 버튼을 눌러 기록해보세요!</p>
              </div>
            ) : (
              todayMeals
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((meal) => (
                  <div key={meal.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {getMealTypeLabel(meal.mealType)} {meal.time}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{meal.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">{meal.calories}kcal</span>
                        <button
                          onClick={() => handleDeleteMeal(meal.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500 transition-all"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                      <span>단백질 {meal.nutrients.protein}g</span>
                      <span>탄수화물 {meal.nutrients.carbs}g</span>
                      <span>지방 {meal.nutrients.fat}g</span>
                    </div>
                  </div>
                ))
            )}
            <Button fullWidth variant="outline" icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddMeal(true)}>
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
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-800 dark:text-green-200 font-medium">평균 칼로리 섭취</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">2,150kcal</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-blue-800 dark:text-blue-200 font-medium">단백질 목표 달성률</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">87%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-yellow-800 dark:text-yellow-200 font-medium">필수 영양소 균형</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">좋음</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-purple-800 dark:text-purple-200 font-medium">수분 섭취량</span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">2.1L/일</span>
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
'use client'

import { useState } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { 
  Calendar, Clock, UtensilsCrossed, Plus, Heart, Star,
  ChefHat, Timer, Users, BookOpen, Filter, Search, PlusCircle
} from 'lucide-react'
import { FoodSearch } from '@/components/food/FoodSearch'
import { useNutrition } from '@/components/providers'

interface MealPlan {
  id: string
  time: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  description: string
  prepTime: number
  calories: number
  difficulty: 'easy' | 'medium' | 'hard'
  image?: string
  tags: string[]
  nutrients: {
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
}

const todayMeals: MealPlan[] = [
  {
    id: '1',
    time: '07:30',
    type: 'breakfast',
    name: '연어 아보카도 토스트',
    description: '오메가3가 풍부한 연어와 엽산이 많은 아보카도를 올린 통곡물 토스트',
    prepTime: 15,
    calories: 420,
    difficulty: 'easy',
    tags: ['고단백', '오메가3', '엽산'],
    nutrients: { protein: 25, carbs: 35, fat: 18, fiber: 8 }
  },
  {
    id: '2',
    time: '10:00',
    type: 'snack',
    name: '요거트 베리 스무디',
    description: '프로바이오틱스가 풍부한 그릭요거트와 항산화 베리류',
    prepTime: 5,
    calories: 180,
    difficulty: 'easy',
    tags: ['프로바이오틱스', '항산화', '비타민C'],
    nutrients: { protein: 12, carbs: 25, fat: 3, fiber: 4 }
  },
  {
    id: '3',
    time: '12:30',
    type: 'lunch',
    name: '현미비빔밥',
    description: '다양한 채소와 현미밥으로 만든 영양 균형 잡힌 비빔밥',
    prepTime: 25,
    calories: 520,
    difficulty: 'medium',
    tags: ['고섬유', '다양한채소', '완전영양'],
    nutrients: { protein: 18, carbs: 78, fat: 12, fiber: 12 }
  },
  {
    id: '4',
    time: '15:30',
    type: 'snack',
    name: '견과류 믹스',
    description: '아몬드, 호두, 캐슈넛 등 임신에 좋은 견과류 조합',
    prepTime: 0,
    calories: 200,
    difficulty: 'easy',
    tags: ['건강지방', '마그네슘', '비타민E'],
    nutrients: { protein: 6, carbs: 8, fat: 16, fiber: 3 }
  },
  {
    id: '5',
    time: '18:30',
    type: 'dinner',
    name: '닭가슴살 채소찜',
    description: '저염 조리법으로 준비한 닭가슴살과 계절 채소찜',
    prepTime: 30,
    calories: 480,
    difficulty: 'medium',
    tags: ['저염', '고단백', '저지방'],
    nutrients: { protein: 45, carbs: 25, fat: 8, fiber: 6 }
  }
]

const weeklyPlan = [
  { day: '월', breakfast: '오트밀', lunch: '닭가슴살샐러드', dinner: '연어구이' },
  { day: '화', breakfast: '과일요거트', lunch: '현미비빔밥', dinner: '두부스테이크' },
  { day: '수', breakfast: '연어토스트', lunch: '퀴노아볼', dinner: '닭가슴살찜' },
  { day: '목', breakfast: '스무디볼', lunch: '아보카도샐러드', dinner: '생선구이' },
  { day: '금', breakfast: '계란샌드위치', lunch: '렌틸스프', dinner: '버섯리조또' },
  { day: '토', breakfast: '팬케이크', lunch: '파스타', dinner: '스테이크' },
  { day: '일', breakfast: '브런치', lunch: '카레', dinner: '바베큐' }
]

const aiRecommendations = [
  {
    title: '철분 부족 해결 레시피',
    description: '시금치와 소고기를 활용한 철분 보충 요리',
    type: '영양소 보완',
    recipes: ['시금치 소고기볶음', '철분 강화 스무디', '간 야채볶음']
  },
  {
    title: '입덧 완화 메뉴',
    description: '소화가 잘되고 속이 편한 가벼운 요리들',
    type: '증상 완화',
    recipes: ['생강차', '죽류', '과일 스무디']
  },
  {
    title: '임신 후기 부종 완화',
    description: '나트륨을 줄이고 칼륨이 풍부한 요리',
    type: '부종 관리',
    recipes: ['바나나 스무디', '저염 채소찜', '양배추롤']
  }
]

export default function MealsPage() {
  const [selectedView, setSelectedView] = useState<'today' | 'week' | 'recipes' | 'search'>('today')
  const [selectedMealType, setSelectedMealType] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all')
  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const [currentMealType, setCurrentMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')
  const { mealEntries, getDailyProgress } = useNutrition()

  const filteredMeals = selectedMealType === 'all' 
    ? todayMeals 
    : todayMeals.filter(meal => meal.type === selectedMealType)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMealTypeLabel = (type: string) => {
    switch (type) {
      case 'breakfast': return '아침'
      case 'lunch': return '점심'
      case 'dinner': return '저녁'
      case 'snack': return '간식'
      default: return type
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">식사 계획</h1>
          <p className="text-gray-600 mt-1">임신 23주 3일 • AI가 추천하는 맞춤 식단</p>
        </div>
        <div className="flex gap-2">
          <Button icon={<Search className="w-4 h-4" />} variant="outline">
            레시피 검색
          </Button>
          <Button icon={<Plus className="w-4 h-4" />}>
            식단 생성
          </Button>
        </div>
      </div>

      {/* View Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {(['today', 'week', 'recipes', 'search'] as const).map((view) => (
              <Button
                key={view}
                variant={selectedView === view ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedView(view)}
              >
                {view === 'today' ? '오늘' : view === 'week' ? '주간 계획' : view === 'recipes' ? 'AI 추천' : '음식 검색'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedView === 'today' && (
        <>
          {/* Meal Type Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {(['all', 'breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={selectedMealType === type ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMealType(type)}
                  >
                    {type === 'all' ? '전체' : getMealTypeLabel(type)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Meals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <Card key={meal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm text-gray-500">{meal.time}</span>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(meal.difficulty)}`}>
                      {meal.difficulty === 'easy' ? '쉬움' : meal.difficulty === 'medium' ? '보통' : '어려움'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{meal.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {meal.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span>{meal.prepTime}분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UtensilsCrossed className="w-4 h-4" />
                      <span>{meal.calories}kcal</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{meal.nutrients.protein}g</div>
                      <div className="text-gray-500">단백질</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-yellow-600">{meal.nutrients.carbs}g</div>
                      <div className="text-gray-500">탄수화물</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{meal.nutrients.fat}g</div>
                      <div className="text-gray-500">지방</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{meal.nutrients.fiber}g</div>
                      <div className="text-gray-500">섬유질</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" fullWidth icon={<BookOpen className="w-4 h-4" />}>
                      레시피 보기
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedView === 'week' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              주간 식단 계획
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">요일</th>
                    <th className="text-left p-3 font-semibold">아침</th>
                    <th className="text-left p-3 font-semibold">점심</th>
                    <th className="text-left p-3 font-semibold">저녁</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyPlan.map((day, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{day.day}</td>
                      <td className="p-3">{day.breakfast}</td>
                      <td className="p-3">{day.lunch}</td>
                      <td className="p-3">{day.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button icon={<Plus className="w-4 h-4" />}>
                새 주간 계획 생성
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedView === 'recipes' && (
        <div className="space-y-6">
          {aiRecommendations.map((recommendation, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-green-500" />
                  {recommendation.title}
                </CardTitle>
                <p className="text-gray-600">{recommendation.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {recommendation.type}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendation.recipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <h4 className="font-medium text-gray-900 mb-2">{recipe}</h4>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                        <Button variant="outline" size="sm">
                          보기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedView === 'search' && (
        <div className="space-y-6">
          {/* Meal Type Selection for Search */}
          <Card>
            <CardHeader>
              <CardTitle>식사 시간 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={currentMealType === type ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentMealType(type)}
                  >
                    {getMealTypeLabel(type)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Food Search Component */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                음식 검색 및 추가
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FoodSearch 
                mealType={currentMealType}
                onAddFood={(food, servings) => {
                  console.log(`Added ${food.name} x${servings} to ${currentMealType}`)
                }}
              />
            </CardContent>
          </Card>

          {/* Today's Intake Summary */}
          <Card>
            <CardHeader>
              <CardTitle>오늘의 섭취 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">영양 점수</span>
                  <span className="text-2xl font-bold text-green-600">{getDailyProgress()}점</span>
                </div>
                <div className="space-y-2">
                  {mealEntries.slice(-5).map((entry, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{entry.foodName}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {entry.quantity} {entry.unit}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{entry.calories}kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setSelectedView('search')}
            >
              <PlusCircle className="w-6 h-6" />
              <span className="text-sm">음식 추가</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">식단 달력</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">가족 식단</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Filter className="w-6 h-6" />
              <span className="text-sm">맞춤 필터</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, AlertTriangle, Check, Info } from 'lucide-react'
import { 
  searchFoods, 
  FoodItem, 
  calculateNutritionPerServing,
  NutritionInfo 
} from '@/lib/food-database'
import { useNutrition } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface FoodSearchProps {
  onAddFood?: (food: FoodItem, servings: number) => void
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

export function FoodSearch({ onAddFood, mealType = 'snack' }: FoodSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [servingAmount, setServingAmount] = useState(1)
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const { addMealEntry } = useNutrition()

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchFoods(searchQuery)
      setSearchResults(results.slice(0, 10)) // 최대 10개 결과
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleAddFood = (food: FoodItem) => {
    const nutrition = calculateNutritionPerServing(food)
    const totalNutrition: NutritionInfo = {} as NutritionInfo
    
    // 서빙 수량에 맞게 영양소 계산
    Object.keys(nutrition).forEach(key => {
      const nutrientKey = key as keyof NutritionInfo
      totalNutrition[nutrientKey] = nutrition[nutrientKey] * servingAmount
    })

    // 식사 기록에 추가
    addMealEntry({
      foodName: food.name,
      mealType,
      calories: totalNutrition.calories,
      nutrients: {
        protein: totalNutrition.protein,
        carbs: totalNutrition.carbs,
        fat: totalNutrition.fat,
        folate: totalNutrition.folate,
        iron: totalNutrition.iron,
        calcium: totalNutrition.calcium,
        fiber: totalNutrition.fiber
      },
      quantity: servingAmount,
      unit: food.servingSize.unit
    })

    // 콜백 실행
    if (onAddFood) {
      onAddFood(food, servingAmount)
    }

    // 초기화
    setSearchQuery('')
    setSearchResults([])
    setSelectedFood(null)
    setServingAmount(1)
  }

  const getSafetyIcon = (safetyLevel: string) => {
    switch (safetyLevel) {
      case 'safe':
        return <Check className="w-4 h-4 text-green-600" />
      case 'caution':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'avoid':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getSafetyColor = (safetyLevel: string) => {
    switch (safetyLevel) {
      case 'safe':
        return 'bg-green-50 border-green-200'
      case 'caution':
        return 'bg-yellow-50 border-yellow-200'
      case 'avoid':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-4">
      {/* 검색 입력 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="음식 검색... (예: 사과, 시금치, 연어)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <Card className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {searchResults.map((food) => (
              <div
                key={food.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  getSafetyColor(food.pregnancySafety.safetyLevel)
                } hover:shadow-md`}
                onClick={() => setSelectedFood(food)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{food.name}</span>
                      {getSafetyIcon(food.pregnancySafety.safetyLevel)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDetails(showDetails === food.id ? null : food.id)
                        }}
                        className="ml-auto"
                      >
                        <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-1">
                      {food.servingSize.amount}{food.servingSize.unit} = {food.servingSize.weightInGrams}g
                    </div>

                    {/* 주요 영양소 표시 */}
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span>{Math.round(calculateNutritionPerServing(food).calories)}kcal</span>
                      <span>단백질 {calculateNutritionPerServing(food).protein}g</span>
                      <span>엽산 {calculateNutritionPerServing(food).folate}mcg</span>
                    </div>

                    {/* 경고 메시지 */}
                    {food.pregnancySafety.reason && (
                      <div className={`text-xs mt-2 ${
                        food.pregnancySafety.safetyLevel === 'avoid' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        ⚠️ {food.pregnancySafety.reason}
                      </div>
                    )}
                  </div>
                </div>

                {/* 상세 정보 */}
                {showDetails === food.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-2 text-sm">
                      {food.benefits.length > 0 && (
                        <div>
                          <span className="font-medium text-green-600">효능:</span>
                          <div className="text-gray-600 mt-1">
                            {food.benefits.join(', ')}
                          </div>
                        </div>
                      )}
                      {food.warnings && food.warnings.length > 0 && (
                        <div>
                          <span className="font-medium text-red-600">주의사항:</span>
                          <div className="text-gray-600 mt-1">
                            {food.warnings.join(', ')}
                          </div>
                        </div>
                      )}
                      {food.pregnancySafety.maxServingsPerWeek && (
                        <div className="text-yellow-600">
                          주 {food.pregnancySafety.maxServingsPerWeek}회 이하 권장
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 선택된 음식 추가 */}
      {selectedFood && (
        <Card className={`p-4 ${getSafetyColor(selectedFood.pregnancySafety.safetyLevel)}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">{selectedFood.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedFood.servingSize.amount}{selectedFood.servingSize.unit} 기준
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setServingAmount(Math.max(0.5, servingAmount - 0.5))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{servingAmount}</span>
                <button
                  onClick={() => setServingAmount(Math.min(5, servingAmount + 0.5))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* 영양 정보 */}
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="text-center p-2 bg-white/50 rounded">
                <div className="font-medium">
                  {Math.round(calculateNutritionPerServing(selectedFood).calories * servingAmount)}
                </div>
                <div className="text-xs text-gray-600">kcal</div>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <div className="font-medium">
                  {(calculateNutritionPerServing(selectedFood).protein * servingAmount).toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">단백질(g)</div>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <div className="font-medium">
                  {Math.round(calculateNutritionPerServing(selectedFood).folate * servingAmount)}
                </div>
                <div className="text-xs text-gray-600">엽산(mcg)</div>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <div className="font-medium">
                  {(calculateNutritionPerServing(selectedFood).iron * servingAmount).toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">철분(mg)</div>
              </div>
            </div>

            {/* 추가 버튼 */}
            <div className="flex gap-2">
              <Button
                onClick={() => handleAddFood(selectedFood)}
                disabled={selectedFood.pregnancySafety.safetyLevel === 'avoid'}
                className="flex-1"
                variant={selectedFood.pregnancySafety.safetyLevel === 'avoid' ? 'destructive' : 'default'}
              >
                <Plus className="w-4 h-4 mr-1" />
                {selectedFood.pregnancySafety.safetyLevel === 'avoid' ? '섭취 권장하지 않음' : '식사에 추가'}
              </Button>
              <Button
                onClick={() => setSelectedFood(null)}
                variant="outline"
              >
                취소
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
'use client'

import { useState, useRef } from 'react'
import { 
  Camera, Upload, X, Clock, Calendar, ChevronLeft, 
  ChevronRight, Save, Image as ImageIcon, Utensils 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNutrition } from '@/components/providers'
import { FoodSearch } from '@/components/food/FoodSearch'

interface MealPhoto {
  id: string
  url: string
  timestamp: Date
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

interface MealRecorderProps {
  onClose?: () => void
}

export function MealRecorder({ onClose }: MealRecorderProps) {
  const [step, setStep] = useState<'type' | 'photo' | 'details' | 'confirm'>('type')
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')
  const [mealPhoto, setMealPhoto] = useState<MealPhoto | null>(null)
  const [mealName, setMealName] = useState('')
  const [mealDescription, setMealDescription] = useState('')
  const [mealTime, setMealTime] = useState(new Date().toTimeString().slice(0, 5))
  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const [addedFoods, setAddedFoods] = useState<Array<{ name: string; calories: number }>>([])
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addMealEntry } = useNutrition()

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 실제로는 서버에 업로드해야 하지만, 프로토타입이므로 로컬 URL 생성
      const url = URL.createObjectURL(file)
      setMealPhoto({
        id: Date.now().toString(),
        url,
        timestamp: new Date(),
        mealType
      })
      setStep('details')
    }
  }

  const handleTakePhoto = () => {
    // 실제로는 카메라 API를 사용해야 함
    // 여기서는 파일 선택으로 대체
    fileInputRef.current?.click()
  }

  const handleSaveMeal = () => {
    // 식사 저장
    const totalCalories = addedFoods.reduce((sum, food) => sum + food.calories, 0)
    
    addMealEntry({
      foodName: mealName || '사용자 입력 식사',
      mealType,
      calories: totalCalories || 400, // 기본값
      nutrients: {
        protein: 20, // 실제로는 계산해야 함
        carbs: 50,
        fat: 15,
        folate: 100,
        iron: 5,
        calcium: 200,
        fiber: 5
      },
      quantity: 1,
      unit: '회'
    })

    // 완료 메시지 후 닫기
    setStep('confirm')
    setTimeout(() => {
      if (onClose) onClose()
    }, 2000)
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

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return '🌅'
      case 'lunch': return '☀️'
      case 'dinner': return '🌙'
      case 'snack': return '🍿'
      default: return '🍽️'
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">식사 기록</h2>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {['type', 'photo', 'details', 'confirm'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${step === s ? 'bg-pink-500 text-white' : 
                  index < ['type', 'photo', 'details', 'confirm'].indexOf(step) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'}
              `}>
                {index + 1}
              </div>
              {index < 3 && (
                <div className={`w-16 h-0.5 ${
                  index < ['type', 'photo', 'details', 'confirm'].indexOf(step)
                    ? 'bg-green-500' 
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'type' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">식사 시간을 선택하세요</h3>
            <div className="grid grid-cols-2 gap-4">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setMealType(type)
                    setStep('photo')
                  }}
                  className={`
                    p-6 rounded-lg border-2 transition-all
                    ${mealType === type 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 hover:border-pink-300'}
                  `}
                >
                  <div className="text-4xl mb-2">{getMealTypeIcon(type)}</div>
                  <div className="font-medium">{getMealTypeLabel(type)}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'photo' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">사진 추가 (선택사항)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleTakePhoto}
                className="p-8 rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 transition-all"
              >
                <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <div className="text-sm text-gray-600">카메라로 촬영</div>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-8 rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 transition-all"
              >
                <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <div className="text-sm text-gray-600">갤러리에서 선택</div>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {mealPhoto && (
              <div className="relative mt-4">
                <img 
                  src={mealPhoto.url} 
                  alt="Meal" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => setMealPhoto(null)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('type')}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                이전
              </Button>
              <Button onClick={() => setStep('details')}>
                다음
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">식사 정보 입력</h3>

            {mealPhoto && (
              <div className="relative h-32 mb-4">
                <img 
                  src={mealPhoto.url} 
                  alt="Meal" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">식사 이름</label>
                <Input
                  placeholder="예: 연어 샐러드"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">시간</label>
                <Input
                  type="time"
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">메모 (선택)</label>
                <textarea
                  className="w-full p-2 border rounded-lg resize-none"
                  rows={3}
                  placeholder="식사에 대한 메모..."
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">음식 추가</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFoodSearch(!showFoodSearch)}
                  >
                    {showFoodSearch ? '닫기' : '음식 검색'}
                  </Button>
                </div>

                {showFoodSearch && (
                  <FoodSearch 
                    mealType={mealType}
                    onAddFood={(food, servings) => {
                      const calories = Math.round(
                        (food.nutritionPer100g.calories * food.servingSize.weightInGrams / 100) * servings
                      )
                      setAddedFoods([...addedFoods, { name: food.name, calories }])
                      setShowFoodSearch(false)
                    }}
                  />
                )}

                {addedFoods.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {addedFoods.map((food, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{food.name}</span>
                        <span>{food.calories}kcal</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('photo')}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                이전
              </Button>
              <Button onClick={handleSaveMeal}>
                <Save className="w-4 h-4 mr-1" />
                저장
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-medium mb-2">식사가 기록되었습니다!</h3>
            <p className="text-gray-600">
              {getMealTypeLabel(mealType)} 식사가 성공적으로 저장되었습니다.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
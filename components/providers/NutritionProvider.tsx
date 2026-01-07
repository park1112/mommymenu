'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface NutrientTarget {
  name: string
  target: number
  current: number
  unit: string
  priority: 'high' | 'medium' | 'low'
}

interface MealEntry {
  id: string
  timestamp: string
  name: string
  calories: number
  nutrients: {
    protein: number
    carbs: number
    fat: number
    fiber: number
    iron: number
    folate: number
    calcium: number
  }
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients?: string[]
  quantity?: number
  unit?: string
}

export type { MealEntry }

interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  iron: number
  folate: number
  calcium: number
}

interface WeeklyStats {
  averageCalories: number
  proteinGoalAchievement: number
  nutritionBalance: 'excellent' | 'good' | 'needs-improvement'
  waterIntake: number
}

interface NutritionContextType {
  // Current day nutrition
  dailyTargets: NutrientTarget[]
  mealEntries: MealEntry[]
  nutritionGoals: NutritionGoals
  weeklyStats: WeeklyStats
  
  // Actions
  addMealEntry: (meal: Omit<MealEntry, 'id' | 'timestamp'>) => void
  updateMealEntry: (id: string, updates: Partial<MealEntry>) => void
  deleteMealEntry: (id: string) => void
  updateNutritionGoals: (goals: Partial<NutritionGoals>) => void
  
  // Computed values
  getDailyProgress: () => number
  getNutrientProgress: (nutrientName: string) => number
  getRecommendations: () => string[]
  
  // Loading states
  isLoading: boolean
  error: string | null
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined)

export function NutritionProvider({ children }: { children: ReactNode }) {
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([])
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>({
    calories: 2200,
    protein: 80,
    carbs: 280,
    fat: 70,
    fiber: 25,
    iron: 27,
    folate: 400,
    calcium: 1000
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock weekly stats
  const [weeklyStats] = useState<WeeklyStats>({
    averageCalories: 2150,
    proteinGoalAchievement: 87,
    nutritionBalance: 'good',
    waterIntake: 2.1
  })

  // Calculate daily targets based on current intake
  const dailyTargets: NutrientTarget[] = [
    {
      name: 'calories',
      target: nutritionGoals.calories,
      current: mealEntries.reduce((sum, meal) => sum + meal.calories, 0),
      unit: 'kcal',
      priority: 'high'
    },
    {
      name: 'protein',
      target: nutritionGoals.protein,
      current: mealEntries.reduce((sum, meal) => sum + meal.nutrients.protein, 0),
      unit: 'g',
      priority: 'high'
    },
    {
      name: 'carbs',
      target: nutritionGoals.carbs,
      current: mealEntries.reduce((sum, meal) => sum + meal.nutrients.carbs, 0),
      unit: 'g',
      priority: 'medium'
    },
    {
      name: 'fat',
      target: nutritionGoals.fat,
      current: mealEntries.reduce((sum, meal) => sum + meal.nutrients.fat, 0),
      unit: 'g',
      priority: 'medium'
    },
    {
      name: 'iron',
      target: nutritionGoals.iron,
      current: mealEntries.reduce((sum, meal) => sum + meal.nutrients.iron, 0),
      unit: 'mg',
      priority: 'high'
    },
    {
      name: 'folate',
      target: nutritionGoals.folate,
      current: mealEntries.reduce((sum, meal) => sum + meal.nutrients.folate, 0),
      unit: 'mcg',
      priority: 'high'
    }
  ]

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      // Mock initial meal entries for today
      const mockMeals: MealEntry[] = [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          name: '연어 아보카도 토스트',
          calories: 420,
          nutrients: {
            protein: 25,
            carbs: 35,
            fat: 18,
            fiber: 8,
            iron: 3.2,
            folate: 80,
            calcium: 120
          },
          mealType: 'breakfast',
          ingredients: ['연어', '아보카도', '통곡물빵', '올리브오일']
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          name: '요거트 베리 스무디',
          calories: 180,
          nutrients: {
            protein: 12,
            carbs: 25,
            fat: 3,
            fiber: 4,
            iron: 0.5,
            folate: 15,
            calcium: 200
          },
          mealType: 'snack',
          ingredients: ['그릭요거트', '블루베리', '딸기', '바나나']
        }
      ]
      
      setMealEntries(mockMeals)
    }

    loadInitialData()
  }, [])

  const addMealEntry = (meal: Omit<MealEntry, 'id' | 'timestamp'>) => {
    const newMeal: MealEntry = {
      ...meal,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    
    setMealEntries(prev => [...prev, newMeal])
  }

  const updateMealEntry = (id: string, updates: Partial<MealEntry>) => {
    setMealEntries(prev => 
      prev.map(meal => 
        meal.id === id ? { ...meal, ...updates } : meal
      )
    )
  }

  const deleteMealEntry = (id: string) => {
    setMealEntries(prev => prev.filter(meal => meal.id !== id))
  }

  const updateNutritionGoals = (goals: Partial<NutritionGoals>) => {
    setNutritionGoals(prev => ({ ...prev, ...goals }))
  }

  const getDailyProgress = () => {
    const totalCalories = mealEntries.reduce((sum, meal) => sum + meal.calories, 0)
    return Math.min((totalCalories / nutritionGoals.calories) * 100, 100)
  }

  const getNutrientProgress = (nutrientName: string) => {
    const target = dailyTargets.find(t => t.name === nutrientName)
    if (!target) return 0
    return Math.min((target.current / target.target) * 100, 100)
  }

  const getRecommendations = (): string[] => {
    const recommendations = []
    
    // Check for nutrient deficiencies
    const ironProgress = getNutrientProgress('iron')
    const folateProgress = getNutrientProgress('folate')
    const proteinProgress = getNutrientProgress('protein')
    
    if (ironProgress < 70) {
      recommendations.push('철분이 부족합니다. 시금치, 소고기, 콩류를 추가해보세요.')
    }
    
    if (folateProgress < 80) {
      recommendations.push('엽산 섭취를 늘려보세요. 브로콜리, 아스파라거스, 감귤류가 좋습니다.')
    }
    
    if (proteinProgress < 70) {
      recommendations.push('단백질 섭취가 부족합니다. 닭가슴살, 생선, 두부를 추가해보세요.')
    }
    
    // Check for excess
    const calorieProgress = getDailyProgress()
    if (calorieProgress > 120) {
      recommendations.push('칼로리 섭취가 목표를 초과했습니다. 저칼로리 간식을 선택해보세요.')
    }
    
    if (recommendations.length === 0) {
      recommendations.push('훌륭한 영양 균형을 유지하고 있습니다! 계속 유지하세요.')
    }
    
    return recommendations
  }

  const value = {
    dailyTargets,
    mealEntries,
    nutritionGoals,
    weeklyStats,
    addMealEntry,
    updateMealEntry,
    deleteMealEntry,
    updateNutritionGoals,
    getDailyProgress,
    getNutrientProgress,
    getRecommendations,
    isLoading,
    error
  }

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  )
}

export function useNutrition() {
  const context = useContext(NutritionContext)
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider')
  }
  return context
}
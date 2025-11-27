'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useNutrition } from '@/components/providers'
import { Sparkles, Heart, Droplet, Zap } from 'lucide-react'

export function NutritionStatusWidget() {
  const { dailyTargets, getDailyProgress, getNutrientProgress, getRecommendations } = useNutrition()
  
  const nutritionScore = getDailyProgress()
  const scoreColor = nutritionScore >= 90 ? 'text-emerald-600' : 
                    nutritionScore >= 80 ? 'text-teal-600' : 
                    nutritionScore >= 70 ? 'text-amber-600' : 'text-rose-600'

  // Enhanced nutrient data with better icons and organic colors
  const keyNutrients = [
    { 
      name: '엽산', 
      icon: <Sparkles className="w-4 h-4" />,
      value: getNutrientProgress('folate'), 
      color: 'from-emerald-400 to-teal-400',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    { 
      name: '철분', 
      icon: <Heart className="w-4 h-4" />,
      value: getNutrientProgress('iron'), 
      color: 'from-rose-400 to-pink-400',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700'
    },
    { 
      name: '단백질', 
      icon: <Zap className="w-4 h-4" />,
      value: getNutrientProgress('protein'), 
      color: 'from-blue-400 to-indigo-400',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      name: '수분', 
      icon: <Droplet className="w-4 h-4" />,
      value: getNutrientProgress('carbs'), // Using carbs as hydration placeholder
      color: 'from-cyan-400 to-blue-400',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700'
    },
  ]

  const recommendations = getRecommendations()
  const todayRecommendation = recommendations[0] || '균형잡힌 영양 섭취를 유지하세요!'

  // Format number with proper decimal handling
  const formatPercentage = (value: number): string => {
    if (value >= 100 || value === Math.floor(value)) {
      return `${Math.round(value)}`
    }
    return value.toFixed(1)
  }

  return (
    <Card variant="nutrition" className="h-full" glow={true}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-pulse" />
          </div>
          <div>
            <span className="text-lg font-semibold text-emerald-800">영양 현황</span>
            <p className="text-xs text-emerald-600 font-normal">오늘의 건강 지표</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Score Display */}
        <div className="text-center relative">
          <div className="relative inline-block">
            <div className={`text-5xl font-bold ${scoreColor} mb-2 tabular-nums gentle-float`}>
              {Math.round(nutritionScore)}
            </div>
            <div className="absolute -top-2 -right-8">
              <span className="text-lg font-medium text-gray-500">%</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 font-medium mb-3">종합 영양 점수</div>
          <div className="relative">
            <Progress 
              value={nutritionScore}
              variant="nutrition"
              size="lg"
              animated={true}
              glow={true}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Nutrient Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-semibold text-gray-700">핵심 영양소</span>
          </div>
          
          {keyNutrients.map((nutrient, index) => (
            <div key={nutrient.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg ${nutrient.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={nutrient.textColor}>
                      {nutrient.icon}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{nutrient.name}</span>
                </div>
                
                <div className="text-right">
                  <span className="text-sm font-bold tabular-nums text-gray-800">
                    {formatPercentage(nutrient.value)}%
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
                  <div 
                    className={`h-full bg-gradient-to-r ${nutrient.color} rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
                    style={{ width: `${Math.min(nutrient.value, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Goal */}
        <div className="relative">
          <div className="bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-orange-50/80 organic-rounded p-4 border border-pink-100/50 organic-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-pink-700">오늘의 목표</span>
            </div>
            <div className="text-sm font-medium text-pink-800 leading-relaxed">
              {todayRecommendation}
            </div>
          </div>
          
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
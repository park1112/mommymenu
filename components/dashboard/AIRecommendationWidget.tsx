'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Heart, Brain, ArrowRight, RefreshCw, Zap } from 'lucide-react'
import { usePregnancy } from '@/components/providers'
import { getQuickRecommendations, NutritionRecommendation } from '@/lib/ai-recommendations'

export function AIRecommendationWidget() {
  const { pregnancyInfo } = usePregnancy()
  const [recommendations, setRecommendations] = useState<NutritionRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadRecommendations()
  }, [pregnancyInfo.currentWeek])

  const loadRecommendations = async () => {
    setIsLoading(true)
    try {
      // 실제로는 사용자의 증상 데이터를 가져와야 함
      const userSymptoms = ['피로', '변비'] // 예시 증상
      const recs = getQuickRecommendations(pregnancyInfo.currentWeek, userSymptoms)
      setRecommendations(recs)
    } catch (error) {
      console.error('Failed to load recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nutrient':
        return <Sparkles className="h-4 w-4" />
      case 'symptom':
        return <Heart className="h-4 w-4" />
      case 'meal':
        return <Zap className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-rose-50/80 to-pink-50/60 border-rose-200/60 text-rose-800'
      case 'medium':
        return 'from-amber-50/80 to-orange-50/60 border-amber-200/60 text-amber-800'
      default:
        return 'from-emerald-50/80 to-green-50/60 border-emerald-200/60 text-emerald-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '💖'
      case 'medium':
        return '🌟'
      default:
        return '✨'
    }
  }

  return (
    <Card variant="dreamy" className="w-full h-full" glow={true}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-600 gentle-float" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-semibold text-purple-800">AI 추천</span>
              <p className="text-xs text-purple-600 font-normal">개인 맞춤형 조언</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadRecommendations}
            disabled={isLoading}
            className="text-purple-600 hover:bg-purple-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-2 text-purple-600">
              <Brain className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-medium">AI가 분석하고 있어요...</span>
            </div>
          </div>
        ) : recommendations.length > 0 ? (
          <>
            {recommendations.map((rec, index) => (
              <div 
                key={rec.id}
                className={`p-4 bg-gradient-to-br ${getPriorityColor(rec.priority)} organic-rounded border organic-shadow group hover:scale-102 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="text-lg">{getPriorityIcon(rec.priority)}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-current">
                        {getTypeIcon(rec.type)}
                      </div>
                      <span className="font-semibold text-sm">{rec.title}</span>
                    </div>
                    
                    <p className="text-xs opacity-80 mb-3 leading-relaxed">{rec.description}</p>
                    
                    <div className="space-y-2">
                      {rec.recommendations.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5">•</span>
                          <span className="text-xs font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    {rec.priority === 'high' && (
                      <div className="flex justify-end mt-3">
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 organic-rounded"
                glow={true}
              >
                더 많은 추천 보기
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>

            {/* Daily insight */}
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-blue-50/40 organic-rounded border border-pink-100/50 organic-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
                  <span className="text-sm font-semibold text-pink-700">오늘의 인사이트</span>
                </div>
                <p className="text-xs text-pink-600 leading-relaxed">
                  임신 <span className="font-bold">{pregnancyInfo.currentWeek}주차</span>에는{" "}
                  <span className="font-semibold text-rose-700">
                    {pregnancyInfo.trimester === 1 ? '엽산과 비타민 B12' :
                     pregnancyInfo.trimester === 2 ? '칼슘과 단백질' :
                     '철분과 단백질'}
                  </span>{" "}
                  섭취가 특히 중요해요. 꾸준한 관리로 건강한 임신을 이어가세요! 💕
                </p>
              </div>
              
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse" />
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Brain className="h-8 w-8 text-purple-300 mx-auto mb-2" />
            <p className="text-sm text-purple-600">추천을 불러올 수 없어요</p>
            <p className="text-xs text-purple-500 mt-1">잠시 후 다시 시도해주세요</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
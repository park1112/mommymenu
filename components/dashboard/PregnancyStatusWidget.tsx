'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { usePregnancy } from '@/components/providers'
import { Baby, Heart, Calendar, Timer } from 'lucide-react'

export function PregnancyStatusWidget() {
  const { 
    pregnancyInfo, 
    babyDevelopment, 
    maternalHealth, 
    getDaysUntilDue, 
    getProgressPercentage,
    getWeightGainStatus
  } = usePregnancy()
  
  const progressPercentage = getProgressPercentage()
  const daysUntilDue = getDaysUntilDue()
  const weightStatus = getWeightGainStatus()

  return (
    <Card variant="blossom" className="h-full" glow={true} float={true}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <Baby className="w-6 h-6 text-rose-600 gentle-float" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-pulse flex items-center justify-center">
              <Heart className="w-3 h-3 text-white heartbeat" />
            </div>
          </div>
          <div>
            <span className="text-lg font-semibold text-rose-800 dark:text-rose-300">임신 현황</span>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-normal">소중한 생명과 함께</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center relative">
          <div className="relative inline-block">
            <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2 tabular-nums slide-up">
              {pregnancyInfo.currentWeek}주 <span className="text-2xl">{pregnancyInfo.currentDay}일</span>
            </div>
            <div className="absolute -top-2 -right-6">
              <Calendar className="w-5 h-5 text-rose-400 dark:text-rose-500 gentle-float" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-rose-600 dark:text-rose-400 font-medium">
            <Timer className="w-4 h-4" />
            <span>출산까지 <span className="font-bold text-rose-700 dark:text-rose-300">D-{daysUntilDue}</span>일</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
            <span>임신 진행률</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={progressPercentage}
              variant="blossom"
              size="lg"
              animated={true}
              glow={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 bg-gradient-to-br from-rose-50/80 to-pink-50/60 dark:from-rose-900/30 dark:to-pink-900/20 organic-rounded border border-rose-100/50 dark:border-rose-800/30 organic-shadow group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-2">
              <Baby className="w-5 h-5 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-lg font-semibold text-rose-800 dark:text-rose-300 mb-1">아기</div>
            <div className="text-sm text-rose-600 dark:text-rose-400 font-medium">{babyDevelopment.size.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{babyDevelopment.size.weight}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">🥭 {babyDevelopment.size.comparison} 크기</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-50/80 to-rose-50/60 dark:from-pink-900/30 dark:to-rose-900/20 organic-rounded border border-pink-100/50 dark:border-pink-800/30 organic-shadow group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform duration-300 heartbeat" />
            </div>
            <div className="text-lg font-semibold text-pink-800 dark:text-pink-300 mb-1">엄마</div>
            <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-1">+{maternalHealth.weightGain}kg</div>
            <div className={`text-sm font-semibold ${
              weightStatus === 'normal' ? 'text-emerald-600 dark:text-emerald-400' :
              weightStatus === 'under' ? 'text-amber-600 dark:text-amber-400' : 'text-orange-600 dark:text-orange-400'
            }`}>
              {weightStatus === 'normal' ? '✨ 정상 범위' :
               weightStatus === 'under' ? '💪 부족' : '⚠️ 초과'}
            </div>
            <div className="text-xs text-pink-500 dark:text-pink-400 mt-1 leading-relaxed">
              권장: {maternalHealth.targetWeightGain.min}-{maternalHealth.targetWeightGain.max}kg
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
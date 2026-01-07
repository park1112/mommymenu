'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card, { CardContent } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { Progress } from '@/components/ui/progress'
import { 
  Baby, Utensils, Target, Users, CheckCircle,
  ArrowRight, Sparkles, Heart, BookOpen
} from 'lucide-react'

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: any
  content: React.ReactNode
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'MommyMenu에 오신 것을 환영합니다!',
      description: '건강한 임신을 위한 맞춤형 영양 관리 서비스입니다',
      icon: Sparkles,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center mx-auto">
            <Baby className="w-16 h-16 text-pink-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              AI 기반 맞춤 영양 관리
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              임신 주수와 개인 건강 상태에 맞는 식단을 추천받고,
              전문가의 검증된 정보로 안전하고 건강한 임신을 준비하세요.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">10,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">만족한 예비엄마</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">영양 목표 달성률</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '개인 맞춤 식단 추천',
      description: 'AI가 분석하는 나만의 영양 플랜',
      icon: Utensils,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto">
            <Utensils className="w-16 h-16 text-green-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              똑똑한 AI 영양사
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              임신 단계별 필요 영양소를 분석하고,
              개인의 취향과 알레르기 정보를 고려한
              맞춤형 식단을 매일 추천해드려요.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">임신 주수별 필수 영양소 관리</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">개인 취향 반영 레시피 추천</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">알레르기·주의식품 자동 필터링</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '실시간 영양 추적',
      description: '매일의 영양 상태를 한눈에 확인하세요',
      icon: Target,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto">
            <Target className="w-16 h-16 text-blue-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              과학적 영양 분석
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              섭취한 음식을 기록하면 AI가 실시간으로 분석하여
              부족한 영양소를 알려주고 개선 방안을 제시해드려요.
            </p>

            {/* Mock Nutrition Chart */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">오늘의 영양 현황</span>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">87% 달성</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                  <span>칼로리</span>
                  <span>1,850 / 2,200 kcal</span>
                </div>
                <Progress value={84} className="h-2" />
                <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                  <span>엽산</span>
                  <span>350 / 400 mcg</span>
                </div>
                <Progress value={87} className="h-2" />
                <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                  <span>철분</span>
                  <span>18 / 27 mg</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: '예비엄마 커뮤니티',
      description: '같은 시기 예비엄마들과 소중한 경험을 나누세요',
      icon: Users,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-violet-200 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-16 h-16 text-purple-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              함께하는 임신 여정
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              비슷한 시기의 예비엄마들과 경험을 공유하고,
              전문가의 조언을 받으며 안전하고 즐거운
              임신 기간을 보내세요.
            </p>

            {/* Mock Community Posts */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
                <div className="w-8 h-8 bg-pink-200 dark:bg-pink-900/50 rounded-full flex items-center justify-center text-xs font-semibold text-pink-700 dark:text-pink-300">
                  김
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">김미영님 (28주)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">입덧 완화에 도움된 음식들 공유해요! 🤗</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
                <div className="w-8 h-8 bg-blue-200 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700 dark:text-blue-300">
                  박
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">박지은님 (32주)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">임신 중 운동 루틴 어떻게 하시나요? 💪</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '준비가 완료되었습니다!',
      description: '이제 MommyMenu와 함께 건강한 임신을 시작해보세요',
      icon: Heart,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-16 h-16 text-pink-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              환영합니다! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              MommyMenu가 임신부터 출산까지
              건강하고 행복한 여정을 함께하겠습니다.
              지금 바로 시작해보세요!
            </p>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
              <div className="flex items-center justify-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <span className="font-semibold text-pink-800 dark:text-pink-300">첫 걸음 가이드</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">프로필에서 임신 정보를 완성해주세요</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">오늘의 첫 식사를 기록해보세요</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">AI 추천 식단을 확인해보세요</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep - 1]
  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // TODO: Mark onboarding as completed in user profile
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding completion failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">진행률</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{currentStep} / {steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            {currentStepData.content}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            건너뛰기
          </Button>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                이전
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              loading={isLoading}
              className="bg-pink-600 hover:bg-pink-700"
              icon={currentStep === steps.length ? undefined : <ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {currentStep === steps.length ? '시작하기' : '다음'}
            </Button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`w-3 h-3 rounded-full transition-colors ${
                step.id === currentStep
                  ? 'bg-pink-600'
                  : step.id < currentStep
                  ? 'bg-pink-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
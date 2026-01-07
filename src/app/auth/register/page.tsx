'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { Baby, Heart, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    // Step 2: Pregnancy Info
    dueDate: '',
    isFirstPregnancy: '',
    // Step 3: Preferences
    allergies: '',
    dietaryPreferences: [],
    notificationSettings: {
      meals: true,
      appointments: true,
      community: true
    }
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleInputChange = (field: string, value: string | boolean | string[] | { meals: boolean; appointments: boolean; community: boolean }) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {}
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.'
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {}
    let isValid = true

    if (!formData.dueDate) {
      newErrors.dueDate = '출산예정일을 입력해주세요.'
      isValid = false
    }

    if (!formData.isFirstPregnancy) {
      newErrors.isFirstPregnancy = '임신 경험을 선택해주세요.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement actual registration
      console.log('Registration data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to onboarding
      router.push('/onboarding')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Input
          label="이름"
          placeholder="홍길동"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          required
        />
      </div>

      <div>
        <Input
          label="이메일"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div>
        <Input
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="8자 이상 입력해주세요"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          required
        />
      </div>

      <div>
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Input
          label="출산예정일"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          error={errors.dueDate}
          helperText="정확한 예정일을 입력하면 더 정확한 정보를 제공받을 수 있어요"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
          임신 경험 <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-800">
            <input
              type="radio"
              name="isFirstPregnancy"
              value="true"
              checked={formData.isFirstPregnancy === 'true'}
              onChange={(e) => handleInputChange('isFirstPregnancy', e.target.value)}
              className="w-4 h-4 text-pink-600 border-gray-300 dark:border-gray-600 focus:ring-pink-500"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">첫 임신이에요</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">임신과 관련된 기초 정보를 더 자세히 안내드릴게요</div>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-800">
            <input
              type="radio"
              name="isFirstPregnancy"
              value="false"
              checked={formData.isFirstPregnancy === 'false'}
              onChange={(e) => handleInputChange('isFirstPregnancy', e.target.value)}
              className="w-4 h-4 text-pink-600 border-gray-300 dark:border-gray-600 focus:ring-pink-500"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">임신 경험이 있어요</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">이전 경험을 바탕으로 맞춤 정보를 제공해드릴게요</div>
            </div>
          </label>
        </div>
        {errors.isFirstPregnancy && (
          <p className="text-red-500 text-sm mt-1">{errors.isFirstPregnancy}</p>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Input
          label="알레르기 정보"
          placeholder="견과류, 해산물, 달걀 등 (선택사항)"
          value={formData.allergies}
          onChange={(e) => handleInputChange('allergies', e.target.value)}
          helperText="알레르기가 있다면 안전한 식단을 추천해드릴게요"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">알림 설정</label>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">식사 알림</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">식사 시간과 영양 정보를 알려드려요</div>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('notificationSettings', {
                ...formData.notificationSettings,
                meals: !formData.notificationSettings.meals
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notificationSettings.meals ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.notificationSettings.meals ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">검진 알림</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">병원 예약일과 검사 일정을 알려드려요</div>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('notificationSettings', {
                ...formData.notificationSettings,
                appointments: !formData.notificationSettings.appointments
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notificationSettings.appointments ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.notificationSettings.appointments ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">커뮤니티 알림</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">새로운 게시글과 댓글을 알려드려요</div>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('notificationSettings', {
                ...formData.notificationSettings,
                community: !formData.notificationSettings.community
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notificationSettings.community ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.notificationSettings.community ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Baby className="w-8 h-8 text-pink-500" />
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            MommyMenu 회원가입
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            건강한 임신을 위한 맞춤 서비스를 시작하세요
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step <= currentStep
                    ? 'bg-pink-600 border-pink-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-500'
                }`}>
                  {step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-pink-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>기본정보</span>
            <span>임신정보</span>
            <span>설정완료</span>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 1 && '기본 정보'}
              {currentStep === 2 && '임신 정보'}
              {currentStep === 3 && '서비스 설정'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                  >
                    이전
                  </Button>
                )}
                
                <Button
                  type="submit"
                  loading={currentStep === 3 ? isLoading : false}
                  className={`bg-pink-600 hover:bg-pink-700 ${currentStep === 1 ? 'w-full' : 'flex-1'}`}
                >
                  {currentStep === 3 ? '회원가입 완료' : '다음'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            이미 계정이 있으시나요?{' '}
            <Link href="/auth/login" className="text-pink-600 dark:text-pink-400 hover:text-pink-500 font-medium">
              로그인하기
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
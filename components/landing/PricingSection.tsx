import Button from '@/components/ui/button/Button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: '베이직',
    price: '무료',
    period: '',
    description: '기본적인 영양 관리 기능',
    features: [
      'AI 기반 기본 식단 추천',
      '영양소 추적 (기본)',
      '안전 식품 가이드',
      '커뮤니티 참여'
    ],
    cta: '무료 시작',
    highlight: false
  },
  {
    name: '프리미엄',
    price: '29,000원',
    period: '/월',
    description: '전문가 케어와 개인 맞춤 서비스',
    features: [
      '개인 맞춤 AI 식단 (무제한)',
      '상세 영양 분석 리포트',
      '전문 영양사 1:1 상담',
      '프리미엄 레시피 (100+)',
      '실시간 건강 모니터링',
      '우선 고객 지원'
    ],
    cta: '14일 무료 체험',
    highlight: true
  },
  {
    name: '패밀리',
    price: '49,000원',
    period: '/월',
    description: '가족 전체의 건강 관리',
    features: [
      '프리미엄 기능 전체',
      '가족 구성원 추가 (최대 4명)',
      '산부인과 전문의 상담',
      '출산 후 케어 프로그램',
      '수유 & 이유식 가이드',
      '가족 건강 대시보드'
    ],
    cta: '14일 무료 체험',
    highlight: false
  }
]

export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            단계별 맞춤 플랜
          </h2>
          <p className="text-xl text-gray-600">
            임신 여정에 맞는 최적의 영양 관리 플랜을 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 shadow-lg relative ${
                plan.highlight ? 'ring-2 ring-pink-500 scale-105' : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    가장 인기
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/dashboard" className="block">
                <Button 
                  fullWidth 
                  variant={plan.highlight ? 'primary' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            💳 언제든지 변경 가능 • 🔒 개인정보 보호 • ✨ 14일 무료 체험
          </p>
        </div>
      </div>
    </section>
  )
}
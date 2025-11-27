import { UtensilsCrossed, Brain, BarChart3, Shield } from 'lucide-react'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'AI 맞춤 식단',
    description: '임신 주수와 개인 선호도를 고려한 개인 맞춤형 식단을 AI가 추천해드려요.'
  },
  {
    icon: Brain,
    title: '전문가 상담',
    description: '영양사와 산부인과 전문의의 검증된 정보와 1:1 상담 서비스를 제공합니다.'
  },
  {
    icon: BarChart3,
    title: '영양 추적',
    description: '일일 영양소 섭취량을 추적하고 부족한 영양소를 실시간으로 확인하세요.'
  },
  {
    icon: Shield,
    title: '안전한 식품',
    description: '임신 중 피해야 할 식품과 안전한 식품을 구분하여 안내해드립니다.'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            왜 MommyMenu를 선택해야 할까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            과학적 근거와 전문가의 지식을 바탕으로 한 체계적인 임신 영양 관리 시스템
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6">
                <feature.icon className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
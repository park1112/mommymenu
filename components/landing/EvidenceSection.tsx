import { CheckCircle } from 'lucide-react'

const stats = [
  { number: '10,000+', label: '만족한 예비 엄마들' },
  { number: '95%', label: '영양 목표 달성률' },
  { number: '24/7', label: '전문가 지원' },
  { number: '100+', label: '검증된 레시피' }
]

const benefits = [
  '태아 발달에 필수적인 영양소 완벽 섭취',
  '임신 중 체중 관리와 건강한 식습관 형성',
  '입덧 시기별 맞춤 식단으로 영양 불균형 해소',
  '출산 후 수유를 위한 영양 준비'
]

export default function EvidenceSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            검증된 결과
          </h2>
          <p className="text-xl text-gray-600">
            과학적 근거를 바탕으로 한 임신 영양 관리의 실제 효과
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            MommyMenu로 얻을 수 있는 혜택
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
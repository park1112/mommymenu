import { Star } from 'lucide-react'

const testimonials = [
  {
    name: '김미영 님',
    period: '임신 28주',
    rating: 5,
    content: '입덧이 심해서 제대로 먹지 못했는데, MommyMenu 덕분에 필수 영양소를 챙길 수 있었어요. AI 추천 식단이 정말 도움됐습니다.'
  },
  {
    name: '박지은 님',
    period: '출산 후 2개월',
    rating: 5,
    content: '임신 중부터 출산 후까지 체계적으로 영양 관리를 할 수 있어서 좋았어요. 아기도 건강하게 잘 자라고 있어요!'
  },
  {
    name: '이서현 님',
    period: '임신 35주',
    rating: 5,
    content: '전문 영양사 상담을 통해 임신 중 궁금했던 것들을 해결할 수 있었어요. 믿을 수 있는 정보라서 안심이 됩니다.'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            예비 엄마들의 진솔한 후기
          </h2>
          <p className="text-xl text-gray-600">
            MommyMenu와 함께한 특별한 임신 여정
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-pink-600">{testimonial.period}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-pink-50 rounded-lg p-6 inline-block">
            <p className="text-pink-800 font-medium">
              ⭐ 4.9/5.0 평점 • 1,500+ 후기
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
import Button from '@/components/ui/button/Button'
import { Baby, Heart } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Baby className="w-10 h-10 text-white" />
          <Heart className="w-8 h-8 text-pink-200" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          건강한 임신, 지금 시작하세요
        </h2>
        
        <p className="text-xl text-pink-100 max-w-3xl mx-auto mb-8">
          MommyMenu와 함께 과학적이고 체계적인 영양 관리로 
          엄마와 아기 모두 건강한 임신 여정을 만들어가세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button 
              size="lg" 
              className="bg-white text-pink-600 hover:bg-gray-50 border-white font-semibold"
            >
              무료로 시작하기
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-pink-600"
          >
            전문가와 상담하기
          </Button>
        </div>
        
        <div className="mt-12 text-pink-100">
          <p className="text-sm">
            ✨ 14일 무료 체험 • 💳 신용카드 불필요 • 🔒 개인정보 안전 보장
          </p>
        </div>
      </div>
    </section>
  )
}
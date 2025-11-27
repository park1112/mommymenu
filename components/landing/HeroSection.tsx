import Button from '@/components/ui/button/Button'
import { Baby, Heart } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-rose-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Baby className="w-8 h-8 text-pink-500" />
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            건강한 임신을 위한
            <span className="block text-pink-600">맞춤형 영양 관리</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI 기반 개인 맞춤형 식단 추천과 전문 영양사의 조언으로 
            엄마와 아기 모두 건강한 임신 여정을 함께하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                무료로 시작하기
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              더 알아보기
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            💕 이미 10,000명의 예비 엄마들이 MommyMenu와 함께하고 있어요
          </div>
        </div>
      </div>
    </section>
  )
}
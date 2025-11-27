'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Baby, Heart, Apple, Users, Shield, ChevronRight, 
  Star, CheckCircle, TrendingUp, Sparkles
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered:', registration))
        .catch(error => console.log('SW registration failed:', error))
    }
  }, [])

  const features = [
    {
      icon: <Apple className="h-8 w-8" />,
      title: '맞춤형 영양 관리',
      description: '임신 주차별 필요 영양소를 자동으로 계산하고 추천합니다'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'AI 식단 추천',
      description: '개인 취향과 영양 상태를 고려한 스마트한 식단 제안'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '커뮤니티',
      description: '같은 고민을 가진 예비맘들과 경험을 나누세요'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: '안전한 식품 정보',
      description: '임산부가 주의해야 할 식품을 쉽게 확인할 수 있습니다'
    }
  ]

  const stats = [
    { number: '10,000+', label: '활성 사용자' },
    { number: '500+', label: '검증된 레시피' },
    { number: '98%', label: '만족도' },
    { number: '24/7', label: '전문가 상담' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/40 via-pink-50/30 to-orange-50/20 relative overflow-hidden">
      {/* Organic Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-rose-200/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-orange-200/15 to-amber-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-2xl" />
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-100/80 to-rose-100/60 organic-rounded mb-6 organic-shadow blossom-grow">
            <Sparkles className="h-5 w-5 text-pink-600 mr-2" />
            <span className="text-sm font-medium text-pink-700">임산부 영양 관리의 새로운 기준</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 slide-up">
            건강한 임신을 위한<br />
            <span className="text-gradient bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 bg-clip-text text-transparent">맞춤형 영양 파트너</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            MommyMenu와 함께 임신 기간 동안 필요한 영양소를 체계적으로 관리하고,
            건강한 아기를 만나는 여정을 준비하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 organic-rounded organic-shadow-md transition-all duration-300 hover:scale-105 heartbeat"
              onClick={() => router.push('/auth/register')}
            >
              무료로 시작하기
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              className="border-2 border-pink-200 text-pink-700 hover:bg-pink-50 organic-rounded organic-shadow transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
              onClick={() => router.push('/auth/login')}
            >
              로그인
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>무료 이용</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>신용카드 불필요</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>언제든 해지 가능</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MommyMenu가 특별한 이유
            </h2>
            <p className="text-lg text-gray-600">
              임산부와 아기의 건강을 최우선으로 생각합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant={['blossom', 'sage', 'dreamy', 'peachy'][index] as any}
                className="p-6 slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
                hover={true}
                glow={true}
              >
                <div className="text-pink-600 mb-4 gentle-float" style={{ animationDelay: `${index * 0.5}s` }}>{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-pink-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              엄마들의 이야기
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: '김지영',
                week: '32주차',
                content: '입덧이 심했는데 맞춤 식단 추천 덕분에 많이 좋아졌어요. 영양 관리가 쉽어졌습니다.',
                rating: 5
              },
              {
                name: '박서연',
                week: '24주차',
                content: '철분 부족 문제를 해결할 수 있었고, 다른 예비맘들과 정보를 나눌 수 있어 좋아요.',
                rating: 5
              },
              {
                name: '이민아',
                week: '36주차',
                content: '출산 준비하면서 영양 관리까지 신경쓰기 힘들었는데 큰 도움이 되었습니다.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                variant="feminine"
                className="p-6 slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
                float={true}
                glow={true}
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">임신 {testimonial.week}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <Baby className="h-16 w-16 text-pink-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            건강한 임신 여정을 시작하세요
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            지금 가입하고 맞춤형 영양 관리를 경험해보세요
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 organic-rounded organic-shadow-lg transition-all duration-300 hover:scale-105 blossom-grow"
            onClick={() => router.push('/auth/register')}
          >
            지금 시작하기
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Baby className="h-6 w-6 text-pink-600" />
              <span className="font-semibold text-gray-900">MommyMenu</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-pink-600">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-pink-600">이용약관</Link>
              <Link href="/contact" className="hover:text-pink-600">문의하기</Link>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 MommyMenu. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Button from '@/components/ui/button/Button'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Input from '@/components/ui/input/Input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// MommyMenu Widgets
import { PregnancyStatusWidget } from '@/components/dashboard/PregnancyStatusWidget'
import { NutritionStatusWidget } from '@/components/dashboard/NutritionStatusWidget'
import { MealTimelineWidget } from '@/components/dashboard/MealTimelineWidget'
import { HealthMetricsWidget } from '@/components/dashboard/HealthMetricsWidget'
import { AIRecommendationWidget } from '@/components/dashboard/AIRecommendationWidget'
import { QuickActionsWidget } from '@/components/dashboard/QuickActionsWidget'
import { 
  Heart, Baby, UtensilsCrossed, BarChart3, Users, Plus, Search, 
  ChevronRight, Download, Upload, Settings, Bell, Calendar,
  Home, ShoppingCart, Filter, X, Check, Camera, Pill
} from 'lucide-react'

export default function MommyMenuComponentLibrary() {
  const [selectedTab, setSelectedTab] = useState<'widgets' | 'buttons' | 'inputs' | 'cards' | 'colors' | 'typography'>('widgets')

  const tabs = [
    { id: 'widgets' as const, label: '위젯', icon: <Baby className="w-4 h-4" /> },
    { id: 'buttons' as const, label: '버튼', icon: <Plus className="w-4 h-4" /> },
    { id: 'inputs' as const, label: '입력', icon: <Search className="w-4 h-4" /> },
    { id: 'cards' as const, label: '카드', icon: <Heart className="w-4 h-4" /> },
    { id: 'colors' as const, label: '색상', icon: <Settings className="w-4 h-4" /> },
    { id: 'typography' as const, label: '타이포그래피', icon: <BarChart3 className="w-4 h-4" /> },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">💕 MommyMenu 컴포넌트 라이브러리</h1>
        <p className="text-pink-100">
          임신과 영양 관리를 위한 모든 UI 컴포넌트를 한 곳에서 확인하고 테스트하세요.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
                ${selectedTab === tab.id
                  ? 'bg-primary-500 dark:bg-primary-400 text-white shadow-md'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {selectedTab === 'widgets' && <WidgetSection />}
        {selectedTab === 'buttons' && <ButtonSection />}
        {selectedTab === 'inputs' && <InputSection />}
        {selectedTab === 'cards' && <CardSection />}
        {selectedTab === 'colors' && <ColorSection />}
        {selectedTab === 'typography' && <TypographySection />}
      </div>
    </div>
  )
}

// Widget Section
function WidgetSection() {
  return (
    <div className="space-y-8">
      {/* Pregnancy Widgets */}
      <Card>
        <CardHeader>
          <CardTitle>🤰 임신 상태 위젯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <PregnancyStatusWidget />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            임신 주수, 태아 발달 상태, 체중 변화 등을 표시하는 위젯
          </p>
        </CardContent>
      </Card>

      {/* Nutrition Widgets */}
      <Card>
        <CardHeader>
          <CardTitle>🍎 영양 상태 위젯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <NutritionStatusWidget />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            일일 영양 섭취량, 버텄 영양소, 권장 섭취량 대비 진행 상태
          </p>
        </CardContent>
      </Card>

      {/* Meal Timeline Widget */}
      <Card>
        <CardHeader>
          <CardTitle>🍽️ 식사 타임라인 위젯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <MealTimelineWidget />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            하루 식사 계획과 시간별 섭취 현황을 보여주는 타임라인
          </p>
        </CardContent>
      </Card>

      {/* Health Metrics Widget */}
      <Card>
        <CardHeader>
          <CardTitle>📈 건강 지표 위젯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <HealthMetricsWidget />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            체중, 혈압, 혈당 등 주요 건강 지표를 추적하고 관리
          </p>
        </CardContent>
      </Card>

      {/* AI Recommendation Widget */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 AI 추천 위젯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AIRecommendationWidget />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            개인화된 AI 추천 식단과 영양 정보를 제공
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions Widget */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ 빠른 작업 위젯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <QuickActionsWidget />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            자주 사용하는 기능들에 빠른 접근을 제공하는 버튼 모음
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Button Section
function ButtonSection() {
  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>버튼 변형 (Variants)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
        </CardContent>
      </Card>

      {/* Button Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>버튼 크기 (Sizes)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Button with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>아이콘 버튼 (With Icons)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button icon={<UtensilsCrossed className="w-4 h-4" />}>식단 추가</Button>
            <Button icon={<Heart className="w-4 h-4" />} variant="secondary">좋아요</Button>
            <Button icon={<ChevronRight className="w-4 h-4" />} iconPosition="right" variant="outline">
              다음 단계
            </Button>
            <Button icon={<Camera className="w-4 h-4" />} variant="success">사진 추가</Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>로딩 상태 (Loading States)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button loading>처리 중...</Button>
            <Button loading variant="secondary">저장 중...</Button>
            <Button loading variant="success">완료 중...</Button>
          </div>
        </CardContent>
      </Card>

      {/* Full Width */}
      <Card>
        <CardHeader>
          <CardTitle>전체 너비 (Full Width)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button fullWidth>전체 너비 버튼</Button>
          <Button fullWidth variant="outline">전체 너비 아웃라인</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Input Section
function InputSection() {
  return (
    <div className="space-y-8">
      {/* Input Variants */}
      <Card>
        <CardHeader>
          <CardTitle>입력 필드 변형 (Variants)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input variant="default" placeholder="기본 입력 필드" />
          <Input variant="filled" placeholder="채워진 입력 필드" />
          <Input variant="underline" placeholder="언더라인 입력 필드" />
        </CardContent>
      </Card>

      {/* Input Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>입력 필드 크기 (Sizes)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input inputSize="sm" placeholder="작은 입력 필드" />
          <Input inputSize="md" placeholder="중간 입력 필드" />
          <Input inputSize="lg" placeholder="큰 입력 필드" />
        </CardContent>
      </Card>

      {/* Input with Labels */}
      <Card>
        <CardHeader>
          <CardTitle>레이블이 있는 입력 필드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="임산부 이름" placeholder="이름을 입력하세요" />
          <Input label="이메일" type="email" placeholder="email@example.com" required />
          <Input 
            label="예정일" 
            type="date" 
            placeholder="출산예정일을 선택하세요"
            helperText="정확한 예정일을 입력하면 더 정확한 정보를 제공받을 수 있습니다"
          />
        </CardContent>
      </Card>

      {/* Input with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>아이콘이 있는 입력 필드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="식품 검색..." 
            leftIcon={<Search className="w-4 h-4" />}
          />
          <Input 
            placeholder="발길이 부어서 힘들어요" 
            leftIcon={<Heart className="w-4 h-4" />}
            rightIcon={<Check className="w-4 h-4 text-green-500" />}
          />
          <Input 
            placeholder="병원 방문일" 
            type="date"
            leftIcon={<Calendar className="w-4 h-4" />}
          />
        </CardContent>
      </Card>

      {/* Input States */}
      <Card>
        <CardHeader>
          <CardTitle>입력 필드 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="활성 입력 필드" />
          <Input placeholder="비활성화된 입력" disabled />
          <Input 
            placeholder="오류가 있는 입력" 
            error="이 필드는 필수입니다"
          />
          <Input 
            placeholder="성공 상태" 
            rightIcon={<Check className="w-4 h-4 text-green-500" />}
            helperText="올바른 형식입니다"
          />
        </CardContent>
      </Card>

      {/* Input Types */}
      <Card>
        <CardHeader>
          <CardTitle>입력 필드 타입</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" label="증상" placeholder="오늘의 증상을 입력하세요" />
          <Input type="email" label="의사 이메일" placeholder="doctor@hospital.com" />
          <Input type="number" label="체중 (kg)" placeholder="60" />
          <Input type="number" label="임신 주수" placeholder="23" />
          <Input type="tel" label="비상연락처" placeholder="010-1234-5678" />
          <Input type="date" label="마지막 생리" placeholder="2024-01-01" />
        </CardContent>
      </Card>
    </div>
  )
}

// Card Section
function CardSection() {
  return (
    <div className="space-y-8">
      {/* Basic Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>기본 카드</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              기본 카드 컴포넌트입니다. 콘텐츠를 그룹화하고 구조화하는 데 사용됩니다.
            </p>
          </CardContent>
        </Card>

        <Card variant="pregnant-safe">
          <CardHeader>
            <CardTitle>🤰 임신 안전 카드</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-pink-700 dark:text-pink-300">
              임신 중 안전한 식품이나 영양소 정보를 표시할 때 사용합니다.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="nutrition">
          <CardHeader>
            <CardTitle>🍎 영양 정보 카드</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 dark:text-green-300">
              영양소 정보나 건강한 식단 관련 콘텐츠를 표시할 때 사용합니다.
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-200 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20">
          <CardHeader>
            <CardTitle className="text-rose-700 dark:text-rose-400">❤️ 주의 사항 카드</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-rose-600 dark:text-rose-300">
              임신 중 주의해야 할 식품이나 영양소 정보를 표시합니다.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <Card>
        <CardHeader>
          <CardTitle>📈 진행률 카드 예시</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>임신 진행률</span>
              <span>57%</span>
            </div>
            <Progress value={57} className="h-3" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>일일 영양 목표</span>
              <span>83%</span>
            </div>
            <Progress value={83} className="h-3" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>운동 목표</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Avatar Cards */}
      <Card>
        <CardHeader>
          <CardTitle>👤 아바타 예시</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt="사용자" />
              <AvatarFallback className="bg-pink-100 text-pink-600 text-lg font-semibold">임산</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">김임산님</h3>
              <p className="text-gray-600 dark:text-gray-400">임신 23주 3일</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">마지막 접속: 2시간 전</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Color Section
function ColorSection() {
  const colors = {
    primary: [
      { name: 'Pink 50', value: 'bg-pink-50', hex: '#fdf2f8' },
      { name: 'Pink 100', value: 'bg-pink-100', hex: '#fce7f3' },
      { name: 'Pink 200', value: 'bg-pink-200', hex: '#fbcfe8' },
      { name: 'Pink 300', value: 'bg-pink-300', hex: '#f9a8d4' },
      { name: 'Pink 400', value: 'bg-pink-400', hex: '#f472b6' },
      { name: 'Pink 500', value: 'bg-pink-500', hex: '#ec4899' },
      { name: 'Pink 600', value: 'bg-pink-600', hex: '#db2777' },
      { name: 'Pink 700', value: 'bg-pink-700', hex: '#be185d' },
      { name: 'Pink 800', value: 'bg-pink-800', hex: '#9d174d' },
      { name: 'Pink 900', value: 'bg-pink-900', hex: '#831843' },
    ],
    gray: [
      { name: 'Gray 50', value: 'bg-gray-50', hex: '#f9fafb' },
      { name: 'Gray 100', value: 'bg-gray-100', hex: '#f3f4f6' },
      { name: 'Gray 200', value: 'bg-gray-200', hex: '#e5e7eb' },
      { name: 'Gray 300', value: 'bg-gray-300', hex: '#d1d5db' },
      { name: 'Gray 400', value: 'bg-gray-400', hex: '#9ca3af' },
      { name: 'Gray 500', value: 'bg-gray-500', hex: '#6b7280' },
      { name: 'Gray 600', value: 'bg-gray-600', hex: '#4b5563' },
      { name: 'Gray 700', value: 'bg-gray-700', hex: '#374151' },
      { name: 'Gray 800', value: 'bg-gray-800', hex: '#1f2937' },
      { name: 'Gray 900', value: 'bg-gray-900', hex: '#111827' },
    ],
    nutrition: [
      { name: 'Green 50', value: 'bg-green-50', hex: '#f0fdf4' },
      { name: 'Green 100', value: 'bg-green-100', hex: '#dcfce7' },
      { name: 'Green 200', value: 'bg-green-200', hex: '#bbf7d0' },
      { name: 'Green 300', value: 'bg-green-300', hex: '#86efac' },
      { name: 'Green 400', value: 'bg-green-400', hex: '#4ade80' },
      { name: 'Green 500', value: 'bg-green-500', hex: '#22c55e' },
      { name: 'Green 600', value: 'bg-green-600', hex: '#16a34a' },
      { name: 'Green 700', value: 'bg-green-700', hex: '#15803d' },
      { name: 'Green 800', value: 'bg-green-800', hex: '#166534' },
      { name: 'Green 900', value: 'bg-green-900', hex: '#14532d' },
    ],
    semantic: [
      { name: 'Safe', value: 'bg-green-500', hex: '#22c55e' },
      { name: 'Caution', value: 'bg-yellow-500', hex: '#f59e0b' },
      { name: 'Avoid', value: 'bg-red-500', hex: '#ef4444' },
      { name: 'Pregnancy', value: 'bg-pink-500', hex: '#ec4899' },
    ],
  }

  return (
    <div className="space-y-8">
      {/* Primary Colors */}
      <Card>
        <CardHeader>
          <CardTitle>주요 색상 (Primary Pink)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {colors.primary.map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`${color.value} h-20 rounded-lg shadow-sm`} />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{color.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Colors */}
      <Card>
        <CardHeader>
          <CardTitle>영양 색상 (Nutrition Green)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {colors.nutrition.map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`${color.value} h-20 rounded-lg shadow-sm border`} />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{color.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gray Scale */}
      <Card>
        <CardHeader>
          <CardTitle>그레이 스케일 (Gray Scale)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {colors.gray.map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`${color.value} h-20 rounded-lg shadow-sm border`} />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{color.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Semantic Colors */}
      <Card>
        <CardHeader>
          <CardTitle>의미 색상 (Pregnancy & Nutrition)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {colors.semantic.map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`${color.value} h-20 rounded-lg shadow-sm`} />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{color.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


// Typography Section
function TypographySection() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>제목 (Headings)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">Heading 1 (5xl)</h1>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Heading 2 (4xl)</h2>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Heading 3 (3xl)</h3>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Heading 4 (2xl)</h4>
          <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">Heading 5 (xl)</h5>
          <h6 className="text-lg font-bold text-gray-900 dark:text-gray-100">Heading 6 (lg)</h6>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>본문 텍스트 (Body Text)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Large (lg): 이것은 큰 크기의 본문 텍스트입니다. 주요 설명이나 강조하고 싶은 내용에 사용합니다.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Base: 이것은 기본 크기의 본문 텍스트입니다. 일반적인 콘텐츠에 가장 많이 사용됩니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Small (sm): 이것은 작은 크기의 본문 텍스트입니다. 부가 정보나 캡션에 사용합니다.
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Extra Small (xs): 이것은 매우 작은 크기의 본문 텍스트입니다. 메타 정보나 레이블에 사용합니다.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>폰트 굵기 (Font Weight)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="font-light text-gray-700 dark:text-gray-300">Light (300)</p>
          <p className="font-normal text-gray-700 dark:text-gray-300">Normal (400)</p>
          <p className="font-medium text-gray-700 dark:text-gray-300">Medium (500)</p>
          <p className="font-semibold text-gray-700 dark:text-gray-300">Semibold (600)</p>
          <p className="font-bold text-gray-700 dark:text-gray-300">Bold (700)</p>
        </CardContent>
      </Card>
    </div>
  )
}
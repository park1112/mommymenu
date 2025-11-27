# MommyMenu 개발 체크리스트

## 📋 개요
본 체크리스트는 MommyMenu 임산부 맞춤 AI 영양 관리 플랫폼의 체계적인 개발을 위한 가이드입니다.

### 🗂️ 참조 기획 문서
```
planning/
├── 00_MASTER_PLAN.md           # 전체 전략 및 기술 스택
├── 01_SITE_ARCHITECTURE.md     # 사이트 구조 및 정보 설계
├── 02_MAIN_PAGE_DESIGN.md      # 메인 페이지 상세 기획
├── 03_USER_DASHBOARD.md        # 사용자 대시보드 기획
├── 04_MEAL_GENERATION.md       # 식단 생성 페이지 기획
├── 05_NUTRITION_ANALYSIS.md    # 영양 분석 페이지 기획
├── 06_COMMUNITY_SUPPORT.md     # 커뮤니티 및 지원 기획
└── 07_MOBILE_UX_GUIDE.md       # 모바일 우선 UI/UX 가이드
```

---

## 🚀 Phase 1: 프로젝트 초기 설정 (1-2주)

### 1.1 개발 환경 구축
**참조**: `00_MASTER_PLAN.md` (기술 스택 섹션)

- [ ] **Next.js 14 프로젝트 초기화**
  ```bash
  npx create-next-app@latest mommymenu --typescript --tailwind --eslint --app
  ```

- [ ] **필수 패키지 설치**
  ```bash
  # UI 컴포넌트
  npm install @radix-ui/react-* lucide-react class-variance-authority clsx tailwind-merge

  # 상태 관리
  npm install zustand @tanstack/react-query

  # API & Database
  npm install @supabase/supabase-js @trpc/client @trpc/server @trpc/react-query @trpc/next

  # 폼 관리
  npm install react-hook-form @hookform/resolvers zod

  # 차트 & 시각화
  npm install recharts

  # PWA
  npm install next-pwa

  # 개발 도구
  npm install -D @types/node prettier eslint-config-prettier
  ```

- [ ] **폴더 구조 생성**
  ```
  src/
  ├── app/                    # Next.js 13+ App Router
  ├── components/             # 재사용 컴포넌트
  │   ├── ui/                # 기본 UI 컴포넌트
  │   ├── forms/             # 폼 컴포넌트
  │   ├── charts/            # 차트 컴포넌트
  │   └── layout/            # 레이아웃 컴포넌트
  ├── lib/                   # 유틸리티 & 설정
  ├── store/                 # Zustand 스토어
  ├── types/                 # TypeScript 타입
  └── styles/                # 글로벌 스타일
  ```

- [ ] **환경 변수 설정**
  ```bash
  # .env.local 생성
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  OPENAI_API_KEY=
  ```

---

## 🗄️ Phase 2: 백엔드 인프라 설정 (1주)

### 2.1 Supabase 설정
**참조**: `00_MASTER_PLAN.md` (시스템 아키텍처), `01_SITE_ARCHITECTURE.md`

- [ ] **Supabase 프로젝트 생성**
  - 새 프로젝트 생성
  - 데이터베이스 비밀번호 설정
  - API URL과 키 복사

- [ ] **데이터베이스 스키마 생성**
  ```sql
  -- 사용자 프로필
  CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    pregnancy_week INTEGER,
    due_date DATE,
    pre_pregnancy_weight DECIMAL,
    current_weight DECIMAL,
    height DECIMAL,
    blood_type TEXT,
    allergies TEXT[],
    medical_conditions TEXT[],
    genetics_info JSONB,
    preferences JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 식단 기록
  CREATE TABLE meals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    meal_type TEXT NOT NULL, -- breakfast, lunch, dinner, snack
    meal_date DATE NOT NULL,
    foods JSONB NOT NULL,
    nutrition_summary JSONB,
    ai_generated BOOLEAN DEFAULT FALSE,
    satisfaction_rating INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 영양 추적
  CREATE TABLE nutrition_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    log_date DATE NOT NULL,
    nutrients JSONB NOT NULL,
    daily_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 커뮤니티 게시물
  CREATE TABLE community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    post_type TEXT NOT NULL, -- question, share, story, recipe
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_expert_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```

- [ ] **Row Level Security (RLS) 설정**
  ```sql
  -- profiles 테이블 RLS
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
  CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

  -- meals 테이블 RLS
  ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can view own meals" ON meals FOR SELECT USING (auth.uid() = user_id);
  CREATE POLICY "Users can insert own meals" ON meals FOR INSERT WITH CHECK (auth.uid() = user_id);
  ```

- [ ] **Storage 설정**
  - 프로필 이미지용 버킷 생성
  - 식사 사진용 버킷 생성
  - 적절한 권한 설정

### 2.2 API 라우트 설정
**참조**: `00_MASTER_PLAN.md`

- [ ] **tRPC 라우터 구성**
  ```typescript
  // src/server/api/root.ts
  export const appRouter = createTRPCRouter({
    auth: authRouter,
    profile: profileRouter,
    meals: mealsRouter,
    nutrition: nutritionRouter,
    community: communityRouter,
    ai: aiRouter,
  });
  ```

- [ ] **인증 미들웨어 설정**
  ```typescript
  // src/lib/auth.ts
  // Supabase Auth 설정
  ```

---

## 🎨 Phase 3: 디자인 시스템 구축 (1주)

### 3.1 디자인 토큰 설정
**참조**: `07_MOBILE_UX_GUIDE.md` (디자인 시스템 섹션)

- [ ] **Tailwind CSS 설정**
  ```javascript
  // tailwind.config.js
  module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            pink: '#FF6B9D',
            green: '#4ECDC4',
            yellow: '#FFE66D',
          },
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        },
        fontFamily: {
          sans: ['Pretendard', 'system-ui', 'sans-serif'],
        }
      }
    }
  }
  ```

- [ ] **글로벌 CSS 설정**
  ```css
  /* src/styles/globals.css */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    html {
      font-family: 'Pretendard', system-ui, sans-serif;
    }
    
    /* 임산부 친화적 기본 설정 */
    body {
      font-size: 16px; /* 기본보다 큰 크기 */
      line-height: 1.6;
    }
  }
  ```

### 3.2 기본 UI 컴포넌트
**참조**: `07_MOBILE_UX_GUIDE.md` (컴포넌트 설계 섹션)

- [ ] **Button 컴포넌트**
  ```typescript
  // src/components/ui/Button.tsx
  // Primary, Secondary, Soft 버튼 변형
  // 최소 48px 터치 영역 보장
  ```

- [ ] **Input 컴포넌트**
  ```typescript
  // src/components/ui/Input.tsx
  // 52px 높이, 16px 폰트 크기 (iOS 줌 방지)
  // 에러 상태, 포커스 스타일 포함
  ```

- [ ] **Card 컴포넌트**
  ```typescript
  // src/components/ui/Card.tsx
  // 16px 둥근 모서리, 부드러운 그림자
  // 터치 피드백 포함
  ```

- [ ] **Typography 컴포넌트**
  ```typescript
  // src/components/ui/Typography.tsx
  // h1, h2, h3, body, small, caption 변형
  ```

---

## 📱 Phase 4: 레이아웃 및 네비게이션 (1주)

### 4.1 기본 레이아웃
**참조**: `01_SITE_ARCHITECTURE.md` (네비게이션 구조), `07_MOBILE_UX_GUIDE.md`

- [ ] **루트 레이아웃**
  ```typescript
  // src/app/layout.tsx
  // 기본 HTML 구조, 메타데이터, PWA 설정
  ```

- [ ] **네비게이션 컴포넌트**
  ```typescript
  // src/components/layout/Navigation.tsx
  // 상단 네비게이션 (데스크톱)
  // Bottom Tab Navigation (모바일)
  ```

- [ ] **사이드바 컴포넌트**
  ```typescript
  // src/components/layout/Sidebar.tsx
  // 데스크톱용 사이드바
  // 모바일 슬라이드 메뉴
  ```

### 4.2 반응형 레이아웃
**참조**: `07_MOBILE_UX_GUIDE.md` (반응형 디자인)

- [ ] **컨테이너 컴포넌트**
  ```typescript
  // src/components/layout/Container.tsx
  // 반응형 최대 너비, 패딩 설정
  ```

- [ ] **그리드 시스템**
  ```typescript
  // src/components/layout/Grid.tsx
  // 1열(모바일) → 2열(태블릿) → 3열(데스크톱)
  ```

---

## 🔐 Phase 5: 인증 시스템 (3-4일)

### 5.1 인증 페이지
**참조**: `01_SITE_ARCHITECTURE.md` (온보딩 플로우)

- [ ] **로그인 페이지**
  ```typescript
  // src/app/auth/login/page.tsx
  // 이메일/비밀번호, 소셜 로그인
  ```

- [ ] **회원가입 페이지**
  ```typescript
  // src/app/auth/signup/page.tsx
  // 기본 정보 입력
  ```

### 5.2 온보딩 플로우
**참조**: `01_SITE_ARCHITECTURE.md` (온보딩 플로우)

- [ ] **임신 정보 입력**
  ```typescript
  // src/app/onboarding/pregnancy-info/page.tsx
  // 임신 주차, 예정일, 건강 상태
  ```

- [ ] **선호도 설정**
  ```typescript
  // src/app/onboarding/preferences/page.tsx
  // 음식 취향, 알레르기, 제한사항
  ```

- [ ] **프로필 완성**
  ```typescript
  // src/app/onboarding/complete/page.tsx
  // 온보딩 완료, 첫 식단 생성 안내
  ```

---

## 🏠 Phase 6: 메인 페이지 구현 (3-4일)

### 6.1 랜딩 페이지
**참조**: `02_MAIN_PAGE_DESIGN.md` (전체 구조)

- [ ] **Hero 섹션**
  ```typescript
  // src/components/landing/HeroSection.tsx
  // 메인 헤드라인, CTA 버튼, 임신 주차 계산기
  ```

- [ ] **특징 소개 섹션**
  ```typescript
  // src/components/landing/FeaturesSection.tsx
  // 4대 핵심 기능 카드
  ```

- [ ] **과학적 근거 섹션**
  ```typescript
  // src/components/landing/EvidenceSection.tsx
  // 데이터 시각화, 연구 결과
  ```

- [ ] **성공 사례 섹션**
  ```typescript
  // src/components/landing/TestimonialsSection.tsx
  // 사용자 후기 캐러셀
  ```

- [ ] **가격 플랜 섹션**
  ```typescript
  // src/components/landing/PricingSection.tsx
  // 3단계 가격 플랜
  ```

### 6.2 랜딩 페이지 최적화
**참조**: `02_MAIN_PAGE_DESIGN.md` (성능 최적화, SEO)

- [ ] **SEO 최적화**
  - 메타 태그 설정
  - 구조화 데이터 (JSON-LD)
  - 사이트맵 생성

- [ ] **성능 최적화**
  - 이미지 최적화 (WebP, 지연 로딩)
  - 코드 스플리팅
  - 폰트 최적화

---

## 📊 Phase 7: 대시보드 구현 (1주)

### 7.1 대시보드 레이아웃
**참조**: `03_USER_DASHBOARD.md` (레이아웃 섹션)

- [ ] **대시보드 페이지**
  ```typescript
  // src/app/dashboard/page.tsx
  // 전체 대시보드 레이아웃
  ```

- [ ] **임신 상태 위젯**
  ```typescript
  // src/components/dashboard/PregnancyStatusWidget.tsx
  // 임신 주차, 태아 정보, 체중 변화
  ```

- [ ] **오늘의 식단 타임라인**
  ```typescript
  // src/components/dashboard/MealTimelineWidget.tsx
  // 식사 시간별 진행 상황
  ```

### 7.2 대시보드 위젯
**참조**: `03_USER_DASHBOARD.md` (위젯별 상세 기능)

- [ ] **영양 현황 위젯**
  ```typescript
  // src/components/dashboard/NutritionStatusWidget.tsx
  // 주요 영양소 게이지 차트
  ```

- [ ] **건강 지표 위젯**
  ```typescript
  // src/components/dashboard/HealthMetricsWidget.tsx
  // 체중, 혈당, 활동량 미니 차트
  ```

- [ ] **AI 추천 위젯**
  ```typescript
  // src/components/dashboard/AIRecommendationWidget.tsx
  // 개인화된 추천 사항
  ```

- [ ] **빠른 실행 위젯**
  ```typescript
  // src/components/dashboard/QuickActionsWidget.tsx
  // 주요 기능 빠른 접근
  ```

---

## 🍱 Phase 8: 식단 생성 시스템 (1-2주)

### 8.1 식단 생성 페이지
**참조**: `04_MEAL_GENERATION.md` (단계별 상세 기능)

- [ ] **Step 1: 현재 상태 입력**
  ```typescript
  // src/components/meal-generation/CurrentStateForm.tsx
  // 컨디션, 증상, 갈망/혐오 음식 입력
  ```

- [ ] **Step 2: 식사 타입 선택**
  ```typescript
  // src/components/meal-generation/MealTypeSelector.tsx
  // 아침/점심/저녁/간식 선택
  ```

- [ ] **Step 3: 선호도 설정**
  ```typescript
  // src/components/meal-generation/PreferencesForm.tsx
  // 요리 스타일, 조리 복잡도
  ```

- [ ] **Step 4: AI 식단 생성**
  ```typescript
  // src/components/meal-generation/AIGenerationProgress.tsx
  // 생성 진행 상황 표시
  ```

- [ ] **Step 5: 식단 옵션 선택**
  ```typescript
  // src/components/meal-generation/MealOptionsSelector.tsx
  // 3가지 옵션 제시 및 선택
  ```

- [ ] **Step 6: 커스터마이징**
  ```typescript
  // src/components/meal-generation/MealCustomizer.tsx
  // 선택된 식단 수정 및 최종 확정
  ```

### 8.2 AI 식단 생성 엔진
**참조**: `04_MEAL_GENERATION.md` (AI 생성 알고리즘)

- [ ] **AI API 연동**
  ```typescript
  // src/lib/ai/meal-generator.ts
  // OpenAI API 연동, 프롬프트 엔지니어링
  ```

- [ ] **영양 계산 엔진**
  ```typescript
  // src/lib/nutrition/calculator.ts
  // 영양소 계산, 목표 대비 평가
  ```

- [ ] **레시피 데이터베이스**
  ```typescript
  // src/lib/recipes/database.ts
  // 레시피 매칭, 검색 기능
  ```

---

## 📈 Phase 9: 영양 분석 시스템 (1주)

### 9.1 영양 분석 페이지
**참조**: `05_NUTRITION_ANALYSIS.md` (페이지 구조)

- [ ] **영양 분석 대시보드**
  ```typescript
  // src/app/nutrition/page.tsx
  // 종합 영양 현황 페이지
  ```

- [ ] **영양 스코어 카드**
  ```typescript
  // src/components/nutrition/NutritionScoreCard.tsx
  // 종합 점수 및 주요 지표
  ```

### 9.2 상세 분석 컴포넌트
**참조**: `05_NUTRITION_ANALYSIS.md` (영양소별 상세 분석)

- [ ] **영양소별 분석**
  ```typescript
  // src/components/nutrition/NutrientDetailCard.tsx
  // 개별 영양소 상세 정보 (엽산, 철분 등)
  ```

- [ ] **트렌드 차트**
  ```typescript
  // src/components/nutrition/TrendCharts.tsx
  // 주간/월간 영양 트렌드
  ```

- [ ] **특별 추적**
  ```typescript
  // src/components/nutrition/SpecialTracking.tsx
  // 수은 모니터링, CGM 혈당 분석
  ```

### 9.3 AI 개선 제안
**참조**: `05_NUTRITION_ANALYSIS.md` (AI 개선 제안)

- [ ] **개인화된 추천**
  ```typescript
  // src/components/nutrition/PersonalizedRecommendations.tsx
  // AI 기반 맞춤 개선 플랜
  ```

- [ ] **유전자 기반 조언**
  ```typescript
  // src/components/nutrition/GeneticAdvice.tsx
  // 유전자 분석 기반 맞춤 가이드
  ```

---

## 👥 Phase 10: 커뮤니티 시스템 (1-2주)

### 10.1 커뮤니티 피드
**참조**: `06_COMMUNITY_SUPPORT.md` (커뮤니티 피드)

- [ ] **커뮤니티 메인**
  ```typescript
  // src/app/community/page.tsx
  // 통합 커뮤니티 페이지
  ```

- [ ] **게시물 피드**
  ```typescript
  // src/components/community/PostFeed.tsx
  // 실시간 게시물 피드
  ```

- [ ] **글쓰기 기능**
  ```typescript
  // src/components/community/PostEditor.tsx
  // 통합 에디터 (일반글, 질문, 식단 공유)
  ```

### 10.2 그룹 및 전문가 시스템
**참조**: `06_COMMUNITY_SUPPORT.md` (그룹 커뮤니티, 전문가 지원)

- [ ] **그룹 페이지**
  ```typescript
  // src/app/community/groups/page.tsx
  // 주차별, 관심사별 그룹
  ```

- [ ] **전문가 Q&A**
  ```typescript
  // src/components/community/ExpertQA.tsx
  // 전문가 질문/답변 시스템
  ```

- [ ] **실시간 상담**
  ```typescript
  // src/components/community/LiveConsultation.tsx
  // 화상 상담 기능 (추후 구현)
  ```

---

## 🔧 Phase 11: 고급 기능 구현 (2-3주)

### 11.1 PWA 및 모바일 최적화
**참조**: `07_MOBILE_UX_GUIDE.md` (PWA, 모바일 특화 기능)

- [ ] **PWA 설정**
  ```typescript
  // next.config.js - PWA 설정
  // public/manifest.json
  // src/app/sw.ts - Service Worker
  ```

- [ ] **오프라인 지원**
  ```typescript
  // src/lib/offline/cache.ts
  // 기본 데이터 캐싱, 동기화
  ```

- [ ] **푸시 알림**
  ```typescript
  // src/lib/notifications/push.ts
  // 식사 시간, 영양제 복용 알림
  ```

### 11.2 고급 분석 기능

- [ ] **CGM 연동**
  ```typescript
  // src/lib/devices/cgm.ts
  // 연속혈당측정기 데이터 연동
  ```

- [ ] **웨어러블 연동**
  ```typescript
  // src/lib/devices/wearables.ts
  // 활동량계, 체중계 연동
  ```

- [ ] **의료진 대시보드**
  ```typescript
  // src/app/medical/dashboard/page.tsx
  // 의료진용 환자 모니터링
  ```

---

## 🧪 Phase 12: 테스트 구현 (1주)

### 12.1 단위 테스트
**참조**: `00_MASTER_PLAN.md` (테스팅 가이드라인)

- [ ] **컴포넌트 테스트**
  ```bash
  npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
  ```

- [ ] **API 테스트**
  ```typescript
  // src/__tests__/api/
  // tRPC 라우터 테스트
  ```

### 12.2 E2E 테스트

- [ ] **핵심 사용자 플로우 테스트**
  ```bash
  npm install -D playwright @playwright/test
  ```

- [ ] **접근성 테스트**
  ```typescript
  // src/__tests__/accessibility/
  // WCAG 2.1 준수 테스트
  ```

---

## 🚀 Phase 13: 배포 및 모니터링 (3-4일)

### 13.1 프로덕션 배포

- [ ] **Vercel 배포 설정**
  ```bash
  # 환경 변수 설정
  # 도메인 연결
  # SSL 인증서 설정
  ```

- [ ] **Supabase 프로덕션 설정**
  - 프로덕션 데이터베이스
  - 백업 설정
  - 모니터링 설정

### 13.2 모니터링 및 분석

- [ ] **성능 모니터링**
  ```typescript
  // Vercel Analytics
  // Sentry 에러 추적
  ```

- [ ] **사용자 분석**
  ```typescript
  // Google Analytics 4
  // PostHog (A/B 테스트)
  ```

---

## 📋 Phase 14: 최종 점검 및 론칭 준비

### 14.1 품질 보증

- [ ] **보안 점검**
  - OWASP Top 10 취약점 점검
  - 개인정보 보호 정책 준수
  - 의료 데이터 보안 검증

- [ ] **성능 최적화**
  - Core Web Vitals 최적화
  - SEO 점수 90+ 달성
  - 접근성 AA 등급 달성

### 14.2 콘텐츠 및 데이터

- [ ] **초기 데이터 준비**
  - 레시피 데이터베이스 (최소 1000개)
  - 영양소 데이터베이스
  - 교육 콘텐츠

- [ ] **전문가 네트워크 구축**
  - 산부인과 전문의 3명 이상
  - 임상영양사 5명 이상
  - 콘텐츠 검증 시스템

---

## 📊 성공 지표 및 모니터링

### KPI 대시보드 설정

- [ ] **사용자 참여 지표**
  - DAU/MAU 추적
  - 세션 시간 모니터링
  - 기능별 사용률 분석

- [ ] **비즈니스 지표**
  - 구독 전환율
  - 사용자 만족도 (NPS)
  - 이탈률 분석

- [ ] **기술 지표**
  - 서버 응답 시간
  - 에러율 모니터링
  - 업타임 추적

---

## 🎯 마일스톤 체크포인트

### Week 2: 기술 기반 완성
- [ ] Next.js + Supabase 연동 완료
- [ ] 기본 인증 시스템 동작
- [ ] 디자인 시스템 적용

### Week 4: MVP 핵심 기능 완성
- [ ] 사용자 온보딩 플로우 완료
- [ ] 기본 식단 생성 기능 동작
- [ ] 대시보드 주요 위젯 표시

### Week 6: 고급 기능 통합
- [ ] AI 식단 생성 고도화
- [ ] 영양 분석 시스템 완료
- [ ] 커뮤니티 기본 기능 동작

### Week 8: 베타 테스트 준비
- [ ] PWA 기능 완성
- [ ] 모바일 최적화 완료
- [ ] 기본 테스트 케이스 통과

### Week 10: 프로덕션 론칭
- [ ] 모든 기능 QA 완료
- [ ] 성능 최적화 달성
- [ ] 보안 검증 완료

---

## 📞 참고 및 지원

### 개발 참조 문서
1. **설계 단계**: `01_SITE_ARCHITECTURE.md` 우선 검토
2. **UI 구현**: `07_MOBILE_UX_GUIDE.md` 디자인 시스템 적용
3. **페이지 구현**: 각 페이지별 MD 파일 상세 참조
4. **전체 전략**: `00_MASTER_PLAN.md` 지속적 참조

### 기술 스택 문서
- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/docs

### 중요 알림
⚠️ **의료 데이터 취급 주의**: 모든 의료 관련 정보는 관련 법규 준수 필수
⚠️ **보안 우선**: 개인정보 보호 및 데이터 보안을 최우선으로 고려
⚠️ **접근성 준수**: WCAG 2.1 AA 등급 이상 달성 필수

---

*체크리스트 마지막 업데이트: 2024-03-15*
*예상 총 개발 기간: 8-10주 (3명 팀 기준)*
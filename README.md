# 📦 재고 관리 시스템

## 프로젝트 개요
모던하고 반응형 디자인의 재고 관리 시스템입니다. 모바일과 데스크톱에서 최적화된 사용자 경험을 제공합니다.

### 핵심 기능
- ✅ **다크 모드 지원**: 시스템 설정 연동 및 수동 전환
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- ✅ **컴포넌트 라이브러리**: 재사용 가능한 UI 컴포넌트
- ✅ **현대적 디자인 시스템**: 일관된 디자인 토큰 사용

## 구현된 기능

### 디자인 시스템
- 🎨 디자인 토큰 기반 스타일링 (색상, 간격, 타이포그래피)
- 🌙 다크 모드 (시스템 설정 연동)
- 📱 완전 분리된 모바일/데스크톱 레이아웃
- 🧩 컴포넌트 라이브러리 페이지 (`/components`)

### UI 컴포넌트
- **Button**: 6개 변형, 5개 크기, 로딩/아이콘 지원
- **Input**: 3개 변형, 3개 크기, 아이콘/에러 상태
- **Card**: 기본/강조 스타일
- **StatCard**: 통계 카드 with 변화율 표시
- **Chart**: Recharts 기반 차트 컴포넌트
- **ThemeSwitcher**: 3개 변형 (compact, default, expanded)

### 페이지
- **Dashboard**: 모바일/데스크톱 최적화 대시보드
- **Component Library**: UI 컴포넌트 쇼케이스
- **Responsive Layouts**: 기기별 최적화 레이아웃

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Theme**: next-themes
- **Charts**: Recharts
- **Icons**: Lucide React

## 프로젝트 구조

```
/src
  /app                  # Next.js App Router
    /components         # 컴포넌트 라이브러리 페이지
    /page.tsx          # 메인 대시보드
  /components
    /dashboard         # 대시보드 컴포넌트
      /MobileDashboard.tsx
      /DesktopDashboard.tsx
    /layout            # 레이아웃 컴포넌트
      /MobileLayout.tsx
      /DesktopLayout.tsx
      /AdaptiveLayout.tsx
    /ui                # UI 컴포넌트
      /button
      /card
      /input
      /stat-card
      /theme-switcher
  /styles
    /design-tokens.ts  # 디자인 시스템 토큰
  /hooks
    /useDevice.ts      # 기기 감지 훅
```

## 데이터베이스 스키마 (예정)

```sql
-- 제품 테이블
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100),
  min_stock INTEGER DEFAULT 0,
  current_stock INTEGER DEFAULT 0,
  unit VARCHAR(20) DEFAULT '개',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 출고처 테이블
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50) UNIQUE,
  contact VARCHAR(100),
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 출고 테이블
CREATE TABLE shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  shipment_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 출고 상세 테이블
CREATE TABLE shipment_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2),
  notes TEXT
);

-- 재고 이력 테이블
CREATE TABLE inventory_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  type VARCHAR(50), -- 'in', 'out', 'adjustment'
  quantity INTEGER NOT NULL,
  before_stock INTEGER,
  after_stock INTEGER,
  reference_id UUID, -- shipment_id or purchase_id
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 템플릿 테이블
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50), -- 'shipment', 'order'
  data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 정책
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- 실시간 구독을 위한 Publication
CREATE PUBLICATION supabase_realtime FOR TABLE products, shipments, inventory_logs;
```




## 시작하기

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 환경 설정
```bash
# .env.local 파일 생성 (추후 Supabase 연동 시)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```


## 주요 페이지

- **메인 대시보드**: `/` - 재고 현황 및 통계
- **컴포넌트 라이브러리**: `/components` - UI 컴포넌트 쇼케이스

## 개발 현황

### 완료된 작업
- ✅ 다크 모드 구현
- ✅ 모바일/데스크톱 분리 레이아웃
- ✅ 디자인 시스템 구축
- ✅ 컴포넌트 라이브러리 페이지
- ✅ 반응형 대시보드

### 진행 예정
- ⏳ Supabase 연동
- ⏳ 제품 관리 기능
- ⏳ 출고 관리 기능
- ⏳ 실시간 동기화

## 라이선스

MIT
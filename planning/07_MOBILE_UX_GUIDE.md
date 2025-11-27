# MommyMenu 모바일 우선 UI/UX 디자인 가이드

## 1. 디자인 철학

### 1.1 핵심 원칙
- **임산부 친화적**: 신체적/정서적 변화 고려
- **직관적 조작**: 호르몬 변화로 인한 집중력 저하 대응
- **편안한 경험**: 스트레스 최소화, 안정감 제공
- **접근성 우선**: 다양한 상황과 능력 고려

### 1.2 사용자 특성 고려사항
- **신체 변화**: 손목 통증, 시야 변화, 피로감
- **정서 변화**: 예민함, 불안감, 기분 변화
- **인지 변화**: 집중력 저하, 기억력 변화 ("임신 브레인")
- **상황적 제약**: 다양한 환경에서의 사용

## 2. 디자인 시스템

### 2.1 컬러 팔레트

#### Primary 컬러 (차분하고 안정적)
```
🌸 Primary Pink
#FF6B9D - 따뜻하고 모성적인 느낌
#FFE5ED - 연한 배경색

🌿 Calm Green  
#4ECDC4 - 자연스럽고 건강한 느낌
#E8F9F8 - 연한 배경색

🌤️ Soft Yellow
#FFE66D - 밝고 긍정적인 느낌
#FFF8E1 - 연한 배경색
```

#### 상태별 컬러
```
✅ Success: #10B981 (진한 녹색)
⚠️ Warning: #F59E0B (주황색)
❌ Error: #EF4444 (부드러운 빨강)
ℹ️ Info: #3B82F6 (파란색)
```

#### 중성 컬러
```
Text Primary: #1F2937 (진한 회색)
Text Secondary: #6B7280 (중간 회색)  
Text Muted: #9CA3AF (연한 회색)
Background: #F9FAFB (아주 연한 회색)
Border: #E5E7EB (테두리용)
```

### 2.2 타이포그래피

#### 폰트 선택
```css
/* Primary Font: Pretendard (한국어 최적화) */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

/* Fallback Fonts */
font-family: 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', sans-serif;
```

#### 폰트 크기 스케일
```css
/* 임산부 친화적 크기 (기본 대비 110%) */
h1: 32px (2rem)     /* 페이지 제목 */
h2: 24px (1.5rem)   /* 섹션 제목 */
h3: 20px (1.25rem)  /* 서브 제목 */
body: 16px (1rem)   /* 본문 (기본보다 큰 크기) */
small: 14px (0.875rem) /* 보조 텍스트 */
caption: 12px (0.75rem) /* 캡션 */
```

### 2.3 공간 설계

#### 그리드 시스템
```css
/* Mobile Grid (375px 기준) */
margin: 16px;          /* 좌우 여백 */
section-gap: 24px;     /* 섹션 간격 */
card-padding: 16px;    /* 카드 내부 여백 */
list-gap: 12px;        /* 리스트 아이템 간격 */
```

#### 터치 영역
```css
/* 최소 터치 영역: 48px x 48px */
button-height: 48px;
input-height: 48px;
touch-target: 48px;

/* 권장 터치 영역: 56px x 56px */
primary-button: 56px;
fab-button: 56px;
```

## 3. 컴포넌트 설계

### 3.1 버튼 시스템

#### Primary 버튼
```css
.btn-primary {
  background: linear-gradient(135deg, #FF6B9D, #FF8FAB);
  color: white;
  height: 56px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
  
  /* 호버/터치 효과 */
  &:hover { transform: translateY(-2px); }
  &:active { transform: translateY(0); }
}
```

#### Secondary 버튼
```css
.btn-secondary {
  background: #F9FAFB;
  color: #374151;
  border: 2px solid #E5E7EB;
  height: 48px;
  border-radius: 10px;
  
  &:hover { background: #F3F4F6; }
}
```

#### 부드러운 버튼 (Soft Button)
```css
.btn-soft {
  background: rgba(255, 107, 157, 0.1);
  color: #FF6B9D;
  height: 44px;
  border-radius: 22px;
  border: none;
  
  &:hover { background: rgba(255, 107, 157, 0.15); }
}
```

### 3.2 입력 필드

#### 기본 입력 필드
```css
.input-field {
  height: 52px;
  padding: 0 16px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 16px; /* iOS 줌 방지 */
  background: #FFFFFF;
  
  &:focus {
    border-color: #FF6B9D;
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
  }
  
  &.error {
    border-color: #EF4444;
    background: #FEF2F2;
  }
}
```

#### 검색 입력 필드
```css
.search-input {
  height: 48px;
  padding: 0 16px 0 48px; /* 아이콘 공간 */
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  
  &::placeholder {
    color: #9CA3AF;
    font-style: italic;
  }
}
```

### 3.3 카드 컴포넌트

#### 기본 카드
```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #F3F4F6;
  
  /* 부드러운 터치 피드백 */
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}
```

#### 영양 점수 카드
```css
.nutrition-card {
  background: linear-gradient(135deg, #4ECDC4, #44B39D);
  color: white;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  
  .score {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .label {
    font-size: 16px;
    opacity: 0.9;
  }
}
```

### 3.4 네비게이션

#### Bottom Tab Navigation
```css
.bottom-nav {
  height: 80px;
  background: #FFFFFF;
  border-top: 1px solid #F3F4F6;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.1);
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    min-height: 64px;
    
    .icon {
      width: 28px;
      height: 28px;
      margin-bottom: 4px;
    }
    
    .label {
      font-size: 12px;
      color: #6B7280;
    }
    
    &.active {
      .icon { color: #FF6B9D; }
      .label { 
        color: #FF6B9D; 
        font-weight: 600;
      }
    }
  }
}
```

## 4. 사용성 패턴

### 4.1 원터치 액션

#### 빠른 식사 기록
```
┌─────────────────┐
│   오늘 점심     │
│   🍱 추천 식단   │
├─────────────────┤
│  [📷 사진으로   │
│      기록하기]   │
│                 │
│  [✏️ 직접      │
│      입력하기]   │
└─────────────────┘
```

#### 스와이프 액션
```
게시물 카드에서:
← 스와이프: 저장
→ 스와이프: 공감

알림에서:
← 스와이프: 읽음 표시
→ 스와이프: 삭제
```

### 4.2 제스처 기반 조작

#### 풀 투 리프레시
```css
.pull-refresh {
  /* 당겨서 새로고침 */
  padding-top: 60px;
  
  .refresh-indicator {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    
    /* 임산부 친화적 아이콘 */
    content: "🤱";
    font-size: 24px;
  }
}
```

#### 롱 프레스 메뉴
```css
.long-press-menu {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 8px;
  
  .menu-item {
    height: 48px;
    padding: 0 16px;
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
```

## 5. 모바일 특화 기능

### 5.1 Progressive Web App (PWA)

#### 설치 프롬프트
```css
.install-prompt {
  position: fixed;
  bottom: 100px; /* Bottom nav 위에 */
  left: 16px;
  right: 16px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  
  .icon {
    width: 48px;
    height: 48px;
    background: #FF6B9D;
    border-radius: 12px;
    margin-bottom: 12px;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .description {
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 16px;
  }
}
```

### 5.2 알림 시스템

#### 부드러운 토스트
```css
.toast {
  position: fixed;
  top: 60px;
  left: 16px;
  right: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #10B981;
  
  /* 슬라이드 인 애니메이션 */
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

#### 비침형 알림 바
```css
.notification-bar {
  background: rgba(255, 107, 157, 0.9);
  backdrop-filter: blur(20px);
  height: 48px;
  padding: 0 16px;
  color: white;
  font-weight: 500;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### 5.3 로딩 상태

#### 스켈레톤 스크린
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F3F4F6 25%,
    #E5E7EB 50%,
    #F3F4F6 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-card {
  .skeleton-title {
    height: 20px;
    width: 60%;
    margin-bottom: 12px;
  }
  
  .skeleton-text {
    height: 16px;
    width: 100%;
    margin-bottom: 8px;
    
    &:last-child {
      width: 80%;
    }
  }
}
```

## 6. 반응형 디자인

### 6.1 브레이크포인트
```css
/* Mobile First 접근 */
$mobile: 375px;     /* 기본 */
$mobile-l: 425px;   /* 큰 모바일 */
$tablet: 768px;     /* 태블릿 */
$desktop: 1024px;   /* 데스크톱 */
$desktop-l: 1440px; /* 큰 데스크톱 */
```

### 6.2 적응형 레이아웃
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  
  @media (min-width: 768px) {
    padding: 0 32px;
  }
  
  @media (min-width: 1024px) {
    padding: 0 48px;
  }
}

.grid {
  display: grid;
  gap: 16px;
  
  /* 모바일: 1열 */
  grid-template-columns: 1fr;
  
  /* 태블릿: 2열 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  /* 데스크톱: 3열 */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

## 7. 접근성 가이드라인

### 7.1 색상 접근성
```css
/* WCAG 2.1 AA 준수 (4.5:1 대비) */
.text-primary { color: #1F2937; } /* 18.7:1 */
.text-secondary { color: #374151; } /* 9.4:1 */
.text-muted { color: #6B7280; } /* 4.9:1 */

/* 색맹 대응 */
.status-success::before { content: "✓ "; }
.status-warning::before { content: "⚠ "; }
.status-error::before { content: "✗ "; }
```

### 7.2 터치 접근성
```css
/* 최소 터치 영역 보장 */
.touch-target {
  min-width: 48px;
  min-height: 48px;
  
  /* 시각적 크기가 작아도 터치 영역 확보 */
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 48px;
    min-height: 48px;
  }
}
```

### 7.3 스크린 리더 지원
```html
<!-- 의미있는 레이블 -->
<button aria-label="식사 기록 추가하기">
  <span aria-hidden="true">📷</span>
</button>

<!-- 상태 정보 제공 -->
<div role="status" aria-live="polite">
  영양 점수가 업데이트되었습니다
</div>

<!-- 탐색 도움 -->
<nav aria-label="주요 네비게이션">
  <a href="/dashboard" aria-current="page">대시보드</a>
</nav>
```

## 8. 성능 최적화

### 8.1 이미지 최적화
```css
/* 반응형 이미지 */
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  
  /* 레이지 로딩 */
  loading: lazy;
  
  /* WebP 지원 */
  background-image: 
    url('image.webp'),
    url('image.jpg'); /* 폴백 */
}
```

### 8.2 애니메이션 최적화
```css
/* 하드웨어 가속 활용 */
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* 레이어 분리 */
}

/* 사용자 설정 존중 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 9. 다크 모드 지원

### 9.1 컬러 변수 시스템
```css
:root {
  /* 라이트 모드 */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F9FAFB;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --border-color: #E5E7EB;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* 다크 모드 */
    --bg-primary: #1F2937;
    --bg-secondary: #111827;
    --text-primary: #F9FAFB;
    --text-secondary: #D1D5DB;
    --border-color: #374151;
  }
}

/* 수동 토글 지원 */
[data-theme="dark"] {
  --bg-primary: #1F2937;
  --bg-secondary: #111827;
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --border-color: #374151;
}
```

### 9.2 임산부 친화적 다크 모드
```css
/* 부드러운 다크 모드 (눈의 피로 최소화) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #2D2D30;    /* 순수 검은색 대신 */
    --bg-secondary: #252526;   /* 부드러운 어두운 색 */
    --accent-pink: #FFB3C6;    /* 더 부드러운 핑크 */
  }
}
```

## 10. 에러 처리 및 빈 상태

### 10.1 에러 상태
```css
.error-state {
  text-align: center;
  padding: 40px 20px;
  
  .error-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.6;
  }
  
  .error-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  
  .error-message {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 24px;
    line-height: 1.5;
  }
  
  .retry-button {
    background: var(--accent-pink);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
  }
}
```

### 10.2 빈 상태 (Empty State)
```css
.empty-state {
  text-align: center;
  padding: 60px 20px;
  
  .empty-illustration {
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
    opacity: 0.8;
  }
  
  .empty-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  .empty-description {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 32px;
    line-height: 1.6;
  }
  
  .empty-action {
    background: linear-gradient(135deg, #FF6B9D, #FF8FAB);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
  }
}
```

## 11. 테스팅 가이드라인

### 11.1 디바이스 테스트
```
필수 테스트 디바이스:
- iPhone SE (375x667) - 최소 화면
- iPhone 12 Pro (390x844) - 표준
- iPhone 14 Pro Max (430x932) - 큰 화면
- Galaxy S20 (360x800) - 안드로이드 표준
- iPad (768x1024) - 태블릿
```

### 11.2 성능 테스트
```
성능 목표:
- First Paint: < 1.5초
- Largest Contentful Paint: < 2.5초
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
```

### 11.3 접근성 테스트
```
접근성 검증:
- 키보드만으로 모든 기능 사용 가능
- 스크린 리더로 내용 이해 가능
- 색상 대비 4.5:1 이상 (AAA는 7:1)
- 터치 영역 48px 이상
```

## 12. 구현 우선순위

### Phase 1: 핵심 기능 (MVP)
- 기본 컴포넌트 시스템
- 모바일 네비게이션
- 주요 페이지 레이아웃
- 기본 반응형 지원

### Phase 2: 사용성 개선
- 제스처 기반 조작
- 애니메이션 시스템
- PWA 기능
- 다크 모드

### Phase 3: 고급 기능
- 고급 접근성 기능
- 성능 최적화
- A/B 테스트 지원
- 상세 분석 기능
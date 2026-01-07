# CLAUDE.md - 프로젝트 가이드라인

## 기술 스택
- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend:** Supabase
- **원칙:** Mobile First, Dark Mode 필수, Clean Architecture

---

## 폴더 구조 (Clean Architecture)
```
src/
├── app/          # 페이지, API 라우트 (Presentation)
├── domain/       # 순수 비즈니스 로직 (외부 의존성 금지)
│   ├── entity/   # 비즈니스 엔티티
│   └── repository/ # 인터페이스만
├── application/  # UseCase, DTO
└── components/   # 재사용 UI 컴포넌트
```

**의존성 방향:** `app` → `application` → `domain` (역류 금지)

---

## 다크모드 필수 규칙

| 요소 | 라이트 | 다크 |
|------|--------|------|
| 배경 | `bg-white` | `dark:bg-slate-900` |
| 텍스트 | `text-gray-900` | `dark:text-white` |
| 보조텍스트 | `text-gray-500` | `dark:text-gray-400` |
| 테두리 | `border-gray-200` | `dark:border-gray-700` |

**❌ 금지:** `bg-white` 단독 사용
**✅ 필수:** `bg-white dark:bg-slate-900`

---

## 코드 규칙

- 서버 컴포넌트: 데이터 페칭
- 클라이언트 컴포넌트: `"use client"` 최상단, 상호작용/상태관리
- Supabase 타입 오류: `(supabase as any)` + eslint-disable 주석
- 파일명: 컴포넌트 `PascalCase.tsx`, 유틸 `kebab-case.ts`

---

## 배포 (Vercel)

`v0.0.19 배포해줘` 요청 시:
```bash
git checkout -b v0.0.19
git add . && git commit -m "v0.0.19"
git push -u origin v0.0.19
git checkout main && git merge v0.0.19 && git push origin main
```

---

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| 다크모드 누락 | 모든 색상에 `dark:` 추가 |
| 빌드 캐시 오류 | `rm -rf .next && npm run build` |
| 중복 Header | root layout 확인 |

---

## 모달 컴포넌트

닫기 동작 3가지 필수 구현.

- ESC 키로 닫기
- 바깥 영역 클릭 시 닫기  
- X 버튼 클릭 시 닫기

---

## UI 디자인

**트렌드:** 2025 Minimal + Glassmorphism
**참고:** Linear, Vercel, Arc Browser
**라운드:** 16-20px
**그림자:** soft (blur 20, opacity 0.05)
**애니메이션:** 200-300ms, ease-out
**다크모드:** 필수, slate 계열 사용

❌ 금지: 과한 그라데이션, 날카로운 모서리, 무거운 그림자

---

## 전화번호 입력 규칙 (필수)

전화번호/팩스번호 입력 시 **반드시 `PhoneInput` 컴포넌트 사용**

```tsx
import { PhoneInput } from "@/components/common/PhoneInput";

<PhoneInput
  value={value}
  onChange={(formatted) => setValue(formatted)}
  placeholder="010-0000-0000"
/>
```

**자동 포맷팅 규칙:**
| 유형 | 포맷 | 예시 |
|------|------|------|
| 휴대폰 | 010-XXXX-XXXX | 010-1234-1234 |
| 서울 | 02-XXXX-XXXX | 02-1234-1234 |
| 지역 | 031-XXX-XXXX | 031-123-1234 |
| 대표번호 | 1588-XXXX | 1588-1234 |

❌ 금지: 일반 `<Input>` 사용하여 전화번호 입력
✅ 필수: `<PhoneInput>` 컴포넌트 사용

---

## 숫자 입력 규칙 (필수)

금액/수량 입력 시 **반드시 `NumberInput` 컴포넌트 사용**

```tsx
import { NumberInput } from "@/components/common/NumberInput";

<NumberInput
  value={price}
  onChange={(value) => setPrice(value)}
  suffix="원"
/>
```

**기능:**
- 1,000단위 콤마 자동 표시
- 0 완전 삭제 가능 (백스페이스)
- suffix 지원 ("원", "개" 등)
- min/max 범위 제한

**Props:**
| Prop | 타입 | 설명 |
|------|------|------|
| value | number | 숫자 값 |
| onChange | (value: number) => void | 변경 콜백 |
| suffix | string | 접미사 ("원", "개") |
| min/max | number | 범위 제한 |

❌ 금지: `<Input type="number">` 사용
✅ 필수: `<NumberInput>` 컴포넌트 사용

---

## 주소 입력 규칙 (필수)

주소 입력 시 **반드시 `AddressSearch` 컴포넌트 사용**

```tsx
import { AddressSearch, AddressData } from "@/components/common/AddressSearch";

const [addressData, setAddressData] = useState<AddressData>({
  address: "",
  addressDetail: "",
  latitude: undefined,
  longitude: undefined,
});

<AddressSearch
  value={addressData}
  onChange={setAddressData}
  disabled={loading}
/>
```

**기능:**
- 다음(Daum) 우편번호 API 연동
- 카카오 지도 API로 좌표(위도/경도) 자동 변환
- 주소 선택 시 Toast 알림 자동 표시
- 상세주소 입력 필드 포함

**AddressData 인터페이스:**
```typescript
interface AddressData {
  address: string;        // 기본 주소
  addressDetail?: string; // 상세 주소
  latitude?: number;      // 위도
  longitude?: number;     // 경도
  zonecode?: string;      // 우편번호
}
```

**Props 옵션:**
| Prop | 기본값 | 설명 |
|------|--------|------|
| showCoordinates | true | 좌표 표시 여부 |
| label | "주소" | 주소 라벨 |
| detailLabel | "상세주소" | 상세주소 라벨 |

**DB 저장 필드:**
- `address` TEXT - 기본 주소
- `address_detail` TEXT - 상세 주소
- `latitude` DECIMAL(10, 8) - 위도
- `longitude` DECIMAL(11, 8) - 경도

❌ 금지: 일반 `<Input>` 사용하여 주소 입력
✅ 필수: `<AddressSearch>` 컴포넌트 사용 (좌표 자동 저장)

---

## 드래그앤드롭 정렬 (필수)

정렬 순서(`sort_order`)가 필요한 목록은 **드래그앤드롭으로 구현**

**라이브러리:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
**핸들 아이콘:** `GripVertical` (lucide-react)
**참고:** `/settings/packaging/page.tsx`

❌ 금지: 숫자 입력으로 정렬 순서 변경
✅ 필수: 드래그앤드롭 + DB `sort_order` 자동 업데이트

---

## SQL 마이그레이션 규칙 (필수)

**마이그레이션 작성 전 반드시 DB 상태 확인:**

```sql
-- 1. 테이블 목록 확인
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;

-- 2. 특정 테이블 컬럼 확인
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = '테이블명';
```

**CREATE vs ALTER 사용 기준:**

| 상황 | 사용 구문 |
|------|----------|
| 새 테이블 | `CREATE TABLE IF NOT EXISTS` |
| 기존 테이블에 컬럼 추가 | `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` |

**⚠️ 주의:** `CREATE TABLE IF NOT EXISTS`는 테이블이 존재하면 **전체 스킵** (컬럼 추가 안됨!)

```sql
-- ❌ 잘못된 방법 (기존 테이블에 컬럼 추가 안됨)
CREATE TABLE IF NOT EXISTS inventory (
  warehouse_id UUID  -- 추가되지 않음!
);

-- ✅ 올바른 방법
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS warehouse_id UUID;
```

---

## 재고 시스템 흐름

```
입고관리 → 입고완료 → 재고 자동반영 (트리거)
출고관리 → 출고완료 → 재고 자동차감 (트리거)
재고현황 → 창고별/보관동별 조회
```

**핵심 테이블:**
- `receivings` / `receiving_items` - 입고
- `shipments` / `shipment_items` - 출고
- `inventory` - 재고현황
- `inventory_transactions` - 입출고 이력

**트리거 파일:** `supabase/migrations/20250107_inventory_trigger.sql`

---

## 작업 규칙

계획: `.md` 파일 생성 → 체크리스트(`- [ ]`)로 관리 → 완료 시 `- [x]`

---

## CLAUDE.md 작성 규칙

- **핵심만 간결하게** - 긴 코드 예시 금지
- **참고 파일 명시** - 실제 구현 파일 경로만 알려주면 됨
- **패턴만 알려주기** - 라이브러리명, 핵심 컴포넌트명, ❌/✅ 규칙
// 임산부용 식품 데이터베이스
export interface FoodItem {
  id: string
  name: string
  nameEn?: string
  category: FoodCategory
  nutritionPer100g: NutritionInfo
  servingSize: ServingSize
  pregnancySafety: PregnancySafety
  benefits: string[]
  warnings?: string[]
  trimesterRecommendations: {
    first: boolean
    second: boolean
    third: boolean
  }
  tags: string[]
  searchKeywords: string[]
}

export interface NutritionInfo {
  calories: number
  protein: number // g
  carbs: number // g
  fat: number // g
  fiber: number // g
  folate: number // mcg
  iron: number // mg
  calcium: number // mg
  vitaminD: number // IU
  omega3: number // mg
  vitaminB12?: number // mcg
  zinc?: number // mg
  magnesium?: number // mg
}

export interface ServingSize {
  amount: number
  unit: string
  weightInGrams: number
}

export interface PregnancySafety {
  safetyLevel: 'safe' | 'caution' | 'avoid'
  reason?: string
  maxServingsPerWeek?: number
}

export type FoodCategory = 
  | 'fruits'
  | 'vegetables' 
  | 'grains'
  | 'protein'
  | 'dairy'
  | 'seafood'
  | 'nuts-seeds'
  | 'beverages'
  | 'supplements'
  | 'prepared-foods'
  | 'snacks'
  | 'condiments'

// 임산부용 한국 식품 데이터베이스
export const foodDatabase: FoodItem[] = [
  // 과일류
  {
    id: 'apple-001',
    name: '사과',
    nameEn: 'Apple',
    category: 'fruits',
    nutritionPer100g: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      folate: 3,
      iron: 0.1,
      calcium: 6,
      vitaminD: 0,
      omega3: 9,
      magnesium: 5
    },
    servingSize: { amount: 1, unit: '개(중)', weightInGrams: 180 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['식이섬유 풍부', '변비 예방', '비타민 C 공급'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['과일', '간식', '식이섬유'],
    searchKeywords: ['사과', 'apple', '과일', '간식']
  },
  {
    id: 'avocado-001',
    name: '아보카도',
    nameEn: 'Avocado',
    category: 'fruits',
    nutritionPer100g: {
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      fiber: 7,
      folate: 81,
      iron: 0.6,
      calcium: 12,
      vitaminD: 0,
      omega3: 110,
      magnesium: 29
    },
    servingSize: { amount: 0.5, unit: '개', weightInGrams: 100 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['엽산 풍부', '건강한 지방', '태아 뇌 발달'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['과일', '엽산', '오메가3'],
    searchKeywords: ['아보카도', 'avocado', '엽산', '건강지방']
  },

  // 채소류
  {
    id: 'spinach-001',
    name: '시금치',
    nameEn: 'Spinach',
    category: 'vegetables',
    nutritionPer100g: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      folate: 194,
      iron: 2.7,
      calcium: 99,
      vitaminD: 0,
      omega3: 138,
      magnesium: 79
    },
    servingSize: { amount: 70, unit: 'g(1인분)', weightInGrams: 70 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['엽산 최고 공급원', '철분 풍부', '칼슘 공급'],
    warnings: ['생으로 과다 섭취 주의'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['채소', '엽산', '철분'],
    searchKeywords: ['시금치', 'spinach', '엽산', '철분', '채소']
  },
  {
    id: 'sweet-potato-001',
    name: '고구마',
    nameEn: 'Sweet Potato',
    category: 'vegetables',
    nutritionPer100g: {
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      fiber: 3,
      folate: 11,
      iron: 0.6,
      calcium: 30,
      vitaminD: 0,
      omega3: 0,
      magnesium: 25
    },
    servingSize: { amount: 1, unit: '개(중)', weightInGrams: 150 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['비타민 A 풍부', '변비 예방', '에너지 공급'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['채소', '탄수화물', '식이섬유'],
    searchKeywords: ['고구마', 'sweet potato', '탄수화물', '간식']
  },

  // 단백질류
  {
    id: 'egg-001',
    name: '계란',
    nameEn: 'Egg',
    category: 'protein',
    nutritionPer100g: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      fiber: 0,
      folate: 47,
      iron: 1.8,
      calcium: 56,
      vitaminD: 82,
      omega3: 75,
      vitaminB12: 0.9,
      zinc: 1.3
    },
    servingSize: { amount: 1, unit: '개', weightInGrams: 50 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['완전 단백질', '콜린 풍부', '태아 뇌 발달'],
    warnings: ['완전히 익혀서 섭취'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['단백질', '콜린', '비타민D'],
    searchKeywords: ['계란', 'egg', '달걀', '단백질']
  },
  {
    id: 'chicken-breast-001',
    name: '닭가슴살',
    nameEn: 'Chicken Breast',
    category: 'protein',
    nutritionPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      folate: 4,
      iron: 1,
      calcium: 15,
      vitaminD: 5,
      omega3: 40,
      vitaminB12: 0.3,
      zinc: 1
    },
    servingSize: { amount: 100, unit: 'g', weightInGrams: 100 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['고단백', '저지방', '필수 아미노산'],
    warnings: ['완전히 익혀서 섭취'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['단백질', '육류', '저지방'],
    searchKeywords: ['닭가슴살', 'chicken', '닭고기', '단백질']
  },
  {
    id: 'salmon-001',
    name: '연어',
    nameEn: 'Salmon',
    category: 'seafood',
    nutritionPer100g: {
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13,
      fiber: 0,
      folate: 25,
      iron: 0.8,
      calcium: 12,
      vitaminD: 526,
      omega3: 2260,
      vitaminB12: 3.2,
      zinc: 0.6
    },
    servingSize: { amount: 100, unit: 'g', weightInGrams: 100 },
    pregnancySafety: { 
      safetyLevel: 'caution',
      reason: '수은 함량 주의',
      maxServingsPerWeek: 2
    },
    benefits: ['오메가3 최고 공급원', 'DHA 풍부', '태아 뇌 발달'],
    warnings: ['주 2회 이하 섭취 권장'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['생선', '오메가3', 'DHA', '단백질'],
    searchKeywords: ['연어', 'salmon', '생선', '오메가3', 'DHA']
  },

  // 유제품
  {
    id: 'milk-001',
    name: '우유',
    nameEn: 'Milk',
    category: 'dairy',
    nutritionPer100g: {
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fat: 1,
      fiber: 0,
      folate: 5,
      iron: 0,
      calcium: 125,
      vitaminD: 40,
      omega3: 0,
      vitaminB12: 0.5,
      zinc: 0.4
    },
    servingSize: { amount: 200, unit: 'ml', weightInGrams: 200 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['칼슘 풍부', '단백질 공급', '태아 뼈 발달'],
    warnings: ['저지방 우유 선택 권장'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['유제품', '칼슘', '단백질'],
    searchKeywords: ['우유', 'milk', '유제품', '칼슘']
  },
  {
    id: 'yogurt-001',
    name: '플레인 요거트',
    nameEn: 'Plain Yogurt',
    category: 'dairy',
    nutritionPer100g: {
      calories: 61,
      protein: 3.5,
      carbs: 4.7,
      fat: 3.3,
      fiber: 0,
      folate: 7,
      iron: 0.1,
      calcium: 121,
      vitaminD: 0,
      omega3: 0,
      vitaminB12: 0.4,
      zinc: 0.6
    },
    servingSize: { amount: 100, unit: 'g', weightInGrams: 100 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['프로바이오틱스', '소화 건강', '칼슘 공급'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['유제품', '프로바이오틱스', '칼슘'],
    searchKeywords: ['요거트', 'yogurt', '요구르트', '유제품']
  },

  // 곡물류
  {
    id: 'brown-rice-001',
    name: '현미',
    nameEn: 'Brown Rice',
    category: 'grains',
    nutritionPer100g: {
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      folate: 8,
      iron: 0.4,
      calcium: 10,
      vitaminD: 0,
      omega3: 0,
      magnesium: 43,
      zinc: 0.6
    },
    servingSize: { amount: 210, unit: 'g(1공기)', weightInGrams: 210 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['복합 탄수화물', '식이섬유', '비타민 B'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['곡물', '탄수화물', '식이섬유'],
    searchKeywords: ['현미', 'brown rice', '곡물', '밥']
  },
  {
    id: 'oatmeal-001',
    name: '오트밀',
    nameEn: 'Oatmeal',
    category: 'grains',
    nutritionPer100g: {
      calories: 389,
      protein: 17,
      carbs: 66,
      fat: 7,
      fiber: 11,
      folate: 56,
      iron: 4.7,
      calcium: 54,
      vitaminD: 0,
      omega3: 0,
      magnesium: 177,
      zinc: 4
    },
    servingSize: { amount: 40, unit: 'g', weightInGrams: 40 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['식이섬유 풍부', '포만감', '혈당 조절'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['곡물', '아침식사', '식이섬유'],
    searchKeywords: ['오트밀', 'oatmeal', '귀리', '아침']
  },

  // 견과류
  {
    id: 'almond-001',
    name: '아몬드',
    nameEn: 'Almonds',
    category: 'nuts-seeds',
    nutritionPer100g: {
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 13,
      folate: 44,
      iron: 3.7,
      calcium: 269,
      vitaminD: 0,
      omega3: 6,
      magnesium: 270,
      zinc: 3.1
    },
    servingSize: { amount: 23, unit: '알(28g)', weightInGrams: 28 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['비타민 E', '칼슘', '건강한 지방'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['견과류', '간식', '칼슘'],
    searchKeywords: ['아몬드', 'almond', '견과류', '간식']
  },
  {
    id: 'walnut-001',
    name: '호두',
    nameEn: 'Walnuts',
    category: 'nuts-seeds',
    nutritionPer100g: {
      calories: 654,
      protein: 15,
      carbs: 14,
      fat: 65,
      fiber: 7,
      folate: 98,
      iron: 2.9,
      calcium: 98,
      vitaminD: 0,
      omega3: 9080,
      magnesium: 158,
      zinc: 3.1
    },
    servingSize: { amount: 7, unit: '개(28g)', weightInGrams: 28 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['식물성 오메가3', '태아 뇌 발달', '항산화'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['견과류', '오메가3', '간식'],
    searchKeywords: ['호두', 'walnut', '견과류', '오메가3']
  },

  // 음료
  {
    id: 'green-tea-001',
    name: '녹차',
    nameEn: 'Green Tea',
    category: 'beverages',
    nutritionPer100g: {
      calories: 1,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      folate: 0,
      iron: 0,
      calcium: 0,
      vitaminD: 0,
      omega3: 0
    },
    servingSize: { amount: 240, unit: 'ml', weightInGrams: 240 },
    pregnancySafety: { 
      safetyLevel: 'caution',
      reason: '카페인 함유',
      maxServingsPerWeek: 7
    },
    benefits: ['항산화제', '수분 공급'],
    warnings: ['하루 1-2잔 이하 권장', '카페인 200mg/일 이하'],
    trimesterRecommendations: { first: false, second: true, third: true },
    tags: ['음료', '차', '카페인'],
    searchKeywords: ['녹차', 'green tea', '차', '음료']
  },

  // 한국 전통 음식
  {
    id: 'kimchi-001',
    name: '배추김치',
    nameEn: 'Kimchi',
    category: 'prepared-foods',
    nutritionPer100g: {
      calories: 15,
      protein: 1.1,
      carbs: 2.4,
      fat: 0.5,
      fiber: 1.6,
      folate: 18,
      iron: 0.5,
      calcium: 33,
      vitaminD: 0,
      omega3: 0
    },
    servingSize: { amount: 40, unit: 'g', weightInGrams: 40 },
    pregnancySafety: { 
      safetyLevel: 'caution',
      reason: '나트륨 함량 높음',
      maxServingsPerWeek: 14
    },
    benefits: ['프로바이오틱스', '비타민 C', '식이섬유'],
    warnings: ['나트륨 섭취 주의', '적당량 섭취'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['발효식품', '한식', '프로바이오틱스'],
    searchKeywords: ['김치', 'kimchi', '배추김치', '발효']
  },
  {
    id: 'seaweed-soup-001',
    name: '미역국',
    nameEn: 'Seaweed Soup',
    category: 'prepared-foods',
    nutritionPer100g: {
      calories: 20,
      protein: 1.5,
      carbs: 2.8,
      fat: 0.5,
      fiber: 0.5,
      folate: 180,
      iron: 2.8,
      calcium: 168,
      vitaminD: 0,
      omega3: 0,
      magnesium: 121
    },
    servingSize: { amount: 250, unit: 'ml(1그릇)', weightInGrams: 250 },
    pregnancySafety: { safetyLevel: 'safe' },
    benefits: ['요오드 풍부', '칼슘', '산후 회복'],
    trimesterRecommendations: { first: true, second: true, third: true },
    tags: ['국', '한식', '해조류', '산후조리'],
    searchKeywords: ['미역국', 'seaweed soup', '국', '미역']
  },

  // 주의 식품
  {
    id: 'raw-fish-001',
    name: '회(생선회)',
    nameEn: 'Raw Fish',
    category: 'seafood',
    nutritionPer100g: {
      calories: 146,
      protein: 20,
      carbs: 0,
      fat: 6.8,
      fiber: 0,
      folate: 5,
      iron: 0.9,
      calcium: 10,
      vitaminD: 100,
      omega3: 1500
    },
    servingSize: { amount: 100, unit: 'g', weightInGrams: 100 },
    pregnancySafety: { 
      safetyLevel: 'avoid',
      reason: '식중독 위험, 기생충 감염 가능'
    },
    benefits: ['단백질', '오메가3'],
    warnings: ['임신 중 섭취 금지', '리스테리아 감염 위험'],
    trimesterRecommendations: { first: false, second: false, third: false },
    tags: ['생선', '날것', '주의'],
    searchKeywords: ['회', 'sashimi', '생선회', '날생선']
  },
  {
    id: 'coffee-001',
    name: '커피',
    nameEn: 'Coffee',
    category: 'beverages',
    nutritionPer100g: {
      calories: 2,
      protein: 0.3,
      carbs: 0,
      fat: 0,
      fiber: 0,
      folate: 0,
      iron: 0,
      calcium: 2,
      vitaminD: 0,
      omega3: 0
    },
    servingSize: { amount: 240, unit: 'ml', weightInGrams: 240 },
    pregnancySafety: { 
      safetyLevel: 'caution',
      reason: '카페인 함유',
      maxServingsPerWeek: 7
    },
    benefits: ['항산화제'],
    warnings: ['하루 1잔 이하 권장', '카페인 200mg/일 이하'],
    trimesterRecommendations: { first: false, second: true, third: true },
    tags: ['음료', '카페인', '주의'],
    searchKeywords: ['커피', 'coffee', '카페인', '음료']
  }
]

// 검색 기능
export function searchFoods(query: string): FoodItem[] {
  const normalizedQuery = query.toLowerCase().trim()
  
  if (!normalizedQuery) return []
  
  return foodDatabase.filter(food => {
    // 이름 검색
    if (food.name.toLowerCase().includes(normalizedQuery)) return true
    if (food.nameEn?.toLowerCase().includes(normalizedQuery)) return true
    
    // 키워드 검색
    if (food.searchKeywords.some(keyword => 
      keyword.toLowerCase().includes(normalizedQuery)
    )) return true
    
    // 태그 검색
    if (food.tags.some(tag => 
      tag.toLowerCase().includes(normalizedQuery)
    )) return true
    
    // 카테고리 검색
    if (food.category.toLowerCase().includes(normalizedQuery)) return true
    
    return false
  })
}

// 카테고리별 필터링
export function getFoodsByCategory(category: FoodCategory): FoodItem[] {
  return foodDatabase.filter(food => food.category === category)
}

// 안전도별 필터링
export function getFoodsBySafety(safetyLevel: 'safe' | 'caution' | 'avoid'): FoodItem[] {
  return foodDatabase.filter(food => food.pregnancySafety.safetyLevel === safetyLevel)
}

// 삼분기별 추천 식품
export function getFoodsByTrimester(trimester: 1 | 2 | 3): FoodItem[] {
  const key = trimester === 1 ? 'first' : trimester === 2 ? 'second' : 'third'
  return foodDatabase.filter(food => food.trimesterRecommendations[key])
}

// 영양소별 상위 식품 조회
export function getTopFoodsByNutrient(
  nutrient: keyof NutritionInfo, 
  limit: number = 10
): FoodItem[] {
  return [...foodDatabase]
    .sort((a, b) => b.nutritionPer100g[nutrient] - a.nutritionPer100g[nutrient])
    .slice(0, limit)
}

// 식품 ID로 조회
export function getFoodById(id: string): FoodItem | undefined {
  return foodDatabase.find(food => food.id === id)
}

// 식품 영양 정보 계산 (서빙 사이즈 기준)
export function calculateNutritionPerServing(food: FoodItem): NutritionInfo {
  const ratio = food.servingSize.weightInGrams / 100
  const nutrition: NutritionInfo = {} as NutritionInfo
  
  Object.keys(food.nutritionPer100g).forEach(key => {
    const nutrientKey = key as keyof NutritionInfo
    nutrition[nutrientKey] = Math.round(food.nutritionPer100g[nutrientKey] * ratio * 10) / 10
  })
  
  return nutrition
}
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Recipe Types
export interface RecipeIngredient {
  name: string
  amount: string
  unit: string
  notes?: string
}

export interface RecipeStep {
  step: number
  instruction: string
  duration?: number // minutes
  tip?: string
}

export interface RecipeNutrients {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  folate?: number // mcg - 엽산
  iron?: number // mg - 철분
  calcium?: number // mg - 칼슘
  vitaminD?: number // IU - 비타민D
  omega3?: number // mg - 오메가3
}

export interface Recipe {
  id: string
  name: string
  description: string
  image?: string
  prepTime: number // minutes
  cookTime: number // minutes
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  tags: string[]
  pregnancyBenefits: string[] // 임신 중 효능
  cautions?: string[] // 주의사항
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  nutrients: RecipeNutrients
  rating: number
  reviewCount: number
  author?: string
  createdAt: string
}

// Sample Recipe Data
export const recipes: Recipe[] = [
  {
    id: '1',
    name: '연어 아보카도 토스트',
    description: '오메가3가 풍부한 연어와 엽산이 많은 아보카도를 올린 통곡물 토스트. 임신 초기에 특히 좋은 영양소가 풍부합니다.',
    image: '/images/recipes/salmon-avocado-toast.jpg',
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    difficulty: 'easy',
    mealType: 'breakfast',
    tags: ['고단백', '오메가3', '엽산', '통곡물'],
    pregnancyBenefits: [
      '오메가3: 태아 뇌 발달에 필수적',
      '엽산: 신경관 결손 예방',
      '단백질: 태아 성장과 엄마 체력 유지',
      '식이섬유: 임신 중 변비 예방'
    ],
    cautions: [
      '훈제 연어는 리스테리아 위험이 있으니 완전히 익힌 연어 사용 권장',
      '아보카도 알레르기가 있는 경우 주의'
    ],
    ingredients: [
      { name: '통곡물 식빵', amount: '2', unit: '장' },
      { name: '훈제 연어 (또는 구운 연어)', amount: '80', unit: 'g' },
      { name: '아보카도', amount: '1/2', unit: '개' },
      { name: '레몬즙', amount: '1', unit: '작은술' },
      { name: '올리브오일', amount: '1', unit: '작은술' },
      { name: '소금', amount: '약간', unit: '' },
      { name: '후추', amount: '약간', unit: '' },
      { name: '방울토마토', amount: '4', unit: '개', notes: '선택사항' }
    ],
    steps: [
      { step: 1, instruction: '통곡물 식빵을 토스터에 바삭하게 굽습니다.', duration: 3 },
      { step: 2, instruction: '아보카도를 반으로 갈라 씨를 제거하고 과육을 포크로 으깹니다.', tip: '레몬즙을 미리 넣으면 갈변을 방지할 수 있어요' },
      { step: 3, instruction: '으깬 아보카도에 레몬즙, 소금, 후추를 넣고 섞습니다.' },
      { step: 4, instruction: '구운 식빵 위에 아보카도 스프레드를 펴 바릅니다.' },
      { step: 5, instruction: '연어를 올리고 올리브오일을 살짝 뿌립니다.' },
      { step: 6, instruction: '방울토마토를 반으로 잘라 장식합니다.', tip: '취향에 따라 삶은 달걀이나 케이퍼를 추가해도 좋아요' }
    ],
    nutrients: {
      calories: 420,
      protein: 25,
      carbs: 35,
      fat: 18,
      fiber: 8,
      folate: 120,
      iron: 3,
      calcium: 50,
      omega3: 1500
    },
    rating: 4.8,
    reviewCount: 234,
    author: '맘스키친',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: '요거트 베리 스무디',
    description: '프로바이오틱스가 풍부한 그릭요거트와 항산화 베리류로 만든 건강 스무디',
    image: '/images/recipes/berry-smoothie.jpg',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    mealType: 'snack',
    tags: ['프로바이오틱스', '항산화', '비타민C', '저칼로리'],
    pregnancyBenefits: [
      '프로바이오틱스: 장 건강과 면역력 증진',
      '비타민C: 철분 흡수 촉진',
      '항산화물질: 세포 보호',
      '칼슘: 뼈 건강 유지'
    ],
    ingredients: [
      { name: '그릭요거트', amount: '150', unit: 'g' },
      { name: '냉동 블루베리', amount: '50', unit: 'g' },
      { name: '냉동 딸기', amount: '50', unit: 'g' },
      { name: '바나나', amount: '1/2', unit: '개' },
      { name: '우유 (또는 아몬드밀크)', amount: '100', unit: 'ml' },
      { name: '꿀', amount: '1', unit: '큰술', notes: '선택사항' }
    ],
    steps: [
      { step: 1, instruction: '모든 재료를 블렌더에 넣습니다.' },
      { step: 2, instruction: '부드러워질 때까지 30초~1분간 갈아줍니다.' },
      { step: 3, instruction: '컵에 담고 기호에 따라 신선한 베리를 올려 장식합니다.', tip: '치아씨드나 아마씨를 추가하면 오메가3를 보충할 수 있어요' }
    ],
    nutrients: {
      calories: 180,
      protein: 12,
      carbs: 25,
      fat: 3,
      fiber: 4,
      calcium: 200,
      vitaminD: 40
    },
    rating: 4.9,
    reviewCount: 412,
    author: '영양사 김서연',
    createdAt: '2024-02-10'
  },
  {
    id: '3',
    name: '현미비빔밥',
    description: '다양한 채소와 현미밥으로 만든 영양 균형 잡힌 비빔밥. 철분과 엽산이 풍부합니다.',
    image: '/images/recipes/bibimbap.jpg',
    prepTime: 15,
    cookTime: 10,
    servings: 1,
    difficulty: 'medium',
    mealType: 'lunch',
    tags: ['고섬유', '다양한채소', '완전영양', '철분'],
    pregnancyBenefits: [
      '철분: 빈혈 예방에 도움',
      '식이섬유: 변비 예방 및 혈당 조절',
      '엽산: 시금치에 풍부',
      '비타민A: 당근에 풍부'
    ],
    cautions: [
      '고추장은 나트륨이 많으니 적당량만 사용',
      '생 달걀 대신 완전히 익힌 달걀 사용 권장'
    ],
    ingredients: [
      { name: '현미밥', amount: '200', unit: 'g' },
      { name: '시금치', amount: '50', unit: 'g' },
      { name: '당근', amount: '30', unit: 'g' },
      { name: '애호박', amount: '30', unit: 'g' },
      { name: '콩나물', amount: '50', unit: 'g' },
      { name: '달걀', amount: '1', unit: '개' },
      { name: '참기름', amount: '1', unit: '큰술' },
      { name: '저염 고추장', amount: '1', unit: '큰술' },
      { name: '깨소금', amount: '약간', unit: '' }
    ],
    steps: [
      { step: 1, instruction: '시금치, 콩나물은 끓는 물에 데쳐 물기를 짠 후 참기름과 소금으로 무칩니다.', duration: 5 },
      { step: 2, instruction: '당근과 애호박은 채 썰어 팬에 볶아 소금으로 간합니다.', duration: 5 },
      { step: 3, instruction: '달걀을 프라이하거나 반숙으로 익힙니다.', tip: '임신 중에는 완숙을 권장합니다' },
      { step: 4, instruction: '그릇에 현미밥을 담고 나물들을 예쁘게 올립니다.' },
      { step: 5, instruction: '달걀을 중앙에 올리고 저염 고추장과 참기름을 뿌립니다.' },
      { step: 6, instruction: '깨소금을 뿌리고 잘 비벼 드세요.' }
    ],
    nutrients: {
      calories: 520,
      protein: 18,
      carbs: 78,
      fat: 12,
      fiber: 12,
      folate: 180,
      iron: 6,
      calcium: 120
    },
    rating: 4.7,
    reviewCount: 189,
    author: '한식요리사 박영숙',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: '견과류 믹스',
    description: '아몬드, 호두, 캐슈넛 등 임신에 좋은 견과류 조합. 간편하게 영양소를 보충할 수 있습니다.',
    image: '/images/recipes/nuts-mix.jpg',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    mealType: 'snack',
    tags: ['건강지방', '마그네슘', '비타민E', '간편식'],
    pregnancyBenefits: [
      '건강한 지방: 태아 뇌 발달',
      '마그네슘: 근육 경련 예방',
      '비타민E: 항산화 효과',
      '단백질: 에너지 보충'
    ],
    cautions: [
      '견과류 알레르기 확인 필요',
      '하루 권장량(30g) 초과 섭취 주의'
    ],
    ingredients: [
      { name: '아몬드', amount: '10', unit: '개' },
      { name: '호두', amount: '5', unit: '개' },
      { name: '캐슈넛', amount: '5', unit: '개' },
      { name: '건포도', amount: '10', unit: 'g', notes: '선택사항' }
    ],
    steps: [
      { step: 1, instruction: '견과류를 적당량씩 덜어 작은 용기에 담습니다.' },
      { step: 2, instruction: '기호에 따라 건포도나 크랜베리를 추가합니다.' },
      { step: 3, instruction: '밀폐용기에 보관하면 일주일 정도 두고 먹을 수 있습니다.', tip: '직사광선을 피해 서늘한 곳에 보관하세요' }
    ],
    nutrients: {
      calories: 200,
      protein: 6,
      carbs: 8,
      fat: 16,
      fiber: 3,
      iron: 1,
      calcium: 40,
      omega3: 800
    },
    rating: 4.6,
    reviewCount: 567,
    author: '영양사 이민지',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: '닭가슴살 채소찜',
    description: '저염 조리법으로 준비한 닭가슴살과 계절 채소찜. 고단백 저지방 식단입니다.',
    image: '/images/recipes/chicken-steam.jpg',
    prepTime: 15,
    cookTime: 15,
    servings: 1,
    difficulty: 'medium',
    mealType: 'dinner',
    tags: ['저염', '고단백', '저지방', '다이어트'],
    pregnancyBenefits: [
      '고단백: 태아 성장과 근육 유지',
      '저지방: 건강한 체중 관리',
      '비타민B6: 입덧 완화에 도움',
      '아연: 면역력 증진'
    ],
    ingredients: [
      { name: '닭가슴살', amount: '150', unit: 'g' },
      { name: '브로콜리', amount: '100', unit: 'g' },
      { name: '양파', amount: '1/2', unit: '개' },
      { name: '당근', amount: '50', unit: 'g' },
      { name: '청경채', amount: '2', unit: '줄기' },
      { name: '저염 간장', amount: '1', unit: '큰술' },
      { name: '참기름', amount: '1', unit: '작은술' },
      { name: '마늘', amount: '2', unit: '쪽' },
      { name: '생강', amount: '약간', unit: '' }
    ],
    steps: [
      { step: 1, instruction: '닭가슴살을 한입 크기로 썰어 마늘, 생강, 간장으로 밑간합니다.', duration: 10 },
      { step: 2, instruction: '채소들을 먹기 좋은 크기로 썹니다.' },
      { step: 3, instruction: '찜기에 물을 끓이고 닭가슴살을 먼저 7분간 찝니다.', duration: 7 },
      { step: 4, instruction: '채소를 추가하고 5~7분 더 찝니다.', duration: 7, tip: '채소는 너무 오래 찌면 물러지니 주의하세요' },
      { step: 5, instruction: '접시에 담고 참기름을 뿌려 완성합니다.' }
    ],
    nutrients: {
      calories: 480,
      protein: 45,
      carbs: 25,
      fat: 8,
      fiber: 6,
      iron: 2,
      calcium: 80,
      folate: 150
    },
    rating: 4.5,
    reviewCount: 298,
    author: '다이어트 셰프',
    createdAt: '2024-01-25'
  }
]

// Favorites Context
interface FavoritesContextType {
  favorites: string[]
  addFavorite: (recipeId: string) => void
  removeFavorite: (recipeId: string) => void
  isFavorite: (recipeId: string) => boolean
  toggleFavorite: (recipeId: string) => void
  getFavoriteRecipes: () => Recipe[]
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recipe-favorites')
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse favorites:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save favorites to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('recipe-favorites', JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = (recipeId: string) => {
    setFavorites((prev) => [...prev, recipeId])
  }

  const removeFavorite = (recipeId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== recipeId))
  }

  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId)
  }

  const toggleFavorite = (recipeId: string) => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  const getFavoriteRecipes = () => {
    return recipes.filter((recipe) => favorites.includes(recipe.id))
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        getFavoriteRecipes
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a RecipeProvider')
  }
  return context
}

// Helper function to get recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id)
}

// Helper function to get recipes by meal type
export function getRecipesByMealType(mealType: Recipe['mealType']): Recipe[] {
  return recipes.filter((recipe) => recipe.mealType === mealType)
}

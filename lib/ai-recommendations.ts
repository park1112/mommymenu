// AI 추천 시스템 프로토타입
import { FoodItem, foodDatabase, getTopFoodsByNutrient } from './food-database'

export interface NutritionRecommendation {
  id: string
  type: 'nutrient' | 'symptom' | 'craving' | 'safety' | 'meal'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  reason: string
  recommendations: string[]
  foods?: FoodItem[]
  timestamp: string
}

export interface PregnancySymptom {
  symptom: string
  severity: 'mild' | 'moderate' | 'severe'
  frequency: 'rare' | 'occasional' | 'frequent'
}

export interface UserPreferences {
  allergies: string[]
  dislikes: string[]
  dietaryRestrictions: string[]
  culturalPreferences: string[]
}

export interface NutritionDeficiency {
  nutrient: string
  currentLevel: number
  targetLevel: number
  deficiencyPercentage: number
}

// 삼분기별 영양 요구사항
const trimesterNutritionNeeds = {
  1: {
    priority: ['folate', 'vitaminB12', 'iron'],
    dailyTargets: {
      folate: 600,
      iron: 27,
      calcium: 1000,
      vitaminD: 600,
      protein: 71
    },
    focus: '태아의 신경관 발달과 기초 기관 형성'
  },
  2: {
    priority: ['calcium', 'protein', 'omega3'],
    dailyTargets: {
      folate: 600,
      iron: 27,
      calcium: 1000,
      vitaminD: 600,
      protein: 71,
      omega3: 200
    },
    focus: '태아의 뼈와 뇌 발달, 엄마의 혈액량 증가'
  },
  3: {
    priority: ['protein', 'calcium', 'iron'],
    dailyTargets: {
      folate: 600,
      iron: 27,
      calcium: 1000,
      vitaminD: 600,
      protein: 85,
      omega3: 300
    },
    focus: '태아의 급속한 성장과 출산 준비'
  }
}

// 증상별 추천 음식
const symptomFoodRecommendations = {
  nausea: {
    foods: ['생강차', '크래커', '바나나', '토스트', '레몬'],
    avoid: ['기름진 음식', '향신료가 강한 음식', '커피'],
    tips: ['소량씩 자주 섭취', '공복 피하기', '수분 충분히 섭취']
  },
  constipation: {
    foods: ['현미', '고구마', '사과', '요거트', '프룬'],
    avoid: ['백미', '가공식품'],
    tips: ['식이섬유 섭취 증가', '수분 충분히 섭취', '가벼운 운동']
  },
  fatigue: {
    foods: ['계란', '시금치', '소고기', '견과류', '현미'],
    avoid: ['과도한 카페인', '설탕이 많은 음식'],
    tips: ['철분과 비타민 B 섭취', '규칙적인 식사', '충분한 휴식']
  },
  heartburn: {
    foods: ['오트밀', '멜론', '요거트', '채소'],
    avoid: ['토마토', '초콜릿', '커피', '매운 음식'],
    tips: ['소량씩 자주 섭취', '식후 바로 눕지 않기']
  },
  edema: {
    foods: ['수박', '오이', '바나나', '아보카도'],
    avoid: ['짠 음식', '가공식품', '인스턴트'],
    tips: ['나트륨 섭취 줄이기', '칼륨 섭취 늘리기', '다리 올리기']
  }
}

// AI 추천 엔진
export class AIRecommendationEngine {
  private pregnancyWeek: number
  private trimester: 1 | 2 | 3
  private nutritionHistory: any[]
  private symptoms: PregnancySymptom[]
  private preferences: UserPreferences

  constructor(
    pregnancyWeek: number,
    nutritionHistory: any[] = [],
    symptoms: PregnancySymptom[] = [],
    preferences: UserPreferences = {
      allergies: [],
      dislikes: [],
      dietaryRestrictions: [],
      culturalPreferences: []
    }
  ) {
    this.pregnancyWeek = pregnancyWeek
    this.trimester = pregnancyWeek <= 13 ? 1 : pregnancyWeek <= 27 ? 2 : 3
    this.nutritionHistory = nutritionHistory
    this.symptoms = symptoms
    this.preferences = preferences
  }

  // 종합 추천 생성
  generateRecommendations(): NutritionRecommendation[] {
    const recommendations: NutritionRecommendation[] = []

    // 1. 영양소 부족 분석
    const nutrientRecs = this.analyzeNutrientDeficiencies()
    recommendations.push(...nutrientRecs)

    // 2. 증상 기반 추천
    const symptomRecs = this.generateSymptomRecommendations()
    recommendations.push(...symptomRecs)

    // 3. 삼분기별 특별 추천
    const trimesterRecs = this.generateTrimesterRecommendations()
    recommendations.push(...trimesterRecs)

    // 4. 식사 균형 추천
    const mealBalanceRecs = this.analyzeMealBalance()
    recommendations.push(...mealBalanceRecs)

    // 우선순위 정렬
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  // 영양소 부족 분석
  private analyzeNutrientDeficiencies(): NutritionRecommendation[] {
    const recommendations: NutritionRecommendation[] = []
    const targets = trimesterNutritionNeeds[this.trimester].dailyTargets
    
    // 실제로는 nutritionHistory를 분석해야 하지만, 프로토타입이므로 시뮬레이션
    const deficiencies: NutritionDeficiency[] = [
      { nutrient: 'folate', currentLevel: 350, targetLevel: 600, deficiencyPercentage: 42 },
      { nutrient: 'iron', currentLevel: 20, targetLevel: 27, deficiencyPercentage: 26 }
    ]

    deficiencies.forEach(def => {
      if (def.deficiencyPercentage > 20) {
        const topFoods = this.getTopFoodsForNutrient(def.nutrient)
        
        recommendations.push({
          id: `nutrient-${def.nutrient}-${Date.now()}`,
          type: 'nutrient',
          priority: def.deficiencyPercentage > 40 ? 'high' : 'medium',
          title: `${this.getNutrientKoreanName(def.nutrient)} 섭취 필요`,
          description: `현재 ${def.nutrient} 섭취량이 권장량의 ${Math.round(100 - def.deficiencyPercentage)}% 수준입니다.`,
          reason: `임신 ${this.trimester}삼분기에는 ${this.getNutrientImportance(def.nutrient)}`,
          recommendations: topFoods.map(f => f.name),
          foods: topFoods,
          timestamp: new Date().toISOString()
        })
      }
    })

    return recommendations
  }

  // 증상 기반 추천
  private generateSymptomRecommendations(): NutritionRecommendation[] {
    const recommendations: NutritionRecommendation[] = []

    this.symptoms.forEach(symptom => {
      const symptomKey = this.normalizeSymptom(symptom.symptom)
      const foodRecs = symptomFoodRecommendations[symptomKey as keyof typeof symptomFoodRecommendations]
      
      if (foodRecs) {
        recommendations.push({
          id: `symptom-${symptomKey}-${Date.now()}`,
          type: 'symptom',
          priority: symptom.severity === 'severe' ? 'high' : symptom.severity === 'moderate' ? 'medium' : 'low',
          title: `${symptom.symptom} 완화 식단`,
          description: `${symptom.symptom} 증상 완화를 위한 맞춤 식단 추천`,
          reason: `${symptom.frequency === 'frequent' ? '자주' : '가끔'} 발생하는 증상입니다.`,
          recommendations: [...foodRecs.foods, ...foodRecs.tips],
          timestamp: new Date().toISOString()
        })
      }
    })

    return recommendations
  }

  // 삼분기별 추천
  private generateTrimesterRecommendations(): NutritionRecommendation[] {
    const trimesterNeeds = trimesterNutritionNeeds[this.trimester]
    const priorityNutrients = trimesterNeeds.priority

    return [{
      id: `trimester-${this.trimester}-${Date.now()}`,
      type: 'meal',
      priority: 'medium',
      title: `${this.trimester}삼분기 필수 영양소`,
      description: trimesterNeeds.focus,
      reason: `임신 ${this.pregnancyWeek}주차 (${this.trimester}삼분기)에 특히 중요한 영양소입니다.`,
      recommendations: priorityNutrients.map(nutrient => 
        `${this.getNutrientKoreanName(nutrient)}: 하루 ${trimesterNeeds.dailyTargets[nutrient as keyof typeof trimesterNeeds.dailyTargets]}${this.getNutrientUnit(nutrient)}`
      ),
      foods: this.getRecommendedFoodsForTrimester(),
      timestamp: new Date().toISOString()
    }]
  }

  // 식사 균형 분석
  private analyzeMealBalance(): NutritionRecommendation[] {
    // 실제로는 nutritionHistory를 분석해야 함
    const recommendations: NutritionRecommendation[] = []

    // 아침 식사 부족 체크
    const breakfastCount = this.nutritionHistory.filter(h => h.mealType === 'breakfast').length
    if (breakfastCount < 5) {
      recommendations.push({
        id: `meal-breakfast-${Date.now()}`,
        type: 'meal',
        priority: 'medium',
        title: '아침 식사 개선 필요',
        description: '규칙적인 아침 식사가 부족합니다.',
        reason: '아침 식사는 하루 에너지와 영양 공급의 기초가 됩니다.',
        recommendations: [
          '간단한 토스트와 계란',
          '요거트와 과일',
          '오트밀과 견과류'
        ],
        timestamp: new Date().toISOString()
      })
    }

    return recommendations
  }

  // 유틸리티 함수들
  private getTopFoodsForNutrient(nutrient: string): FoodItem[] {
    const nutrientMap: { [key: string]: keyof typeof foodDatabase[0]['nutritionPer100g'] } = {
      'folate': 'folate',
      'iron': 'iron',
      'calcium': 'calcium',
      'protein': 'protein',
      'omega3': 'omega3'
    }

    const mappedNutrient = nutrientMap[nutrient]
    if (!mappedNutrient) return []

    return getTopFoodsByNutrient(mappedNutrient, 5)
      .filter(food => 
        food.pregnancySafety.safetyLevel !== 'avoid' &&
        !this.preferences.allergies.includes(food.name) &&
        !this.preferences.dislikes.includes(food.name)
      )
  }

  private getRecommendedFoodsForTrimester(): FoodItem[] {
    const priorityNutrients = trimesterNutritionNeeds[this.trimester].priority
    const foods: FoodItem[] = []

    priorityNutrients.forEach(nutrient => {
      const topFoods = this.getTopFoodsForNutrient(nutrient)
      foods.push(...topFoods.slice(0, 2))
    })

    // 중복 제거
    return Array.from(new Map(foods.map(f => [f.id, f])).values())
  }

  private getNutrientKoreanName(nutrient: string): string {
    const names: { [key: string]: string } = {
      folate: '엽산',
      iron: '철분',
      calcium: '칼슘',
      protein: '단백질',
      omega3: '오메가3',
      vitaminD: '비타민 D',
      vitaminB12: '비타민 B12',
      zinc: '아연',
      magnesium: '마그네슘'
    }
    return names[nutrient] || nutrient
  }

  private getNutrientUnit(nutrient: string): string {
    const units: { [key: string]: string } = {
      folate: 'mcg',
      iron: 'mg',
      calcium: 'mg',
      protein: 'g',
      omega3: 'mg',
      vitaminD: 'IU',
      vitaminB12: 'mcg',
      zinc: 'mg',
      magnesium: 'mg'
    }
    return units[nutrient] || ''
  }

  private getNutrientImportance(nutrient: string): string {
    const importance: { [key: string]: string } = {
      folate: '태아의 신경관 결손 예방에 필수적입니다',
      iron: '빈혈 예방과 태아의 성장에 중요합니다',
      calcium: '태아의 뼈와 치아 형성에 필요합니다',
      protein: '태아의 조직과 기관 발달에 필수입니다',
      omega3: '태아의 뇌와 시력 발달에 중요합니다'
    }
    return importance[nutrient] || '태아와 엄마의 건강에 중요합니다'
  }

  private normalizeSymptom(symptom: string): string {
    const symptomMap: { [key: string]: string } = {
      '입덧': 'nausea',
      '구토': 'nausea',
      '메스꺼움': 'nausea',
      '변비': 'constipation',
      '피로': 'fatigue',
      '피곤': 'fatigue',
      '속쓰림': 'heartburn',
      '부종': 'edema',
      '붓기': 'edema'
    }
    return symptomMap[symptom] || symptom.toLowerCase()
  }
}

// 간단한 추천 생성 함수 (Context와 통합용)
export function getQuickRecommendations(
  pregnancyWeek: number,
  recentSymptoms: string[] = []
): NutritionRecommendation[] {
  const symptoms: PregnancySymptom[] = recentSymptoms.map(s => ({
    symptom: s,
    severity: 'mild' as const,
    frequency: 'occasional' as const
  }))

  const engine = new AIRecommendationEngine(pregnancyWeek, [], symptoms)
  return engine.generateRecommendations().slice(0, 3) // 상위 3개만 반환
}
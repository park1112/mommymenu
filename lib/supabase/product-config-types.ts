// Product Configuration Types for Supabase Database

export interface ProductCategory {
  id: string
  name: string
  description?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductWeight {
  id: string
  weight_kg: number
  display_name: string
  category_id?: string // Optional: link to specific category
  is_default: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductGrade {
  id: string
  grade_name: string // 대, 중, 소
  grade_code: string // L, M, S
  color_code?: string // For UI display (green, yellow, default)
  price_multiplier: number // 1.2 for 대, 1.0 for 중, 0.8 for 소
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PackingUnit {
  id: string
  unit_name: string // 팔레트, 박스, etc
  pieces_per_unit: number // 85개/팔레트
  category_id?: string // Optional: specific to category
  weight_id?: string // Optional: specific to weight
  is_default: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

// Combined configuration type for easy management
export interface ProductConfiguration {
  categories: ProductCategory[]
  weights: ProductWeight[]
  grades: ProductGrade[]
  packingUnits: PackingUnit[]
}

// Form types for creating/editing
export interface ProductCategoryInput {
  name: string
  description?: string
  display_order?: number
  is_active?: boolean
}

export interface ProductWeightInput {
  weight_kg: number
  display_name?: string
  category_id?: string
  is_default?: boolean
  is_active?: boolean
}

export interface ProductGradeInput {
  grade_name: string
  grade_code: string
  color_code?: string
  price_multiplier?: number
  display_order?: number
  is_active?: boolean
}

export interface PackingUnitInput {
  unit_name: string
  pieces_per_unit: number
  category_id?: string
  weight_id?: string
  is_default?: boolean
  is_active?: boolean
}
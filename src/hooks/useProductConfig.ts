'use client'

import { useState, useEffect, useCallback } from 'react'
import type { 
  ProductConfiguration, 
  ProductCategory, 
  ProductWeight, 
  ProductGrade, 
  PackingUnit,
  ProductCategoryInput,
  ProductWeightInput,
  ProductGradeInput,
  PackingUnitInput
} from '@/lib/supabase/product-config-types'

// Default configuration (fallback when DB is not available)
const defaultConfig: ProductConfiguration = {
  categories: [
    { id: '1', name: '양파', description: '국내산 양파', display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', name: '마늘', description: '국내산 마늘', display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', name: '감자', description: '국내산 감자', display_order: 3, is_active: true, created_at: '', updated_at: '' },
    { id: '4', name: '고구마', description: '국내산 고구마', display_order: 4, is_active: true, created_at: '', updated_at: '' },
    { id: '5', name: '배추', description: '국내산 배추', display_order: 5, is_active: true, created_at: '', updated_at: '' },
    { id: '6', name: '무', description: '국내산 무', display_order: 6, is_active: true, created_at: '', updated_at: '' }
  ],
  weights: [
    { id: '1', weight_kg: 10, display_name: '10kg', is_default: false, is_active: true, created_at: '', updated_at: '' },
    { id: '2', weight_kg: 12, display_name: '12kg', is_default: true, is_active: true, created_at: '', updated_at: '' },
    { id: '3', weight_kg: 15, display_name: '15kg', is_default: false, is_active: true, created_at: '', updated_at: '' },
    { id: '4', weight_kg: 20, display_name: '20kg', is_default: false, is_active: true, created_at: '', updated_at: '' }
  ],
  grades: [
    { id: '1', grade_name: '대', grade_code: 'L', color_code: 'green', price_multiplier: 1.2, display_order: 1, is_active: true, created_at: '', updated_at: '' },
    { id: '2', grade_name: '중', grade_code: 'M', color_code: 'yellow', price_multiplier: 1.0, display_order: 2, is_active: true, created_at: '', updated_at: '' },
    { id: '3', grade_name: '소', grade_code: 'S', color_code: 'default', price_multiplier: 0.8, display_order: 3, is_active: true, created_at: '', updated_at: '' }
  ],
  packingUnits: [
    { id: '1', unit_name: '팔레트', pieces_per_unit: 85, is_default: true, is_active: true, created_at: '', updated_at: '' },
    { id: '2', unit_name: '박스', pieces_per_unit: 10, is_default: false, is_active: true, created_at: '', updated_at: '' },
    { id: '3', unit_name: '망', pieces_per_unit: 20, is_default: false, is_active: true, created_at: '', updated_at: '' }
  ]
}

export function useProductConfig() {
  const [config, setConfig] = useState<ProductConfiguration>(defaultConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load configuration from localStorage (temporary solution before Supabase)
  useEffect(() => {
    const loadConfig = () => {
      try {
        const savedConfig = localStorage.getItem('productConfig')
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig))
        }
      } catch (error) {
        console.error('Failed to load product config:', error)
        setError('설정을 불러오는데 실패했습니다')
      }
    }
    loadConfig()
  }, [])

  // Save configuration to localStorage
  const saveConfig = useCallback((newConfig: ProductConfiguration) => {
    try {
      localStorage.setItem('productConfig', JSON.stringify(newConfig))
      setConfig(newConfig)
      setError(null)
      return true
    } catch (error) {
      console.error('Failed to save product config:', error)
      setError('설정을 저장하는데 실패했습니다')
      return false
    }
  }, [])

  // Category management
  const addCategory = useCallback((category: ProductCategoryInput) => {
    const newCategory: ProductCategory = {
      id: Date.now().toString(),
      name: category.name,
      description: category.description,
      display_order: category.display_order || config.categories.length + 1,
      is_active: category.is_active !== undefined ? category.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const newConfig = {
      ...config,
      categories: [...config.categories, newCategory]
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const updateCategory = useCallback((id: string, updates: Partial<ProductCategoryInput>) => {
    const newConfig = {
      ...config,
      categories: config.categories.map(cat => 
        cat.id === id 
          ? { ...cat, ...updates, updated_at: new Date().toISOString() }
          : cat
      )
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const deleteCategory = useCallback((id: string) => {
    const newConfig = {
      ...config,
      categories: config.categories.filter(cat => cat.id !== id)
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  // Weight management
  const addWeight = useCallback((weight: ProductWeightInput) => {
    const newWeight: ProductWeight = {
      id: Date.now().toString(),
      weight_kg: weight.weight_kg,
      display_name: weight.display_name || `${weight.weight_kg}kg`,
      category_id: weight.category_id,
      is_default: weight.is_default || false,
      is_active: weight.is_active !== undefined ? weight.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const newConfig = {
      ...config,
      weights: [...config.weights, newWeight]
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const updateWeight = useCallback((id: string, updates: Partial<ProductWeightInput>) => {
    const newConfig = {
      ...config,
      weights: config.weights.map(weight => 
        weight.id === id 
          ? { ...weight, ...updates, updated_at: new Date().toISOString() }
          : weight
      )
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const deleteWeight = useCallback((id: string) => {
    const newConfig = {
      ...config,
      weights: config.weights.filter(weight => weight.id !== id)
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  // Grade management
  const addGrade = useCallback((grade: ProductGradeInput) => {
    const newGrade: ProductGrade = {
      id: Date.now().toString(),
      grade_name: grade.grade_name,
      grade_code: grade.grade_code,
      color_code: grade.color_code,
      price_multiplier: grade.price_multiplier || 1.0,
      display_order: grade.display_order || config.grades.length + 1,
      is_active: grade.is_active !== undefined ? grade.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const newConfig = {
      ...config,
      grades: [...config.grades, newGrade]
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const updateGrade = useCallback((id: string, updates: Partial<ProductGradeInput>) => {
    const newConfig = {
      ...config,
      grades: config.grades.map(grade => 
        grade.id === id 
          ? { ...grade, ...updates, updated_at: new Date().toISOString() }
          : grade
      )
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const deleteGrade = useCallback((id: string) => {
    const newConfig = {
      ...config,
      grades: config.grades.filter(grade => grade.id !== id)
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  // Packing unit management
  const addPackingUnit = useCallback((unit: PackingUnitInput) => {
    const newUnit: PackingUnit = {
      id: Date.now().toString(),
      unit_name: unit.unit_name,
      pieces_per_unit: unit.pieces_per_unit,
      category_id: unit.category_id,
      weight_id: unit.weight_id,
      is_default: unit.is_default || false,
      is_active: unit.is_active !== undefined ? unit.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const newConfig = {
      ...config,
      packingUnits: [...config.packingUnits, newUnit]
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const updatePackingUnit = useCallback((id: string, updates: Partial<PackingUnitInput>) => {
    const newConfig = {
      ...config,
      packingUnits: config.packingUnits.map(unit => 
        unit.id === id 
          ? { ...unit, ...updates, updated_at: new Date().toISOString() }
          : unit
      )
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  const deletePackingUnit = useCallback((id: string) => {
    const newConfig = {
      ...config,
      packingUnits: config.packingUnits.filter(unit => unit.id !== id)
    }
    return saveConfig(newConfig)
  }, [config, saveConfig])

  // Reset to default configuration
  const resetToDefault = useCallback(() => {
    return saveConfig(defaultConfig)
  }, [saveConfig])

  // Get active items only
  const getActiveConfig = useCallback((): ProductConfiguration => {
    return {
      categories: config.categories.filter(c => c.is_active),
      weights: config.weights.filter(w => w.is_active),
      grades: config.grades.filter(g => g.is_active),
      packingUnits: config.packingUnits.filter(u => u.is_active)
    }
  }, [config])

  return {
    config,
    isLoading,
    error,
    // Category methods
    addCategory,
    updateCategory,
    deleteCategory,
    // Weight methods
    addWeight,
    updateWeight,
    deleteWeight,
    // Grade methods
    addGrade,
    updateGrade,
    deleteGrade,
    // Packing unit methods
    addPackingUnit,
    updatePackingUnit,
    deletePackingUnit,
    // Utility methods
    resetToDefault,
    getActiveConfig,
    saveConfig
  }
}
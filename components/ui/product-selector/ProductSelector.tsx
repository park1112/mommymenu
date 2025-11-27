'use client'

import * as React from 'react'
import { Search, Package, Plus, Minus, AlertTriangle, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Card from '@/components/ui/card/Card'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'

interface Product {
  id: string
  sku: string
  name: string
  category: string | null
  unit: string
  current_stock: number
  min_stock: number
  is_active: boolean
  created_at: string
  updated_at: string
  price?: number
  image?: string
}

interface SelectedProduct extends Product {
  quantity: number
  note?: string
}

interface ProductSelectorProps {
  products: Product[]
  selectedProducts: SelectedProduct[]
  onProductsChange: (products: SelectedProduct[]) => void
  maxSelections?: number
  className?: string
}

export default function ProductSelector({
  products,
  selectedProducts,
  onProductsChange,
  maxSelections,
  className
}: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [quantities, setQuantities] = React.useState<Record<string, number>>({})

  // 카테고리 목록 추출
  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category).filter(c => c !== null))) as string[]
    return ['all', ...cats]
  }, [products])

  // 필터링된 제품 목록
  const filteredProducts = React.useMemo(() => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term)
      )
    }

    // 재고 부족 제품을 상단에 표시
    return filtered.sort((a, b) => {
      const aLowStock = a.current_stock <= a.min_stock
      const bLowStock = b.current_stock <= b.min_stock
      if (aLowStock && !bLowStock) return -1
      if (!aLowStock && bLowStock) return 1
      return 0
    })
  }, [products, searchTerm, selectedCategory])

  // 제품 추가/제거
  const handleProductToggle = (product: Product) => {
    const existingIndex = selectedProducts.findIndex(p => p.id === product.id)
    
    if (existingIndex >= 0) {
      // 제거
      const newSelected = [...selectedProducts]
      newSelected.splice(existingIndex, 1)
      onProductsChange(newSelected)
      
      // 수량 초기화
      const newQuantities = { ...quantities }
      delete newQuantities[product.id]
      setQuantities(newQuantities)
    } else {
      // 추가
      if (maxSelections && selectedProducts.length >= maxSelections) {
        alert(`최대 ${maxSelections}개까지만 선택할 수 있습니다.`)
        return
      }
      
      const quantity = quantities[product.id] || 1
      onProductsChange([...selectedProducts, { ...product, quantity }])
    }
  }

  // 수량 변경
  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities({ ...quantities, [productId]: quantity })
    
    // 이미 선택된 제품이면 수량 업데이트
    const existingIndex = selectedProducts.findIndex(p => p.id === productId)
    if (existingIndex >= 0) {
      const newSelected = [...selectedProducts]
      newSelected[existingIndex] = {
        ...newSelected[existingIndex],
        quantity
      }
      onProductsChange(newSelected)
    }
  }

  // 선택된 제품 제거
  const handleRemoveSelected = (productId: string) => {
    const newSelected = selectedProducts.filter(p => p.id !== productId)
    onProductsChange(newSelected)
    
    const newQuantities = { ...quantities }
    delete newQuantities[productId]
    setQuantities(newQuantities)
  }

  const getStockStatus = (product: Product) => {
    const ratio = product.current_stock / product.min_stock
    if (ratio <= 0.5) return { label: '긴급', color: 'text-red-600 bg-red-50 dark:bg-red-900/30' }
    if (ratio <= 1) return { label: '부족', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30' }
    return { label: '충분', color: 'text-green-600 bg-green-50 dark:bg-green-900/30' }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* 검색 및 필터 */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="제품명 또는 SKU로 검색..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? '전체' : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* 선택된 제품 목록 */}
      {selectedProducts.length > 0 && (
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <h3 className="text-sm font-medium text-primary-700 dark:text-primary-300 mb-3">
            선택된 제품 ({selectedProducts.length}개)
          </h3>
          <div className="space-y-2">
            {selectedProducts.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Package className="w-4 h-4 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {product.sku} · {product.quantity} {product.unit}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSelected(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 제품 그리드 */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-[600px] overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <Package className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
            <p className="text-neutral-500 dark:text-neutral-400">
              {searchTerm ? "검색 결과가 없습니다" : "등록된 제품이 없습니다"}
            </p>
          </div>
        ) : (
          filteredProducts.map(product => {
            const isSelected = selectedProducts.some(p => p.id === product.id)
            const stockStatus = getStockStatus(product)
            const quantity = quantities[product.id] || 1
            const isLowStock = product.current_stock <= product.min_stock
            
            return (
              <Card
                key={product.id}
                className={cn(
                  "relative transition-all",
                  "hover:shadow-md",
                  isSelected && "ring-2 ring-primary-500 border-primary-500"
                )}
              >
                <div className="p-4 space-y-3">
                  {/* 제품 정보 */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {product.name}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {product.sku} · {product.category}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* 재고 상태 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isLowStock && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          재고: {product.current_stock} {product.unit}
                        </span>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 text-xs rounded-full",
                        stockStatus.color
                      )}>
                        {stockStatus.label}
                      </span>
                    </div>
                  </div>

                  {/* 수량 선택 및 버튼 */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(product.id, Math.max(1, quantity - 1))}
                        className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(product.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center bg-transparent border-none focus:outline-none text-sm"
                        min="1"
                        max={product.current_stock}
                      />
                      <button
                        onClick={() => handleQuantityChange(product.id, Math.min(product.current_stock, quantity + 1))}
                        className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        disabled={quantity >= product.current_stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      variant={isSelected ? "secondary" : "primary"}
                      onClick={() => handleProductToggle(product)}
                      className="flex-1"
                    >
                      {isSelected ? "선택 해제" : "선택"}
                    </Button>
                  </div>

                  {/* 가격 정보 (있는 경우) */}
                  {product.price && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        단가: {product.price.toLocaleString()}원
                      </p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        소계: {(product.price * quantity).toLocaleString()}원
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
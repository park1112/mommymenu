import * as React from 'react'
import { cn } from '@/lib/utils'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import ProductCard from '@/components/feature/product-card/ProductCard'
import { Search, Package, AlertTriangle, Clock, Check } from 'lucide-react'
import { useInventoryStore } from '@/store/inventory'
import type { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row']

export interface ProductSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  products?: Product[]
  selectedProductIds?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  showQuickFilters?: boolean
  gridCols?: 1 | 2 | 3 | 4
}

const ProductSelector = React.forwardRef<HTMLDivElement, ProductSelectorProps>(
  ({ 
    className, 
    products: propProducts,
    selectedProductIds: propSelectedIds,
    onSelectionChange,
    showQuickFilters = true,
    gridCols = 3,
    ...props 
  }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [activeFilter, setActiveFilter] = React.useState<string>('all')
    
    // Use store if no props provided
    const storeProducts = useInventoryStore((state) => state.products)
    const storeSelectedIds = useInventoryStore((state) => state.selectedProducts)
    const toggleProductSelection = useInventoryStore((state) => state.toggleProductSelection)
    
    const products = propProducts || storeProducts
    const selectedIds = propSelectedIds || storeSelectedIds
    
    // Filter products based on search and active filter
    const filteredProducts = React.useMemo(() => {
      let filtered = products
      
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(
          p => p.name.toLowerCase().includes(term) || 
               p.sku.toLowerCase().includes(term) ||
               p.category?.toLowerCase().includes(term)
        )
      }
      
      // Quick filters
      switch (activeFilter) {
        case 'low-stock':
          filtered = filtered.filter(p => p.current_stock <= p.min_stock)
          break
        case 'frequently-used':
          // This would need usage data
          filtered = filtered.slice(0, 6)
          break
        case 'recent':
          // Sort by updated_at or created_at
          filtered = [...filtered].sort((a, b) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          ).slice(0, 6)
          break
      }
      
      return filtered
    }, [products, searchTerm, activeFilter])
    
    const handleProductSelect = (product: Product) => {
      if (onSelectionChange) {
        const newSelection = selectedIds.includes(product.id)
          ? selectedIds.filter(id => id !== product.id)
          : [...selectedIds, product.id]
        onSelectionChange(newSelection)
      } else {
        toggleProductSelection(product.id)
      }
    }
    
    const handleSelectAll = () => {
      const allIds = filteredProducts.map(p => p.id)
      if (onSelectionChange) {
        onSelectionChange(allIds)
      } else {
        allIds.forEach(id => {
          if (!selectedIds.includes(id)) {
            toggleProductSelection(id)
          }
        })
      }
    }
    
    const handleClearSelection = () => {
      if (onSelectionChange) {
        onSelectionChange([])
      } else {
        selectedIds.forEach(id => toggleProductSelection(id))
      }
    }
    
    const gridClassName = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }[gridCols]
    
    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {/* Search and Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="제품 검색 (이름, SKU, 카테고리)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                모두 선택
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearSelection}
                disabled={selectedIds.length === 0}
              >
                선택 해제
              </Button>
            </div>
          </div>
          
          {/* Quick Filters */}
          {showQuickFilters && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                <Package className="h-4 w-4 mr-1" />
                전체 제품
              </Button>
              <Button
                variant={activeFilter === 'low-stock' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('low-stock')}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                재고 부족
              </Button>
              <Button
                variant={activeFilter === 'frequently-used' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('frequently-used')}
              >
                <Check className="h-4 w-4 mr-1" />
                자주 사용
              </Button>
              <Button
                variant={activeFilter === 'recent' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('recent')}
              >
                <Clock className="h-4 w-4 mr-1" />
                최근 사용
              </Button>
            </div>
          )}
        </div>
        
        {/* Selection Info */}
        {selectedIds.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>{selectedIds.length}개</strong>의 제품이 선택되었습니다.
            </p>
          </div>
        )}
        
        {/* Product Grid */}
        <div className={cn('grid gap-4', gridClassName)}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onSelect={handleProductSelect}
                showActions={false}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? '검색 결과가 없습니다.' : '등록된 제품이 없습니다.'}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
)

ProductSelector.displayName = 'ProductSelector'

export default ProductSelector
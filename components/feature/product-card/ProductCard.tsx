import * as React from 'react'
import { cn, formatNumber } from '@/lib/utils'
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { Package, AlertTriangle, Check } from 'lucide-react'
import type { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row']

export interface ProductCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  product: Product
  isSelected?: boolean
  onSelect?: (product: Product) => void
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  showActions?: boolean
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    className, 
    product, 
    isSelected = false,
    onSelect,
    onEdit,
    onDelete,
    showActions = true,
    ...props 
  }, ref) => {
    const isLowStock = product.current_stock <= product.min_stock
    const stockPercentage = product.min_stock > 0 
      ? (product.current_stock / product.min_stock) * 100 
      : 100

    return (
      <Card
        ref={ref}
        className={cn(
          'relative transition-all cursor-pointer hover:shadow-lg',
          isSelected && 'ring-2 ring-blue-500',
          isLowStock && 'border-red-300',
          className
        )}
        onClick={() => onSelect?.(product)}
        {...props}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-blue-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </div>
          </div>
          <CardDescription className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                {product.sku}
              </span>
              {product.category && (
                <span className="text-xs text-gray-500">{product.category}</span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">{product.weight}kg</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium">
                  {product.grade}급
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{product.pieces_per_pallet}개/팔레트</span>
                {product.price_per_unit && (
                  <span>₩{product.price_per_unit.toLocaleString()}/팔레트</span>
                )}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Stock Status */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">재고 현황</span>
              <div className="text-right">
                <div className={cn(
                  'font-semibold',
                  isLowStock ? 'text-red-600' : 'text-green-600'
                )}>
                  {formatNumber(product.current_stock)} {product.unit}
                </div>
                <div className="text-xs text-gray-500">
                  ({(product.current_stock * product.pieces_per_pallet).toLocaleString()}개)
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={cn(
                  'h-2 rounded-full transition-all',
                  stockPercentage > 50 ? 'bg-green-500' :
                  stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: `${Math.min(stockPercentage, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                최소 재고: {formatNumber(product.min_stock)} {product.unit}
                <span className="ml-1">({(product.min_stock * product.pieces_per_pallet).toLocaleString()}개)</span>
              </span>
              {isLowStock && (
                <span className="flex items-center text-red-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  재고 부족
                </span>
              )}
            </div>
          </div>
          
          {/* Actions */}
          {showActions && (
            <div className="flex space-x-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.(product)
                }}
              >
                수정
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(product)
                }}
                className="text-red-600 hover:bg-red-50"
              >
                삭제
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export default ProductCard
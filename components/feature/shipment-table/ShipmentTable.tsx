import * as React from 'react'
import { cn, formatNumber } from '@/lib/utils'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table/Table'
import Button from '@/components/ui/button/Button'
import { Trash2, Plus, Save } from 'lucide-react'
import type { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row']

export interface ShipmentItem {
  id: string
  product: Product | null
  quantity: number
  unitPrice: number
  notes?: string
}

export interface ShipmentTableProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ShipmentItem[]
  products?: Product[]
  editable?: boolean
  onItemsChange?: (items: ShipmentItem[]) => void
  onSave?: (items: ShipmentItem[]) => void
}

const ShipmentTable = React.forwardRef<HTMLDivElement, ShipmentTableProps>(
  ({ 
    className, 
    items: initialItems = [],
    products = [],
    editable = true,
    onItemsChange,
    onSave,
    ...props 
  }, ref) => {
    const [items, setItems] = React.useState<ShipmentItem[]>(initialItems)
    const [focusedCell, setFocusedCell] = React.useState<{ row: number; col: string } | null>(null)

    // Initialize with empty row if no items
    React.useEffect(() => {
      if (items.length === 0 && editable) {
        const newItem: ShipmentItem = {
          id: `temp-${Date.now()}`,
          product: null,
          quantity: 0,
          unitPrice: 0,
          notes: ''
        }
        const newItems = [...items, newItem]
        setItems(newItems)
        onItemsChange?.(newItems)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addNewRow = () => {
      const newItem: ShipmentItem = {
        id: `temp-${Date.now()}`,
        product: null,
        quantity: 0,
        unitPrice: 0,
        notes: ''
      }
      const newItems = [...items, newItem]
      setItems(newItems)
      onItemsChange?.(newItems)
    }

    const removeRow = (index: number) => {
      const newItems = items.filter((_, i) => i !== index)
      setItems(newItems)
      onItemsChange?.(newItems)
    }

    const updateItem = (index: number, field: keyof ShipmentItem, value: Product | null | number | string | undefined) => {
      const newItems = [...items]
      newItems[index] = { ...newItems[index], [field]: value }
      
      // Auto-calculate total if product is selected
      if (field === 'product' && value) {
        // You could set default unit price from product here
      }
      
      setItems(newItems)
      onItemsChange?.(newItems)
    }

    const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, colName: string) => {
      const cols = ['product', 'quantity', 'unitPrice', 'notes']
      const currentColIndex = cols.indexOf(colName)
      
      switch (e.key) {
        case 'Tab':
          e.preventDefault()
          if (e.shiftKey) {
            // Move to previous cell
            if (currentColIndex > 0) {
              setFocusedCell({ row: rowIndex, col: cols[currentColIndex - 1] })
            } else if (rowIndex > 0) {
              setFocusedCell({ row: rowIndex - 1, col: cols[cols.length - 1] })
            }
          } else {
            // Move to next cell
            if (currentColIndex < cols.length - 1) {
              setFocusedCell({ row: rowIndex, col: cols[currentColIndex + 1] })
            } else if (rowIndex < items.length - 1) {
              setFocusedCell({ row: rowIndex + 1, col: cols[0] })
            } else {
              // Add new row if at last cell
              addNewRow()
              setTimeout(() => {
                setFocusedCell({ row: items.length, col: cols[0] })
              }, 0)
            }
          }
          break
        case 'Enter':
          e.preventDefault()
          if (rowIndex < items.length - 1) {
            setFocusedCell({ row: rowIndex + 1, col: colName })
          } else {
            addNewRow()
            setTimeout(() => {
              setFocusedCell({ row: items.length, col: colName })
            }, 0)
          }
          break
        case 'ArrowUp':
          if (rowIndex > 0) {
            setFocusedCell({ row: rowIndex - 1, col: colName })
          }
          break
        case 'ArrowDown':
          if (rowIndex < items.length - 1) {
            setFocusedCell({ row: rowIndex + 1, col: colName })
          }
          break
      }
    }

    const calculateTotal = () => {
      return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
    }

    const calculateItemTotal = (item: ShipmentItem) => {
      return item.quantity * item.unitPrice
    }

    // Auto-focus on focused cell
    React.useEffect(() => {
      if (focusedCell) {
        const input = document.getElementById(`cell-${focusedCell.row}-${focusedCell.col}`)
        if (input) {
          (input as HTMLInputElement).focus()
        }
      }
    }, [focusedCell])

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">제품</TableHead>
                <TableHead className="w-[100px]">수량</TableHead>
                <TableHead className="w-[120px]">단가</TableHead>
                <TableHead className="w-[120px]">합계</TableHead>
                <TableHead>비고</TableHead>
                {editable && <TableHead className="w-[50px]"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    출고할 제품을 추가하세요
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <select
                        id={`cell-${index}-product`}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.product?.id || ''}
                        onChange={(e) => {
                          const product = products.find(p => p.id === e.target.value)
                          updateItem(index, 'product', product || null)
                        }}
                        onKeyDown={(e) => handleKeyDown(e, index, 'product')}
                        disabled={!editable}
                      >
                        <option value="">제품 선택...</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name} ({product.sku})
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        id={`cell-${index}-quantity`}
                        type="number"
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        onKeyDown={(e) => handleKeyDown(e, index, 'quantity')}
                        disabled={!editable}
                        min="0"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        id={`cell-${index}-unitPrice`}
                        type="number"
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        onKeyDown={(e) => handleKeyDown(e, index, 'unitPrice')}
                        disabled={!editable}
                        min="0"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatNumber(calculateItemTotal(item))}원
                    </TableCell>
                    <TableCell>
                      <input
                        id={`cell-${index}-notes`}
                        type="text"
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.notes || ''}
                        onChange={(e) => updateItem(index, 'notes', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index, 'notes')}
                        disabled={!editable}
                        placeholder="메모..."
                      />
                    </TableCell>
                    {editable && (
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeRow(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {editable && (
              <Button
                variant="outline"
                onClick={addNewRow}
              >
                <Plus className="h-4 w-4 mr-2" />
                행 추가
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-lg">
              <span className="text-gray-600">총 금액: </span>
              <span className="font-bold">{formatNumber(calculateTotal())}원</span>
            </div>
            {editable && onSave && (
              <Button onClick={() => onSave(items)}>
                <Save className="h-4 w-4 mr-2" />
                저장
              </Button>
            )}
          </div>
        </div>

        {/* Instructions */}
        {editable && (
          <div className="text-sm text-gray-500">
            💡 팁: Tab 또는 Enter 키로 다음 셀로 이동, Shift+Tab으로 이전 셀로 이동
          </div>
        )}
      </div>
    )
  }
)

ShipmentTable.displayName = 'ShipmentTable'

export default ShipmentTable
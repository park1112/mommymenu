'use client'

import * as React from 'react'
import { Search, Building2, Phone, Mail, MapPin, Star, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import Card from '@/components/ui/card/Card'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'

interface Client {
  id: string
  code: string
  name: string
  contact?: string
  phone?: string
  email?: string
  address?: string
  isFavorite?: boolean
  lastOrderDate?: string
  totalOrders?: number
}

interface ClientSelectorProps {
  clients: Client[]
  value: Client | null
  onChange: (client: Client | null) => void
  className?: string
  placeholder?: string
}

export default function ClientSelector({
  clients,
  value,
  onChange,
  className,
  placeholder = "출고처를 선택하세요"
}: ClientSelectorProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false)

  // 즐겨찾기와 검색 필터링
  const filteredClients = React.useMemo(() => {
    let filtered = clients

    if (showFavoritesOnly) {
      filtered = filtered.filter(client => client.isFavorite)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(term) ||
        client.code.toLowerCase().includes(term) ||
        client.contact?.toLowerCase().includes(term) ||
        client.phone?.includes(term)
      )
    }

    // 즐겨찾기를 먼저, 최근 주문이 있는 것을 우선 정렬
    return filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1
      if (!a.isFavorite && b.isFavorite) return 1
      if (a.lastOrderDate && b.lastOrderDate) {
        return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
      }
      return 0
    })
  }, [clients, searchTerm, showFavoritesOnly])

  // 최근 거래처 (상위 5개)
  const recentClients = React.useMemo(() => {
    return clients
      .filter(c => c.lastOrderDate)
      .sort((a, b) => {
        const dateA = a.lastOrderDate ? new Date(a.lastOrderDate).getTime() : 0
        const dateB = b.lastOrderDate ? new Date(b.lastOrderDate).getTime() : 0
        return dateB - dateA
      })
      .slice(0, 5)
  }, [clients])

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
            placeholder="거래처명, 코드, 담당자, 전화번호로 검색..."
            className="pl-10"
          />
        </div>
        <Button
          variant={showFavoritesOnly ? "primary" : "outline"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="gap-2"
        >
          <Star className={cn(
            "w-4 h-4",
            showFavoritesOnly && "fill-current"
          )} />
          즐겨찾기
        </Button>
      </div>

      {/* 최근 거래처 (검색어가 없을 때만 표시) */}
      {!searchTerm && recentClients.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            최근 거래처
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentClients.map(client => (
              <Button
                key={client.id}
                variant={value?.id === client.id ? "primary" : "outline"}
                size="sm"
                onClick={() => onChange(client)}
                className="gap-2"
              >
                {client.isFavorite && <Star className="w-3 h-3 fill-current" />}
                {client.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 거래처 목록 */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
        {filteredClients.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <Building2 className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
            <p className="text-neutral-500 dark:text-neutral-400">
              {searchTerm ? "검색 결과가 없습니다" : "등록된 거래처가 없습니다"}
            </p>
          </div>
        ) : (
          filteredClients.map(client => (
            <Card
              key={client.id}
              className={cn(
                "relative cursor-pointer transition-all",
                "hover:shadow-md hover:border-primary-500/50",
                value?.id === client.id && "ring-2 ring-primary-500 border-primary-500"
              )}
              onClick={() => onChange(client)}
            >
              <div className="p-4 space-y-3">
                {/* 헤더 */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {client.name}
                      </h4>
                      {client.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {client.code}
                    </p>
                  </div>
                  {value?.id === client.id && (
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* 연락처 정보 */}
                <div className="space-y-1.5 text-sm">
                  {client.contact && (
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <Building2 className="w-3 h-3" />
                      <span className="truncate">{client.contact}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <Phone className="w-3 h-3" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.email && (
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{client.address}</span>
                    </div>
                  )}
                </div>

                {/* 통계 정보 */}
                {(client.totalOrders || client.lastOrderDate) && (
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between text-xs">
                      {client.totalOrders && (
                        <span className="text-neutral-500 dark:text-neutral-400">
                          총 {client.totalOrders}건
                        </span>
                      )}
                      {client.lastOrderDate && (
                        <span className="text-neutral-500 dark:text-neutral-400">
                          최근: {new Date(client.lastOrderDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 선택된 거래처 표시 */}
      {value && (
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">
                선택된 거래처
              </p>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                {value.name} ({value.code})
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange(null)}
            >
              선택 취소
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
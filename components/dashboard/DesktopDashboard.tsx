'use client'

import * as React from 'react'
import { Package, TruckIcon, AlertTriangle, Users, RefreshCw, TrendingUp, Zap, Star, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import StatCard from '@/components/ui/stat-card/StatCard'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import InventoryChart from '@/components/charts/InventoryChart'
import Button from '@/components/ui/button/Button'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row']

interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

interface RecentShipment {
  id: string
  clientName?: string
  date?: string
  product?: string
  customer?: string
  quantity?: number
  pallets?: number
  pieces?: number
  status: string
  time?: string
  total: number
}

interface TopCustomer {
  id: string
  name: string
  orderCount?: number
  totalRevenue?: number
  totalOrders?: number
  lastOrder?: string
}

interface DesktopDashboardProps {
  refreshing: boolean
  onRefresh: () => void
  monthlyData: ChartDataPoint[]
  categoryData: ChartDataPoint[]
  shipmentData: ChartDataPoint[]
  lowStockProducts: Product[]
  recentShipments?: RecentShipment[]
  topCustomers?: TopCustomer[]
  products?: Product[]
}

export default function DesktopDashboard({
  refreshing,
  onRefresh,
  monthlyData,
  categoryData,
  shipmentData: _shipmentData,
  lowStockProducts,
  recentShipments = [],
  topCustomers = [],
  products = []
}: DesktopDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'week' | 'month' | 'year'>('month')
  const [quickShipmentOpen, setQuickShipmentOpen] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>('')
  const [selectedProduct, setSelectedProduct] = React.useState<string>('')

  // 오늘의 통계 계산
  const todayShipments = recentShipments.filter(s => s.time?.includes('시간')).length
  const todayRevenue = recentShipments
    .filter(s => s.time?.includes('시간'))
    .reduce((sum, s) => sum + s.total, 0)
  const totalPallets = products.reduce((sum, p) => sum + p.current_stock, 0)
  const totalPieces = products.reduce((sum, p) => sum + (p.current_stock * p.pieces_per_pallet), 0)

  // 빠른 출고 처리
  const handleQuickShipment = () => {
    if (!selectedCustomer || !selectedProduct) {
      alert('거래처와 제품을 선택해주세요.')
      return
    }
    // 실제로는 API 호출
    alert(`출고 등록 완료: ${selectedCustomer}에 ${selectedProduct} 출고`)
    setQuickShipmentOpen(false)
    setSelectedCustomer('')
    setSelectedProduct('')
  }

  // 빠른 재고 보충
  const handleQuickRestock = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      const restockAmount = product.min_stock * 2
      alert(`재고 보충 완료: ${product.name} ${restockAmount}${product.unit} 주문`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            대시보드
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            오늘 {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Quick Shipment Button */}
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            onClick={() => setQuickShipmentOpen(!quickShipmentOpen)}
          >
            <Zap className="h-4 w-4 mr-2" />
            빠른 출고
          </Button>

          {/* Period Selector */}
          <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  selectedPeriod === period
                    ? "bg-white dark:bg-neutral-900 text-primary-600 dark:text-primary-400 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                )}
              >
                {period === 'week' ? '주간' : period === 'month' ? '월간' : '연간'}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <Button variant="outline" onClick={onRefresh} disabled={refreshing}>
            <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
            새로고침
          </Button>
        </div>
      </div>

      {/* Quick Shipment Panel */}
      {quickShipmentOpen && (
        <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700 dark:text-green-400">⚡ 빠른 출고 등록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                  거래처 선택
                </label>
                <select
                  className="w-full p-2 border rounded-lg bg-white dark:bg-neutral-800"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {topCustomers.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                  제품 선택
                </label>
                <select
                  className="w-full p-2 border rounded-lg bg-white dark:bg-neutral-800"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {products.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name} {p.weight}kg({p.grade})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                  수량 (팔레트)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-neutral-800"
                  placeholder="10"
                  min="1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleQuickShipment}
                >
                  즉시 출고
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Summary Cards */}
      <div className="grid grid-cols-5 gap-6">
        <StatCard
          title="오늘 출고"
          value={`${todayShipments}건`}
          change={23}
          changeLabel="전일 대비"
          icon={<TruckIcon className="h-5 w-5" />}
          color="green"
          loading={refreshing}
        />
        <StatCard
          title="오늘 매출"
          value={`${(todayRevenue / 1000000).toFixed(1)}M`}
          change={15}
          changeLabel="전일 대비"
          icon={<TrendingUp className="h-5 w-5" />}
          color="blue"
          loading={refreshing}
        />
        <StatCard
          title="총 재고"
          value={`${totalPallets}P / ${totalPieces.toLocaleString()}개`}
          icon={<Package className="h-5 w-5" />}
          color="purple"
          loading={refreshing}
        />
        <StatCard
          title="재고 부족"
          value={`${lowStockProducts.length}개`}
          change={-33}
          changeLabel="긴급"
          icon={<AlertTriangle className="h-5 w-5" />}
          color="red"
          loading={refreshing}
        />
        <StatCard
          title="주요 고객"
          value={`${topCustomers.length}개사`}
          icon={<Users className="h-5 w-5" />}
          color="blue"
          loading={refreshing}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - 2 cols */}
        <div className="col-span-2 space-y-6">
          {/* Today's Work Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  오늘의 작업 현황
                </CardTitle>
                <span className="text-sm text-neutral-500">
                  실시간 업데이트
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {recentShipments.filter(s => s.status === 'completed').length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">완료</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {recentShipments.filter(s => s.status === 'processing').length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">처리중</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                    {recentShipments.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">대기중</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {recentShipments.reduce((sum, s) => sum + (s.pallets || 0), 0)}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">총 팔레트</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Shipments with Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>최근 출고 내역</CardTitle>
                <Link href="/shipments">
                  <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    전체 보기 →
                  </button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        제품
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        거래처
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        수량
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        금액
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        상태
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentShipments.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.product || item.clientName}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.customer || item.clientName}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {item.pallets || 0} 팔레트
                            </p>
                            <p className="text-xs text-gray-500">
                              ({(item.pieces || 0).toLocaleString()}개)
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ₩{item.total.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                            item.status === 'completed' && "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
                            item.status === 'processing' && "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
                            item.status === 'pending' && "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          )}>
                            {item.status === 'completed' ? '완료' : item.status === 'processing' ? '처리중' : '대기'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            {item.status === 'pending' && (
                              <Button size="sm" variant="outline" className="text-xs">
                                처리
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="text-xs">
                              상세
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <Card>
            <CardHeader>
              <CardTitle>월별 출고 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryChart type="area" data={monthlyData} title="" height={300} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1 col */}
        <div className="space-y-6">
          {/* Top Customers with Quick Ship */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                주요 거래처
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      총 {customer.totalOrders || customer.orderCount || 0}건 • {customer.lastOrder || '데이터 없음'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      setSelectedCustomer(customer.name)
                      setQuickShipmentOpen(true)
                    }}
                  >
                    빠른 출고
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Low Stock Alert with Quick Actions */}
          {lowStockProducts.length > 0 && (
            <Card className="border-2 border-red-200 dark:border-red-900/50">
              <CardHeader className="bg-red-50 dark:bg-red-900/10">
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  재고 부족 경고
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product.name} {product.weight}kg({product.grade})
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            현재: {product.current_stock} / 최소: {product.min_stock} {product.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs flex-1"
                          onClick={() => handleQuickRestock(product.id)}
                        >
                          자동 보충
                        </Button>
                        <Link href={`/inventory`} className="flex-1">
                          <Button size="sm" className="text-xs w-full bg-red-600 hover:bg-red-700">
                            즉시 주문
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>제품별 재고 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryChart type="pie" data={categoryData} height={200} />
            </CardContent>
          </Card>

          {/* Quick Actions Grid */}
          <Card>
            <CardHeader>
              <CardTitle>자주 사용하는 기능</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Package, label: '제품 등록', href: '/products', color: 'bg-blue-500' },
                  { icon: TruckIcon, label: '출고 관리', href: '/shipments', color: 'bg-green-500' },
                  { icon: AlertTriangle, label: '재고 조정', href: '/inventory', color: 'bg-orange-500' },
                  { icon: Users, label: '거래처 관리', href: '/clients', color: 'bg-purple-500' },
                ].map((action, index) => (
                  <Link key={index} href={action.href}>
                    <button className="w-full flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all">
                      <div className={cn("p-2 rounded-lg text-white", action.color)}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
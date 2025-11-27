'use client'

import * as React from 'react'
import { Package, TruckIcon, AlertTriangle, Users, TrendingUp, ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import StatCard from '@/components/ui/stat-card/StatCard'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import InventoryChart from '@/components/charts/InventoryChart'
import Button from '@/components/ui/button/Button'
import { cn } from '@/lib/utils'

interface MobileDashboardProps {
  refreshing: boolean
  onRefresh: () => void
  monthlyData: any[]
  categoryData: any[]
  shipmentData: any[]
  lowStockProducts: any[]
}

export default function MobileDashboard({
  refreshing,
  onRefresh,
  monthlyData,
  categoryData,
  shipmentData,
  lowStockProducts
}: MobileDashboardProps) {
  const [activeChart, setActiveChart] = React.useState<'monthly' | 'category' | 'shipment'>('monthly')

  const stats = [
    { title: '총 재고', value: '520', change: 12, icon: Package, color: 'blue' as const },
    { title: '금일 출고', value: '8건', change: -5, icon: TruckIcon, color: 'green' as const },
    { title: '재고 부족', value: '3개', change: 50, icon: AlertTriangle, color: 'red' as const },
    { title: '거래처', value: '24', change: 8, icon: Users, color: 'purple' as const }
  ]

  return (
    <div className="space-y-4 pb-4">
      {/* Pull to Refresh Hint */}
      <div className="flex items-center justify-center py-2">
        <button
          onClick={onRefresh}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm",
            "bg-gray-100 dark:bg-gray-800 rounded-full",
            "text-gray-600 dark:text-gray-400",
            refreshing && "animate-pulse"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
          {refreshing ? '새로고침 중...' : '당겨서 새로고침'}
        </button>
      </div>

      {/* Stats Grid - 2x2 on mobile */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="transform hover:scale-105 transition-transform">
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={<stat.icon className="w-4 h-4" />}
              color={stat.color}
              loading={refreshing}
            />
          </div>
        ))}
      </div>

      {/* Quick Actions - Horizontal Scroll */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-3 pb-2">
          {[
            { label: '제품 등록', icon: Package, href: '/products/new', color: 'from-blue-500 to-blue-600' },
            { label: '출고 등록', icon: TruckIcon, href: '/shipments/new', color: 'from-green-500 to-green-600' },
            { label: '재고 조정', icon: TrendingUp, href: '/inventory', color: 'from-purple-500 to-purple-600' }
          ].map((action, index) => (
            <Link key={index} href={action.href}>
              <div className={cn(
                "flex flex-col items-center justify-center",
                "w-28 h-24 rounded-2xl",
                "bg-gradient-to-br text-white",
                "shadow-lg hover:shadow-xl transition-all",
                action.color
              )}>
                <action.icon className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chart Tabs */}
      <div>
        <div className="flex gap-2 mb-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { key: 'monthly' as const, label: '월별 추이' },
            { key: 'category' as const, label: '카테고리' },
            { key: 'shipment' as const, label: '주간 출고' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
              className={cn(
                "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                activeChart === tab.key
                  ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Chart */}
        <div className="h-64">
          {activeChart === 'monthly' && (
            <InventoryChart type="area" data={monthlyData} height={240} />
          )}
          {activeChart === 'category' && (
            <InventoryChart type="pie" data={categoryData} height={240} />
          )}
          {activeChart === 'shipment' && (
            <InventoryChart type="bar" data={shipmentData} height={240} />
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">최근 활동</CardTitle>
            <Link href="/activities">
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: '노트북 스탠드 출고', desc: 'ABC 회사 - 10개', time: '2시간 전', type: 'shipment' },
            { title: '무선 마우스 입고', desc: '50개 추가', time: '5시간 전', type: 'restock' },
            { title: 'USB-C 케이블 재고 부족', desc: '최소 재고 이하', time: '1일 전', type: 'alert' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className={cn(
                "w-2 h-2 rounded-full mt-2",
                activity.type === 'alert' ? 'bg-red-500' : 
                activity.type === 'shipment' ? 'bg-blue-500' : 'bg-green-500'
              )} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {activity.title}
                </p>
                <p className={cn(
                  "text-xs mt-0.5",
                  activity.type === 'alert' 
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
                )}>
                  {activity.desc}
                </p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              재고 부족 알림
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      현재: {product.current_stock}{product.unit} / 최소: {product.min_stock}{product.unit}
                    </p>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="outline" className="text-xs">
                      재고 확인
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
import * as React from 'react'
import { cn, formatNumber } from '@/lib/utils'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import { Package, TruckIcon, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface StatCard {
  title: string
  value: number | string
  unit?: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
}

export interface DashboardStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats?: StatCard[]
  loading?: boolean
}

const defaultStats: StatCard[] = [
  {
    title: '총 재고',
    value: 0,
    unit: '개',
    change: 0,
    changeLabel: '전월 대비',
    icon: <Package className="h-4 w-4" />,
    color: 'blue'
  },
  {
    title: '출고 예정',
    value: 0,
    unit: '건',
    change: 0,
    changeLabel: '오늘',
    icon: <TruckIcon className="h-4 w-4" />,
    color: 'green'
  },
  {
    title: '재고 부족',
    value: 0,
    unit: '개',
    change: 0,
    changeLabel: '긴급',
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'red'
  },
  {
    title: '재고 회전율',
    value: '0%',
    unit: '',
    change: 0,
    changeLabel: '이번 달',
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'gray'
  }
]

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  gray: 'bg-gray-500'
}

const DashboardStats = React.forwardRef<HTMLDivElement, DashboardStatsProps>(
  ({ className, stats = defaultStats, loading = false, ...props }, ref) => {
    const getTrendIcon = (change: number) => {
      if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
      if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
      return <Minus className="h-4 w-4 text-gray-400" />
    }

    const getTrendColor = (change: number) => {
      if (change > 0) return 'text-green-600'
      if (change < 0) return 'text-red-600'
      return 'text-gray-500'
    }

    if (loading) {
      return (
        <div ref={ref} className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-4', className)} {...props}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-4', className)} {...props}>
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              {stat.icon && (
                <div className={cn(
                  'h-8 w-8 rounded-lg flex items-center justify-center text-white',
                  colorClasses[stat.color || 'gray']
                )}>
                  {stat.icon}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                {stat.unit && <span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>}
              </div>
              {stat.change !== undefined && (
                <div className="flex items-center space-x-2 text-xs mt-2">
                  {getTrendIcon(stat.change)}
                  <span className={getTrendColor(stat.change)}>
                    {stat.change > 0 && '+'}
                    {stat.change}%
                  </span>
                  {stat.changeLabel && (
                    <span className="text-gray-500">{stat.changeLabel}</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
)

DashboardStats.displayName = 'DashboardStats'

export default DashboardStats
import * as React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'neutral'
  loading?: boolean
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = 'blue',
  loading = false
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  const colorMap = {
    blue: {
      bg: 'bg-primary-500/10 dark:bg-primary-400/20',
      text: 'text-primary-600 dark:text-primary-400',
      icon: 'text-primary-600 dark:text-primary-400'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      icon: 'text-green-600 dark:text-green-400'
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      icon: 'text-red-600 dark:text-red-400'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-400',
      icon: 'text-purple-600 dark:text-purple-400'
    },
    yellow: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      icon: 'text-yellow-600 dark:text-yellow-400'
    },
    neutral: {
      bg: 'bg-neutral-100 dark:bg-neutral-800',
      text: 'text-neutral-700 dark:text-neutral-300',
      icon: 'text-neutral-600 dark:text-neutral-400'
    }
  }

  const colors = colorMap[color]

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-4"></div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl",
      "bg-white dark:bg-neutral-900",
      "border border-neutral-200 dark:border-neutral-800",
      "p-6 transition-all duration-200",
      "hover:shadow-md"
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositive && "text-green-600 dark:text-green-400",
                isNegative && "text-red-600 dark:text-red-400",
                !isPositive && !isNegative && "text-neutral-500 dark:text-neutral-400"
              )}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : isNegative ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                <span>{Math.abs(change)}%</span>
              </div>
              {changeLabel && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl",
            colors.bg
          )}>
            <div className={colors.icon}>
              {icon}
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative background element */}
      <div className={cn(
        "absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10",
        color === 'blue' && "bg-primary-500",
        color === 'green' && "bg-green-500",
        color === 'red' && "bg-red-500",
        color === 'purple' && "bg-purple-500",
        color === 'yellow' && "bg-yellow-500",
        color === 'neutral' && "bg-neutral-500"
      )} />
    </div>
  )
}
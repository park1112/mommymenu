import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'feminine' | 'blossom' | 'sage' | 'dreamy' | 'nutrition'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  organic?: boolean
  animated?: boolean
  showValue?: boolean
  glow?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    value = 0, 
    max = 100, 
    variant = 'default',
    size = 'md',
    organic = true,
    animated = true,
    showValue = false,
    glow = false,
    className, 
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const variants = {
      default: {
        background: 'bg-gray-100 border border-gray-200/60',
        fill: 'from-pink-400 via-rose-400 to-pink-500',
        glow: glow ? 'shadow-pink-200/50' : ''
      },
      feminine: {
        background: 'feminine-gradient border border-pink-200/40',
        fill: 'from-rose-500 via-pink-500 to-orange-400',
        glow: glow ? 'shadow-rose-200/60' : ''
      },
      blossom: {
        background: 'bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/40',
        fill: 'from-rose-400 via-pink-400 to-orange-400',
        glow: glow ? 'shadow-rose-300/50' : ''
      },
      sage: {
        background: 'sage-gradient border border-emerald-200/40',
        fill: 'from-emerald-400 via-green-400 to-teal-400',
        glow: glow ? 'shadow-emerald-200/50' : ''
      },
      dreamy: {
        background: 'lavender-gradient border border-purple-200/40',
        fill: 'from-purple-400 via-pink-400 to-rose-400',
        glow: glow ? 'shadow-purple-200/50' : ''
      },
      nutrition: {
        background: 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/40',
        fill: 'from-emerald-500 via-green-500 to-teal-500',
        glow: glow ? 'shadow-emerald-300/50' : ''
      }
    }
    
    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-3.5',
      xl: 'h-5'
    }
    
    const currentVariant = variants[variant]
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden',
          organic ? 'organic-rounded' : 'rounded-full',
          currentVariant.background,
          sizes[size],
          glow && `shadow-lg ${currentVariant.glow}`,
          className
        )}
        {...props}
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Progress fill */}
        <div
          className={cn(
            'h-full transition-all duration-700 ease-out relative overflow-hidden',
            organic ? 'organic-rounded' : 'rounded-full',
            `bg-gradient-to-r ${currentVariant.fill}`,
            animated && 'transition-transform duration-1000 ease-out'
          )}
          style={{
            width: `${percentage}%`,
            minWidth: percentage > 0 ? '4px' : '0px'
          }}
        >
          {/* Shimmer effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
          )}
          
          {/* Pulse effect for completed state */}
          {percentage >= 100 && (
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          )}
        </div>
        
        {/* Value display */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-700 drop-shadow-sm">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        {/* Completion celebration */}
        {percentage >= 100 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-pulse" />
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
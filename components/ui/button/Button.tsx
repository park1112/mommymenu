import * as React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'feminine' | 'blossom' | 'sage' | 'dreamy'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  organic?: boolean
  glow?: boolean
  float?: boolean
  pulse?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    organic = true,
    glow = false,
    float = false,
    pulse = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    
    const baseStyles = `
      inline-flex items-center justify-center relative overflow-hidden
      font-medium transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
      active:scale-95 hover:scale-105
      whitespace-nowrap
      ${organic ? 'organic-rounded' : 'rounded-xl'}
      ${float ? 'gentle-float' : ''}
      ${pulse ? 'heartbeat' : ''}
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20
      before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
    `
    
    const variants = {
      primary: `
        bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600
        text-white font-semibold
        organic-shadow-md hover:organic-shadow-lg
        focus:ring-pink-500/50
        ${glow ? 'ring-2 ring-pink-200/60 ring-offset-2' : ''}
      `,
      feminine: `
        feminine-gradient
        text-pink-800 font-semibold
        border border-pink-200/50
        organic-shadow hover:organic-shadow-md
        focus:ring-pink-400/50
        ${glow ? 'ring-2 ring-pink-300/40 ring-offset-2' : ''}
      `,
      blossom: `
        bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400
        hover:from-rose-500 hover:via-pink-500 hover:to-orange-500
        text-white font-semibold
        organic-shadow-md hover:organic-shadow-lg
        focus:ring-rose-400/50
        ${glow ? 'ring-2 ring-rose-300/60 ring-offset-2' : ''}
      `,
      sage: `
        sage-gradient
        text-emerald-800 font-semibold
        border border-emerald-200/50
        organic-shadow hover:organic-shadow-md
        focus:ring-emerald-400/50
        ${glow ? 'ring-2 ring-emerald-300/40 ring-offset-2' : ''}
      `,
      dreamy: `
        lavender-gradient
        text-purple-800 font-semibold
        border border-purple-200/50
        organic-shadow hover:organic-shadow-md
        focus:ring-purple-400/50
        ${glow ? 'ring-2 ring-purple-300/40 ring-offset-2' : ''}
      `,
      secondary: `
        bg-white/90 hover:bg-white
        border border-gray-200 hover:border-gray-300
        text-gray-700 hover:text-gray-900 font-medium
        organic-shadow hover:organic-shadow-md
        focus:ring-gray-400/50
        ${glow ? 'ring-2 ring-gray-200/60 ring-offset-2' : ''}
      `,
      outline: `
        border-2 border-pink-300 hover:border-pink-400
        text-pink-700 hover:text-pink-800 font-medium
        bg-white/80 hover:bg-pink-50/80 backdrop-blur-sm
        organic-shadow hover:organic-shadow-md
        focus:ring-pink-400/50
        ${glow ? 'ring-2 ring-pink-200/60 ring-offset-2' : ''}
      `,
      ghost: `
        text-gray-600 hover:text-gray-800 font-medium
        hover:bg-white/60 backdrop-blur-sm
        focus:ring-gray-400/50
        ${glow ? 'ring-2 ring-gray-200/40 ring-offset-2' : ''}
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
        text-white font-semibold
        organic-shadow-md hover:organic-shadow-lg
        focus:ring-red-400/50
        ${glow ? 'ring-2 ring-red-300/60 ring-offset-2' : ''}
      `,
      success: `
        bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600
        text-white font-semibold
        organic-shadow-md hover:organic-shadow-lg
        focus:ring-emerald-400/50
        ${glow ? 'ring-2 ring-emerald-300/60 ring-offset-2' : ''}
      `,
    }
    
    const sizes = {
      xs: 'h-7 px-3 text-xs gap-1.5 min-w-[60px]',
      sm: 'h-9 px-4 text-sm gap-2 min-w-[80px]',
      md: 'h-10 px-5 text-sm gap-2 min-w-[100px]',
      lg: 'h-12 px-6 text-base gap-2.5 min-w-[120px]',
      xl: 'h-14 px-8 text-lg gap-3 min-w-[140px]',
    }
    
    const isDisabled = disabled || loading
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* Ripple effect on click */}
        <span className="absolute inset-0 overflow-hidden organic-rounded">
          <span className="absolute w-0 h-0 bg-white/30 rounded-full transform transition-all duration-300 active:w-full active:h-full active:opacity-20" />
        </span>
        
        {loading && iconPosition === 'left' && (
          <Loader2 className="animate-spin shrink-0" />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="shrink-0">{icon}</span>
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0">{icon}</span>
        )}
        {loading && iconPosition === 'right' && (
          <Loader2 className="animate-spin shrink-0" />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
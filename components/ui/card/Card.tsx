import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feminine' | 'organic' | 'dreamy' | 'blossom' | 'sage' | 'lavender' | 'peachy' | 'nutrition' | 'pregnant-safe'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  organic?: boolean
  float?: boolean
  glow?: boolean
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default',
    padding = 'md',
    organic = true,
    float = false,
    glow = false,
    hover = true,
    children,
    ...props 
  }, ref) => {
    
    const baseStyles = `
      transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
      ${organic ? 'organic-rounded' : 'rounded-2xl'}
      ${float ? 'gentle-float' : ''}
      ${hover ? 'interactive-lift' : ''}
      backdrop-blur-sm
    `
    
    const variants = {
      default: `
        bg-white/95 dark:bg-neutral-800/95
        border border-white/40 dark:border-neutral-700/40
        organic-shadow
        ${glow ? 'ring-1 ring-pink-100/50' : ''}
      `,
      feminine: `
        feminine-gradient
        border border-pink-100/60 dark:border-pink-700/30
        organic-shadow-md
        ${glow ? 'ring-2 ring-pink-200/40 ring-offset-2 ring-offset-pink-50' : ''}
      `,
      organic: `
        glass-morph
        organic-shadow-lg
        ${glow ? 'ring-1 ring-white/30' : ''}
      `,
      dreamy: `
        lavender-gradient
        border border-purple-100/50 dark:border-purple-700/30
        organic-shadow
        ${glow ? 'ring-2 ring-purple-200/40' : ''}
      `,
      blossom: `
        bg-gradient-to-br from-rose-50/80 via-pink-50/90 to-orange-50/70
        border border-rose-200/40 dark:border-rose-700/30
        organic-shadow-md
        ${glow ? 'ring-2 ring-rose-200/50' : ''}
      `,
      sage: `
        sage-gradient
        border border-green-100/50 dark:border-green-700/30
        organic-shadow
        ${glow ? 'ring-2 ring-green-200/40' : ''}
      `,
      lavender: `
        bg-gradient-to-br from-purple-100/60 via-purple-50/80 to-pink-50/70
        border border-purple-200/40 dark:border-purple-700/30
        organic-shadow-md
        ${glow ? 'ring-2 ring-purple-200/50' : ''}
      `,
      peachy: `
        peachy-gradient
        border border-orange-100/50 dark:border-orange-700/30
        organic-shadow
        ${glow ? 'ring-2 ring-orange-200/40' : ''}
      `,
      nutrition: `
        bg-gradient-to-br from-emerald-50/80 via-green-50/90 to-teal-50/70
        border border-emerald-200/40 dark:border-emerald-700/30
        organic-shadow-md
        ${glow ? 'ring-2 ring-emerald-200/50' : ''}
      `,
      'pregnant-safe': `
        bg-gradient-to-br from-pink-50/80 via-rose-50/90 to-pink-100/70
        dark:from-pink-900/20 dark:via-rose-900/20 dark:to-pink-800/20
        border border-pink-200/40 dark:border-pink-700/30
        organic-shadow-md
        ${glow ? 'ring-2 ring-pink-200/50' : ''}
      `
    }
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
      xl: 'p-9'
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-2 pb-5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100',
      'slide-up',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed', 
      className
    )}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('pt-0 space-y-4', className)} 
    {...props} 
  />
))
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 gap-3', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export default Card
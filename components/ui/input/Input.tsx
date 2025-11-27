import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'underline'
  inputSize?: 'sm' | 'md' | 'lg'
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    variant = 'default',
    inputSize = 'md',
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth, 
    ...props 
  }, ref) => {
    const inputId = React.useId()
    const [isFocused, setIsFocused] = React.useState(false)
    
    const baseStyles = `
      w-full font-normal transition-all duration-200
      placeholder:text-neutral-400 dark:placeholder:text-neutral-500
      text-neutral-900 dark:text-neutral-100
      disabled:cursor-not-allowed disabled:opacity-50
    `
    
    const variants = {
      default: `
        border bg-white dark:bg-neutral-800
        border-neutral-200 dark:border-neutral-700
        hover:border-neutral-300 dark:hover:border-neutral-600
        focus:border-primary-500 dark:focus:border-primary-400
        focus:ring-2 focus:ring-primary-500/20
        rounded-xl
      `,
      filled: `
        border-0 bg-neutral-100 dark:bg-neutral-800
        hover:bg-neutral-200 dark:hover:bg-neutral-700
        focus:bg-white dark:focus:bg-neutral-900
        focus:ring-2 focus:ring-primary-500/20
        rounded-xl
      `,
      underline: `
        border-0 border-b-2 bg-transparent
        border-neutral-200 dark:border-neutral-700
        hover:border-neutral-300 dark:hover:border-neutral-600
        focus:border-primary-500 dark:focus:border-primary-400
        px-0 rounded-none
      `
    }
    
    const sizes = {
      sm: 'h-9 px-3 py-2 text-sm',
      md: 'h-10 px-4 py-2.5 text-sm',
      lg: 'h-11 px-4 py-3 text-base'
    }
    
    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-5 h-5'
    }
    
    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block font-medium transition-colors duration-200",
              isFocused ? "text-primary-500 dark:text-primary-400" : "text-neutral-700 dark:text-neutral-300",
              inputSize === 'sm' && 'text-xs',
              inputSize === 'md' && 'text-sm',
              inputSize === 'lg' && 'text-sm'
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className={cn(
              "absolute inset-y-0 left-0 flex items-center pointer-events-none transition-colors duration-200",
              variant === 'underline' ? 'pl-0' : (
                inputSize === 'sm' ? 'pl-3' : inputSize === 'md' ? 'pl-4' : 'pl-5'
              ),
              isFocused ? "text-primary-500" : "text-neutral-400 dark:text-neutral-500"
            )}>
              <div className={iconSizes[inputSize]}>{leftIcon}</div>
            </div>
          )}
          <input
            type={type}
            id={inputId}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              baseStyles,
              variants[variant],
              variant !== 'underline' && sizes[inputSize],
              variant === 'underline' && `h-${inputSize === 'sm' ? '9' : inputSize === 'md' ? '11' : '12'} text-${inputSize === 'sm' ? 'sm' : 'base'}`,
              error && 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20',
              leftIcon && (variant === 'underline' ? 'pl-7' : inputSize === 'sm' ? 'pl-9' : inputSize === 'md' ? 'pl-11' : 'pl-12'),
              rightIcon && (variant === 'underline' ? 'pr-7' : inputSize === 'sm' ? 'pr-9' : inputSize === 'md' ? 'pr-11' : 'pr-12'),
              'focus:outline-none',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className={cn(
              "absolute inset-y-0 right-0 flex items-center pointer-events-none transition-colors duration-200",
              variant === 'underline' ? 'pr-0' : (
                inputSize === 'sm' ? 'pr-3' : inputSize === 'md' ? 'pr-4' : 'pr-5'
              ),
              isFocused ? "text-primary-500" : "text-neutral-400 dark:text-neutral-500"
            )}>
              <div className={iconSizes[inputSize]}>{rightIcon}</div>
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className={cn(
            "text-red-600 dark:text-red-400",
            inputSize === 'sm' && 'text-xs',
            inputSize === 'md' && 'text-sm',
            inputSize === 'lg' && 'text-sm'
          )}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className={cn(
            "text-neutral-500 dark:text-neutral-400",
            inputSize === 'sm' && 'text-xs',
            inputSize === 'md' && 'text-sm',
            inputSize === 'lg' && 'text-sm'
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
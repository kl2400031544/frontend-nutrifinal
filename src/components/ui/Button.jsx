import React from 'react'
import clsx from 'clsx'

const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      onClick,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const variantClasses = {
      primary: 'bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-50',
      secondary:
        'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-50',
      danger: 'bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-50',
      ghost: 'text-slate-700 hover:bg-slate-100 disabled:opacity-50',
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={onClick}
        className={clsx(
          'font-medium rounded-xl transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none flex items-center gap-2 justify-center',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...rest}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

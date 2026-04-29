import React from 'react'
import clsx from 'clsx'
import { Eye, EyeOff } from 'lucide-react'

const Input = React.forwardRef(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      type = 'text',
      showPasswordToggle = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputType =
      type === 'password' && showPasswordToggle
        ? showPassword
          ? 'text'
          : 'password'
        : type

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={clsx(
              'w-full px-4 py-2.5 rounded-xl border transition text-sm',
              'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent',
              leftIcon && 'pl-10',
              rightIcon || (type === 'password' && showPasswordToggle) ? 'pr-10' : '',
              error
                ? 'border-rose-400 bg-rose-50 text-rose-900'
                : 'border-slate-200 bg-white'
            )}
            {...rest}
          />
          {(rightIcon || (type === 'password' && showPasswordToggle)) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {type === 'password' && showPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        {error && (
          <p className="text-rose-500 text-xs mt-1.5 role-alert" role="alert">
            {error}
          </p>
        )}
        {hint && <p className="text-slate-400 text-xs mt-1.5">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

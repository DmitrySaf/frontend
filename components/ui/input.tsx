import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number
  showCounter?: boolean
  prefix?: string
  error?: string
  description?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, maxLength, showCounter, prefix, error, description, disabled, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || props.defaultValue || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className="space-y-2">
        {prefix ? (
          <div className={cn(
            "flex items-center border border-gray-300 rounded-lg transition-colors",
            "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent",
            error && "border-red-300 focus-within:ring-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}>
            <span className="px-4 py-3 text-gray-500 bg-gray-50 rounded-l-lg border-r border-gray-300">
              {prefix}
            </span>
            <input
              type={type}
              className={cn(
                "flex-1 py-3 px-4 text-base focus:outline-none rounded-r-lg",
                "disabled:cursor-not-allowed",
                className
              )}
              ref={ref}
              disabled={disabled}
              maxLength={maxLength}
              value={value}
              onChange={handleChange}
              {...props}
            />
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "w-full py-3 px-4 text-base border border-gray-300 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-300 focus:ring-red-500",
              className
            )}
            ref={ref}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />
        )}
        
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          
          {showCounter && maxLength && (
            <div className="text-sm text-gray-500">
              {String(value).length} / {maxLength}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input } 
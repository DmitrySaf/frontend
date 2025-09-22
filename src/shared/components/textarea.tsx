import * as React from "react"
import { cn } from "@/shared/utils"

export interface TextareaProps {
  // Custom Props
  label?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  showCounter?: boolean;
  
  // Styling
  className?: string;
  
  // Standard HTML Textarea Props
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  
  // Events (from react-hook-form register)
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  
  // Form (from react-hook-form register)
  id?: string;
  name?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, maxLength, showCounter, error, description, disabled, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || props.defaultValue || "")

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "w-full py-3 px-4 text-base border border-gray-300 rounded-xl",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "transition-colors resize-none",
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

Textarea.displayName = "Textarea"

export { Textarea } 
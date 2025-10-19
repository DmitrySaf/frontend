import * as React from "react"
import { cn } from "@/shared/utils"
import IMask from 'imask'

export interface InputProps {
  // Custom Props
  label?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  showCounter?: boolean;
  prefix?: string;
  /** 
   * Маска для input. Примеры:
   * - Телефон: '+7 (000) 000-00-00'
   * - Дата: '00.00.0000' 
   * - Email: /^[^@]*@?[^@]*$/
   * - Число: Number
   */
  mask?: any;
  /** 
   * Дополнительные опции для маски
   * Примеры: { lazy: false, placeholderChar: '_' }
   */
  maskOptions?: any;
  /** Вызывается при изменении значения маски */
  onAccept?: (value: string, maskRef: any) => void;
  /** Вызывается при полном заполнении маски */
  onComplete?: (value: string, maskRef: any) => void;
  
  // Styling
  className?: string;
  
  // Standard HTML Input Props
  type?: "text" | "email";
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  
  // Events (from react-hook-form register)
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  // Form (from react-hook-form register)
  id?: string;
  name?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    label,
    maxLength, 
    showCounter, 
    prefix, 
    error, 
    description, 
    disabled, 
    mask,
    maskOptions,
    onAccept,
    onComplete,
    onChange,
    ...props 
  }, ref) => {
    const [value, setValue] = React.useState(props.value || props.defaultValue || "")
    const inputRef = React.useRef<HTMLInputElement>(null)
    const maskRef = React.useRef<any>(null)

    // Объединяем внешний ref с внутренним
    React.useImperativeHandle(ref, () => inputRef.current!, [])

    // Инициализация и обновление маски
    React.useEffect(() => {
      if (mask && inputRef.current) {
        const maskConfig: any = {
          mask,
          ...maskOptions,
        }

        maskRef.current = IMask(inputRef.current, maskConfig)

        // Обработчики событий маски
        if (onAccept) {
          maskRef.current.on('accept', () => {
            onAccept(maskRef.current.value, maskRef.current)
          })
        }

        if (onComplete) {
          maskRef.current.on('complete', () => {
            onComplete(maskRef.current.value, maskRef.current)
          })
        }

        // Устанавливаем начальное значение
        if (value) {
          maskRef.current.value = String(value)
        }

        return () => {
          if (maskRef.current) {
            maskRef.current.destroy()
            maskRef.current = null
          }
        }
      }
    }, [mask, maskOptions, onAccept, onComplete])

    // Обновляем значение маски при изменении value извне
    React.useEffect(() => {
      if (maskRef.current && value !== maskRef.current.value) {
        maskRef.current.value = String(value)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      
      // Если есть маска, используем её значение
      if (maskRef.current) {
        const maskedValue = maskRef.current.value
        setValue(maskedValue)
        
        // Создаем событие с замаскированным значением
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: maskedValue,
          }
        }
        onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      } else {
        onChange?.(e)
      }
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block font-medium text-gray-700">
            {label}
          </label>
        )}
        {prefix ? (
          <div className={cn(
            "flex items-center border border-gray-300 rounded-xl transition-colors",
            "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent",
            error && "border-red-300 focus-within:ring-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}>
            <span className="px-4 py-3 text-gray-500 bg-gray-50 rounded-l-xl border-r border-gray-300">
              {prefix}
            </span>
            <input
              type={type}
              className={cn(
                "flex-1 py-3 px-4 text-base focus:outline-none rounded-r-xl",
                "disabled:cursor-not-allowed",
                className
              )}
              ref={inputRef}
              disabled={disabled}
              maxLength={mask ? undefined : maxLength}
              value={value}
              onChange={handleChange}
              {...props}
            />
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "w-full py-3 px-4 text-base border border-gray-300 rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-300 focus:ring-red-500",
              className
            )}
            ref={inputRef}
            disabled={disabled}
            maxLength={mask ? undefined : maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />
        )}
        
        <div className="flex justify-between items-center">
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {description && !error && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          
          {showCounter && maxLength && !mask && (
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
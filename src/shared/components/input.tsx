"use client";

import { useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils";
import { IMaskInput } from "react-imask";
import { useFormContext } from "react-hook-form";

const inputVariants = cva(
  "w-full border border-gray rounded-xl transition-colors space-x-1 flex focus-within:outline-0 focus-within:border-black disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        l: "py-3.5 px-4 rounded-md",
        m: "py-3 px-3 rounded-md",
        s: "py-1.5 px-3 rounded-sm",
      },
      hasError: {
        true: "border-danger focus:border-danger",
        false: "",
      },
    },
    defaultVariants: {
      size: "m",
      hasError: false,
    },
  }
);

export interface InputProps {
  name: string;
  size: "l" | "m" | "s";
  // Custom Props
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  prefix?: string;
  autocomplete?: string;
  isDisabled?: boolean;

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
  // onAccept?: (value: string, maskRef: any) => void;
  /** Вызывается при полном заполнении маски */
  // onComplete?: (value: string, maskRef: any) => void;
}

const Input = ({
  name,
  size,
  label,
  maxLength,
  prefix,
  autocomplete = "off",
  error,
  description,
  isDisabled,
  mask,
  maskOptions,
  placeholder,
}: InputProps) => {
  const { register, setValue, watch } = useFormContext();

  // Текущее значение из формы
  const currentValue = watch(name) || "";

  // Получаем onBlur из register для корректной работы touched
  const { onBlur } = useMemo(() => register(name), [register, name]);

  const inputElement = mask ? (
    <IMaskInput
      name={name}
      value={currentValue}
      mask={mask}
      {...maskOptions}
      onAccept={(val: string) => {
        setValue(name, val, { shouldDirty: true });
      }}
      onComplete={(val: string) => {
        setValue(name, val, { shouldValidate: true, shouldTouch: true });
      }}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={isDisabled}
      autoComplete={autocomplete}
      className="flex-1 leading-4.5 placeholder:text-gray-500 focus:outline-0 focus:border-black disabled:opacity-50 disabled:cursor-not-allowed"
    />
  ) : (
    <input
      {...register(name)}
      type="text"
      disabled={isDisabled}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autocomplete}
      className="flex-1 leading-4.5 placeholder:text-gray-500 focus:outline-0 focus:border-black disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );

  return (
    <div className="space-y-1">
      <label className="space-y-1 block">
        {label && <div>{label}</div>}

        <div
          className={cn(
            inputVariants({
              size,
              hasError: !!error,
            })
          )}
        >
          {prefix && <span className="leading-4.5 text-gray pointer-events-none">{prefix}</span>}
          {inputElement}
        </div>
      </label>

      {(error || description || (!mask && maxLength)) && (
        <div className="flex justify-between gap-2">
          {error ? (
            <p className="text-[14px] leading-4.5 text-danger">{error}</p>
          ) : (
            description && <p className="text-[14px] leading-4.5 text-gray-500">{description}</p>
          )}

          {!mask && maxLength && (
            <div className="text-[14px] leading-4.5 text-gray-500 ml-auto whitespace-nowrap">
              {currentValue.length} / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input, inputVariants };

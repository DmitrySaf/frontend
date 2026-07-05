"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    inputWrapper:
      "w-full inset-ring inset-ring-gray-200 transition-all flex focus-within:outline-0 focus-within:inset-ring-primary-500 focus-within:inset-ring-2 disabled:opacity-50",
    inputContainer: "flex-1 flex",
    helperText: "text-sm",
  },
  variants: {
    size: {
      l: {
        inputWrapper: "h-12 rounded-xl text-base",
        inputContainer: "py-3.5 px-4",
      },
      m: {
        inputWrapper: "h-10 rounded-lg text-sm",
        inputContainer: "py-3 px-3",
      },
    },
    hasError: {
      true: {
        inputWrapper: "inset-ring-danger focus-within:inset-ring-danger",
        helperText: "text-danger",
      },
      false: {
        helperText: "text-gray-500",
      },
    },
    hasPrefixElement: {
      true: {
        inputContainer: "pl-1",
      },
    },
  },
});

export interface InputProps {
  name: string;
  size: "l" | "m";
  // Custom Props
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  prefix?: string;
  prefixElement?: React.ReactNode;
  autocomplete?: string;
  isDisabled?: boolean;
  onBlur?: () => void;

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
  prefixElement,
  autocomplete = "off",
  error,
  description,
  isDisabled,
  mask,
  maskOptions,
  placeholder,
  onBlur: customOnBlur,
}: InputProps) => {
  const { register, setValue, watch } = useFormContext();

  // Текущее значение из формы
  const currentValue = watch(name) || "";

  // Получаем onBlur из register для корректной работы touched
  const { onBlur: formOnBlur } = useMemo(() => register(name), [register, name]);

  // Комбинируем оба onBlur
  const handleBlur = (e: any) => {
    formOnBlur(e);
    customOnBlur?.();
  };

  const styles = inputVariants({
    size,
    hasError: !!error,
    hasPrefixElement: !!prefixElement,
  });

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
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={isDisabled}
      autoComplete={autocomplete}
      className="placeholder:text-gray-500 focus:outline-0 w-full"
    />
  ) : (
    <input
      {...register(name)}
      type="text"
      disabled={isDisabled}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autocomplete}
      onBlur={handleBlur}
      className="placeholder:text-gray-500 focus:outline-0 w-full"
    />
  );

  return (
    <div className="space-y-1">
      <label className="space-y-1 block">
        {label && <div>{label}</div>}

        <div className={styles.inputWrapper()}>
          {prefixElement && <div className="flex items-center pl-1">{prefixElement}</div>}
          <div className={styles.inputContainer()}>
            {prefix && <span className="pointer-events-none">{prefix}</span>}
            {inputElement}
          </div>
        </div>
      </label>

      {(error || description || (!mask && maxLength)) && (
        <div className="flex justify-between gap-2">
          {error ? (
            <p className={styles.helperText()}>{error}</p>
          ) : (
            description && <p className={styles.helperText()}>{description}</p>
          )}

          {!mask && maxLength && (
            <div className="text-sm text-gray-500 ml-auto whitespace-nowrap">
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

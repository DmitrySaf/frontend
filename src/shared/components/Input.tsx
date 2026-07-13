"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    inputWrapper:
      "w-full flex items-center cursor-text inset-ring inset-ring-gray-200 transition-[box-shadow,opacity] duration-150 focus-within:outline-0 focus-within:inset-ring-2 focus-within:inset-ring-primary-500",
    prefixElement: "shrink-0 flex items-center justify-center text-gray-500",
    divider: "shrink-0 w-px h-5 bg-gray-200",
    inputContainer: "flex-1 flex items-center min-w-0",
    prefix: "shrink-0 select-none whitespace-nowrap text-gray-500 pointer-events-none",
    input: "w-full min-w-0 bg-transparent placeholder:text-gray-500 focus:outline-0",
    helperText: "text-sm",
  },
  variants: {
    size: {
      l: {
        inputWrapper: "h-12 px-4 gap-3 rounded-xl text-base",
        prefixElement: "size-6",
      },
      m: {
        inputWrapper: "h-10 px-3 gap-2.5 rounded-lg text-sm",
        prefixElement: "size-5",
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
      // Иконка несёт собственный оптический отступ — компенсируем слева.
      true: {
        inputWrapper: "pl-3",
      },
    },
    isDisabled: {
      true: {
        inputWrapper: "opacity-50 cursor-not-allowed",
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
  maskOptions?: Record<string, unknown>;
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
    isDisabled: !!isDisabled,
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
      className={styles.input()}
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
      className={styles.input()}
    />
  );

  return (
    <div className="space-y-1">
      <label className="space-y-1 block">
        {label && <div className="text-sm font-medium">{label}</div>}

        <div className={styles.inputWrapper()}>
          {prefixElement && (
            <>
              <div className={styles.prefixElement()}>{prefixElement}</div>
              <div className={styles.divider()} />
            </>
          )}

          <div className={styles.inputContainer()}>
            {/* Префикс и значение читаются как одна строка — различаются только цветом */}
            {prefix && <span className={styles.prefix()}>{prefix}</span>}
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

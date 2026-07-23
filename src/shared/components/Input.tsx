"use client";

import { XMarkBold12 } from "@frosted-ui/icons";
import { cva } from "class-variance-authority";
import { isValidElement, useId, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { cn } from "@/shared/utils";

/* Движок не нужен: RHF register + нативный <input>. Хром держит ОБЁРТКА (inputWrapper),
   сам <input> прозрачный (border-0/bg-transparent/p-0/shadow-none). tailwind-variants со
   слотами разложен на набор cva-функций «по одной на слот» (§9 плана); каждый вызов
   оборачиваем в cn(), чтобы вернуть twMerge-разрешение конфликтов, которое давал tv
   (иначе inset-ring-gray-200 базы и inset-ring-danger ошибки не переспорить порядком). */

const inputWrapper = cva(
  "w-full flex items-center cursor-text inset-ring inset-ring-gray-200 transition-[box-shadow,opacity] duration-150 focus-within:outline-0 focus-within:inset-ring-2 focus-within:inset-ring-primary-500",
  {
    variants: {
      /* Лестница контролов (DESIGN.md §4.3): высоты/радиусы — как у Button. Кегль 16px на
         ВСЕХ ступенях: ниже Safari на iOS зумит страницу при фокусе. */
      size: {
        md: "h-9 px-3 gap-2 rounded-(--radius-control-md) text-base",
        lg: "h-10 px-3.5 gap-2.5 rounded-(--radius-control-lg) text-base",
        xl: "h-12 px-4 gap-3 rounded-(--radius-control-xl) text-base",
      },
      hasError: {
        true: "inset-ring-danger focus-within:inset-ring-danger",
        false: "",
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      // Кнопка справа крупнее текстового паддинга — поле поджимается, чтобы она встала у кромки
      trailing: {
        action: "",
        clear: "",
        none: "",
      },
    },
    compoundVariants: [
      { trailing: "action", size: "md", class: "pr-1" },
      { trailing: "action", size: "lg", class: "pr-1.5" },
      { trailing: "action", size: "xl", class: "pr-1.5" },
      { trailing: "clear", size: "md", class: "pr-2" },
      { trailing: "clear", size: "lg", class: "pr-2" },
      { trailing: "clear", size: "xl", class: "pr-2.5" },
    ],
  }
);

// Иконки по краям — без разделителя: иконка, зазор, текст (как поле поиска Apple).
// Размер жёстко навязывается слотом (*:size-…), чтобы call-site не приносил свой.
const iconSlot = cva("shrink-0 flex items-center justify-center text-gray-500 pointer-events-none", {
  variants: {
    size: {
      md: "size-4 *:size-4 *:object-contain",
      lg: "size-[18px] *:size-[18px] *:object-contain",
      xl: "size-5 *:size-5 *:object-contain",
    },
  },
});

/* Встроенные кнопки поля (очистка, действие) — ghost-прямоугольники. Радиус не выбирается,
   а выводится законом концентричности (§4.3): радиус поля − зазор до кромки. */
const clearButton = cva(
  "shrink-0 flex items-center justify-center text-gray-500 cursor-pointer transition-[background-color,color] duration-150 hover:bg-fill hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45",
  {
    variants: {
      size: {
        md: "size-[18px] rounded-[6px] [&_svg]:size-2.5",
        lg: "size-5 rounded-[6px] [&_svg]:size-3",
        xl: "size-[22px] rounded-[8px] [&_svg]:size-3",
      },
    },
  }
);

const actionButton = cva(
  "shrink-0 flex items-center justify-center text-gray-600 cursor-pointer transition-[background-color,color,transform] duration-150 ease-out-quart hover:bg-fill hover:text-ink active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45",
  {
    variants: {
      size: {
        md: "size-7 rounded-[6px]",
        lg: "size-8 rounded-[6px]",
        xl: "size-9 rounded-[8px]",
      },
    },
  }
);

const actionIcon = cva(
  "flex items-center justify-center pointer-events-none *:size-full *:object-contain",
  {
    variants: {
      size: {
        md: "size-4",
        lg: "size-[18px]",
        xl: "size-5",
      },
    },
  }
);

// Без вариантов — обычная строка
const inputContainer = "flex-1 flex items-center min-w-0";

const prefixSlot = cva("shrink-0 select-none whitespace-nowrap text-gray-500 pointer-events-none", {
  variants: { mono: { true: "font-mono", false: "" } },
});

/* Голый инпут: прозрачный, без рамки/фона/паддинга — всё несёт обёртка. text-base = 16px
   на всех ширинах (иначе iOS зумит при фокусе). */
const inputControl = cva(
  "h-full w-full min-w-0 border-0 bg-transparent p-0 text-base shadow-none rounded-none placeholder:text-gray-500 focus:outline-0 focus:ring-0",
  {
    variants: { mono: { true: "font-mono", false: "" } },
  }
);

const helperText = cva("text-sm", {
  variants: {
    hasError: {
      true: "text-danger",
      false: "text-gray-500",
    },
  },
});

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement;

export interface InputProps {
  name: string;
  size: "md" | "lg" | "xl";
  // Custom Props
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  /** Текстовый префикс одной строкой со значением («bean.com/») */
  prefix?: string;
  /** Иконка слева: frosted-компонент или готовый элемент (напр. next/image) — размер задаёт ступень */
  Icon?: IconProp;
  /** Иконка справа. Сама по себе — декоративная; с onIconRightClick — круглая кнопка-действие */
  IconRight?: IconProp;
  /** Делает IconRight кнопкой (копировать, показать пароль…). aria-label обязателен */
  onIconRightClick?: () => void;
  iconRightLabel?: string;
  /** Крестик очистки при непустом значении (паттерн iOS text field) */
  isClearable?: boolean;
  /** Моно-шрифт значения — ссылки, коды, номера карт */
  mono?: boolean;
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
  // biome-ignore lint/suspicious/noExplicitAny: маска react-imask полиморфна (string|RegExp|Number|Date|…) — точный тип не выразить без сужения публичного API
  mask?: any;
  /**
   * Дополнительные опции для маски
   * Примеры: { lazy: false, placeholderChar: '_' }
   */
  maskOptions?: Record<string, unknown>;
}

function renderIcon(icon: IconProp, slotClass: string) {
  if (isValidElement(icon)) {
    return <span className={slotClass}>{icon}</span>;
  }
  const IconComponent = icon as React.ComponentType<{ className?: string }>;
  return (
    <span className={slotClass}>
      <IconComponent />
    </span>
  );
}

const Input = ({
  name,
  size,
  label,
  maxLength,
  prefix,
  Icon,
  IconRight,
  onIconRightClick,
  iconRightLabel,
  isClearable,
  mono,
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
  const inputId = useId();

  // Текущее значение из формы
  const currentValue = watch(name) || "";

  // Получаем onBlur из register для корректной работы touched
  const { onBlur: formOnBlur } = useMemo(() => register(name), [register, name]);

  // Комбинируем оба onBlur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formOnBlur(e);
    customOnBlur?.();
  };

  const showClear = !!isClearable && !!currentValue && !isDisabled;
  const trailing = onIconRightClick ? "action" : showClear ? "clear" : "none";

  const handleClear = () => {
    setValue(name, "", { shouldDirty: true, shouldValidate: true });
  };

  const controlClass = cn(inputControl({ mono: !!mono }));

  const inputElement = mask ? (
    <IMaskInput
      id={inputId}
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
      aria-invalid={!!error || undefined}
      className={controlClass}
    />
  ) : (
    <input
      {...register(name)}
      id={inputId}
      type="text"
      disabled={isDisabled}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autocomplete}
      onBlur={handleBlur}
      aria-invalid={!!error || undefined}
      className={controlClass}
    />
  );

  return (
    <div className="space-y-1">
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-ink",
              isDisabled && "opacity-50",
              error && "text-danger"
            )}
          >
            {label}
          </label>
        )}

        <div className={cn(inputWrapper({ size, hasError: !!error, isDisabled: !!isDisabled, trailing }))}>
          {Icon && renderIcon(Icon, cn(iconSlot({ size })))}

          <div className={inputContainer}>
            {/* Префикс и значение читаются как одна строка — различаются только цветом */}
            {prefix && <span className={cn(prefixSlot({ mono: !!mono }))}>{prefix}</span>}
            {inputElement}
          </div>

          {/* mousedown гасится, чтобы клик по крестику не уводил фокус из поля:
              после очистки продолжают печатать (поведение iOS) */}
          {showClear && (
            <button
              type="button"
              aria-label="Очистить"
              className={cn(clearButton({ size }))}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <XMarkBold12 />
            </button>
          )}

          {IconRight &&
            (onIconRightClick ? (
              <button
                type="button"
                aria-label={iconRightLabel}
                className={cn(actionButton({ size }))}
                onClick={onIconRightClick}
              >
                {renderIcon(IconRight, cn(actionIcon({ size })))}
              </button>
            ) : (
              renderIcon(IconRight, cn(iconSlot({ size })))
            ))}
        </div>
      </div>

      {(error || description || (!mask && maxLength)) && (
        <div className="flex justify-between gap-2">
          {error ? (
            <p className={cn(helperText({ hasError: true }))}>{error}</p>
          ) : (
            description && <p className={cn(helperText({ hasError: false }))}>{description}</p>
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

export { Input };

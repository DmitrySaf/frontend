"use client";

import { X } from "lucide-react";
import { isValidElement, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    inputWrapper:
      "w-full flex items-center cursor-text inset-ring inset-ring-gray-200 transition-[box-shadow,opacity] duration-150 focus-within:outline-0 focus-within:inset-ring-2 focus-within:inset-ring-primary-500",
    // Иконки по краям — без разделителя: иконка, зазор, текст (как поле поиска Apple).
    // Размер жёстко навязывается слотом (*:size-…), чтобы call-site не приносил свой.
    iconSlot: "shrink-0 flex items-center justify-center text-gray-500 pointer-events-none",
    /* Встроенные кнопки поля (очистка, действие) — ghost-прямоугольники. Радиус не
       выбирается, а выводится законом концентричности (§4.3): радиус поля − зазор до
       кромки. m: 10−4=6, l: 12−6=6, xl: 14−6=8. Фон появляется только на ховере. */
    clearButton:
      "shrink-0 flex items-center justify-center text-gray-500 cursor-pointer transition-[background-color,color] duration-150 hover:bg-fill hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45",
    actionButton:
      "shrink-0 flex items-center justify-center text-gray-600 cursor-pointer transition-[background-color,color,transform] duration-150 ease-out-quart hover:bg-fill hover:text-ink active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45",
    actionIcon: "flex items-center justify-center pointer-events-none *:size-full *:object-contain",
    inputContainer: "flex-1 flex items-center min-w-0",
    prefix: "shrink-0 select-none whitespace-nowrap text-gray-500 pointer-events-none",
    input: "w-full min-w-0 bg-transparent placeholder:text-gray-500 focus:outline-0",
    helperText: "text-sm",
  },
  variants: {
    /* Лестница контролов (см. DESIGN.md §4.3): высоты и радиусы — те же, что у Button.
       Кегль — 16px на ВСЕХ ступенях: ниже Safari на iOS зумит страницу при фокусе.
       Иконки едут со ступенью: 16/18/20. */
    size: {
      m: {
        inputWrapper: "h-9 px-3 gap-2 rounded-[10px] text-base",
        iconSlot: "size-4 *:size-4 *:object-contain",
        clearButton: "size-[18px] rounded-[6px] [&_svg]:size-2.5",
        actionButton: "size-7 rounded-[6px]",
        actionIcon: "size-4",
      },
      l: {
        inputWrapper: "h-11 px-3.5 gap-2.5 rounded-[12px] text-base",
        iconSlot: "size-[18px] *:size-[18px] *:object-contain",
        clearButton: "size-5 rounded-[6px] [&_svg]:size-3",
        actionButton: "size-8 rounded-[6px]",
        actionIcon: "size-[18px]",
      },
      xl: {
        inputWrapper: "h-12 px-4 gap-3 rounded-[14px] text-base",
        iconSlot: "size-5 *:size-5 *:object-contain",
        clearButton: "size-[22px] rounded-[8px] [&_svg]:size-3",
        actionButton: "size-9 rounded-[8px]",
        actionIcon: "size-5",
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
    // Моно — для ссылок, кодов, номеров карт (правило DESIGN.md §3: моно = цифры/коды)
    mono: {
      true: {
        input: "font-mono",
        prefix: "font-mono",
      },
    },
    isDisabled: {
      true: {
        inputWrapper: "opacity-50 cursor-not-allowed",
      },
    },
    // Кнопка справа крупнее текстового паддинга — поле поджимается, чтобы она
    // стояла у кромки (как кнопка копирования в поле инвайта)
    trailing: {
      action: {},
      clear: {},
      none: {},
    },
  },
  compoundVariants: [
    { trailing: "action", size: "m", class: { inputWrapper: "pr-1" } },
    { trailing: "action", size: "l", class: { inputWrapper: "pr-1.5" } },
    { trailing: "action", size: "xl", class: { inputWrapper: "pr-1.5" } },
    { trailing: "clear", size: "m", class: { inputWrapper: "pr-2" } },
    { trailing: "clear", size: "l", class: { inputWrapper: "pr-2" } },
    { trailing: "clear", size: "xl", class: { inputWrapper: "pr-2.5" } },
  ],
});

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement;

export interface InputProps {
  name: string;
  size: "m" | "l" | "xl";
  // Custom Props
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  /** Текстовый префикс одной строкой со значением («bean.com/») */
  prefix?: string;
  /** Иконка слева: lucide-компонент или готовый элемент (напр. next/image) — размер задаёт ступень */
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

  // Текущее значение из формы
  const currentValue = watch(name) || "";

  // Получаем onBlur из register для корректной работы touched
  const { onBlur: formOnBlur } = useMemo(() => register(name), [register, name]);

  // Комбинируем оба onBlur
  const handleBlur = (e: any) => {
    formOnBlur(e);
    customOnBlur?.();
  };

  const showClear = !!isClearable && !!currentValue && !isDisabled;
  const trailing = onIconRightClick ? "action" : showClear ? "clear" : "none";

  const styles = inputVariants({
    size,
    hasError: !!error,
    mono: !!mono,
    isDisabled: !!isDisabled,
    trailing,
  });

  const handleClear = () => {
    setValue(name, "", { shouldDirty: true, shouldValidate: true });
  };

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
          {Icon && renderIcon(Icon, styles.iconSlot())}

          <div className={styles.inputContainer()}>
            {/* Префикс и значение читаются как одна строка — различаются только цветом */}
            {prefix && <span className={styles.prefix()}>{prefix}</span>}
            {inputElement}
          </div>

          {/* mousedown гасится, чтобы клик по крестику не уводил фокус из поля:
              после очистки продолжают печатать (поведение iOS) */}
          {showClear && (
            <button
              type="button"
              aria-label="Очистить"
              className={styles.clearButton()}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <X />
            </button>
          )}

          {IconRight &&
            (onIconRightClick ? (
              <button
                type="button"
                aria-label={iconRightLabel}
                className={styles.actionButton()}
                onClick={onIconRightClick}
              >
                {renderIcon(IconRight, styles.actionIcon())}
              </button>
            ) : (
              renderIcon(IconRight, styles.iconSlot())
            ))}
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

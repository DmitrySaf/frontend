"use client";

import { HourGlassBold16 } from "@frosted-ui/icons";
import { cva } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { Button as AriaButton } from "react-aria-components";

import { cn } from "@/shared/utils";

/* React Aria Components Button — только движок (фокус/клавиатура/press/isPending), не источник
   оформления: RAC headless, ноль пикселей. Цвет и размер — целиком наши классы на своей
   4-ступенчатой лестнице 32/36/40/48 (DESIGN.md §4.2). HeroUI-нейтрализаторов (--button-bg…)
   больше нет — гасить нечего: у RAC нет дефолтной заливки, а голую <button> сбрасывает
   Tailwind preflight.

   Состояния (hover/active/focus-visible) держим на CSS-псевдоклассах, а не на RAC data-*:
   Button полиморфна (RAC <button> ЛИБО next/link <a>), а якорь RAC data-атрибутов не отдаёт;
   :hover/:active/:focus-visible работают нативно на обоих, и ровно так же вёл себя прежний
   HeroUI Button (тот же press-движок React Aria) — то есть паритет 1:1. Если позже уведём
   ссылку под RAC RouterProvider — можно перевести на data-[hovered]/[pressed]. */

type ButtonTheme =
  | "primary"
  | "secondary"
  | "destructiveTonal"
  | "destructiveGhost"
  | "outline"
  | "destructive"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg" | "xl";

/* Один variant-движок — cva (§9): статические оси (theme/size/shape/fluid) здесь; состояния
   и производные (загрузка/disabled/iconOnly) — классами в cn() ниже. Радиус/кегль — лестничные
   токены (--radius-control-*, --text-btn-*); высота/паддинг/gap лежат на сетке 4px. */
const buttonVariants = cva(
  // relative — опора для абсолютного спиннера; [&_svg]:mx-0/my-0 стабилизируют иконки.
  "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-semibold transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:mx-0 [&_svg]:my-0 [&_svg]:shrink-0",
  {
    variants: {
      theme: {
        primary: "bg-primary-500 text-white shadow hover:bg-primary-400 active:bg-primary-600",
        // Серая заливка вместо рамки — парная кнопка к primary в футере модалки
        secondary: "bg-fill text-ink hover:bg-fill-hover active:bg-fill-hover/70",
        outline:
          "border border-input bg-background shadow-sm hover:bg-gray-50 active:bg-gray-100/80",
        destructive: "bg-danger text-white shadow-sm hover:bg-danger/90 active:bg-danger/85",
        // Тональный деструктив — для подтверждений: красный читается как опасность, не как акцент.
        destructiveTonal: "bg-danger/10 text-danger hover:bg-danger/15 active:bg-danger/20",
        // Призрачный деструктив — второстепенное удаление в ряду с обычными действиями
        destructiveGhost: "text-danger hover:bg-danger/10 active:bg-danger/15",
        ghost: "hover:bg-gray-100 active:bg-gray-200/60",
      },
      // size ОБЪЯВЛЕН ДО shape: cva клеит варианты в порядке ключей, а twMerge (cn ниже)
      // оставляет последний конфликтующий rounded-* — так pill перебивает радиус ступени.
      // Кегль — ОБЯЗАТЕЛЬНО text-(length:--…): голый text-(--var) двусмыслен (цвет ИЛИ размер),
      // и twMerge относит его к цвету → съедает наш text-white/text-ink из theme (тот идёт раньше),
      // color:var(--text-btn) = «13px» = невалидный цвет → текст падал в чёрный. length: снимает
      // двусмысленность: это размер, конфликта с цветом нет.
      size: {
        sm: "h-8 gap-2 px-3 rounded-(--radius-control-sm) text-(length:--text-btn-sm) leading-none tracking-[0.01em]",
        md: "h-9 gap-2 px-3.5 rounded-(--radius-control-md) text-(length:--text-btn-md) leading-none tracking-normal",
        lg: "h-10 gap-2.5 px-4 rounded-(--radius-control-lg) text-(length:--text-btn-lg) leading-none tracking-[-0.01em]",
        xl: "h-12 gap-3 px-6 rounded-(--radius-control-xl) text-(length:--text-btn-xl) leading-none tracking-[-0.01em]",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
      },
      fluid: {
        true: "w-full",
        false: "w-max",
      },
    },
    defaultVariants: {
      shape: "rounded",
      fluid: false,
    },
  }
);

// Иконка не масштабируется линейно с кнопкой: на мелких ступенях крупнее текста,
// на крупных — наоборот, иначе перевешивает подпись.
const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "size-4",
  md: "size-4",
  lg: "size-4.5",
  xl: "size-5",
};

type IconComponent = React.ComponentType<{ className?: string }>;

type BaseButtonProps = {
  // Content
  children?: React.ReactNode;
  /** Иконка перед подписью. Без `children` кнопка становится квадратной иконочной. */
  Icon?: IconComponent;
  /** Иконка после подписи — «Следующий урок →». Размер берётся от ступени. */
  IconRight?: IconComponent;

  // Styling & Variants
  className?: string;
  theme: ButtonTheme;
  size: ButtonSize;
  /** `pill` — полное скругление; с `iconOnly` даёт круг */
  shape?: "rounded" | "pill";
  fluid?: boolean;

  // Behavior
  isLoading?: boolean;
  isDisabled?: boolean;

  // A11y (обязателен для иконочных кнопок без текста)
  "aria-label"?: string;
};

type ButtonAsButton = BaseButtonProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type ButtonAsLink = BaseButtonProps & {
  href: string;
  type?: never;
  onClick?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// forwardRef нужен, чтобы кнопку можно было отдать RAC-обёрткам (напр. Tooltip через
// <Focusable>, который cloneElement'ит focus-пропы + ref на реальный DOM-элемент).
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      href,
      className,
      theme,
      size,
      shape = "rounded",
      fluid = false,
      Icon,
      IconRight,
      isLoading,
      children,
      isDisabled,
      type,
      onClick,
      ...restProps
    } = props;

    const iconOnly = !children && !!Icon;
    const iconSize = ICON_SIZE[size];

    /* Загрузка не должна двигать кнопку. Подпись остаётся в потоке и держит ширину
     (opacity-0), а спиннер ложится абсолютом по центру — ширина не меняется ни на
     пиксель, мишень не уезжает из-под курсора в момент клика. */
    const content = (
      <>
        {isLoading && (
          <HourGlassBold16
            className={cn(
              iconSize,
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
            )}
          />
        )}
        <span
          className={cn(
            "inline-flex items-center justify-center gap-[inherit]",
            isLoading && "opacity-0"
          )}
        >
          {Icon && <Icon className={iconSize} />}
          {children}
          {IconRight && <IconRight className={iconSize} />}
        </span>
      </>
    );

    const classes = cn(
      buttonVariants({ theme, size, shape, fluid }),
      iconOnly && "aspect-square p-0",
      // «Занят» ≠ «выключен»: во время загрузки кнопка сохраняет полный цвет и гаснет
      // только настоящий disabled. Клики блокируются в обоих случаях.
      isDisabled && !isLoading && "opacity-50",
      (isDisabled || isLoading) && "pointer-events-none",
      isLoading && "cursor-wait",
      className
    );

    // RAC Button не умеет быть ссылкой (AriaButtonProps исключает href/target/rel/elementType) —
    // для href-варианта остаёмся на next/link (клиентская навигация Next), как и раньше.
    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          aria-disabled={isDisabled || isLoading}
          aria-busy={isLoading || undefined}
          {...restProps}
          href={href}
        >
          {content}
        </Link>
      );
    }

    return (
      <AriaButton
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        isDisabled={isDisabled}
        // isPending гасит press/hover, но сохраняет фокусируемость и объявляет aria-busy —
        // это и есть «загрузка» без выпадения из tab-порядка.
        isPending={isLoading}
        type={type}
        // Bean-контракт — onClick(MouseEvent); RAC отдаёт onPress(PressEvent) (клик+тач+клавиатура).
        // Форвардим ту же функцию: ни один call-site не читает объект события (проверено grep'ом).
        onPress={onClick as unknown as React.ComponentProps<typeof AriaButton>["onPress"]}
        {...restProps}
      >
        {content}
      </AriaButton>
    );
  }
);
Button.displayName = "Button";

export { Button };

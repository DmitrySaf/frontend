import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/utils";
import Link from "next/link";

/* Шкала размеров (сетка 4px). Ступень — это не высота, а согласованный набор:
   вместе с высотой едут кегль, трекинг, радиус и размер иконки.

   Три правила, по которым выведены значения:

   1. Кегль ≈ 0.36–0.40 высоты. 28→12, 32→13, 36→14, 44→15, 48→17.
   2. Радиус растёт со ступенью, держа постоянное отношение ≈0.28 к высоте
      (8/10/10/12/14) — это и есть «эппловская» форма: одинаковая оптическая
      округлость на всех размерах, а не одинаковый радиус. Ср. Whop frosted-ui,
      где отношение держится около 0.25 (6/8/10/14 на высотах 24/32/40/48).
   3. Вес — константа 600 (как системная кнопка iOS: 17pt Semibold). По размерам
      его не гоняет никто из референсов. Единственная оптическая поправка — трекинг:
      он идёт против размера (+0.01em на 12–13px, 0 на 14px, −0.01em на 15–17px),
      потому что у Onest нет оптических начертаний SF Text / SF Display, и разницу
      плотности приходится компенсировать межбуквенным интервалом вручную.

   48px остаётся в шкале не «за компанию» с 44: это ячейка рейла (аватарки
   сообществ — те же 48), и кнопка «+» обязана попадать в неё. */
const buttonVariants = cva(
  // relative — опора для спиннера, который лежит абсолютом по центру (см. content ниже).
  // Гашение (opacity-50) намеренно НЕ висит на disabled:-варианте: во время загрузки кнопка
  // тоже disabled, но гаснуть не должна. Прозрачность выставляется явно, ниже в cn().
  "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-semibold transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      theme: {
        primary: "bg-primary-500 text-white shadow hover:bg-primary-400 active:bg-primary-600",
        // Серая заливка вместо рамки — парная кнопка к primary в футере модалки
        secondary: "bg-fill text-ink hover:bg-fill-hover active:bg-fill-hover/70",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent active:bg-gray-100/80",
        destructive: "bg-danger text-white shadow-sm hover:bg-danger/90 active:bg-danger/85",
        // Тональный деструктив — для подтверждений. Сплошная заливка там вредна: в паре
        // 50/50 она делает необратимое действие самой крупной и плотной мишенью окна,
        // перевешивая безопасный выход. Красный обязан читаться как опасность, а не как
        // главный акцент — плотность остаётся у «Отмены» (iOS-логика алерта).
        destructiveTonal: "bg-danger/10 text-danger hover:bg-danger/15 active:bg-danger/20",
        // Призрачный деструктив — второстепенное удаление в ряду с обычными действиями
        // («Удалить урок» рядом с «Сохранить»). Постоянная заливка там слишком громкая,
        // поэтому фон появляется только на ховере.
        destructiveGhost: "text-danger hover:bg-danger/10 active:bg-danger/15",
        ghost: "hover:bg-gray-100 active:bg-gray-200/60",
      },
      size: {
        xs: "h-7 gap-1.5 px-2.5 rounded-[8px] text-xs tracking-[0.01em]",
        s: "h-8 gap-2 px-3 rounded-[10px] text-[13px] tracking-[0.01em]",
        m: "h-9 gap-2 px-3.5 rounded-[10px] text-sm tracking-normal",
        l: "h-11 gap-2.5 px-[18px] rounded-[12px] text-[15px] tracking-[-0.01em]",
        xl: "h-12 gap-3 px-6 rounded-[14px] text-[17px] tracking-[-0.01em]",
      },
      /* Форма поверх радиуса размера. Объявлена ПОСЛЕ size намеренно: twMerge оставляет
         последний конфликтующий rounded-*, поэтому pill перебивает радиус ступени.
         Круглая иконочная кнопка = iconOnly + shape="pill" (отдельный circle не нужен). */
      shape: {
        rounded: "",
        pill: "rounded-full",
      },
      // Квадрат с иконкой по центру: горизонтальный падинг убирается, радиус — от ступени
      iconOnly: {
        true: "aspect-square p-0",
        false: "",
      },
      fluid: {
        true: "w-full",
        false: "w-max",
      },
    },
    defaultVariants: {
      theme: "primary",
      size: "m",
      shape: "rounded",
      fluid: false,
    },
  }
);

// Иконка не масштабируется линейно с кнопкой: на мелких ступенях она обязана быть
// заметно крупнее текста, на крупных — наоборот, иначе перевешивает подпись.
const ICON_SIZE: Record<NonNullable<ButtonProps["size"]>, string> = {
  xs: "size-3.5",
  s: "size-4",
  m: "size-4",
  l: "size-[18px]",
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
  theme:
    | "primary"
    | "secondary"
    | "destructiveTonal"
    | "destructiveGhost"
    | "outline"
    | "destructive"
    | "ghost";
  size: "xs" | "s" | "m" | "l" | "xl";
  /** `pill` — полное скругление (Apple-CTA, витрина); с `iconOnly` даёт круг */
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

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      href,
      className,
      theme,
      size,
      shape,
      fluid,
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
       пиксель, мишень не уезжает из-под курсора в момент клика.
       gap-[inherit] — чтобы внутренний ряд забрал gap ступени с самой кнопки. */
    const content = (
      <>
        {isLoading && (
          <Loader2
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
      buttonVariants({ theme, size, shape, fluid, iconOnly }),
      // «Занят» ≠ «выключен»: во время загрузки кнопка сохраняет полный цвет и гаснет
      // только настоящий disabled. Клики блокируются в обоих случаях.
      isDisabled && !isLoading && "opacity-50",
      (isDisabled || isLoading) && "pointer-events-none",
      isLoading && "cursor-wait",
      className
    );

    if (href) {
      return (
        <Link
          className={classes}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
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
      <button
        className={classes}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={isDisabled || isLoading}
        aria-busy={isLoading || undefined}
        type={type}
        onClick={onClick}
        {...restProps}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

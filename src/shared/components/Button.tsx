import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        ghost: "hover:bg-gray-100 active:bg-gray-200/60",
      },
      size: {
        s: "h-9 px-3.5 text-[13px] rounded-[10px]",
        m: "h-11 px-4 text-sm rounded-xl",
        l: "h-12 px-5 text-base rounded-xl",
      },
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
      fluid: false,
    },
  }
);

type BaseButtonProps = {
  // Content
  children?: React.ReactNode;
  Icon?: React.ComponentType<{ className?: string }>;

  // Styling & Variants
  className?: string;
  theme: "primary" | "secondary" | "destructiveTonal" | "outline" | "destructive" | "ghost";
  size: "s" | "m" | "l";
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
      fluid,
      Icon,
      isLoading,
      children,
      isDisabled,
      type,
      onClick,
      ...restProps
    } = props;

    const iconOnly = !children && !!Icon;

    // Icon size based on button size
    const iconSize = {
      s: "size-4",
      m: "size-6",
      l: "size-6",
    };

    const content = (
      <>
        {isLoading ? (
          <>
            <Loader2 className={`${iconSize[size]} animate-spin`} />
            {children}
          </>
        ) : iconOnly ? (
          <Icon className={iconSize[size]} />
        ) : (
          children
        )}
      </>
    );

    const classes = cn(buttonVariants({ theme, size, fluid, iconOnly, className }));

    if (href) {
      return (
        <Link
          className={classes}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          aria-disabled={isDisabled || isLoading}
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

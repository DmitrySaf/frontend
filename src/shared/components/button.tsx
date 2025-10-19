import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      theme: {
        primary: "bg-primary text-white shadow hover:bg-primary/90 active:bg-primary/80",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        s: "h-6 px-3 text-xs rounded-lg",
        m: "h-8 px-4 rounded-xl",
        l: "h-12 px-6 text-base rounded-2xl",
      },
      iconOnly: {
        true: "aspect-square p-0",
        false: "",
      },
      fluid: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      theme: "primary",
      size: "m",
      fluid: false,
    },
  }
);

export interface ButtonProps {
  // Content
  children?: React.ReactNode;
  // TODO: пофиксить
  Icon?: any;
  
  // Styling & Variants
  className?: string;
  theme: "primary" | "outline" | "destructive" | "ghost";
  size: "s" | "m" | "l";
  fluid?: boolean;
  
  // Behavior
  asChild?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  
  // Standard HTML Button Props
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, theme, size, fluid, Icon, asChild = false, isLoading, children, isDisabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const iconOnly = !children && !!Icon;
    
    // Icon size based on button size
    const iconSize = {
      s: 'size-3',
      m: 'size-4',
      l: 'size-5',
    };

    return (
      <Comp 
        className={cn(buttonVariants({ theme, size, fluid, iconOnly, className }))} 
        ref={ref} 
        disabled={isDisabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={iconSize + " animate-spin"} />
        ) : iconOnly ? (
          <Icon className={iconSize[size]} />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
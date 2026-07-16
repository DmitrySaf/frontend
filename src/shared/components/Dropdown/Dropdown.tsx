"use client";

import { cn } from "@/shared/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

// Base Radix UI primitives (for advanced usage if needed)
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // Радиусы явные (rounded-xl тут 16px из-за @theme): контейнер 12, пункты 8 —
        // концентрично при p-1: внутренний = внешний − зазор 4 (закон §4.3)
        "z-[var(--z-dropdown)] min-w-[200px] overflow-hidden rounded-[12px] border border-gray-200 bg-surface p-1 shadow-lg",
        "origin-[var(--radix-dropdown-menu-content-transform-origin)] duration-200 ease-out-expo data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-150 data-[state=closed]:ease-out-quart data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-[8px] px-4 py-2.5 text-sm font-medium outline-none transition-colors",
      "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      "focus:bg-gray-100 focus:text-gray-900",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// High-level Dropdown component that accepts items array
interface DropdownItemConfig {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface DropdownNoteConfig {
  note: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: (DropdownItemConfig | DropdownNoteConfig | "separator")[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

function Dropdown({ trigger, items, align = "end", side = "bottom", className }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side} className={className}>
        {items.map((item, index) => {
          if (item === "separator") {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }

          if ("note" in item) {
            return (
              <div
                key={`note-${index}`}
                className="px-2 pt-1.5 pb-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                {item.note}
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              className={cn(
                item.variant === "danger" &&
                  "text-danger hover:bg-danger/10 hover:text-danger focus:bg-danger/10 focus:text-danger"
              )}
            >
              {Icon && (
                <Icon className={cn("mr-2 h-4 w-4", item.variant === "danger" && "text-danger")} />
              )}
              <span>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  Dropdown,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
export type { DropdownProps, DropdownItemConfig, DropdownNoteConfig };

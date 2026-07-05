"use client";

import { cn } from "@/shared/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

// Детерминированная пастельная палитра для фолбэка с инициалами (Discord-style)
const FALLBACK_COLORS = [
  "bg-[#FBE4E4]",
  "bg-[#F9EED8]",
  "bg-[#ECF6D9]",
  "bg-[#E1F2E5]",
  "bg-[#DFEEF7]",
  "bg-[#E9E6F7]",
  "bg-[#FAE9DE]",
  "bg-[#F0F0F0]",
] as const;

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

interface AvatarProps {
  // Custom Props
  name: string;
  src?: string | null;
  size?: "s" | "m" | "l";
  /** square — сообщества (rounded-xl), circle — люди (rounded-full) */
  shape?: "square" | "circle";

  // Styling
  className?: string;
}

const sizeClasses = {
  s: "size-8 text-sm",
  m: "size-10 text-base",
  l: "size-12 text-lg",
};

const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ name, src, size = "m", shape = "circle", className }, ref) => {
    const initial = name.trim().charAt(0).toUpperCase() || "?";

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden select-none",
          sizeClasses[size],
          shape === "square" ? "rounded-xl" : "rounded-full",
          className
        )}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={name}
            className="aspect-square size-full object-cover"
          />
        )}
        <AvatarPrimitive.Fallback
          className={cn(
            "flex size-full items-center justify-center font-semibold text-black",
            colorFromName(name)
          )}
        >
          {initial}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

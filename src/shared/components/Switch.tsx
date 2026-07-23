"use client";

import { LockBold12 } from "@frosted-ui/icons";
import { Switch as AriaSwitch } from "react-aria-components";

import { cn } from "@/shared/utils";

export interface SwitchProps {
  // State
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  // Styling
  className?: string;

  // Behavior
  disabled?: boolean;

  // Accessibility
  id?: string;
  "aria-label"?: string;
}

/* RAC Switch — движок (роль switch, клавиатура, управление состоянием). Вид целиком наш:
   HeroUI держал трек/тумблер на своей CSS, у headless-RAC их нет. Трек 40×20 (как прежде —
   без скачка в рядах настроек), тумблер КРУГЛЫЙ, как у radio (decision №10 «нет круглых
   кнопок», исключение для ползунков). Состояния — через RAC data-* на самом <Switch> (group):
   off → gray-300, on → primary-500 (акцент). Токены gray-* переворачиваются в .dark. */
function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel,
}: SwitchProps) {
  return (
    <AriaSwitch
      id={id}
      aria-label={ariaLabel}
      isSelected={checked}
      onChange={onCheckedChange}
      isDisabled={disabled}
      className={cn(
        "group inline-flex cursor-pointer items-center data-[disabled]:cursor-not-allowed",
        className
      )}
    >
      {/* трек */}
      <span
        className={cn(
          "inline-flex h-5 w-10 shrink-0 items-center rounded-full bg-gray-300 p-0.5 transition-colors duration-200 ease-out-quart",
          "group-data-[selected]:bg-primary-500",
          "group-data-[disabled]:opacity-50",
          "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-primary-500/45 group-data-[focus-visible]:ring-offset-2"
        )}
      >
        {/* круглый бегунок — на 20px вправо при включении (40 − 16 − 2·2 = 20) */}
        <span
          className={cn(
            "flex size-4 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ease-out-quart",
            "group-data-[selected]:translate-x-5"
          )}
        >
          {disabled && <LockBold12 className="size-2 text-gray-400" />}
        </span>
      </span>
    </AriaSwitch>
  );
}

export { Switch };

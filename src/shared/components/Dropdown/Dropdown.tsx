"use client";

import {
  Header,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Pressable,
  Separator,
} from "react-aria-components";

import { cn } from "@/shared/utils";

/* RAC Menu — движок (клавиатура/typeahead/focus/позиционирование поповера). Публичный API Bean
   (trigger + декларативный items) не меняется — потребители не трогаются. Раньше был HeroUI
   Dropdown (та же React Aria под капотом), теперь примитивы RAC напрямую. */

interface DropdownItemConfig {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  /** Действие пункта. Взаимоисключимо с href (навигация — нативным <a> через href на Item). */
  onClick?: () => void;
  /** Навигационный пункт: RAC MenuItem сам рендерится как <a> при наличии href. */
  href?: string;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface DropdownNoteConfig {
  note: string;
}

interface DropdownProps {
  /** Единственный реальный элемент (кнопка) — Pressable клонирует на него press-пропы */
  trigger: React.ReactElement;
  items: (DropdownItemConfig | DropdownNoteConfig | "separator")[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  /** Наблюдатель открытия/закрытия меню (напр. для data-expanded у внешней обёртки).
      Меню остаётся неконтролируемым — это только уведомление, движок сам ведёт состояние. */
  onOpenChange?: (isOpen: boolean) => void;
}

// top/bottom комбинируются с start/end, left/right — только с top/bottom (см. Placement
// в react-aria-components); Bean на практике использует только top/bottom со start/end/center.
const CROSS_AXIS = { start: "top", center: "", end: "bottom" } as const;

function Dropdown({
  trigger,
  items,
  align = "end",
  side = "bottom",
  className,
  onOpenChange,
}: DropdownProps) {
  const placement =
    side === "left" || side === "right"
      ? align === "center"
        ? side
        : (`${side} ${CROSS_AXIS[align]}` as const)
      : align === "center"
        ? side
        : (`${side} ${align}` as const);

  return (
    <MenuTrigger onOpenChange={onOpenChange}>
      {/* Pressable клонирует press/focus-пропы прямо на единственного ребёнка (без нового
          DOM-узла) — в отличие от собственного триггера, который рендерит СВОЙ <button> и дал бы
          <button><button> (hydration-mismatch) поверх Bean Button/нативной <button>. Без
          какой-либо обёртки нативная <button> триггера вообще не подключается к MenuTrigger
          (PressResponder предупреждает: "rendered without a pressable child"). */}
      <Pressable>
        {trigger as unknown as React.ReactElement<React.HTMLAttributes<Element>, string>}
      </Pressable>
      <Popover
        placement={placement}
        offset={6}
        className={cn(
          "min-w-[200px] rounded-[12px] border border-gray-200 bg-surface p-1 shadow-lg",
          className
        )}
      >
        {/* Всё внутри Menu обязано быть collection-компонентом React Aria (MenuItem/Header/
            Separator), иначе сборщик коллекции спотыкается о чужой узел и меню выходит ПУСТЫМ.
            Поэтому note → RAC Header, separator → RAC Separator (оба createLeafComponent), а НЕ
            голый <div> и НЕ Bean-обёртка Separator (обычный компонент, коллекция его не видит). */}
        <Menu className="flex flex-col gap-0.5 outline-none">
          {items.map((item, index) => {
            if (item === "separator") {
              // biome-ignore lint/suspicious/noArrayIndexKey: разделитель без контентного id; items — статический конфиг, не переупорядочивается
              return <Separator key={`separator-${index}`} className="my-1 h-px bg-gray-200" />;
            }

            if ("note" in item) {
              return (
                <Header
                  key={`note-${item.note}`}
                  className="px-2 pt-1.5 pb-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {item.note}
                </Header>
              );
            }

            const Icon = item.icon;
            const isDanger = item.variant === "danger";

            return (
              <MenuItem
                key={item.label}
                textValue={item.label}
                // href передаётся только КЛЮЧОМ при наличии — просто href={undefined} для
                // action-пунктов RAC всё равно трактует как ссылочный пункт (href="" в DOM).
                {...(item.href ? { href: item.href } : { onAction: item.onClick })}
                isDisabled={item.disabled}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-medium outline-none transition-colors",
                  // подсветка активного пункта (наведение и клавиатура дают data-focused)
                  "data-[focused]:bg-fill data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  isDanger && "text-danger data-[focused]:bg-danger/10"
                )}
              >
                {Icon && <Icon className={cn("size-4", isDanger && "text-danger")} />}
                <span>{item.label}</span>
              </MenuItem>
            );
          })}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

export { Dropdown };
export type { DropdownProps, DropdownItemConfig, DropdownNoteConfig };

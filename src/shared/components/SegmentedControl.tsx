"use client";

import { Tab as RACTab, TabList, Tabs as RACTabs } from "react-aria-components";

import { cn } from "@/shared/utils";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;

  // Styling
  size?: "s" | "m";
  className?: string;
}

/* Сегмент-контрол на RAC Tabs (роли tablist/tab + клавиатура/typeahead React Aria).
   Скользящего индикатора, как у HeroUI, в RAC нет — активный сегмент рисуем сами через
   data-[selected]: пилюля БЕЗ ОБВОДКИ, только тень (decision №10 «нет круглых кнопок»,
   исключение для ползунков). Высоты/радиусы/паддинги — свои классы по шкале контролов.

   Радиусы здесь НЕ выбираются, а выводятся: у вложенных скруглений внешний радиус обязан
   равняться внутреннему плюс отступ, иначе углы не концентричны. При отступе 2px:
     s: пилюля 28 r8  + 2×2 → трек 32, радиус 8+2  = 10 (--radius-control-sm)
     m: пилюля 32 r10 + 2×2 → трек 36, радиус 10+2 = 12 (--radius-control-lg)
   Высоты трека (32 и 36) попадают ровно в ступени sm/md лестницы Button/Input. */
const TRACK = {
  s: "gap-0.5 p-[2px] rounded-(--radius-control-sm)",
  m: "gap-0.5 p-[2px] rounded-(--radius-control-lg)",
};

const TAB = {
  s: "h-7 px-2.5 gap-1.5 text-xs rounded-[8px]",
  m: "h-8 px-3.5 gap-1.5 text-sm rounded-[10px]",
};

const ICON_SIZE = {
  s: "size-3.5",
  m: "size-4",
};

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "m",
  className,
}: SegmentedControlProps<T>) {
  return (
    <RACTabs
      selectedKey={value}
      onSelectionChange={(key) => onChange(key as T)}
      className={cn("w-fit", className)}
    >
      <TabList aria-label="Сегмент-контрол" className={cn("inline-flex bg-gray-100", TRACK[size])}>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <RACTab
              key={option.value}
              id={option.value}
              className={cn(
                "inline-flex cursor-pointer select-none items-center justify-center font-medium text-muted-foreground outline-none transition-colors",
                "data-[hovered]:text-ink",
                "data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary-500/45",
                // активный сегмент — пилюля: поверхность + мягкая тень, без обводки
                "data-[selected]:bg-surface data-[selected]:text-ink data-[selected]:shadow-sm",
                TAB[size]
              )}
            >
              {Icon && <Icon className={ICON_SIZE[size]} />}
              {option.label}
            </RACTab>
          );
        })}
      </TabList>
    </RACTabs>
  );
}

export { SegmentedControl };

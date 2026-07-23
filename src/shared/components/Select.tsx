"use client";

import { CheckmarkBold16, ChevronDownBold16 } from "@frosted-ui/icons";
import { cva } from "class-variance-authority";
import {
  Select as AriaSelect,
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  Separator,
} from "react-aria-components";
import { useFormContext } from "react-hook-form";

import { cn } from "@/shared/utils";

/* Bucket A — движок RAC Select (клавиатура/typeahead/фокус/позиционирование поповера).
   Скрытый нативный <select> НЕ рендерим (name движку не отдаём) — значение ведёт RHF.
   Вид — наши классы. Лестница как у Input (md/lg/xl = 36/40/48, text-base 16px на всех:
   ниже Safari на iOS зумит при фокусе). Состояния: открытие → aria-expanded (как у
   Dropdown-триггера), выбранный пункт → data-[selected], наведение/клавиатура → data-[focused]. */

const trigger = cva(
  "group w-full flex items-center gap-2 cursor-pointer bg-surface text-ink text-base outline-none inset-ring inset-ring-gray-200 transition-[box-shadow,opacity] duration-150 data-[focus-visible]:inset-ring-2 data-[focus-visible]:inset-ring-primary-500 aria-expanded:inset-ring-2 aria-expanded:inset-ring-primary-500",
  {
    variants: {
      size: {
        md: "h-9 px-3 rounded-(--radius-control-md)",
        lg: "h-10 px-3.5 rounded-(--radius-control-lg)",
        xl: "h-12 px-4 rounded-(--radius-control-xl)",
      },
      hasError: {
        true: "inset-ring-danger data-[focus-visible]:inset-ring-danger aria-expanded:inset-ring-danger",
        false: "",
      },
      isDisabled: { true: "opacity-50 cursor-not-allowed", false: "" },
    },
  }
);

// Пункт списка — тот же язык, что у MenuItem в Dropdown (r8, data-[focused]:bg-fill)
const optionClass =
  "flex cursor-pointer items-center gap-2 rounded-[8px] px-3 py-2 text-sm font-medium text-ink outline-none transition-colors data-[focused]:bg-fill data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SelectActionConfig {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Пункт-действие внизу списка: это НЕ значение — вызывает onAction (напр. «создать новую …») */
  onAction: () => void;
}

export interface SelectProps {
  name: string;
  size: "md" | "lg" | "xl";
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  isDisabled?: boolean;
  action?: SelectActionConfig;
}

// Ключ пункта-действия. Не должен совпадать со value опций (для create-new-паттерна хватает).
const ACTION_KEY = "__select_action__";

/* RHF-автобинд по name (как Input/Textarea): значение из watch, запись через setValue.
   Controller НЕ вводим — публичный контракт поля прежний: name + error (+ label/size/placeholder). */
function Select({
  name,
  size,
  options,
  label,
  placeholder = "Выберите",
  error,
  description,
  isDisabled,
  action,
}: SelectProps) {
  const { watch, setValue } = useFormContext();
  const value = watch(name) ?? null;

  return (
    <div className="space-y-1">
      <AriaSelect
        selectedKey={value}
        isDisabled={isDisabled}
        placeholder={placeholder}
        aria-label={label ? undefined : placeholder}
        onSelectionChange={(key) => {
          if (key === ACTION_KEY) {
            action?.onAction();
            return;
          }
          setValue(name, key as string, { shouldValidate: true, shouldDirty: true });
        }}
        className="flex flex-col gap-1"
      >
        {label && (
          <Label
            className={cn(
              "block text-sm font-medium text-ink",
              isDisabled && "opacity-50",
              error && "text-danger"
            )}
          >
            {label}
          </Label>
        )}

        <Button className={cn(trigger({ size, hasError: !!error, isDisabled: !!isDisabled }))}>
          {/* Только ТЕКСТ выбранного (selectedText). По умолчанию SelectValue отрисовывает всё
              содержимое пункта (иконку + flex-1-спан + галочку); без flex-родителя внутри
              триггера это ломает раскладку — выбранный текст «уплывает»/переполняет поле. */}
          <SelectValue className="flex-1 min-w-0 text-left truncate data-[placeholder]:text-gray-500">
            {({ isPlaceholder, selectedText }) => (isPlaceholder ? placeholder : selectedText)}
          </SelectValue>
          <ChevronDownBold16 className="size-4 shrink-0 text-gray-500 transition-transform duration-200 ease-out-quart group-aria-expanded:rotate-180" />
        </Button>

        <Popover
          offset={6}
          className="w-(--trigger-width) min-w-(--trigger-width) rounded-[12px] border border-gray-200 bg-surface p-1 shadow-lg"
        >
          {/* Внутри ListBox — только collection-узлы RAC (ListBoxItem/Separator); любой <div>
              схлопнул бы коллекцию в пустую (см. CLAUDE.md). */}
          <ListBox className="flex flex-col gap-0.5 outline-none">
            {options.map((option) => (
              <ListBoxItem
                key={option.value}
                id={option.value}
                textValue={option.label}
                className={cn("group/opt", optionClass)}
              >
                {option.icon && <option.icon className="size-4 shrink-0 text-gray-500" />}
                <span className="flex-1 min-w-0 truncate">{option.label}</span>
                <CheckmarkBold16 className="size-4 shrink-0 text-primary-600 opacity-0 group-data-[selected]/opt:opacity-100" />
              </ListBoxItem>
            ))}

            {action && (
              <>
                <Separator className="my-1 h-px bg-gray-200" />
                <ListBoxItem id={ACTION_KEY} textValue={action.label} className={optionClass}>
                  {action.icon && <action.icon className="size-4 shrink-0 text-gray-500" />}
                  <span className="flex-1 min-w-0 truncate">{action.label}</span>
                </ListBoxItem>
              </>
            )}
          </ListBox>
        </Popover>
      </AriaSelect>

      {(error || description) && (
        <p className={cn("text-sm", error ? "text-danger" : "text-gray-500")}>
          {error ?? description}
        </p>
      )}
    </div>
  );
}

export { Select };
export type { SelectOption };

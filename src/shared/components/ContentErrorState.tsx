"use client";

import { Illuminati24, RotateBold16 } from "@frosted-ui/icons";
import { Button } from "./Button";

interface ContentErrorStateProps {
  onRetry: () => void;
  title?: string;
  description?: string;
}

/**
 * Инлайн-состояние ошибки загрузки контента с кнопкой «Повторить». Показывается
 * только когда данных нет вовсе (data === undefined после провала запроса) — если
 * данные в кэше есть, экраны продолжают их показывать даже при ошибке рефетча.
 */
export function ContentErrorState({
  onRetry,
  title = "Не удалось загрузить",
  description = "Проверьте соединение и попробуйте снова.",
}: ContentErrorStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 max-w-xs text-center">
        <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <Illuminati24 className="size-6 text-gray-500" />
        </div>
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <Button theme="outline" size="md" Icon={RotateBold16} onClick={onRetry}>
          Повторить
        </Button>
      </div>
    </div>
  );
}

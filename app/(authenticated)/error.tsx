"use client";

import { Button } from "@/shared/components";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";

// Граница ошибок аутентифицированной зоны: серверный фетч (блок D) или упавший
// клиентский запрос не должны показывать дефолтный краш-экран Next.
export default function AuthenticatedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-3 max-w-xs text-center animate-in fade-in zoom-in-95 duration-300 ease-out-quart">
        <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <TriangleAlert className="size-6 text-gray-500" />
        </div>
        <p className="text-[15px] font-semibold text-ink">Что-то пошло не так</p>
        <p className="text-sm text-gray-600">
          Не удалось загрузить раздел. Проверьте соединение и попробуйте снова.
        </p>
        <Button theme="outline" size="l" onClick={reset}>
          Повторить
        </Button>
      </div>
    </div>
  );
}

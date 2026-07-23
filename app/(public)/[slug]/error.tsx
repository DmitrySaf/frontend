"use client";

import { Button } from "@/shared/components";
import { ExclamationTriangleBold24 } from "@frosted-ui/icons";
import { useEffect } from "react";

// Граница ошибок публичной витрины: сетевой сбой RPC не должен показывать
// дефолтный краш-экран Next (notFound для hidden/несуществующих — отдельный путь).
export default function StorefrontError({
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 max-w-xs text-center">
        <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <ExclamationTriangleBold24 className="size-6 text-gray-500" />
        </div>
        <p className="text-[15px] font-semibold text-ink">Что-то пошло не так</p>
        <p className="text-sm text-gray-600">
          Не удалось загрузить страницу. Проверьте соединение и попробуйте снова.
        </p>
        <Button theme="outline" size="lg" onClick={reset}>
          Повторить
        </Button>
      </div>
    </div>
  );
}

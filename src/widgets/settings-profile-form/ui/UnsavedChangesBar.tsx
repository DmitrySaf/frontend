"use client";

import { Button } from "@/shared/components";

interface UnsavedChangesBarProps {
  isVisible: boolean;
  onSave: () => void;
  onReset: () => void;
  isSubmitting: boolean;
}

export function UnsavedChangesBar({
  isVisible,
  onSave,
  onReset,
  isSubmitting,
}: UnsavedChangesBarProps) {
  if (!isVisible) return null;

  return (
    <div className="sticky bottom-4 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-3 pl-5 flex items-center justify-between">
      <p className="text-gray-700 font-medium">
        У вас есть несохраненные изменения
      </p>
      <div className="flex gap-3">
        <Button
          type="button"
          theme="ghost"
          size="m"
          onClick={onReset}
          isDisabled={isSubmitting}
        >
          Сбросить
        </Button>
        <Button
          type="button"
          theme="primary"
          size="m"
          onClick={onSave}
          isLoading={isSubmitting}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}


"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components";
import { useState } from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteDialog({
  isOpen,
  onClose,
  onDelete,
  title,
  description,
  confirmText = "Удалить",
  cancelText = "Отмена",
}: DeleteDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await onDelete();
      onClose();
    } catch (error) {
      // Ошибка должна обрабатываться в onDelete через toast
      console.error("Delete operation failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Подтверждение = вынужденный выбор: ни крестика, ни клика снаружи. Случайный тап
          не должен отвечать на вопрос, а третий (неподписанный) выход провоцирует закрыть
          окно не читая. Остаются два подписанных действия и Esc. */}
      <DialogContent className="sm:max-w-md" showClose={false} dismissOnOutside={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* split: варианты равноценны — на мобильном 50/50, обе в зоне пальца */}
        <DialogFooter layout="split">
          <Button theme="secondary" size="lg" onClick={onClose} isDisabled={isPending}>
            {cancelText}
          </Button>
          <Button theme="destructiveTonal" size="lg" onClick={handleDelete} isLoading={isPending}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

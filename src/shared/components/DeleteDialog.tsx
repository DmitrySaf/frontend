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
import { Loader2 } from "lucide-react";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button theme="outline" size="m" onClick={onClose} isDisabled={isPending}>
            {cancelText}
          </Button>
          <Button theme="destructive" size="m" onClick={handleDelete} isDisabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

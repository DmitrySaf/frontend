"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@/shared/components";
import { useDeleteProjectMutation } from "@/entities/project";
import { Loader2 } from "lucide-react";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string | null;
}

export default function DeleteProjectModal({
  isOpen,
  onClose,
  projectName,
}: DeleteProjectModalProps) {
  const deleteProject = useDeleteProjectMutation();

  const handleDelete = async () => {
    if (!projectName) return;

    try {
      await deleteProject.mutateAsync(projectName);
      onClose();
    } catch (error) {
      // Ошибка обрабатывается в мутации через toast
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Удалить проект</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить проект "{projectName}"? Это действие нельзя будет
            отменить.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button theme="outline" size="m" onClick={onClose} isDisabled={deleteProject.isPending}>
            Отмена
          </Button>
          <Button
            theme="destructive"
            size="m"
            onClick={handleDelete}
            isDisabled={deleteProject.isPending || !projectName}
          >
            {deleteProject.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Удаление...
              </>
            ) : (
              "Удалить"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

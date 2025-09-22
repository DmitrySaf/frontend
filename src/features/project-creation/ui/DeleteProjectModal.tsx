'use client'

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  Button
} from '@/shared/components'
import { useDeleteProject } from '@/entities/project'
import { Loader2 } from 'lucide-react'

interface DeleteProjectModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string | null
  projectName: string | null
}

export default function DeleteProjectModal({ 
  isOpen, 
  onClose, 
  projectId, 
  projectName 
}: DeleteProjectModalProps) {
  const deleteProject = useDeleteProject()

  const handleDelete = async () => {
    if (!projectName) return

    try {
      await deleteProject.mutateAsync(projectName)
      onClose()
    } catch (error) {
      // Ошибка обрабатывается в мутации через toast
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Удалить проект</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить проект "{projectName}"? 
            Это действие нельзя будет отменить.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            theme="outline"
            size="m"
            onClick={onClose}
            disabled={deleteProject.isPending}
          >
            Отмена
          </Button>
          <Button
            theme="destructive"
            size="m"
            onClick={handleDelete}
            disabled={deleteProject.isPending || !projectName}
          >
            {deleteProject.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Удаление...
              </>
            ) : (
              'Удалить'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

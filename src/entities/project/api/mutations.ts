import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createProject, deleteProject } from './api'
import { useInvalidateProjects } from './queries'

/**
 * Хук для создания нового проекта
 */
export const useCreateProjectMutation = () => {
  const invalidateProjects = useInvalidateProjects()

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success('Проект создан успешно')
      invalidateProjects()
    },
    onError: (error) => {
      toast.error('Ошибка при создании проекта', {
        description: error instanceof Error ? error.message : 'Попробуйте еще раз'
      })
    }
  })
}

/**
 * Хук для удаления проекта
 */
export const useDeleteProjectMutation = () => {
  const invalidateProjects = useInvalidateProjects()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Проект удален успешно')
      invalidateProjects()
    },
    onError: (error) => {
      toast.error('Ошибка при удалении проекта', {
        description: error instanceof Error ? error.message : 'Попробуйте еще раз'
      })
    }
  })
}

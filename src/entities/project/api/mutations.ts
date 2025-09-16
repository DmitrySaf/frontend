import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createProject, deleteProject, CreateProjectData } from './api'

/**
 * Хук для создания нового проекта
 */
export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      // Realtime подписка автоматически обновит кэш при INSERT
      // Показываем успешное уведомление
      console.log('✅ Project created successfully')
    },
    onError: (error) => {
      toast.error('Ошибка при создании проекта', {
        description: error instanceof Error ? error.message : 'Попробуйте еще раз'
      })
      console.error('❌ Failed to create project:', error)
    }
  })
}

/**
 * Хук для удаления проекта
 */
export const useDeleteProject = () => {
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      // Realtime подписка автоматически обновит кэш при DELETE
      // Показываем успешное уведомление
      console.log('✅ Project deleted successfully')
    },
    onError: (error) => {
      toast.error('Ошибка при удалении проекта', {
        description: error instanceof Error ? error.message : 'Попробуйте еще раз'
      })
      console.error('❌ Failed to delete project:', error)
    }
  })
}

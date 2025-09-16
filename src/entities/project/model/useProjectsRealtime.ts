'use client'

import { useSupabaseRealtime } from '@/shared/composables'
import { projectQueryKeys } from '../api/constants'
import { toast } from 'sonner'
import type { ProjectAPI } from '@/shared/types'
// TODO: для проектов не нужно использовать realtime, но для примера оставил
/**
 * Хук для realtime подписки на изменения в таблице проектов
 * Автоматически инвалидирует кэш проектов при изменениях
 */
export const useProjectsRealtime = (enabled: boolean = true) => {
  useSupabaseRealtime<ProjectAPI>({
    table: 'projects',
    queryKeys: [
      projectQueryKeys.projects,
      // Также инвалидируем все query keys проектов
      ['projects']
    ],
    enabled,
    onInsert: (payload) => {
      const project = payload.new
      if (project?.display_name) {
        toast.success('Новый проект создан!', {
          description: `Проект "${project.display_name}" добавлен в систему`
        })
      }
    },
    onUpdate: (payload) => {
      const project = payload.new
      if (project?.display_name) {
        toast.info('Проект обновлен', {
          description: `Проект "${project.display_name}" был изменен`
        })
      }
    },
    onDelete: (payload) => {
      const project = payload.old
      if (project?.display_name) {
        toast.success('Проект удален', {
          description: `Проект "${project.display_name}" был удален`
        })
      }
    }
  })
}

'use server'

import { useQueryClient } from '@tanstack/react-query'
import { projectQueryKeys } from './constants'
import { getProjects, getProject } from './api'
import { useServerQuery } from '@/shared/composables'
import { TypedSupabaseClient } from "@/api"

/**
 * Серверный хук для предзагрузки проектов
 */
export const useProjectsServerQuery = async () => {
  return useServerQuery({
    queryKey: projectQueryKeys.projects,
    queryFn: getProjects
  })
}

/**
 * Серверный хук для предзагрузки единичного проекта
 */
export const useProjectServerQuery = async (name: string) => {
  return useServerQuery({
    queryKey: projectQueryKeys.project(name),
    queryFn: (serverClient) => getProject(serverClient, name)
  })
}

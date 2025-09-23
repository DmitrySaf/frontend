import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { projectQueryKeys } from './constants'
import { getProjects, getProject } from './api'
import { useServerQuery } from '@/shared/composables'
import { Project } from "./types"
import { transformProject } from "../model"

/**
 * Хук для получения списка проектов
 */
export const useProjectsQuery = (): UseQueryResult<Project[]> => {
  return useQuery({
    queryKey: projectQueryKeys.projects,
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // 5 минут
    select: (data) => data.map(transformProject),
  })
}

/**
 * Серверный хук для предзагрузки проектов
 */
export const useProjectsServerQuery = () => {
  return useServerQuery({
    queryKey: projectQueryKeys.projects,
    queryFn: getProjects
  })
}

/**
 * Хук для получения единичного проекта
 */
export const useProject = (id: string): UseQueryResult<Project> => {
  return useQuery({
    queryKey: projectQueryKeys.project(id),
    queryFn: () => getProject(id),
    enabled: !!id, // Запрос выполняется только если есть id
    staleTime: 1000 * 60 * 10, // 10 минут
    select: (data) => transformProject(data),
  })
}

/**
 * Серверный хук для предзагрузки единичного проекта
 */
export const useProjectServerQuery = (id: string) => {
  return useServerQuery({
    queryKey: projectQueryKeys.project(id),
    queryFn: () => getProject(id)
  })
}

/**
 * Хук для инвалидации кэша проектов
 */
export const useInvalidateProjects = () => {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: projectQueryKeys.projects })
  }
}


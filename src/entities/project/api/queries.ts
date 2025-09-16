import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import { projectQueryKeys } from './constants'
import { getProjects, getProject } from './api'

/**
 * Хук для получения списка проектов
 */
export const useProjects = () => {
  return useQuery({
    queryKey: projectQueryKeys.projects,
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}

/**
 * Хук для получения единичного проекта
 */
export const useProject = (id: string) => {
  return useQuery({
    queryKey: projectQueryKeys.project(id),
    queryFn: () => getProject(id),
    enabled: !!id, // Запрос выполняется только если есть id
    staleTime: 1000 * 60 * 10, // 10 минут
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

/**
 * Предзагружает данные проектов в QueryClient
 */
export const prefetchProjectsData = async (queryClient: QueryClient, data: any) => {
  await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.projects,
    queryFn: () => Promise.resolve(data),
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Предзагружает данные единичного проекта в QueryClient
 */
export const prefetchProjectData = async (queryClient: QueryClient, id: string, data: any) => {
  await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.project(id),
    queryFn: () => Promise.resolve(data),
    staleTime: 1000 * 60 * 10,
  })
}


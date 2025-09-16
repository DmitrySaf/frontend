import { useSSRQuery } from '@/shared/composables'
import { getProjects, prefetchProjectsData, getProject, prefetchProjectData } from '../api'

/**
 * Серверный хук для предзагрузки проектов
 */
export const useSSRProjects = () => {
  return useSSRQuery(getProjects, prefetchProjectsData)
}

/**
 * Серверный хук для предзагрузки единичного проекта
 */
export const useSSRProject = (id: string) => {
  return useSSRQuery(
    () => getProject(id),
    (queryClient, data) => prefetchProjectData(queryClient, id, data)
  )
}

/**
 * Серверный хук для предзагрузки проектов + единичного проекта
 */
export const useSSRProjectWithList = async (projectId: string) => {
  // Создаем QueryClient для сервера
  const { QueryClient, dehydrate } = await import('@tanstack/react-query')
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: false,
      },
    },
  })
  
  // Получаем данные параллельно
  const [projectsData, projectData] = await Promise.all([
    getProjects(),
    getProject(projectId)
  ])
  
  // Предзагружаем данные в QueryClient
  await Promise.all([
    prefetchProjectsData(queryClient, projectsData),
    prefetchProjectData(queryClient, projectId, projectData)
  ])
  
  // Сериализуем состояние для передачи клиенту
  const dehydratedState = dehydrate(queryClient)
  
  return {
    dehydratedState,
    projectsData,
    projectData
  }
}

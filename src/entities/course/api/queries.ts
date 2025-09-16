import { useQuery, QueryClient } from '@tanstack/react-query'
import { courseQueryKeys } from './constants'
import { getCourses, getCourse } from './api'

/**
 * Хук для получения списка курсов
 */
export const useCourses = () => {
  return useQuery({
    queryKey: courseQueryKeys.courses,
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}

/**
 * Хук для получения единичного курса
 */
export const useCourse = (id: string) => {
  return useQuery({
    queryKey: courseQueryKeys.course(id),
    queryFn: () => getCourse(id),
    enabled: !!id, // Запрос выполняется только если есть id
    staleTime: 1000 * 60 * 10, // 10 минут
  })
}

/**
 * Предзагружает данные курсов в QueryClient
 */
export const prefetchCoursesData = async (queryClient: QueryClient, data: any) => {
  await queryClient.prefetchQuery({
    queryKey: courseQueryKeys.courses,
    queryFn: () => Promise.resolve(data),
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Предзагружает данные единичного курса в QueryClient
 */
export const prefetchCourseData = async (queryClient: QueryClient, id: string, data: any) => {
  await queryClient.prefetchQuery({
    queryKey: courseQueryKeys.course(id),
    queryFn: () => Promise.resolve(data),
    staleTime: 1000 * 60 * 10,
  })
}

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { courseQueryKeys } from './constants'
import { getCourses, getCourse } from './api'
import { useServerQuery } from '@/shared/composables'

/**
 * Хук для получения списка курсов
 */
export const useCoursesQuery = () => {
  return useQuery({
    queryKey: courseQueryKeys.courses,
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}

/**
 * Серверный хук для предзагрузки курсов
 */
export const useCoursesServerQuery = () => {
  return useServerQuery({
    queryKey: courseQueryKeys.courses,
    queryFn: getCourses
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
 * Серверный хук для предзагрузки единичного курса
 */
export const useCourseServerQuery = (id: string) => {
  return useServerQuery({
    queryKey: courseQueryKeys.course(id),
    queryFn: () => getCourse(id)
  })
}

/**
 * Хук для инвалидации кэша курсов
 */
export const useInvalidateCourses = () => {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: courseQueryKeys.courses })
  }
}

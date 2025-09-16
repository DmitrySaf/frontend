import { useSSRQuery } from '@/shared/composables'
import { getCourses, prefetchCoursesData } from '../api'

/**
 * Серверный хук для предзагрузки курсов
 * Используется в серверных компонентах для SSR
 */
export const useSSRCourses = () => {
  return useSSRQuery(getCourses, prefetchCoursesData)
}

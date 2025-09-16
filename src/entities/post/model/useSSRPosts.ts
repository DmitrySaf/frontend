import { useSSRQuery } from '@/shared/composables'
import { getPosts, prefetchPostsData } from '../api'

/**
 * Серверный хук для предзагрузки постов
 * Используется в серверных компонентах для SSR
 */
export const useSSRPosts = () => {
  return useSSRQuery(getPosts, prefetchPostsData)
}

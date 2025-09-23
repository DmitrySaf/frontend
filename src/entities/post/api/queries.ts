import { useQuery, useQueryClient } from '@tanstack/react-query'
import { postQueryKeys } from './constants'
import { getPosts, getPost } from './api'
import { useServerQuery } from '@/shared/composables'

/**
 * Хук для получения списка постов
 */
export const usePostsQuery = () => {
  return useQuery({
    queryKey: postQueryKeys.posts,
    queryFn: getPosts,
    staleTime: 1000 * 60 * 3, // 3 минуты
  })
}

/**
 * Серверный хук для предзагрузки постов
 */
export const usePostsServerQuery = () => {
  return useServerQuery({
    queryKey: postQueryKeys.posts,
    queryFn: getPosts
  })
}

/**
 * Хук для получения единичного поста
 */
export const usePost = (id: string) => {
  return useQuery({
    queryKey: postQueryKeys.post(id),
    queryFn: () => getPost(id),
    enabled: !!id, // Запрос выполняется только если есть id
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}

/**
 * Серверный хук для предзагрузки единичного поста
 */
export const usePostServerQuery = (id: string) => {
  return useServerQuery({
    queryKey: postQueryKeys.post(id),
    queryFn: () => getPost(id)
  })
}

/**
 * Хук для инвалидации кэша постов
 */
export const useInvalidatePosts = () => {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: postQueryKeys.posts })
  }
}

import { useQuery, QueryClient } from '@tanstack/react-query'
import { postQueryKeys } from './constants'
import { getPosts, getPost } from './api'

/**
 * Хук для получения списка постов
 */
export const usePosts = () => {
  return useQuery({
    queryKey: postQueryKeys.posts,
    queryFn: getPosts,
    staleTime: 1000 * 60 * 3, // 3 минуты
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
 * Предзагружает данные постов в QueryClient
 */
export const prefetchPostsData = async (queryClient: QueryClient, data: any) => {
  await queryClient.prefetchQuery({
    queryKey: postQueryKeys.posts,
    queryFn: () => Promise.resolve(data),
    staleTime: 1000 * 60 * 3,
  })
}

/**
 * Предзагружает данные единичного поста в QueryClient
 */
export const prefetchPostData = async (queryClient: QueryClient, id: string, data: any) => {
  await queryClient.prefetchQuery({
    queryKey: postQueryKeys.post(id),
    queryFn: () => Promise.resolve(data),
    staleTime: 1000 * 60 * 5,
  })
}

import { QueryClient, dehydrate, type QueryOptions } from '@tanstack/react-query'

/**
 * Universal hook for SSR with TanStack Query
 * Simplifies creation of server components with data prefetching
 */
export const useServerQuery = async <TData>({
  queryKey,
  queryFn
}: {
  queryKey: NonNullable<QueryOptions['queryKey']>,
  queryFn: QueryOptions['queryFn']
}) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
  })

  const dehydratedState = dehydrate(queryClient)
  
  return {
    dehydratedState
  }
}

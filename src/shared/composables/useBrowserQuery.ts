import { TypedSupabaseClient } from "@/api"
import { createBrowserClient } from "@/api/utils/client"
import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query"

/**
 * Browser query hook with automatic client creation
 */
export const useBrowserQuery = <TData, TError = Error, TTransformed = TData>({
  queryKey,
  queryFn,
  ...options
}: {
  queryKey: NonNullable<QueryOptions['queryKey']>,
  queryFn: (client: TypedSupabaseClient) => Promise<TData>
} & Omit<Parameters<typeof useQuery<TData, TError, TTransformed>>[0], 'queryKey' | 'queryFn'>): UseQueryResult<TTransformed, TError> => {
  const browserClient = createBrowserClient()

  return useQuery({
    queryKey,
    queryFn: () => queryFn(browserClient),
    ...options,
  })
}
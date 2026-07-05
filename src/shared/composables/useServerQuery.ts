"use server";

import type { TypedSupabaseClient } from "@/api";
import { createServerClient } from "@/api/server-client";
import {
  QueryClient,
  type QueryOptions,
  type UseQueryResult,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";

/**
 * Universal hook for SSR with TanStack Query
 * Simplifies creation of server components with data prefetching
 */
export const useServerQuery = async <TData>({
  queryKey,
  queryFn,
}: {
  queryKey: NonNullable<QueryOptions["queryKey"]>;
  queryFn: (client: TypedSupabaseClient) => Promise<TData>;
}) => {
  const queryClient = new QueryClient();

  const serverClient = await createServerClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryFn(serverClient),
    staleTime: 1000 * 60 * 5,
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

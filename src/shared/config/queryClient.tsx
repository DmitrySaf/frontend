"use client";

import { isTransientError } from "@/shared/utils";
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // Ретраим только транзиентные сбои (сеть/таймаут), не бизнес-ошибки PostgREST.
        // Возврат сети сам чинит данные (refetchOnReconnect — дефолт true).
        retry: (failureCount, error) => isTransientError(error) && failureCount < 2,
      },
      // Мутации не ретраим (двойная отправка), но при офлайне ставим в очередь —
      // networkMode 'online' (дефолт) паузит их до восстановления сети
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

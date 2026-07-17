import { isTransientError } from "@/shared/utils";
import { QueryClient } from "@tanstack/react-query";

/**
 * Единая фабрика QueryClient — общие дефолты для клиентского провайдера и серверного
 * префетча (важно для консистентности гидрации: staleTime не даёт клиенту рефетчить
 * сразу после гидрации серверных данных). Без директивы — используется на обеих сторонах.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // Ретраим только транзиентные сбои (сеть/таймаут), не бизнес-ошибки PostgREST
        retry: (failureCount, error) => isTransientError(error) && failureCount < 2,
      },
    },
  });
}

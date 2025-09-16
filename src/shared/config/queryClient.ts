import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Время жизни кэша в миллисекундах (5 минут)
      staleTime: 1000 * 60 * 5,
      // Время хранения неактивных запросов в кэше (10 минут)
      gcTime: 1000 * 60 * 10,
      // Повторные попытки при ошибке
      retry: 1,
      // Повторный запрос при фокусе окна
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Повторные попытки для мутаций
      retry: 0,
    },
  },
})

// Только общие query keys, доменные queryKeys находятся в соответствующих entities/features

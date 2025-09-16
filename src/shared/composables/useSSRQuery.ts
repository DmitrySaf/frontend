import { QueryClient, dehydrate } from '@tanstack/react-query'

/**
 * Универсальный хук для SSR с TanStack Query
 * Упрощает создание серверных компонентов с предзагрузкой данных
 */
export const useSSRQuery = async <TData>(
  apiFunction: () => Promise<TData>,
  prefetchFunction: (queryClient: QueryClient, data: TData) => Promise<void>
) => {
  // Создаем QueryClient для сервера
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: false, // На сервере не повторяем запросы
      },
    },
  })
  
  // Получаем данные на сервере
  const data = await apiFunction()
  
  // Предзагружаем данные в QueryClient
  await prefetchFunction(queryClient, data)
  
  // Сериализуем состояние для передачи клиенту
  const dehydratedState = dehydrate(queryClient)
  
  return {
    dehydratedState,
    data
  }
}

'use client'

import { HydrationBoundary as TanStackHydrationBoundary } from '@tanstack/react-query'
import type { DehydratedState } from '@tanstack/react-query'

interface HydrationBoundaryProps {
  state: DehydratedState
  children: React.ReactNode
}

/**
 * Обертка для гидрирования TanStack Query состояния
 * Используется для передачи серверных данных в клиентские компоненты
 */
export function HydrationBoundary({ state, children }: HydrationBoundaryProps) {
  return (
    <TanStackHydrationBoundary state={state}>
      {children}
    </TanStackHydrationBoundary>
  )
}

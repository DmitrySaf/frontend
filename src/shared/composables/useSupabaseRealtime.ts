"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@/api/browser-client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface UseSupabaseRealtimeOptions<T extends Record<string, any> = Record<string, any>> {
  table: string;
  queryKeys: readonly string[][];
  onInsert?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onUpdate?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onDelete?: (payload: RealtimePostgresChangesPayload<T>) => void;
}

/**
 * Хук для подписки на Supabase realtime изменения
 * Автоматически инвалидирует указанные query keys при изменениях
 */
export const useSupabaseRealtime = <T extends Record<string, any> = Record<string, any>>({
  table,
  queryKeys,
  onInsert,
  onUpdate,
  onDelete,
}: UseSupabaseRealtimeOptions<T>) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(`🔄 [Realtime] Setting up subscription for table: ${table}`);

    const channel = createBrowserClient()
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: table,
        },
        (payload: any) => {
          console.log("✅ [Realtime] INSERT detected:", payload);

          // Инвалидируем кэш
          queryKeys.forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
          });

          // Вызываем пользовательский обработчик
          onInsert?.(payload);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: table,
        },
        (payload: any) => {
          console.log("🔄 [Realtime] UPDATE detected:", payload);

          // Инвалидируем кэш
          queryKeys.forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
          });

          // Вызываем пользовательский обработчик
          onUpdate?.(payload);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: table,
        },
        (payload: any) => {
          console.log("🗑️ [Realtime] DELETE detected:", payload);

          // Инвалидируем кэш
          queryKeys.forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
          });

          // Вызываем пользовательский обработчик
          onDelete?.(payload);
        }
      )
      .subscribe((status) => {
        console.log(`📡 [Realtime] Subscription status for ${table}:`, status);
      });

    // Очистка подписки при размонтировании
    return () => {
      console.log(`🔌 [Realtime] Unsubscribing from table: ${table}`);
      channel.unsubscribe();
    };
  }, [table, queryClient, onInsert, onUpdate, onDelete]);
};

"use client";

import { createBrowserClient } from "@/api/browser-client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface UseSupabaseRealtimeOptions<T extends Record<string, any> = Record<string, any>> {
  table: string;
  queryKeys: readonly string[][];
  /** Фильтр postgres_changes, например `channel_id=eq.<uuid>` */
  filter?: string;
  /** Подписка активна (по умолчанию — да) */
  enabled?: boolean;
  onInsert?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onUpdate?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onDelete?: (payload: RealtimePostgresChangesPayload<T>) => void;
}

/**
 * Хук для подписки на Supabase realtime изменения.
 * Автоматически инвалидирует указанные query keys при изменениях.
 */
export const useSupabaseRealtime = <T extends Record<string, any> = Record<string, any>>({
  table,
  queryKeys,
  filter,
  enabled = true,
  onInsert,
  onUpdate,
  onDelete,
}: UseSupabaseRealtimeOptions<T>) => {
  const queryClient = useQueryClient();

  // queryKeys сериализуем, чтобы не пересоздавать подписку на каждом рендере
  const queryKeysJson = JSON.stringify(queryKeys);

  useEffect(() => {
    if (!enabled) return;

    const parsedQueryKeys = JSON.parse(queryKeysJson) as string[][];

    const invalidate = () => {
      for (const queryKey of parsedQueryKeys) {
        queryClient.invalidateQueries({ queryKey });
      }
    };

    const changeConfig = (event: "INSERT" | "UPDATE" | "DELETE") =>
      ({
        event,
        schema: "public",
        table,
        ...(filter ? { filter } : {}),
      }) as any;

    const channel = createBrowserClient()
      .channel(`${table}-changes-${filter ?? "all"}`)
      .on("postgres_changes", changeConfig("INSERT"), (payload: any) => {
        invalidate();
        onInsert?.(payload);
      })
      .on("postgres_changes", changeConfig("UPDATE"), (payload: any) => {
        invalidate();
        onUpdate?.(payload);
      })
      .on("postgres_changes", changeConfig("DELETE"), (payload: any) => {
        invalidate();
        onDelete?.(payload);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [table, filter, enabled, queryClient, queryKeysJson, onInsert, onUpdate, onDelete]);
};

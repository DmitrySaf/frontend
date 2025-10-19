"use client";

import { useSupabaseRealtime } from "@/shared/composables";
import { projectQueryKeys } from "./constants";
import type { Project } from "./types";

// TODO: для проектов не нужно использовать realtime, но для примера оставил
/**
 * Хук для realtime подписки на изменения в таблице проектов
 * Автоматически инвалидирует кэш проектов при изменениях
 */
export const useProjectsRealtime = () => {
  useSupabaseRealtime<Project>({
    table: "projects",
    queryKeys: [projectQueryKeys.projects],
  });
};

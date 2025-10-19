import { useQueryClient } from "@tanstack/react-query";
import { projectQueryKeys } from "./constants";
import { getProjects, getProject } from "./api";
import { useBrowserQuery } from "@/shared/composables";
import { transformProject } from "../model";

/**
 * Хук для получения списка проектов
 */
export const useProjectsQuery = () => {
  return useBrowserQuery({
    queryKey: projectQueryKeys.projects,
    queryFn: (client) => getProjects(client),
    staleTime: 1000 * 60 * 5, // 5 минут
    select: (data) => data.map(transformProject),
  });
};

/**
 * Хук для получения единичного проекта
 */
export const useProjectQuery = (name: string) => {
  return useBrowserQuery({
    queryKey: projectQueryKeys.project(name),
    queryFn: (client) => getProject(client, name),
    enabled: !!name, // Запрос выполняется только если есть name
    staleTime: 1000 * 60 * 10, // 10 минут
    select: transformProject,
  });
};

/**
 * Хук для инвалидации кэша проектов
 */
export const useInvalidateProjects = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: projectQueryKeys.projects });
  };
};

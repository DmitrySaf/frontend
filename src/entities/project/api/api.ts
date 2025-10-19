import {
  getProjects as _getProjects,
  getProject as _getProject,
  type ProjectResponse,
} from "@/api/projects";
import { type TypedSupabaseClient } from "@/api";
import type { CreateProjectData } from "../model";

/**
 * Получение списка проектов
 */
export const getProjects = async (client: TypedSupabaseClient): Promise<ProjectResponse[]> => {
  const { data, error } = await _getProjects(client);

  return data || [];
};

/**
 * Получение единичного проекта
 */
export const getProject = async (
  client: TypedSupabaseClient,
  name: string
): Promise<ProjectResponse> => {
  const { data, error } = await _getProject(client, name);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Project not found");
  }

  return data;
};

/**
 * Создание нового проекта
 */
export const createProject = async (data: CreateProjectData): Promise<void> => {
  // TODO: Implement with Supabase
  throw new Error("Not implemented yet");
};

/**
 * Удаление проекта
 */
export const deleteProject = async (name: string): Promise<void> => {
  // TODO: Implement with Supabase
  throw new Error("Not implemented yet");
};

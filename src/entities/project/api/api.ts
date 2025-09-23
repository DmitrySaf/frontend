import { apiClient } from '@/shared/config'
import type { CreateProjectData } from '../model'
import type { ProjectResponse } from './types'

/**
 * Получение списка проектов
 */
export const getProjects = async (): Promise<ProjectResponse[]> => {
  const { data } = await apiClient.get('/projects')

  return data
}

/**
 * Получение единичного проекта
 */
export const getProject = async (id: string): Promise<ProjectResponse> => {
  const { data } = await apiClient.get(`/projects/${id}`)

  return data
}

/**
 * Создание нового проекта
 */
export const createProject = async (data: CreateProjectData): Promise<void> => {
  await apiClient.post('/projects', data)
}

/**
 * Удаление проекта
 */
export const deleteProject = async (name: string): Promise<void> => {
  await apiClient.delete(`/projects/${name}`)
}

import { apiClient } from '@/shared/config'
import type { ProjectsResponse, ProjectAPI } from '@/shared/types'
import { sleep } from "@/shared/utils"

/**
 * Получение списка проектов
 */
export const getProjects = async (): Promise<ProjectsResponse> => {
  console.log('🚀 [Client API] Fetching projects list...')
  
  const startTime = Date.now()
  
  try {
    const response = await apiClient.get<ProjectsResponse>('/projects')
    
    const duration = Date.now() - startTime
    console.log(`✅ [Client API] Projects loaded successfully in ${duration}ms:`, response.data?.length || 0)
    
    return response.data
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`❌ [Client API] Failed to load projects after ${duration}ms:`, error)
    throw error
  }
}

/**
 * Получение единичного проекта
 */
export const getProject = async (id: string): Promise<ProjectAPI> => {
  console.log(`🚀 [Client API] Fetching project with id: ${id}...`)
  
  const startTime = Date.now()
  
  try {
    const response = {
      data: {
        displayName: `Project ${id}`,
        name: id,
      },
    }
    
    const duration = Date.now() - startTime
    console.log(`✅ [Client API] Project loaded successfully in ${duration}ms:`, response.data.displayName)
    
    return response.data
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`❌ [Client API] Failed to load project after ${duration}ms:`, error)
    throw error
  }
}

/**
 * Создание нового проекта
 */
export interface CreateProjectData {
  displayName: string
  name: string
}

export const createProject = async (data: CreateProjectData): Promise<ProjectAPI> => {
  console.log('🚀 [Client API] Creating project...', data)
  
  const startTime = Date.now()
  
  try {
    const response = await apiClient.post<ProjectAPI>('/projects', data)
    
    const duration = Date.now() - startTime
    console.log(`✅ [Client API] Project created successfully in ${duration}ms:`, response.data.displayName)
    
    return response.data
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`❌ [Client API] Failed to create project after ${duration}ms:`, error)
    throw error
  }
}

/**
 * Удаление проекта
 */
export const deleteProject = async (name: string): Promise<void> => {
  console.log(`🚀 [Client API] Deleting project with name: ${name}...`)
  
  const startTime = Date.now()
  
  try {
    await apiClient.delete(`/projects/${name}`)
    
    const duration = Date.now() - startTime
    console.log(`✅ [Client API] Project deleted successfully in ${duration}ms`)
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`❌ [Client API] Failed to delete project after ${duration}ms:`, error)
    throw error
  }
}

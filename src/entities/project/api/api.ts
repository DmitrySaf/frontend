import { mockRequest } from '@/shared/utils'
import type { ProjectsResponse, ProjectMock } from '@/shared/types'

/**
 * Получение списка проектов
 */
export const getProjects = async (): Promise<ProjectsResponse> => {
  console.log('🚀 [Client API] Fetching projects list...')
  
  const startTime = Date.now()
  
  try {
    const result = await mockRequest<ProjectsResponse>(
      {
        projects: [
          { 
            id: '1', 
            name: 'Project Alpha', 
            description: 'Первый проект для демонстрации возможностей платформы', 
            status: 'active',
            members: [
              { id: '1', name: 'Алексей Иванов', role: 'owner' },
              { id: '2', name: 'Мария Петрова', role: 'admin' },
              { id: '3', name: 'Дмитрий Сидоров', role: 'member' }
            ]
          },
          { 
            id: '2', 
            name: 'Project Beta', 
            description: 'Второй проект с расширенным функционалом', 
            status: 'completed',
            members: [
              { id: '1', name: 'Алексей Иванов', role: 'owner' },
              { id: '4', name: 'Елена Козлова', role: 'member' }
            ]
          },
          { 
            id: '3', 
            name: 'Project Gamma', 
            description: 'Третий проект в разработке', 
            status: 'in_progress',
            members: [
              { id: '1', name: 'Алексей Иванов', role: 'owner' }
            ]
          }
        ],
        total: 3,
        page: 1,
        limit: 10
      },
      { delay: 900, successRate: 0.95 }
    )
    
    const duration = Date.now() - startTime
    console.log(`✅ [Client API] Projects loaded successfully in ${duration}ms:`, result.projects?.length || 0)
    
    return result
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`❌ [Client API] Failed to load projects after ${duration}ms:`, error)
    throw error
  }
}

/**
 * Получение единичного проекта
 */
export const getProject = async (id: string) => {
  console.log(`🚀 Fetching project with id: ${id}...`)
  
  return mockRequest(
    {
      id,
      name: `Project ${id}`,
      description: `Описание проекта ${id}`,
      status: 'active',
      members: [
        { id: '1', name: 'Участник 1', role: 'owner' },
        { id: '2', name: 'Участник 2', role: 'member' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settings: {
        isPublic: true,
        allowComments: true,
        autoSave: true
      }
    },
    { delay: 600 }
  )
}

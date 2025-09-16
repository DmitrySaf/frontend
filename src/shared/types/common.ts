// Общие типы для всего приложения

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  email: string;
  displayName: string;
  avatar?: string;
}

export interface Project extends BaseEntity {
  displayName: string;
  uniqueName: string;
  description: string;
  ownerId: string;
}

// Расширенные типы для моковых данных
export interface ProjectMock {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'in_progress' | 'archived';
  members?: ProjectMember[];
  settings?: ProjectSettings;
}

export interface ProjectMember {
  id: string;
  name: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface ProjectSettings {
  isPublic: boolean;
  allowComments: boolean;
  autoSave: boolean;
}

// API Response для списка проектов
export interface ProjectsResponse {
  projects: ProjectMock[];
  total: number;
  page: number;
  limit: number;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

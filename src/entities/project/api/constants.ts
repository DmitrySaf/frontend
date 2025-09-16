// Query keys для проектов
export const projectQueryKeys = {
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
} as const

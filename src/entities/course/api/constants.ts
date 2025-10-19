// Query keys для курсов
export const courseQueryKeys = {
  courses: ["courses"] as const,
  course: (id: string) => ["courses", id] as const,
} as const;

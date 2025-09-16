import { useSSRProjects } from "@/entities/project";
import { HydrationBoundary } from "@/shared/components";
import { ProjectList } from "@/pages/project-list";

export default async function ProjectsPage() {
  // Используем новый SSR хук
  const { dehydratedState } = await useSSRProjects();

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectList />
    </HydrationBoundary>
  );
}

// Метаданные страницы
export const metadata = {
  title: 'Мои проекты - ProFound',
  description: 'Список всех ваших проектов в ProFound',
}

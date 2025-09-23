import { useProjectsServerQuery } from "@/entities/project";
import { HydrationBoundary } from "@/shared/components";
import { ProjectList } from "@/pages/project-list";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function ProjectsPage() {
  const { dehydratedState } = await useProjectsServerQuery();

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

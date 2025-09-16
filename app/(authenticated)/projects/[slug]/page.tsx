import { useSSRProjectWithList } from "@/entities/project";
import { HydrationBoundary } from "@/shared/components";
import { ProjectHome } from "@/pages/project-home";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  // Используем новый SSR хук для проекта + списка
  const { dehydratedState } = await useSSRProjectWithList(slug);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectHome />
    </HydrationBoundary>
  );
}

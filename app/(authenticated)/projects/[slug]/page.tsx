import { useProjectServerQuery } from "@/entities/project";
import { HydrationBoundary } from "@/shared/components";
import { ProjectHome } from "@/pages/project-home";
import { createServerClient } from "@/api/server-client";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { dehydratedState } = await useProjectServerQuery(slug);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectHome />
    </HydrationBoundary>
  );
}

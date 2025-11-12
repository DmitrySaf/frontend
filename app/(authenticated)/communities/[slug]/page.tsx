import { useCommunityServerQuery } from "@/entities/community";
import { HydrationBoundary } from "@/shared/components";
import { CommunityHome } from "@/pages/community-home";
import { createServerClient } from "@/api/server-client";

interface CommunityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params;

  const { dehydratedState } = await useCommunityServerQuery(slug);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommunityHome />
    </HydrationBoundary>
  );
}

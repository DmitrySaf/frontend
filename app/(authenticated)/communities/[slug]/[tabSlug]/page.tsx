import { useCommunityServerQuery } from "@/entities/community";
import { HydrationBoundary } from "@/shared/components";
import { CommunityTabContent } from "@/pages/community-home";
import { createServerClient } from "@/api/server-client";

interface CommunityTabPageProps {
  params: Promise<{
    slug: string;
    tabSlug: string;
  }>;
}

export default async function CommunityTabPage({ params }: CommunityTabPageProps) {
  const { slug, tabSlug } = await params;

  const { dehydratedState } = await useCommunityServerQuery(slug);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommunityTabContent tabSlug={tabSlug} />
    </HydrationBoundary>
  );
}

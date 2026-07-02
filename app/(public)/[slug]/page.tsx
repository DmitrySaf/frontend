import { CommunityPreviewPage, getMockCommunityBySlug } from "@/pages/community-preview";
import { notFound } from "next/navigation";

interface CommunityPreviewRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CommunityPreviewRoute({ params }: CommunityPreviewRouteProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // TODO: Replace with actual API call
  const community = getMockCommunityBySlug(decodedSlug);

  if (!community) {
    notFound();
  }

  return <CommunityPreviewPage community={community} />;
}

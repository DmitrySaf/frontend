import { CommunityChannelPage } from "@/pages/community-channel";

interface CommunityTabPageProps {
  params: Promise<{
    slug: string;
    tabSlug: string;
  }>;
}

export default async function CommunityTabPage({ params }: CommunityTabPageProps) {
  const { slug, tabSlug } = await params;

  return <CommunityChannelPage slug={slug} tabSlug={tabSlug} />;
}

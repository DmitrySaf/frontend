import { CommunityFirstChannelRedirect } from "@/pages/community-channel";

interface CommunityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params;

  return <CommunityFirstChannelRedirect slug={slug} />;
}

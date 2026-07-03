import { CommunitySettingsPage } from "@/pages/community-admin";

export default async function AdminSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CommunitySettingsPage slug={slug} />;
}

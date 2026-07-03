import { AppearancePage } from "@/pages/community-admin";

export default async function AdminAppearancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <AppearancePage slug={slug} />;
}

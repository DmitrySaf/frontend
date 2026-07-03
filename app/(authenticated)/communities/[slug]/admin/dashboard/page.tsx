import { DashboardPage } from "@/pages/community-admin";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DashboardPage slug={slug} />;
}

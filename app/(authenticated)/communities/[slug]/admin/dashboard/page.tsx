import { AdminStubPage } from "@/pages/community-admin";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <AdminStubPage slug={slug} title="Дашборд" />;
}

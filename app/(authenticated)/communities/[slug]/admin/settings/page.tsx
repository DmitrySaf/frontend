import { AdminStubPage } from "@/pages/community-admin";

export default async function AdminSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <AdminStubPage slug={slug} title="Настройки сообщества" />;
}

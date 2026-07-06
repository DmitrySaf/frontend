import { CommunityVisitTracker } from "@/entities/community";
import { CommunityShell } from "@/widgets/community-shell";

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <CommunityVisitTracker slug={slug} />
      <CommunityShell slug={slug}>{children}</CommunityShell>
    </>
  );
}

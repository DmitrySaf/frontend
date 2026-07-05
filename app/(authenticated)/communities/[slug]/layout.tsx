import { CommunityVisitTracker } from "@/entities/community";
import { CommunitySidebar } from "@/widgets/community-sidebar";

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex w-full h-full">
      <CommunityVisitTracker slug={slug} />
      <CommunitySidebar slug={slug} />
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}

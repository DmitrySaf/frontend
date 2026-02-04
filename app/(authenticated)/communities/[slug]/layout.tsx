import { CommunitySidebar } from "@/widgets/community-sidebar";
import { CommunityHeader } from "@/widgets/community-header";

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="bg-gray-50 flex w-full">
      <CommunitySidebar slug={slug} />
      <div className="flex-1 flex flex-col">
        <CommunityHeader slug={slug} />
        {children}
      </div>
    </div>
  );
}

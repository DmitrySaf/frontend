import { CommunitySidebar } from "@/widgets/community-sidebar";
import { CommunityHeader } from "@/widgets/community-header";

export default function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className="bg-gray-50 flex">
      <CommunitySidebar slug={params.slug} />
      <div className="flex-1 flex flex-col">
        <CommunityHeader slug={params.slug} />
        {children}
      </div>
    </div>
  );
}

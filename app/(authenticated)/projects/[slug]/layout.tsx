import { ProjectSidebar } from "@/widgets/project-sidebar";
import { ProjectHeader } from "@/widgets/project-header";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className="bg-gray-50 flex">
      <ProjectSidebar slug={params.slug} />
      <div className="flex-1 flex flex-col">
        <ProjectHeader slug={params.slug} />
        {children}
      </div>
    </div>
  );
}

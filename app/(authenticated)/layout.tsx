import { MainSidebar } from "@/widgets/main-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 bg-[#F5F5F5] p-2 h-screen">
      <MainSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 
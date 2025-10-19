import { MainSidebar } from "@/widgets/main-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <MainSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 
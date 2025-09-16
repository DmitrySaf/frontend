import MainSidebar from "@/widgets/main-sidebar/ui/sidebar";
import { AuthProvider } from "@/features/auth";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <MainSidebar />
      <main className="flex-1">
        <AuthProvider>
          {children}
        </AuthProvider>
      </main>
    </div>
  );
} 
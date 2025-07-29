import MainSidebar from "@/components/common/sidebar";
import { AuthProvider } from "@/lib/context/AuthContext";

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
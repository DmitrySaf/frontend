import { MainSidebar } from "@/widgets/main-sidebar";

// Аутентифицированная зона зависит от сессии (cookies) — статический пререндер не имеет смысла
export const dynamic = "force-dynamic";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:gap-2 bg-gray-100 md:p-2 h-dvh">
      {/* Rail на мобиле живёт внутри drawer'а сообщества; модалка создания — здесь (портал) */}
      <div className="hidden md:flex">
        <MainSidebar />
      </div>
      <main className="flex-1 min-w-0">
        <div className="flex justify-center md:rounded-md bg-white border-0 md:border border-solid border-gray-200 flex-1 h-full overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

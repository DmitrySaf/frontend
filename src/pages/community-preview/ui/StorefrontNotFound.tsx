import { PublicHeader } from "./PublicHeader";

/**
 * Единый 404 витрины: hidden-сообщество неотличимо от несуществующего (спецификация
 * приватности). Используется и серверным not-found.tsx (сегментный 404 с корректным
 * HTTP-статусом), и клиентским фолбэком StorefrontPage.
 */
export function StorefrontNotFound({ isAuthed }: { isAuthed: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader isAuthed={isAuthed} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-ink">Страница не найдена</p>
          <p className="text-sm text-gray-600">
            Возможно, ссылка устарела или сообщества не существует.
          </p>
        </div>
      </div>
    </div>
  );
}

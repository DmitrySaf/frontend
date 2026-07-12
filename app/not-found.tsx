import Link from "next/link";

/** Глобальный 404 в стиле Bean (вместо дефолтной страницы Next) */
export default function NotFound() {
  return (
    <div className="min-h-dvh bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-400">
        <p className="text-[64px] leading-none font-bold font-mono text-gray-300">404</p>
        <div className="space-y-1.5">
          <p className="text-2xl font-bold text-black">Страница не найдена</p>
          <p className="text-sm text-gray-600">
            Возможно, ссылка устарела или страницы никогда не существовало.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary-500 px-5 text-sm font-medium text-white shadow transition-[background-color,transform] duration-150 ease-out-quart hover:bg-primary-400 active:scale-[0.98]"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}

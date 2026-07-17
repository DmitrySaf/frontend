import { Skeleton } from "@/shared/components";

/**
 * Нейтральный скелетон экрана канала. Единственный вынесенный фрагмент блока B —
 * он обязан быть пиксельно одинаковым в `[tabSlug]/loading.tsx` (серверный
 * fallback, тип канала ещё неизвестен) и в `CommunityChannelPage` (клиентская
 * ветка загрузки структуры), чтобы handoff loading.tsx → страница → контент
 * не прыгал. Шапка повторяет геометрию `ChannelTitleBar` (h-12, те же отступы).
 */
export function ChannelSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Шапка: иконка + название + пилюля типа — геометрия ChannelTitleBar */}
      <div className="shrink-0 flex items-center gap-2 px-4 md:px-6 h-12 border-b border-gray-200 bg-surface">
        <Skeleton circle width={19} />
        <Skeleton width={140} height={14} radius={6} />
        <Skeleton width={64} height={20} radius={9999} className="ml-1" />
      </div>

      {/* Контентная область: несколько нейтральных блоков */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="max-w-[720px] w-full mx-auto px-4 md:px-6 py-4 md:py-5 space-y-4">
          <Skeleton height={72} radius={14} />
          <Skeleton height={120} radius={14} />
          <Skeleton height={96} radius={14} />
        </div>
      </div>
    </div>
  );
}

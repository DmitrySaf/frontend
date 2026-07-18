import { Skeleton } from "@/shared/components";

/**
 * Каркас публичной витрины — общий для серверного `(public)/[slug]/loading.tsx`
 * и клиентской ветки загрузки `StorefrontPage`. Страница «складывается», а не
 * мигает спиннером.
 */
export function StorefrontSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="h-14 bg-surface border-b border-gray-200" />
      <div className="flex-1 px-4 py-7">
        <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-7">
          <div className="flex-1 min-w-0 space-y-7">
            <Skeleton className="w-full aspect-[21/9]" radius={16} />
            <div className="flex items-center gap-3">
              <Skeleton width={48} height={48} radius={12} />
              <Skeleton width={208} height={24} radius={14} />
            </div>
            <div className="space-y-2.5">
              <Skeleton height={14} radius={4} />
              <Skeleton width="80%" height={14} radius={4} />
              <Skeleton width="66%" height={14} radius={4} />
            </div>
            {/* Мобильный порядок этапа 17.7: карточка тарифов сразу после описания */}
            <Skeleton className="lg:hidden" height={224} radius={16} />
          </div>
          <div className="hidden lg:block w-full lg:w-80 shrink-0 space-y-3.5">
            <Skeleton height={224} radius={16} />
            <Skeleton height={64} radius={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

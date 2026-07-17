import { Skeleton } from "@/shared/components";

/**
 * Каркас админ-раздела: шапка (геометрия AdminShell, h-12) + нейтральное тело.
 * Общий фрагмент — переиспользуется в серверных admin loading.tsx и в
 * role-loading ветке AdminShell, чтобы handoff loading.tsx → страница не прыгал.
 * Тело можно переопределить (дашборд подставляет стат-карты и графики).
 */
export function AdminShellSkeleton({ body }: { body?: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 flex items-center gap-2.5 md:gap-3.5 px-3 md:px-6 h-12 border-b border-gray-200 bg-surface">
        <Skeleton circle width={36} />
        <div className="flex-1 min-w-0 space-y-1.5">
          <Skeleton width={120} height={14} radius={6} />
          <Skeleton width={80} height={10} radius={4} />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {body ?? (
          <div className="p-4 md:p-6 space-y-4 max-w-2xl">
            <Skeleton height={40} radius={10} />
            <Skeleton height={96} radius={12} />
            <Skeleton height={160} radius={16} />
          </div>
        )}
      </div>
    </div>
  );
}

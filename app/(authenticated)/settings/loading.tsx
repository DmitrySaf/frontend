import { Skeleton } from "@/shared/components";

// Между табами настроек сайдбар (settings/layout) сохраняется — скелетится
// только колонка контента: заголовок + ряды формы.
export default function Loading() {
  return (
    <div className="space-y-8">
      <Skeleton width={220} height={28} radius={8} />
      <div className="space-y-5">
        <Skeleton height={44} radius={12} />
        <Skeleton height={44} radius={12} />
        <Skeleton height={96} radius={12} />
        <Skeleton height={44} radius={12} />
      </div>
    </div>
  );
}

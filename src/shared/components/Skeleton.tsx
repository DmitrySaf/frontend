import { cn } from "@/shared/utils";

interface SkeletonProps {
  /** Ширина: число → px, строка → как есть (%, rem…). По умолчанию тянется на 100%. */
  width?: number | string;
  /** Высота: число → px, строка → как есть. */
  height?: number | string;
  /** Радиус скругления, px. По умолчанию 8 (нижняя ступень лестницы контролов). */
  radius?: number | string;
  /** Круг: радиус 9999px; если задан только один размер — второй берётся равным ему. */
  circle?: boolean;
  className?: string;
}

const toDim = (value?: number | string) => (typeof value === "number" ? `${value}px` : value);

/**
 * Единый примитив-скелетон. Без директив и хуков — рендерится и в серверных
 * `loading.tsx`, и в клиентских `isLoading`-ветках. Заливка `gray-200`
 * (сама переворачивается в тёмной теме), пульс — по фону, появление с
 * reveal-задержкой ~120мс: при быстром ответе родитель размонтируется раньше,
 * чем скелетон станет виден, поэтому короткая загрузка не «мигает».
 * Композиции (ряды, карточки, шапки) собираются инлайн из нескольких `<Skeleton>`.
 */
export function Skeleton({ width, height, radius = 8, circle, className }: SkeletonProps) {
  const size = circle ? (width ?? height) : undefined;

  return (
    <div
      aria-hidden
      className={cn("skeleton", className)}
      style={{
        width: toDim(circle ? size : width),
        height: toDim(circle ? size : height),
        borderRadius: circle ? 9999 : toDim(radius),
      }}
    />
  );
}

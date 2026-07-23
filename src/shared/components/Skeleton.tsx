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
 * Скелетон-плейсхолдер. Движок не нужен: весь вид и анимация живут в `.skeleton-reveal`
 * (см. globals.css) — reveal по opacity с задержкой 120мс (быстрый ответ не мигает) плюс
 * мягкий пульс по фону. Раньше был обёрткой над HeroUI Skeleton с погашенной нативной
 * анимацией (`animationType="none"`); HeroUI сюда ничего не давал, поэтому — просто div.
 */
export function Skeleton({ width, height, radius = 8, circle, className }: SkeletonProps) {
  const size = circle ? (width ?? height) : undefined;

  return (
    <div
      aria-hidden
      className={cn("skeleton-reveal", className)}
      style={{
        width: toDim(circle ? size : width),
        height: toDim(circle ? size : height),
        borderRadius: circle ? 9999 : toDim(radius),
      }}
    />
  );
}

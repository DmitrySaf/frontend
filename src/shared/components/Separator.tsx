import { cn } from "@/shared/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

/* Декоративная линия-разделитель. Движок не нужен — стилизованный div. Роль ARIA не ставим:
   для чисто визуального разделителя role="separator" — лишний шум для скринридера, а его
   focusable-interactive требует таб-стоп, которого статичной линии не нужно. Цвет — токен
   --color-border (переворачивается в .dark); толщину/отступы задаёт потребитель через className. */
function Separator({ className, orientation = "horizontal" }: SeparatorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}

export { Separator };

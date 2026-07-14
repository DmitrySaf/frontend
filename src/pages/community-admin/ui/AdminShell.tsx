"use client";

import { useCommunityRole } from "@/entities/member";
import { Button } from "@/shared/components";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminShellProps {
  slug: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Каркас админ-раздела: хедер с «назад», заголовком, подписью «только для
 * админа» и слотом действий
 */
export function AdminShell({ slug, title, subtitle, actions, children }: AdminShellProps) {
  const router = useRouter();
  const { isAdmin } = useCommunityRole(slug);

  // Guard: разделы доступны только админам (в т.ч. в режиме «Смотреть как участник»)
  if (!isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3 max-w-xs text-center animate-in fade-in zoom-in-95 duration-300 ease-out-quart">
          <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
            <ShieldAlert className="size-6 text-gray-500" />
          </div>
          <p className="text-[15px] font-semibold text-ink">Нет доступа</p>
          <p className="text-sm text-gray-600">
            Раздел доступен только администраторам сообщества.
          </p>
          <Button theme="outline" size="l" onClick={() => router.push(`/communities/${slug}`)}>
            Вернуться в сообщество
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 flex items-center gap-2.5 md:gap-3.5 px-3 md:px-6 h-12 border-b border-gray-200 bg-surface">
        <Button
          theme="ghost"
          size="m"
          Icon={ArrowLeft}
          onClick={() => router.push(`/communities/${slug}`)}
          aria-label="Назад к сообществу"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-ink truncate">{title}</p>
          {subtitle && <p className="text-xs text-gray-600 truncate">{subtitle}</p>}
        </div>
        <span className="hidden sm:inline text-[11px] font-medium uppercase tracking-wide text-gray-500">
          только для админа
        </span>
        {actions}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto bg-surface">{children}</div>
    </div>
  );
}

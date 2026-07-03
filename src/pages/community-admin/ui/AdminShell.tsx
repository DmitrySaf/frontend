"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components";

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

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 flex items-center gap-3.5 px-6 py-3 border-b border-gray-200 bg-white">
        <Button
          theme="ghost"
          size="s"
          Icon={ArrowLeft}
          onClick={() => router.push(`/communities/${slug}`)}
          aria-label="Назад к сообществу"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-black truncate">{title}</p>
          {subtitle && <p className="text-xs text-gray-600 truncate">{subtitle}</p>}
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
          только для админа
        </span>
        {actions}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto bg-white">{children}</div>
    </div>
  );
}

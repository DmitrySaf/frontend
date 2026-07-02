"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Hammer } from "lucide-react";
import { Button } from "@/shared/components";

interface AdminStubPageProps {
  slug: string;
  title: string;
}

/**
 * Временная заглушка админ-раздела — реальные экраны появятся на этапе 8
 */
export function AdminStubPage({ slug, title }: AdminStubPageProps) {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 flex items-center gap-3 px-6 py-3 border-b border-gray-200 bg-white">
        <Button
          theme="ghost"
          size="s"
          Icon={ArrowLeft}
          onClick={() => router.push(`/communities/${slug}`)}
          aria-label="Назад к сообществу"
        />
        <span className="text-[15px] font-bold text-black">{title}</span>
        <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-gray-500">
          только для админа
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 max-w-xs text-center">
          <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
            <Hammer className="size-6 text-gray-500" />
          </div>
          <p className="text-[15px] font-semibold text-black">Раздел в разработке</p>
          <p className="text-sm text-gray-600">Появится на этапе админ-разделов.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCommunityStructureQuery } from "@/entities/channel";

/**
 * Вход в сообщество открывает его первый таб (как в Discord — отдельной «Главной» нет)
 */
export function CommunityFirstChannelRedirect({ slug }: { slug: string }) {
  const router = useRouter();
  const { data: structure, isLoading } = useCommunityStructureQuery(slug);

  useEffect(() => {
    if (isLoading || !structure) return;

    const firstChannel =
      structure.uncategorized[0] ??
      structure.categories.flatMap((category) => category.channels)[0];

    if (firstChannel) {
      router.replace(`/communities/${slug}/${firstChannel.slug}`);
    }
  }, [isLoading, structure, router, slug]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <Loader2 className="size-6 animate-spin text-gray-500" />
    </div>
  );
}

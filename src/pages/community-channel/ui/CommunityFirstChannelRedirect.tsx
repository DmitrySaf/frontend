"use client";

import { pickFirstChannel, useCommunityStructureQuery } from "@/entities/channel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChannelSkeleton } from "./ChannelSkeleton";

/**
 * Вход в сообщество открывает его первый таб (как в Discord — отдельной «Главной» нет)
 */
export function CommunityFirstChannelRedirect({ slug }: { slug: string }) {
  const router = useRouter();
  const { data: structure, isLoading } = useCommunityStructureQuery(slug);

  useEffect(() => {
    if (isLoading || !structure) return;

    const firstChannel = pickFirstChannel(structure);
    if (firstChannel) {
      router.replace(`/communities/${slug}/${firstChannel.slug}`);
    }
  }, [isLoading, structure, router, slug]);

  return <ChannelSkeleton />;
}

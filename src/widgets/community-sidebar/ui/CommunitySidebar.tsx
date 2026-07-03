"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCommunityProfileQuery } from "@/entities/community";
import {
  useCommunityStructureQuery,
  useCreateChannelMutation,
  type CreateChannelFormData,
} from "@/entities/channel";
import { DeleteDialog } from "@/shared/components";
import { ChannelCreateModal } from "@/widgets/channel-create-modal";
import CategorySection from "./CategorySection";
import ChannelRow from "./ChannelRow";
import CommunityBanner from "./CommunityBanner";
import InviteDialog from "./InviteDialog";

interface CommunitySidebarProps {
  slug: string;
}

function StructureSkeleton() {
  return (
    <div className="p-3 space-y-3 animate-pulse">
      <div className="h-3 w-20 rounded bg-gray-100" />
      <div className="h-8 rounded-[9px] bg-gray-100" />
      <div className="h-8 rounded-[9px] bg-gray-100" />
    </div>
  );
}

export default function CommunitySidebar({ slug }: CommunitySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: community } = useCommunityProfileQuery(slug);
  const { data: structure, isLoading } = useCommunityStructureQuery(slug);
  const createChannel = useCreateChannelMutation();

  // TODO(этап 11): роль из community_members; пока все пользователи — владельцы
  const isAdmin = true;
  const canLeave = false;

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [createChannelCategoryId, setCreateChannelCategoryId] = useState<string | null>(null);

  const activeTabSlug = pathname?.split("/")[3];

  const handleCreateChannel = async (data: CreateChannelFormData) => {
    const channel = await createChannel.mutateAsync({
      communitySlug: slug,
      type: data.type,
      name: data.name,
      categoryId: data.categoryId,
      newCategoryName: data.newCategoryName?.trim() || undefined,
    });
    router.push(`/communities/${slug}/${channel.slug}`);
  };

  const handleLeave = async () => {
    // TODO(этап 9): удаление membership из mock-store
    toast.success("Вы покинули сообщество");
    router.push("/communities");
  };

  return (
    <div className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      <CommunityBanner
        name={community?.displayName ?? slug}
        coverUrl={community?.coverUrl}
        logoUrl={community?.logoUrl}
        isAdmin={isAdmin}
        canLeave={canLeave}
        onOpenAdminSection={(section) => router.push(`/communities/${slug}/admin/${section}`)}
        onInvite={() => setIsInviteOpen(true)}
        onLeave={() => setIsLeaveOpen(true)}
      />

      <div className="flex-1 overflow-y-auto px-2.5 pb-3">
        {isLoading || !structure ? (
          <StructureSkeleton />
        ) : (
          <>
            {structure.uncategorized.length > 0 && (
              <nav className="pt-2 space-y-0.5">
                {structure.uncategorized.map((channel) => (
                  <ChannelRow
                    key={channel.id}
                    channel={channel}
                    communitySlug={slug}
                    isActive={channel.slug === activeTabSlug}
                  />
                ))}
              </nav>
            )}

            {structure.categories.map((category) => (
              <CategorySection
                key={category.id}
                name={category.name}
                canAddChannel={isAdmin}
                onAddChannel={() => setCreateChannelCategoryId(category.id)}
              >
                {category.channels.map((channel) => (
                  <ChannelRow
                    key={channel.id}
                    channel={channel}
                    communitySlug={slug}
                    isActive={channel.slug === activeTabSlug}
                  />
                ))}
              </CategorySection>
            ))}
          </>
        )}
      </div>

      <InviteDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        communitySlug={slug}
      />

      <DeleteDialog
        isOpen={isLeaveOpen}
        onClose={() => setIsLeaveOpen(false)}
        onDelete={handleLeave}
        title="Покинуть сообщество?"
        description="Вы потеряете доступ к контенту сообщества. Вернуться можно будет по приглашению или через публичную страницу."
        confirmText="Покинуть"
      />

      <ChannelCreateModal
        isOpen={createChannelCategoryId !== null}
        onClose={() => setCreateChannelCategoryId(null)}
        onSubmit={handleCreateChannel}
        categories={structure?.categories ?? []}
        defaultCategoryId={createChannelCategoryId ?? undefined}
      />
    </div>
  );
}

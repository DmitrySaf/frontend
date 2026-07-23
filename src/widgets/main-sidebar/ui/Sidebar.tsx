"use client";

import {
  type CreateCommunityData,
  useCommunitiesQuery,
  useCommunityLogosQuery,
  useCreateCommunityMutation,
} from "@/entities/community";
import { Button, LogoTile, ThemeToggle, Tooltip } from "@/shared/components";
import { CommunityCreateModal } from "@/widgets/community-create-modal";
import { PlusBold16 } from "@frosted-ui/icons";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import { CommunityRailTile } from "./CommunityRailTile";
import ProfileButton from "./ProfileButton";

interface MainSidebarProps {
  /** false — в мобильном drawer'е: модалка создания рендерится только в основном инстансе */
  withCreateModal?: boolean;
}

export default function MainSidebar({ withCreateModal = true }: MainSidebarProps) {
  const { data: communities } = useCommunitiesQuery();
  const { data: communityLogos } = useCommunityLogosQuery();
  const params = useParams();
  const router = useRouter();
  const activeCommunitySlug = params?.slug as string | undefined;

  const [createParam, setCreateParam] = useQueryState("create");
  const isCreateModalOpen = createParam === "community";

  const createCommunity = useCreateCommunityMutation();

  const handleCloseCreateModal = useCallback(() => {
    setCreateParam(null);
  }, [setCreateParam]);

  const handleCreateCommunity = useCallback(
    async (data: CreateCommunityData) => {
      await createCommunity.mutateAsync(data);
      router.push(`/communities/${data.name}`);
    },
    [createCommunity, router]
  );

  return (
    <>
      {withCreateModal && (
        <CommunityCreateModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onSubmit={handleCreateCommunity}
        />
      )}
      <div className="w-15 flex flex-col">
        <div className="flex-1 flex flex-col gap-3 w-12 self-center">
          <Link
            href="/communities"
            aria-label="Bean — все сообщества"
            className="transition-transform duration-150 ease-out-quart hover:scale-[1.04] active:scale-95"
          >
            <LogoTile size={48} />
          </Link>
          {/* Хайрлайн отделяет знак от списка сообществ — паттерн рейла Discord.
              Обводки плитки мало: без разделителя знак читается как первое сообщество. */}
          <div aria-hidden="true" className="h-px bg-gray-200" />
          <div className="flex flex-col gap-2">
            {communities?.map((community) => (
              <CommunityRailTile
                key={community.name}
                slug={community.name}
                displayName={community.displayName}
                logoUrl={communityLogos?.[community.name]}
                isActive={activeCommunitySlug === community.name}
              />
            ))}
            <Tooltip content="Создать сообщество" side="right">
              <Button
                theme="primary"
                size="xl"
                Icon={PlusBold16}
                aria-label="Создать сообщество"
                onClick={() => setCreateParam("community")}
              />
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 pb-1">
          <ThemeToggle />
          <ProfileButton />
        </div>
      </div>
    </>
  );
}

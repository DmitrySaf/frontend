"use client";

import {
  type CreateCommunityData,
  useCommunitiesQuery,
  useCommunityLogosQuery,
  useCreateCommunityMutation,
} from "@/entities/community";
import { Avatar, Button, Tooltip } from "@/shared/components";
import { CommunityCreateModal } from "@/widgets/community-create-modal";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
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
          <Link href="/communities">
            <Image src="/logo.svg" alt="Bean" width={48} height={48} priority />
          </Link>
          <div className="flex flex-col gap-2">
            {communities?.map((community) => {
              const isActive = activeCommunitySlug === community.name;
              return (
                <Tooltip key={community.name} content={community.displayName} side="right">
                  <Link
                    href={`/communities/${community.name}`}
                    className="relative block transition-transform duration-150 ease-out-quart hover:scale-[1.04] active:scale-95"
                  >
                    <Avatar
                      name={community.displayName}
                      src={communityLogos?.[community.name]}
                      size="l"
                      shape="square"
                      className="shadow-sm"
                    />
                    {isActive && (
                      <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-[3px] h-3.5 bg-black rounded-r-[4px] animate-in fade-in zoom-in-50 duration-200 ease-out-quart" />
                    )}
                  </Link>
                </Tooltip>
              );
            })}
            <Tooltip content="Создать сообщество" side="right">
              <Button
                theme="primary"
                size="l"
                Icon={Plus}
                aria-label="Создать сообщество"
                onClick={() => setCreateParam("community")}
              />
            </Tooltip>
          </div>
        </div>

        <ProfileButton />
      </div>
    </>
  );
}

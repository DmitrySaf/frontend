"use client";

import { useCreateCommunityMutation, useCommunitiesQuery, type CreateCommunityData } from "@/entities/community";
import { Button } from "@/shared/components";
import { CommunityCreateModal } from "@/widgets/community-create-modal";
import { MessageCircleMore, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import ProfileButton from "./ProfileButton";

export default function MainSidebar() {
  const { data: communities, isLoading, error } = useCommunitiesQuery();
  const params = useParams();
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
    },
    [createCommunity]
  );

  return (
    <>
      <CommunityCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateCommunity}
      />
      <div className="w-15 flex flex-col">
        <div className="flex-1 flex flex-col gap-3 w-12 self-center">
          <Image src="/logo.svg" alt="VK" width={48} height={48} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Button
                theme="ghost"
                size="l"
                Icon={MessageCircleMore}
              />
              <Button
                theme="ghost"
                size="l"
                Icon={Search}
              />
            </div>
            {communities?.map((community) => {
              const isActive = activeCommunitySlug === community.name;
              return (
                <Link
                  key={community.name}
                  href={`/communities/${community.name}`}
                  className="relative"
                >
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
                    🐼
                  </div>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1 h-3 bg-black rounded-r-[4px]" />
                  )}
                </Link>
              );
            })}
            <Button
              theme="primary"
              size="l"
              Icon={Plus}
              onClick={() => setCreateParam("community")}
            />
          </div>
        </div>
        
        <ProfileButton />
      </div>
    </>
  );
}

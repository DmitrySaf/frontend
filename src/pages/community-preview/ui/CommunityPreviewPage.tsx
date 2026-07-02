"use client";

import { useState } from "react";
import { useProfileQuery } from "@/entities/profile";
import { PublicHeader } from "./PublicHeader";
import { MediaCarousel } from "./MediaCarousel";
import { PricingCard } from "./PricingCard";
import { AuthorCard } from "./AuthorCard";
import { AuthRequiredDialog } from "./AuthRequiredDialog";
import type { CommunityPreview } from "../model";

interface CommunityPreviewPageProps {
  community: CommunityPreview;
}

export const CommunityPreviewPage = ({ community }: CommunityPreviewPageProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { data: profile } = useProfileQuery();

  const handleJoin = (selectedTierId?: string) => {
    if (!profile) {
      setShowAuthDialog(true);
      return;
    }

    // TODO: Implement actual join logic with selectedTierId
    console.log("Joining community with tier:", selectedTierId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <MediaCarousel media={community.media} />

            <div className="mt-8">
              <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
              <p className="mt-4 whitespace-pre-line text-gray-600">{community.description}</p>
            </div>
          </div>

          <div className="w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              <PricingCard
                isFree={community.isFree}
                pricingTiers={community.pricingTiers}
                memberCount={community.memberCount}
                onJoin={handleJoin}
              />
              <AuthorCard author={community.author} />
            </div>
          </div>
        </div>
      </main>

      <AuthRequiredDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  );
};

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCommunityProfileQuery } from "@/entities/community";
import {
  STOREFRONT_FEATURE_ICONS,
  DEFAULT_FEATURE_ICON,
  useStorefrontQuery,
} from "@/entities/storefront";
import { useTiersQuery, type Tier } from "@/entities/tier";
import {
  joinCommunity,
  useMyMembershipQuery,
  useInvalidateMyMembership,
} from "@/entities/member";
import { consumeInvite, useInviteValidationQuery } from "@/entities/invite";
import {
  purchaseTier,
  useCommunityMembersCountQuery,
  useInvalidateCommunitySales,
} from "@/entities/subscription";
import { useAuthUserQuery } from "@/entities/profile";
import { setLastVisitedCommunity } from "@/entities/community";
import { Avatar } from "@/shared/components";
import { AuthRequiredDialog } from "./AuthRequiredDialog";
import { CheckoutModal } from "./CheckoutModal";
import { MediaCarousel } from "./MediaCarousel";
import { PricingCard } from "./PricingCard";
import { PublicHeader } from "./PublicHeader";

interface StorefrontPageProps {
  slug: string;
  inviteCode: string | null;
}

function getFeatureIcon(name: string) {
  return (STOREFRONT_FEATURE_ICONS[name] ?? STOREFRONT_FEATURE_ICONS[DEFAULT_FEATURE_ICON]).icon;
}

/** Единообразный 404: hidden-сообщество неотличимо от несуществующего */
function NotFoundScreen({ isAuthed }: { isAuthed: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader isAuthed={isAuthed} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-black">Страница не найдена</p>
          <p className="text-sm text-gray-600">
            Возможно, ссылка устарела или сообщества не существует.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="size-6 animate-spin text-gray-500" />
    </div>
  );
}

export function StorefrontPage({ slug, inviteCode }: StorefrontPageProps) {
  const router = useRouter();

  const { data: authUser, isLoading: isAuthLoading } = useAuthUserQuery();
  const isAuthed = !!authUser?.email;

  const { data: profile, isLoading: isProfileLoading, isError } = useCommunityProfileQuery(slug);
  const { data: storefront } = useStorefrontQuery(slug);
  const { data: tiers } = useTiersQuery(slug);
  const { data: membership, isLoading: isMembershipLoading } = useMyMembershipQuery(slug);
  const { data: inviteValidity } = useInviteValidationQuery(slug, inviteCode);
  const { data: membersCount } = useCommunityMembersCountQuery(slug);

  const invalidateMembership = useInvalidateMyMembership();
  const invalidateSales = useInvalidateCommunitySales();

  const validInvite = inviteValidity ?? null;
  const hasValidInvite = !!validInvite;
  const isMember = isAuthed && !!membership;

  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Скрытые тарифы видны только по валидной инвайт-ссылке
  const visibleTiers = useMemo(
    () => (tiers ?? []).filter((tier) => tier.isActive && (!tier.isHidden || hasValidInvite)),
    [tiers, hasValidInvite]
  );
  const selectedTier: Tier | null =
    visibleTiers.find((tier) => tier.id === selectedTierId) ?? null;

  if (isProfileLoading || isAuthLoading || (isAuthed && isMembershipLoading)) {
    return <LoadingScreen />;
  }

  // Несуществующее сообщество и hidden без доступа — один и тот же экран
  const accessDenied =
    isError ||
    !profile ||
    (profile.visibility === "hidden" && !hasValidInvite && !isMember);

  if (accessDenied) {
    return <NotFoundScreen isAuthed={isAuthed} />;
  }

  const media = storefront?.media?.length
    ? storefront.media
    : profile.coverUrl
      ? [profile.coverUrl]
      : [];

  const finalizeJoin = async (tier: Tier | null) => {
    setIsJoining(true);
    try {
      const alreadyMember = !!membership;

      if (tier) {
        await purchaseTier(slug, {
          id: tier.id,
          kind: tier.kind,
          priceKopeks: tier.priceKopeks,
          periodMonths: tier.periodMonths,
          name: tier.name,
        });
      }
      await joinCommunity(slug);

      // Использование инвайта тратится только вступлением новичка
      if (validInvite && !alreadyMember) {
        await consumeInvite(validInvite.id);
      }

      invalidateMembership(slug);
      invalidateSales(slug);
      setLastVisitedCommunity(slug);

      toast.success(tier ? "Оплата прошла — добро пожаловать" : "Добро пожаловать в сообщество");
      router.push(`/communities/${slug}`);
    } catch (error) {
      toast.error("Не удалось вступить в сообщество", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    } finally {
      setIsJoining(false);
      setIsCheckoutOpen(false);
    }
  };

  const handleJoinClick = () => {
    if (!isAuthed) {
      setIsAuthDialogOpen(true);
      return;
    }
    if (selectedTier) {
      setIsCheckoutOpen(true);
    } else {
      finalizeJoin(null);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthDialogOpen(false);
    // После входа продолжаем начатое действие
    if (selectedTier) {
      setIsCheckoutOpen(true);
    } else {
      finalizeJoin(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader isAuthed={isAuthed} />

      <div className="flex-1 px-4 py-7">
        <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-7">
          {/* Основная колонка */}
          <div className="flex-1 min-w-0">
            <MediaCarousel media={media} alt={profile.displayName} />

            <div className="mt-7 flex items-center gap-3">
              <Avatar name={profile.displayName} src={profile.logoUrl} size="l" shape="square" />
              <h1 className="text-[26px] font-bold text-black leading-tight">
                {profile.displayName}
              </h1>
            </div>

            {(storefront?.description || profile.description) && (
              <p className="mt-3.5 text-[15px] leading-[1.6] text-gray-600 whitespace-pre-wrap">
                {storefront?.description || profile.description}
              </p>
            )}

            {storefront && storefront.features.length > 0 && (
              <div className="mt-7 space-y-3">
                <h3 className="text-[17px] font-bold text-black">Что внутри</h3>
                {storefront.features.map((feature, index) => {
                  const Icon = getFeatureIcon(feature.icon);
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="size-9 shrink-0 rounded-[10px] bg-white border border-gray-200 flex items-center justify-center">
                        <Icon className="size-[18px] text-gray-600" />
                      </div>
                      <span className="text-sm text-black">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Правая колонка */}
          <div className="w-full lg:w-80 shrink-0 space-y-3.5">
            <PricingCard
              tiers={visibleTiers}
              selectedTierId={selectedTierId}
              onSelectTier={setSelectedTierId}
              isMember={isMember}
              membersCount={membersCount ?? 0}
              onJoin={handleJoinClick}
              onOpenCommunity={() => router.push(`/communities/${slug}`)}
              isJoining={isJoining}
            />

            {/* Карточка автора */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-3.5 flex items-center gap-3">
              <Avatar name={profile.displayName} src={profile.logoUrl} size="m" shape="square" />
              <div>
                <p className="text-sm font-semibold text-black">{profile.displayName}</p>
                <p className="text-xs text-gray-600">Сообщество на Bean</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthRequiredDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        communityName={profile.displayName}
        tier={selectedTier}
        onConfirm={() => finalizeJoin(selectedTier)}
        isPending={isJoining}
      />
    </div>
  );
}

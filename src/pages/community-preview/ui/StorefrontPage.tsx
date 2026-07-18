"use client";

import { setLastVisitedCommunity } from "@/entities/community";
import { consumeInvite } from "@/entities/invite";
import { joinCommunity, useInvalidateMyMembership } from "@/entities/member";
import { useAuthUserQuery } from "@/entities/profile";
import {
  DEFAULT_FEATURE_ICON,
  STOREFRONT_FEATURE_ICONS,
  storefrontQueryKeys,
  useStorefrontViewQuery,
} from "@/entities/storefront";
import { purchaseTier, useInvalidateCommunitySales } from "@/entities/subscription";
import { type Tier, formatTierPrice } from "@/entities/tier";
import { Avatar } from "@/shared/components";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { AuthRequiredDialog } from "./AuthRequiredDialog";
import { CheckoutModal } from "./CheckoutModal";
import { MediaCarousel } from "./MediaCarousel";
import { PricingCard } from "./PricingCard";
import { PublicHeader } from "./PublicHeader";
import { StorefrontCtaBar } from "./StorefrontCtaBar";
import { StorefrontNotFound } from "./StorefrontNotFound";
import { StorefrontSkeleton } from "./StorefrontSkeleton";

interface StorefrontPageProps {
  slug: string;
  inviteCode: string | null;
}

function getFeatureIcon(name: string) {
  return (STOREFRONT_FEATURE_ICONS[name] ?? STOREFRONT_FEATURE_ICONS[DEFAULT_FEATURE_ICON]).icon;
}

export function StorefrontPage({ slug, inviteCode }: StorefrontPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Auth грузится клиентом и НЕ гейтит рендер: иначе SSR (где auth ещё не известен)
  // отдавал бы скелетон вместо контента, ломая SEO. isAuthed=false до загрузки —
  // анонимный вид (основной зритель витрины); авторизованный обновится за <100мс.
  const { data: authUser } = useAuthUserQuery();
  const isAuthed = !!authUser?.email;

  // Вся витрина приходит одним RPC-запросом (SSR-предзагрузка → гидрация): сервер
  // сам решает, доступна ли страница (hidden без инвайта → null → 404 на сервере)
  const { data: view, isLoading: isViewLoading } = useStorefrontViewQuery(slug, inviteCode);

  const invalidateMembership = useInvalidateMyMembership();
  const invalidateSales = useInvalidateCommunitySales();

  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Липкий CTA-бар (мобиле): виден, пока карточка тарифов за пределами экрана
  const mobilePricingRef = useRef<HTMLDivElement>(null);
  const [isPricingOnScreen, setIsPricingOnScreen] = useState(true);

  const validInvite = view?.invite?.valid ? view.invite : null;
  // Членство берём из серверного viewer (посчитан RPC с куками зрителя) — авторитетно
  // и доступно сразу после гидрации, без ожидания клиентского auth (иначе член видел
  // бы «Присоединиться» до загрузки auth). isAuthed гейтит только флоу вступления ниже.
  const isMember = !!view?.viewer.isMember;

  // Тарифы уже отфильтрованы сервером (скрытые — только по валидному инвайту)
  const visibleTiers: Tier[] = useMemo(
    () =>
      (view?.tiers ?? []).map((tier) => ({
        id: tier.id,
        name: tier.name,
        kind: tier.kind,
        priceKopeks: tier.priceKopeks,
        periodMonths: tier.periodMonths,
        discountPercent: tier.discountPercent,
        isActive: true,
        isHidden: tier.isHidden,
        position: tier.position,
      })),
    [view?.tiers]
  );
  const selectedTier: Tier | null = visibleTiers.find((tier) => tier.id === selectedTierId) ?? null;

  // Наблюдатель до ранних return'ов (правило хуков). Зависимость от view:
  // при CSR-фолбэке карточка (и ref) появляется только после загрузки данных
  // biome-ignore lint/correctness/useExhaustiveDependencies: view — триггер появления ref после загрузки
  useEffect(() => {
    const el = mobilePricingRef.current;
    if (!el) return;
    // Порог 0.5: бар выходит, когда карточка видна меньше чем наполовину —
    // верхний «хвост» карточки без CTA-кнопки не считается «картой на экране»
    const observer = new IntersectionObserver(
      ([entry]) => setIsPricingOnScreen(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [view]);

  if (isViewLoading) {
    return <StorefrontSkeleton />;
  }

  // Несуществующее сообщество и hidden без доступа — один и тот же экран
  if (!view) {
    return <StorefrontNotFound isAuthed={isAuthed} />;
  }

  const { community, storefront, owner } = view;

  const media = storefront.media.length
    ? storefront.media
    : community.coverUrl
      ? [community.coverUrl]
      : [];

  const finalizeJoin = async (tier: Tier | null) => {
    setIsJoining(true);
    try {
      if (tier) {
        // Подписка + транзакция + membership + трата инвайта — атомарно на сервере
        await purchaseTier(
          slug,
          {
            id: tier.id,
            kind: tier.kind,
            priceKopeks: tier.priceKopeks,
            periodMonths: tier.periodMonths,
            name: tier.name,
          },
          validInvite?.code ?? null
        );
      } else if (validInvite) {
        // Бесплатное вступление по инвайту: membership + грант канала одним действием
        await consumeInvite(validInvite.code);
      } else {
        await joinCommunity(slug);
      }

      invalidateMembership(slug);
      invalidateSales(slug);
      queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.view(slug, inviteCode) });
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
    queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.view(slug, inviteCode) });
    // После входа продолжаем начатое действие
    if (selectedTier) {
      setIsCheckoutOpen(true);
    } else {
      finalizeJoin(null);
    }
  };

  const handleOpenCommunity = async () => {
    // Действующий участник по каналу-инвайту получает грант при открытии
    if (validInvite?.channelId) {
      try {
        await consumeInvite(validInvite.code);
      } catch {
        // Грант не критичен для входа — открываем сообщество в любом случае
      }
    }
    router.push(`/communities/${slug}`);
  };

  // Липкий бар: цена выбранного тарифа, иначе «от минимальной»; тап без выбранного
  // тарифа скроллит к карточке — не навязываем покупку вслепую
  const cheapestTier = visibleTiers.length
    ? visibleTiers.reduce((min, tier) => (tier.priceKopeks < min.priceKopeks ? tier : min))
    : null;
  const barPrice = isMember
    ? null
    : selectedTier
      ? formatTierPrice(selectedTier)
      : cheapestTier
        ? `от ${formatTierPrice(cheapestTier)}`
        : "Бесплатно";
  const barLabel = isMember
    ? "Открыть сообщество"
    : visibleTiers.length && !selectedTier
      ? "Выбрать тариф"
      : "Присоединиться";
  const handleBarClick = () => {
    if (isMember) {
      handleOpenCommunity();
      return;
    }
    if (visibleTiers.length && !selectedTier) {
      mobilePricingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    handleJoinClick();
  };

  const pricingCard = (
    <PricingCard
      tiers={visibleTiers}
      selectedTierId={selectedTierId}
      onSelectTier={setSelectedTierId}
      isMember={isMember}
      membersCount={view.membersCount}
      onJoin={handleJoinClick}
      onOpenCommunity={handleOpenCommunity}
      isJoining={isJoining}
    />
  );

  const authorCard = (
    <div className="rounded-2xl border border-gray-200 bg-surface shadow-sm p-3.5 flex items-center gap-3">
      <Avatar
        name={owner?.displayName ?? community.displayName}
        src={owner?.avatarUrl ?? community.logoUrl}
        size="m"
        shape={owner ? "circle" : "square"}
      />
      <div>
        <p className="text-sm font-semibold text-ink">
          {owner?.displayName ?? community.displayName}
        </p>
        <p className="text-xs text-gray-600">
          {owner ? "Автор сообщества" : "Сообщество на Bean"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader isAuthed={isAuthed} />

      {/* pb-28: под мобильный липкий CTA-бар, чтобы карточка автора не пряталась за ним */}
      <div className="flex-1 px-4 pt-7 pb-28 lg:pb-7">
        <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-7 animate-in fade-in slide-in-from-bottom-2 duration-400 ease-out-quart">
          {/* Основная колонка */}
          <div className="flex-1 min-w-0">
            <MediaCarousel media={media} alt={community.displayName} />

            <div className="mt-7 flex items-center gap-3">
              <Avatar
                name={community.displayName}
                src={community.logoUrl}
                size="l"
                shape="square"
              />
              <h1 className="text-[26px] font-bold text-ink leading-tight">
                {community.displayName}
              </h1>
            </div>

            {(storefront.description || community.description) && (
              <p className="mt-3.5 text-[15px] leading-[1.6] text-gray-600 whitespace-pre-wrap">
                {storefront.description || community.description}
              </p>
            )}

            {/* Вступление на мобиле — сразу после описания, выше «Что внутри»:
                решение этапа 17.7 (раньше карточка падала в самый низ страницы) */}
            <div ref={mobilePricingRef} className="mt-6 lg:hidden">
              {pricingCard}
            </div>

            {storefront.features.length > 0 && (
              <div className="mt-7 space-y-3">
                <h3 className="text-[17px] font-bold text-ink">Что внутри</h3>
                {storefront.features.map((feature, index) => {
                  const Icon = getFeatureIcon(feature.icon);
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="size-9 shrink-0 rounded-[10px] bg-surface border border-gray-200 flex items-center justify-center">
                        <Icon className="size-[18px] text-gray-600" />
                      </div>
                      <span className="text-sm text-ink">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Автор — на мобиле замыкает поток */}
            <div className="mt-6 lg:hidden">{authorCard}</div>
          </div>

          {/* Правая колонка (только lg+): CTA остаётся на виду при скролле */}
          <div className="hidden lg:block w-full lg:w-80 shrink-0 space-y-3.5 lg:sticky lg:top-6 lg:self-start">
            {pricingCard}
            {authorCard}
          </div>
        </div>
      </div>

      <StorefrontCtaBar
        show={!isPricingOnScreen}
        price={barPrice}
        tierName={!isMember && selectedTier ? selectedTier.name : null}
        label={barLabel}
        onClick={handleBarClick}
        isJoining={isJoining}
      />

      <AuthRequiredDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        communityName={community.displayName}
        tier={selectedTier}
        onConfirm={() => finalizeJoin(selectedTier)}
        isPending={isJoining}
      />
    </div>
  );
}

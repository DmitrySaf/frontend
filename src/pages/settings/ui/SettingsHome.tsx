"use client";

import { createBrowserClient } from "@/api/browser-client";
import { useProfileQuery } from "@/entities/profile";
import { useMyVerificationQuery } from "@/entities/verification";
import { Avatar } from "@/shared/components";
import { SETTINGS_SECTIONS } from "@/widgets/settings-sidebar";
import { ArrowLeftBold20, ChevronRightBold16, LogoutBold20, SealCheckmarkBold16 } from "@frosted-ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Мобильный корень настроек — iOS-паттерн «экран-список»: профиль сверху,
 * сгруппированный список секций, выход отдельной группой. Секция открывается
 * отдельным экраном с «‹ Настройки» (шапка в layout). На десктопе корень
 * не существует — сразу редирект в первую секцию (сайдбар уже показывает всё).
 */
export function SettingsHome() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const { data: profile } = useProfileQuery();
  const { data: verification } = useMyVerificationQuery();
  const isVerified = verification?.status === "approved";

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      router.replace("/settings/profile");
    }
  }, [router]);

  // «Назад» = иерархический возврат туда, откуда пришли; пустая история
  // (прямая ссылка) — к резолверу сообществ
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/communities");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Назад"
        className="touch-hit -ml-2 size-9 flex items-center justify-center rounded-[10px] text-gray-600 hover:bg-gray-100 active:scale-90 transition-[background-color,transform] duration-150 ease-out-quart cursor-pointer"
      >
        <ArrowLeftBold20 className="size-5" />
      </button>

      <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">Настройки</h1>

      {/* Профиль сессии — как в шапке десктопного сайдбара */}
      <div className="mt-5 flex items-center gap-3.5">
        <Avatar
          name={profile?.displayName ?? ""}
          src={profile?.avatarUrl}
          size="l"
          shape="circle"
          className="size-14"
        />
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-bold text-gray-900">
            <span className="min-w-0 truncate">{profile?.displayName ?? "…"}</span>
            {isVerified && <SealCheckmarkBold16 className="size-4 shrink-0 text-primary-600" />}
          </p>
          {profile?.username && (
            <p className="truncate text-sm text-gray-500">@{profile.username}</p>
          )}
        </div>
      </div>

      {/* Группа секций */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-surface overflow-hidden divide-y divide-gray-200">
        {SETTINGS_SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={`/settings/${section.id}`}
            className="flex items-center gap-3 min-h-12 px-4 active:bg-gray-100 transition-colors duration-150"
          >
            <section.icon className="size-5 shrink-0 text-gray-600" />
            <span className="flex-1 min-w-0 truncate text-[15px] text-ink">{section.name}</span>
            <ChevronRightBold16 className="size-4 shrink-0 text-gray-400" />
          </Link>
        ))}
      </div>

      {/* Выход — отдельной группой, danger */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-surface overflow-hidden">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 min-h-12 px-4 text-danger font-semibold active:bg-danger/10 transition-colors duration-150 cursor-pointer"
        >
          <LogoutBold20 className="size-5 shrink-0" />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useProfileQuery } from "@/entities/profile";
import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components";
import { CircleHelp, FileText, LifeBuoy, MoreHorizontal, Settings, Shield } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import ProfileCardDialog from "./ProfileCardDialog";

/* Юридика/помощь — пока заглушки: контент разделов не решён (см. docs/plan.md, этап 17.5).
   Меню уже стоит на месте, чтобы зафиксировать паттерн и точку входа. */
const STUB_MENU_ITEMS = [
  { icon: CircleHelp, label: "Справочный центр" },
  { icon: LifeBuoy, label: "Поддержка" },
  { icon: FileText, label: "Условия использования" },
  { icon: Shield, label: "Политика конфиденциальности" },
] as const;

export default function ProfileButton() {
  const { data: profile } = useProfileQuery();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName = profile?.displayName ?? "Профиль";
  const username = profile?.username ? `@${profile.username}` : "";

  const handleStub = () => toast("Раздел в разработке");

  /* Раскрытие живёт на трёх сигналах с одинаковыми классами:
     hover (мышь), focus-within (клавиатура) и data-expanded (открытое меню «⋯» —
     без него пилюля схлопывалась бы, стоило курсору уйти в портал дропдауна,
     и меню оставалось висеть над съехавшим триггером). */
  const reveal =
    "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-data-[expanded]:opacity-100 group-data-[expanded]:pointer-events-auto";

  return (
    <>
      <ProfileCardDialog isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />

      {/* Плейсхолдер держит ячейку 60×60 в рейле. Сама пилюля — absolute от левого нижнего
          угла: рейл центрирует детей (items-center), и растущая В ПОТОКЕ ширина расползалась
          в обе стороны — наполовину за левый край экрана. Абсолют растёт строго вправо. */}
      <div className="relative size-15">
        <div
          data-expanded={isMenuOpen || undefined}
          className="group absolute bottom-0 left-0 z-[var(--z-sticky)] flex h-15 w-15 items-center gap-1.5 overflow-hidden rounded-[18px] bg-surface p-1 ring ring-gray-200 transition-[width,box-shadow] duration-300 ease-out-expo hover:w-[300px] hover:shadow-md focus-within:w-[300px] focus-within:shadow-md data-[expanded]:w-[300px] data-[expanded]:shadow-md"
        >
          {/* Аватар + имя/ник — карточка профиля */}
          <button
            type="button"
            onClick={() => setIsCardOpen(true)}
            className="flex min-w-0 flex-1 cursor-pointer items-center rounded-xl p-1 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45"
          >
            <Avatar
              name={displayName}
              src={profile?.avatarUrl}
              size="l"
              shape="circle"
              className="size-11 flex-shrink-0"
            />

            <div
              className={`flex min-w-0 flex-1 flex-col items-start px-2 text-left transition-opacity duration-300 ${reveal}`}
            >
              <span className="w-full truncate text-sm font-semibold text-gray-900">
                {displayName}
              </span>
              {username && (
                <span className="w-full truncate text-xs text-gray-500">{username}</span>
              )}
            </div>
          </button>

          {/* Иконки справа: появляются после того, как пилюля почти доехала (delay-100) */}
          <div
            className={`flex flex-shrink-0 items-center gap-1 pr-0.5 transition-opacity duration-0 group-hover:delay-100 ${reveal}`}
          >
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button theme="ghost" size="xl" Icon={MoreHorizontal} aria-label="Ещё" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                {STUB_MENU_ITEMS.map(({ icon: Icon, label }, index) => (
                  <Fragment key={label}>
                    {/* Разделитель отрезает юридику от помощи */}
                    {index === 2 && <DropdownMenuSeparator />}
                    <DropdownMenuItem onClick={handleStub}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{label}</span>
                    </DropdownMenuItem>
                  </Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              theme="ghost"
              size="xl"
              Icon={Settings}
              aria-label="Настройки"
              href="/settings/profile"
            />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { SOCIAL_PLATFORM_META, getSocialLinkHref, useProfileQuery } from "@/entities/profile";
import { Avatar, Button, Dialog, DialogContent, DialogTitle } from "@/shared/components";
import { EditBold16, GlobeBold16 } from "@frosted-ui/icons";
import { useRouter } from "next/navigation";

interface ProfileCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Карточка профиля (Discord/Whop): информационное окно без крестика — выход кликом мимо
   или Esc. Единственное действие — «Редактировать профиль» внизу (это свой профиль,
   правка и есть главная работа карточки). Бейдж верификации сюда намеренно НЕ выводится:
   верификация — внутренний статус для вывода средств, наружу она не показывается. */
export default function ProfileCardDialog({ isOpen, onClose }: ProfileCardDialogProps) {
  const router = useRouter();
  const { data: profile } = useProfileQuery();

  const handleEdit = () => {
    onClose();
    router.push("/settings/profile");
  };

  const displayName = profile?.displayName ?? "Профиль";
  const username = profile?.username ? `@${profile.username}` : "";
  const socialLinks = profile?.socialLinks ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showClose={false} aria-describedby={undefined} className="max-w-md">
        <div className="flex flex-col">
          {/* Шапка: аватар слева, соцсети — в правом верхнем углу, где у обычных модалок
              живёт крестик; чипы — та же форма, что кружок закрытия (size-8, r10, fill) */}
          <div className="flex items-start justify-between gap-4">
            <Avatar
              name={displayName}
              src={profile?.avatarUrl}
              size="l"
              shape="circle"
              className="size-16"
            />

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap justify-end gap-1.5">
                {socialLinks.map((social) => {
                  const meta = SOCIAL_PLATFORM_META[social.platform];
                  const label = social.label ?? meta.label;

                  return (
                    <a
                      key={`${social.platform}-${social.link}`}
                      href={getSocialLinkHref(social)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex size-8 items-center justify-center rounded-[10px] bg-fill text-gray-600 transition-[background-color,color,transform] duration-150 ease-out-quart hover:bg-fill-hover hover:text-ink active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2"
                    >
                      {meta.icon ? (
                        <img src={meta.icon} alt="" className="size-4" />
                      ) : (
                        <GlobeBold16 className="size-4" />
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* break-words / break-all: имя и ник задаются пользователем — слово длиннее
              карточки обязано переноситься, а не распирать модалку вбок */}
          <DialogTitle className="mt-4 break-words text-xl">{displayName}</DialogTitle>
          {username && <p className="mt-0.5 break-all text-sm text-gray-500">{username}</p>}

          {profile?.bio && (
            <>
              <div aria-hidden="true" className="mt-4 h-px bg-gray-200" />
              <p className="mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-gray-700">
                {profile.bio}
              </p>
            </>
          )}

          <Button
            theme="secondary"
            size="md"
            fluid
            Icon={EditBold16}
            onClick={handleEdit}
            className="mt-6"
          >
            Редактировать профиль
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

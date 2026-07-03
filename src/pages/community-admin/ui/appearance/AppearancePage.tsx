"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, Users, X } from "lucide-react";
import { toast } from "sonner";
import {
  useCommunityProfileQuery,
  useUpdateCommunityProfileMutation,
} from "@/entities/community";
import { useCommunityStatsQuery } from "@/entities/subscription";
import { Avatar, Button } from "@/shared/components";
import { fileToDataUrl } from "@/shared/utils";
import { AdminShell } from "../AdminShell";

interface UploadFieldProps {
  label: string;
  hint: string;
  value: string | null;
  height: number;
  maxWidth: number;
  onChange: (dataUrl: string | null) => void;
}

function UploadField({ label, hint, value, height, maxWidth, onChange }: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      onChange(await fileToDataUrl(file, maxWidth));
    } catch (error) {
      toast.error("Не удалось загрузить изображение", {
        description: error instanceof Error ? error.message : "Попробуйте другой файл",
      });
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-black">{label}</span>
      <div className="relative overflow-hidden rounded-[14px] border border-gray-200" style={{ height }}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="size-full object-cover" />
        ) : (
          <div className="size-full bg-gray-100 flex flex-col items-center justify-center gap-1.5 text-gray-500">
            <ImageIcon className="size-5" />
            <span className="text-xs">{hint}</span>
          </div>
        )}
        <div className="absolute right-3 bottom-3 flex gap-2">
          {value && (
            <Button theme="outline" size="s" Icon={X} onClick={() => onChange(null)} aria-label="Убрать" />
          )}
          <Button theme="outline" size="s" onClick={() => inputRef.current?.click()}>
            <Upload className="size-3.5" />
            Загрузить
          </Button>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

export function AppearancePage({ slug }: { slug: string }) {
  const { data: profile, isLoading } = useCommunityProfileQuery(slug);
  const { data: stats } = useCommunityStatsQuery(slug);
  const updateProfile = useUpdateCommunityProfileMutation();

  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setCoverUrl(profile.coverUrl);
      setLogoUrl(profile.logoUrl);
    }
  }, [profile]);

  const isDirty =
    !!profile && (coverUrl !== profile.coverUrl || logoUrl !== profile.logoUrl);

  const handleSave = () => {
    updateProfile.mutate({ slug, coverUrl, logoUrl });
  };

  const membersCount = stats?.cards[1]?.value ?? "0";

  return (
    <AdminShell
      slug={slug}
      title="Внешний вид"
      subtitle="Обложка и логотип сообщества"
      actions={
        <Button
          theme="primary"
          size="s"
          onClick={handleSave}
          isDisabled={!isDirty}
          isLoading={updateProfile.isPending}
        >
          Сохранить
        </Button>
      }
    >
      {isLoading || !profile ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="p-6 flex gap-8">
          {/* Редактор */}
          <div className="flex-1 min-w-0 max-w-xl space-y-5">
            <UploadField
              label="Обложка сообщества"
              hint="Рекомендуемый размер 1600×400"
              value={coverUrl}
              height={150}
              maxWidth={1600}
              onChange={setCoverUrl}
            />
            <UploadField
              label="Логотип"
              hint="Рекомендуемый размер 512×512"
              value={logoUrl}
              height={110}
              maxWidth={512}
              onChange={setLogoUrl}
            />
            <p className="text-xs text-gray-500">
              Обложка показывается в баннере сообщества и на публичной странице, логотип — в
              списке сообществ и в баннере.
            </p>
          </div>

          {/* Live-превью публичной карточки */}
          <div className="w-[300px] shrink-0 space-y-2">
            <span className="text-sm font-medium text-black">Превью карточки</span>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="h-[120px] bg-gray-100">
                {coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverUrl} alt="" className="size-full object-cover" />
                )}
              </div>
              <div className="p-4 space-y-2.5">
                <div className="-mt-10">
                  <Avatar
                    name={profile.displayName}
                    src={logoUrl}
                    size="l"
                    shape="square"
                    className="size-[52px] ring-2 ring-white"
                  />
                </div>
                <p className="text-base font-bold text-black">{profile.displayName}</p>
                {profile.description && (
                  <p className="text-[13px] text-gray-600 line-clamp-2">{profile.description}</p>
                )}
                <Button theme="primary" size="m" fluid>
                  Присоединиться
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Users className="size-3.5" />
                  {membersCount} участников
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">обновляется в реальном времени</p>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

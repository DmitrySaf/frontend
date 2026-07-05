"use client";

import {
  DEFAULT_FEATURE_ICON,
  STOREFRONT_FEATURE_ICONS,
  type Storefront,
  type StorefrontFeature,
} from "@/entities/storefront";
import { Button, Dropdown } from "@/shared/components";
import { fileToDataUrl } from "@/shared/utils";
import { ChevronDown, ImagePlus, Plus, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const MAX_MEDIA = 6;
const MAX_FEATURES = 6;

interface StorefrontEditorProps {
  value: Storefront;
  onChange: (value: Storefront) => void;
}

/**
 * Редактор витрины: описание, медиа-галерея, пункты «Что внутри».
 * Витрина самостоятельна — из сообщества берутся только название и логотип.
 */
export function StorefrontEditor({ value, onChange }: StorefrontEditorProps) {
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const handleMediaFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    const room = MAX_MEDIA - value.media.length;
    if (room <= 0) {
      toast.error(`Не больше ${MAX_MEDIA} изображений`);
      return;
    }

    try {
      const dataUrls = await Promise.all(
        files.slice(0, room).map((file) => fileToDataUrl(file, 1280))
      );
      onChange({ ...value, media: [...value.media, ...dataUrls] });
    } catch (error) {
      toast.error("Не удалось загрузить изображение", {
        description: error instanceof Error ? error.message : "Попробуйте другой файл",
      });
    }
  };

  const updateFeature = (index: number, patch: Partial<StorefrontFeature>) => {
    const features = value.features.map((feature, i) =>
      i === index ? { ...feature, ...patch } : feature
    );
    onChange({ ...value, features });
  };

  return (
    <div className="space-y-5">
      {/* Описание витрины */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-black">Описание на витрине</span>
        <textarea
          value={value.description}
          onChange={(event) => onChange({ ...value, description: event.target.value })}
          placeholder="Расскажите гостям, что они получат внутри"
          rows={4}
          className="w-full resize-none rounded-xl bg-white px-3 py-3 text-sm text-black inset-ring inset-ring-gray-200 placeholder:text-gray-500 focus:outline-none focus:inset-ring-2 focus:inset-ring-primary-500 transition-shadow"
        />
      </div>

      {/* Медиа-галерея */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-black">Медиа-галерея</span>
        <div className="grid grid-cols-3 gap-2.5">
          {value.media.map((url, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-gray-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() =>
                  onChange({ ...value, media: value.media.filter((_, i) => i !== index) })
                }
                aria-label="Убрать изображение"
                className="absolute top-1.5 right-1.5 size-6 flex items-center justify-center rounded-md bg-white/90 border border-gray-200 text-gray-600 hover:text-black cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-[10px] font-medium text-white">
                  главное
                </span>
              )}
            </div>
          ))}

          {value.media.length < MAX_MEDIA && (
            <button
              type="button"
              onClick={() => mediaInputRef.current?.click()}
              className="aspect-[4/3] flex flex-col items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              <ImagePlus className="size-5" />
              <span className="text-xs font-medium">Добавить</span>
            </button>
          )}
        </div>
        <input
          ref={mediaInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleMediaFiles}
          className="hidden"
        />
      </div>

      {/* Что внутри */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-black">Что внутри</span>
        <div className="space-y-2">
          {value.features.map((feature, index) => {
            const meta =
              STOREFRONT_FEATURE_ICONS[feature.icon] ??
              STOREFRONT_FEATURE_ICONS[DEFAULT_FEATURE_ICON];
            const Icon = meta.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Dropdown
                  trigger={
                    <button
                      type="button"
                      aria-label="Иконка пункта"
                      className="h-10 px-2.5 flex items-center gap-1 rounded-[12px] bg-white inset-ring inset-ring-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      <Icon className="size-[18px]" />
                      <ChevronDown className="size-3.5" />
                    </button>
                  }
                  items={Object.entries(STOREFRONT_FEATURE_ICONS).map(([key, item]) => ({
                    icon: item.icon,
                    label: item.name,
                    onClick: () => updateFeature(index, { icon: key }),
                  }))}
                  align="start"
                />
                <input
                  value={feature.text}
                  onChange={(event) => updateFeature(index, { text: event.target.value })}
                  placeholder="Например, курсы и разборы"
                  className="flex-1 h-10 rounded-[12px] bg-white px-3 text-sm text-black inset-ring inset-ring-gray-200 placeholder:text-gray-500 focus:outline-none focus:inset-ring-2 focus:inset-ring-primary-500 transition-shadow"
                />
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...value, features: value.features.filter((_, i) => i !== index) })
                  }
                  aria-label="Убрать пункт"
                  className="text-gray-500 hover:text-danger transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            );
          })}
        </div>

        {value.features.length < MAX_FEATURES && (
          <Button
            theme="ghost"
            size="s"
            onClick={() =>
              onChange({
                ...value,
                features: [...value.features, { icon: DEFAULT_FEATURE_ICON, text: "" }],
              })
            }
          >
            <Plus className="size-3.5" />
            Добавить пункт
          </Button>
        )}
      </div>
    </div>
  );
}

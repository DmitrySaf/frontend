"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Link2, Globe } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button, Input } from "@/shared/components";
import { extractDomain, getFaviconUrl } from "../model/utils";
import { FAVICON_SIZE, FAVICON_DISPLAY_SIZE } from "../model/constants";
import { type UserSettingsData } from "../model/validation";

export interface CustomLinkInputProps {
  index: number;
  error?: string;
  onRemove: () => void;
  showRemove: boolean;
}

/**
 * Инпут для ввода кастомной ссылки
 * Показывает Link2 по умолчанию, после blur - favicon или Globe
 */
export function CustomLinkInput({ index, error, onRemove, showRemove }: CustomLinkInputProps) {
  const { watch } = useFormContext<UserSettingsData>();
  const [iconState, setIconState] = useState<"default" | "favicon" | "globe">("default");
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  const customUrl = watch(`customLinks.${index}.url`) || "";

  const handleBlur = () => {
    if (!customUrl || customUrl.trim() === "") {
      setIconState("default");
      setFaviconUrl(null);
      return;
    }

    const domain = extractDomain(customUrl);
    if (domain) {
      const url = getFaviconUrl(domain, FAVICON_SIZE);
      setFaviconUrl(url);
      // Пытаемся загрузить favicon, onError обработает если не найдена
      setIconState("favicon");
    } else {
      setIconState("globe");
      setFaviconUrl(null);
    }
  };

  const renderIcon = () => {
    if (iconState === "favicon" && faviconUrl) {
      return (
        <Image
          src={faviconUrl}
          alt="favicon"
          width={FAVICON_DISPLAY_SIZE}
          height={FAVICON_DISPLAY_SIZE}
          className="w-5 h-5 mr-1"
          unoptimized
          
          onError={() => {
            // API route вернул 404 - иконка не найдена
            setIconState("globe");
            setFaviconUrl(null);
          }}
        />
      );
    }
    
    if (iconState === "globe") {
      return <Globe className="w-5 h-5 mr-1 text-gray-500" />;
    }
    
    return <Link2 className="w-5 h-5 mr-1 text-gray-500" />;
  };

  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1">
        <Input
          name={`customLinks.${index}.url`}
          size="l"
          placeholder="https://your-link.com"
          prefixElement={renderIcon()}
          error={error}
          onBlur={handleBlur}
        />
      </div>
      {showRemove && (
        <Button type="button" theme="ghost" size="l" onClick={onRemove}>
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}


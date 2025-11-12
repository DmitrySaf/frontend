"use client";

import Image from "next/image";
import { Input } from "@/shared/components";
import { getDirectFaviconUrl } from "../model/utils";
import { FAVICON_SIZE, FAVICON_DISPLAY_SIZE } from "../model/constants";

export interface SocialLinkInputProps {
  name: string;
  label: string;
  domain: string;
  prefix: string;
  error?: string;
}

/**
 * Инпут для ввода ссылки на социальную сеть
 * Отображает иконку социальной сети напрямую из Google Favicons API
 */
export function SocialLinkInput({ name, label, domain, prefix, error }: SocialLinkInputProps) {
  const faviconUrl = getDirectFaviconUrl(domain, FAVICON_SIZE);

  return (
    <Input
      name={name}
      size="l"
      prefix={prefix}
      prefixElement={
        <Image
          src={faviconUrl}
          alt={label}
          width={FAVICON_DISPLAY_SIZE}
          height={FAVICON_DISPLAY_SIZE}
          className="size-5"
          unoptimized
        />
      }
      error={error}
    />
  );
}


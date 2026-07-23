"use client";

import { cn } from "@/shared/utils";
import { Photo32 } from "@frosted-ui/icons";
import { useState } from "react";

interface MediaCarouselProps {
  media: string[];
  alt: string;
}

export function MediaCarousel({ media, alt }: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (media.length === 0) {
    return (
      <div className="w-full aspect-[21/9] rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400">
        <Photo32 className="size-9" />
      </div>
    );
  }

  const active = media[Math.min(activeIndex, media.length - 1)];

  return (
    <div className="space-y-3">
      <div className="w-full aspect-[21/9] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={active}
          alt={alt}
          className="size-full object-cover animate-in fade-in duration-300 ease-out-quart"
        />
      </div>

      {media.length > 1 && (
        <div className="flex gap-2">
          {media.map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Изображение ${index + 1}`}
              className={cn(
                "w-[70px] h-[50px] overflow-hidden rounded-[10px] border-2 transition-[border-color,transform,opacity] duration-150 ease-out-quart active:scale-95 cursor-pointer",
                index === activeIndex
                  ? "border-primary-500"
                  : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

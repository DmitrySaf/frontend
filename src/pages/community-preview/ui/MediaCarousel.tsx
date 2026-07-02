"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CommunityPreviewMedia } from "../model";
import { cn } from "@/shared/utils";

interface MediaCarouselProps {
  media: CommunityPreviewMedia[];
}

export const MediaCarousel = ({ media }: MediaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (media.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {media.map((item, index) => (
            <div key={index} className="relative aspect-video min-w-0 flex-[0_0_100%]">
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              ) : (
                <video
                  src={item.url}
                  className="size-full object-cover"
                  controls
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-opacity hover:bg-white disabled:opacity-0"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-opacity hover:bg-white disabled:opacity-0"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  index === selectedIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

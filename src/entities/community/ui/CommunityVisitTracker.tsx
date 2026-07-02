"use client";

import { useEffect } from "react";
import { setLastVisitedCommunity } from "../model";

/**
 * Запоминает последнее посещённое сообщество для редиректа после входа
 */
export function CommunityVisitTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (slug) {
      setLastVisitedCommunity(slug);
    }
  }, [slug]);

  return null;
}

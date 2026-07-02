export interface CommunityPreviewMedia {
  type: "image" | "video";
  url: string;
}

export interface PricingTier {
  id: string;
  price: number;
  interval: "month" | "6months" | "year";
  discount?: number;
}

export interface CommunityAuthor {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface CommunityPreview {
  id: string;
  slug: string;
  name: string;
  description: string;
  media: CommunityPreviewMedia[];
  memberCount: number;
  isFree: boolean;
  pricingTiers?: PricingTier[];
  author: CommunityAuthor;
}

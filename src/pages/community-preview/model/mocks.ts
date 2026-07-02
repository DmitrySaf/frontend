import type { CommunityPreview } from "./types";

export const mockPaidCommunity: CommunityPreview = {
  id: "1",
  slug: "clipr-campaigns",
  name: "Clipr Campaigns",
  description: `Welcome to Clipr — The New Standard in Clipping.

Clipr is the leading community for clippers and creators who want to dominate the short-form space.

Inside Clipr, you'll get:
• Elite Training: Everything you need to know about content, virality, and monetization.
• Premier Campaigns: Exclusive access to some of the top communities
• Pro Community: Join a powerhouse of clippers helping each other scale.

Ready to start? From day-one beginners to seasoned pros, Clipr is the ultimate home for the next generation of clippers.`,
  media: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&h=600&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    },
  ],
  memberCount: 486,
  isFree: false,
  pricingTiers: [
    {
      id: "monthly",
      price: 12.99,
      interval: "month",
    },
    {
      id: "6months",
      price: 69.99,
      interval: "6months",
      discount: 10,
    },
    {
      id: "yearly",
      price: 119.0,
      interval: "year",
      discount: 24,
    },
  ],
  author: {
    id: "author-1",
    displayName: "Prithvi (PB)",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
};

export const mockFreeCommunity: CommunityPreview = {
  id: "2",
  slug: "free-creators",
  name: "Free Creators Hub",
  description: `A free community for creators to connect, share ideas, and grow together.

Join thousands of creators who are:
• Sharing tips and tricks
• Collaborating on projects
• Growing their audiences

No cost, just community.`,
  media: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    },
  ],
  memberCount: 12500,
  isFree: true,
  author: {
    id: "author-2",
    displayName: "Community Team",
    avatarUrl: null,
  },
};

export const getMockCommunityBySlug = (slug: string): CommunityPreview | null => {
  const communities: Record<string, CommunityPreview> = {
    "clipr-campaigns": mockPaidCommunity,
    "free-creators": mockFreeCommunity,
  };

  return communities[slug] || mockPaidCommunity;
};

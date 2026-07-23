"use client";

import type { SocialPlatform } from "@/api/profiles";
import { useProfileQuery, useUpdateProfileMutation } from "@/entities/profile";
import { SettingsProfileForm, type UserSettingsData } from "@/widgets/settings-profile-form";
import { useCallback, useMemo } from "react";

export function SettingsProfile() {
  const { data: profileData, isLoading } = useProfileQuery();
  const updateProfile = useUpdateProfileMutation();

  const handleSubmit = useCallback(
    async (data: UserSettingsData) => {
      try {
        // Prepare social links array
        const socialLinksArray: Array<{
          platform: SocialPlatform;
          label: string | null;
          link: string;
        }> = [];

        // Add standard social networks
        const socialPlatforms: Array<{ key: keyof UserSettingsData; platform: SocialPlatform }> = [
          { key: "telegram", platform: "telegram" },
          { key: "vk", platform: "vk" },
          { key: "instagram", platform: "instagram" },
          { key: "youtube", platform: "youtube" },
        ];

        for (const { key, platform } of socialPlatforms) {
          const value = data[key] as string | undefined;
          if (value?.trim()) {
            socialLinksArray.push({
              platform,
              label: null,
              link: value,
            });
          }
        }

        // Add custom links (website)
        const customLinks = data.customLinks || [];
        const nonEmptyLinks = customLinks.filter((link) => link.url?.trim());
        if (nonEmptyLinks.length > 0) {
          socialLinksArray.push({
            platform: "website",
            label: null,
            link: nonEmptyLinks[0].url,
          });
        }

        // Update profile with social links
        await updateProfile.mutateAsync({
          username: data.username,
          display_name: data.name,
          bio: data.bio,
          social_links: socialLinksArray,
        });
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    },
    [updateProfile]
  );

  // Transform data from entities to widget format
  const initValues = useMemo(() => {
    const socialLinksMap =
      profileData?.socialLinks.reduce(
        (acc, link) => {
          acc[link.platform] = link.link;
          return acc;
        },
        {} as Record<string, string>
      ) || {};

    return {
      name: profileData?.displayName || "",
      username: profileData?.username || "",
      bio: profileData?.bio || "",
      telegram: socialLinksMap.telegram || "",
      vk: socialLinksMap.vk || "",
      instagram: socialLinksMap.instagram || "",
      youtube: socialLinksMap.youtube || "",
      customLinks: socialLinksMap.website ? [{ url: socialLinksMap.website }] : [{ url: "" }],
    };
  }, [profileData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Настройки аккаунта</h1>
      </div>

      <SettingsProfileForm initValues={initValues} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

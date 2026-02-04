"use client";

import { useCommunitiesQuery, useCommunityQuery, useCommunitiesRealtime } from "@/entities/community";
import { Loader2, BookOpen } from "lucide-react";
import { useParams } from "next/navigation";

interface CommunityTabContentProps {
  tabSlug: string;
}

export default function CommunityTabContent({ tabSlug }: CommunityTabContentProps) {
  const params = useParams();
  const communitySlug = params?.slug as string;

  const { data: communitiesData } = useCommunitiesQuery();
  const { data: communityData, isLoading, error } = useCommunityQuery(communitySlug);

  // Подключаем realtime подписку для автоматического обновления
  useCommunitiesRealtime();

  // Mock tab data - in real app this would come from API
  const getTabInfo = (slug: string) => {
    const tabMap: Record<string, { name: string; icon: typeof BookOpen }> = {
      "test-course-slug-123": { name: "Курс", icon: BookOpen },
    };
    return tabMap[slug] || { name: "Tab", icon: BookOpen };
  };

  const tabInfo = getTabInfo(tabSlug);
  const TabIcon = tabInfo.icon;

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TabIcon className="w-6 h-6 text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">{tabInfo.name}</h1>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <p className="text-gray-600">Загружаем контент...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TabIcon className="w-6 h-6 text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">{tabInfo.name}</h1>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ошибка загрузки</h2>
              <p className="text-gray-600">Не удалось загрузить контент</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <TabIcon className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-900">{tabInfo.name}</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Содержание</h2>
          <div className="text-gray-600 space-y-2">
            <p>Это placeholder для таба &quot;{tabInfo.name}&quot;</p>
            <p className="text-sm text-gray-500">Slug: {tabSlug}</p>
            <p className="text-sm text-gray-500">Сообщество: {communityData?.name}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-md border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📚 О табе</h3>
          <p className="text-blue-700">
            Здесь будет содержимое таба &quot;{tabInfo.name}&quot;.
            Контент можно кастомизировать под каждый конкретный таб.
          </p>
        </div>
      </div>
    </div>
  );
}

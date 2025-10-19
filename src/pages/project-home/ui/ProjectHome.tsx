'use client'

import { useProjectsQuery, useProjectQuery, useProjectsRealtime } from "@/entities/project";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProjectHome() {
  const params = useParams();
  const projectSlug = params?.slug as string;
  
  const { data: projectsData } = useProjectsQuery();
  const { data: projectData, isLoading, error } = useProjectQuery(projectSlug);
  
  // Подключаем realtime подписку для автоматического обновления
  useProjectsRealtime();

  console.log('🏠 Project Home - Projects list:', projectsData);
  console.log('🚀 Project Home - Current project:', projectData);

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Главная</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <p className="text-gray-600">Загружаем проект...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Главная</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ошибка загрузки</h2>
              <p className="text-gray-600">Не удалось загрузить проект</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {projectData?.name || 'Главная'}
      </h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">О проекте</h2>
        </div>
      </div>
    </div>
  );
}

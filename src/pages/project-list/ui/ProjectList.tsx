'use client'

import { useProjectsQuery, useProjectsRealtime } from "@/entities/project";
import { DeleteProjectModal } from "@/features/project-creation";
import { Button } from "@/shared/components";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ProjectList() {
  const { data: projectsData, isLoading, error } = useProjectsQuery();

  useProjectsRealtime();

  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleDeleteProject = (projectName: string) => {
    setProjectToDelete(projectName);
  };

  const handleCloseDeleteModal = () => {
    setProjectToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Загружаем проекты...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-xl">⚠️</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Ошибка загрузки</h2>
            <p className="text-gray-600">Не удалось загрузить проекты</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('📋 Projects data:', projectsData);

  return (
    <>
      <DeleteProjectModal 
        isOpen={projectToDelete !== null}
        onClose={handleCloseDeleteModal}
        projectName={projectToDelete}
      />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Мои проекты</h1>
        
        <div key="project-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData?.map((project) => (
            <div key={project.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.displayName}</h3>
              <p className="text-gray-600 mb-4">{project.name}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    theme="ghost"
                    size="m"
                    Icon={Trash2}
                    onClick={() => handleDeleteProject(project.name)}
                  />
                  <Button 
                    theme="ghost" 
                    size="m"
                  >
                    Открыть →
                  </Button>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Проекты не найдены</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
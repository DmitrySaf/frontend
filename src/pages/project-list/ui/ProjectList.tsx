'use client'

import { useProjects, useProjectsRealtime, useCreateProject } from "@/entities/project";
import { DeleteProjectModal } from "@/features/project-creation";
import { ProjectCreateModal, type CreateProjectData } from "@/widgets/project-create-modal";
import { Button } from "@/shared/components";
import { Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import { useQueryState } from 'nuqs';

export default function ProjectList() {
  const { data: projectsData, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  
  // Подключаем realtime подписку для автоматического обновления
  useProjectsRealtime(true);
  
  // Управление модалкой создания проекта
  const [createParam, setCreateParam] = useQueryState('create');
  const isCreateModalOpen = createParam === 'project';
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteProject = (projectId: string, projectName: string) => {
    setProjectToDelete({ id: projectId, name: projectName });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const handleCloseCreateModal = useCallback(() => {
    setCreateParam(null);
  }, [setCreateParam]);

  const handleCreateProject = useCallback(async (data: CreateProjectData) => {
    await createProject.mutateAsync(data);
  }, [createProject]);

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
      <ProjectCreateModal 
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateProject}
        isLoading={createProject.isPending}
      />
      <DeleteProjectModal 
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        projectId={projectToDelete?.id || null}
        projectName={projectToDelete?.name || null}
      />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Мои проекты</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData?.map((project: any) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.display_name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status === 'active' ? 'Активный' : 
                   project.status === 'completed' ? 'Завершен' : 'В процессе'}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    theme="ghost"
                    size="m"
                    Icon={Trash2}
                    onClick={() => handleDeleteProject(project.id, project.name)}
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
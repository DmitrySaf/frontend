"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectsAPI } from "@/lib/api";
import { useState } from "react";

interface ProjectData {
  displayName: string;
  uniqueName: string;
  description: string;
}

export default function CreateProjectForm() {
  const [projectData, setProjectData] = useState<ProjectData>({
    displayName: "",
    uniqueName: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    if (!projectData.displayName || !projectData.uniqueName) {
      setError("Заполните обязательные поля");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await projectsAPI.createProject(projectData);
      console.log("Проект создан:", result);
      
      // Можно добавить редирект или показать успешное сообщение
      // router.push('/projects');
    } catch (e) {
      console.error("Ошибка при создании проекта:", e);
      setError(e instanceof Error ? e.message : "Ошибка при создании проекта");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Создание проекта</h1>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Название проекта
        </label>
        <Input
          type="text"
          placeholder="Введите название проекта"
          value={projectData.displayName}
          onChange={(e) => setProjectData({ ...projectData, displayName: e.target.value })}
          maxLength={50}
          showCounter={true}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Выберите ссылку
        </label>
        <Input
          type="text"
          placeholder="myproject"
          prefix="profound.com/"
          value={projectData.uniqueName}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              uniqueName: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""),
            })
          }
          maxLength={30}
          showCounter={true}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Описание проекта
        </label>
        <Textarea
          placeholder="Введите описание проекта..."
          value={projectData.description}
          onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
          rows={4}
          maxLength={500}
          showCounter={true}
        />
      </div>

      <Button
        onClick={handleComplete}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base h-auto disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? "Создание..." : "Создать"}
      </Button>
    </div>
  );
} 
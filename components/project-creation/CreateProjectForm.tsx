"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  const handleComplete = () => {
    console.log("Проект создан:", projectData);
    // Здесь будет логика создания проекта
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Создание проекта</h1>

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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base h-auto"
      >
        Создать
      </Button>
    </div>
  );
} 
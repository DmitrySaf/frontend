"use client";

import MainSidebar from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

interface ProjectData {
  displayName: string;
  uniqueName: string;
  description: string;
  features: string[];
}

const FEATURES = [
  { id: "posts", name: "Посты", description: "Публикация контента" },
  { id: "courses", name: "Курсы", description: "Обучающие материалы" },
  { id: "articles", name: "Статьи", description: "Информационные материалы" },
  { id: "chat", name: "Чат", description: "Общение с участниками" },
];

export default function ProjectCreationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    displayName: "",
    uniqueName: "",
    description: "",
    features: [],
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 3) {
      setProjectData({ ...projectData, description: "" });
    } else if (currentStep === 4) {
      setProjectData({ ...projectData, features: [] });
    }
    handleNext();
  };

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = projectData.features.includes(featureId)
      ? projectData.features.filter((f) => f !== featureId)
      : [...projectData.features, featureId];

    setProjectData({ ...projectData, features: newFeatures });
  };

  const handleComplete = () => {
    console.log("Проект создан:", projectData);
    // Здесь будет логика создания проекта
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Название проекта</h1>
              <p className="text-gray-600">Это название будет видно вашим участникам.</p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Введите название проекта"
                value={projectData.displayName}
                onChange={(e) => setProjectData({ ...projectData, displayName: e.target.value })}
                className="w-full py-3 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <div className="text-right text-sm text-gray-500">
                {projectData.displayName.length} / 50
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!projectData.displayName.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base h-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Продолжить
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Выберите ссылку ProFound</h1>
              <p className="text-gray-600">Эта ссылка будет отправляться вашим участникам.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-colors">
                <span className="px-4 py-3 text-gray-500 bg-gray-50 rounded-l-lg border-r border-gray-300">
                  profound.com/
                </span>
                <input
                  type="text"
                  placeholder="myproject"
                  value={projectData.uniqueName}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      uniqueName: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""),
                    })
                  }
                  className="flex-1 py-3 px-4 text-base focus:outline-none rounded-r-lg"
                />
              </div>
              <div className="text-right text-sm text-gray-500">
                {projectData.uniqueName.length} / 30
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!projectData.uniqueName.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base h-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Продолжить
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Описание проекта</h1>
              <p className="text-gray-600">Расскажите участникам о вашем проекте.</p>
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Введите описание проекта..."
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                rows={4}
                className="w-full py-3 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              />
              <div className="text-right text-sm text-gray-500">
                {projectData.description.length} / 500
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base h-auto"
              >
                Продолжить
              </Button>

              <Button
                onClick={handleSkip}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg font-medium text-base h-auto"
              >
                Пропустить
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Конфигурация проекта</h1>
              <p className="text-gray-600">Выберите функции для вашего проекта.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  onClick={() => handleFeatureToggle(feature.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    projectData.features.includes(feature.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">{feature.name}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    {projectData.features.includes(feature.id) && (
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleComplete}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base h-auto"
              >
                Завершить
              </Button>

              <Button
                onClick={handleSkip}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg font-medium text-base h-auto"
              >
                Пропустить
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <MainSidebar />

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Шаг {currentStep} из 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}

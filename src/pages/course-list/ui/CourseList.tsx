'use client'

import { Button } from "@/shared/components";
import { useCourses } from "@/entities/course";
import { BookOpen, FileText, Play, Loader2 } from "lucide-react";

export default function CourseList() {
  const { data: coursesData, isLoading, error } = useCourses();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <p className="text-gray-600">Загружаем курсы...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-xl">⚠️</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Ошибка загрузки</h2>
            <p className="text-gray-600">Не удалось загрузить курсы</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('📚 Courses data:', coursesData);

  return (
    <div className="flex-1 flex">
      {/* Course Content */}
      <div className="flex-1 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ProFound Курс</h1>
              <p className="text-sm text-gray-500">15 мин</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {[
              { title: "Что такое ProFound?", duration: "3:53", completed: true },
              { title: "История ProFound", duration: "3:26", completed: true },
              { title: "Как зарабатывать на ProFound", duration: "3:28", completed: true },
              { title: "ProFound 101", duration: "2:58", completed: true },
              {
                title: "Как создать проект за 60 секунд",
                duration: "1:36",
                completed: false,
              },
            ].map((lesson, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    lesson.completed ? "bg-green-500" : "border-2 border-gray-300"
                  }`}
                >
                  {lesson.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <FileText className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{lesson.title}</p>
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Модуль 2: Использование ProFound</h3>
            <p className="text-sm text-gray-500 mb-4">38 мин</p>

            <div className="space-y-3">
              {[
                { title: "Что продавать", duration: "8:57", completed: true },
                { title: "Дизайн страницы проекта", duration: "11:48", completed: true },
                { title: "Выбор функций", duration: "4:24", completed: false },
              ].map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      lesson.completed ? "bg-green-500" : "border-2 border-gray-300"
                    }`}
                  >
                    {lesson.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{lesson.title}</p>
                  </div>
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Area */}
      <div className="w-2/3 bg-gray-50">
        <div className="h-80 bg-black relative rounded-xl m-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-2xl font-bold">КАК СОЗДАТЕЛЬ:</h2>
              <ul className="space-y-2 text-left">
                <li>• Попадите на наш маркетплейс</li>
                <li>• Создайте страницу проекта</li>
                <li>• Выберите различные функции</li>
                <li>• Заполните их</li>
              </ul>
            </div>
            <Button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Что такое ProFound?</h3>
          <p className="text-gray-600 mb-4">ProFound University</p>

          <div className="flex space-x-4 mb-6">
            <button className="pb-2 border-b-2 border-blue-500 text-blue-600 font-medium">
              Заметки
            </button>
            <button className="pb-2 text-gray-500 hover:text-gray-700">Курс</button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              Нажмите здесь, чтобы начать создание вашего проекта →{" "}
              <a href="#" className="text-blue-600 hover:underline">
                https://profound.com/new/
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import MainSidebar from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BookOpen,
  FileText,
  HelpCircle,
  Home,
  MessageCircle,
  Play,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const SIDEBAR_ITEMS = [
  { id: "home", name: "Главная", icon: Home },
  { id: "posts", name: "Посты", icon: FileText },
  { id: "courses", name: "Курсы", icon: BookOpen },
  { id: "articles", name: "Статьи", icon: FileText },
  { id: "chat", name: "Чат", icon: MessageCircle, badge: 3 },
];

const BOTTOM_ITEMS = [
  { id: "members", name: "Участники", icon: Users },
  { id: "settings", name: "Настройки", icon: Settings },
];

export default function ProjectPage() {
  const [activeSection, setActiveSection] = useState("courses");

  const renderContent = () => {
    switch (activeSection) {
      case "courses":
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

      case "posts":
        return (
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Посты</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Здесь будут отображаться посты проекта</p>
            </div>
          </div>
        );

      case "articles":
        return (
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Статьи</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Здесь будут отображаться статьи проекта</p>
            </div>
          </div>
        );

      case "chat":
        return (
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Чат</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Здесь будет чат проекта</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Главная</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Добро пожаловать в ваш проект</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
              <Image src="/lightbulb.svg" alt="ProFound" width={20} height={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">ProFound University</h2>
              <p className="text-xs text-gray-500">32 участника</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200">
          <nav className="space-y-2">
            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="rounded-xl">
                ←
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  ⌘K
                </span>
              </div>

              <Button variant="ghost" size="sm" className="rounded-xl">
                <HelpCircle className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="sm" className="rounded-xl">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}

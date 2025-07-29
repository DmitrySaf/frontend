"use client";

import MainSidebar from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CreditCard,
  Edit2,
  FileText,
  HelpCircle,
  Link,
  LogOut,
  Settings,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/lib/auth/withAuth";
import { useAuth } from "@/lib/context/AuthContext";

const SETTINGS_SECTIONS = [
  { id: "general", name: "Основные", icon: Settings },
  { id: "connected", name: "Подключенные аккаунты", icon: Link },
  { id: "security", name: "Безопасность и приватность", icon: Shield },
  { id: "payment", name: "Способы оплаты", icon: CreditCard },
  { id: "balance", name: "Баланс", icon: Wallet },
  { id: "billing", name: "История платежей", icon: FileText },
  { id: "memberships", name: "Участие", icon: Users },
  { id: "support", name: "Центр поддержки", icon: HelpCircle },
  { id: "danger", name: "Опасная зона", icon: AlertTriangle },
];

function UserSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [formData, setFormData] = useState({
    name: "Arkadiy",
    bio: "",
    username: "arkadiyparovozov",
    email: "arkadiy.parovozov01@gmail.com",
    phone: "",
    joinedVisible: true,
    ownedVisible: true,
  });
  const { signOut } = useAuth();

  const handleSave = () => {
    console.log("Настройки сохранены:", formData);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Настройки аккаунта</h1>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-3 px-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Биография</label>
                <textarea
                  placeholder="Расскажите о себе"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full py-3 px-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full py-3 px-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-3 px-4 pr-12 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
                <div className="relative">
                  <div className="flex">
                    <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl">
                      <span className="text-lg">🇺🇸</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Номер телефона не указан"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 py-3 px-4 pr-12 text-base border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Что могут видеть люди в вашем профиле?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Все, что вы скроете здесь, не будет видно другим — и вы тоже не увидите это в их
                  профилях.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">Участие в проектах</span>
                    <button
                      onClick={() =>
                        setFormData({ ...formData, joinedVisible: !formData.joinedVisible })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.joinedVisible ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.joinedVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">Созданные проекты</span>
                    <button
                      onClick={() =>
                        setFormData({ ...formData, ownedVisible: !formData.ownedVisible })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.ownedVisible ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.ownedVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={handleSave}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium text-base h-auto"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        );

      case "connected":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Подключенные аккаунты</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Здесь будут отображаться подключенные социальные сети</p>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Безопасность и приватность</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Настройки безопасности и приватности</p>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Способы оплаты</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Управление способами оплаты</p>
            </div>
          </div>
        );

      case "balance":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Баланс</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Информация о балансе</p>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">История платежей</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">История ваших платежей</p>
            </div>
          </div>
        );

      case "memberships":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Участие</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Проекты, в которых вы участвуете</p>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Центр поддержки</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-gray-500">Помощь и поддержка</p>
            </div>
          </div>
        );

      case "danger":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Опасная зона</h1>
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <p className="text-red-600">Удаление аккаунта и другие критические действия</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🐼</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Arkadiy</h2>
              <p className="text-sm text-gray-500">@arkadiyparovozov</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-8 max-w-4xl">{renderContent()}</div>
      </div>
    </div>
  );
}

export default UserSettingsPage;

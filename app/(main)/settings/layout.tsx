"use client"

import MainSidebar from "@/components/common/sidebar";
import { AuthProvider, useAuth } from "@/lib/context/AuthContext";
import { Settings, BadgeCheck, Shield, CreditCard, FileText, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SETTINGS_SECTIONS = [
  { id: "general", name: "Основные", icon: Settings },
  { id: "verification", name: "Верификация", icon: BadgeCheck },
  { id: "security", name: "Безопасность и приватность", icon: Shield },
  { id: "payment", name: "Способы оплаты", icon: CreditCard },
  { id: "billing", name: "История платежей", icon: FileText }
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen flex flex-col">
      
    <div className="flex rounded-3xl bg-white border border-solid border-gray-200 flex-1">
      
        {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 flex flex-col">
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
          <nav className="space-y-1">
            {/* TODO: красить в разные цвета в зависимости от статуса */}
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => router.push(`/settings/${section.id}`)}
                  className={`w-full flex space-x-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    pathname === `/settings/${section.id}`
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-8 max-w-4xl">
          {children}
        </div>
      </div>
    </div>
    </div>
  );
} 
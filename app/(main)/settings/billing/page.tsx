"use client";

import MainSidebar from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CreditCard,
  Edit2,
} from "lucide-react";
import { useState } from "react";
import withAuth from "@/lib/auth/withAuth";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

function UserSettingsPage() {
  const [formData, setFormData] = useState({
    name: "Arkadiy",
    bio: "",
    email: "arkadiy.parovozov01@gmail.com",
    phone: "",
    joinedVisible: true,
    ownedVisible: true,
  });

  const handleSave = () => {
    console.log("Настройки сохранены:", formData);
  };

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
}

export default UserSettingsPage;

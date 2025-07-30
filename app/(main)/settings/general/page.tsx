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
    username: "arkadiyparovozov",
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
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">О себе
                </label>
                <textarea
                  placeholder="Расскажите о себе"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full py-3 px-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium text-base h-auto"
              >
                Сохранить
              </Button>
            </div>
          </div>
  );
}

export default UserSettingsPage;

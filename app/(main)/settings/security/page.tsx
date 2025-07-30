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
import { Switch } from "@/components/ui/switch";

// Тут будет подключение номера телефона или приложения для двухфакторной аутентификации

export default function SettingsSecurityPage() {
  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleSave = () => {
    console.log("Настройки сохранены:", formData);
  };

  return (
    <div className="">

<h2 className="text-2xl font-bold text-gray-900 mb-6">Безопасность</h2>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Подключение номера телефона
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Подключите номер телефона, чтобы использовать двухфакторную аутентификацию.
                </p>



                <h2 className="text-2xl font-bold text-gray-900 mb-2">Приватность</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Все, что вы скроете здесь, не будет видно другим — и вы тоже не увидите это в их
                  профилях.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">Участие в проектах</span>
                    <Switch
                      checked={true}
                      disabled
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, joinedVisible: checked })
                      }
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.joinedVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </Switch>
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
  );
}

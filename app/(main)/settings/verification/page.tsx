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

// Решить вопрос с верификацией (паспорт или самозанятый/ип/ооо, или и то и то, добавить предупреждения о разнице обоих методов)

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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Верификация аккаунта</h1>
            </div>

            
          </div>
  );
}

export default UserSettingsPage;

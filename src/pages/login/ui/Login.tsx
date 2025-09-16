"use client";

import { AuthProvider, AuthForm } from "@/features/auth";
import Image from "next/image";

export function Login() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-black bg-opacity-30 bg-blend-darken">
        {/* Auth Card */}
        <Image src="/auth-bg.jpg" alt="Auth Background" fill className="object-cover z-0" />
        <div className="bg-white rounded-[24px] shadow-xl w-full max-w-md p-8 space-y-8 z-10">
          {/* Logo and header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="bg-black p-2 rounded-lg">&#x267F;</div>
              <span className="text-2xl font-bold text-gray-900">ProFound</span>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-base">
                Создайте аккаунт или войдите, чтобы открыть новые возможности для заработка.
              </p>
            </div>
          </div>

          {/* Auth form */}
          <AuthForm />
        </div>
      </div>
    </AuthProvider>
  );
}

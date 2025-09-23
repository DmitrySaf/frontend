import { Auth } from "@/features/auth";
import Image from "next/image";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-black bg-opacity-30 bg-blend-darken">
      {/* Auth Card */}
      <Image src="/auth-bg.jpg" alt="Auth Background" fill className="object-cover z-0" />
      <div className="bg-white rounded-[24px] shadow-xl w-full max-w-md p-8 z-10 relative">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-black p-2 rounded-lg">&#x267F;</div>
            <span className="text-2xl font-bold text-gray-900">ProFound</span>
          </div>
        </div>

        <Auth />
      </div>
    </div>
  );
}

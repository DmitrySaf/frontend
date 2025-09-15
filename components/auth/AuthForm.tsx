"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const { signInWithEmail, verifyOtp } = useAuth();
  const router = useRouter();

  // Функция для проверки соединения с API
  const testApiConnection = async () => {
    try {
      setTestResult("Проверка соединения с API...");
      
      // Проверяем соединение с API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/signin`, {
        method: 'OPTIONS',
      });
      
      if (response.ok) {
        setTestResult("Соединение с API установлено успешно!");
      } else {
        setTestResult(`Ошибка соединения с API: ${response.status}`);
      }
    } catch (e) {
      setTestResult(`Критическая ошибка: ${e instanceof Error ? e.message : 'Неизвестная ошибка'}`);
      console.error('Критическая ошибка при проверке соединения:', e);
    }
  };



  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorDetails(null);
    setIsLoading(true);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Пожалуйста, введите корректный email");
      setIsLoading(false);
      return;
    }

    console.log('Отправка кода на email:', email);
    
    const result = await signInWithEmail(email);
    
    setIsLoading(false);

    if (result.error) {
      console.error('Ошибка при отправке кода:', result.error);
      setError(result.error.message || "Ошибка при отправке кода");
      setErrorDetails(result.error);
    } else {
      console.log('Код успешно отправлен');
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorDetails(null);
    setIsLoading(true);

    if (!otpCode || otpCode.length < 6) {
      setError("Пожалуйста, введите корректный код");
      setIsLoading(false);
      return;
    }

    console.log('Проверка кода:', email, otpCode);
    
    const result = await verifyOtp(email, otpCode);
    
    setIsLoading(false);

    if (result.error) {
      console.error('Ошибка при проверке кода:', result.error);
      setError(result.error.message || "Неверный код");
      setErrorDetails(result.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Вывод результата проверки соединения */}
      {testResult && (
        <div className={`p-3 rounded-lg text-sm ${testResult.includes('Ошибка') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {testResult}
        </div>
      )}
      
      {!isOtpSent ? (
        // Форма ввода email
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Почта
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error || undefined}
            />
            {errorDetails && process.env.NODE_ENV === 'development' && (
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
            )}
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-[12px] font-medium text-base h-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Отправка..." : "Продолжить"}
          </Button>
          
          {process.env.NODE_ENV === 'development' && (
            <button 
              type="button"
              onClick={testApiConnection}
              className="w-full mt-2 text-xs text-gray-500 underline"
            >
              Проверить соединение с API
            </button>
          )}
        </form>
      ) : (
        // Форма ввода кода подтверждения
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Код подтверждения
            </label>
            <Input
              id="otp"
              type="text"
              placeholder="Введите код из письма"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              error={error || undefined}
              description={`Мы отправили код подтверждения на адрес ${email}`}
            />
            {errorDetails && process.env.NODE_ENV === 'development' && (
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
            )}
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-[12px] font-medium text-base h-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Проверка..." : "Войти"}
          </Button>
          
          <button
            type="button"
            onClick={() => setIsOtpSent(false)}
            className="w-full text-center text-sm text-blue-600 hover:underline"
          >
            Изменить email
          </button>
        </form>
      )}

      {!isOtpSent && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500 text-xs">или</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center rounded-[12px] border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-7 min-h-7"
              >
                <g clipPath="url(#clip0_2060_1534)">
                  <mask
                    id="mask0_2060_1534"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <path d="M23.8815 0H0.119141V24H23.8815V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_2060_1534)">
                    <path
                      d="M0.119141 11.52C0.119141 6.08942 0.119141 3.37414 1.7895 1.68707C3.45987 0 6.14827 0 11.5251 0H12.4756C17.8524 0 20.5408 0 22.2112 1.68707C23.8815 3.37414 23.8815 6.08942 23.8815 11.52V12.48C23.8815 17.9106 23.8815 20.6259 22.2112 22.3129C20.5408 24 17.8524 24 12.4756 24H11.5251C6.14827 24 3.45987 24 1.7895 22.3129C0.119141 20.6259 0.119141 17.9106 0.119141 12.48V11.52Z"
                      fill="#0077FF"
                    />
                    <path
                      d="M12.7626 17.2898C7.34671 17.2898 4.25763 13.5398 4.12891 7.2998H6.84179C6.9309 11.8798 8.93086 13.8198 10.515 14.2198V7.2998H13.0695V11.2498C14.6339 11.0798 16.2773 9.2798 16.8317 7.2998H19.3863C18.9605 9.73981 17.1783 11.5398 15.911 12.2798C17.1783 12.8798 19.2081 14.4498 19.9804 17.2898H17.1684C16.5645 15.3898 15.0596 13.9198 13.0695 13.7198V17.2898H12.7626Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_2060_1534">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Button>

            <Button
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center rounded-[12px] border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-7 min-h-7"
              >
                <g clipPath="url(#clip0_2060_1542)">
                  <path
                    d="M12 23.9755C18.6139 23.9755 23.9755 18.6139 23.9755 12C23.9755 5.38605 18.6139 0.0244141 12 0.0244141C5.38605 0.0244141 0.0244141 5.38605 0.0244141 12C0.0244141 18.6139 5.38605 23.9755 12 23.9755Z"
                    fill="#FC3F1D"
                  />
                  <path
                    d="M16.3334 19.5182H13.7046V6.51602H12.5334C10.3868 6.51602 9.26233 7.58936 9.26233 9.19158C9.26233 11.0094 10.0379 11.8516 11.6423 12.9249L12.9646 13.816L9.16456 19.516H6.33789L9.75789 14.4271C7.79122 13.0227 6.68456 11.6516 6.68456 9.33825C6.68456 6.44714 8.70011 4.48047 12.5157 4.48047H16.3157V19.5138H16.3334V19.5182Z"
                    fill="#FCFCFC"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2060_1542">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
        </>
      )}

      {!isOtpSent && (
        <p className="text-xs text-gray-500 text-center">
          Регистрируясь, вы соглашаетесь с нашими{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            условиями использования
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            политикой конфиденциальности
          </Link>
          .
        </p>
      )}
    </div>
  );
} 
"use client";

import { createBrowserClient } from "@/api/browser-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { ConfirmationFormData, EmailFormData } from "../model/validation";
import { ConfirmationForm } from "./ConfirmationForm";
import { EmailForm } from "./EmailForm";

interface AuthProps {
  /** После успешного входа; по умолчанию — редирект в /communities */
  onSuccess?: () => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [confirmationError, setConfirmationError] = useState<string | undefined>(undefined);

  const handleEmailSubmit = useCallback(
    async (data: EmailFormData) => {
      setIsLoading(true);
      setCurrentEmail(data.email);

      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: data.email,
          options: {
            shouldCreateUser: true,
            data: {
              username: data.email.toUpperCase().split("@")[0],
              display_name: data.email.toLowerCase().split("@")[0],
            },
          },
        });

        if (error) {
          throw new Error(error.message || "Ошибка при отправке кода");
        }

        setIsConfirmationStep(true);
      } catch (error) {
        console.error("Ошибка при отправке кода:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase]
  );

  const handleConfirmationSubmit = useCallback(
    async (data: ConfirmationFormData) => {
      setIsLoading(true);
      setConfirmationError(undefined);

      try {
        const { error } = await supabase.auth.verifyOtp({
          email: data.email,
          token: data.confirmationCode,
          type: "email",
        });

        if (error) {
          setConfirmationError("Неверный код");
          return;
        }

        if (onSuccess) {
          onSuccess();
        } else {
          // Резолвер выберет сообщество или покажет пустое состояние
          router.push("/communities");
        }
      } catch (error) {
        console.error("Ошибка при проверке кода:", error);
        setConfirmationError("Произошла ошибка при проверке кода");
      } finally {
        setIsLoading(false);
      }
    },
    [supabase, router, onSuccess]
  );

  const handleBackToEmail = useCallback(() => {
    setIsConfirmationStep(false);
    setCurrentEmail("");
    setConfirmationError(undefined);
  }, []);

  const handleResendCode = useCallback(async () => {
    if (!currentEmail) return;

    setIsLoading(true);
    setConfirmationError(undefined);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: currentEmail,
        options: {
          shouldCreateUser: true,
          data: {
            username: currentEmail.toUpperCase().split("@")[0],
            display_name: currentEmail.toLowerCase().split("@")[0],
          },
        },
      });

      if (error) {
        setConfirmationError("Не удалось отправить код повторно");
        return;
      }
    } catch (error) {
      console.error("Ошибка при повторной отправке кода:", error);
      setConfirmationError("Не удалось отправить код повторно");
    } finally {
      setIsLoading(false);
    }
  }, [currentEmail, supabase]);

  return (
    <div className="space-y-6">
      {isConfirmationStep ? (
        // key + направленный вход: шаг кода «приезжает» справа, возврат к почте — слева
        <div
          key="otp"
          className="animate-in fade-in slide-in-from-right-2 duration-240 ease-out-quart"
        >
          <ConfirmationForm
            email={currentEmail}
            onSubmit={handleConfirmationSubmit}
            onBackToEmail={handleBackToEmail}
            onResendCode={handleResendCode}
            isLoading={isLoading}
            error={confirmationError}
          />
        </div>
      ) : (
        <div
          key="email"
          className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-240 ease-out-quart"
        >
          <div className="mt-4">
            <p className="text-gray-600 text-base text-center">
              Создайте аккаунт или войдите, чтобы открыть новые возможности для заработка.
            </p>
          </div>

          <EmailForm onSubmit={handleEmailSubmit} />

          <p className="text-xs text-gray-500 text-center">
            Регистрируясь, вы соглашаетесь с нашими{" "}
            <Link href="/terms" className="text-primary-600 hover:underline">
              условиями использования
            </Link>{" "}
            и{" "}
            <Link href="/privacy" className="text-primary-600 hover:underline">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

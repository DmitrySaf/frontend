"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";
import { ChevronLeft } from "lucide-react";

interface ConfirmationFormProps {
  email: string;
  onSubmit: (data: { email: string; confirmationCode: string }) => void;
  onBackToEmail: () => void;
  onResendCode: () => void;
  isLoading: boolean;
  error?: string;
}

export function ConfirmationForm({
  email,
  onSubmit,
  onBackToEmail,
  onResendCode,
  isLoading,
  error,
}: ConfirmationFormProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < inputRefs.current.length) {
      const input = inputRefs.current[index];
      if (input) {
        input.focus();
      }
    }
  }, []);

  const handleInput = useCallback(
    (value: string, index: number) => {
      // Разрешаем только цифры
      const digit = value.replace(/\D/g, "").slice(-1);

      setDigits((prev) => {
        const newDigits = [...prev];
        newDigits[index] = digit;

        // Если это последняя ячейка и код полный, запускаем отправку
        if (index === 5 && digit) {
          const fullCode = newDigits.join("");
          if (fullCode.length === 6) {
            setTimeout(() => {
              onSubmit({ email, confirmationCode: fullCode });
            }, 100); // Небольшая задержка для визуального обновления
          }
        }

        return newDigits;
      });

      // Переходим к следующему инпуту если введена цифра
      if (digit && index < 5) {
        focusInput(index + 1);
      }
    },
    [focusInput, onSubmit, email]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === "Backspace") {
        event.preventDefault();

        setDigits((prev) => {
          const newDigits = [...prev];
          if (newDigits[index]) {
            // Если в текущей ячейке есть значение, очищаем его
            newDigits[index] = "";
          } else if (index > 0) {
            // Если текущая ячейка пустая, очищаем предыдущую и переходим к ней
            newDigits[index - 1] = "";
            focusInput(index - 1);
          }
          return newDigits;
        });
      } else if (!isNaN(Number(event.key)) && digits[index]) {
        // Если вводим цифру в заполненную ячейку, переходим к следующей
        if (index < 5) {
          focusInput(index + 1);
        }
      }
    },
    [digits, focusInput]
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

      const newDigits = Array(6).fill("");
      pasteData.split("").forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });

      setDigits(newDigits);

      // Если вставили полный код, запускаем отправку
      if (pasteData.length === 6) {
        setTimeout(() => {
          onSubmit({ email, confirmationCode: pasteData });
        }, 100);
      } else {
        // Фокусируемся на следующей пустой ячейке или последней заполненной
        const nextEmptyIndex = newDigits.findIndex((digit) => !digit);
        const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(pasteData.length, 5);
        focusInput(focusIndex);
      }
    },
    [focusInput, onSubmit, email]
  );

  // Автофокус на первый инпут при монтировании
  useEffect(() => {
    const timer = setTimeout(() => {
      focusInput(0);
    }, 100);
    return () => clearTimeout(timer);
  }, [focusInput]);

  // Очищаем поля при ошибке
  useEffect(() => {
    if (error) {
      setDigits(Array(6).fill(""));
      focusInput(0);
    }
  }, [error, focusInput]);

  return (
    <div className="space-y-4">
      <Button
        Icon={ChevronLeft}
        theme="ghost"
        size="l"
        onClick={onBackToEmail}
        className="absolute top-4 left-4"
      />

      <div className="space-y-4 mt-4">
        <p className="text-sm text-gray-600 text-center">
          Мы отправили код подтверждения на адрес {email}
        </p>

        <div className="flex justify-center gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={cn(
                "w-10 h-12 text-center text-base font-medium",
                "border border-gray-300 rounded-xl",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                error && "border-red-300 focus:ring-red-500"
              )}
              disabled={isLoading}
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </div>

      <Button
        type="button"
        theme="ghost"
        size="l"
        fluid
        onClick={onResendCode}
        isDisabled={isLoading}
      >
        Отправить код повторно
      </Button>
    </div>
  );
}

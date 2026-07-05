"use client";

import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

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
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < inputRefs.current.length) {
      inputRefs.current[index]?.focus();
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = useCallback(() => {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN_SECONDS);
    onResendCode();
  }, [cooldown, onResendCode]);

  const handleInput = useCallback(
    (value: string, index: number) => {
      const digit = value.replace(/\D/g, "").slice(-1);

      setDigits((prev) => {
        const newDigits = [...prev];
        newDigits[index] = digit;

        if (index === CODE_LENGTH - 1 && digit) {
          const fullCode = newDigits.join("");
          if (fullCode.length === CODE_LENGTH) {
            setTimeout(() => {
              onSubmit({ email, confirmationCode: fullCode });
            }, 100);
          }
        }

        return newDigits;
      });

      if (digit && index < CODE_LENGTH - 1) {
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
            newDigits[index] = "";
          } else if (index > 0) {
            newDigits[index - 1] = "";
            focusInput(index - 1);
          }
          return newDigits;
        });
      } else if (!isNaN(Number(event.key)) && digits[index]) {
        if (index < CODE_LENGTH - 1) {
          focusInput(index + 1);
        }
      }
    },
    [digits, focusInput]
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent) => {
      event.preventDefault();
      const pasteData = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, CODE_LENGTH);

      const newDigits = Array(CODE_LENGTH).fill("");
      pasteData.split("").forEach((char, i) => {
        if (i < CODE_LENGTH) newDigits[i] = char;
      });

      setDigits(newDigits);

      if (pasteData.length === CODE_LENGTH) {
        setTimeout(() => {
          onSubmit({ email, confirmationCode: pasteData });
        }, 100);
      } else {
        const nextEmptyIndex = newDigits.findIndex((digit) => !digit);
        const focusIndex =
          nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(pasteData.length, CODE_LENGTH - 1);
        focusInput(focusIndex);
      }
    },
    [focusInput, onSubmit, email]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      focusInput(0);
    }, 100);
    return () => clearTimeout(timer);
  }, [focusInput]);

  useEffect(() => {
    if (error) {
      setDigits(Array(CODE_LENGTH).fill(""));
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
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-black text-center">
            Введите код подтверждения
          </p>
          <p className="text-sm text-gray-600 text-center">
            Мы отправили код на <span className="font-medium text-black">{email}</span>
          </p>
        </div>

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
              placeholder={focusedIndex === index ? "" : "·"}
              onChange={(e) => handleInput(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              className={cn(
                "w-12 h-14 text-center text-2xl font-mono text-black caret-primary-500",
                "bg-white rounded-[14px] inset-ring inset-ring-gray-200 border-0",
                "placeholder:text-gray-400",
                "focus:outline-none focus:inset-ring-2 focus:inset-ring-primary-500",
                "transition-shadow",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                error && "inset-ring-[1.5px] inset-ring-danger focus:inset-ring-danger"
              )}
              disabled={isLoading}
            />
          ))}
        </div>

        {error && <p className="text-sm text-danger text-center">{error}</p>}
      </div>

      <p className="text-sm text-gray-600 text-center">
        Не получили код?{" "}
        {cooldown > 0 ? (
          <span className="text-gray-500">Отправить заново через {cooldown} с</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="font-semibold text-black hover:underline disabled:opacity-50 cursor-pointer"
          >
            Отправить заново
          </button>
        )}
      </p>
    </div>
  );
}

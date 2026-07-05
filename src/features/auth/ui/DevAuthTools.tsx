"use client";

// ============================================================
// DEV ONLY — примитивный вход по паролю без подтверждения почты.
// Удалить весь файл (и два места использования) перед продом.
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBrowserClient } from "@/api/browser-client";

const isDev = process.env.NODE_ENV === "development";

const inputClass =
  "w-full h-10 px-3 rounded-lg border border-dashed border-amber-400 bg-amber-50 text-sm focus:outline-none";

/** Блок на /login: вход по почте+паролю в обход OTP */
export function DevPasswordLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isDev) return null;

  const handleLogin = async () => {
    setIsLoading(true);
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);

    if (error) {
      toast.error("Dev-вход не удался", { description: error.message });
      return;
    }
    router.push("/communities");
  };

  return (
    <div className="mt-6 p-3 rounded-xl border border-dashed border-amber-400 bg-amber-50/50 space-y-2">
      <p className="text-xs font-semibold text-amber-700">DEV: вход по паролю (без кода)</p>
      <input
        className={inputClass}
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={inputClass}
        type="password"
        placeholder="пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading || !email || !password}
        className="w-full h-9 rounded-lg bg-amber-500 text-white text-sm font-semibold cursor-pointer disabled:opacity-50"
      >
        {isLoading ? "Входим…" : "Войти (dev)"}
      </button>
      <p className="text-[11px] text-amber-700">
        Пароль задаётся один раз в Настройки → Конфиденциальность (dev-блок внизу).
      </p>
    </div>
  );
}

/** Блок на /settings/security: задать пароль текущему аккаунту */
export function DevPasswordSetter() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isDev) return null;

  const handleSet = async () => {
    setIsLoading(true);
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      toast.error("Не удалось задать пароль", { description: error.message });
      return;
    }
    toast.success("Dev-пароль задан — теперь можно входить по нему");
    setPassword("");
  };

  return (
    <div className="mt-8 p-3 rounded-xl border border-dashed border-amber-400 bg-amber-50/50 space-y-2">
      <p className="text-xs font-semibold text-amber-700">
        DEV: задать пароль этому аккаунту (для входа без кода)
      </p>
      <div className="flex gap-2">
        <input
          className={inputClass}
          type="password"
          placeholder="новый пароль (мин. 6 символов)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSet()}
        />
        <button
          type="button"
          onClick={handleSet}
          disabled={isLoading || password.length < 6}
          className="shrink-0 h-10 px-4 rounded-lg bg-amber-500 text-white text-sm font-semibold cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "…" : "Задать"}
        </button>
      </div>
    </div>
  );
}

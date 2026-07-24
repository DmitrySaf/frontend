// Per-icon subpath, never the barrel (see Button.tsx — the 5132-module barrel hangs preview compile).
import { MagnifyingGlassBold16 } from "@frosted-ui/icons/MagnifyingGlassBold16";
import type { ReactNode } from "react";
// FormProvider/useForm come from "frontend" (the bundle's RHF instance) — NOT from
// "react-hook-form" directly, or the context won't match the Input's useFormContext.
import { FormProvider, Input, useForm } from "frontend";

function Field({ defaults, children }: { defaults: Record<string, string>; children: ReactNode }) {
  const methods = useForm({ defaultValues: defaults });
  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 360 }}>{children}</div>
    </FormProvider>
  );
}

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };

// Size ladder — md/lg/xl = 36/40/48.
export const Sizes = () => (
  <Field defaults={{ md: "", lg: "", xl: "" }}>
    <div style={stack}>
      <Input name="md" size="md" label="md · 36" placeholder="Введите текст" />
      <Input name="lg" size="lg" label="lg · 40" placeholder="Введите текст" />
      <Input name="xl" size="xl" label="xl · 48" placeholder="Введите текст" />
    </div>
  </Field>
);

// Every state at size lg — placeholder, filled, icon, prefix, clearable, error, disabled.
export const States = () => (
  <Field
    defaults={{
      empty: "",
      filled: "Пиксель",
      search: "",
      slug: "my-community",
      clr: "можно очистить",
      email: "не-e-mail",
      dis: "Недоступно",
    }}
  >
    <div style={stack}>
      <Input name="empty" size="lg" label="Плейсхолдер" placeholder="Введите имя" />
      <Input name="filled" size="lg" label="Заполнено" />
      <Input name="search" size="lg" label="С иконкой" Icon={MagnifyingGlassBold16} placeholder="Поиск…" />
      <Input name="slug" size="lg" label="Префикс" prefix="bean.co/" />
      <Input name="clr" size="lg" label="Очищаемое" isClearable />
      <Input name="email" size="lg" label="Ошибка" error="Введите корректный e-mail" />
      <Input name="dis" size="lg" label="Выключено" isDisabled />
    </div>
  </Field>
);

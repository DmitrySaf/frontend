import type { ReactNode } from "react";
// Same RHF-instance rule as Input: FormProvider/useForm come from "frontend".
import { FormProvider, Textarea, useForm } from "frontend";

function Field({ defaults, children }: { defaults: Record<string, string>; children: ReactNode }) {
  const methods = useForm({ defaultValues: defaults });
  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 420 }}>{children}</div>
    </FormProvider>
  );
}

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };

// Size ladder — md/lg/xl = 36/40/48 (min-height grows with the step).
export const Sizes = () => (
  <Field defaults={{ md: "", lg: "", xl: "" }}>
    <div style={stack}>
      <Textarea name="md" size="md" label="md · 36" placeholder="Комментарий…" rows={3} />
      <Textarea name="lg" size="lg" label="lg · 40" placeholder="Комментарий…" rows={3} />
      <Textarea name="xl" size="xl" label="xl · 48" placeholder="Комментарий…" rows={3} />
    </div>
  </Field>
);

// States — placeholder, character counter, error, disabled.
export const States = () => (
  <Field
    defaults={{
      empty: "",
      counter: "Люблю дизайн, музыку и долгие прогулки по вечернему городу.",
      about: "",
      dis: "Недоступно для редактирования",
    }}
  >
    <div style={stack}>
      <Textarea name="empty" size="lg" label="Плейсхолдер" placeholder="Напишите что-нибудь…" rows={3} />
      <Textarea name="counter" size="lg" label="Счётчик" maxLength={280} showCounter rows={3} />
      <Textarea name="about" size="lg" label="Ошибка" error="Обязательное поле" rows={3} />
      <Textarea name="dis" size="lg" label="Выключено" disabled rows={3} />
    </div>
  </Field>
);

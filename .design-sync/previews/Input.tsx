import { Search } from "lucide-react";
import type { ReactNode } from "react";
// FormProvider/useForm come from "frontend" (the bundle's RHF instance) — NOT from
// "react-hook-form" directly, or the context won't match the Input's useFormContext.
import { FormProvider, Input, useForm } from "frontend";

/* Input tie into react-hook-form via useFormContext — every preview wraps in a real
   FormProvider (the same contract the app uses), seeding values so states render. */
function Field({ defaults, children }: { defaults: Record<string, string>; children: ReactNode }) {
  const methods = useForm({ defaultValues: defaults });
  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 360 }}>{children}</div>
    </FormProvider>
  );
}

export const Default = () => (
  <Field defaults={{ name: "" }}>
    <Input name="name" size="lg" label="Имя" placeholder="Введите имя" />
  </Field>
);

export const Sizes = () => (
  <Field defaults={{ a: "", b: "", c: "" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Input name="a" size="md" label="md · 36px" placeholder="md" />
      <Input name="b" size="lg" label="lg · 40px" placeholder="lg" />
      <Input name="c" size="xl" label="xl · 48px" placeholder="xl" />
    </div>
  </Field>
);

export const WithIcon = () => (
  <Field defaults={{ q: "" }}>
    <Input name="q" size="lg" label="Поиск" Icon={Search} placeholder="Найти сообщество…" />
  </Field>
);

export const Invalid = () => (
  <Field defaults={{ email: "не-e-mail" }}>
    <Input name="email" size="lg" label="E-mail" error="Введите корректный e-mail" />
  </Field>
);

export const Clearable = () => (
  <Field defaults={{ text: "можно очистить" }}>
    <Input name="text" size="lg" label="Очищаемое поле" isClearable />
  </Field>
);

export const WithPrefix = () => (
  <Field defaults={{ slug: "my-community" }}>
    <Input name="slug" size="lg" label="Адрес" prefix="bean.co/" />
  </Field>
);

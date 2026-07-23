import type { ReactNode } from "react";
// Same RHF-instance rule as Input: FormProvider/useForm come from "frontend".
import { FormProvider, Textarea, useForm } from "frontend";

function Field({ defaults, children }: { defaults: Record<string, string>; children: ReactNode }) {
  const methods = useForm({ defaultValues: defaults });
  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 400 }}>{children}</div>
    </FormProvider>
  );
}

export const Default = () => (
  <Field defaults={{ msg: "" }}>
    <Textarea name="msg" size="lg" label="Комментарий" placeholder="Напишите что-нибудь…" rows={4} />
  </Field>
);

export const WithCounter = () => (
  <Field defaults={{ bio: "Люблю дизайн, музыку и долгие прогулки." }}>
    <Textarea name="bio" size="lg" label="О себе" maxLength={280} showCounter rows={4} />
  </Field>
);

export const Invalid = () => (
  <Field defaults={{ about: "" }}>
    <Textarea name="about" size="lg" label="Описание" error="Обязательное поле" rows={3} />
  </Field>
);

// Per-icon subpaths, never the barrel (see Button.tsx — the 5132-module barrel hangs preview compile).
import { GlobeBold16 } from "@frosted-ui/icons/GlobeBold16";
import { LockBold16 } from "@frosted-ui/icons/LockBold16";
import { PeopleBold16 } from "@frosted-ui/icons/PeopleBold16";
import type { ReactNode } from "react";
// RHF-bound like Input: FormProvider/useForm come from "frontend" (the bundle's RHF instance),
// never from "react-hook-form" directly, or useFormContext reads a different context.
import { FormProvider, Select, useForm } from "frontend";

const OPTIONS = [
  { value: "public", label: "Открытое", icon: GlobeBold16 },
  { value: "private", label: "Закрытое", icon: LockBold16 },
  { value: "invite", label: "По приглашению", icon: PeopleBold16 },
];

function Field({ defaults, children }: { defaults: Record<string, string>; children: ReactNode }) {
  const methods = useForm({ defaultValues: defaults });
  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 320 }}>{children}</div>
    </FormProvider>
  );
}

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };

// Size ladder — md/lg/xl = 36/40/48, seeded with a selected value so the trigger shows text.
export const Sizes = () => (
  <Field defaults={{ md: "public", lg: "private", xl: "invite" }}>
    <div style={stack}>
      <Select name="md" size="md" label="md · 36" options={OPTIONS} />
      <Select name="lg" size="lg" label="lg · 40" options={OPTIONS} />
      <Select name="xl" size="xl" label="xl · 48" options={OPTIONS} />
    </div>
  </Field>
);

// Trigger states (the list opens on click — the popover isn't part of a static card).
export const States = () => (
  <Field defaults={{ placeholder: "", selected: "public", err: "", dis: "" }}>
    <div style={stack}>
      <Select
        name="placeholder"
        size="lg"
        label="Плейсхолдер"
        placeholder="Выберите тип"
        options={OPTIONS}
      />
      <Select name="selected" size="lg" label="Выбрано" options={OPTIONS} />
      <Select
        name="err"
        size="lg"
        label="Ошибка"
        placeholder="Выберите тип"
        error="Выберите тип сообщества"
        options={OPTIONS}
      />
      <Select
        name="dis"
        size="lg"
        label="Выключено"
        placeholder="Недоступно"
        isDisabled
        options={OPTIONS}
      />
    </div>
  </Field>
);

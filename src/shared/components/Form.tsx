"use client";

import type { ReactNode } from "react";
import { type FieldValues, FormProvider, type UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  className?: string;
  style?: React.CSSProperties;
}

export function Form<T extends FieldValues>({
  children,
  methods,
  onSubmit,
  className,
  style,
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(async (data) => await onSubmit(data))}
        className={className}
        style={style}
      >
        {children}
      </form>
    </FormProvider>
  );
}

"use client";

import { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}

export function Form({ children, methods, onSubmit, className }: FormProps) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(async (data) => await onSubmit(data))}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}

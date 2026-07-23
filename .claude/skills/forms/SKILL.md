---
name: forms
description: Form architecture patterns using React Hook Form, Zod validation, and widget structure
triggers:
  - "form"
  - "react hook form"
  - "useForm"
  - "zod"
  - "validation"
  - "widget"
  - "zodResolver"
  - "widgets/"
  - "FormProvider"
---

# Form Handling

Form architecture based on widgets with clear separation of concerns.

## Technology Stack

- **React Hook Form** - form state management
- **Zod** - client-side validation
- **@hookform/resolvers** - Zod integration with React Hook Form
- **Поля — без движка**: `Input`/`Textarea` собраны на **нативном `<input>`/`<textarea>`/`<label>` + RHF `register`** (не RAC `TextField`, не HeroUI). Оформление — наши классы; поведение полю не нужно чужое.

### Автобинд RHF ↔ поле (важно — не ломать)

Наши `Input`/`Textarea` **сами** тянут значение из формы через `useFormContext()` и спредят
`{...register(name)}` на нативный элемент. Поэтому:

- **`Controller` не вводим** — поля привязываются по `name`, значение/`onBlur`/маска идут через `register`/`setValue`/`watch` внутри компонента.
- Публичный API поля — **`name` + `error`** (+ `label`, `size`, `description`, `mask`…). Через `error` ставим нативный `aria-invalid` и текст ошибки снизу.
- Поля живут внутри `<Form methods={methods} onSubmit={onSubmit}>` (у `Form` — `FormProvider` + `handleSubmit` внутри), поэтому `useFormContext()` в поле резолвится.
- **Публичный API полей неизменен через обе миграции** (HeroUI, затем RAC/native) — 9 форм-виджетов и `Form.tsx` не трогали.

## Widget Architecture

### Location

```
src/widgets/
  {form-name}/
    ui/
      {FormName}.tsx     # Pure form without API logic
      index.ts
    model/
      validation.ts      # Zod validation schemas
      constants.ts       # Default values
      index.ts
    index.ts
```

Notes:

- Widget props/interfaces are defined inline within `ui/{FormName}.tsx`.

### Widget Types

#### 1. **Form Widgets** (only `<form>`)

Contains exclusively:

- `<form>` element with fields
- Submit button
- Field validation
- NO headers, wrappers, or API logic

#### 2. **Modal Widgets with Forms** (modal + form)

Contains:

- `<Dialog>` component
- `<form>` inside modal
- Modal management logic

## Data Handling Principles

### Form Data Types

#### **Forms with Required Values** (editing existing data)

```tsx
interface EntityFormProps {
  initValues: EntityData; // Required data from server
  onSubmit: (data: EntityData) => void;
  isLoading: boolean;
  isDataLoading: boolean;
}
```

#### **Forms with Optional Values** (create/edit hybrid)

```tsx
interface EntityFormProps {
  initValues: Partial<EntityData>;
  onSubmit: (data: EntityData) => void;
  isLoading: boolean;
  isDataLoading?: boolean;
}
```

#### **Forms without External Values** (create only)

```tsx
interface EntityFormProps {
  onSubmit: (data: EntityData) => void;
  isLoading: boolean;
  // defaultValues taken from constants inside widget
}
```

## Widget Structure

### model/validation.ts

```tsx
import { z } from "zod";

export const entitySchema = z.object({
  name: z.string().min(1, "Enter name"),
  email: z.string().email("Enter valid email"),
  // ... other fields
});

export type EntityData = z.infer<typeof entitySchema>;
```

### model/types.ts

```tsx
export interface EntityFormProps {
  initValues: EntityData;
  onSubmit: (data: EntityData) => void;
  isLoading: boolean;
  isDataLoading?: boolean;
}
```

### model/constants.ts

```tsx
export const DEFAULT_ENTITY_VALUES = {
  name: "",
  email: "",
  // ... default values
};
```

### ui/Form.tsx

```tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button } from "@/shared/components";

export function EntityForm({
  initValues,
  onSubmit,
  isLoading,
}: EntityFormProps) {
  const methods = useForm<EntityData>({
    resolver: zodResolver(entitySchema),
    defaultValues: initValues,
  });

  const {
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    reset(initValues);
  }, [initValues, reset]);

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-6">
      <Input name="name" size="lg" label="Name" error={errors.name?.message} />

      <Button
        type="submit"
        isLoading={isLoading}
        theme="primary"
        size="lg"
        fluid
      >
        Сохранить
      </Button>
    </Form>
  );
}
```

## Parent Component Usage

### Forms with Required Values (with API loading)

```tsx
export function EntitySettings() {
  const { data: entityData, isLoading } = useEntityData();
  const updateEntity = useUpdateEntity();

  const handleSubmit = async (data: EntityData) => {
    // API logic, mutations, toasts, etc.
  };

  const initValues = {
    name: entityData?.name || "",
    email: entityData?.email || "",
    // ... prepare server data
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Entity Settings</h1>

      <EntityForm
        initValues={initValues}
        onSubmit={handleSubmit}
        isLoading={updateEntity.isPending}
        isDataLoading={isLoading}
      />
    </div>
  );
}
```

### Forms without External Values (with modal)

```tsx
export function EntityList() {
  const createEntity = useCreateEntity();
  const [createParam, setCreateParam] = useQueryState("create");

  const handleSubmit = async (data: CreateEntityData) => {
    // API logic, mutations, toasts, etc.
  };

  return (
    <>
      <EntityCreateModal
        isOpen={createParam === "entity"}
        onClose={() => setCreateParam(null)}
        onSubmit={handleSubmit}
        isLoading={createEntity.isPending}
      />
    </>
  );
}
```

## Form Components

### Shared Components Used

- `Input` - text fields with validation
- `Textarea` - multiline fields
- `Button` - buttons with loading states
- `Switch` - toggles
- `Dialog` - modal windows

### useForm Destructuring

```tsx
// ✅ Correct
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  watch,
  setValue,
} = useForm();

// ❌ Incorrect
const form = useForm();
```

### Submit Handling

```tsx
// ✅ Correct with shared Form wrapper
<Form methods={methods} onSubmit={onSubmit}>
  {/* fields */}
</Form>

// ❌ Incorrect - wrapping with handleSubmit when using Form
<Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
  {/* fields */}
</Form>
```

## Data Loading States

### For Forms with Required Values

```tsx
if (isDataLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader />
    </div>
  );
}
```

## External Logic Handling

Forms only handle:

- Form state and validation
- UI rendering
- Calling `onSubmit` with form data

External logic (handled in parent components):

- API calls and mutations
- Toast notifications
- Cache invalidation
- Navigation after success
- Error handling beyond validation

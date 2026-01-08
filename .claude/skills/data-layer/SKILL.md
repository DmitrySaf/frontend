---
name: data-layer
description: Guidelines for API layer, React Query, mutations, and data fetching in entities/features
triggers:
  - "api/"
  - "queries"
  - "mutation"
  - "react query"
  - "tanstack"
  - "useQuery"
  - "useMutation"
  - "supabase select"
  - "entities/"
  - "features/"
  - "data fetching"
  - "cache invalidation"
---

# Data Layer Architecture

Complete guide for API layer, React Query integration, and data mutations in entities and features.

## File Structure

Each entity or feature follows this structure:

```
src/
  entities/{entity}/
    api/
      api.ts          # Pure API functions
      types.ts        # API types and interfaces
      queries.ts      # React Query hooks (client + server)
      mutations.ts    # React Query mutations
      constants.ts    # Query keys for typed caching
      realtime.ts     # Realtime subscriptions (optional)
      index.ts        # API layer exports
    model/
      mappers.ts      # Data transformation functions
      validation.ts   # Zod schemas and types
      index.ts        # Model layer exports
```

---

## 1. API Layer (api.ts)

Contains only HTTP requests without React Query logic.

### Patterns

```typescript
import { apiClient } from "@/shared/config";
import type { EntityResponse, CreateEntityData } from "./types";

/**
 * Get entities list
 */
export const getEntities = async (): Promise<EntityResponse[]> => {
  const { data } = await apiClient.get("/entities");
  return data;
};

/**
 * Get single entity
 */
export const getEntity = async (id: string): Promise<EntityResponse> => {
  const { data } = await apiClient.get(`/entities/${id}`);
  return data;
};

/**
 * Create new entity
 */
export const createEntity = async (data: CreateEntityData): Promise<void> => {
  await apiClient.post("/entities", data);
};

/**
 * Delete entity
 */
export const deleteEntity = async (id: string): Promise<void> => {
  await apiClient.delete(`/entities/${id}`);
};
```

### Rules

- Only HTTP requests, no React Query logic
- Use `apiClient` from shared config
- Import types from `./types`
- Import validation types from `../model`
- Return Promise with proper typing
- Use async/await syntax

### Supabase Select Rules

**NEVER use `select('*')`** in Supabase queries. Always specify exact fields needed:

```typescript
// ❌ BAD - Don't use select('*')
return client.from('users').select('*')

// ✅ GOOD - Specify fields explicitly, exclude 'id' when not needed
return client.from('users').select('username, email, created_at')

// ✅ GOOD - Include 'id' only when absolutely necessary for operations
return client.from('users').select('id, username').eq('username', name)
```

**Rules for select:**
- Always list specific field names
- Exclude `id` field unless it's needed for updates/deletes/references
- Use snake_case for database field names (e.g., `created_at`, not `createdAt`)
- List fields in logical order (data fields first, then timestamps)
- For RLS policies and relationships, id is handled by Supabase internally

---

## 2. Types (types.ts)

Contains interfaces for API requests and responses.

### Patterns

```typescript
// Domain entity (for UI)
export interface Entity {
  displayName: string;
  name: string;
}

// API response (from server)
export interface EntityResponse {
  id: string;
  displayName: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
```

### Rules

- Separate domain types from API types
- Domain types (`Entity`) - minimal data for UI
- Response types (`EntityResponse`) - full server response
- Use clear naming: `EntityResponse`, `CreateEntityRequest`
- Export interfaces, not classes

---

## 3. Mappers (model/mappers.ts)

Contains functions to transform API data to domain models.

### Patterns

```typescript
import { Entity, EntityResponse } from "../api/types";

export const transformEntity = (response: EntityResponse): Entity => {
  return {
    displayName: response.displayName,
    name: response.name,
  };
};
```

### Rules

- Transform API responses to domain models
- Use clear function names: `transformEntity`, `transformEntities`
- Import types from API layer
- Keep transformations simple and pure
- Export individual transform functions

---

## 4. Query Keys (constants.ts)

```typescript
// Query keys for typed caching
export const entityQueryKeys = {
  entities: ["entities"],
  entity: (id: string) => ["entities", id],
};
```

---

## 5. React Query Hooks (queries.ts)

Client-side and server-side hooks in same file.

```typescript
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEntities } from "./api";
import { transformEntity } from "../model/mappers";
import { entityQueryKeys } from "./constants";
import type { Entity } from "./types";

// Client hook
export const useEntitiesQuery = (): UseQueryResult<Entity[]> => {
  return useQuery({
    queryKey: entityQueryKeys.entities,
    queryFn: getEntities,
    select: (data) => data.map(transformEntity),
  });
};

// Server hook
export const useEntitiesServerQuery = (): UseQueryResult<Entity> => {
  return useServerQuery({
    queryKey: entityQueryKeys.entities,
    queryFn: getEntities,
    select: (data) => transformEntity(data),
  });
};

// Invalidation hook
export const useInvalidateEntities = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: entityQueryKeys.entities });
  };
};
```

### Usage in Server Components

```typescript
// app/(authenticated)/entities/page.tsx
import { useEntitiesServerQuery } from "@/entities/entity";

export default async function EntitiesPage() {
  const { dehydratedState } = await useEntitiesServerQuery();

  return (
    <HydrationBoundary state={dehydratedState}>
      <EntityList />
    </HydrationBoundary>
  );
}
```

### Usage in Client Components

```typescript
// pages/entity-list/ui/EntityList.tsx
"use client";

import { useEntitiesQuery } from "@/entities/entity";

export default function EntityList() {
  const { data, isLoading, error } = useEntitiesQuery();
  // ...
}
```

---

## 6. Mutations (mutations.ts)

Mutation hooks with error handling and notifications.

### Structure Example

```typescript
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEntity, type CreateEntityData } from "./api";
import { useInvalidateEntities } from "./queries";

export const useCreateEntity = () => {
  const invalidateEntities = useInvalidateEntities();

  return useMutation({
    mutationFn: createEntity,
    onSuccess: () => {
      toast.success("Сущность создана успешно");
      invalidateEntities();
    },
    onError: (error) => {
      toast.error("Ошибка при создании сущности", {
        description:
          error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
```

### Mutation Rules

#### 1. Always Invalidate Cache Manually

```typescript
onSuccess: () => {
  toast.success("Операция выполнена успешно");
  invalidateEntities();
};
```

#### 2. Handle Errors via Toast

```typescript
onError: (error) => {
  toast.error("Заголовок ошибки", {
    description: error instanceof Error ? error.message : "Общее сообщение",
  });
};
```

### Toast Types

```typescript
// Success operations
toast.success("Операция выполнена!");

// Errors (shown in mutations)
toast.error("Ошибка операции", {
  description: "Описание ошибки или совет",
});

// Informational
toast.info("Данные обновлены");
```

### Usage in Components

```typescript
// In component
const createEntity = useCreateEntity();

const handleCreate = async (data) => {
  try {
    const result = await createEntity.mutateAsync(data);
    onClose(); // Close form/modal
    // Data will update automatically via realtime
  } catch (error) {
    // Error shown via toast in mutation
  }
};
```

### Checklist for New Mutations

- [ ] Mutation uses `useMutation` from React Query
- [ ] Invalidates cache manually using invalidation hooks
- [ ] Shows success via `toast.success` without description
- [ ] Shows errors via `toast.error` with description

---
name: realtime
description: Supabase realtime integration patterns for automatic data updates and cache invalidation
triggers:
  - "realtime"
  - "supabase realtime"
  - "useSupabaseRealtime"
  - "subscription"
  - "live updates"
  - "websocket"
---

# Supabase Realtime Integration

This document describes the approach to integrating Supabase realtime for automatic data updates.

## Usage

### Creating Domain Realtime Hook

```typescript
"use client";

import { useSupabaseRealtime } from "@/shared/composables";
import { entityQueryKeys } from "./constants";

export const useEntitiesRealtime = (enabled: boolean = true) => {
  useSupabaseRealtime({
    table: "entities",
    queryKeys: [entityQueryKeys.entities],
    enabled,
  });
};
```

### Integration in Components

```typescript
// In components that display entity data
export default function EntityList() {
  const { data, isLoading, error } = useEntitiesQuery();

  // Connect realtime subscription
  useEntitiesRealtime(true);

  // Rest of component logic...
}
```

## useSupabaseRealtime Configuration

### Parameters

```typescript
interface UseSupabaseRealtimeOptions {
  table: string; // Table name in Supabase
  queryKeys: string[][]; // Query keys for invalidation
  enabled?: boolean; // Enable/disable subscription
}
```

### Usage Patterns

#### Basic Subscription

```typescript
// Only automatic cache invalidation
useEntitiesRealtime(true);
```

#### Conditional Subscription

```typescript
// Subscription only on specific pages
const isEntityPage = pathname.includes("/entities");
useEntitiesRealtime(isEntityPage);
```

#### Multiple Query Keys

```typescript
// Invalidation of multiple related caches
useSupabaseRealtime({
  table: "entities",
  queryKeys: [
    entityQueryKeys.entities,
    entityQueryKeys.userEntities,
    ["dashboard-stats"], // Related data
  ],
});
```

/**
 * Central TanStack Query key factory.
 * Every feature builds its keys from here so cache invalidation stays predictable.
 */
type Filters = Record<string, string | number | boolean | undefined>

function createKeys<const T extends string>(scope: T) {
  return {
    all: [scope] as const,
    lists: () => [scope, "list"] as const,
    list: (filters: Filters = {}) => [scope, "list", filters] as const,
    details: () => [scope, "detail"] as const,
    detail: (id: string) => [scope, "detail", id] as const,
  }
}

export const queryKeys = {
  enquiries: createKeys("enquiries"),
  batches: createKeys("batches"),
  students: createKeys("students"),
  fees: createKeys("fees"),
  staff: createKeys("staff"),
  dashboard: {
    all: ["dashboard"] as const,
    summary: () => ["dashboard", "summary"] as const,
  },
  settings: {
    all: ["settings"] as const,
  },
} as const

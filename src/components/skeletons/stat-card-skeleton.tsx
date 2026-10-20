import { Skeleton } from "@/components/ui/skeleton"

export function StatCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5" aria-hidden>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="size-9 rounded-[10px]" />
      </div>
      <Skeleton className="h-11 w-20" />
      <Skeleton className="h-3.5 w-36" />
    </div>
  )
}

export function StatGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  )
}

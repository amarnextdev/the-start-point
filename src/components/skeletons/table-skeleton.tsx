import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton({ rows = 6, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden>
      <div className="flex gap-4 border-b px-4 py-3.5">
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex items-center gap-4 border-b px-4 py-4 last:border-0">
          {Array.from({ length: columns }, (_, c) => (
            <Skeleton key={c} className={c === 0 ? "h-4 flex-[1.4]" : "h-4 flex-1"} />
          ))}
        </div>
      ))}
    </div>
  )
}

import { StatGridSkeleton, TableSkeleton } from "@/components/skeletons"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-6">
      <Skeleton className="h-9 w-48" />
      <StatGridSkeleton />
      <TableSkeleton />
    </div>
  )
}

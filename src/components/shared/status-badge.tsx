import { cn } from "@/lib/utils"
import type { BatchStatus, EnquiryStatus, FeeStatus } from "@/types"

type Status = EnquiryStatus | BatchStatus | FeeStatus

const styles: Record<Status, string> = {
  New: "bg-[var(--status-new-bg)] text-[var(--status-new-fg)]",
  Contacted: "bg-[var(--status-contacted-bg)] text-[var(--status-contacted-fg)]",
  "Trial Class Scheduled": "bg-[var(--status-trial-bg)] text-[var(--status-trial-fg)]",
  Joined: "bg-[var(--status-joined-bg)] text-[var(--status-joined-fg)]",
  Upcoming: "bg-[var(--status-contacted-bg)] text-[var(--status-contacted-fg)]",
  Running: "bg-[var(--status-joined-bg)] text-[var(--status-joined-fg)]",
  Completed: "bg-muted text-muted-foreground",
  Paid: "bg-[var(--status-joined-bg)] text-[var(--status-joined-fg)]",
  Pending: "bg-[var(--status-new-bg)] text-[var(--status-new-fg)]",
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap",
        styles[status],
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  )
}

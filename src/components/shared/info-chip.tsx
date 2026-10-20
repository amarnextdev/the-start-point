import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Plain icon + text fact — deliberately not pill-shaped so it never reads as a button. */
export function InfoChip({
  icon: Icon,
  children,
  className,
}: {
  icon: LucideIcon
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground",
        className
      )}
    >
      <Icon className="size-4 text-clay" aria-hidden />
      {children}
    </span>
  )
}

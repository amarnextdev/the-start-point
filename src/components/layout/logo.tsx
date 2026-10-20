import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Logo({
  href = "/",
  inverted = false,
  subtitle,
  className,
}: {
  href?: string
  inverted?: boolean
  subtitle?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-3 rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={cn(
          "relative grid size-11 shrink-0 place-items-center rounded-xl font-display text-[15px] font-extrabold tracking-tight transition-transform group-hover:-rotate-3",
          inverted ? "bg-white text-navy" : "bg-navy text-white"
        )}
      >
        {siteConfig.monogram}
        <span
          aria-hidden
          className={cn(
            "absolute -top-1 -right-1 size-3 rounded-full bg-coral ring-2",
            inverted ? "ring-navy-deep" : "ring-background"
          )}
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold">{siteConfig.name}</span>
        {subtitle && (
          <span className={cn("text-xs", inverted ? "text-white/70" : "text-muted-foreground")}>
            {subtitle}
          </span>
        )}
      </span>
    </Link>
  )
}

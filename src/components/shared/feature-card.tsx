import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { IconTile } from "./icon-tile"

type Tone = "coral" | "saffron" | "navy" | "white" | "cream"

export function FeatureCard({
  icon,
  tone = "cream",
  title,
  description,
  surface = "card",
  className,
}: {
  icon: LucideIcon
  tone?: Tone
  title: string
  description: string
  /** Card background: white card or cream fill. */
  surface?: "card" | "cream"
  className?: string
}) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_44px_-22px_rgb(19_32_63/0.35)]",
        surface === "card" ? "border bg-card" : "bg-background",
        className
      )}
    >
      <IconTile
        icon={icon}
        tone={tone}
        size="lg"
        className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
      />
      <h3 className="text-xl font-bold sm:text-[22px]">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

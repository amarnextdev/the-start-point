import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const iconTileVariants = cva("grid shrink-0 place-items-center", {
  variants: {
    tone: {
      coral: "bg-coral text-navy",
      saffron: "bg-saffron text-navy",
      navy: "bg-navy text-white",
      cream: "bg-muted text-navy",
      white: "border bg-card text-navy",
    },
    size: {
      sm: "size-9 rounded-[10px] [&_svg]:size-4",
      md: "size-12 rounded-[14px] [&_svg]:size-5",
      lg: "size-14 rounded-2xl [&_svg]:size-6",
    },
  },
  defaultVariants: { tone: "cream", size: "md" },
})

export function IconTile({
  icon: Icon,
  tone,
  size,
  className,
}: { icon: LucideIcon; className?: string } & VariantProps<typeof iconTileVariants>) {
  return (
    <span className={cn(iconTileVariants({ tone, size }), className)}>
      <Icon aria-hidden />
    </span>
  )
}

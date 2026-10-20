import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionVariants = cva("relative", {
  variants: {
    tone: {
      cream: "bg-background",
      white: "bg-card",
      navy: "bg-secondary text-secondary-foreground",
      saffron: "bg-saffron text-navy",
    },
    spacing: {
      default: "py-16 sm:py-20 lg:py-28",
      compact: "py-12 sm:py-16",
      none: "",
    },
  },
  defaultVariants: { tone: "cream", spacing: "default" },
})

export function Section({
  className,
  tone,
  spacing,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return <section className={cn(sectionVariants({ tone, spacing }), className)} {...props} />
}

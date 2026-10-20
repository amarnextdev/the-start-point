import { cn } from "@/lib/utils"

/** Striped box shown until a real photo is uploaded from Admin → Settings. */
export function ImagePlaceholder({
  label,
  dark = false,
  className,
}: {
  label: string
  dark?: boolean
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn(
        "grid place-items-center text-xs font-bold tracking-[0.08em] uppercase",
        dark ? "bg-placeholder-dark text-white/70" : "bg-placeholder text-[#6b6150]",
        className
      )}
    >
      [{label}]
    </div>
  )
}

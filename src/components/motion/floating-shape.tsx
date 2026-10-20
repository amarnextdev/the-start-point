import { cn } from "@/lib/utils"

/** Decorative floating shape (CSS animation, hidden from screen readers). */
export function FloatingShape({ className, slow = false }: { className?: string; slow?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute",
        slow ? "animate-float-slow" : "animate-float",
        className
      )}
    />
  )
}

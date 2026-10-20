import { cn } from "@/lib/utils"

/** Small uppercase label with a short accent line, used above section titles. */
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.14em] text-clay uppercase sm:text-sm",
        "before:h-0.5 before:w-5 before:rounded-full before:bg-current",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

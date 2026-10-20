"use client"

import { Search, type LucideIcon } from "lucide-react"

import { IconTile } from "@/components/shared/icon-tile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn, getInitials } from "@/lib/utils"

type Tone = "coral" | "saffron" | "navy" | "white" | "cream"

export function StatCard({
  icon,
  tone = "cream",
  label,
  value,
  hint,
  className,
}: {
  icon: LucideIcon
  tone?: Tone
  label: string
  value: React.ReactNode
  hint?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl border bg-card p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-muted-foreground">{label}</span>
        <IconTile icon={icon} tone={tone} size="sm" />
      </div>
      <div>
        <div className="font-display text-[1.9rem] leading-none font-extrabold tracking-tight tabular-nums">{value}</div>
        {hint && <div className="mt-2 text-xs font-medium text-muted-foreground">{hint}</div>}
      </div>
    </div>
  )
}

/** Card with a header row (title, optional description and action). */
export function Panel({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section className={cn("flex flex-col overflow-hidden rounded-2xl border bg-card", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold">{title}</h2>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </header>
      <div className={cn("flex-1", bodyClassName)}>{children}</div>
    </section>
  )
}

export function SearchField({
  value,
  onChange,
  placeholder = "Search",
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 pl-10"
      />
    </div>
  )
}

/** Row of filter pills, each with a count. */
export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string; count?: number }[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              active ? "border-navy bg-navy text-white" : "bg-card text-foreground/75 hover:border-foreground/25 hover:text-foreground"
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  active ? "bg-white/15 text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

const avatarTones = ["bg-coral/20 text-clay", "bg-saffron/30 text-[#6b4a00]", "bg-navy/10 text-navy", "bg-[#d5f2ec] text-[#0f5c4f]"]

export function PersonAvatar({ name, className }: { name: string; className?: string }) {
  const tone = avatarTones[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % avatarTones.length]
  return (
    <span className={cn("grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold", tone, className)}>
      {getInitials(name)}
    </span>
  )
}

export function PersonCell({ name, sub }: { name: string; sub?: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <PersonAvatar name={name} />
      <div className="min-w-0 leading-tight">
        <div className="truncate font-semibold">{name}</div>
        {sub && <div className="truncate text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  )
}

/** Thin progress bar, e.g. seats filled or attendance. */
export function Meter({ value, max = 100, tone = "navy", className }: { value: number; max?: number; tone?: "navy" | "coral" | "green"; className?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-navy/[0.08]", className)} aria-hidden>
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500",
          tone === "coral" ? "bg-coral" : tone === "green" ? "bg-[#1f9d6d]" : "bg-navy"
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function FormField({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/** Shown in table bodies when filters match nothing. */
export function NoResults({ message = "Nothing matches these filters." }: { message?: string }) {
  return <div className="px-5 py-12 text-center text-sm text-muted-foreground">{message}</div>
}

/** Small "demo data" note so nobody mistakes these records for real ones. */
export function DemoDataNote() {
  return (
    <p className="text-xs text-muted-foreground">
      Showing demo data. Changes are saved in this browser until the database is connected.
    </p>
  )
}

/** WhatsApp link from a phone number, with an optional pre-filled message. */
export function whatsappHref(phone: string, message?: string) {
  const url = new URL(`https://wa.me/${phone.replace(/\D/g, "")}`)
  if (message) url.searchParams.set("text", message)
  return url.toString()
}

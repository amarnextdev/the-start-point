import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge Tailwind class names, letting later classes win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Initials for avatars: "Sample Student" → "SS". */
export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

/** Human-friendly date, e.g. "17 Oct 2026". Returns "—" for empty values. */
export function formatDate(value?: string | number | Date | null) {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date)
}

/** Absolute URL for SEO/Open Graph, based on NEXT_PUBLIC_SITE_URL. */
export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  return new URL(path, base).toString()
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

/** Indian rupees without decimals, e.g. "₹51,000". */
export function formatINR(amount: number) {
  return inrFormatter.format(amount)
}

const monthFormatter = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" })

/** "2026-10" → "October 2026". */
export function formatMonth(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number)
  if (!year || !month) return monthKey
  return monthFormatter.format(new Date(year, month - 1, 1))
}

/** Month key for a date, e.g. "2026-10". */
export function toMonthKey(date: Date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

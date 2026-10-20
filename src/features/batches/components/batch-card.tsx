import Link from "next/link"
import { ArrowRight, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { Batch } from "../types"

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const LOW_SEATS = 3

/** "3 Nov 2026" → { day: "03", month: "Nov" }; null when the date isn't in that shape. */
function splitDate(date: string) {
  const match = /^(\d{1,2})\s+([A-Za-z]{3})/.exec(date.trim())
  const [, day, month] = match ?? []
  return day && month ? { day: day.padStart(2, "0"), month } : null
}

function DateBlock({ date, featured }: { date: string; featured: boolean }) {
  const parts = splitDate(date)
  if (!parts) return null
  return (
    <div
      className={cn(
        "flex w-16 shrink-0 flex-col overflow-hidden rounded-2xl border text-center",
        featured ? "border-white/15 bg-white/6" : "bg-card"
      )}
    >
      <span className="bg-coral py-1 text-[11px] font-bold tracking-[0.12em] text-navy uppercase">{parts.month}</span>
      <span className="py-1.5 font-display text-2xl leading-none font-extrabold tabular-nums">{parts.day}</span>
    </div>
  )
}

/** Mon–Sun strip with class days lit up; falls back to the raw text if no day names are found. */
function WeekStrip({ days, featured }: { days: string; featured: boolean }) {
  const active = WEEK.map((d) => days.toLowerCase().includes(d.toLowerCase()))
  if (!active.some(Boolean)) return <span className="font-semibold">{days}</span>

  return (
    <div className="grid grid-cols-7 gap-1" role="img" aria-label={`Classes on ${days}`}>
      {WEEK.map((d, i) => (
        <span
          key={d}
          className={cn(
            "rounded-lg py-1.5 text-center text-[11px] font-bold",
            active[i]
              ? featured
                ? "bg-saffron text-navy"
                : "bg-navy text-white"
              : featured
                ? "bg-white/6 text-white/35"
                : "bg-muted text-muted-foreground/55"
          )}
        >
          {d.slice(0, 2)}
        </span>
      ))}
    </div>
  )
}

export function SeatMeter({
  seatsLeft,
  totalSeats,
  featured = false,
}: Pick<Batch, "seatsLeft" | "totalSeats"> & { featured?: boolean }) {
  const known = typeof seatsLeft === "number" && typeof totalSeats === "number" && totalSeats > 0
  if (!known) return null

  const taken = Math.max(0, Math.min(totalSeats, totalSeats - seatsLeft))
  const low = seatsLeft <= LOW_SEATS

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className={cn("font-semibold", featured ? "text-white/70" : "text-muted-foreground")}>
          {taken} of {totalSeats} seats booked
        </span>
        <span className={cn("font-bold", low ? (featured ? "text-saffron" : "text-clay") : undefined)}>
          {seatsLeft === 0 ? "Batch full" : low ? `Only ${seatsLeft} left` : `${seatsLeft} left`}
        </span>
      </div>
      <div className="flex gap-0.75" aria-hidden>
        {Array.from({ length: totalSeats }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full",
              i < taken ? (low ? "bg-coral" : featured ? "bg-white" : "bg-navy") : featured ? "bg-white/15" : "bg-navy/10"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export function BatchCard({
  batch,
  ctaHref,
  ctaLabel = "Reserve a seat",
  tone = "white",
  className,
}: {
  batch: Batch
  ctaHref: string
  ctaLabel?: string
  tone?: "white" | "cream"
  className?: string
}) {
  const featured = Boolean(batch.tag)
  const full = batch.seatsLeft === 0

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[28px] border p-7 transition-all duration-300 hover:-translate-y-1.5",
        featured
          ? "border-navy bg-navy text-white shadow-[0_34px_60px_-30px_rgb(19_32_63/0.75)]"
          : cn(
              "hover:shadow-[0_26px_44px_-22px_rgb(19_32_63/0.35)]",
              tone === "white" ? "bg-card" : "border-transparent bg-background"
            ),
        className
      )}
    >
      {batch.tag && (
        <span className="absolute -top-3.5 left-7 rounded-full bg-saffron px-3.5 py-1.5 text-xs font-bold text-navy shadow-sm">
          {batch.tag}
        </span>
      )}

      <header className="flex items-start gap-4">
        <DateBlock date={batch.startDate} featured={featured} />
        <div className="flex min-w-0 flex-col gap-1 pt-0.5">
          <span
            className={cn(
              "text-xs font-bold tracking-[0.12em] uppercase",
              featured ? "text-saffron" : "text-clay"
            )}
          >
            {batch.level}
          </span>
          <h3 className="text-2xl leading-tight font-bold">{batch.name}</h3>
          {batch.hint && (
            <p className={cn("text-sm", featured ? "text-white/65" : "text-muted-foreground")}>{batch.hint}</p>
          )}
        </div>
      </header>

      {!splitDate(batch.startDate) && (
        <p className={cn("mt-4 text-sm", featured ? "text-white/70" : "text-muted-foreground")}>
          Starts <span className="font-semibold">{batch.startDate}</span>
        </p>
      )}

      <div className={cn("mt-6 border-t pt-6", featured && "border-white/10")}>
        <WeekStrip days={batch.days} featured={featured} />
        <dl className="mt-5 flex flex-col gap-2.5 text-[15px]">
          <div className="flex items-center gap-3">
            <Clock className={cn("size-4 shrink-0", featured ? "text-saffron" : "text-clay")} aria-hidden />
            <dt className="sr-only">Timing</dt>
            <dd className="font-semibold">
              {batch.timing}
              <span className={cn("font-normal", featured ? "text-white/60" : "text-muted-foreground")}>
                {" "}
                · {batch.duration}
              </span>
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className={cn("size-4 shrink-0", featured ? "text-saffron" : "text-clay")} aria-hidden />
            <dt className="sr-only">Location</dt>
            <dd className="font-semibold">{batch.location}</dd>
          </div>
        </dl>
      </div>

      <div className={cn("mt-6 border-t pt-6", featured && "border-white/10")}>
        <SeatMeter seatsLeft={batch.seatsLeft} totalSeats={batch.totalSeats} featured={featured} />
      </div>

      <Button
        asChild
        variant={featured ? "default" : "secondary"}
        size="lg"
        className="mt-7 w-full rounded-2xl pt-px"
      >
        <Link href={ctaHref}>
          {full ? "Join the waitlist" : ctaLabel}
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </article>
  )
}

import Link from "next/link"
import { ArrowRight, Check, MapPin, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Section } from "@/components/shared/section"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const levels = ["Beginner", "Intermediate", "Advanced"]

/** Three-step meter; fills the steps named in the course level string. */
function LevelMeter({ level }: { level: string }) {
  const covered = levels.map((step) => level.toLowerCase().includes(step.toLowerCase()))
  return (
    <div className="mt-4 grid grid-cols-3 gap-1" aria-hidden>
      {levels.map((step, i) => (
        <div key={step}>
          <div
            className={cn(
              "h-1.5",
              i === 0 && "rounded-l-full",
              i === levels.length - 1 && "rounded-r-full",
              covered[i] ? "bg-coral" : "bg-navy/[0.08]"
            )}
          />
          <span
            className={cn(
              "mt-2 block text-[11px] font-semibold tracking-[0.08em] uppercase",
              covered[i] ? "text-foreground/80" : "text-muted-foreground/50"
            )}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

/** One seat per student, so "small batch" is shown rather than just stated. */
function SeatRow({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-1" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="grid size-6 place-items-center rounded-md bg-navy/[0.06] text-navy/70">
          <UserRound className="size-3.5" strokeWidth={2.4} />
        </span>
      ))}
    </div>
  )
}

function Fact({ label, value, note, className }: { label: string; value: string; note?: string; className?: string }) {
  return (
    <div className={cn("py-5", className)}>
      <dt className="text-[13px] font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1">
        <span className="block text-lg leading-snug font-bold">{value}</span>
        {note && <span className="mt-0.5 block text-sm text-muted-foreground">{note}</span>}
      </dd>
    </div>
  )
}

function CourseSpecCard() {
  const { course } = siteConfig
  const seats = Number.parseInt(course.classSize, 10)

  return (
    <div className="relative">
      <div aria-hidden className="absolute inset-[22px_-14px_-18px_26px] rotate-[2.5deg] rounded-[30px] bg-saffron" />

      <div className="relative overflow-hidden rounded-[28px] border bg-card shadow-[0_40px_70px_-45px_rgb(19_32_63/0.55)]">
        <div className="flex items-center justify-between gap-4 border-b bg-muted/60 px-7 py-4">
          <span className="text-xs font-bold tracking-[0.14em] uppercase">Course at a glance</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <MapPin className="size-3.5 text-clay" aria-hidden />
            {course.location}
          </span>
        </div>

        <dl className="divide-y px-7">
          <div className="py-5">
            <dt className="text-[13px] font-medium text-muted-foreground">Level</dt>
            <dd className="mt-1 text-lg font-bold">{course.level}</dd>
            <LevelMeter level={course.level} />
          </div>

          <div className="grid grid-cols-2 divide-x">
            <Fact label="Duration" value={course.duration} note={course.totalClasses} className="pr-5" />
            <Fact label="Schedule" value={course.classesPerWeek} note={course.classLength} className="pl-5" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
            <div>
              <dt className="text-[13px] font-medium text-muted-foreground">Batch size</dt>
              <dd className="mt-1 text-lg font-bold">Max {course.classSize} students</dd>
            </div>
            {Number.isFinite(seats) && <SeatRow count={seats} />}
          </div>
        </dl>

        <div className="bg-navy px-7 pt-6 pb-7 text-white">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div>
              <span className="text-[13px] font-medium text-white/60">Course fee</span>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-[2.6rem] leading-none font-extrabold tracking-tight">{course.fee}</span>
                <span className="text-sm font-semibold text-white/60">{course.feePeriod}</span>
              </p>
              <span className="mt-2 block text-sm text-white/60">{course.feeNote}</span>
            </div>
            <Button asChild size="lg">
              <Link href="#enquire">
                Enquire now <ArrowRight />
              </Link>
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm text-white/80">
            {course.feeIncludes.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-4 text-saffron" strokeWidth={3} aria-hidden />
                {item} included
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function CourseOverview() {
  const { course } = siteConfig

  return (
    <Section id="course" className="pt-24 sm:pt-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col">
          <Eyebrow>The course</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold text-balance">
            {course.name}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {course.description}
          </p>

          <div className="mt-9 max-w-xl">
            <span className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
              By the end of the course, you will
            </span>
            <ol className="mt-3 border-t">
              {course.outcomes.map((outcome, i) => (
                <li key={outcome} className="group flex items-baseline gap-5 border-b py-4">
                  <span className="font-display text-sm font-bold text-clay tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold transition-transform duration-300 group-hover:translate-x-1">
                    {outcome}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="#batches">
                See upcoming batches <ArrowRight />
              </Link>
            </Button>
            <Link
              href="/courses"
              className="text-sm font-bold underline decoration-navy/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-coral"
            >
              View full syllabus
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} y={30} className="lg:pr-4">
          <CourseSpecCard />
        </Reveal>
      </Container>
    </Section>
  )
}

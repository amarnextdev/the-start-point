import Link from "next/link"
import { ArrowRight, CalendarDays, Check, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { IconTile } from "@/components/shared/icon-tile"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { BatchesExplorer } from "@/features/batches/components/batches-explorer"
import type { Batch } from "@/features/batches/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { audiences, feeFacts, feeIncludes, modules, type AudienceItem } from "../data/content"

const toneClass = {
  coral: "bg-coral text-navy",
  saffron: "bg-saffron text-navy",
  navy: "bg-navy text-white",
  white: "bg-card text-navy",
  cream: "bg-muted text-navy",
} as const

function AudienceCard({ item }: { item: AudienceItem }) {
  return (
    <article className="group flex h-full flex-col rounded-[28px] border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgb(19_32_63/0.4)]">
      <IconTile
        icon={item.icon}
        tone={item.tone}
        size="lg"
        className="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"
      />
      <h3 className="mt-7 text-xl leading-snug font-bold text-balance sm:text-[22px]">
        {item.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>

      <div className="mt-6 border-t pt-5">
        <span className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
          You&apos;ll practise
        </span>
        <ul className="mt-3 flex flex-col gap-2.5">
          {item.practise.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-[15px] font-semibold">
              <Check className="size-4 shrink-0 text-clay" strokeWidth={3} aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1" />
      <Link
        href="#batches"
        className="mt-7 flex items-center justify-between gap-3 rounded-2xl bg-background px-4 py-3 text-sm transition-colors group-hover:bg-muted"
      >
        <span className="text-muted-foreground">
          Best fit: <span className="font-bold text-foreground">{item.batch}</span>
        </span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  )
}

export function AudienceSection() {
  return (
    <Section spacing="none" className="pt-4 pb-20 sm:pt-6 sm:pb-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for English you'll actually use."
            aside="Whatever brings you here, the goal is the same: speaking English in the situations that matter to you."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {audiences.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="h-full">
              <AudienceCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function ModulesTimeline() {
  return (
    <section className="rounded-t-[56px] bg-card py-20 sm:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-4 lg:sticky lg:top-28">
          <Eyebrow>What you&apos;ll learn</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">
            Module by module.
          </h2>
          <p className="text-lg text-muted-foreground">
            [HOW THE COURSE PROGRESSES — from first class to final week.]
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2.5 text-sm font-semibold">
              <CalendarDays className="size-4" aria-hidden /> [TOTAL WEEKS]
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2.5 text-sm font-semibold">
              <Clock className="size-4" aria-hidden /> [HOURS PER CLASS]
            </span>
          </div>
        </Reveal>

        <ol className="relative flex flex-col gap-5">
          <span
            aria-hidden
            className="absolute top-7 bottom-7 left-[27px] w-0.5 bg-[repeating-linear-gradient(180deg,var(--input)_0_8px,transparent_8px_14px)]"
          />
          {modules.map((m, i) => (
            <li key={m.title} className="relative">
              <Reveal delay={i * 0.08} className="flex gap-5">
                <span
                  className={cn(
                    "relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-4 border-card font-display text-lg font-extrabold shadow-[0_0_0_1px_var(--border)]",
                    toneClass[m.tone]
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-1.5 rounded-3xl bg-background px-6 py-5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">{m.title}</h3>
                    <span className="rounded-full bg-card px-3 py-1 text-xs font-bold">
                      [WEEKS]
                    </span>
                  </div>
                  <p className="text-muted-foreground">{m.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export function CourseBatchesSection({ batches }: { batches: Batch[] }) {
  return (
    <section id="batches" className="scroll-mt-20 bg-card pb-20 sm:pb-24">
      <Container className="flex flex-col gap-8">
        <Reveal>
          <SectionHeading eyebrow="All batches" title="Find a time that works." />
        </Reveal>
        <Reveal delay={0.1}>
          <BatchesExplorer batches={batches} enquireHref="/contact" />
        </Reveal>
      </Container>
    </section>
  )
}

export function FeesSection() {
  return (
    <Section className="pb-0 sm:pb-0 lg:pb-0">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col">
          <Eyebrow>Fees</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">
            Simple, upfront fees.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
            One simple monthly fee. No registration charge and no extra cost for books. Pay at the
            start of each month, for as long as the course runs.
          </p>

          <dl className="mt-8 max-w-lg border-t">
            {feeFacts.map((plan) => (
              <div
                key={plan.label}
                className="flex items-baseline justify-between gap-4 border-b py-4"
              >
                <dt>
                  <span className="block font-bold">{plan.label}</span>
                  <span className="text-sm text-muted-foreground">{plan.note}</span>
                </dt>
                <dd className="font-display text-xl font-extrabold tabular-nums">{plan.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">
            We accept UPI, debit/credit card and cash.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-[22px_-14px_-18px_26px] rotate-[2.5deg] rounded-[30px] bg-saffron"
            />
            <div className="relative flex flex-col overflow-hidden rounded-[28px] border bg-card shadow-[0_40px_70px_-45px_rgb(19_32_63/0.55)]">
              <div className="flex items-center justify-between gap-4 border-b bg-muted/60 px-7 py-4 sm:px-9">
                <span className="text-xs font-bold tracking-[0.14em] uppercase">Course fee</span>
                <span className="text-xs font-semibold text-muted-foreground">Pay monthly</span>
              </div>
              <div className="flex flex-col p-7 sm:p-9">
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-[clamp(2.75rem,5vw,4rem)] leading-none font-extrabold tracking-tight">
                    {siteConfig.course.fee}
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {siteConfig.course.feePeriod}
                  </span>
                </p>

                <div className="mt-7 border-t pt-6">
                  <span className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
                    Everything included
                  </span>
                  <ul className="mt-4 flex flex-col gap-3">
                    {feeIncludes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] font-medium">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-saffron">
                          <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild size="lg" className="mt-8 w-full">
                  <Link href="/contact#enquire">
                    Book your free demo class <ArrowRight />
                  </Link>
                </Button>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  No registration fee. No hidden charges.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

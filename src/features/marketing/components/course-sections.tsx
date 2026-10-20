import Link from "next/link"
import { CalendarDays, Check, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { FeatureCard } from "@/components/shared/feature-card"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { BatchesExplorer } from "@/features/batches/components/batches-explorer"
import type { Batch } from "@/features/batches/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { audiences, feeIncludes, modules } from "../data/content"

const toneClass = {
  coral: "bg-coral text-navy",
  saffron: "bg-saffron text-navy",
  navy: "bg-navy text-white",
  white: "bg-card text-navy",
  cream: "bg-muted text-navy",
} as const

export function AudienceSection() {
  return (
    <Section spacing="compact" className="pb-20 sm:pb-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for English you'll actually use."
            aside="[ONE LINE — who benefits most from this course.]"
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {audiences.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="h-full">
              <FeatureCard {...item} className="h-full" />
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
          <h2 className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">Module by module.</h2>
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
          <span aria-hidden className="absolute top-7 bottom-7 left-[27px] w-0.5 bg-[repeating-linear-gradient(180deg,var(--input)_0_8px,transparent_8px_14px)]" />
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
                    <span className="rounded-full bg-card px-3 py-1 text-xs font-bold">[WEEKS]</span>
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
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Fees</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">Simple, upfront fees.</h2>
          <p className="text-lg text-muted-foreground">
            [FEE NOTE — how and when fees are paid, and any discounts.]
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative flex flex-col gap-5 overflow-hidden rounded-[32px] border bg-card p-7 transition-transform duration-300 hover:-translate-y-1.5 sm:p-9">
            <span aria-hidden className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,var(--brand-coral)_0_40px,var(--brand-saffron)_40px_80px,var(--brand-navy)_80px_120px)]" />
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-muted-foreground">Course fee</span>
              <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold">[PAYMENT OPTIONS]</span>
            </div>
            <span className="font-display text-[clamp(2.75rem,5vw,4rem)] leading-none font-extrabold">
              {siteConfig.course.fee}
            </span>
            <ul className="flex flex-col gap-3">
              {feeIncludes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-saffron">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="w-full">
              <Link href="/contact#enquire">Ask about fees</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

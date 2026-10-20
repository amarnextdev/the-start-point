import Link from "next/link"
import { ArrowRight, BadgeCheck, Check } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { FeatureCard } from "@/components/shared/feature-card"
import { IconTile } from "@/components/shared/icon-tile"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { classSteps, galleryItems, teacherCredentials, values } from "../data/content"
import { initials, PortraitFrame, RotatingBadge } from "./teacher-section"

export function MissionSection() {
  return (
    <Section spacing="compact" className="py-16 sm:py-20">
      <Reveal>
        <Container className="flex max-w-4xl flex-col items-center gap-5 text-center">
          <Eyebrow>Our mission</Eyebrow>
          <p className="font-display text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.15] font-bold text-balance">
            &ldquo;Every student should leave able to walk into an interview, a meeting or a shop and{" "}
            <span className="text-clay">speak English without fear.</span>&rdquo;
          </p>
          <span className="mt-2 inline-flex items-center gap-3 text-left">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white">
              {initials(siteConfig.teacherName)}
            </span>
            <span className="leading-tight">
              <strong className="block text-[15px]">{siteConfig.teacherName}</strong>
              <span className="text-sm text-muted-foreground">{siteConfig.teacher.role}</span>
            </span>
          </span>
        </Container>
      </Reveal>
    </Section>
  )
}

export function TeacherProfile() {
  const { teacherName, teacher } = siteConfig

  return (
    <section id="teacher" className="scroll-mt-8 rounded-t-[36px] bg-card py-20 sm:rounded-t-[56px] sm:py-24 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          <PortraitFrame name={teacherName} />
          <RotatingBadge className="absolute -top-4 -right-5 size-28 animate-spin-slow sm:size-32" />
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border bg-card py-3 pr-5 pl-3 shadow-[0_24px_40px_-24px_rgb(19_32_63/0.5)] sm:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-saffron text-navy">
              <BadgeCheck className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <strong className="text-[15px]">{teacher.credential}</strong>
              <span className="text-xs text-muted-foreground">{teacher.credentialBody}</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col">
          <Eyebrow>Meet your teacher</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">{teacherName}</h2>
          <p className="mt-2 text-base font-semibold text-clay">{teacher.role}</p>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">{teacher.intro}</p>

          <ul className="mt-7 flex flex-col gap-4 border-t pt-7">
            {teacherCredentials.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-saffron">
                  <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
                </span>
                <span className="flex flex-col">
                  <strong className="text-[17px]">{item.title}</strong>
                  <span className="text-[15px] text-muted-foreground">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>

          <figure className="mt-8 border-l-[3px] border-coral pl-6">
            <blockquote className="font-display text-[1.35rem] leading-snug font-semibold text-pretty">
              &ldquo;{teacher.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-muted-foreground">{teacherName}</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}

const stepTone = {
  cream: { card: "bg-background", num: "bg-coral text-navy", time: "bg-card" },
  saffron: { card: "bg-saffron", num: "bg-navy text-white", time: "bg-white/50" },
  navy: { card: "bg-navy text-white", num: "bg-saffron text-navy", time: "bg-white/10" },
} as const

export function ClassStepsSection() {
  return (
    <section className="bg-card pb-20 sm:pb-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Inside a class"
            title="How a typical class works."
            aside="Every class runs for 90 minutes, and most of that time you are the one speaking."
          />
        </Reveal>
        <ol className="relative grid gap-5 md:grid-cols-3">
          <span aria-hidden className="absolute top-[58px] right-[12%] left-[12%] hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--input)_0_8px,transparent_8px_14px)] md:block" />
          {classSteps.map((step, i) => {
            const tone = stepTone[step.tone]
            return (
              <li key={step.title} className="relative">
                <Reveal
                  delay={i * 0.1}
                  className={cn(
                    "flex h-full flex-col gap-4 rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1.5",
                    tone.card
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("grid size-15 place-items-center rounded-full font-display text-xl font-extrabold", tone.num)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-bold tabular-nums", tone.time)}>{step.time}</span>
                  </div>
                  <h3 className="mt-2 text-[22px] font-bold">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed opacity-80">{step.description}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

export function ValuesSection() {
  return (
    // Overlaps the white class-steps section so the rounded cream corners show white behind them.
    <Section className="relative -mt-10 rounded-t-[36px] sm:-mt-14 sm:rounded-t-[56px]">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="What we stand for"
            title="What you can expect from us."
            aside="Three promises we keep in every batch, whichever timing you choose."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="h-full">
              <FeatureCard {...item} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

const galleryTone = {
  navy: "bg-navy text-white",
  saffron: "bg-saffron text-navy",
  coral: "bg-coral text-navy",
  cream: "bg-muted text-navy",
} as const

export function GallerySection() {
  return (
    <Section className="pt-0 sm:pt-0 lg:pt-0">
      <Container className="flex flex-col gap-8">
        <Reveal>
          <SectionHeading
            eyebrow="The classroom"
            title="Where you'll learn."
            aside={
              <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-foreground hover:text-clay">
                Plan a visit <ArrowRight className="size-4" />
              </Link>
            }
          />
        </Reveal>
        <div className="grid auto-rows-[240px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className={cn("h-full", item.className)}>
              <figure
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[28px] p-6",
                  galleryTone[item.tone]
                )}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.label}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
                    <item.icon
                      aria-hidden
                      strokeWidth={1.25}
                      className="absolute -right-6 -bottom-6 size-40 opacity-[0.12] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105"
                    />
                    <IconTile icon={item.icon} tone={item.tone === "navy" ? "saffron" : "white"} className="relative" />
                  </>
                )}
                <figcaption className="relative mt-auto w-fit rounded-2xl bg-card/95 px-4 py-2.5 text-navy shadow-sm">
                  <strong className="block text-[15px]">{item.label}</strong>
                  <span className="text-xs font-medium text-muted-foreground">{item.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

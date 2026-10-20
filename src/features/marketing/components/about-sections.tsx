import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { FeatureCard } from "@/components/shared/feature-card"
import { ImagePlaceholder } from "@/components/shared/image-placeholder"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { classSteps, galleryItems, teacherCredentials, values } from "../data/content"
import { RotatingBadge } from "./teacher-section"

export function MissionSection() {
  return (
    <Section spacing="compact" className="py-16 sm:py-20">
      <Reveal>
        <Container className="flex max-w-4xl flex-col items-center gap-5 text-center">
          <Eyebrow>Our mission</Eyebrow>
          <p className="font-display text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.15] font-bold text-balance">
            “[MISSION STATEMENT — one sentence on what you want every student to be able to do.]”
          </p>
          <span className="inline-flex items-center gap-3 font-semibold text-muted-foreground">
            <span aria-hidden className="h-0.5 w-10 bg-coral" />
            [NAME], [ROLE]
          </span>
        </Container>
      </Reveal>
    </Section>
  )
}

export function TeacherProfile() {
  return (
    <section id="teacher" className="scroll-mt-20 rounded-t-[56px] bg-card py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <ImagePlaceholder label="TEACHER PHOTO" className="aspect-[4/5] rounded-t-[220px] rounded-b-[32px]" />
          <RotatingBadge className="absolute -right-5 bottom-10 size-32 animate-spin-slow" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-5">
          <Eyebrow>Meet your teacher</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">{siteConfig.teacherName}</h2>
          <p className="text-lg text-muted-foreground">
            [TEACHER&apos;S STORY — background, how they started teaching, and what they enjoy about it.]
          </p>
          <ul className="flex flex-col gap-4 pt-1">
            {teacherCredentials.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-saffron">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="flex flex-col">
                  <strong className="text-[17px]">{item.title}</strong>
                  <span className="text-[15px] text-muted-foreground">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
          <blockquote className="relative mt-2 rounded-3xl bg-background px-6 py-6 text-lg font-medium">
            <span aria-hidden className="absolute -top-5 left-5 font-display text-6xl leading-none font-extrabold text-coral">
              “
            </span>
            [TEACHING PHILOSOPHY — in the teacher&apos;s own words.]
          </blockquote>
        </Reveal>
      </Container>
    </section>
  )
}

const stepTone = {
  cream: { card: "bg-background", num: "bg-coral text-navy" },
  saffron: { card: "bg-saffron", num: "bg-navy text-white" },
  navy: { card: "bg-navy text-white", num: "bg-saffron text-navy" },
} as const

export function ClassStepsSection() {
  return (
    <section className="bg-card pb-20 sm:pb-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Inside a class" title="How a typical class works." />
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
                  <span className={cn("grid size-15 place-items-center rounded-full font-display text-xl font-extrabold", tone.num)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[22px] font-bold">{step.title}</h3>
                  <p className="opacity-80">{step.description}</p>
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
    <Section>
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="What we stand for" title="What you can expect from us." />
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
        <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className={cn("h-full", item.className)}>
              <figure className="group relative h-full overflow-hidden rounded-3xl">
                <ImagePlaceholder
                  label={item.label}
                  className="size-full transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-3.5 left-3.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

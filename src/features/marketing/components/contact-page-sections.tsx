import { Suspense } from "react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { FormSkeleton } from "@/components/skeletons"
import { Reveal } from "@/components/motion/reveal"
import { EnquiryForm, type BatchOption } from "@/features/enquiries/components/enquiry-form"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { nextSteps } from "../data/content"
import { ContactRows, MapCard } from "./contact-section"
import { initials } from "./teacher-section"

const stepColors = ["bg-coral text-navy", "bg-saffron text-navy", "bg-navy text-white"]

export function ContactEnquirySection({ batches }: { batches: BatchOption[] }) {
  return (
    <section id="enquire" className="scroll-mt-8 rounded-t-[36px] bg-card py-20 sm:rounded-t-[56px] sm:py-24 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <Reveal className="flex flex-col">
            <Eyebrow>Enquiry form</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">
              Tell us a little about you.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">It takes less than a minute. Here&apos;s what happens next:</p>
          </Reveal>
          <ol className="relative flex flex-col gap-5">
            <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-0.5 bg-[repeating-linear-gradient(180deg,var(--input)_0_8px,transparent_8px_14px)]" />
            {nextSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.08} className="flex gap-4">
                  <span className={cn("relative z-10 grid size-10 shrink-0 place-items-center rounded-full font-display text-base font-extrabold", stepColors[i])}>
                    {i + 1}
                  </span>
                  <span className="flex flex-col gap-0.5 pt-1.5">
                    <strong className="font-display text-lg">{step.title}</strong>
                    <span className="text-[15px] leading-relaxed text-muted-foreground">{step.description}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="rounded-[28px] border bg-background p-4 sm:p-5">
            <span className="mb-3 block px-1 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
              Or reach us directly
            </span>
            <ContactRows variant="grid" />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative lg:sticky lg:top-8 lg:self-start">
          <div aria-hidden className="absolute inset-[18px_-10px_-14px_18px] rotate-[2deg] rounded-[30px] bg-saffron" />
          <div className="relative rounded-[28px] border bg-card p-6 shadow-[0_40px_80px_-40px_rgb(19_32_63/0.55)] sm:p-8">
            <Suspense fallback={<FormSkeleton />}>
              <EnquiryForm batches={batches} />
            </Suspense>
            <div className="mt-7 flex items-center gap-3.5 border-t pt-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white">
                {initials(siteConfig.teacherName)}
              </span>
              <p className="text-sm leading-snug text-muted-foreground">
                <strong className="block text-[15px] text-foreground">
                  {siteConfig.teacherName} reads every enquiry
                </strong>
                {siteConfig.contact.responseTime}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function MapSection() {
  return (
    <section id="map" className="scroll-mt-8 bg-card px-4 pb-8 sm:px-6 sm:pb-12">
      <Reveal>
        <Container className="flex max-w-[1200px] flex-col gap-8 px-0 sm:px-0 lg:px-0">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 px-1 sm:px-2">
            <div className="flex flex-col">
              <Eyebrow>Find us</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.04] font-extrabold">Visit the classroom.</h2>
            </div>
            <p className="max-w-sm text-muted-foreground">{siteConfig.contact.hours}. Drop in any time, no appointment needed.</p>
          </div>
          <MapCard className="min-h-[520px] shadow-[0_30px_60px_-45px_rgb(19_32_63/0.45)]" />
        </Container>
      </Reveal>
    </section>
  )
}

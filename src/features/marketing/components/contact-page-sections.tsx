import { Suspense } from "react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { FormSkeleton } from "@/components/skeletons"
import { Reveal } from "@/components/motion/reveal"
import { EnquiryForm, type BatchOption } from "@/features/enquiries/components/enquiry-form"
import { cn } from "@/lib/utils"

import { nextSteps } from "../data/content"
import { ContactRows, MapCard } from "./contact-section"

const stepColors = ["bg-coral text-navy", "bg-saffron text-navy", "bg-navy text-white"]

export function ContactEnquirySection({ batches }: { batches: BatchOption[] }) {
  return (
    <section id="enquire" className="scroll-mt-20 rounded-t-[56px] bg-card py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>Enquiry form</Eyebrow>
            <h2 className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04] font-extrabold">
              Tell us a little about you.
            </h2>
            <p className="text-lg text-muted-foreground">It takes less than a minute. Here&apos;s what happens next:</p>
          </Reveal>
          <ol className="relative flex flex-col gap-7">
            <span aria-hidden className="absolute top-6 bottom-6 left-[23px] w-0.5 bg-[repeating-linear-gradient(180deg,var(--input)_0_8px,transparent_8px_14px)]" />
            {nextSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.08} className="flex gap-4">
                  <span className={cn("relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-display text-lg font-extrabold", stepColors[i])}>
                    {i + 1}
                  </span>
                  <span className="flex flex-col gap-1 pt-1">
                    <strong className="font-display text-xl">{step.title}</strong>
                    <span className="text-muted-foreground">{step.description}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="rounded-3xl border bg-background p-5">
            <ContactRows />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative overflow-hidden rounded-[36px] bg-navy p-3 shadow-[0_40px_80px_-40px_rgb(19_32_63/0.6)] sm:p-5">
          <div aria-hidden className="absolute -right-10 -bottom-10 size-40 rounded-full bg-coral/25" />
          <div className="relative rounded-[28px] bg-card p-6 sm:p-8">
            <Suspense fallback={<FormSkeleton />}>
              <EnquiryForm batches={batches} />
            </Suspense>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function MapSection() {
  return (
    <section id="map" className="bg-card px-4 pb-4 sm:px-6">
      <Reveal>
        <Container className="max-w-[1200px] px-0 sm:px-0 lg:px-0">
          <MapCard className="min-h-[440px] rounded-[40px]" />
        </Container>
      </Reveal>
    </section>
  )
}

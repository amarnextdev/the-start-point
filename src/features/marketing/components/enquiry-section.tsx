import { Suspense } from "react"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

import { Container } from "@/components/shared/container"
import { FormSkeleton } from "@/components/skeletons"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"
import { EnquiryForm, type BatchOption } from "@/features/enquiries/components/enquiry-form"

const promises = ["Takes less than a minute", "Your first class is a free demo", "We call you back within 2 hours"]

export function EnquirySection({ batches }: { batches: BatchOption[] }) {
  const { teacherName, teacher } = siteConfig
  const initials = teacherName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <section id="enquire" className="relative -mt-10 scroll-mt-8 rounded-t-[36px] sm:rounded-t-[56px] bg-background px-4 py-16 sm:-mt-14 sm:px-6 sm:py-20 lg:py-24">
      <Reveal>
        <Container className="relative grid max-w-[1200px] items-center gap-12 overflow-hidden rounded-[clamp(28px,4vw,48px)] bg-navy p-7 text-white sm:p-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-16">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-30 invert" />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-32 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(255_106_61/0.28),transparent_65%)]"
          />
          <div aria-hidden className="absolute -top-24 right-[38%] size-56 rounded-full border-[28px] border-white/[0.03]" />

          <div className="relative flex flex-col">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.14em] text-saffron uppercase before:h-0.5 before:w-5 before:rounded-full before:bg-current sm:text-sm">
              Enquire or join
            </span>
            <h2 className="mt-5 text-[clamp(2.3rem,4.8vw,3.75rem)] leading-[1.02] font-extrabold">
              Ready to start <span className="text-saffron">speaking?</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
              Leave your name, phone number and preferred batch. We&apos;ll get in touch to answer your
              questions and help you join.
            </p>

            <ul className="mt-7 flex flex-col gap-3.5 text-[15px] font-semibold">
              {promises.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-saffron text-navy">
                    <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-7">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-coral font-display text-base font-extrabold text-navy ring-4 ring-white/10">
                {initials}
              </span>
              <p className="text-sm leading-snug text-white/70">
                <strong className="block text-[15px] text-white">{teacherName} reads every enquiry</strong>
                {teacher.role}
              </p>
              <Link
                href="/contact"
                className="group ml-auto hidden items-center gap-1 text-sm font-bold whitespace-nowrap text-saffron underline-offset-4 hover:underline sm:inline-flex"
              >
                Call instead
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute inset-[18px_-10px_-14px_18px] rotate-[2deg] rounded-[30px] bg-saffron" />
            <div className="relative rounded-[28px] bg-card p-6 text-foreground shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-8">
              <Suspense fallback={<FormSkeleton />}>
                <EnquiryForm batches={batches} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  )
}

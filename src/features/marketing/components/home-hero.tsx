import Link from "next/link"
import { ArrowRight, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { FloatingShape } from "@/components/motion/floating-shape"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/config/site"

import { IntroVideo } from "./intro-video"

export function HomeHero({ nextBatchDate = "[START DATE]" }: { nextBatchDate?: string }) {
  const { course, introVideo, teacherName, city } = siteConfig
  const heroFacts = [
    { icon: Users, label: "Batch size", value: course.classSize },
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: MapPin, label: "Classes at", value: course.location },
  ]

  return (
    <section id="top" className="relative overflow-hidden pt-[122px] pb-20 sm:pt-[138px] lg:pt-[154px] lg:pb-28">
      <div aria-hidden className="bg-dots absolute inset-0" />
      <div aria-hidden className="absolute top-[520px] left-1/2 size-[1500px] -translate-x-1/2 rounded-full border border-navy/[0.07]" />
      <FloatingShape className="top-28 left-[8%] size-13 rounded-[15px] bg-saffron" />
      <FloatingShape slow className="top-40 right-[9%] size-21 rounded-full border-[6px] border-navy opacity-[0.08]" />
      <FloatingShape slow className="top-[400px] right-[17%] size-3.5 rounded-full bg-coral" />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <Link
            href="#batches"
            className="group inline-flex items-center overflow-hidden rounded-full border bg-card text-sm font-semibold shadow-[0_10px_24px_-18px_rgb(19_32_63/0.5)]"
          >
            <span className="inline-flex items-center gap-2 bg-navy py-2 pr-3.5 pl-3 text-white">
              <span className="size-2 animate-pulse-ring rounded-full bg-coral" aria-hidden />
              Admissions open
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2">
              Next batch starts {nextBatchDate}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
            Speak English with{" "}
            <span className="relative inline-block whitespace-nowrap">
              confidence
              <svg
                aria-hidden
                viewBox="0 0 400 30"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-2.5 h-5 w-full text-coral"
              >
                <path
                  d="M4 22 C 90 6, 220 4, 396 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="mt-1 block text-clay">face to face.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
            Small-group classroom batches in {city}, led by {teacherName}. [ONE-LINE COURSE PROMISE —
            who the classes are for and what students will be able to do.]
          </p>
        </Reveal>

        <Reveal delay={0.24} className="flex flex-wrap justify-center gap-3">
          <Button asChild size="xl">
            <Link href="#enquire">
              Enquire about a batch <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="xl" variant="soft">
            <Link href="#intro">Watch intro · {introVideo.length}</Link>
          </Button>
        </Reveal>

        <Reveal delay={0.32} className="mt-4 w-full max-w-3xl">
          <dl className="grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:divide-x sm:divide-navy/10">
            {heroFacts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-center gap-3 px-6 text-left">
                <Icon className="size-5 shrink-0 text-clay" aria-hidden />
                <div className="leading-tight">
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{label}</dt>
                  <dd className="mt-1 text-base font-bold text-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      <Container id="intro" className="relative mt-14 max-w-[1080px] scroll-mt-8 sm:mt-20">
        <Reveal delay={0.35} y={40} className="relative">
          <div aria-hidden className="absolute inset-[26px_14px_-26px_58px] rotate-[2.2deg] rounded-[36px] bg-saffron" />
          <div aria-hidden className="absolute inset-[44px_52px_-40px_20px] -rotate-2 rounded-[36px] bg-navy/10" />
          <IntroVideo
            src={introVideo.url || undefined}
            title={`Meet ${teacherName} and see a class in action`}
            length={introVideo.length}
            className="relative"
          />
        </Reveal>
      </Container>
    </section>
  )
}
